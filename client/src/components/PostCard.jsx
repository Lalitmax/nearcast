"use client"

import { Heart, MessageCircle, MapPin, User } from "lucide-react"

export default function PostCard({ post, isLiked, onToggleLike }) {
  return (
    <div className="bg-white dark:bg-card-dark rounded-2xl shadow-xl border border-border dark:border-border-dark overflow-hidden hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 animate-[fadeIn_0.5s_ease-out]">
      <div className="p-6">
        {/* Post Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
            <User className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-text dark:text-text-dark mb-2 line-clamp-2">{post.title}</h3>
            <div className="flex items-center gap-2 text-sm text-text-light dark:text-text-light-dark flex-wrap">
              <span className="font-semibold text-primary">{post.userName}</span>
              <span className="text-text-lighter dark:text-text-lighter-dark">•</span>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 dark:bg-primary/20 rounded-lg">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span className="font-medium text-primary">{post.zipcode}</span>
              </div>
              <span className="text-text-lighter dark:text-text-lighter-dark">•</span>
              <span className="text-text-lighter dark:text-text-lighter-dark">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <p className="text-text dark:text-text-dark mb-4 leading-relaxed text-base">{post.description}</p>

        {/* Media Indicator */}
        {post.mediaCount > 0 && (
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-xl p-4 mb-4 border border-primary/20">
            <p className="text-sm font-medium text-text dark:text-text-dark text-center">
              📸 {post.mediaCount} {post.mediaCount === 1 ? "photo" : "photos"} or video
              {post.mediaCount > 1 ? "s" : ""}
            </p>
          </div>
        )}

        {/* Post Actions */}
        <div className="flex gap-3 pt-4 border-t-2 border-border-light dark:border-border-light-dark">
          <button
            onClick={() => onToggleLike(post.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
              isLiked
                ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40"
                : "bg-slate-100 dark:bg-slate-700/50 text-text-light dark:text-text-light-dark hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <Heart className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
            <span className="text-sm">Like</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold bg-slate-100 dark:bg-slate-700/50 text-text-light dark:text-text-light-dark hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary-light/10 transition-all duration-200">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm">Comment</span>
          </button>
        </div>
      </div>
    </div>
  )
}

