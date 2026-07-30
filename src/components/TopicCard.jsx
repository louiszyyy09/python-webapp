import React, { useState } from 'react';
import { Copy, Check, Lightbulb, Play, Bookmark, Target, Key, Maximize, WrapText, AlertTriangle, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import FullscreenCodeModal from './FullscreenCodeModal';

// Helper to highlight search terms
const HighlightText = ({ text, highlight }) => {
  if (!highlight || !text) return <>{text}</>;
  
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, i) => 
        regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
      )}
    </>
  );
};

const TopicCard = ({ 
  topic, 
  theme, 
  isCompleted, 
  onToggleComplete,
  isBookmarked,
  onToggleBookmark,
  searchQuery,
  runCode,
  isPyodideLoading
}) => {
  const [copied, setCopied] = useState(false);
  const [editableCode, setEditableCode] = useState(topic.syntaxCode || "");
  const [output, setOutput] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isWrapped, setIsWrapped] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(editableCode);
    setCopied(true);
    toast.success('Code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = async () => {
    if (!runCode || isPyodideLoading) {
      toast.error('Python environment is still loading...');
      return;
    }
    
    setIsRunning(true);
    setOutput(null);
    setIsError(false);
    
    try {
      const result = await runCode(editableCode);
      setOutput(result || "Code executed successfully (No Output)");
    } catch (err) {
      setOutput(err.message);
      setIsError(true);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="topic-card" id={topic.id}>
      <div className="topic-header">
        <div className="topic-title-group">
          <h2 className="topic-title">
            <HighlightText text={topic.title} highlight={searchQuery} />
          </h2>
          <span className={`level-tag ${topic.level.toLowerCase()}`}>
            {topic.level}
          </span>
        </div>
        
        <button 
          className="icon-btn" 
          onClick={() => {
            onToggleBookmark(topic.id);
            toast(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks', { icon: isBookmarked ? '❌' : '🔖' });
          }}
          title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
          style={{ color: isBookmarked ? 'var(--tag-intermediate)' : 'var(--text-muted)' }}
        >
          <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      {topic.deepExplanation && (
        <div className="topic-explanation">
          <HighlightText text={topic.deepExplanation} highlight={searchQuery} />
        </div>
      )}

      {/* 1. When to Use */}
      {topic.whenToUse && topic.whenToUse.length > 0 && (
        <div className="section-block">
          <h3 className="section-title"><Target size={18} color="var(--accent-primary)" /> 🎯 ใช้ตอนไหน (When to Use)</h3>
          <ul className="bullet-list">
            {topic.whenToUse.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* 2. Syntax & Example */}
      {topic.syntaxCode && (
        <div className="section-block">
          <h3 className="section-title"><Lightbulb size={18} color="var(--accent-secondary)" /> 💡 Syntax & Example</h3>
          
          <div className="code-section" style={{ position: 'relative', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            {/* Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px', backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)', gap: '8px' }}>
              <button className="icon-btn" onClick={() => setIsWrapped(!isWrapped)} title="Toggle Word Wrap">
                <WrapText size={16} color={isWrapped ? 'var(--accent-secondary)' : 'currentColor'} />
              </button>
              <button className="icon-btn" onClick={() => setIsFullScreen(true)} title="Maximize">
                <Maximize size={16} />
              </button>
              <button className="icon-btn" onClick={handleCopy} title="Copy Code">
                {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
              </button>
              <button 
                className="btn-primary" 
                onClick={handleRun} 
                disabled={isPyodideLoading || isRunning}
                title="Run Code"
                style={{ padding: '4px 12px', fontSize: '0.8rem' }}
              >
                {isRunning ? 'Running...' : <><Play size={12} style={{ marginRight: '4px' }} /> Run</>}
              </button>
            </div>
            
            <div style={{ backgroundColor: '#1e1e1e', minHeight: '120px' }}>
              <Editor
                value={editableCode}
                onValueChange={code => setEditableCode(code)}
                highlight={code => Prism.highlight(code, Prism.languages.python, 'python')}
                padding={16}
                style={{
                  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                  fontSize: 14,
                  backgroundColor: 'transparent',
                  color: '#d4d4d4',
                  whiteSpace: isWrapped ? 'pre-wrap' : 'pre'
                }}
                textareaClassName="editor-textarea-focus"
              />
            </div>
          </div>
          
          {output !== null && (
            <div className={`output-window ${isError ? 'error' : ''}`}>
              {output}
            </div>
          )}
        </div>
      )}

      {/* 3. Accessing Data & Unpacking */}
      {topic.dataAccessAndUnpacking && (
        <div className="section-block">
          <h3 className="section-title"><Key size={18} color="var(--tag-intermediate)" /> 🔑 Data Access & Unpacking</h3>
          <div className="static-code-block" style={{ backgroundColor: '#1e1e1e', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
             <Editor
                value={topic.dataAccessAndUnpacking}
                onValueChange={() => {}}
                highlight={code => Prism.highlight(code, Prism.languages.python, 'python')}
                padding={16}
                disabled={true}
                style={{
                  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                  fontSize: 14,
                  backgroundColor: 'transparent',
                  color: '#d4d4d4'
                }}
              />
          </div>
        </div>
      )}
      
      {/* 4. Edge Cases & Errors */}
      {topic.edgeCasesAndErrors && (
        <div className="tip-box error-box" style={{ marginTop: '20px', padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <AlertTriangle size={24} color="#ef4444" />
            <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>⚠️ Edge Cases & Errors</div>
          </div>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
            {topic.edgeCasesAndErrors}
          </div>
        </div>
      )}

      {/* 5. Static Quiz */}
      {topic.quiz && topic.quiz.length > 0 && (
        <div className="section-block quiz-block" style={{ marginTop: '24px', padding: '20px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
          <h3 className="section-title" style={{ marginBottom: '16px' }}><HelpCircle size={18} color="var(--accent-primary)" /> 🧠 Knowledge Check</h3>
          {topic.quiz.map((q, idx) => (
            <div key={idx} className="quiz-item" style={{ marginBottom: idx !== topic.quiz.length - 1 ? '24px' : '0' }}>
              <p style={{ fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)' }}>Q{idx + 1}: {q.question}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                {q.options.map((opt, optIdx) => {
                  const isCorrect = optIdx === q.correctIndex;
                  return (
                    <div 
                      key={optIdx} 
                      style={{ 
                        padding: '10px 14px', 
                        borderRadius: 'var(--radius-sm)', 
                        border: `1px solid ${isCorrect ? 'var(--tag-beginner)' : 'var(--border-color)'}`,
                        backgroundColor: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-secondary)',
                        color: isCorrect ? 'var(--tag-beginner)' : 'var(--text-secondary)',
                        fontWeight: isCorrect ? '500' : '400',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      {opt}
                      {isCorrect && <Check size={16} />}
                    </div>
                  )
                })}
              </div>
              <div style={{ fontSize: '0.85rem', padding: '12px', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-secondary)' }}>
                <strong>Explanation:</strong> {q.explanation}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="topic-actions" style={{ marginTop: '24px' }}>
        <button 
          className="btn-primary" 
          onClick={() => {
            onToggleComplete(topic.id);
            if (!isCompleted) toast.success('Topic Mastered! 🎉');
          }}
          style={{ backgroundColor: isCompleted ? 'var(--tag-beginner)' : 'var(--bg-tertiary)' }}
        >
          {isCompleted ? (
            <>
              <Check size={16} /> Mastered
            </>
          ) : (
            'Mark as Mastered'
          )}
        </button>
      </div>

      <FullscreenCodeModal 
        isOpen={isFullScreen}
        onClose={() => setIsFullScreen(false)}
        code={editableCode}
        setCode={setEditableCode}
        title={topic.title}
        onRun={handleRun}
        isRunning={isRunning}
        output={output}
        isError={isError}
        theme={theme}
      />
    </div>
  );
};

export default TopicCard;
