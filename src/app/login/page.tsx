"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-amber-100 p-6">
      <div className="flex flex-col items-center max-w-lg">
        
        {/* Welcome Message */}
        <h1 className="text-3xl lg:text-4xl font-bold text-brown-700 mb-6">
          Welcome to EverGrow
        </h1>
        
        {/* Image */}
        <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-lg overflow-hidden mb-6">
          <img
            src="/img/evergrow.png"
            alt="EverGrow Logo"
            className="object-cover w-full h-full"
          />
        </div>
        
        {/* Sign In Button - Now links to /signin */}
        <Link href="/signin" className="w-48 lg:w-56 mb-2">
          <button 
            className="w-full py-2 lg:py-3 text-white bg-brown-500 text-lg rounded-full"
          >
            Sign In
          </button>
        </Link>
        
        {/* Register Button */}
        <Link href="/register" className="w-48 lg:w-56">
          <button 
            className="w-full py-2 lg:py-3 text-brown-500 bg-transparent text-lg border-2 border-brown-500 rounded-full"
          >
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}