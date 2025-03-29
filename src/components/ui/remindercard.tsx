import { ChevronRight } from "lucide-react";
import { useState } from "react";

const ReminderCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev); // Toggle the current state
  };

  return (
    <div
      className="flex w-[13rem] cursor-pointer flex-col rounded-lg bg-[#E5CCBA] transition-all duration-300"
      onClick={toggleOpen} // Change to onClick to toggle the dropdown
    >
      <div className="flex h-[2.4rem] flex-row items-center gap-2 pl-2">
        <span className="font-bold">Quiz 1</span>
        <span className="font-mono">29/01/2025</span>
        <ChevronRight className={`mr-2 ml-auto transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-b-lg bg-[#f1eae4] p-2">
          <p className="text-sm">Details about Quiz 1.</p>
        </div>
      </div>
    </div>
  );
};

export default ReminderCard;
