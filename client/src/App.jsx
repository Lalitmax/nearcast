"use client"

import { useState, useEffect } from "react"
import { AuthContext } from "./context/AuthContext"
import { ThemeContext } from "./context/ThemeContext"
import Navigation from "./components/Navigation"
import AuthPages from "./pages/AuthPages"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import CreatePostPage from "./pages/CreatePostPage"
import "./index.css"

function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [isDark, setIsDark] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const savedUser = localStorage.getItem("user")

    if (savedTheme === "dark") {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentPage("home")
    localStorage.removeItem("user")
  }

  if (!user && (currentPage === "profile" || currentPage === "create")) {
    setCurrentPage("auth")
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <AuthContext.Provider value={{ user, setUser }}>
        <div className="min-h-screen bg-surface dark:bg-secondary">
          {user && <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={handleLogout} />}

          {!user ? (
            <AuthPages setCurrentPage={setCurrentPage} setUser={setUser} />
          ) : (
            <>
              {currentPage === "home" && <HomePage />}
              {currentPage === "profile" && <ProfilePage user={user} setUser={setUser} />}
              {currentPage === "create" && <CreatePostPage user={user} setCurrentPage={setCurrentPage} />}
            </>
          )}
        </div>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App
