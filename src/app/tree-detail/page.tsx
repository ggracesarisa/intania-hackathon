"use client";
import Materialbutton from "@/components/ui/ClassMaterial/materialbutton";
import Materialbuttonnotdownload from "@/components/ui/ClassMaterial/materialbuttonnotdownload";
import Uploadmaterialbutton from "@/components/ui/ClassMaterial/uploadmaterialbutton";
import Homeworkbanner from "@/components/ui/Homework/homeworkbanner";
import Remindercard from "@/components/ui/remindercard";
import { LibraryBig, Package } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Page = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [isBouncing, setIsBouncing] = useState(false);

  const handleTabClick = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };

  const handleImageClick = () => {
    setIsBouncing(true);
    setTimeout(() => {
      setIsBouncing(false);
    }, 200); // Reset bounce after 500ms
  };

  return (
    <div className="w-full">
      <div className="flex h-full flex-row justify-center">
        <div className="pt-8">
          <Image
            src={"/tree-detail/bigfattree.png"}
            alt="TreeImage"
            width={177}
            height={207}
            className={`mx-auto cursor-pointer transition-all duration-500 ${
              isBouncing ? "scale-110" : "scale-105"
            }`} // Adjust scale based on the isBouncing state
            onClick={handleImageClick} // Add click event to trigger the bounce effect
          />
          <div className="mt-1 h-1.5 w-full rounded-full bg-white md:h-2">
            <div
              className="h-1.5 rounded-full bg-green-400 md:h-2"
              style={{ width: `80%` }}
            ></div>
          </div>
        </div>
        <div className="ml-4">
          <span className="text-2xl font-bold">Prob Stat</span>
          <ul className="mt-1 mr-2 flex flex-col gap-4">
            <li>
              <Remindercard />
            </li>
            <li>
              <Remindercard />
            </li>
            <li>
              <Remindercard />
            </li>
          </ul>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mt-4 sm:mx-auto sm:w-7/12">
        <div
          role="tablist"
          aria-label="tabs"
          className="shadow-20 relative mx-auto grid h-12 w-max grid-cols-2 items-center overflow-hidden rounded-full bg-[#c4edba] shadow-2xl transition"
        >
          <button
            role="tab"
            aria-selected={selectedTab === 1}
            onClick={() => handleTabClick(1)}
            className={`tab relative block h-10 rounded-full px-6 transition duration-300 ${
              selectedTab === 1 ? "w-full bg-white shadow-md" : "text-black"
            } cursor-pointer`}
          >
            <span className={selectedTab === 1 ? "text-black" : ""}>
              Assignment
            </span>
          </button>
          <button
            role="tab"
            aria-selected={selectedTab === 2}
            onClick={() => handleTabClick(2)}
            className={`tab relative block h-10 rounded-full px-6 transition duration-300 ${
              selectedTab === 2 ? "w-full bg-white shadow-md" : "text-black"
            } cursor-pointer`}
          >
            <span className={selectedTab === 2 ? "text-black" : ""}>
              Material
            </span>
          </button>
        </div>

        {/* Tab Panels */}
        <div className="relative mt-6 rounded-3xl">
          {selectedTab === 1 && (
            <div
              role="tabpanel"
              className="tab-panel px-4 transition duration-300"
            >
              <div className="flex flex-row gap-1.5">
                <LibraryBig className="mt-0.5" />
                <span className="text-xl font-semibold text-black">
                  Homework/Classwork
                </span>
              </div>
              <hr className="mt-1.5 w-full border-t border-black" />
              <div className="flex h-full w-full flex-col gap-4 pt-4">
                <Homeworkbanner />
                <Homeworkbanner />
                <Homeworkbanner />
              </div>
            </div>
          )}
          {selectedTab === 2 && (
            <div
              role="tabpanel"
              className="tab-panel px-4 transition duration-300"
            >
              <div className="flex flex-row gap-1.5">
                <Package className="mt-0.5" />
                <span className="text-xl font-semibold text-black">
                  Class Material
                </span>
              </div>
              <hr className="mt-1.5 w-full border-t border-black" />
              <div className="h-full w-full pt-4">
                <ul className="w-full">
                  <li className="flex justify-between">
                    <Materialbutton />
                    <Materialbuttonnotdownload />
                  </li>
                  <li className="flex justify-between pt-4">
                    <Materialbuttonnotdownload />
                    <Uploadmaterialbutton />
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
