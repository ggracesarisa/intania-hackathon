"use client";
import { FrontendRoutes } from "@/config/apiRoutes";
import { courseMock } from "@/mocks/courses";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
      router.push("/login");
    }
  }, [router]);

  const getRandomProgress = () => {
    return Math.floor(Math.random() * 100);
  };

  if (!username) {
    return (
      <div className="flex h-screen items-center justify-center bg-amber-50 text-lg">
        Redirecting to login...
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-amber-50 px-6 py-4">
      {/* Garden Visualization */}
      <div className="relative mx-auto aspect-square max-h-56 w-full sm:max-h-64 md:max-h-80 lg:max-h-96">
        <Image
          src="/img/evergrow.png"
          alt="Garden Visualization"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* User Garden Title */}
      <div className="py-4 text-center">
        <h2 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
          {username ? `${username}'s Garden` : "My Garden"}
        </h2>
      </div>

      {/* Course Cards - Always 2 columns */}
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-6 px-4 md:gap-8">
        {courseMock.map((course) => (
          <Link href="/tree-detail" key={course.id} passHref>
            <div
              className="flex flex-col items-center rounded-lg bg-amber-400 p-5 shadow-lg transition-transform hover:scale-105 hover:cursor-pointer sm:p-6 md:p-7"
              style={{ backgroundColor: "#E1A186" }}
              onClick={() =>
                router.push(`${FrontendRoutes.COURSE}/${course.id}`)
              }
            >
              <div className="mb-2 text-center text-lg font-medium text-white sm:text-xl md:text-2xl">
                {course.name}
              </div>
              <div className="relative my-3 h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28">
                <Image
                  src="/img/tree1.png"
                  alt={course.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="mt-2 h-3 w-full rounded-full bg-white sm:h-3.5">
                <div
                  className="h-3 rounded-full bg-green-400 sm:h-3.5"
                  style={{ width: `${getRandomProgress()}%` }}
                ></div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Join New Class Button */}
      <div className="my-8 flex justify-center">
        <button className="rounded-full bg-black px-8 py-3 text-lg font-semibold text-white sm:px-10 sm:py-4 sm:text-xl">
          Join New Class +
        </button>
      </div>
    </div>
  );
}
