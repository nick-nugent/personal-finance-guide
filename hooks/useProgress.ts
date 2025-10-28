"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ProgressMap = Record<string, boolean>;

export const PROGRESS_STORAGE_KEY = "pf:progress:v1";

function readProgressFromStorage(): ProgressMap {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== "object" || parsed === null) {
      return {};
    }

    const entries = Object.entries(parsed).filter(([, value]) => value === true);
    return Object.fromEntries(entries);
  } catch (error) {
    console.warn("Failed to read progress from localStorage:", error);
    return {};
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const isHydratedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setProgress(readProgressFromStorage());
    isHydratedRef.current = true;
  }, []);

  useEffect(() => {
    if (!isHydratedRef.current || typeof window === "undefined") {
      return;
    }

    const entries = Object.entries(progress).filter(([, value]) => value === true);
    if (entries.length === 0) {
      window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(Object.fromEntries(entries)));
  }, [progress]);

  const setCompleted = useCallback((id: string, completed: boolean) => {
    setProgress((prev) => {
      if (completed) {
        if (prev[id]) {
          return prev;
        }
        return {
          ...prev,
          [id]: true
        };
      }

      if (!prev[id]) {
        return prev;
      }

      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const toggleCompleted = useCallback((id: string) => {
    setProgress((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = true;
      }
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({});
  }, []);

  return {
    progress,
    completedIds: Object.keys(progress),
    isCompleted: (id: string) => Boolean(progress[id]),
    setCompleted,
    toggleCompleted,
    resetProgress
  };
}

