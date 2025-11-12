"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"
import MediaUpload from "../components/MediaUpload"

export default function CreatePostPage({ user, setCurrentPage }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    media: [],
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (formData.title.length > 100) newErrors.title = "Title must be under 100 characters"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (formData.media.length === 0) newErrors.media = "Please add at least one photo or video"
    if (formData.media.length > 5) newErrors.media = "Maximum 5 media files allowed"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        pincode: user.pincode,
        address: user.address,
        title: formData.title,
        description: formData.description,
        mediaCount: formData.media.length,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: [],
      }

      const existingPosts = JSON.parse(localStorage.getItem("posts") || "[]")
      const updatedPosts = [newPost, ...existingPosts]
      localStorage.setItem("posts", JSON.stringify(updatedPosts))

      setIsLoading(false)
      setCurrentPage("home")
    }, 500)
  }

  const setMedia = (newMedia) => {
    setFormData((prev) => ({ ...prev, media: newMedia }))
    if (errors.media) {
      setErrors((prev) => ({ ...prev, media: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-slate-50 to-primary/5 dark:from-surface-dark dark:via-slate-900 dark:to-primary/5 pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-card-dark rounded-2xl shadow-2xl border border-border dark:border-border-dark p-8 sm:p-10 animate-[fadeIn_0.5s_ease-out]">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent mb-3">
              Create a Post
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-1">
            <div>
              <label className="block text-sm font-semibold text-text-light dark:text-text-light-dark mb-2">
                Post Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                  if (errors.title) setErrors((prev) => ({ ...prev, title: "" }))
                }}
                maxLength="100"
                className="w-full px-4 py-3 border-2 border-border dark:border-border-dark bg-white dark:bg-secondary-dark text-text dark:text-text-dark rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-200 text-lg placeholder:text-text-lighter dark:placeholder:text-text-lighter-dark"
                placeholder="What's happening in your neighborhood?"
              />
              <div className="flex justify-between items-center mt-2">
                {errors.title && (
                  <p className="text-error text-sm flex items-center gap-1 font-medium">
                    <AlertCircle className="h-4 w-4" />
                    {errors.title}
                  </p>
                )}
                <span className={`text-sm ml-auto font-medium ${formData.title.length > 90 ? "text-warning" : "text-text-lighter dark:text-text-lighter-dark"}`}>
                  {formData.title.length}/100
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-light dark:text-text-light-dark mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                  if (errors.description) setErrors((prev) => ({ ...prev, description: "" }))
                }}
                rows="3"
                maxLength="100"
                className="w-full px-4 py-3 border-2 border-border dark:border-border-dark bg-white dark:bg-secondary-dark text-text dark:text-text-dark rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none resize-none transition-all duration-200 placeholder:text-text-lighter dark:placeholder:text-text-lighter-dark"
                placeholder="Provide more details..."
              />
              <div className="flex justify-between items-center mt-2">
                {errors.description && (
                  <p className="text-error text-sm flex items-center gap-1 font-medium">
                    <AlertCircle className="h-4 w-4" />
                    {errors.description}
                  </p>
                )}
                <span className={`text-sm ml-auto font-medium ${formData.description.length > 900 ? "text-warning" : "text-text-lighter dark:text-text-lighter-dark"}`}>
                  {formData.description.length}/1000
                </span>
              </div>
            </div>

            <MediaUpload media={formData.media} setMedia={setMedia} error={errors.media} />
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => setCurrentPage("home")}
                className="flex-1 px-6 py-3 border-2 border-border dark:border-border-dark text-text dark:text-text-dark rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white rounded-xl font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? "Publishing..." : "Publish Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
