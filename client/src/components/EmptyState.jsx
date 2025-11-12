"use client"

import { MapPin, PlusCircle } from "lucide-react"

export default function EmptyState({ filterPincode, showNearby }) {
  return (
    <div className="text-center py-16 bg-white dark:bg-card-dark rounded-2xl shadow-xl border border-border dark:border-border-dark animate-[fadeIn_0.5s_ease-out]">
      <div className="relative inline-block mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-20 animate-pulse"></div>
        <div className="relative p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full">
          <MapPin className="h-16 w-16 text-primary" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-text dark:text-text-dark mb-3">No posts yet</h3>
      <p className="text-text-light dark:text-text-light-dark mb-6 max-w-md mx-auto">
        {showNearby
          ? "No posts found in nearby pincodes. Be the first to share something with your neighbors!"
          : `No posts found in pincode ${filterPincode}. Be the first to share something with your neighbors!`}
      </p>

      <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-semibold shadow-lg shadow-primary/30">
        <PlusCircle className="h-5 w-5" />
        <span>Create your first post</span>
      </div>
    </div>
  )
}

