"use client"

import { useState, useRef, useEffect } from "react"
import { useTheme } from "../hooks/useTheme"
import { Home, Plus, User, LogOut, Moon, Sun } from "lucide-react"

export default function Navigation({ currentPage, setCurrentPage, onLogout }) {
  const { isDark, toggleTheme } = useTheme()
  const [showSettingsMenu, setShowSettingsMenu] = useState(false)
  const menuRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowSettingsMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleProfileClick = () => {
    setCurrentPage("profile")
    setShowSettingsMenu(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-secondary-dark/80 backdrop-blur-lg border-b border-border dark:border-border-dark shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div onClick={() => setCurrentPage("home")} className="cursor-pointer group">
            <h1 className="text-2xl font-bold text-text dark:text-text-dark">
              Nearcast
            </h1>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage("home")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                currentPage === "home"
                  ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/30"
                  : "text-text dark:text-text-dark hover:bg-slate-100 dark:hover:bg-slate-700/50"
              }`}
            >
              <Home className="h-5 w-5" />
              <span className="hidden sm:inline">Feed</span>
            </button>

            <button
              onClick={() => setCurrentPage("create")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                currentPage === "create"
                  ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/30"
                  : "text-text dark:text-text-dark hover:bg-slate-100 dark:hover:bg-slate-700/50"
              }`}
            >
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">Create</span>
            </button>

            {/* Profile with Settings Dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  currentPage === "profile"
                    ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/30"
                    : "text-text dark:text-text-dark hover:bg-slate-100 dark:hover:bg-slate-700/50"
                }`}
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">Profile</span>
              </button>

              {/* Settings Dropdown Menu */}
              {showSettingsMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-card-dark rounded-2xl shadow-2xl border border-border dark:border-border-dark overflow-hidden animate-[scaleIn_0.2s_ease-out]">
                  <button
                    onClick={handleProfileClick}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-text dark:text-text-dark hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary-light/10 transition-all duration-200"
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">View Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      toggleTheme()
                      setShowSettingsMenu(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-text dark:text-text-dark hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary-light/10 transition-all duration-200 border-t border-border-light dark:border-border-light-dark"
                  >
                    {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    <span className="font-medium">{isDark ? "Light Mode" : "Dark Mode"}</span>
                  </button>

                  <button
                    onClick={() => {
                      onLogout()
                      setShowSettingsMenu(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-error hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 border-t border-border-light dark:border-border-light-dark"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
