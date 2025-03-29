"use client";

import React, { useState, useEffect, useRef } from 'react';

interface KeysPressed {
  [key: string]: boolean;
}

interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'ground' | 'brick' | 'pipe';
}

interface QuestionBox {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'normal' | 'question';
  hit: boolean;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export default function MarioJumper() {
  // Game constants
  const GRAVITY = 0.4;
  const JUMP_FORCE = -11;
  const PLAYER_SPEED = 4.5;
  const VIEWPORT_WIDTH = 800;
  const GAME_HEIGHT = 500;
  const WORLD_WIDTH = 3000;
  const REQUIRED_SCORE = 500;
  const PLAYER_WIDTH = 25;
  const PLAYER_HEIGHT = 35;

  // Game state
  const [playerX, setPlayerX] = useState(100);
  const [playerY, setPlayerY] = useState(400);
  const [cameraX, setCameraX] = useState(0);
  const [velocityY, setVelocityY] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [direction, setDirection] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [lives, setLives] = useState(3);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [gameWon, setGameWon] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState({
    show: false,
    correct: false,
    points: 0
  });

  // Questions data
  const questions: Question[] = [
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
      points: 100
    },
    {
      question: "Capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2,
      points: 100
    },
    {
      question: "Largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 2,
      points: 150
    },
    {
      question: "How many continents are there?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2,
      points: 100
    },
    {
      question: "Which is not a primary color?",
      options: ["Red", "Blue", "Green", "Yellow"],
      correctAnswer: 3,
      points: 100
    },
    {
      question: "What year did World War II end?",
      options: ["1943", "1945", "1947", "1950"],
      correctAnswer: 1,
      points: 150
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
      correctAnswer: 1,
      points: 100
    },
    {
      question: "How many sides does a hexagon have?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 2,
      points: 100
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"],
      correctAnswer: 2,
      points: 150
    },
    {
      question: "What is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      correctAnswer: 1,
      points: 100
    }
  ];

  // World platforms
  const [platforms, setPlatforms] = useState<Platform[]>([
    { x: 0, y: 450, width: 500, height: 50, type: 'ground' },
    { x: 600, y: 450, width: 200, height: 50, type: 'ground' },
    { x: 900, y: 450, width: 200, height: 50, type: 'ground' },
    { x: 1200, y: 400, width: 200, height: 50, type: 'ground' },
    { x: 1500, y: 350, width: 200, height: 50, type: 'ground' },
    { x: 1800, y: 400, width: 200, height: 50, type: 'ground' },
    { x: 2100, y: 450, width: 200, height: 50, type: 'ground' },
    { x: 2400, y: 400, width: 100, height: 100, type: 'pipe' },
    { x: 2600, y: 450, width: 200, height: 50, type: 'ground' },
  ]);
  
  // Question boxes
  const [questionBoxes, setQuestionBoxes] = useState<QuestionBox[]>([
    // Group 1
    { x: 650, y: 350, width: 40, height: 40, type: 'question', hit: false },
    { x: 690, y: 350, width: 40, height: 40, type: 'normal', hit: false },
    { x: 730, y: 350, width: 40, height: 40, type: 'question', hit: false },
    
    // Group 2
    { x: 950, y: 350, width: 40, height: 40, type: 'normal', hit: false },
    { x: 990, y: 350, width: 40, height: 40, type: 'question', hit: false },
    { x: 1030, y: 350, width: 40, height: 40, type: 'normal', hit: false },
    
    // Group 3
    { x: 1250, y: 300, width: 40, height: 40, type: 'question', hit: false },
    { x: 1290, y: 300, width: 40, height: 40, type: 'normal', hit: false },
    { x: 1330, y: 300, width: 40, height: 40, type: 'question', hit: false },
    { x: 1370, y: 300, width: 40, height: 40, type: 'normal', hit: false },
  ]);

  // Enhanced finish flag
  const finishFlag = {
    x: 2800,
    y: 250,
    poleWidth: 10,
    poleHeight: 200,
    flagWidth: 100,
    flagHeight: 70,
    flagColor: 'bg-red-500',
    poleColor: 'bg-gray-400'
  };
  
