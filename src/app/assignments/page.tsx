"use client";
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AssignmentPage = () => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  
  const handleModeSelect = (mode: string) => {
    setSelectedMode(mode);
    // Here you would typically navigate to the game mode or update the UI
    console.log(`Selected mode: ${mode}`);
  };
  
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Main Content */}
      <main className="container mx-auto p-4 max-w-6xl">
        {/* Assignment Section */}
        <section className="mb-8">
          <div className="flex items-center mb-3 border-b pb-2 border-amber-300">
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
            <p className="text-red-600 font-bold text-lg">deadline 31/03/25</p>
            <p className="font-bold mb-3 text-lg">20 points</p>
            <p className="text-gray-800 font-medium">
              รายละเอียดให้นักเรียนทำแบบทดสอบเรื่อง xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </p>
          </div>
        </section>
        
        {/* Game Mode Selection */}
        <section>
          <div className="flex items-center mb-5 border-b pb-2 border-amber-300">
            <Image
              src="/img/icon_gamemode.png"
              alt="Game Mode Icon"
              width={24}
              height={24}
              className="mr-3"
            />
            <h2 className="text-xl font-bold text-amber-800">Select Game Mode</h2>
          </div>
          
          {/* Game mode cards - Responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* EduQuest */}
            <button 
              onClick={() => handleModeSelect('EduQuest')}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 flex items-center"
            >
              <div className="w-16 h-16 rounded-full bg-amber-200 flex items-center justify-center mr-4 flex-shrink-0">
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
              onClick={() => handleModeSelect('Lightning Quiz')}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 flex items-center"
            >
              <div className="w-16 h-16 rounded-full bg-amber-200 flex items-center justify-center mr-4 flex-shrink-0">
                <Image
                  src="/img/icon_star.png"
                  alt="Star Icon"
                  width={32}
                  height={32}
                  className="text-red-400"
                />
              </div>
              <span className="text-xl font-bold text-red-400">Hot Lava Quiz</span>
            </button>
            
            {/* Pixel Jumper */}
            <button 
              onClick={() => handleModeSelect('Pixel Jumper')}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 flex items-center"
            >
              <div className="w-16 h-16 rounded-full bg-amber-200 flex items-center justify-center mr-4 flex-shrink-0">
                <Image
                  src="/img/icon_rectangle.png"
                  alt="Square Icon"
                  width={32}
                  height={32}
                  className="text-red-400"
                />
              </div>
              <span className="text-xl font-bold text-red-400">Pixel Jumper</span>
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