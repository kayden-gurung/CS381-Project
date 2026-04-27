import { useState } from 'react';
import { PageType, LevelCompletion } from './types';
import { LandingPage } from './components/LandingPage';
import { TutorialPage } from './components/TutorialPage';
import { GameArena } from './components/GameArena';
import { DefenseArena } from './components/DefenseArena';
import { VictoryPage } from './components/VictoryPage';
import { CompletionPage } from './components/CompletionPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [victoryData, setVictoryData] = useState<LevelCompletion | null>(null);

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page as PageType);

    if (page === 'victory' && data) {
      setVictoryData(data);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;

      case 'tutorial':
        return <TutorialPage onNavigate={handleNavigate} />;

      case 'arena':
        return <GameArena onNavigate={handleNavigate} />;

      case 'defense':
        return <DefenseArena onNavigate={handleNavigate} />;

      case 'victory':
        return victoryData ? (
          <VictoryPage completion={victoryData} onNavigate={handleNavigate} />
        ) : (
          <LandingPage onNavigate={handleNavigate} />
        );

      case 'completion':
        return <CompletionPage onNavigate={handleNavigate} />;

      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
    </div>
  );
}