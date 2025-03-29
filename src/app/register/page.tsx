"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormData {
  name: string;
  tel: string;
  email: string;
  password: string;
  role: string;
}

interface FormErrors {
  name?: string;
  tel?: string;
  email?: string;
  password?: string;
}

// สร้างตัวแปรเพื่อเก็บข้อมูลผู้ใช้ที่ลงทะเบียนไว้ชั่วคราว
// ในสถานการณ์จริงควรใช้ backend เพื่อจัดการข้อมูลนี้
let registeredUsers: FormData[] = [];

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    tel: "",
    email: "",
    password: "",
    role: "student" // Default role
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "กรุณากรอกชื่อ";
      isValid = false;
    }
    
    // Telephone validation - must be in format xxx-xxx-xxxx
    const telPattern = /^\d{3}-\d{3}-\d{4}$/;
    if (!telPattern.test(formData.tel)) {
      newErrors.tel = "กรุณากรอกเบอร์โทรในรูปแบบ 000-000-0000";
      isValid = false;
    }
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "กรุณากรอกอีเมลให้ถูกต้อง";
      isValid = false;
    }
    
    // Password validation - at least 6 characters
    if (formData.password.length < 6) {
      newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validateForm()) {
      try {
        // เก็บข้อมูลผู้ใช้ในตัวแปร registeredUsers
        registeredUsers.push({ ...formData });
        
        // เก็บข้อมูลผู้ใช้ใน localStorage เพื่อใช้อ้างอิงต่อไป
        localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
        
        // เก็บข้อมูลผู้ใช้ล่าสุดเพื่อให้หน้า signin สามารถเข้าถึงได้
        localStorage.setItem("lastRegisteredUser", JSON.stringify(formData));
        
        // ไม่ตั้งค่า isLoggedIn เป็น true เพราะเราต้องการให้ผู้ใช้เข้าสู่ระบบก่อน
        console.log("Registration successful:", formData);
        
        // รีเซ็ตฟอร์ม
        setFormData({
          name: "",
          tel: "",
          email: "",
          password: "",
          role: "student"
        });
        
        // นำทางไปยังหน้า signin
        router.push("/signin");
      } catch (error) {
        console.error("Registration error:", error);
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
          {/* App Logo/Icon - Increased size */}
          <div className="mb-3">
            <img 
              src="/img/evergrow.png" 
              alt="EverGrow Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-center">EverGrow Register</h1>
        </div>
        
        <form onSubmit={handleSubmit} noValidate>
          {/* Name Field */}
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>
          
          {/* Telephone Field */}
          <div className="mb-4">
            <input
              type="tel"
              name="tel"
              value={formData.tel}
              onChange={handleChange}
              placeholder="Tel. (000-000-0000)"
              className={`w-full px-3 py-2 border ${errors.tel ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            />
            {errors.tel && <p className="mt-1 text-xs text-red-500">{errors.tel}</p>}
          </div>
          
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
          <div className="mb-4">
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
          
          {/* Role Selection */}
          <div className="mb-5">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              required
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-2 bg-green-700 text-white font-medium rounded-md hover:bg-green-800 transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "กำลังลงทะเบียน..." : "Register"}
          </button>
          
          {/* Link to Signin Page */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              มีบัญชีอยู่แล้ว? <Link href="/signin" className="text-green-700 hover:underline">เข้าสู่ระบบ</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}