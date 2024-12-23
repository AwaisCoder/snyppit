// useCodeEditorStore.ts
import { CodeEditorState } from "./../types/index";
import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import { create } from "zustand";
import { Monaco } from "@monaco-editor/react";
import OpenAI from 'openai';
import debounce from 'lodash/debounce';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: Move to backend in production
});

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 16,
      theme: "vs-dark",
      suggestionsEnabled: true,
    };
  }

  const savedLanguage = localStorage.getItem("editor-language") || "javascript";
  const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
  const savedFontSize = localStorage.getItem("editor-font-size") || "16";
  const savedSuggestionsEnabled = localStorage.getItem("suggestions-enabled") !== "false";

  return {
    language: savedLanguage,
    theme: savedTheme,
    fontSize: Number(savedFontSize),
    suggestionsEnabled: savedSuggestionsEnabled,
  };
};

// Debounced suggestion request to prevent too many API calls
const debouncedRequest = debounce(async (
  prompt: string,
  language: string,
  callback: (suggestion: string) => void
) => {
  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `Complete the following ${language} code:\n${prompt}`,
      max_tokens: 100,
      temperature: 0.3,
      stop: ["\n\n"],
    });

    const suggestion = response.choices[0]?.text;
    if (suggestion) {
      callback(suggestion);
    }
  } catch (error) {
    console.error('Error getting suggestions:', error);
  }
}, 500);

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,

    getCode: () => get().editor?.getValue() || "",

    setEditor: (editor: Monaco) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);
      if (savedCode) editor.setValue(savedCode);

      // Set up suggestion provider
      editor.getModel()?.setEOL(0);
      editor.updateOptions({ suggestOnTriggerCharacters: true });

      // Add event listener for content changes
      editor.onDidChangeModelContent(async (event) => {
        if (!get().suggestionsEnabled) return;

        const position = editor.getPosition();
        if (!position) return;

        // Only trigger suggestions after specific characters
        const lastChar = event.changes[0]?.text;
        const triggerChars = ['{', '(', '.', ' ', '\n'];
        if (!triggerChars.includes(lastChar)) return;

        const model = editor.getModel();
        if (!model) return;

        // Get context for suggestion
        const currentLine = model.getLineContent(position.lineNumber);
        const previousLines = model.getLinesContent().slice(
          Math.max(0, position.lineNumber - 5),
          position.lineNumber - 1
        );
        const context = [...previousLines, currentLine].join('\n');

        debouncedRequest(context, get().language, (suggestion) => {
          if (!get().suggestionsEnabled) return;

          editor.trigger('keyboard', 'editor.action.showHover', {
            text: suggestion,
            range: {
              startLineNumber: position.lineNumber,
              startColumn: position.column,
              endLineNumber: position.lineNumber,
              endColumn: position.column + suggestion.length
            }
          });
        });
      });

      set({ editor });
    },

    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },

    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", fontSize.toString());
      set({ fontSize });
    },

    setLanguage: (language: string) => {
      const currentCode = get().editor?.getValue();
      if (currentCode) {
        localStorage.setItem(`editor-code-${get().language}`, currentCode);
      }

      localStorage.setItem("editor-language", language);

      set({
        language,
        output: "",
        error: null,
      });
    },

    toggleSuggestions: () => {
      const newValue = !get().suggestionsEnabled;
      localStorage.setItem("suggestions-enabled", newValue.toString());
      set({ suggestionsEnabled: newValue });
    },

    // ... rest of your existing methods (runCode, etc.)
  };
});

export const getExecutionResult = () => useCodeEditorStore.getState().executionResult;