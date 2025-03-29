import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Remindercard from '@/components/ui/remindercard'
import { Package } from 'lucide-react';
import { LibraryBig } from 'lucide-react';
import Materialbutton from '@/components/ui/ClassMaterial/materialbutton';
import Materialbuttonnotdownload from '@/components/ui/ClassMaterial/materialbuttonnotdownload'
import Uploadmaterialbutton from '@/components/ui/ClassMaterial/uploadmaterialbutton';
import Homeworkbanner from '@/components/ui/Homework/homeworkbanner';


const Page = () => {
  
  const [selectedTab, setSelectedTab] = useState(1)

  const handleTabClick = (tabIndex: number) => {
    setSelectedTab(tabIndex)
  }

  return (
    <div className="w-full">
      <div className="flex flex-row justify-center h-60">
        <div className="pt-8">
          <Link href="/">
            <Image
              src={'/tree-detail/bigfattree.png'}
              alt="TreeImage"
              width={177}
              height={207}
              className="mx-auto hover:scale-105"
            />
          </Link>
        </div>
        <div className="ml-4">
          <span className="font-bold text-2xl">Prob Stat</span>
          <ul className="mt-4 flex flex-col gap-4">
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
      <div className="sm:w-7/12 sm:mx-auto mt-4">
        <div
          role="tablist"
          aria-label="tabs"
          className="relative w-max mx-auto h-12 grid grid-cols-2 items-center rounded-full bg-[#c4edba] overflow-hidden shadow-2xl shadow-20 transition"
        >
          <button
            role="tab"
            aria-selected={selectedTab === 1}
            onClick={() => handleTabClick(1)}
            className={`relative block h-10 px-6 tab rounded-full transition duration-300 ${
              selectedTab === 1 ? 'bg-white shadow-md w-full' : 'text-black'
            } cursor-pointer`}
          >
            <span className={selectedTab === 1 ? 'text-black' : ''}>
              Assignment
            </span>
          </button>
          <button
            role="tab"
            aria-selected={selectedTab === 2}
            onClick={() => handleTabClick(2)}
            className={`relative block h-10 px-6 tab rounded-full transition duration-300 ${
              selectedTab === 2 ? 'bg-white shadow-md w-full' : 'text-black'
            } cursor-pointer`}
          >
            <span className={selectedTab === 2 ? 'text-black' : ''}>
              Material
            </span>
          </button>
        </div>

        {/* Tab Panels */}
        <div className="mt-6 relative rounded-3xl">
          {selectedTab === 1 && (
            <div
              role="tabpanel"
              className="tab-panel px-4 transition duration-300"
            >
              <div className="flex flex-row gap-1.5">
                <LibraryBig className='mt-0.5'/>
                <span className="text-xl font-semibold text-black">Homework/Classwork</span>
              </div>
              <hr className="mt-1.5 border-t border-black w-full"/>
              <div className= "flex flex-col gap-4 w-full h-full pt-4">
                <Homeworkbanner/>
                <Homeworkbanner/>
                <Homeworkbanner/>
              </div>
            </div>
          )}
          {selectedTab === 2 && (
            <div
              role="tabpanel"
              className="tab-panel px-4 transition duration-300"
            >
              <div className="flex flex-row gap-1.5">
                <Package className='mt-0.5'/>
                <span className="text-xl font-semibold text-black">Class Material</span>
              </div>
              <hr className="mt-1.5 border-t border-black w-full"/>
              <div className= "w-full h-full pt-4">
                <ul className="w-full">
                  <li className='flex justify-between'><Materialbutton/><Materialbuttonnotdownload/></li>
                  <li className='flex justify-between pt-4'><Materialbuttonnotdownload/><Uploadmaterialbutton/></li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
