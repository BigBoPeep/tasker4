import React from "react";
import { useSignal } from "@preact/signals-react";
import { SidebarOpen, SidebarClose } from "lucide-react";

export default function Sidebar({ children, className }) {
  const open = useSignal(false);

  return (
    <div
      className={`absolute md:static w-[min(400px,60dvw)] h-full right-full
        transition-transform duration-500 ease-bounce transform-gpu flex flex-col 
        items-center gap-2 md:translate-0
        ${open.value ? "translate-x-full" : "translate-0"} ${className}`}
    >
      {children}
      <button
        className="absolute left-full top-[50%] md:hidden"
        onClick={() => {
          open.value = !open.value;
        }}
      >
        {open.value ? <SidebarClose /> : <SidebarOpen />}
      </button>
    </div>
  );
}
