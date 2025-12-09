import React, { useState, useCallback } from 'react';
import { parseLogInput, extractLogs } from '../../utils/logParser';
import type { LogStats } from '../../types';

export const LogExtractor: React.FC = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [logOutput, setLogOutput] = useState('No logs extracted yet. Paste JSON above and click "Extract Logs".');
  const [isError, setIsError] = useState(false);
  const [stats, setStats] = useState<LogStats | null>(null);
  const [copyButtonText, setCopyButtonText] = useState('📋 Copy Logs');
  const [copyButtonStyle, setCopyButtonStyle] = useState('btn-primary');

  const handleExtractLogs = useCallback(() => {
    const input = jsonInput.trim();

    if (!input) {
      setLogOutput('Please paste JSON data first.');
      setIsError(true);
      setStats(null);
      return;
    }

    try {
      const data = parseLogInput(input);

      console.log('Parsed objects:', data.length);
      if (data.length > 0) {
        console.log('First object keys:', Object.keys(data[0]));
        console.log('First object:', data[0]);
      }

      const logs = extractLogs(data);

      if (logs.length === 0) {
        let errorMessage = `No "log" field found in the provided JSON data.\n\nParsed ${data.length} objects.\n\n`;

        if (data.length > 0) {
          errorMessage += `First object keys: ${Object.keys(data[0]).join(', ')}\n\n`;
          errorMessage += `Sample object:\n${JSON.stringify(data[0], null, 2).substring(0, 300)}...`;
        }

        setLogOutput(errorMessage);
        setIsError(true);
        setStats(null);
        return;
      }

      // Display the logs
      const logText = logs.join('\n');
      setLogOutput(logText);
      setIsError(false);
      setStats({
        totalCount: logs.length,
        charCount: logText.length,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setLogOutput(
        `Error parsing JSON: ${errorMessage}\n\nPlease ensure your input is valid JSON format.\n\nTip: Make sure each JSON object is complete and properly formatted.`
      );
      setIsError(true);
      setStats(null);
      console.error('Parse error:', error);
      console.log('Input preview:', input.substring(0, 500));
    }
  }, [jsonInput]);

  const handleCopyLogs = useCallback(async () => {
    const originalText = copyButtonText;

    try {
      await navigator.clipboard.writeText(logOutput);

      setCopyButtonText('✓ Copied!');
      setCopyButtonStyle('bg-gradient-to-br from-green-500 to-green-400 text-white border-none rounded-lg font-semibold cursor-pointer transition-transform duration-200 px-5 py-2 text-sm');

      setTimeout(() => {
        setCopyButtonText(originalText);
        setCopyButtonStyle('btn-primary');
      }, 2000);
    } catch (err) {
      setCopyButtonText('✗ Failed');
      setCopyButtonStyle('bg-gradient-to-br from-red-500 to-red-400 text-white border-none rounded-lg font-semibold cursor-pointer transition-transform duration-200 px-5 py-2 text-sm');

      setTimeout(() => {
        setCopyButtonText(originalText);
        setCopyButtonStyle('btn-primary');
      }, 2000);
    }
  }, [logOutput, copyButtonText]);

  const handleClearLogs = useCallback(() => {
    setJsonInput('');
    setLogOutput('No logs extracted yet. Paste JSON above and click "Extract Logs".');
    setIsError(false);
    setStats(null);
    setCopyButtonText('📋 Copy Logs');
    setCopyButtonStyle('btn-primary');
  }, []);

  const handleExportLogs = useCallback(() => {
    if (!stats || isError) {
      return;
    }

    const blob = new Blob([logOutput], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    link.href = url;
    link.download = `logs-${timestamp}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [logOutput, stats, isError]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleExtractLogs();
    }
  }, [handleExtractLogs]);

  return (
    <>
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">📋 Log Text Extractor</h1>
        <p className="text-gray-600 mb-5">Paste your JSON data below to extract log text</p>

        <textarea
          className="textarea-base min-h-[200px] mb-4"
          placeholder={`Paste your JSON here, e.g.:
{
    "log": "Your log message here",
    "kubernetes": {...}
}`}
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="flex flex-wrap gap-3">
          <button className="btn-primary" onClick={handleExtractLogs}>
            Extract Logs
          </button>
          <button
            className="bg-gradient-to-br from-gray-500 to-gray-400 text-white border-none rounded-lg font-semibold cursor-pointer transition-transform duration-200 px-5 py-2 text-sm hover:scale-105 active:scale-95"
            onClick={handleClearLogs}
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      <div className="card mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 m-0">Extracted Logs</h2>
          {stats && (
            <div className="flex flex-wrap gap-3">
              <button className={copyButtonStyle} onClick={handleCopyLogs}>
                {copyButtonText}
              </button>
              <button
                className="bg-gradient-to-br from-blue-500 to-blue-400 text-white border-none rounded-lg font-semibold cursor-pointer transition-transform duration-200 px-5 py-2 text-sm hover:scale-105 active:scale-95"
                onClick={handleExportLogs}
              >
                💾 Export to File
              </button>
            </div>
          )}
        </div>
        <div
          className={`${
            isError
              ? 'bg-red-50 border-2 border-red-200 text-red-700'
              : 'bg-gray-50 border-2 border-gray-200 text-gray-800'
          } rounded-lg p-5 min-h-[100px] font-mono text-sm whitespace-pre-wrap break-words ${
            !stats && !isError ? 'text-gray-500 italic' : ''
          }`}
        >
          {logOutput}
        </div>
        {stats && (
          <div className="flex flex-wrap gap-5 mt-4">
            <div className="bg-gray-100 px-4 py-2.5 rounded-md text-sm">
              <span className="text-gray-600 font-semibold">Total Entries:</span>
              <span className="text-gray-800 ml-1">{stats.totalCount}</span>
            </div>
            <div className="bg-gray-100 px-4 py-2.5 rounded-md text-sm">
              <span className="text-gray-600 font-semibold">Total Characters:</span>
              <span className="text-gray-800 ml-1">{stats.charCount}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
