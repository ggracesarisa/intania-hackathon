"use client";
import { FrontendRoutes } from "@/config/apiRoutes";
import { courseMock } from "@/mocks/courses";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from 'next/link'

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
    return (
      <div className="flex h-screen items-center justify-center bg-amber-50">
        Redirecting to login...
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-amber-50">
      {/* Garden Visualization - responsive height */}
      <div className="relative aspect-square max-h-48 w-full md:max-h-64 lg:max-h-96">
        <Image
          src="/img/evergrow.png"
          alt="Garden Visualization"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* User Garden Title - responsive text size */}
      <div className="px-4 py-2 md:px-8 md:py-4 lg:px-12">
        <h2 className="text-xl font-bold md:text-2xl lg:text-3xl text-center">
          {username ? `${username}'s Garden` : "My Garden"}
        </h2>
      </div>

      {/* Course Cards - always 2 columns but responsive spacing and sizes */}
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 px-3 md:gap-4 md:px-6 lg:gap-6 lg:px-10">
        {courseMock.map((course) => (
          <Link href="/tree-detail" key={course.id} passHref>
          <div
            key={course.id}
            className="flex flex-col items-center overflow-hidden rounded-lg bg-amber-400 p-2 shadow-md md:p-4 hover:scale-105 hover:cursor-pointer"
            style={{ backgroundColor: "#E1A186" }}
            onClick={() => router.push(`${FrontendRoutes.COURSE}/${course.id}`)}
          >
            <div className="mb-1 text-center text-sm font-medium text-white md:text-base">
              {course.name}
            </div>
            <div className="relative my-1 h-12 w-12 md:my-2 md:h-16 md:w-16 lg:h-20 lg:w-20">
              <Image
                src="/img/tree1.png"
                alt={course.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-white md:h-2">
              <div
                className="h-1.5 rounded-full bg-green-400 md:h-2"
                style={{ width: `${getRandomProgress()}%` }}
              ></div>
            </div>
          </div>
          </Link>
        ))}
      </div>

      {/* Join New Class Button - responsive size */}
      <div className="my-4 flex justify-center md:my-6 lg:my-8">
        <button className="rounded-full bg-black px-4 py-1.5 text-sm font-medium text-white md:px-6 md:py-2 md:text-base">
          Join New Class +
        </button>
      </div>
    </div>
  );
}
