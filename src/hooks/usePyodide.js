import { useState, useEffect } from 'react';

export function usePyodide() {
  const [pyodide, setPyodide] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let script;
    
    const loadPyodideRuntime = async () => {
      try {
        if (window.loadPyodide) {
          const py = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/"
          });
          setPyodide(py);
          setIsLoading(false);
          return;
        }

        // If not in window, inject script
        script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js";
        script.async = true;
        
        script.onload = async () => {
          try {
            const py = await window.loadPyodide({
              indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/"
            });
            setPyodide(py);
            setIsLoading(false);
          } catch (err) {
            setError(err.message);
            setIsLoading(false);
          }
        };

        script.onerror = () => {
          setError("Failed to load Pyodide script from CDN");
          setIsLoading(false);
        };

        document.body.appendChild(script);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    loadPyodideRuntime();

    return () => {
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const runCode = async (code) => {
    if (!pyodide) throw new Error("Pyodide not loaded");
    
    // We need to capture stdout
    let output = "";
    pyodide.setStdout({ batched: (msg) => { output += msg + "\\n"; } });
    pyodide.setStderr({ batched: (msg) => { output += msg + "\\n"; } });

    try {
      const result = await pyodide.runPythonAsync(code);
      if (result !== undefined && !output.trim()) {
        output += String(result);
      }
      return output;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return { pyodide, isLoading, error, runCode };
}
