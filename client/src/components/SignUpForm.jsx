"use client"

import { useState } from "react"
import { Mail, Lock, User, MapPin } from "lucide-react"

export default function SignUpForm({ setUser, setCurrentPage }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pincode: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required"
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Valid 6-digit pincode required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    setTimeout(() => {
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        pincode: formData.pincode,
        createdAt: new Date().toISOString(),
      }

      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      setCurrentPage("home")
      setIsLoading(false)
    }, 500)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-3xl font-bold text-white mb-2">Join Your Neighborhood</h2>
      <p className="text-slate-400 mb-6">Create an account to get started</p>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
          <User className="h-4 w-4" />
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all duration-200"
          placeholder="John Doe"
        />
        {errors.name && <p className="text-error text-sm mt-2 font-medium">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all duration-200"
          placeholder="you@example.com"
        />
        {errors.email && <p className="text-error text-sm mt-2 font-medium">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Pincode
        </label>
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all duration-200"
          placeholder="123456"
          maxLength="6"
        />
        {errors.pincode && <p className="text-error text-sm mt-2 font-medium">{errors.pincode}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
          <Lock className="h-4 w-4" />
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all duration-200"
          placeholder="••••••••"
        />
        {errors.password && <p className="text-error text-sm mt-2 font-medium">{errors.password}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
          <Lock className="h-4 w-4" />
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all duration-200"
          placeholder="••••••••"
        />
        {errors.confirmPassword && <p className="text-error text-sm mt-2 font-medium">{errors.confirmPassword}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-6"
      >
        {isLoading ? "Creating Account..." : "Sign Up"}
      </button>
    </form>
  )
}
