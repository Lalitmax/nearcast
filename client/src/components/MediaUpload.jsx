"use client"

import { Upload, X, AlertCircle, Image, Video } from "lucide-react"
import axios from "axios"

export default function MediaUpload({ media, setMedia, error }) {


  const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append("file", file)
    try {
      const response = await axios.post("http://localhost:8080/api/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/")
      const isVideo = file.type.startsWith("video/")
      const isUnder50MB = file.size < 50 * 1024 * 1024
      return (isImage || isVideo) && isUnder50MB
    })
    
    validFiles.forEach((file) => {
      uploadFile(file)
    })
  
    // setMedia([...media, ...validFiles])
  }

  const removeMedia = (index) => {
    setMedia(media.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-text-light dark:text-text-light-dark mb-3 flex items-center gap-2">
        <Image className="h-4 w-4" />
        Add Photos or Videos *
      </label>

      {media.length === 0 ? (
        <label className="group border-2 border-dashed border-border dark:border-border-dark rounded-2xl p-12 text-center cursor-pointer hover:border-primary hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary-light/5 transition-all duration-200 flex flex-col items-center justify-center">
          <div className="relative inline-block mb-1">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full group-hover:scale-110 transition-transform flex items-center justify-center">
              <Upload className="h-12 w-12 text-primary" />
            </div>
          </div>
          <input type="file" multiple accept="image/*,video/*" onChange={handleFileChange} className="hidden" />
          <p className="text-text dark:text-text-dark font-semibold">
            Drag files here or click to browse
          </p>
        </label>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {media.map((file, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-4 border-2 border-border dark:border-border-dark hover:border-primary/30 transition-all duration-200 group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex-shrink-0">
                    {file.type.startsWith("image/") ? (
                      <Image className="h-5 w-5 text-primary" />
                    ) : (
                      <Video className="h-5 w-5 text-accent" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text dark:text-text-dark truncate">{file.name}</p>
                    <p className="text-xs text-text-lighter dark:text-text-lighter-dark mt-1">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMedia(index)}
                    className="flex-shrink-0 p-1.5 text-error hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {media.length < 5 && (
            <label className="group border-2 border-dashed border-border dark:border-border-dark rounded-xl p-6 text-center cursor-pointer hover:border-primary hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary-light/5 transition-all duration-200 flex items-center justify-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              <p className="text-text dark:text-text-dark font-semibold">Add more files ({media.length}/5)</p>
              <input type="file" multiple accept="image/*,video/*" onChange={handleFileChange} className="hidden" />
            </label>
          )}
        </div>
      )}
      {error && (
        <p className="text-error text-sm mt-3 flex items-center gap-2 font-medium p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-error/30">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  )
}
