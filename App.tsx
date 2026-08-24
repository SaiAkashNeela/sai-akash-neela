import React, { useState, useEffect } from 'react';
import { resumeData } from './data';
import { useGitHistory } from './hooks/useGitHistory';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { GitHubSection } from './components/GitHubSection';
import { WorkSection } from './components/WorkSection';
import { EducationSection } from './components/EducationSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { WritingSection } from './components/WritingSection';
import { ContactSection } from './components/ContactSection';
import { DockNavbar } from './components/DockNavbar';

const THEME_STORAGE_KEY_V1 = 'portfolio_theme_v1';

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
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
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-zinc-800 selection:text-white dark:selection:bg-zinc-200 dark:selection:text-black transition-colors duration-200">
      {/* Main Single Column Centered Layout matching Magic UI */}
      <main className="max-w-2xl mx-auto py-12 sm:py-24 px-5 sm:px-6 flex flex-col gap-12 sm:gap-16 pb-28">
        <HeroSection data={resumeData} />
        <AboutSection summary={resumeData.summary} />
        <GitHubSection data={gitHistory} isLoading={isLoading} />
        <WorkSection experience={resumeData.experience} />
        <EducationSection education={resumeData.education} />
        <SkillsSection skills={resumeData.skills} />
        <ProjectsSection projects={resumeData.projects} />
        <WritingSection posts={resumeData.blogPosts} />
        <ContactSection data={resumeData} />
      </main>

      {/* Signature Magic UI Bottom Dock */}
      <DockNavbar
        data={resumeData}
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
};

export default App;
