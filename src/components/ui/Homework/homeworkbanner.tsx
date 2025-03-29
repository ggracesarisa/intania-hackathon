"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Homeworkbanner = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href="/assignments" passHref>
      <div 
        className="w-full h-20 bg-[#EFD8BE] rounded-lg flex justify-between p-4 items-center hover:scale-105 hover:cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex justify-between w-full">
          <div className='flex gap-4 items-center'>
            <Image 
              src={'/tree-detail/homeworkIcon.png'} 
              alt="ShovelImage" 
              width={63} 
              height={63} 
              className="mx-auto"
            />
            <span className="text-xl font-bold">Homework 1</span>
          </div>
          <span className={`flex flex-row justify-end items-center ${isHovered ? 'underline' : ''}`}>Handed in</span>
        </div>
      </div>
    </Link>
  )
}

export default Homeworkbanner
