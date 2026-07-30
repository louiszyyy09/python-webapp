import React from 'react';
import { Moon, Sun, Copy, Menu, BookOpen } from 'lucide-react';

const Header = ({ theme, toggleTheme, toggleSidebar, onCopyAll, onOpenReference }) => {
  return (
    <header className="header">
      <div className="header-title">
        <button className="icon-btn mobile-toggle" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
        Interactive Summary Guide
      </div>
      
      <div className="header-actions">
        <button 
          className="btn-primary" 
          onClick={onOpenReference}
          style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
        >
          <BookOpen size={16} />
          Built-ins
        </button>

        <button 
          className="icon-btn" 
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button className="btn-primary" onClick={onCopyAll}>
          <Copy size={16} />
          Copy All
        </button>
      </div>
    </header>
  );
};

export default Header;
