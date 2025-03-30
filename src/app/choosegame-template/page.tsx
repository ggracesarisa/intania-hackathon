"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const AssignmentPage = () => {
  const [openTabs, setOpenTabs] = useState<Set<string>>(new Set()); // Use Set to track opened tabs

  const handleModeSelect = (mode: string) => {
    console.log(`Selected mode: ${mode}`);
  };

  const toggleTab = (mode: string) => {
    setOpenTabs((prevTabs) => {
      const updatedTabs = new Set(prevTabs);
      if (updatedTabs.has(mode)) {
        updatedTabs.delete(mode); // If the tab is already open, close it
      } else {
        updatedTabs.add(mode); // If the tab is closed, open it
      }
      return updatedTabs;
    });
  };

  return (
    <div className="bg-cream-50 mx-auto w-full min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto max-w-6xl w-full p-4">
        {/* Game Mode Selection */}
        <section>
          <div className="mx-auto mb-5 flex items-center border-b border-amber-300 pb-2">
            <Link href="/create-assignment" passHref>
                <Image
                src="/img/icon_leftarrow.png"
                alt="Left Arrow Icon"
                width={24}
                height={24}
                className="mr-3 hover:scale-110 hover:cursor-pointer"
                />
            </Link>
            <h2 className="text-xl font-bold text-amber-800">
              Select Game Template
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
                className={`w-full h-80 bg-white rounded-md shadow-md transition-all duration-300 ${
                  openTabs.has("EduQuest") ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden mt-2 p-4 flex flex-col items-center`}>
                <div className="gap-2 w-full">
                    <span className="font-lg text-center">Lecture topic</span>
                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected className="text-gray-700">Termodynamics</option>
                        <option value="US">Force & Motion</option>
                        <option value="CA">Rotational Motion</option>
                        <option value="FR">SHM</option> 
                        <option value="DE">Wave & Optic</option>
                    </select>
                </div>
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
                  openTabs.has("HotLava Quiz") ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden mt-2 p-4 flex flex-col justify-center items-center`}>
                <div className="flex flex-col w-2xs p-2 items-center text-center">
                </div>
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
                  openTabs.has("Pixel Jumper") ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden mt-2 p-4 flex flex-col justify-center items-center`}>
                <div className="flex flex-col w-2xs p-2 items-center text-center">
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="flex justify-center w-full mt-4">
        <button className="bg-green-500 max-w-sm w-full text-white px-6 py-3 rounded-md cursor-pointer transition-colors duration-300 ease-in-out hover:bg-green-600 hover:font-semibold">
            Assign
        </button>
        </div>

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
