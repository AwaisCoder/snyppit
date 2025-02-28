"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useState } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import { Editor } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import Image from "next/image";
import {
  RotateCcwIcon,
  ShareIcon,
  TypeIcon,
  Settings,
  Download,
} from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { EditorPanelSkeleton } from "./EditorPanelSkeleton";
import useMounted from "@/hooks/useMounted";
import ShareSnippetDialog from "./ShareSnippetDialog";
import { Button } from "../../../../_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../_components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../../../../_components/ui/tooltip";
import { Badge } from "../../../../_components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../../../../_components/ui/tabs";
import { Card, CardContent, CardHeader } from "../../../../_components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function EditorPanel() {
  const clerk = useClerk();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const { language, theme, fontSize, editor, setFontSize, setEditor } =
    useCodeEditorStore();
  const [activeTab, setActiveTab] = useState("editor");
  const [wordWrap, setWordWrap] = useState<
    "off" | "on" | "wordWrapColumn" | "bounded"
  >("off");
  const [fontFamily, setFontFamily] = useState(
    '"Fira Code", "Cascadia Code", Consolas, monospace'
  );

  const mounted = useMounted();

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.getModel()?.setValue(newCode);
  }, [language, editor]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size");
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize]);

  useEffect(() => {
    const savedWordWrap = localStorage.getItem("editor-word-wrap");
    if (savedWordWrap)
      setWordWrap(savedWordWrap as "off" | "on" | "wordWrapColumn" | "bounded");
  }, []);

  useEffect(() => {
    const savedFontFamily = localStorage.getItem("editor-font-family");
    if (savedFontFamily) setFontFamily(savedFontFamily);
  }, []);

  useEffect(() => {
    if (editor) {
      editor.updateOptions({ wordWrap });
    }
    localStorage.setItem("editor-word-wrap", wordWrap);
  }, [wordWrap, editor]);

  useEffect(() => {
    if (editor) {
      editor.updateOptions({ fontFamily });
    }
    localStorage.setItem("editor-font-family", fontFamily);
  }, [fontFamily, editor]);

  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(defaultCode);
    localStorage.removeItem(`editor-code-${language}`);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value) localStorage.setItem(`editor-code-${language}`, value);
  };

  const handleFontSizeChange = (value: string) => {
    const size = Math.min(Math.max(parseInt(value), 12), 24);
    setFontSize(size);
    localStorage.setItem("editor-font-size", size.toString());
  };

  const handleDownloadCode = () => {
    if (!editor) return;
    const code = editor.getValue();
    const blob = new Blob([code], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${LANGUAGE_CONFIG[language].extension}`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!mounted) return null;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative bg-[#12121a]/90 backdrop-blur border-white/[0.05] shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1e1e2e] ring-1 ring-white/5">
                <Image
                  src={"/" + language + ".png"}
                  alt="Logo"
                  width={24}
                  height={24}
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-sm font-medium text-white">Code Editor</h2>
                <motion.div
                  className="transition-transform inline-block"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge
                    className="w-fit mt-1 text-xs font-semibold px-2 py-0.5 rounded-md"
                    style={{
                      backgroundColor:
                        language === "javascript"
                          ? "#f0db4f" // Yellow for JavaScript
                          : language === "python"
                            ? "#3776ab" // Blue for Python
                            : language === "java"
                              ? "#ea2d2e" // Red for Java
                              : language === "typescript"
                                ? "#007acc" // Blue for TypeScript
                                : "#6b7280", // Default grey
                      color: "#1e293b", // Dark text for contrast
                    }}
                  >
                    {LANGUAGE_CONFIG[language].label}
                  </Badge>
                </motion.div>
              </div>
            </motion.div>

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: "#2a2a3a" }}
                      whileTap={{ scale: 0.95 }}
                      className="h-8 bg-[#1e1e2e] rounded-md transition-transform duration-100"
                      onClick={handleRefresh}
                    >
                      <RotateCcwIcon className="w-4 h-4" />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>Reset code</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "#2a2a3a" }}
                    whileTap={{ scale: 0.95 }}
                    className="h-8 bg-[#1e1e2e] rounded-md transition-transform duration-100"
                  >
                    <Settings className="w-4 h-4" />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1e1e2e] border-white/[0.05]">
                  <DropdownMenuLabel className="text-white">
                    Editor Settings
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/[0.1]" />
                  <DropdownMenuItem
                    onClick={handleDownloadCode}
                    className="text-white hover:bg-blue-500/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Code
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Share Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsShareDialogOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg overflow-hidden bg-gradient-to-r
             from-blue-500 to-blue-600 opacity-90 hover:opacity-100 transition-opacity transition-transform duration-100"
              >
                <ShareIcon className="size-4 text-white" />
                <span className="text-sm font-medium text-white ">Share</span>
              </motion.button>
            </div>
          </div>

          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-[#1e1e2e] rounded-md p-1 space-x-1">
                <TabsTrigger
                  value="editor"
                  className={cn(
                    "relative w-32 md:w-40 lg:w-48 h-10 rounded-md outline outline-1 outline-transparent hover:outline-blue-500 hover:bg-blue-500/10 transition-colors duration-200 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                  )}
                >
                  Editor
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className={cn(
                    "relative w-32 md:w-40 lg:w-48 h-10 rounded-md outline outline-1 outline-transparent hover:outline-blue-500 hover:bg-blue-500/10 transition-colors duration-200 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                  )}
                >
                  Settings
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
        </CardHeader>
        <CardContent>
          {activeTab === "editor" ? (
            <motion.div
              className="relative group rounded-xl overflow-hidden ring-1 ring-white/[0.05]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              {clerk.loaded ? (
                <Editor
                  height="600px"
                  language={LANGUAGE_CONFIG[language].monacoLanguage}
                  onChange={handleEditorChange}
                  theme={theme}
                  beforeMount={defineMonacoThemes}
                  onMount={(editor) =>
                    setEditor(editor as editor.IStandaloneCodeEditor)
                  }
                  options={{
                    minimap: { enabled: false },
                    fontSize,
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    padding: { top: 16, bottom: 16 },
                    renderWhitespace: "selection",
                    fontFamily,
                    fontLigatures: true,
                    cursorBlinking: "smooth",
                    smoothScrolling: true,
                    contextmenu: true,
                    renderLineHighlight: "all",
                    lineHeight: 1.6,
                    letterSpacing: 0.5,
                    roundedSelection: true,
                    scrollbar: {
                      verticalScrollbarSize: 8,
                      horizontalScrollbarSize: 8,
                    },
                    wordWrap,
                  }}
                />
              ) : (
                <EditorPanelSkeleton />
              )}
            </motion.div>
          ) : (
            <motion.div
              className="p-4 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              {/* Font Size Slider */}
              <motion.div
                className="flex items-center gap-2 px-2 py-1 bg-[#1e1e2e] rounded-md ring-1 ring-white/5 w-fit hover:ring-blue-500 transition-shadow duration-200"
                whileHover={{ scale: 1.05 }}
              >
                <TypeIcon className="size-4 text-gray-400" />
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value={fontSize}
                    onChange={(e) => handleFontSizeChange(e.target.value)}
                    className="w-[120px] h-1 bg-gray-600 rounded-lg cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-400 min-w-[2rem] text-center">
                    {fontSize}
                  </span>
                </div>
              </motion.div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Font Family
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div>
                    <label className="flex items-center space-x-2 hover:bg-blue-500/5 rounded-md p-1 transition-colors duration-200 cursor-pointer">
                      <input
                        type="radio"
                        name="fontFamily"
                        value='"Fira Code", "Cascadia Code", Consolas, monospace'
                        className="w-4 h-4 text-blue-500 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                        checked={
                          fontFamily ===
                          '"Fira Code", "Cascadia Code", Consolas, monospace'
                        }
                        onChange={(e) => setFontFamily(e.target.value)}
                      />
                      <span className="text-sm text-gray-400">Fira Code</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 hover:bg-blue-500/5 rounded-md p-1 transition-colors duration-200 cursor-pointer">
                      <input
                        type="radio"
                        name="fontFamily"
                        value='"Roboto Mono", monospace'
                        className="w-4 h-4 text-blue-500 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                        checked={fontFamily === '"Roboto Mono", monospace'}
                        onChange={(e) => setFontFamily(e.target.value)}
                      />
                      <span className="text-sm text-gray-400">Roboto Mono</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 hover:bg-blue-500/5 rounded-md p-1 transition-colors duration-200 cursor-pointer">
                      <input
                        type="radio"
                        name="fontFamily"
                        value='Menlo, Monaco, "Courier New", monospace'
                        className="w-4 h-4 text-blue-500 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                        checked={
                          fontFamily ===
                          'Menlo, Monaco, "Courier New", monospace'
                        }
                        onChange={(e) => setFontFamily(e.target.value)}
                      />
                      <span className="text-sm text-gray-400">Menlo</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 hover:bg-blue-500/5 rounded-md p-1 transition-colors duration-200 cursor-pointer">
                      <input
                        type="radio"
                        name="fontFamily"
                        value='"Inconsolata", monospace'
                        className="w-4 h-4 text-blue-500 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                        checked={fontFamily === '"Inconsolata", monospace'}
                        onChange={(e) => setFontFamily(e.target.value)}
                      />
                      <span className="text-sm text-gray-400">Inconsolata</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Word Wrap
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="flex items-center space-x-2 hover:bg-blue-500/5 rounded-md p-1 transition-colors duration-200 cursor-pointer">
                      <input
                        type="radio"
                        name="wordWrap"
                        value="off"
                        className="w-4 h-4 text-blue-500 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                        checked={wordWrap === "off"}
                        onChange={(e) =>
                          setWordWrap(
                            e.target.value as
                              | "off"
                              | "on"
                              | "wordWrapColumn"
                              | "bounded"
                          )
                        }
                      />
                      <span className="text-sm text-gray-400">Off</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 hover:bg-blue-500/5 rounded-md p-1 transition-colors duration-200 cursor-pointer">
                      <input
                        type="radio"
                        name="wordWrap"
                        value="on"
                        className="w-4 h-4 text-blue-500 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                        checked={wordWrap === "on"}
                        onChange={(e) =>
                          setWordWrap(
                            e.target.value as
                              | "off"
                              | "on"
                              | "wordWrapColumn"
                              | "bounded"
                          )
                        }
                      />
                      <span className="text-sm text-gray-400">On</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 hover:bg-blue-500/5 rounded-md p-1 transition-colors duration-200 cursor-pointer">
                      <input
                        type="radio"
                        name="wordWrap"
                        value="wordWrapColumn"
                        className="w-4 h-4 text-blue-500 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                        checked={wordWrap === "wordWrapColumn"}
                        onChange={(e) =>
                          setWordWrap(
                            e.target.value as
                              | "off"
                              | "on"
                              | "wordWrapColumn"
                              | "bounded"
                          )
                        }
                      />
                      <span className="text-sm text-gray-400">Column</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 hover:bg-blue-500/5 rounded-md p-1 transition-colors duration-200 cursor-pointer">
                      <input
                        type="radio"
                        name="wordWrap"
                        value="bounded"
                        className="w-4 h-4 text-blue-500 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                        checked={wordWrap === "bounded"}
                        onChange={(e) =>
                          setWordWrap(
                            e.target.value as
                              | "off"
                              | "on"
                              | "wordWrapColumn"
                              | "bounded"
                          )
                        }
                      />
                      <span className="text-sm text-gray-400">Bounded</span>
                    </label>
                  </div>
                </div>
              </div>
              {/* Add more settings as needed */}
            </motion.div>
          )}
        </CardContent>
      </Card>
      {isShareDialogOpen && (
        <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />
      )}
    </motion.div>
  );
}

export default EditorPanel;
