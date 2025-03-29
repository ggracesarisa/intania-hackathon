"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-amber-100 p-6">
      <div className="flex max-w-lg flex-col items-center">
        {/* Welcome Message */}
        <h1 className="text-brown-700 mb-6 text-3xl font-bold lg:text-4xl">
          Welcome to EverGrow
        </h1>

        {/* Image */}
        <div className="mb-6 h-48 w-48 overflow-hidden rounded-lg lg:h-56 lg:w-56">
          <Image
            src="/img/evergrow.png"
            alt="EverGrow Logo"
            className="h-full w-full object-cover"
            width={200}
            height={100}
          />
        </div>

        {/* Sign In Button - Now links to /signin */}
        <Link href="/signin" className="mb-2 w-48 lg:w-56">
          <button className="bg-brown-500 w-full rounded-full py-2 text-lg text-white lg:py-3">
            Sign In
          </button>
        </Link>

        {/* Register Button */}
        <Link href="/register" className="w-48 lg:w-56">
          <button className="text-brown-500 border-brown-500 w-full rounded-full border-2 bg-transparent py-2 text-lg lg:py-3">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
