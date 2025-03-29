"use client";
import Image from "next/image";
import { useState } from "react";

const AssignmentPage = () => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const handleModeSelect = (mode: string) => {
    setSelectedMode(mode);
    // Here you would typically navigate to the game mode or update the UI
    console.log(`Selected mode: ${selectedMode}`);
  };

  return (
    <div className="bg-cream-50 min-h-screen mx-auto">
      {/* Main Content */}
      <main className="container mx-auto max-w-6xl p-4">
        {/* Assignment Section */}
        <section className="mb-8">
          <div className="mb-3 flex items-center border-b border-amber-300 pb-2">
            <Image
              src="/img/icon_assignment.png"
              alt="Assignment Icon"
              width={24}
              height={24}
              className="mr-3"
            />
            <h2 className="text-xl font-bold text-amber-800">Assignment 1</h2>
          </div>

          <div className="mb-6">
            <p className="text-lg font-bold text-red-600">deadline 31/03/25</p>
            <p className="mb-3 text-lg font-bold">20 points</p>
            <p className="font-medium text-gray-800">
              รายละเอียดให้นักเรียนทำแบบทดสอบเรื่อง
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </p>
          </div>
        </section>

        {/* Game Mode Selection */}
        <section>
          <div className="mb-5 flex items-center border-b border-amber-300 pb-2 mx-auto">
            <Image
              src="/img/icon_gamemode.png"
              alt="Game Mode Icon"
              width={24}
              height={24}
              className="mr-3"
            />
            <h2 className="text-xl font-bold text-amber-800">
              Select Game Mode
            </h2>
          </div>

          {/* Game mode cards - Responsive grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* EduQuest */}
            <button
              onClick={() => handleModeSelect("EduQuest")}
              className="flex items-center rounded-xl bg-white p-6 shadow-md transition duration-300 hover:shadow-lg"
            >
              <div className="mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-amber-200">
                <Image
                  src="/img/icon_triangle.png"
                  alt="Triangle Icon"
                  width={32}
                  height={32}
                  className="text-red-400"
                />
              </div>
              <span className="text-xl font-bold text-red-400">EduQuest</span>
            </button>

            {/* Lightning Quiz */}
            <button
              onClick={() => handleModeSelect("Lightning Quiz")}
              className="flex items-center rounded-xl bg-white p-6 shadow-md transition duration-300 hover:shadow-lg"
            >
              <div className="mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-amber-200">
                <Image
                  src="/img/icon_star.png"
                  alt="Star Icon"
                  width={32}
                  height={32}
                  className="text-red-400"
                />
              </div>
              <span className="text-xl font-bold text-red-400">
                Hot Lava Quiz
              </span>
            </button>

            {/* Pixel Jumper */}
            <button
              onClick={() => handleModeSelect("Pixel Jumper")}
              className="flex items-center rounded-xl bg-white p-6 shadow-md transition duration-300 hover:shadow-lg"
            >
              <div className="mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-amber-200">
                <Image
                  src="/img/icon_rectangle.png"
                  alt="Square Icon"
                  width={32}
                  height={32}
                  className="text-red-400"
                />
              </div>
              <span className="text-xl font-bold text-red-400">
                Pixel Jumper
              </span>
            </button>
          </div>
        </section>
      </main>

      {/* Add this to your global CSS or as a style tag */}
      <style jsx global>{`
        .bg-cream-50 {
          background-color: #fffbeb;
        }
      `}</style>
    </div>
  );
};

export default AssignmentPage;
