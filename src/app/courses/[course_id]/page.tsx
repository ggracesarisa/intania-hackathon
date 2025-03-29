"use client";
import { sampleAssignment } from "@/app/(quizgame)/hotlava/mocks/sample-assignment";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseMock } from "@/mocks/courses";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
  const { course_id } = useParams<{ course_id: string }>();
  const router = useRouter();
  //fetch course data by id
  const course = courseMock.find((c) => c.id === course_id);

  return (
    <main className="flex flex-col items-center justify-center px-2.5 sm:px-4">
      <section className="grid grid-cols-3">
        <Image src={"/tree1.png"} width={100} alt="tree" height={100} />
        <div className="col-span-2">
          <h1>{course?.name}</h1>
        </div>
      </section>
      <div className="w-full">
        <p className="py-3 text-xl font-semibold">Assignments</p>
        <ul className="w-full">
          <li>
            <Card
              className="flex w-full rounded-lg bg-white p-3 shadow-md"
              onClick={() => router.push("/hotlava")}
            >
              <CardHeader className="flex items-center">
                <CardTitle className="font-bold">
                  {sampleAssignment.title}
                </CardTitle>
                <Badge variant={"outline"}>submitted</Badge>
              </CardHeader>
              <CardContent className="flex">
                <span className="w-full max-w-xs">
                  {sampleAssignment.description}
                </span>{" "}
                <ChevronRightIcon className="hover:bg-primary/20 rounded-full transition-all" />
              </CardContent>
            </Card>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Page;
