"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <div className="hover:bg-slate-800 p-3 rounded-full transition-all">
          <BsFillSunFill className="text-orange-300" />
        </div>
      ) : (
        <div className="hover:bg-zinc-100 p-3 rounded-full transition-all">
          <BsFillMoonFill className="text-slate-800" />
        </div>
      )}
    </button>
  );
};

export default ThemeButton;
