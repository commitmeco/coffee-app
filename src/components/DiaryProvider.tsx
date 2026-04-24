"use client";

import { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { DiaryMap, DiaryEntry, DiaryStatus } from "@/lib/diary";

interface DiaryContextValue {
  entries: DiaryMap;
  hydrated: boolean;
  getEntry: (beanId: number) => DiaryEntry | undefined;
  setEntry: (beanId: number, status: DiaryStatus, notes: string) => void;
  updateNotes: (beanId: number, notes: string) => void;
  updateEntry: (beanId: number, updates: Partial<DiaryEntry>) => void;
  removeEntry: (beanId: number) => void;
}

const DiaryContext = createContext<DiaryContextValue | null>(null);

export function DiaryProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries, hydrated] = useLocalStorage<DiaryMap>(
    "coffee-diary",
    {}
  );

  const getEntry = useCallback(
    (beanId: number) => entries[beanId],
    [entries]
  );

  const setEntry = useCallback(
    (beanId: number, status: DiaryStatus, notes: string) => {
      setEntries((prev) => ({
        ...prev,
        [beanId]: {
          beanId,
          status,
          notes,
          date: new Date().toISOString().split("T")[0],
        },
      }));
    },
    [setEntries]
  );

  const updateNotes = useCallback(
    (beanId: number, notes: string) => {
      setEntries((prev) => {
        const existing = prev[beanId];
        if (!existing) return prev;
        return { ...prev, [beanId]: { ...existing, notes } };
      });
    },
    [setEntries]
  );

  const updateEntry = useCallback(
    (beanId: number, updates: Partial<DiaryEntry>) => {
      setEntries((prev) => {
        const existing = prev[beanId];
        if (!existing) return prev;
        return { ...prev, [beanId]: { ...existing, ...updates } };
      });
    },
    [setEntries]
  );

  const removeEntry = useCallback(
    (beanId: number) => {
      setEntries((prev) => {
        const next = { ...prev };
        delete next[beanId];
        return next;
      });
    },
    [setEntries]
  );

  return (
    <DiaryContext.Provider
      value={{ entries, hydrated, getEntry, setEntry, updateNotes, updateEntry, removeEntry }}
    >
      {children}
    </DiaryContext.Provider>
  );
}

export function useDiary(): DiaryContextValue {
  const ctx = useContext(DiaryContext);
  if (!ctx) {
    throw new Error("useDiary must be used within a DiaryProvider");
  }
  return ctx;
}
