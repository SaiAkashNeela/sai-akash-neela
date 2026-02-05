import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, ExternalLink, Terminal, Cloud, Server, Code, Zap, BookOpen, LayoutDashboard, Brain, Cpu, Smartphone, Bot, PenTool, ArrowRight, Sun, Moon, ArrowLeft, Download, Package } from 'lucide-react';
import { resumeData } from './data';
import { Section } from './components/Section';
import { ContributionGraph } from './components/ContributionGraph';
import { EmailMenu } from './components/EmailMenu';

// PLACEHOLDER: Replace this with your actual Cloudflare Worker URL
// Example: "https://github-stats.your-name.workers.dev"
const GITHUB_WORKER_URL = "https://git-history.mrsan.workers.dev";

// Custom X (Twitter) Icon
const XIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Custom Medium Icon
const MediumIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

// Helper to map icon names from data.ts to Lucide components
const getProjectIcon = (name: string) => {
  // If it's a URL (like a favicon), render an img
  if (name.startsWith('http')) {
    return <img src={name} alt="icon" className="w-6 h-6 rounded-sm object-contain" />;
  }

  // Fallback for old icon names
  switch(name) {
    case 'dashboard': return <LayoutDashboard size={24} />;
    case 'brain': return <Brain size={24} />;
    case 'cpu': return <Cpu size={24} />;
    case 'mobile': return <Smartphone size={24} />;
    case 'bot': return <Bot size={24} />;
    default: return <Terminal size={24} />;
  }
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'blog'>('home');
  const [gitHistory, setGitHistory] = useState(resumeData.gitHistory);

  // Initialize theme based on user preference or time of day
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // 1. If user has manually set a theme, respect it
      if (savedTheme === 'dark') {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setDarkMode(false);
        document.documentElement.classList.remove('dark');
      }
    } else {
      // 2. Otherwise, use time-based logic
      // Light Mode: 5 AM to 7 PM (19:00)
      // Dark Mode: 7 PM (19:00) to 5 AM
      const currentHour = new Date().getHours();
      const isDayTime = currentHour >= 5 && currentHour < 19;

      if (isDayTime) {
        setDarkMode(false);
        document.documentElement.classList.remove('dark');
      } else {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  // Fetch Git History from Cloudflare Worker
  useEffect(() => {
    if (GITHUB_WORKER_URL) {
      fetch(GITHUB_WORKER_URL)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch');
          return res.json();
        })
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            // Force slice to last 6 months (approx 26 weeks) to ensure mobile view is good
            // even if the worker returns more data.
            const recentData = data.slice(-182); // 26 * 7 = 182
            setGitHistory(recentData);
          }
        })
        .catch(err => {
          console.error("Could not fetch git history:", err);
          // Fallback to static data (already set in initial state)
        });
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Blog View Component
  const BlogView = () => (
    <div className="max-w-3xl mx-auto">
      {/* Sticky Back Button Header */}
      <div className="sticky top-0 z-40 bg-neutral-50/90 dark:bg-neutral-950/90 backdrop-blur-md py-4 mb-6 border-b border-gray-100/50 dark:border-neutral-800/50 transition-colors -mx-4 px-4 sm:mx-0 sm:px-0 sm:-mt-8 sm:pt-12 flex items-center justify-between">
        <button 
          onClick={() => { setCurrentView('home'); scrollToTop(); }}
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Profile
        </button>
        {/* Spacer to prevent overlap if needed, though button is absolute outside */}
        <div className="w-8 h-8"></div>
      </div>

      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 pt-2">My Thoughts</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-12 text-lg">
        Small notes, tutorials, and ramblings about tech and life.
      </p>

      <div className="space-y-16">
        {resumeData.blogPosts.map((post, index) => (
          <article key={index} className="group">
            <div className="text-sm font-semibold text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-wide">
              {post.date}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {post.title}
            </h3>
            
            {post.image && (
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-64 object-cover rounded-xl mb-6 border border-gray-100 dark:border-neutral-800 shadow-sm" 
              />
            )}

            <div className="prose dark:prose-invert prose-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {post.content}
            </div>

            {post.externalLink && (
              <a 
                href={post.externalLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                {post.externalLink.text} <ExternalLink size={16} />
              </a>
            )}

            {/* Separator Line */}
            {index !== resumeData.blogPosts.length - 1 && (
              <hr className="mt-16 border-t border-gray-100 dark:border-neutral-800" />
            )}
          </article>
        ))}
      </div>
      
      <div className="mt-20 text-center">
         <p className="text-gray-400 text-sm">That's all for now.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-800 dark:text-gray-200 pb-24 sm:pb-12 transition-colors duration-300">
      
      <div className="max-w-6xl mx-auto relative">
        
        {/* Theme Toggle - Top Right - Increased Z-index and adjusted position for safety */}
        <button 
          onClick={toggleTheme}
          className="absolute -top-6 right-0 sm:right-0 p-1.5 rounded-full bg-white dark:bg-neutral-800 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm border border-gray-200 dark:border-neutral-700 transition-all z-50"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {currentView === 'blog' ? (
          <BlogView />
        ) : (
          /* Home View */
          <>
            {/* Intro / Header - Minimal and friendly */}
            <header className="mb-16 mt-4 sm:mt-0">
              <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
                Hi, I'm {resumeData.name}.
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 font-medium mb-4">
                {resumeData.fullName}
              </p>
              <p className="text-2xl text-indigo-600 dark:text-indigo-400 font-medium mb-6">
                {resumeData.title}
              </p>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
                {resumeData.summary}
              </p>
              
              <div className="flex flex-col gap-6 mt-8">
                {/* Icons Only Row with Separators - No Text */}
                <div className="flex items-center gap-4 flex-wrap text-gray-300 dark:text-gray-700">
                   {/* Email Menu (Replaces direct mailto) */}
                   <EmailMenu className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                     <Mail size={22} />
                   </EmailMenu>

                   <span>|</span>
                   
                   <a 
                    href={`https://${resumeData.contact.github}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    aria-label="GitHub"
                   >
                     <Github size={22} />
                   </a>
                   <span>|</span>

                   <a 
                    href={`https://${resumeData.contact.linkedin}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    aria-label="LinkedIn"
                   >
                     <Linkedin size={22} />
                   </a>
                   <span>|</span>

                   <a 
                    href={`https://${resumeData.contact.x}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    aria-label="X (Twitter)"
                   >
                     <XIcon size={20} />
                   </a>
                   <span>|</span>

                   <a 
                    href={`https://${resumeData.contact.medium}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    aria-label="Medium"
                   >
                     <MediumIcon size={22} />
                   </a>
                   <span>|</span>

                   <a 
                    href={`https://${resumeData.contact.resume}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    aria-label="Download Resume"
                   >
                     <Download size={22} />
                   </a>
                </div>

                <button 
                  onClick={() => { setCurrentView('blog'); scrollToTop(); }}
                  className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors w-fit group text-left mt-2"
                >
                  <PenTool size={18} />
                  <span className="font-medium">I write some stuff, read here.</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Main Column (Left/Top) */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* Git Commit History */}
                <ContributionGraph data={gitHistory} />

                {/* Portfolio / Building in Public */}
                <Section title="What I'm Building (and built!)" icon={<Zap size={20} />}>
                  <div className="grid grid-cols-1 gap-6">
                    {resumeData.projects.map((project, index) => (
                      // Made the card a clickable link
                      <a 
                        key={index} 
                        href={project.link || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block bg-white dark:bg-neutral-900 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-neutral-800 hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-900/50 transition-all group"
                      >
                        <div className="flex flex-col sm:flex-row items-start gap-5">
                            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg shrink-0 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                              {getProjectIcon(project.icon)}
                            </div>
                            <div className="flex-1 w-full">
                              <div className="flex justify-between items-start">
                                <h4 className="font-bold text-gray-900 dark:text-gray-100 text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                  {project.title}
                                </h4>
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ml-2 ${
                                  project.status === 'Live' || project.status === 'Released' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                  project.status === 'Open Source' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                  project.status === 'Agency' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                                  project.status === 'DSO' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' :
                                  'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                }`}>
                                  {project.status}
                                </span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 mt-2 mb-3 leading-relaxed">
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-3">
                                {project.tech.map((t, i) => (
                                  <span key={i} className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-neutral-800 px-2 py-1 rounded border border-gray-100 dark:border-neutral-700">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </Section>

                {/* Experience - Timeline style but no dates */}
                <Section title="Where I've Worked" icon={<Server size={20} />}>
                  <div className="space-y-10">
                    {resumeData.experience.map((job, index) => (
                      <div key={index} className="flex gap-6 group">
                        {/* Company Logo/Marker Placeholder */}
                        <div className="hidden sm:flex flex-col items-center">
                          <div className="w-12 h-12 rounded-xl bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:border-indigo-100 dark:group-hover:border-indigo-900 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all">
                              <Cloud size={20} />
                          </div>
                          {index !== resumeData.experience.length - 1 && <div className="w-px h-full bg-gray-200 dark:bg-neutral-800 my-2"></div>}
                        </div>

                        <div className="flex-1 pb-2">
                          <h4 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-1">
                            {job.role}
                          </h4>
                          <div className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">{job.company}</div>
                          
                          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                            {job.description}
                          </p>
                          
                          <ul className="space-y-2">
                            {job.highlights.map((highlight, hIndex) => (
                              <li key={hIndex} className="text-gray-600 dark:text-gray-400 text-sm flex items-start leading-relaxed">
                                <span className="mr-3 mt-2 w-1.5 h-1.5 bg-gray-300 dark:bg-neutral-600 rounded-full flex-shrink-0 group-hover:bg-indigo-300 dark:group-hover:bg-indigo-500 transition-colors"></span>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>

              </div>

              {/* Sidebar Column (Right/Bottom) */}
              <div className="space-y-10">
                
                {/* NEW: Indie Kit Section */}
                <Section title="My Indie Kit" icon={<Package size={20} />}>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.indieKit.map((item, index) => (
                      <span key={index} className="px-3 py-1 bg-white dark:bg-neutral-900 text-gray-700 dark:text-gray-300 text-sm rounded-full border border-gray-200 dark:border-neutral-800 shadow-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </Section>

                {/* Skills - Adjusted for sidebar */}
                <Section title="My Toolkit" icon={<Code size={20} />}>
                  <div className="space-y-6">
                    {Object.entries(resumeData.skills).map(([category, items]) => (
                      <div key={category} className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm">
                        <h5 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                          {category}
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {items.map(skill => (
                            <span key={skill} className="px-2.5 py-1.5 bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 text-sm rounded-md border border-gray-200 dark:border-neutral-700 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors cursor-default">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* Education */}
                <Section title="Education" icon={<BookOpen size={20} />}>
                    <div className="space-y-4">
                      {resumeData.education.map((edu, index) => (
                        <div key={index} className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm">
                          <h5 className="font-bold text-gray-900 dark:text-gray-100">{edu.institution}</h5>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{edu.degree}</p>
                        </div>
                      ))}
                    </div>
                </Section>

                {/* Certs & Publications */}
                <Section title="Certs & Papers" icon={<Zap size={20} />}>
                    <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm space-y-6">
                      <div>
                        <h5 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Certifications</h5>
                        <div className="space-y-3">
                          {resumeData.certifications.map((cert, index) => (
                              <div key={index} className="flex flex-col">
                                  <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">{cert.name}</span>
                                  <span className="text-gray-500 dark:text-gray-400 text-xs">{cert.issuer}</span>
                              </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-100 dark:border-neutral-800">
                        <h5 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Publications</h5>
                        {resumeData.publications.map((pub, index) => (
                          <div key={index}>
                            <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">{pub.title}</p>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-gray-500 dark:text-gray-400">{pub.source}</span>
                                <a href="#" className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-xs hover:underline font-medium">
                                    Read <ExternalLink size={10} />
                                </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                </Section>
                
              </div>

            </div>
          </>
        )}

      </div>

      {/* Sticky Bottom Nav (Visible on all devices) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg border border-gray-200 dark:border-neutral-700 shadow-xl rounded-full px-6 py-3 flex justify-between items-center z-50">
          <a href={`https://${resumeData.contact.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2">
            <Github size={20} />
          </a>
          <button 
            onClick={() => { setCurrentView('blog'); scrollToTop(); }}
            className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2"
          >
            <PenTool size={20} />
          </button>
          
          {/* Bottom Nav Email Menu */}
          <EmailMenu 
            isBottomNav={true} 
            className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 bg-gray-50 dark:bg-neutral-800 rounded-full border border-gray-100 dark:border-neutral-700"
          >
            <Mail size={20} />
          </EmailMenu>

          <a href={`https://${resumeData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2">
            <Linkedin size={20} />
          </a>
          <a href={`https://${resumeData.contact.x}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2">
            <XIcon size={18} />
          </a>
      </div>

      <footer className="max-w-6xl mx-auto mt-20 pt-8 border-t border-gray-200 dark:border-neutral-800 text-center hidden sm:block">
        <p className="text-gray-400 dark:text-gray-500 text-sm">
           Let's build something cool.
        </p>
      </footer>
    </div>
  );
};

export default App;