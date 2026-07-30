import React, { useState, useEffect, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TopicCard from './components/TopicCard';
import QuickReferenceModal from './components/QuickReferenceModal';
import { cheatSheetData } from './data';
import { usePyodide } from './hooks/usePyodide';
import { useLocalStorage } from './hooks/useLocalStorage';
import './index.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [completedTopics, setCompletedTopics] = useLocalStorage('masteredTopics', []);
  const [bookmarkedTopics, setBookmarkedTopics] = useLocalStorage('bookmarkedTopics', []);
  const [activeTopicId, setActiveTopicId] = useState('');
  const [theme, setTheme] = useLocalStorage('appTheme', 'dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Modals and Filters
  const [isReferenceOpen, setIsReferenceOpen] = useState(false);
  const [activeLevelFilter, setActiveLevelFilter] = useState('All');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Pyodide Hook
  const { pyodide, isLoading: isPyodideLoading, runCode } = usePyodide();

  // Initialize theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle active topic on scroll
  useEffect(() => {
    const handleScroll = () => {
      let currentActiveId = '';
      
      for (const topic of cheatSheetData) {
        const element = document.getElementById(topic.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            currentActiveId = topic.id;
          }
        }
      }
      if (currentActiveId) setActiveTopicId(currentActiveId);
    };

    const contentScroll = document.getElementById('content-scroll');
    if (contentScroll) {
      contentScroll.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (contentScroll) {
        contentScroll.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleComplete = (id) => {
    setCompletedTopics(prev => 
      prev.includes(id) ? prev.filter(tId => tId !== id) : [...prev, id]
    );
  };

  const toggleBookmark = (id) => {
    setBookmarkedTopics(prev => 
      prev.includes(id) ? prev.filter(tId => tId !== id) : [...prev, id]
    );
  };

  const handleCopyAll = () => {
    const allCode = cheatSheetData
      .map(topic => `# --- ${topic.title} ---\n${topic.syntaxCode}`)
      .join('\n\n');
      
    navigator.clipboard.writeText(allCode);
    import('react-hot-toast').then(mod => mod.default.success('All code copied to clipboard!'));
  };

  // Group and filter data based on Search, Level, and Bookmarks
  const groupedData = useMemo(() => {
    return cheatSheetData.reduce((acc, topic) => {
      // 1. Search Query
      if (searchQuery && !(
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (topic.deepExplanation && topic.deepExplanation.toLowerCase().includes(searchQuery.toLowerCase()))
      )) {
        return acc;
      }
      
      // 2. Level Filter
      if (activeLevelFilter !== 'All' && topic.level !== activeLevelFilter) {
        return acc;
      }

      // 3. Bookmarks Only
      if (showBookmarksOnly && !bookmarkedTopics.includes(topic.id)) {
        return acc;
      }
      
      const existingCat = acc.find(c => c.category === topic.category);
      if (existingCat) {
        existingCat.topics.push(topic);
      } else {
        acc.push({ category: topic.category, topics: [topic] });
      }
      return acc;
    }, []);
  }, [cheatSheetData, searchQuery, activeLevelFilter, showBookmarksOnly, bookmarkedTopics]);

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="app-container">
      <Toaster position="bottom-right" />
      
      <Sidebar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        completedTopics={completedTopics}
        activeTopicId={activeTopicId}
        onTopicClick={setActiveTopicId}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <main className="main-content">
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onCopyAll={handleCopyAll}
          onOpenReference={() => setIsReferenceOpen(true)}
        />
        
        <div className="content-scroll" id="content-scroll">
          <div className="content-inner">
            
            {/* Filter Chips */}
            <div className="filter-chips">
              {levels.map(lvl => (
                <button 
                  key={lvl}
                  className={`chip ${activeLevelFilter === lvl ? 'active' : ''}`}
                  onClick={() => setActiveLevelFilter(lvl)}
                >
                  {lvl}
                </button>
              ))}
              
              <div style={{ width: '1px', backgroundColor: 'var(--border-color)', margin: '0 8px' }}></div>
              
              <button 
                className={`chip ${showBookmarksOnly ? 'active' : ''}`}
                onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                style={{ color: showBookmarksOnly ? 'var(--tag-intermediate)' : '' }}
              >
                ★ Bookmarks Only
              </button>
            </div>

            {/* Topics */}
            {groupedData.length > 0 ? (
              groupedData.map(category => (
                <div key={category.category}>
                  {category.topics.map(topic => (
                    <TopicCard 
                      key={topic.id}
                      topic={topic}
                      theme={theme}
                      isCompleted={completedTopics.includes(topic.id)}
                      onToggleComplete={toggleComplete}
                      isBookmarked={bookmarkedTopics.includes(topic.id)}
                      onToggleBookmark={toggleBookmark}
                      searchQuery={searchQuery}
                      runCode={runCode}
                      isPyodideLoading={isPyodideLoading}
                    />
                  ))}
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                <h3>No topics found</h3>
                <p>Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <QuickReferenceModal 
        isOpen={isReferenceOpen} 
        onClose={() => setIsReferenceOpen(false)} 
      />
    </div>
  );
}

export default App;
