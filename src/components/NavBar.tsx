import { MenuIcon } from "lucide-react";
import { AuroraText } from "./magicui/aurora-text";

const NavBar = () => {
  return (
    <div className="h- flex w-full items-center justify-between bg-white px-2 py-1.5 shadow-lg">
      <p>icon here</p>
      <AuroraText className="text-xl font-bold tracking-tighter md:text-3xl">
        Evergrow
      </AuroraText>
      <MenuIcon />
    </div>
  );
};

export default NavBar;
