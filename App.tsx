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
type TabType = 'all' | 'projects' | 'experience' | 'blog';

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>('all');
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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 font-sans text-zinc-900 dark:text-zinc-100 pb-28 sm:pb-16 transition-colors duration-200">
      <div className="max-w-5xl mx-auto relative">
        {/* Floating Theme Toggle - Top Right */}
        <div className="absolute top-2 right-0 z-40 hidden sm:block">
          <ThemeToggle darkMode={darkMode} onToggle={toggleTheme} />
        </div>

        {/* Global Header */}
        <Header
          data={resumeData}
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
        />

        {/* Dynamic Views */}
        {activeTab === 'blog' ? (
          <BlogView
            posts={resumeData.blogPosts}
            onBack={() => setActiveTab('all')}
          />
        ) : activeTab === 'projects' ? (
          <main className="space-y-10">
            <ProjectsList projects={resumeData.projects} />
          </main>
        ) : activeTab === 'experience' ? (
          <main className="space-y-10">
            <ExperienceList experience={resumeData.experience} />
            <EducationCerts
              education={resumeData.education}
              certifications={resumeData.certifications}
              publications={resumeData.publications}
            />
          </main>
        ) : (
          /* Overview (All) */
          <main>
            {/* GitHub Activity & Telemetry Heatmap (Prominent at top) */}
            <ContributionGraph data={gitHistory} isLoading={isLoading} />

            {/* Asymmetric 2-Column Bento / Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
              {/* Primary Column (Left 2 cols) */}
              <div className="lg:col-span-2 space-y-12">
                <ProjectsList projects={resumeData.projects} />
                <ExperienceList experience={resumeData.experience} />
              </div>

              {/* Auxiliary Column (Right 1 col) */}
              <div className="space-y-10">
                <IndieKit items={resumeData.indieKit} />
                <SkillsSection skills={resumeData.skills} />
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

      {/* Floating Bottom Navigation Dock for Mobile */}
      <BottomNav
        data={resumeData}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
};

export default App;
