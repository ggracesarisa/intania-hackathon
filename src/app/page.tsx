"use client";
import SubjectCard from "@/components/SubjectCard";
import { FrontendRoutes } from "@/config/apiRoutes";
import { course } from "@/types/course";
import { useRouter } from "next/navigation";
const courseMock: course = {
  name: "Prog meth",
  id: "001",
  teacher_id: "001",
  description: "java oop",
};

export default function Home() {
  const router = useRouter();
  return (
    <main className="w-full px-3.5 sm:px-5">
      <h1 className="p-4 font-bold">ggracesarisa ‘s Garden</h1>
      <ul className="grid w-full grid-cols-2 space-y-4 space-x-1.5">
        <li
          onClick={() =>
            router.push(`${FrontendRoutes.COURSE}/${courseMock.id}`)
          }
        >
          <SubjectCard course={courseMock} />
        </li>
        <li>
          <SubjectCard course={courseMock} />
        </li>
        <li>
          <SubjectCard course={courseMock} />
        </li>
      </ul>
    </main>
  );
}
