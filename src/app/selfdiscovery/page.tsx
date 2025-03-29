import React from 'react';
import { Course } from "@/types/Course";
import { courseMock } from "@/mocks/courses";

export default function SelfDiscoveryPage() {

  // Mock data for course statistics
  const courseStats = {
    "Prog meth": { timeSpent: "7 hours 4 mins", accuracy: "89%" },
    "Prob Stat": { timeSpent: "2 hours 0 mins", accuracy: "60%" },
    "Discrete Math": { timeSpent: "1 hour 30 mins", accuracy: "20%" },  
    "Data Structure": { timeSpent: "3 hours 10 mins", accuracy: "85%" }  
  };

  return (
    <div className="max-w-full mx-auto">
      
      {/* Banner (Fixed Height with Full Width) */}
      <div className="relative w-full max-h-[400px] overflow-hidden">
        <img 
          src="/img/evergrow.png" 
          alt="Banner" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl md:text-5xl font-bold text-center">
          self discovery
        </div>
      </div>
      
      {/* Course List */}
      <div className="p-5 flex flex-col gap-5 md:gap-8 lg:gap-10">
        {courseMock.map((course) => (
          <div 
            key={course.id} 
            className="bg-[#FFE4C4] rounded-[15px] p-[15px] shadow-md w-full max-w-[400px] md:max-w-[600px] lg:max-w-[800px] mx-auto"
          >
            <div className="font-bold mb-2.5">{course.name}</div>
            <div className="flex flex-col gap-2">
              <div className="bg-[#D8A7A7] text-white px-[15px] py-2 rounded-[25px] flex justify-between">
                <span>time spent: </span>
                <span>{courseStats[course.name as keyof typeof courseStats]?.timeSpent}</span>
              </div>
              <div className="bg-[#D8A7A7] text-white px-[15px] py-2 rounded-[25px] flex justify-between">
                <span>accuracy: </span>
                <span>{courseStats[course.name as keyof typeof courseStats]?.accuracy}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
