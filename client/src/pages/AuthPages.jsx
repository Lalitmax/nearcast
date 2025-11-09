"use client"

import { useState } from "react"
import SignUpForm from "../components/SignUpForm"
import SignInForm from "../components/SignInForm"

export default function AuthPages({ setCurrentPage, setUser }) {
  const [isSignIn, setIsSignIn] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10 animate-[fadeIn_0.5s_ease-out]">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent mb-3">
            Nearcast
          </h1>
          <p className="text-slate-300 text-lg">Connect with your neighborhood</p>
        </div>

        <div className="bg-white/5 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 sm:p-10 animate-[scaleIn_0.5s_ease-out]">
          {isSignIn ? (
            <SignInForm setUser={setUser} setCurrentPage={setCurrentPage} />
          ) : (
            <SignUpForm setUser={setUser} setCurrentPage={setCurrentPage} />
          )}

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-primary-light hover:text-primary font-semibold transition-colors duration-200"
            >
              {isSignIn ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>

        <p className="text-center text-slate-400 text-sm mt-6">
          © 2024 Neacrcast. All rights reserved.
        </p>
      </div>
    </div>
  )
}
