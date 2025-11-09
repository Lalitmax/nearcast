import { useState, useEffect } from "react"
import ProfileHeader from "../components/ProfileHeader"
import ProfileEditForm from "../components/ProfileEditForm"
import UserPostsList from "../components/UserPostsList"

export default function ProfilePage({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false)
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts") || "[]")
    const myPosts = posts.filter((post) => post.userId === user.id)
    setUserPosts(myPosts)
  }, [user.id])

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-slate-50 to-accent/5 dark:from-surface-dark dark:via-slate-900 dark:to-accent/5 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {isEditing ? (
          <ProfileEditForm user={user} setUser={setUser} onCancel={() => setIsEditing(false)} />
        ) : (
          <ProfileHeader user={user} isEditing={isEditing} onEditClick={() => setIsEditing(true)} />
        )}

        <UserPostsList posts={userPosts} />
      </div>
    </div>
  )
}
