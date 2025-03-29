"use client";

import { useEffect, useState } from "react";

// interface ScoreboardProps {
//   playerName: string;
//   score: number;
// }

export default function Scoreboard() {
  const [highScores, setHighScores] = useState<
    Array<{ name: string; score: number }>
  >([]);

  useEffect(() => {
    // In a real implementation, you would fetch from a database
    const savedScores = localStorage.getItem("hotLavaHighScores");
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    }
  }, []);

  return (
    <div className="rounded-lg bg-red-900 p-6 text-white">
      <h2 className="mb-4 text-3xl font-bold">Scoreboard</h2>
      <div className="space-y-2">
        {highScores.map((entry, index) => (
          <div key={index} className="flex justify-between">
            <span>{entry.name}</span>
            <span>{entry.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
