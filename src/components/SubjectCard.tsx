import { FrontendRoutes } from "@/config/apiRoutes";
import { Course } from "@/types/Course";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Progress } from "./ui/progress";

interface SubjectCardProps {
  course: Course;
}
const SubjectCard = ({ course: course }: SubjectCardProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`${FrontendRoutes.COURSE}/${course.id}`)}
      className="flex w-full max-w-52 flex-col items-center justify-center space-y-4 rounded-md bg-gradient-to-b from-[#C9826D] to-[#634036] px-4 py-3 text-white shadow-lg"
    >
      <h2 className="text-center text-lg font-bold">{course.name}</h2>
      <Image src={"/tree1.png"} alt="tree" width={100} height={100} />
      <Progress value={40} className="" />
    </div>
  );
};

export default SubjectCard;
