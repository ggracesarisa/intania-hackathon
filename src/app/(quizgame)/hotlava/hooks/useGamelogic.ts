import { useCallback, useEffect, useState } from "react";
import { GameState, Question } from "../../types";

const PLAYER_JUMP_HEIGHT = 60; // pixels per correct answer
const INITIAL_PLAYER_HEIGHT = 100;
const LAVA_INITIAL_HEIGHT = 20;

export const useGameLogic = (questions: Array<Question>) => {
  const [gameState, setGameState] = useState<GameState>({
    status: "idle",
    currentQuestionIndex: 0,
    playerHeight: INITIAL_PLAYER_HEIGHT,
    lavaHeight: LAVA_INITIAL_HEIGHT,
    correctAnswers: 0,
    totalQuestions: questions.length,
    questions,
    isFalling: false,
  });

  const startGame = useCallback(() => {
    setGameState({
      status: "playing",
      currentQuestionIndex: 0,
      playerHeight: INITIAL_PLAYER_HEIGHT,
      lavaHeight: LAVA_INITIAL_HEIGHT,
      correctAnswers: 0,
      totalQuestions: questions.length,
      questions,
      isFalling: false,
    });
  }, [questions]);

  const checkAnswer = useCallback(
    (selectedAnswer: string) => {
      const currentQuestion =
        gameState.questions[gameState.currentQuestionIndex];
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

      if (isCorrect) {
        // Calculate if this was the last question
        const newCorrectAnswers = gameState.correctAnswers + 1;
        const isAssignmentComplete =
          newCorrectAnswers >= gameState.totalQuestions;

        if (isAssignmentComplete) {
          // Student has completed all questions successfully
          setGameState((prev) => ({
            ...prev,
            status: "success",
            correctAnswers: newCorrectAnswers,
            playerHeight: prev.playerHeight + PLAYER_JUMP_HEIGHT,
          }));
        } else {
          // Move to next question
          setGameState((prev) => ({
            ...prev,
            correctAnswers: newCorrectAnswers,
            currentQuestionIndex: prev.currentQuestionIndex + 1,
            playerHeight: prev.playerHeight + PLAYER_JUMP_HEIGHT,
          }));
        }
      } else {
        // Wrong answer - player falls into lava
        setGameState((prev) => ({
          ...prev,
          status: "failure",
          isFalling: true,
        }));
      }
    },
    [
      gameState.currentQuestionIndex,
      gameState.questions,
      gameState.correctAnswers,
      gameState.totalQuestions,
    ],
  );

  // Handle the falling animation when player answers incorrectly
  useEffect(() => {
    if (gameState.isFalling) {
      const fallingInterval = setInterval(() => {
        setGameState((prev) => {
          // Move player down until they reach the lava
          if (prev.playerHeight > prev.lavaHeight) {
            return {
              ...prev,
              playerHeight: prev.playerHeight - 10,
            };
          } else {
            clearInterval(fallingInterval);
            return prev;
          }
        });
      }, 50);

      return () => clearInterval(fallingInterval);
    }
  }, [gameState.isFalling]);

  return {
    gameState,
    startGame,
    checkAnswer,
  };
};
