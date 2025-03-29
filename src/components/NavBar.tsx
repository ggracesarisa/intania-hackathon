"use client";
import { FrontendRoutes } from "@/config/apiRoutes";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  HomeIcon,
  LogInIcon,
  MenuIcon,
  UserRoundSearchIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuroraText } from "./magicui/aurora-text";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

const NavBar = () => {
  const router = useRouter();
  return (
    <div className="flex w-full items-center justify-between bg-white px-4 py-2 shadow-lg">
      {/* Logo Icon */}
      <Link href="/" passHref>
        <div className="border- flex items-center rounded-full border-transparent transition-all duration-300 hover:scale-110 hover:bg-gray-400">
          <Image
            src="/img/icon.png"
            alt="Logo"
            className="h-8 w-8 transition-all duration-300 md:h-12 md:w-12"
            width={48} // Updated to match your image's display size
            height={48} // Same here
          />
        </div>
      </Link>

      {/* Title */}
      <div className="flex flex-1 justify-center">
        <AuroraText className="text-xl font-bold tracking-tighter md:text-3xl">
          EverGrow
        </AuroraText>
      </div>

      {/* Menu Icon */}
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:bg-primary-foreground/20 rounded-lg p-1.5 transition-all hover:scale-105 hover:shadow-md">
          <MenuIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="flex items-center space-x-1.5"
              onClick={() => router.push(FrontendRoutes.HOME)}
            >
              <HomeIcon />
              <>Home</>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center space-x-1.5"
              onClick={() => router.push(FrontendRoutes.SELF_DISCOVERY)}
            >
              <UserRoundSearchIcon />
              <>Self Discovery</>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="flex items-center space-x-1.5"
              onClick={() => router.push(FrontendRoutes.LOGIN)}
            >
              <LogInIcon />
              <>Login</>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavBar;
