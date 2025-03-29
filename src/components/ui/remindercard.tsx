import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const ReminderCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="group w-[13rem] bg-[#E5CCBA] rounded-lg flex flex-col transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >

      <div className="flex flex-row items-center gap-2 pl-2 h-[2.4rem]">
        <span className="font-bold">Quiz 1</span>
        <span className="font-mono">29/01/2025</span>
        <ChevronRight className="ml-auto mr-2 transition-transform duration-300 group-hover:rotate-90" />
      </div>


      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-2 bg-[#f1eae4] rounded-b-lg">
          <p className="text-sm">Details about Quiz 1.</p>
        </div>
      </div>
    </div>
  );
};

export default ReminderCard;
