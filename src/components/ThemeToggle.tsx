"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import DarkIcon from "@/icons/DarkIcon";
import LightIcon from "@/icons/LightIcon";
import SystemIcon from "@/icons/SystemIcon";

const TOGGLE_STATES = {
  system: { icon: <SystemIcon />, label: "system mode" },
  light: { icon: <LightIcon />, label: "light mode" },
  dark: { icon: <DarkIcon />, label: "dark mode" },
} as const;

export type ToggleState = keyof typeof TOGGLE_STATES;
export type Theme = keyof Omit<typeof TOGGLE_STATES, "system">;

const TOGGLE_STATE_CYCLE = ["system", "light", "dark"] as const;

const STORAGE_KEY = "themeToggleState";

function isValidToggleState(value?: string | null): value is ToggleState {
  return value != null && value in TOGGLE_STATES;
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  return mediaQuery.matches ? "dark" : "light";
}

function getStoredToggleState(): ToggleState {
  if (typeof window === "undefined") return "system";

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isValidToggleState(stored)) {
      return stored;
    }
  } catch (error) {
    console.warn("Failed to read theme from localStorage:", error);
  }

  return "system";
}

function resolveTheme(toggleState: ToggleState): Theme {
  if (toggleState === "system") {
    return getSystemTheme();
  }
  return toggleState;
}

function getNextToggleState(current: ToggleState): ToggleState {
  const currentIndex = TOGGLE_STATE_CYCLE.indexOf(current);
  const nextIndex = (currentIndex + 1) % TOGGLE_STATE_CYCLE.length;
  return TOGGLE_STATE_CYCLE[nextIndex];
}

export const THEME_BOOTSTRAP_SCRIPT = `(function() {
  try {
    const theme = localStorage.getItem('${STORAGE_KEY}') || 'system';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'system');
  }
})();`;

export default function ThemeToggle() {
  const [resolvedTheme, setResolvedTheme] = useState<Theme | null>(null);
  const [toggleState, setToggleState] = useState<ToggleState>("system");

  useLayoutEffect(() => {
    const htmlTheme = document.documentElement.getAttribute("data-theme");
    const initialToggleState = isValidToggleState(htmlTheme)
      ? htmlTheme
      : getStoredToggleState();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToggleState(initialToggleState);
    setResolvedTheme(resolveTheme(initialToggleState));
  }, []);

  // Sync resolved theme with system preference if theme is "system"
  useEffect(() => {
    if (typeof window === "undefined" || toggleState !== "system") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setResolvedTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [toggleState]);

  if (resolvedTheme == null) {
    return null;
  }

  const nextToggleState = getNextToggleState(toggleState);

  const cycleToggleState = (nextToggleState: ToggleState) => {
    setToggleState(nextToggleState);
    setResolvedTheme(resolveTheme(nextToggleState));

    // Update HTML attribute
    document.documentElement.setAttribute("data-theme", nextToggleState);

    // Persist to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, nextToggleState);
    } catch (error) {
      console.warn("Failed to save theme to localStorage:", error);
    }
  };

  return (
    <button
      onClick={() => cycleToggleState(nextToggleState)}
      title={`Switch to ${TOGGLE_STATES[nextToggleState].label}`}
      aria-label={`Switch to ${TOGGLE_STATES[nextToggleState].label}`}
      className="theme-toggle"
      type="button"
    >
      {TOGGLE_STATES[toggleState].icon}
    </button>
  );
}
