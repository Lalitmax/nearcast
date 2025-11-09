"use client"

import { UserIcon, Mail, MapPin, Home, Edit2 } from "lucide-react"

export default function ProfileHeader({ user, isEditing, onEditClick }) {
  return (
    <div className="bg-white dark:bg-card-dark rounded-2xl shadow-xl border border-border dark:border-border-dark mb-6 animate-[fadeIn_0.5s_ease-out] relative isolate">
      {/* Header Background */}
      <div className="h-40 bg-gradient-to-r from-primary via-primary-light to-accent relative overflow-hidden rounded-t-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="px-4 sm:px-8 pb-8 pt-6 relative">
        {/* Profile Avatar & Info */}
        <div className="flex flex-col sm:flex-row items-start sm:justify-between mb-6 gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center border-4 border-white dark:border-card-dark shadow-2xl flex-shrink-0 -mt-16">
              <UserIcon className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-text dark:text-text-dark mb-1 break-words">{user.name}</h1>
              <p className="text-sm text-text-light dark:text-text-light-dark flex items-center gap-2 break-all">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="break-all">{user.email}</span>
              </p>
            </div>
          </div>
          {!isEditing && (
            <button
              onClick={onEditClick}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-200"
            >
              <Edit2 className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>

        {/* User Details */}
        {!isEditing && (
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/5 to-primary-light/5 dark:from-primary/10 dark:to-primary-light/10 rounded-xl border border-primary/20">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-text-lighter dark:text-text-lighter-dark uppercase tracking-wide">
                  Zipcode
                </p>
                <p className="text-base font-bold text-text dark:text-text-dark">{user.zipcode}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-accent/5 to-primary/5 dark:from-accent/10 dark:to-primary/10 rounded-xl border border-accent/20">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Home className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xs font-semibold text-text-lighter dark:text-text-lighter-dark uppercase tracking-wide">
                  Address
                </p>
                <p className="text-base font-bold text-text dark:text-text-dark">{user.address}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

