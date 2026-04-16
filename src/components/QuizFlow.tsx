"use client";

import { useState, useCallback } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";
import {
  QUIZ_QUESTIONS,
  determineProfile,
  getRecommendedBeans,
  type QuizAnswers,
  type QuizResult,
} from "@/lib/quiz";
import QuizProgress from "./QuizProgress";
import QuizQuestion from "./QuizQuestion";
import QuizInterstitial from "./QuizInterstitial";
import QuizResults from "./QuizResults";

type Phase = "intro" | "questions" | "calculating" | "results";

export default function QuizFlow() {
  const [savedResult, setSavedResult, hydrated] = useLocalStorage<QuizResult | null>(
    "coffee-quiz-result",
    null
  );
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [activeResult, setActiveResult] = useState<QuizResult | null>(null);

  // Show saved results if user has completed the quiz before
  const showSaved = hydrated && savedResult && phase === "intro";
  const displayResult = activeResult || savedResult;

  const handleAnswer = useCallback(
    (questionId: string, value: string | string[]) => {
      const nextAnswers = { ...answers, [questionId]: value };
      setAnswers(nextAnswers);

      if (step < QUIZ_QUESTIONS.length - 1) {
        setStep((s) => s + 1);
      } else {
        // All done — calculate
        setPhase("calculating");
        setTimeout(() => {
          const profile = determineProfile(nextAnswers);
          const beans = getRecommendedBeans(profile);
          const result: QuizResult = {
            profile,
            completedAt: new Date().toISOString(),
            answers: nextAnswers,
            recommendedBeanIds: beans.map((b) => b.id),
          };
          setSavedResult(result);
          setActiveResult(result);
          setPhase("results");
        }, 2800);
      }
    },
    [step, answers, setSavedResult]
  );

  const handleBack = useCallback(() => {
    if (step > 0) setStep((s) => s - 1);
  }, [step]);

  const handleRetake = useCallback(() => {
    setPhase("intro");
    setStep(0);
    setAnswers({});
    setActiveResult(null);
    setSavedResult(null);
  }, [setSavedResult]);

  const handleStart = useCallback(() => {
    setPhase("questions");
    setStep(0);
    setAnswers({});
    setActiveResult(null);
  }, []);

  // Skeleton while hydrating
  if (!hydrated) {
    return (
      <div>
        <div className="skeleton h-10 w-72 mx-auto mb-4" />
        <div className="skeleton h-5 w-48 mx-auto mb-8" />
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton h-32 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  // Show saved results
  if (showSaved && displayResult) {
    return (
      <div>
        <div className="text-center mb-6 animate-fade-in">
          <p className="text-sm text-roast-light">
            Welcome back! Here are your results from last time.
          </p>
        </div>
        <QuizResults result={displayResult} onRetake={handleRetake} />
      </div>
    );
  }

  // Intro screen
  if (phase === "intro") {
    return (
      <div className="text-center py-12 animate-fade-in-up">
        <div className="text-6xl mb-6">☕</div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-espresso mb-4">
          Discover Your
          <br />
          <span className="text-caramel">Coffee Personality</span>
        </h1>
        <p className="text-roast-light text-lg max-w-md mx-auto mb-8">
          6 quick questions. About 60 seconds.
          <br />
          Zero judgment.
        </p>
        <button
          onClick={handleStart}
          className="inline-flex items-center gap-2 bg-caramel hover:bg-caramel-light text-white font-bold px-8 py-3.5 rounded-full hover:scale-105 transition-all shadow-lg text-lg"
        >
          Let&apos;s Go
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    );
  }

  // Calculating interstitial
  if (phase === "calculating") {
    return <QuizInterstitial />;
  }

  // Results
  if (phase === "results" && displayResult) {
    return <QuizResults result={displayResult} onRetake={handleRetake} />;
  }

  // Questions
  const question = QUIZ_QUESTIONS[step];

  return (
    <div>
      <QuizProgress current={step} total={QUIZ_QUESTIONS.length} />
      <QuizQuestion
        key={question.id}
        question={question}
        currentAnswer={answers[question.id]}
        onAnswer={handleAnswer}
        onBack={handleBack}
        isFirst={step === 0}
      />
    </div>
  );
}
