"use client"

import { useState } from "react"
import { MapPin, Home, AlertCircle, CheckCircle, User } from "lucide-react"

export default function ProfileEditForm({ user, setUser, onCancel }) {
  const [formData, setFormData] = useState({
    name: user.name,
    pincode: user.pincode,
    address: user.address,
  })
  const [errors, setErrors] = useState({})
  const [saveMessage, setSaveMessage] = useState("")

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Valid 6-digit pincode required"
    if (!formData.address.trim()) newErrors.address = "Address is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validateForm()) return

    const updatedUser = {
      ...user,
      ...formData,
    }

    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setSaveMessage("Profile updated successfully!")
    setTimeout(() => {
      setSaveMessage("")
      onCancel()
    }, 2000)
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
    <div className="bg-white dark:bg-card-dark rounded-2xl shadow-xl border border-border dark:border-border-dark p-8 mb-6 animate-[fadeIn_0.5s_ease-out]">
      {saveMessage && (
        <div className="mb-6 p-4 bg-gradient-to-r from-success/10 to-success/5 border-2 border-success/30 rounded-xl flex items-center gap-3 text-success animate-[slideIn_0.3s_ease-out]">
          <CheckCircle className="h-6 w-6" />
          <p className="font-semibold">{saveMessage}</p>
        </div>
      )}

      <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-6">Edit Profile</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-text-light dark:text-text-light-dark mb-2 flex items-center gap-2">
            <User className="h-4 w-4" />
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-border dark:border-border-dark bg-white dark:bg-secondary-dark text-text dark:text-text-dark rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-200"
          />
          {errors.name && (
            <p className="text-error text-sm mt-2 flex items-center gap-1 font-medium">
              <AlertCircle className="h-4 w-4" />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-light dark:text-text-light-dark mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Pincode
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-text-lighter dark:text-text-lighter-dark h-5 w-5" />
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              maxLength="6"
              className="w-full pl-12 pr-4 py-3 border-2 border-border dark:border-border-dark bg-white dark:bg-secondary-dark text-text dark:text-text-dark rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-200"
            />
          </div>
          {errors.pincode && (
            <p className="text-error text-sm mt-2 flex items-center gap-1 font-medium">
              <AlertCircle className="h-4 w-4" />
              {errors.pincode}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-light dark:text-text-light-dark mb-2 flex items-center gap-2">
            <Home className="h-4 w-4" />
            Address
          </label>
          <div className="relative">
            <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-text-lighter dark:text-text-lighter-dark h-5 w-5" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border-2 border-border dark:border-border-dark bg-white dark:bg-secondary-dark text-text dark:text-text-dark rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-200"
            />
          </div>
          {errors.address && (
            <p className="text-error text-sm mt-2 flex items-center gap-1 font-medium">
              <AlertCircle className="h-4 w-4" />
              {errors.address}
            </p>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 border-2 border-border dark:border-border-dark text-text dark:text-text-dark rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

