"use client"

import { FileText, Calendar, Image } from "lucide-react"

export default function UserPostsList({ posts }) {
  return (
    <div className="bg-white dark:bg-card-dark rounded-2xl shadow-xl border border-border dark:border-border-dark p-8 animate-[fadeIn_0.5s_ease-out]">
      <h2 className="text-2xl font-bold text-text dark:text-text-dark mb-6 flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-primary to-primary-light rounded-lg">
          <FileText className="h-6 w-6 text-white" />
        </div>
        My Posts
        <span className="ml-auto text-base font-semibold px-4 py-1.5 bg-gradient-to-r from-primary/10 to-primary-light/10 text-primary rounded-full">
          {posts.length}
        </span>
      </h2>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-20 animate-pulse"></div>
            <div className="relative p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full">
              <FileText className="h-16 w-16 text-primary" />
            </div>
          </div>
          <p className="text-lg font-semibold text-text-light dark:text-text-light-dark">
            You haven't created any posts yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border-2 border-border dark:border-border-dark rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-200 bg-gradient-to-r from-transparent to-primary/5 dark:to-primary/10"
            >
              <h3 className="font-bold text-lg text-text dark:text-text-dark mb-2">{post.title}</h3>
              <p className="text-text-light dark:text-text-light-dark text-sm mb-4 line-clamp-2">
                {post.description}
              </p>
              <div className="flex justify-between items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-text-lighter dark:text-text-lighter-dark">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                {post.mediaCount > 0 && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                    <Image className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-text dark:text-text-dark">
                      {post.mediaCount} attachment{post.mediaCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

