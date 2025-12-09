import React, { useState, useCallback, useRef } from 'react';
import CryptoJS from 'crypto-js';

export const EncryptionTool: React.FC = () => {
  const [encryptionKey, setEncryptionKey] = useState('');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [alert, setAlert] = useState<{ message: string; show: boolean }>({ message: '', show: false });
  const keyInputRef = useRef<HTMLInputElement>(null);

  const showAlert = useCallback((message: string) => {
    setAlert({ message, show: true });
    setTimeout(() => {
      setAlert({ message: '', show: false });
    }, 3000);
  }, []);

  const handleEncrypt = useCallback(() => {
    if (!encryptionKey) {
      showAlert('Please enter an encryption key!');
      return;
    }

    if (!inputText) {
      showAlert('Please enter some text to encrypt!');
      return;
    }

    try {
      const encrypted = CryptoJS.AES.encrypt(inputText, encryptionKey).toString();
      setOutputText(encrypted);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      showAlert('Encryption failed: ' + errorMessage);
    }
  }, [encryptionKey, inputText, showAlert]);

  const handleClear = useCallback(() => {
    setEncryptionKey('');
    setInputText('');
    setOutputText('');
    keyInputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('inputText')?.focus();
    }
  }, []);

  return (
    <>
      {alert.show && (
        <div
          className={`fixed top-5 right-5 bg-red-500 text-white px-5 py-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
            alert.show ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-96'
          }`}
        >
          {alert.message}
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        <div className="card">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">🔐 Text Encryption Tool</h1>

          <div className="mb-5">
            <label className="block text-gray-600 font-semibold mb-2 text-sm" htmlFor="encryptionKey">
              Encryption Key:
            </label>
            <input
              ref={keyInputRef}
              type="text"
              id="encryptionKey"
              className="input-text"
              placeholder="Enter your encryption key"
              value={encryptionKey}
              onChange={(e) => setEncryptionKey(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-600 font-semibold mb-2 text-sm" htmlFor="inputText">
              Input Text:
            </label>
            <textarea
              id="inputText"
              className="textarea-base min-h-[120px]"
              placeholder="Enter the text you want to encrypt..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-600 font-semibold mb-2 text-sm" htmlFor="outputText">
              Encrypted Output:
            </label>
            <textarea
              id="outputText"
              className="textarea-base min-h-[120px] bg-gray-50"
              placeholder="Encrypted text will appear here..."
              value={outputText}
              readOnly
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button className="btn-primary flex-1" onClick={handleEncrypt}>
              Convert
            </button>
            <button className="btn-secondary flex-1" onClick={handleClear}>
              Clear
            </button>
          </div>

          <div className="mt-5 p-4 bg-gray-50 border-l-4 border-[#667eea] rounded text-sm text-gray-600">
            <strong>How to use:</strong> Enter an encryption key, type your message in the input field, and click
            "Convert" to encrypt your text using AES-256 encryption.
          </div>
        </div>
      </div>
    </>
  );
};
