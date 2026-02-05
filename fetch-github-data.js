// Run this script with: node fetch-github-data.js <username> <token>
const fs = require('fs');
const https = require('https');

const username = process.argv[2];
const token = process.argv[3];

if (!username || !token) {
  console.error('Usage: node fetch-github-data.js <username> <token>');
  process.exit(1);
}

const query = JSON.stringify({
  query: `
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
  `,
  variables: { userName: username }
});

const options = {
  hostname: 'api.github.com',
  path: '/graphql',
  method: 'POST',
  headers: {
    'User-Agent': 'Node.js Script',
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Content-Length': query.length
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode !== 200) {
      console.error(`Error: GitHub API returned status ${res.statusCode}`);
      console.error(data);
      process.exit(1);
    }

    try {
      const json = JSON.parse(data);
      if (json.errors) {
        console.error('GraphQL Errors:', json.errors);
        process.exit(1);
      }

      const calendar = json.data.user.contributionsCollection.contributionCalendar;
      const weeks = calendar.weeks;
      
      // Flatten the weeks into a single array of days { date, count }
      const flatData = [];
      weeks.forEach(week => {
        week.contributionDays.forEach(day => {
          flatData.push({
            date: day.date,
            count: day.contributionCount
          });
        });
      });

      // Filter to last 365 days if necessary, though the API usually returns 1 year
      const recentData = flatData.slice(-365);

      const fileContent = `export const gitHistory = ${JSON.stringify(recentData, null, 2)};`;
      fs.writeFileSync('git-history.ts', fileContent);
      console.log(`Success! Saved ${recentData.length} days of history to git-history.ts`);
      console.log('Total contributions in last year:', calendar.totalContributions);

    } catch (e) {
      console.error('Error parsing JSON:', e);
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(query);
req.end();