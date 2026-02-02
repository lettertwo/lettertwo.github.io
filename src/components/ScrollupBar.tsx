"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollupBar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [scrolledToContent, setScrolledToContent] = useState(false);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const scrollContainer = window.document.body;

    function handleScroll() {
      const scrollTop = scrollContainer.scrollTop;
      setScrollDirection(scrollTop > lastScrollTop.current ? "down" : "up");
      setScrolledToContent(scrollTop > 100);
      lastScrollTop.current = scrollTop;
    }

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="scrollup-bar"
      className={
        scrollDirection == "down" || scrolledToContent ? "hidden" : undefined
      }
    >
      {children}
    </div>
  );
}
