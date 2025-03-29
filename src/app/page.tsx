"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { courseMock } from "@/mocks/courses";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUsername(parsedUser.name || "");
      } catch (error) {
        console.error("Error parsing user data:", error);
        router.push("/login");
      }
    } else {
      // ถ้าไม่มีข้อมูลผู้ใช้ใน localStorage ให้รีไดเร็กไปยังหน้า login
      router.push("/login");
    }
  }, [router]);

  // Random progress for demonstration (in a real app, this would come from user data)
  const getRandomProgress = () => {
    return Math.floor(Math.random() * 100);
  };

  // ถ้ายังไม่มีชื่อผู้ใช้ (อยู่ระหว่างการตรวจสอบหรือกำลังรีไดเร็ก) ให้แสดงหน้าว่างหรือ loading
  if (!username) {
    return <div className="flex justify-center items-center h-screen bg-amber-50">Redirecting to login...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-amber-50">
      {/* Garden Visualization - responsive height */}
      <div className="relative w-full aspect-square max-h-48 md:max-h-64 lg:max-h-96">
        <Image
          src="/img/evergrow.png"
          alt="Garden Visualization"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* User Garden Title - responsive text size */}
      <div className="px-4 md:px-8 lg:px-12 py-2 md:py-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
          {username ? `${username}'s Garden` : "My Garden"}
        </h2>
      </div>

      {/* Course Cards - always 2 columns but responsive spacing and sizes */}
      <div className="px-3 md:px-6 lg:px-10 grid grid-cols-2 gap-3 md:gap-4 lg:gap-6 max-w-3xl mx-auto">
        {courseMock.map((course, index) => (
          <div 
            key={course.id} 
            className="bg-amber-400 rounded-lg overflow-hidden shadow-md flex flex-col items-center p-2 md:p-4"
            style={{ backgroundColor: "#E1A186" }}
          >
            <div className="text-center mb-1 font-medium text-white text-sm md:text-base">
              {course.name}
            </div>
            <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 my-1 md:my-2">
              <Image
                src="/img/tree1.png"
                alt={course.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="w-full bg-white rounded-full h-1.5 md:h-2 mt-1">
              <div 
                className="bg-green-400 h-1.5 md:h-2 rounded-full" 
                style={{ width: `${getRandomProgress()}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Join New Class Button - responsive size */}
      <div className="flex justify-center my-4 md:my-6 lg:my-8">
        <button className="bg-black text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full text-sm md:text-base font-medium">
          Join New Class +
        </button>
      </div>
    </div>
  );
}