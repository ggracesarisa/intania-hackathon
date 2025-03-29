"use client";
import { FrontendRoutes } from "@/config/apiRoutes";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { AssignmentData, GameState } from "../types";
import { useGameLogic } from "./hooks/useGamelogic";
import { sampleAssignment } from "./mocks/sample-assignment";

function QuizGameContent() {
  const searchParams = useSearchParams();
  const assignmentId = searchParams.get("assignmentId");
  const [assignment, setAssignment] = useState<AssignmentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch the assignment data from your API
    // For demo, we're using the sample assignment
    setAssignment(sampleAssignment);
    setLoading(false);
  }, [assignmentId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading assignment...
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="flex h-screen items-center justify-center">
        Assignment not found
      </div>
    );
  }

  return <GameContainer assignment={assignment} />;
}

// Main component with Suspense boundary
export default function QuizGame() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          Loading game...
        </div>
      }
    >
      <QuizGameContent />
    </Suspense>
  );
}

function GameContainer({ assignment }: { assignment: AssignmentData }) {
  const { gameState, startGame, checkAnswer } = useGameLogic(
    assignment.questions,
  );

  // Render different screens based on game state
  const renderGameScreen = () => {
    switch (gameState.status) {
      case "idle":
        return <StartScreen assignment={assignment} onStart={startGame} />;
      case "playing":
        return <GameScreen gameState={gameState} onAnswer={checkAnswer} />;
      case "success":
        return <SuccessScreen assignment={assignment} onRestart={startGame} />;
      case "failure":
        return <FailureScreen onRestart={startGame} />;
    }
  };

  return <div className="h-screen w-full">{renderGameScreen()}</div>;
}

// Components for different game screens
const StartScreen = ({
  assignment,
  onStart,
}: {
  assignment: AssignmentData;
  onStart: () => void;
}) => (
  <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-red-500 to-orange-600 text-white">
    <div className="max-w-xl rounded-lg bg-black/30 p-8 text-center backdrop-blur-sm">
      <h1 className="mb-6 text-5xl font-bold">🌋 HOT LAVA 🌋</h1>
      <h2 className="mb-4 text-2xl font-bold">{assignment.title}</h2>
      <p className="mb-6">{assignment.description}</p>
      <div className="mb-6 rounded-lg bg-black/20 p-4">
        <p className="text-lg font-bold">Rules:</p>
        <ul className="mt-2 list-disc pl-5 text-left">
          <li>Answer all {assignment.questions.length} questions correctly</li>
          <li>One wrong answer and you fall into lava!</li>
          <li>Complete the quiz to pass the assignment</li>
        </ul>
      </div>

      <button
        onClick={onStart}
        className="rounded-lg bg-white px-20 py-4 text-2xl font-bold text-red-600 transition-colors hover:bg-red-100"
      >
        START
      </button>
    </div>
  </div>
);

const GameScreen = ({
  gameState,
  onAnswer,
}: {
  gameState: GameState;
  onAnswer: (answer: string) => void;
}) => {
  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];

  // Calculate progress percentage
  const progressPercentage =
    (gameState.correctAnswers / gameState.totalQuestions) * 100;

  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-b from-red-500 to-orange-600">
      {/* Progress display */}
      <div className="absolute top-4 right-0 left-0 flex justify-center">
        <div className="rounded-full bg-black/30 px-8 py-2 text-white backdrop-blur-sm">
          Question {gameState.currentQuestionIndex + 1}/
          {gameState.totalQuestions}
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute top-16 right-0 left-0 flex justify-center">
        <div className="h-4 w-64 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-green-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Question container */}
      <div className="absolute top-1/4 right-0 left-0 flex justify-center px-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-bold">{currentQuestion.text}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => onAnswer(option)}
                className="rounded-lg bg-red-500 px-4 py-3 font-semibold text-white transition-colors hover:bg-red-600"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Player character */}
      <div
        className="absolute left-1/2 -translate-x-1/2 transform transition-all duration-300"
        style={{
          bottom: `${gameState.playerHeight}px`,
          transition: gameState.isFalling
            ? "bottom 1s ease-in"
            : "bottom 0.5s ease-out",
        }}
      >
        <div className="relative h-16 w-16">
          <div className="absolute bottom-0 left-1/2 h-12 w-12 -translate-x-1/2 transform rounded-full bg-blue-500"></div>
          {/* Simple character face */}
          <div className="absolute bottom-6 left-1/2 h-2 w-4 -translate-x-1/2 translate-x-2 transform rounded-full bg-white"></div>
          <div className="absolute bottom-6 left-1/2 h-2 w-4 -translate-x-1/2 -translate-x-2 transform rounded-full bg-white"></div>
          <div
            className="absolute bottom-3 left-1/2 h-2 w-6 -translate-x-1/2 transform rounded-full bg-white"
            style={{ display: gameState.isFalling ? "none" : "block" }}
          ></div>
          <div
            className="absolute bottom-3 left-1/2 h-2 w-6 -translate-x-1/2 rotate-180 transform rounded-full bg-white"
            style={{ display: gameState.isFalling ? "block" : "none" }}
          ></div>
        </div>
      </div>

      {/* Rising lava */}
      <div
        className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-red-700 to-orange-500"
        style={{ height: `${gameState.lavaHeight}px` }}
      >
        <div className="h-8 animate-pulse bg-red-600 opacity-80"></div>
      </div>
    </div>
  );
};

const SuccessScreen = ({
  assignment,
  onRestart,
}: {
  assignment: AssignmentData;
  onRestart: () => void;
}) => (
  <>
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-green-500 to-green-700 text-white">
      <div className="max-w-xl rounded-lg bg-black/20 p-8 text-center backdrop-blur-sm">
        <h1 className="mb-4 text-6xl font-bold">🎉 SUCCESS! 🎉</h1>
        <p className="mb-6 text-2xl">
          You completed all {assignment.questions.length} questions correctly!
        </p>
        <div className="mb-8 flex flex-col items-center rounded-lg bg-white/10 p-4">
          <p className="text-xl">Assignment Complete:</p>
          <p className="text-3xl font-bold">{assignment.title}</p>
        </div>
        <button
          onClick={onRestart}
          className="mr-4 rounded-lg bg-white px-12 py-4 text-2xl font-bold text-green-600 transition-colors hover:bg-green-100"
        >
          Play Again
        </button>
        <button
          onClick={() =>
            (window.location.href = `${FrontendRoutes.COURSE}/${assignment.classId}`)
          }
          className="rounded-lg bg-white/20 px-12 py-4 text-2xl font-bold transition-colors hover:bg-white/30"
        >
          Back to Class
        </button>
      </div>
    </div>
  </>
);

const FailureScreen = ({ onRestart }: { onRestart: () => void }) => (
  <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-red-700 to-red-900 text-white">
    <div className="rounded-lg bg-black/30 p-8 text-center backdrop-blur-sm">
      <h1 className="mb-4 text-6xl font-bold">OH NO!</h1>
      <p className="mb-6 text-2xl">You fell into the lava!</p>
      <div className="mb-8 text-8xl">🔥</div>
      <p className="mb-6">
        Remember: You need to answer all questions correctly to complete the
        assignment.
      </p>
      <button
        onClick={onRestart}
        className="rounded-lg bg-white px-12 py-4 text-2xl font-bold text-red-600 transition-colors hover:bg-red-100"
      >
        TRY AGAIN
      </button>
    </div>
  </div>
);
