import { MenuIcon } from "lucide-react";
import { AuroraText } from "./magicui/aurora-text";

const NavBar = () => {
  return (
    <div className="flex w-full items-center justify-between bg-white px-4 py-2 shadow-lg">
      {/* Logo Icon */}
      <div className="flex items-center">
        <img
          src="/img/icon.png"
          alt="Logo"
          className="h-8 w-8 md:h-12 md:w-12"
        />
      </div>

      {/* Title */}
      <div className="flex flex-1 justify-center">
        <AuroraText className="text-xl font-bold tracking-tighter md:text-3xl">
          EverGrow
        </AuroraText>
      </div>

      {/* Menu Icon */}
      <div className="flex items-center">
        <MenuIcon className="h-6 w-6 md:h-8 md:w-8" />
      </div>
    </div>
  );
};

export default NavBar;
