'use client';
import { useState, useMemo } from "react";
export default function useWidth() {
  const [width, setWidth] = useState(0);
  // breakpoints
  const breakpoints = {
    sm: "640",
    md: "768",
    lg: "1024",
    xl: "1280",
  };

  // resize widnow size and set width by useMemo
  useMemo(() => {
   if (typeof window !== "undefined") {
      // Set initial width
      setWidth(window.innerWidth);
      
      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      
      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return { width, breakpoints };
}
