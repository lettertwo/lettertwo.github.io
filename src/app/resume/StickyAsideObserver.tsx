"use client";

import { useEffect, useState } from "react";

interface StickyAsideObserverProps {
  children?: React.ReactNode;
}

export default function StickyAsideObserver({
  children,
}: StickyAsideObserverProps) {
  const [isAsideStuck, setIsAsideStuck] = useState(true);

  useEffect(() => {
    const sentinel = document.querySelector(".sticky-aside-sentinel");

    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAsideStuck(entry.isIntersecting);
      },
      { threshold: 1 },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="sticky-aside-sentinel"></div>
      <div className={`sticky-aside ${!isAsideStuck ? "stuck" : ""}`}>
        {children}
      </div>
    </>
  );
}
