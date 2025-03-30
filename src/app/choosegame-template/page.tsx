"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileIcon, PaperclipIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { twJoin } from "tailwind-merge";

const AssignmentPage = () => {
  const router = useRouter();
  const [openTabs, setOpenTabs] = useState<Set<string>>(new Set()); // Use Set to track opened tabs

  const handleModeSelect = (mode: string) => {
    console.log(`Selected mode: ${mode}`);
  };

  const toggleTab = (mode: string) => {
    setOpenTabs((prevTabs) => {
      const updatedTabs = new Set(prevTabs);
      if (updatedTabs.has(mode)) {
        updatedTabs.delete(mode); // If the tab is already open, close it
      } else {
        updatedTabs.add(mode); // If the tab is closed, open it
      }
      return updatedTabs;
    });
  };

  return (
    <div className="bg-cream-50 mx-auto min-h-screen w-full">
      {/* Main Content */}
      <main className="container mx-auto w-full max-w-6xl p-4">
        {/* Game Mode Selection */}
        <section>
          <div className="mx-auto mb-5 flex items-center border-b border-amber-300 pb-2">
            <Link href="/create-assignment" passHref>
              <Image
                src="/img/icon_leftarrow.png"
                alt="Left Arrow Icon"
                width={24}
                height={24}
                className="mr-3 hover:scale-110 hover:cursor-pointer"
              />
            </Link>
            <h2 className="text-xl font-bold text-amber-800">
              Select Game Template
            </h2>
          </div>

          {/* Game mode cards - Responsive grid */}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {/* EduQuest */}
            <div className="flex flex-col">
              <button
                onClick={() => {
                  toggleTab("EduQuest");
                  handleModeSelect("EduQuest");
                }}
                className="flex w-full items-center rounded-xl bg-[#FDF0D9] p-6 shadow-md transition duration-300 hover:cursor-pointer hover:shadow-lg"
              >
                <div className="mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-amber-200">
                  <Image
                    src="/img/icon_triangle.png"
                    alt="Triangle Icon"
                    width={32}
                    height={32}
                    className="text-red-400"
                  />
                </div>
                <span className="text-xl font-bold text-red-400">EduQuest</span>
              </button>
              <div
                className={twJoin(
                  "mt-2 flex h-80 w-full flex-col items-center overflow-hidden rounded-md bg-white p-4 shadow-md transition-all duration-300",
                  openTabs.has("EduQuest")
                    ? "max-h-[250px] opacity-100"
                    : "max-h-0 opacity-0",
                )}
              >
                <div className="w-full gap-2 space-y-3">
                  <span className="font-lg text-center">Lecture topic</span>
                  <select
                    id="countries"
                    defaultValue="Thermodynamics" // ✅ Set the default selected option
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  >
                    <option value="Thermodynamics" className="text-gray-700">
                      Thermodynamics
                    </option>
                    <option value="Force & Motion">Force & Motion</option>
                    <option value="Rotational Motion">Rotational Motion</option>
                    <option value="SHM">SHM</option>
                    <option value="Wave & Optic">Wave & Optic</option>
                  </select>
                  <div className="flex items-center space-x-2">
                    <PaperclipIcon />
                    <span>Attachment reference materials</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileIcon />
                    <span>Specify what students will turn in </span>
                  </div>
                  <div className="w-full">
                    <p>Keywords</p>
                    <div className="w-full items-center justify-between space-x-3">
                      <Badge>heat</Badge>
                      <Badge>engine</Badge>
                      <Badge>power</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* HotLava Quiz */}
            <div className="flex flex-col">
              <button
                onClick={() => {
                  toggleTab("HotLava Quiz");
                  handleModeSelect("HotLava Quiz");
                }}
                className="flex w-full items-center rounded-xl bg-[#FDF0D9] p-6 shadow-md transition duration-300 hover:cursor-pointer hover:shadow-lg"
              >
                <div className="mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-amber-200">
                  <Image
                    src="/img/icon_star.png"
                    alt="Star Icon"
                    width={32}
                    height={32}
                    className="text-red-400"
                  />
                </div>
                <span className="text-xl font-bold text-red-400">
                  Hot Lava Quiz
                </span>
              </button>
              <div
                className={twJoin(
                  "mt-2 flex h-80 w-full flex-col items-center overflow-hidden rounded-md bg-white p-4 shadow-md transition-all duration-300",
                  openTabs.has("HotLava Quiz")
                    ? "max-h-[300px] opacity-100"
                    : "max-h-0 opacity-0",
                )}
              >
                <div className="flex w-2xs flex-col justify-center space-y-3 p-2">
                  <p>Qustion 1</p>
                  <Input />
                  <div className="grid w-full grid-cols-2 items-center justify-center gap-y-5">
                    <div className="flex items-center space-x-1.5">
                      <Checkbox />
                      <Label>2</Label>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Checkbox />
                      <Label>234!</Label>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Checkbox />
                      <Label>5lne</Label>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Checkbox />
                      <Label>All are correct</Label>
                    </div>
                  </div>
                  <div>
                    <p>Answer: </p>
                    <Input />
                  </div>
                  <Button onClick={() => router.push("/hotlava")}>
                    {" "}
                    Go to Game
                  </Button>
                </div>
              </div>
            </div>

            {/* Pixel Jumper */}
            <div className="flex flex-col">
              <button
                onClick={() => {
                  toggleTab("Pixel Jumper");
                  handleModeSelect("Pixel Jumper");
                }}
                className="flex w-full items-center rounded-xl bg-[#FDF0D9] p-6 shadow-md transition duration-300 hover:cursor-pointer hover:shadow-lg"
              >
                <div className="mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-amber-200">
                  <Image
                    src="/img/icon_rectangle.png"
                    alt="Square Icon"
                    width={32}
                    height={32}
                    className="text-red-400"
                  />
                </div>
                <span className="text-xl font-bold text-red-400">
                  Pixel Jumper
                </span>
              </button>
              <div
                className={twJoin(
                  "mt-2 flex h-80 w-full flex-col items-center overflow-hidden rounded-md bg-white p-4 shadow-md transition-all duration-300",
                  openTabs.has("Pixel Jumper")
                    ? "max-h-[300px] opacity-100"
                    : "max-h-0 opacity-0",
                )}
              >
                <div className="flex w-2xs flex-col justify-center space-y-3 p-2">
                  <p>Qustion 1</p>
                  <Input />
                  <div className="grid w-full grid-cols-2 items-center justify-center gap-y-5">
                    <div className="flex items-center space-x-1.5">
                      <Checkbox />
                      <Label>2</Label>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Checkbox />
                      <Label>234!</Label>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Checkbox />
                      <Label>5lne</Label>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Checkbox />
                      <Label>All are correct</Label>
                    </div>
                  </div>
                  <div>
                    <p>Answer: </p>
                    <Input />
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button onClick={() => router.push("/pixeljumper")}>
                      Go to Game
                    </Button>
                    <Button onClick={() => router.push("/pixeljumper/mobile")}>
                      Go to Game (mobile)
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="mt-4 flex w-full justify-center">
        <button className="w-full max-w-sm cursor-pointer rounded-md bg-green-500 px-6 py-3 text-white transition-colors duration-300 ease-in-out hover:bg-green-600 hover:font-semibold">
          Assign
        </button>
      </div>

      {/* Add this to your global CSS or as a style tag */}
      <style jsx global>{`
        .bg-cream-50 {
          background-color: #fffbeb;
        }
      `}</style>
    </div>
  );
};

export default AssignmentPage;
