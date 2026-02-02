"use client";

import { useEffect, useState } from "react";

interface StickyAsideObserverProps {
  children?: React.ReactNode;
}

export default function StickyAsideObserver({
  children,
}: StickyAsideObserverProps) {
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.querySelector(".sticky-aside-sentinel");

    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setIsVisible(!entry.isIntersecting || entry.intersectionRatio < 1);
      },
      { threshold: [0, 1] },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        className={`sticky-aside-sentinel${isIntersecting ? " intersecting" : ""}`}
      ></div>
      <div className={`sticky-aside-content${isVisible ? " visible" : ""}`}>
        {children}
      </div>
    </>
  );
}
