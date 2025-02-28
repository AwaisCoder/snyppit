"use client";
import LoginButton from "@/components/LoginButton";
import { SignedOut, UserButton } from "@clerk/nextjs";
import { LogIn, User } from "lucide-react";
import { Button } from "../../../../_components/ui/button";

function HomeBtn() {
  return (
    <a href="/home">
      <button
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg
             transition-all duration-200 font-medium shadow-lg shadow-blue-500/20"
      >
        <LogIn className="w-4 h-4 transition-transform" />
        <span>Dashboard</span>
      </button>
    </a>
  );
}
export default HomeBtn;
