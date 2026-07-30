import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { builtinsData } from '../builtinsData';

const QuickReferenceModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = builtinsData.filter(b => 
    b.name.toLowerCase().includes(query.toLowerCase()) || 
    b.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Python Built-in Functions</h2>
          <button className="icon-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className="modal-search">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search functions (e.g. len, map)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        
        <div className="modal-body">
          {filtered.length > 0 ? (
            <ul className="builtins-list">
              {filtered.map(item => (
                <li key={item.name} className="builtin-item">
                  <div className="builtin-name">{item.name}</div>
                  <div className="builtin-desc">{item.desc}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-results">No built-in functions found for "{query}".</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickReferenceModal;
