"use client";
import SubjectCard from "@/components/SubjectCard";
import { courseMock } from "@/mocks/courses";

export default function Home() {
  return (
    <main className="w-full px-3.5 sm:px-5">
      <h1 className="p-4 font-bold">ggracesarisa ‘s Garden</h1>
      <ul className="grid w-full grid-cols-2 space-y-4 space-x-1.5">
        {courseMock.map((course, index) => (
          <li key={index}>
            <SubjectCard course={course} />
          </li>
        ))}
      </ul>
    </main>
  );
}
