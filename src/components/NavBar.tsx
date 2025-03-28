import { MenuIcon } from "lucide-react";
import { AuroraText } from "./magicui/aurora-text";

const NavBar = () => {
  return (
    <div className="flex w-full justify-between bg-white shadow-lg">
      <p>icon here</p>
      <AuroraText className="text-xl">Evergrow</AuroraText>
      <MenuIcon />
    </div>
  );
};

export default NavBar;
