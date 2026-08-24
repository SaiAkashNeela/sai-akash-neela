import React, { useState, useEffect } from 'react';
import { resumeData } from './data';
import { useGitHistory } from './hooks/useGitHistory';
import { Header } from './components/Header';
import { ContributionGraph } from './components/ContributionGraph';
import { ProjectsList } from './components/ProjectsList';
import { ExperienceList } from './components/ExperienceList';
import { IndieKit } from './components/IndieKit';
import { SkillsSection } from './components/SkillsSection';
import { EducationCerts } from './components/EducationCerts';
import { BlogView } from './components/BlogView';
import { ThemeToggle } from './components/ThemeToggle';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';

const THEME_STORAGE_KEY_V1 = 'portfolio_theme_v1';

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'home' | 'blog'>('home');
  const { gitHistory, isLoading } = useGitHistory();

  // Initialize theme based on user preference or time of day
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY_V1);

    if (savedTheme) {
      if (savedTheme === 'dark') {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setDarkMode(false);
        document.documentElement.classList.remove('dark');
      }
    } else {
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

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_STORAGE_KEY_V1, 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_STORAGE_KEY_V1, 'dark');
      setDarkMode(true);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-8 px-4 sm:px-6 lg:px-8 font-sans text-zinc-800 dark:text-zinc-200 pb-28 sm:pb-16 transition-colors duration-200">
      <div className="max-w-5xl mx-auto relative">
        {/* Floating Theme Toggle - Top Right */}
        <div className="absolute top-0 right-0 z-40">
          <ThemeToggle darkMode={darkMode} onToggle={toggleTheme} />
        </div>

        {currentView === 'blog' ? (
          <BlogView
            posts={resumeData.blogPosts}
            onBack={() => setCurrentView('home')}
          />
        ) : (
          <main>
            {/* Header / Hero */}
            <Header
              data={resumeData}
              onOpenBlog={() => setCurrentView('blog')}
            />

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
              {/* Main Column (Left / Top) */}
              <div className="lg:col-span-2 space-y-10">
                {/* GitHub Contribution Activity */}
                <ContributionGraph data={gitHistory} isLoading={isLoading} />

                {/* Projects Section */}
                <ProjectsList projects={resumeData.projects} />

                {/* Work Experience */}
                <ExperienceList experience={resumeData.experience} />
              </div>

              {/* Sidebar Column (Right / Sticky on Desktop) */}
              <div className="space-y-8">
                {/* Indie Stack */}
                <IndieKit items={resumeData.indieKit} />

                {/* Technical Toolkit */}
                <SkillsSection skills={resumeData.skills} />

                {/* Education & Certifications */}
                <EducationCerts
                  education={resumeData.education}
                  certifications={resumeData.certifications}
                  publications={resumeData.publications}
                />
              </div>
            </div>
          </main>
        )}

        {/* Global Footer */}
        <Footer />
      </div>

      {/* Floating Bottom Nav for Mobile / Tablet */}
      <BottomNav
        data={resumeData}
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
      />
    </div>
  );
};

export default App;
