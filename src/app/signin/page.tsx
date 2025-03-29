"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    password: ""
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing again
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    
    // Clear general error if it exists
    if (errors.general) {
      setErrors(prev => ({
        ...prev,
        general: undefined
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
        if (typeof window !== 'undefined') {
          const storedUsers = localStorage.getItem("registeredUsers");
          
          if (storedUsers) {
            const users: UserData[] = JSON.parse(storedUsers);
            
            // ค้นหาผู้ใช้ที่มีอีเมลตรงกับที่กรอกมา
            const user = users.find(u => u.email === formData.email);
            
            if (user && user.password === formData.password) {
              // ถ้าตรงกัน ให้เก็บข้อมูลผู้ใช้ปัจจุบันและตั้งค่าสถานะเข้าสู่ระบบ
              localStorage.setItem("user", JSON.stringify(user)); // ใช้ key "user" แทนที่จะเป็น "currentUser"
              localStorage.setItem("isLoggedIn", "true");
              
              console.log("SignIn successful:", user);
              
              // นำทางไปยังหน้า home (/)
              router.push("/");
            } else {
              // ถ้าไม่พบผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
              setErrors({
                general: "อีเมลหรือรหัสผ่านไม่ถูกต้อง"
              });
            }
          } else {
            // ถ้าไม่มีข้อมูลผู้ใช้ที่ลงทะเบียนไว้
            setErrors({
              general: "ไม่พบข้อมูลผู้ใช้ กรุณาลงทะเบียนก่อน"
            });
          }
        }
      } catch (error) {
        console.error("SignIn error:", error);
        setErrors({
          general: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ โปรดลองอีกครั้ง"
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-amber-100 p-6">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          {/* App Logo/Icon */}
          <div className="mb-3">
            <img 
              src="/img/evergrow.png" 
              alt="EverGrow Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-center">EverGrow Sign In</h1>
        </div>
        
        <form onSubmit={handleSubmit} noValidate>
          {/* General Error Message */}
          {errors.general && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
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
              className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>
          
          {/* Password Field */}
          <div className="mb-5">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>
          
          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-2 bg-green-700 text-white font-medium rounded-md hover:bg-green-800 transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "กำลังเข้าสู่ระบบ..." : "Sign In"}
          </button>
          
          {/* Link to Register Page */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              ยังไม่มีบัญชี? <Link href="/register" className="text-green-700 hover:underline">ลงทะเบียน</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}