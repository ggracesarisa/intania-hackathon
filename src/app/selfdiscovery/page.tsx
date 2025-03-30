"use client";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { Button } from "@/components/ui/button";
import { FrontendRoutes } from "@/config/apiRoutes";
import { courseMock } from "@/mocks/courses";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SelfDiscoveryPage() {
  const router = useRouter();
  // Mock data for course statistics
  const courseStats = {
    "Prog meth": { timeSpent: "7 hours 4 mins", accuracy: "89%" },
    "Prob Stat": { timeSpent: "2 hours 0 mins", accuracy: "60%" },
    "Discrete Math": { timeSpent: "1 hour 30 mins", accuracy: "20%" },
    "Data Structure": { timeSpent: "3 hours 10 mins", accuracy: "85%" },
  };

  return (
    <div className="mx-auto max-w-full">
      {/* Banner (Fixed Height with Full Width) */}
      <div className="relative max-h-[400px] w-full overflow-hidden">
        <Image
          src="/img/evergrow.png"
          alt="Banner"
          className="h-full w-full object-cover"
          width={200}
          height={100}
        />
        <SparklesText text="Self Discovery" />
      </div>

      {/* Course List */}
      <div className="flex flex-col gap-5 p-5 md:gap-8 lg:gap-10">
        <Button
          onClick={() => router.push(`${FrontendRoutes.SELF_DISCOVERY}/chart`)}
        >
          See Chart
        </Button>
        {courseMock.map((course) => (
          <div
            key={course.id}
            className="mx-auto w-full max-w-[400px] rounded-[15px] bg-[#FFE4C4] p-[15px] shadow-md md:max-w-[600px] lg:max-w-[800px]"
          >
            <div className="mb-2.5 font-bold">{course.name}</div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between rounded-[25px] bg-[#D8A7A7] px-[15px] py-2 text-white">
                <span>time spent: </span>
                <span>
                  {
                    courseStats[course.name as keyof typeof courseStats]
                      ?.timeSpent
                  }
                </span>
              </div>
              <div className="flex justify-between rounded-[25px] bg-[#D8A7A7] px-[15px] py-2 text-white">
                <span>accuracy: </span>
                <span>
                  {
                    courseStats[course.name as keyof typeof courseStats]
                      ?.accuracy
                  }
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
