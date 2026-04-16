"use client";

import { useState, useEffect, useCallback } from "react";
import type { QuizQuestion as QuizQuestionType } from "@/lib/quiz";

interface QuizQuestionProps {
  question: QuizQuestionType;
  currentAnswer: string | string[] | undefined;
  onAnswer: (questionId: string, value: string | string[]) => void;
  onBack?: () => void;
  isFirst: boolean;
}

export default function QuizQuestion({
  question,
  currentAnswer,
  onAnswer,
  onBack,
  isFirst,
}: QuizQuestionProps) {
  const isMulti = question.allowMultiple;
  const maxSelections = question.maxSelections ?? Infinity;

  // Local state for multi-select accumulation
  const [selected, setSelected] = useState<string[]>(
    Array.isArray(currentAnswer) ? currentAnswer : currentAnswer ? [currentAnswer] : []
  );

  // Reset selections when question changes
  useEffect(() => {
    setSelected(
      Array.isArray(currentAnswer) ? currentAnswer : currentAnswer ? [currentAnswer] : []
    );
  }, [question.id, currentAnswer]);

  const handleCardClick = useCallback(
    (optionId: string) => {
      if (isMulti) {
        setSelected((prev) => {
          if (prev.includes(optionId)) {
            return prev.filter((id) => id !== optionId);
          }
          if (prev.length >= maxSelections) return prev;
          return [...prev, optionId];
        });
      } else {
        // Single select: brief delay for selection animation, then advance
        setSelected([optionId]);
        setTimeout(() => {
          onAnswer(question.id, optionId);
        }, 300);
      }
    },
    [isMulti, maxSelections, onAnswer, question.id]
  );

  const handleContinue = useCallback(() => {
    if (selected.length > 0) {
      onAnswer(question.id, isMulti ? selected : selected[0]);
    }
  }, [selected, onAnswer, question.id, isMulti]);

  const handleEscapeHatch = useCallback(() => {
    if (isMulti) {
      // Select all options as "surprise me"
      onAnswer(
        question.id,
        question.options.map((o) => o.id)
      );
    } else {
      // Pick a random option
      const random = question.options[Math.floor(Math.random() * question.options.length)];
      setSelected([random.id]);
      setTimeout(() => {
        onAnswer(question.id, random.id);
      }, 300);
    }
  }, [isMulti, onAnswer, question]);

  // Determine grid columns based on option count
  const gridCols =
    question.options.length === 6
      ? "grid-cols-2 sm:grid-cols-3"
      : question.options.length <= 3
        ? "grid-cols-1 sm:grid-cols-3"
        : "grid-cols-2";

  return (
    <div key={question.id} className="animate-fade-in-up">
      {/* Question text */}
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-espresso mb-2">
        {question.title}
      </h2>
      <p className="text-sm text-roast-light mb-8">
        {question.subtitle}
      </p>

      {/* Option cards */}
      <div className={`grid ${gridCols} gap-3`}>
        {question.options.map((option, i) => {
          const isSelected = selected.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => handleCardClick(option.id)}
              className={`relative flex flex-col items-center text-center p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer group stagger-${(i % 6) + 1} animate-fade-in-up ${
                isSelected
                  ? "border-caramel bg-caramel/5 shadow-md animate-select-pop"
                  : "border-white/[0.06] bg-[#141414] hover:border-caramel/40 hover:shadow-sm"
              }`}
            >
              {/* Selection indicator for multi-select */}
              {isMulti && (
                <div
                  className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? "border-caramel bg-caramel"
                      : "border-white/[0.06] group-hover:border-caramel/40"
                  }`}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              )}

              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {option.emoji}
              </span>
              <span className="font-medium text-espresso text-sm">
                {option.label}
              </span>
              <span className="text-xs text-roast-light/70 mt-1">
                {option.description}
              </span>
            </button>
          );
        })}
      </div>

      {/* Escape hatch */}
      <div className="text-center mt-5">
        <button
          onClick={handleEscapeHatch}
          className="text-sm text-caramel hover:text-roast underline transition-colors"
        >
          {question.escapeHatch}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        {!isFirst ? (
          <button
            onClick={onBack}
            className="text-sm text-roast-light hover:text-espresso transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        ) : (
          <div />
        )}

        {isMulti && (
          <button
            onClick={handleContinue}
            disabled={selected.length === 0}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              selected.length > 0
                ? "bg-caramel text-white hover:bg-caramel-light shadow-sm hover:shadow-md"
                : "bg-white/[0.06] text-roast-light/50 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
