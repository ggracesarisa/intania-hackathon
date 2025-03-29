"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Homeworkbanner = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href="/assignments" passHref>
      <div
        className="flex h-20 w-full items-center justify-between rounded-lg bg-[#EFD8BE] p-4 hover:scale-105 hover:cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={"/tree-detail/homeworkIcon.png"}
              alt="ShovelImage"
              width={63}
              height={63}
              className="mx-auto"
            />
            <span className="text-xl font-bold">Homework 1</span>
          </div>
          <span
            className={`flex flex-row items-center justify-end ${isHovered ? "underline" : ""}`}
          >
            Handed in
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Homeworkbanner;
