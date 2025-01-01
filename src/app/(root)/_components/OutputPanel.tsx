"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { AlertTriangle, CheckCircle, Clock, Copy, Download, Terminal, Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";
import RunningCodeSkeleton from "./RunningCodeSkeleton";
import { Button } from "../../../../components/ui/button";
import { Card, CardHeader, CardContent } from "../../../../components/ui/card";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../../../../components/ui/tooltip";
import { Badge } from "../../../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";

function OutputPanel() {
  const { output, error, isRunning } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasContent = error || output;

  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!hasContent) return;
    const blob = new Blob([error || output], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `output-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className={`relative bg-[#181825] transition-all duration-300 ${isExpanded ? 'fixed inset-4 z-50' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
              <Terminal className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-300">Output</span>
              {isRunning && (
                <Badge
                  variant="secondary"
                  className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-500 text-white"
                >
                  Running
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasContent && (
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 bg-[#1e1e2e] hover:bg-[#2a2a3a]"
                >
                  Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-50 bg-[#1e1e2e] rounded-lg shadow-md">
                <DropdownMenuItem
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#2a2a3a]"
                >
                  <Copy className="w-4 h-4" />
                  <span className="text-sm font-medium"> 
                    {isCopied ? "Copied!" : "Copy"}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#2a2a3a]"
                >
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Download</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="h-8 bg-[#1e1e2e] hover:bg-[#2a2a3a]"
                  >
                    {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isExpanded ? 'Minimize window' : 'Maximize window'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className={`relative ${isExpanded ? 'h-[80vh]' : 'h-[600px]'} bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] rounded-xl p-4`}>
          {isRunning ? (
            <RunningCodeSkeleton />
          ) : error ? (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-2 bg-red-500/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div className="space-y-1">
                <div className="font-medium text-red-400">Execution Error</div>
                <pre className="whitespace-pre-wrap text-sm text-red-400/80 font-mono">{error}</pre>
              </div>
            </div>
          ) : output ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 p-2 bg-emerald-500/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="font-medium text-emerald-400">Execution Successful</span>
              </div>
              <div className="relative rounded-lg bg-[#1e1e2e] border border-[#313244] p-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono leading-relaxed">
                  {output}
                </pre>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-center text-sm">Run your code to see the output here</p>
              <p className="text-center text-xs text-gray-600 mt-1">
                Results will appear in this panel
              </p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default OutputPanel;