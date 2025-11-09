"use client"

import { useState } from "react"
import { Mail, Lock } from "lucide-react"

export default function SignInForm({ setUser, setCurrentPage }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.includes("@")) newErrors.email = "Valid email is required"
    if (!formData.password) newErrors.password = "Password is required"

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
        name: formData.email.split("@")[0],
        email: formData.email,
        zipcode: "12345",
        address: "123 Main St",
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
      <p className="text-slate-400 mb-6">Sign in to continue to your neighborhood</p>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all duration-200"
            placeholder="you@example.com"
          />
        </div>
        {errors.email && <p className="text-error text-sm mt-2 font-medium">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
          <Lock className="h-4 w-4" />
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all duration-200"
            placeholder="••••••••"
          />
        </div>
        {errors.password && <p className="text-error text-sm mt-2 font-medium">{errors.password}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-8"
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  )
}
