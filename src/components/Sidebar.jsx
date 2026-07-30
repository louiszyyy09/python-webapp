import React, { useState, useMemo } from 'react';
import { Search, CheckCircle2, Code2, ChevronDown, ChevronRight } from 'lucide-react';
import { cheatSheetData } from '../data';

const Sidebar = ({ 
  searchQuery, 
  setSearchQuery, 
  completedTopics, 
  activeTopicId, 
  onTopicClick,
  isOpen,
  setIsOpen
}) => {
  const [collapsedCategories, setCollapsedCategories] = useState({});

  const toggleCategory = (categoryName) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  // Calculate overall progress
  const totalTopics = cheatSheetData.length;
  const completedCount = completedTopics.length;
  const progressPercent = Math.round((completedCount / totalTopics) * 100) || 0;

  // Group flat array into categories for the sidebar
  const groupedData = useMemo(() => {
    return cheatSheetData.reduce((acc, topic) => {
      const existingCat = acc.find(c => c.category === topic.category);
      if (existingCat) {
        existingCat.topics.push(topic);
      } else {
        acc.push({ category: topic.category, topics: [topic] });
      }
      return acc;
    }, []);
  }, []);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-title">
          <Code2 size={24} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle', color: 'var(--accent-primary)' }} />
          PyCheatSheet
        </div>
        
        <div className="search-container">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="progress-container">
          <div className="progress-header">
            <span>Overall Progress</span>
            <span style={{ color: 'var(--accent-secondary)' }}>{progressPercent}%</span>
          </div>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progressPercent}%`, backgroundColor: 'var(--accent-primary)' }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="sidebar-nav">
        {groupedData.map((category, idx) => {
          // Filter topics based on search
          const filteredTopics = category.topics.filter(topic => {
            if (!searchQuery) return true;
            return (
              topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
              (topic.deepExplanation && topic.deepExplanation.toLowerCase().includes(searchQuery.toLowerCase()))
            );
          });

          if (filteredTopics.length === 0) return null;

          // Calculate category progress
          const catTotal = category.topics.length;
          const catCompleted = category.topics.filter(t => completedTopics.includes(t.id)).length;
          const catProgress = Math.round((catCompleted / catTotal) * 100) || 0;
          
          // Auto-expand if searching
          const isCollapsed = searchQuery ? false : !!collapsedCategories[category.category];

          return (
            <div key={idx} className="nav-category">
              <div 
                className="nav-category-header" 
                onClick={() => toggleCategory(category.category)}
                style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', padding: '8px 12px', margin: '4px 8px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-tertiary)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                    {category.category}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{catCompleted}/{catTotal}</span>
                </div>
                
                {/* Category Progress Bar */}
                <div className="progress-bar-bg" style={{ height: '4px', margin: 0 }}>
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${catProgress}%`, backgroundColor: catProgress === 100 ? 'var(--tag-beginner)' : 'var(--accent-secondary)' }}
                  ></div>
                </div>
              </div>
              
              {!isCollapsed && (
                <div className="nav-items-container" style={{ paddingLeft: '12px', marginTop: '4px' }}>
                  {filteredTopics.map(topic => {
                    const isCompleted = completedTopics.includes(topic.id);
                    const isActive = activeTopicId === topic.id;
                    
                    return (
                      <a 
                        key={topic.id}
                        href={`#${topic.id}`}
                        className={`nav-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                        onClick={() => {
                          onTopicClick(topic.id);
                          setIsOpen(false);
                        }}
                        style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                      >
                        <span style={{ flex: 1 }}>{topic.title}</span>
                        {isCompleted && <CheckCircle2 size={14} style={{ color: 'var(--tag-beginner)' }} />}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
