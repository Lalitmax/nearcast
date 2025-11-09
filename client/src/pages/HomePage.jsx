"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import PostCard from "../components/PostCard"
import EmptyState from "../components/EmptyState"

export default function HomePage() {
  const [filteredPosts, setFilteredPosts] = useState([])

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-slate-50 to-primary/5 dark:from-surface-dark dark:via-slate-900 dark:to-primary/5 pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPosts.length === 0 ? (
          <EmptyState/>
        ) : (
          <div className="space-y-5">
            {filteredPosts.map((post) => (
              <PostCard
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
