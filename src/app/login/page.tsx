"use client";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-amber-100 p-6">
      <div className="flex flex-col items-center">
        
        {/* Welcome Message */}
        <h1 className="text-3xl lg:text-5xl font-bold text-brown-700 mb-6">
          Welcome to EverGrow
        </h1>
        
        {/* Image */}
        <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-lg overflow-hidden mb-6">
          <img
            src="/img/evergrow.png"
            alt="EverGrow Logo"
            className="object-cover w-full h-full"
          />
        </div>
        
        {/* Sign In Button */}
        <button
          onClick={handleLogin}
          className="w-48 lg:w-64 py-2 lg:py-3 mb-2 text-white bg-brown-500 text-lg lg:text-xl rounded-full"
        >
          Sign In
        </button>
        
        {/* Register Button */}
        <button
          onClick={() => alert("Redirect to Register Page")}
          className="w-48 lg:w-64 py-2 lg:py-3 text-brown-500 bg-transparent text-lg lg:text-xl border-2 border-brown-500 rounded-full"
        >
          Register
        </button>
      </div>
    </div>
  );
}
