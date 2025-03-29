"use client";
import { courseMock } from "@/mocks/courses";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
  const { course_id } = useParams<{ course_id: string }>();
  const router = useRouter();
  //fetch course data by id
  const course = courseMock.find((c) => c.id === course_id);

  return (
    <main className="flex flex-col items-center justify-center">
      <section className="grid grid-cols-3">
        <Image src={"/tree1.png"} width={100} alt="tree" height={100} />
        <div className="col-span-2">
          <h1>{course?.name}</h1>
        </div>
      </section>
    </main>
  );
};

export default Page;
