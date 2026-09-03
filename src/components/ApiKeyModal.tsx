import React, { useState, useEffect } from 'react';
import { X, Key, Check, ShieldCheck, ExternalLink } from 'lucide-react';
import { getStoredApiKey, saveStoredApiKey, removeStoredApiKey } from '../services/geminiService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApiKeySaved: (hasKey: boolean) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  onApiKeySaved
}) => {
  if (!isOpen) return null;

  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setApiKeyInput(getStoredApiKey());
  }, [isOpen]);

  const handleSave = () => {
    if (apiKeyInput.trim()) {
      saveStoredApiKey(apiKeyInput.trim());
      setIsSaved(true);
      onApiKeySaved(true);
      setTimeout(() => {
        setIsSaved(false);
        onClose();
      }, 800);
    }
  };

  const handleRemove = () => {
    removeStoredApiKey();
    setApiKeyInput('');
    onApiKeySaved(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">Google Gemini AI Configuration</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <div className="space-y-3 text-xs text-slate-300">
          <p>
            You can generate B.Sc. question papers using the <strong>built-in curriculum repository (No API key required)</strong>, or optionally connect your <strong>Google Gemini API Key</strong> for custom lecture notes and niche university syllabi.
          </p>

          <div className="flex items-start space-x-2 p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-400">
              Your API key is stored securely in your local browser storage only.
            </p>
          </div>
        </div>

        {/* Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Gemini API Key
          </label>
          <input
            type="password"
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-xs font-mono focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center space-x-1 text-xs text-indigo-400 hover:text-indigo-300 underline"
        >
          <span>Get a free Gemini API Key from Google AI Studio</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          {apiKeyInput ? (
            <button
              onClick={handleRemove}
              className="text-xs text-red-400 hover:text-red-300 underline"
            >
              Remove Key
            </button>
          ) : <div />}

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition"
            >
              {isSaved ? <Check className="w-3.5 h-3.5" /> : null}
              <span>{isSaved ? 'Saved!' : 'Save Key'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
