// Deploy this to Cloudflare Workers
//
// Optional Setup for caching & scheduling:
// 1. Create a KV Namespace: `wrangler kv:namespace create "GITHUB_CACHE"`
// 2. Bind it in Settings > Variables > KV Namespace Bindings as "GITHUB_CACHE"
// 3. Add Cron Trigger: `30 21 * * *` (21:30 UTC = 3:00 AM IST)

async function fetchGitHubData(env) {
    const username = "saiakashneela"; // Your GitHub username

    const query = `
      query($userName:String!) { 
        user(login: $userName){
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
            "User-Agent": "Cloudflare-Worker-Portfolio",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables: { userName: username }
        }),
    });

    if (!response.ok) throw new Error("GitHub API Error: " + response.statusText);
    
    const json = await response.json();
    if (json.errors) throw new Error(JSON.stringify(json.errors));

    const calendar = json.data.user.contributionsCollection.contributionCalendar;
    
    // Flatten data
    const flatData = [];
    calendar.weeks.forEach(week => {
        week.contributionDays.forEach(day => {
            flatData.push({
                date: day.date,
                count: day.contributionCount
            });
        });
    });

    // Return last 6 months (approx 180 days) to fit better on mobile screens
    return flatData.slice(-180);
}

export default {
  // Handle HTTP requests (Browser fetch)
  async fetch(request, env, ctx) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // 1. Try to get from KV Cache first (if configured)
      if (env.GITHUB_CACHE) {
        const cached = await env.GITHUB_CACHE.get("stats", { type: "json" });
        if (cached) {
          return new Response(JSON.stringify(cached), {
            headers: { 
              ...corsHeaders, 
              "Content-Type": "application/json",
              "X-Source": "KV-Cache"
            },
          });
        }
      }

      // 2. If no cache, fetch live
      const data = await fetchGitHubData(env);

      // 3. Update KV Cache (if configured)
      if (env.GITHUB_CACHE) {
        // Cache for 24 hours just in case cron fails
        ctx.waitUntil(env.GITHUB_CACHE.put("stats", JSON.stringify(data), { expirationTtl: 86400 }));
      }

      return new Response(JSON.stringify(data), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600", // Browser cache 1 hour
          "X-Source": "Live-API"
        },
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }
  },

  // Handle Cron Triggers (Scheduled Updates)
  async scheduled(event, env, ctx) {
    if (env.GITHUB_CACHE) {
        try {
            console.log("Cron started: Fetching GitHub data...");
            const data = await fetchGitHubData(env);
            await env.GITHUB_CACHE.put("stats", JSON.stringify(data));
            console.log("Cron success: KV updated.");
        } catch (err) {
            console.error("Cron failed:", err);
        }
    } else {
        console.log("Cron skipped: No GITHUB_CACHE KV binding found.");
    }
  }
};