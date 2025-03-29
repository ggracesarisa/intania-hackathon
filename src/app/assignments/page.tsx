"use client";
import Image from "next/image";
import { useState } from "react";

const AssignmentPage = () => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null); // Track active tab

  const handleModeSelect = (mode: string) => {
    setSelectedMode(mode);
    console.log(`Selected mode: ${selectedMode}`);
  };

  const toggleTab = (mode: string) => {
    if (activeTab === mode) {
      setActiveTab(null); // If the same tab is clicked again, hide it
    } else {
      setActiveTab(mode); // Show the selected tab
    }
  };

  return (
    <div className="bg-cream-50 mx-auto w-full min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto max-w-6xl w-full p-4">
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

          <div className="mb-6 w-full flex flex-col gap-4">
            <p className="flex text-lg font-bold text-red-600">deadline 31/03/25</p>
            <p className="flex text-lg font-bold">20 points</p>
            <p className="flex font-medium text-gray-800 break-words overflow-hidden">
              Intructions <br/>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quaerat quos aspernatur accusantium, facilis consequuntur saepe nemo, voluptatem incidunt tempore officia quae vitae deserunt maxime cumque! Autem dolores molestias non?
            </p>
          </div>
        </section>

        {/* Game Mode Selection */}
        <section>
          <div className="mx-auto mb-5 flex items-center border-b border-amber-300 pb-2">
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
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {/* EduQuest */}
            <div className="flex flex-col">
              <button
                onClick={() => {
                  toggleTab("EduQuest");
                  handleModeSelect("EduQuest");
                }}
                className="flex items-center rounded-xl w-full bg-[#FDF0D9] p-6 shadow-md transition duration-300 hover:shadow-lg hover:cursor-pointer"
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
              <div
                className={`w-full h-80 bg-white rounded-md shadow-md transition-all duration-300 hover:cursor-po  ${
                  activeTab === "EduQuest" ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden mt-2 p-4 flex flex-col justify-center items-center`}>
                <div className="flex flex-col w-2xs p-2 items-center text-center">
                  <p className="text-sm font-medium text-black">
                    EduQuest: the student must teach a 12-year-old child. To understand the lecture, the student needs to keep typing keywords related to the topic until completion. 
                  </p>
                </div>
                <button className="mt-2 bg-green-500 w-1/2 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 ease-in-out hover:bg-green-600 hover:font-semibold">
                  Play
                </button>
              </div>
            </div>

            {/* HotLava Quiz */}
            <div className="flex flex-col">
              <button
                onClick={() => {
                  toggleTab("HotLava Quiz");
                  handleModeSelect("HotLava Quiz");
                }}
                className="flex items-center rounded-xl w-full bg-[#FDF0D9] p-6 shadow-md transition duration-300 hover:shadow-lg hover:cursor-pointer"
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
              <div
                className={`w-full h-80 bg-white rounded-md shadow-md transition-all duration-300 ${
                  activeTab === "HotLava Quiz" ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden mt-2 p-4 flex flex-col justify-center items-center`}>
                <div className="flex flex-col w-2xs p-2 items-center text-center">
                  <p className="text-sm font-medium text-black">
                    HotLavaQuiz: the student must answer multiple-choice questions as quickly as possible to achieve the highest score. If the student selects a wrong answer or if the lava reaches the player, the game is over.
                  </p>
                </div>
                <button className="mt-2 bg-green-500 w-1/2 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 ease-in-out hover:bg-green-600 hover:font-semibold">
                  Play
                </button>
              </div>
            </div>

            {/* Pixel Jumper */}
            <div className="flex flex-col">
              <button
                onClick={() => {
                  toggleTab("Pixel Jumper");
                  handleModeSelect("Pixel Jumper");
                }}
                className="flex items-center rounded-xl w-full bg-[#FDF0D9] p-6 shadow-md transition duration-300 hover:shadow-lg hover:cursor-pointer"
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
              <div
                className={`w-full h-80 bg-white rounded-md shadow-md transition-all duration-300 ${
                  activeTab === "Pixel Jumper" ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden mt-2 p-4 flex flex-col justify-center items-center`}>
                <div className="flex flex-col w-2xs p-2 items-center text-center">
                  <p className="text-sm font-medium text-black">
                    Pixel Jumper: The student must navigate obstacles such as monsters and dangerous terrain to reach the finish line. To pass each level, the student must also achieve the required score by collecting mystery boxes and answering the questions inside them. 
                  </p>
                </div>
                <button className="mt-2 bg-green-500 w-1/2 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 ease-in-out hover:bg-green-600 hover:font-semibold">
                  Play
                </button>
              </div>
            </div>
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