  const keysPressed = useRef<KeysPressed>({});

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver || gameWon) return;
    
    const gameLoop = setInterval(() => {
      // Handle movement
      if (keysPressed.current['ArrowLeft'] || keysPressed.current['Left']) {
        setPlayerX(prev => Math.max(100, prev - PLAYER_SPEED));
        setDirection(-1);
      }
      if (keysPressed.current['ArrowRight'] || keysPressed.current['Right']) {
        setPlayerX(prev => Math.min(WORLD_WIDTH - 50, prev + PLAYER_SPEED));
        setDirection(1);
      }
      
      // Camera follow
      setCameraX(prev => {
        const targetX = playerX - VIEWPORT_WIDTH / 2;
        return Math.max(0, Math.min(targetX, WORLD_WIDTH - VIEWPORT_WIDTH));
      });
      
      // Apply gravity
      setVelocityY(prev => prev + GRAVITY);
      setPlayerY(prev => prev + velocityY);
      
      // Platform collision
      let onPlatform = false;
      platforms.forEach(platform => {
        if (
          playerX + PLAYER_WIDTH > platform.x && 
          playerX < platform.x + platform.width &&
          playerY + PLAYER_HEIGHT >= platform.y && 
          playerY + PLAYER_HEIGHT <= platform.y + 15 && 
          velocityY > 0
        ) {
          setPlayerY(platform.y - PLAYER_HEIGHT);
          setVelocityY(0);
          setIsJumping(false);
          onPlatform = true;
        }
      });
      
      // Question box collision
      const updatedBoxes = [...questionBoxes];
      updatedBoxes.forEach((box, index) => {
        if (
          !box.hit &&
          playerX + PLAYER_WIDTH > box.x && 
          playerX < box.x + box.width &&
          playerY <= box.y + box.height && 
          playerY + PLAYER_HEIGHT >= box.y + box.height && 
          velocityY < 0
        ) {
          updatedBoxes[index].hit = true;
          
          if (box.type === 'question') {
            const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
            setCurrentQuestion(randomQuestion);
            setShowQuestion(true);
          }
          
          // Bounce effect
          setVelocityY(JUMP_FORCE / 2);
        }
      });
      setQuestionBoxes(updatedBoxes);
      
      // Check for falling
      if (playerY > GAME_HEIGHT) {
        setLives(prev => prev - 1);
        if (lives <= 1) {
          setGameOver(true);
        } else {
          // Reset to nearest safe platform
          const safePlatform = [...platforms]
            .sort((a, b) => b.x - a.x)
            .find(p => p.x < playerX && p.y >= 400);
          
          if (safePlatform) {
            setPlayerX(safePlatform.x + 50);
            setPlayerY(safePlatform.y - PLAYER_HEIGHT);
          } else {
            setPlayerX(100);
            setPlayerY(400);
          }
          setVelocityY(0);
        }
      }
      
      // Check for finish flag
      if (
        playerX + PLAYER_WIDTH > finishFlag.x && 
        playerX < finishFlag.x + finishFlag.flagWidth + finishFlag.poleWidth &&
        playerY + PLAYER_HEIGHT > finishFlag.y && 
        playerY < finishFlag.y + finishFlag.poleHeight
      ) {
        if (score >= REQUIRED_SCORE) {
          setGameWon(true);
        }
      }
      
    }, 1000/60);
    
    return () => clearInterval(gameLoop);
  }, [playerX, playerY, velocityY, gameStarted, gameOver, platforms, questionBoxes, gameWon, score, lives]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = true;
      
      if ((e.key === ' ' || e.key === 'ArrowUp') && !isJumping && !gameOver && !gameWon && !showQuestion) {
        setVelocityY(JUMP_FORCE);
        setIsJumping(true);
      }
      
      if (!gameStarted) {
        setGameStarted(true);
      }
      
      if ((gameOver || gameWon) && (e.key === 'r' || e.key === 'R')) {
        restartGame();
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = false;
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isJumping, gameStarted, gameOver, gameWon, showQuestion]);
  
  const handleAnswer = (answerIndex: number) => {
    if (!currentQuestion) return;
    
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const points = isCorrect ? currentQuestion.points : 0;
    
    setAnswerFeedback({
      show: true,
      correct: isCorrect,
      points: points
    });

    if (isCorrect) {
      setScore(prev => prev + points);
    }
    
    // Hide question and feedback after delay
    setTimeout(() => {
      setShowQuestion(false);
      setCurrentQuestion(null);
      setAnswerFeedback({
        show: false,
        correct: false,
        points: 0
      });
    }, 1500);
  };
  
  const restartGame = () => {
    setPlayerX(100);
    setPlayerY(400);
    setCameraX(0);
    setVelocityY(0);
    setIsJumping(false);
    setDirection(1);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setGameWon(false);
    setGameStarted(true);
    setQuestionBoxes(questionBoxes.map(box => ({ ...box, hit: false })));
    setShowQuestion(false);
    setCurrentQuestion(null);
    setAnswerFeedback({
      show: false,
      correct: false,
      points: 0
    });
  };

  return (
    <div className="fixed inset-0 bg-blue-100 overflow-hidden">
      {/* Game world container */}
      <div className="relative w-full h-full" style={{ height: `${GAME_HEIGHT}px` }}>
        {/* Scrolling game world */}
        <div className="absolute inset-0" style={{ 
          transform: `translateX(-${cameraX}px)`,
          width: `${WORLD_WIDTH}px`
        }}>
          {/* Sky background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600">
            {/* Pixel clouds */}
            <div className="absolute top-20 left-100 w-32 h-16 bg-white" style={{ imageRendering: 'pixelated' }}>
              <div className="absolute w-8 h-8 bg-white top-0 left-4"></div>
              <div className="absolute w-12 h-12 bg-white top-2 left-10"></div>
              <div className="absolute w-10 h-10 bg-white top-1 left-20"></div>
            </div>
            <div className="absolute top-50 left-400 w-48 h-20 bg-white" style={{ imageRendering: 'pixelated' }}>
              <div className="absolute w-10 h-10 bg-white top-2 left-4"></div>
              <div className="absolute w-16 h-16 bg-white top-0 left-12"></div>
              <div className="absolute w-12 h-12 bg-white top-4 left-24"></div>
            </div>
          </div>
          
          {/* Platforms */}
          {platforms.map((platform, index) => (
            <div key={`platform-${index}`} 
              className={`absolute ${platform.type === 'ground' ? 'bg-green-700' : 
                platform.type === 'brick' ? 'bg-red-700' : 'bg-green-800'}`}
              style={{
                left: `${platform.x}px`,
                top: `${platform.y}px`,
                width: `${platform.width}px`,
                height: `${platform.height}px`,
                borderRadius: platform.type === 'pipe' ? '5px 5px 0 0' : '0',
                imageRendering: 'pixelated'
              }}>
              {platform.type === 'brick' && (
                <div className="w-full h-full grid grid-cols-4 gap-0.5">
                  {Array(8).fill(0).map((_, i) => (
                    <div key={i} className="bg-red-800 h-full"></div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* Question boxes */}
          {questionBoxes.map((box, index) => !box.hit && (
            <div key={`box-${index}`}
              className={`absolute ${box.type === 'question' ? 'bg-yellow-400 border-2 border-black' : 'bg-gray-300 border-2 border-black'}`}
              style={{
                left: `${box.x}px`,
                top: `${box.y}px`,
                width: `${box.width}px`,
                height: `${box.height}px`,
                imageRendering: 'pixelated'
              }}>
              {box.type === 'question' && (
                <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-lg">?</div>
              )}
            </div>
          ))}
          
          {/* Enhanced finish flag */}
          <div className="absolute" style={{
            left: `${finishFlag.x}px`,
            top: `${finishFlag.y}px`,
          }}>
            {/* Flag pole */}
            <div className={`absolute ${finishFlag.poleColor}`} style={{
              width: `${finishFlag.poleWidth}px`,
              height: `${finishFlag.poleHeight}px`,
            }}></div>
            
            {/* Flag */}
            <div className={`absolute ${finishFlag.flagColor}`} style={{
              left: `${finishFlag.poleWidth}px`,
              width: `${finishFlag.flagWidth}px`,
              height: `${finishFlag.flagHeight}px`,
              clipPath: 'polygon(0 0, 100% 50%, 0 100%)'
            }}>
              {/* Flag decoration */}
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                GOAL
              </div>
            </div>
            
            {/* Flag base */}
            <div className={`absolute ${finishFlag.poleColor}`} style={{
              top: `${finishFlag.poleHeight}px`,
              width: `${finishFlag.poleWidth + 20}px`,
              height: '20px',
              left: '-10px'
            }}></div>
          </div>
          
          {/* Player */}
          <div 
            className="absolute bg-red-600"
            style={{
              left: `${playerX}px`,
              top: `${playerY}px`,
              width: `${PLAYER_WIDTH}px`,
              height: `${PLAYER_HEIGHT}px`,
              transform: `scaleX(${direction})`,
              imageRendering: 'pixelated'
            }}>
            {/* Face */}
            <div className="absolute top-2 left-2 w-2 h-2 bg-white"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-white"></div>
            {/* Hat */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-red-700"></div>
            {/* Overalls */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-blue-600"></div>
            {/* Mustache */}
            <div className="absolute top-4 left-2 right-2 h-1 bg-black"></div>
          </div>
        </div>
        
        {/* Answer feedback */}
        {answerFeedback.show && (
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div className={`p-4 rounded-lg text-center text-white font-bold text-2xl ${
              answerFeedback.correct ? 'bg-green-500' : 'bg-red-500'
            }`} style={{ 
              fontFamily: "'Press Start 2P', cursive",
              textShadow: '2px 2px 0px rgba(0,0,0,0.5)',
              animation: 'bounce 0.5s'
            }}>
              {answerFeedback.correct ? 
                `+${answerFeedback.points} Points!` : 
                'Wrong! +0 Points'}
            </div>
          </div>
        )}

        {/* Game state displays */}
        {!gameStarted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
            <div className="text-4xl font-bold mb-4" style={{ fontFamily: "'Press Start 2P', cursive", textShadow: '4px 4px 0px #000' }}>MARIO-STYLE JUMPER</div>
            <div className="text-2xl mb-8" style={{ fontFamily: "'Press Start 2P', cursive", textShadow: '2px 2px 0px #000' }}>Press any key to start</div>
            <div className="text-lg" style={{ fontFamily: "'Press Start 2P', cursive", textShadow: '2px 2px 0px #000' }}>
              <p>Arrow keys to move, Space/Up to jump</p>
              <p>Hit ? blocks to answer questions</p>
              <p>Reach the flag with {REQUIRED_SCORE} points to win!</p>
            </div>
          </div>
        )}
        
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white">
            <div className="text-4xl font-bold mb-4" style={{ fontFamily: "'Press Start 2P', cursive", textShadow: '4px 4px 0px #000' }}>GAME OVER</div>
            <div className="text-2xl mb-2" style={{ fontFamily: "'Press Start 2P', cursive" }}>Score: {score}</div>
            <div className="text-xl mb-6" style={{ fontFamily: "'Press Start 2P', cursive" }}>Press R to restart</div>
            <button 
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded text-white" 
              style={{ fontFamily: "'Press Start 2P', cursive" }}
              onClick={restartGame}>
              PLAY AGAIN
            </button>
          </div>
        )}
        
        {/* Win message */}
        {gameWon && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white p-8 rounded-lg max-w-md text-center" style={{ fontFamily: "'Press Start 2P', cursive" }}>
              <div className="text-4xl font-bold mb-4 text-green-600">VICTORY!</div>
              <div className="text-2xl mb-6">Final Score: {score}</div>
              
              {/* Fireworks animation */}
              <div className="flex justify-center space-x-4 mb-6">
                <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
              
              <button 
                className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded text-white"
                onClick={restartGame}>
                PLAY AGAIN
              </button>
            </div>
          </div>
        )}
        
        {/* Question modal */}
        {showQuestion && currentQuestion && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-40">
            <div className="bg-white p-6 rounded-lg max-w-md w-full" style={{ fontFamily: "'Press Start 2P', cursive" }}>
              <h3 className="text-xl font-bold mb-4 text-center">{currentQuestion.question}</h3>
              <div className="space-y-2">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded text-left"
                    onClick={() => handleAnswer(index)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* HUD */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-70 px-3 py-2 rounded text-white" style={{ fontFamily: "'Press Start 2P', cursive" }}>
          <div className="font-bold">MARIO x {lives}</div>
          <div>SCORE: {score}</div>
          <div>GOAL: {REQUIRED_SCORE}</div>
        </div>
        
        {/* World indicator */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-70 px-3 py-2 rounded text-white" style={{ fontFamily: "'Press Start 2P', cursive" }}>
          WORLD 1-1
        </div>
      </div>

      {/* Add this to your global CSS for the bounce animation */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}