"use client";
import { Snippet } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Trash2, User, Loader2 } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import StarButton from "@/components/StarButton";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

function SnippetCard({ snippet }: { snippet: Snippet }) {
  const { user } = useUser();
  const deleteSnippet = useMutation(api.snippets.deleteSnippet);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteSnippet({ snippetId: snippet._id });
    } catch (error) {
      console.log("Error deleting snippet:", error);
      toast.error("Error deleting snippet");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      layout
      className="group relative"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/snippets/${snippet._id}`} className="h-full block">
        <motion.div
          className="relative h-full bg-black/30 rounded-xl border border-gray-800/50
           shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20
                    group-hover:opacity-30 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                  <Image
                    src={`/${snippet.language}.png`}
                    alt={`${snippet.language} logo`}
                    className="w-6 h-6 rounded-md relative z-10"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="space-y-0.5">
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md text-xs font-medium">
                    {snippet.language}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(snippet._creationTime).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div
                className="absolute top-6 right-6 flex gap-2 items-center"
                onClick={(e) => e.preventDefault()}
              >
                <StarButton snippetId={snippet._id} />
                {user?.id === snippet.userId && (
                  <div>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className={`
                        p-1.5 rounded-md transition-colors duration-200
                        ${isDeleting
                          ? "bg-red-500/20 text-red-400 cursor-not-allowed"
                          : "bg-gray-800 hover:bg-red-500/10 text-gray-400 hover:text-red-400"
                        }
                      `}
                    >
                      {isDeleting ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-white line-clamp-1 group-hover:text-blue-400 transition-colors">
                {snippet.title}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <User className="w-3 h-3" />
                <span className="truncate max-w-[150px]">{snippet.userName}</span>
              </div>
              <div className="relative group/code">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-md opacity-0 group-hover/code:opacity-100 transition-opacity duration-300" />
                <SyntaxHighlighter
                  language={snippet.language}
                  style={prism}
                  className="bg-black/20 rounded-md p-4 overflow-hidden text-sm font-mono line-clamp-4"
                  wrapLongLines
                >
                  {snippet.code}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
export default SnippetCard;
