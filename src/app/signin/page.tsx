"use client";

import { FrontendRoutes } from "@/config/apiRoutes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface SignInData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface UserData {
  name: string;
  tel: string;
  email: string;
  password: string;
  role: string;
}

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignInData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing again
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Clear general error if it exists
    if (errors.general) {
      setErrors((prev) => ({
        ...prev,
        general: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "กรุณากรอกอีเมลให้ถูกต้อง";
      isValid = false;
    }

    // Password validation - not empty
    if (!formData.password) {
      newErrors.password = "กรุณากรอกรหัสผ่าน";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        // ตรวจสอบว่ามีข้อมูลผู้ใช้ที่ลงทะเบียนไว้หรือไม่
        if (typeof window !== "undefined") {
          const storedUsers = localStorage.getItem("registeredUsers");

          if (storedUsers) {
            const users: Array<UserData> = JSON.parse(storedUsers);

            // ค้นหาผู้ใช้ที่มีอีเมลตรงกับที่กรอกมา
            const user = users.find((u) => u.email === formData.email);

            if (user && user.password === formData.password) {
              // ถ้าตรงกัน ให้เก็บข้อมูลผู้ใช้ปัจจุบันและตั้งค่าสถานะเข้าสู่ระบบ
              localStorage.setItem("user", JSON.stringify(user)); // ใช้ key "user" แทนที่จะเป็น "currentUser"
              localStorage.setItem("isLoggedIn", "true");

              console.log("SignIn successful:", user);

              // นำทางไปยังหน้า home (/)
              router.push(FrontendRoutes.HOME);
            } else {
              // ถ้าไม่พบผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
              setErrors({
                general: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
              });
            }
          } else {
            // ถ้าไม่มีข้อมูลผู้ใช้ที่ลงทะเบียนไว้
            setErrors({
              general: "ไม่พบข้อมูลผู้ใช้ กรุณาลงทะเบียนก่อน",
            });
          }
        }
      } catch (error) {
        console.error("SignIn error:", error);
        setErrors({
          general: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ โปรดลองอีกครั้ง",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-amber-100 p-6">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
        <div className="mb-6 flex flex-col items-center">
          {/* App Logo/Icon */}
          <div className="mb-3">
            <Image
              src="/img/evergrow.png"
              alt="EverGrow Logo"
              className="h-16 w-16 object-contain"
              width={64}
              height={64}
            />
          </div>
          <h1 className="text-center text-xl font-bold">EverGrow Sign In</h1>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* General Error Message */}
          {errors.general && (
            <div className="mb-4 rounded border border-red-400 bg-red-100 p-2 text-red-700">
              <p className="text-sm">{errors.general}</p>
            </div>
          )}

          {/* Email Field */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full border px-3 py-2 ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none`}
              required
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-5">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full border px-3 py-2 ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none`}
              required
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-green-700 py-2 font-medium text-white transition duration-300 hover:bg-green-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? "กำลังเข้าสู่ระบบ..." : "Sign In"}
          </button>

          {/* Link to Register Page */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              ยังไม่มีบัญชี?{" "}
              <Link href="/register" className="text-green-700 hover:underline">
                ลงทะเบียน
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
