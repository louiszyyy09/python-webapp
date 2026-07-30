import React, { useEffect } from 'react';
import { X, Maximize, Play, Check, Copy, WrapText } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-python'; // language support
import 'prismjs/themes/prism-tomorrow.css'; // dark theme

const FullscreenCodeModal = ({ 
  isOpen, 
  onClose, 
  code, 
  setCode, 
  title,
  onRun,
  isRunning,
  output,
  isError,
  theme
}) => {
  const [copied, setCopied] = React.useState(false);
  const [isWrapped, setIsWrapped] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" style={{ zIndex: 100 }}>
      <div 
        className="modal-content" 
        style={{ 
          width: '95vw', 
          maxWidth: '1200px', 
          height: '90vh', 
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#090d16',
          border: '1px solid var(--border-color)'
        }}
      >
        <div className="modal-header" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: '#131b2e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Maximize size={18} color="var(--accent-primary)" />
            <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{title}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="icon-btn" onClick={() => setIsWrapped(!isWrapped)} title="Toggle Word Wrap">
              <WrapText size={18} color={isWrapped ? 'var(--accent-secondary)' : 'currentColor'} />
            </button>
            <button className="icon-btn" onClick={handleCopy} title="Copy Code">
              {copied ? <Check size={18} color="#10b981" /> : <Copy size={18} />}
            </button>
            <button className="btn-primary" onClick={onRun} disabled={isRunning} style={{ marginLeft: '8px' }}>
              <Play size={16} /> {isRunning ? 'Running...' : 'Run'}
            </button>
            <button className="icon-btn" onClick={onClose} style={{ marginLeft: '16px' }}>
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <div style={{ flex: 1, overflow: 'auto', padding: '16px', borderRight: output !== null ? '1px solid var(--border-color)' : 'none' }}>
             <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => Prism.highlight(code, Prism.languages.python, 'python')}
                padding={10}
                style={{
                  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                  fontSize: 14,
                  backgroundColor: 'transparent',
                  minHeight: '100%',
                  whiteSpace: isWrapped ? 'pre-wrap' : 'pre'
                }}
                textareaClassName="editor-textarea-focus"
              />
          </div>
          
          {output !== null && (
            <div style={{ width: '400px', backgroundColor: '#000', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '8px 16px', backgroundColor: '#1e293b', borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: 600 }}>
                Console Output
              </div>
              <div className={`output-window ${isError ? 'error' : ''}`} style={{ flex: 1, margin: 0, borderRadius: 0, border: 'none', overflowY: 'auto' }}>
                {output}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullscreenCodeModal;
