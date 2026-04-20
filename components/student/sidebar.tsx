"use client"
import { useState } from "react"
import { Home, LayoutDashboard, BookOpen, LogOut, X, LogIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { SidebarItem } from "@/components/sidebar-item"
import { GlobalVariables } from "@/globalVariables"
import { ProfilePhotoUpload } from "@/components/profile-photo-upload"
import { toast } from "../ui/use-toast"
import FallbackAvatar from "@/components/FallbackAvatar"
import { useSession } from "next-auth/react"

interface SidebarProps {
  isOpen: boolean
  toggleSidebar?: () => void
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const { user, logout, setUser, isLoading } = useAuth()
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const router = useRouter()
  // Add state for client-side rendering
  const [isPhotoUploadOpen, setIsPhotoUploadOpen] = useState(false)
  const profilePhoto = user?.profile_image ?? ""

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const uploadToDB = async (orgPhoto: File): Promise<string> => {
    try {
      const form = new window.FormData();
      form.append("file", orgPhoto);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/student/${user?.id}/photo`,
        {
          method: "PUT",
          body: form, // fetch নিজেই multipart/form-data boundary handle করে
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }


      return data.data.profile_image;
    } catch (err: any) {
      console.error("Upload failed:", err);
      toast({
        title: "Failed",
        description: "Couldn't update photo.",
        variant: "destructive",
      });
      return user?.profile_image ?? "";
    }
  }

  const handlePhotoUpdate = async (photo: string, orgPhoto: File | null) => {
    if (photo) {
      const updatedUser = { ...user!, profile_image: photo }
      setUser(updatedUser)
    }
    let url: string = ''
    if (orgPhoto)
      url = await uploadToDB(orgPhoto)
    const updatedUser = { ...user!, profile_image: url }
    setUser(updatedUser)
  }

  const handleProfilePhotoClick = () => {
    if (user) {
      setIsPhotoUploadOpen(true)
    } else {
      router.push("/login")
    }
  }
  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-slate-50 to-gray-50 border-r border-gray-200/60 shadow-lg transform transition-transform duration-300 ease-in-out -translate-x-full xl:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          pathname === "/" || pathname.startsWith("/student") ? "fixed" : "hidden",
        )}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-gray-200/60 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Eduportal</span>
          </div>
          {toggleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden hover:bg-gray-200/40"
              onClick={toggleSidebar}
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="pt-6 pb-4 overflow-y-auto flex flex-col">
          <div className="px-4 mb-8 flex justify-center">
            {isLoading || status === 'loading' ? (<div className="inline-flex flex-col items-center animate-pulse p-4 rounded-2xl bg-gray-100 w-full">
              {/* Profile photo skeleton */}
              <div className="h-16 w-16 rounded-full bg-gray-300 mb-3" />

              {/* Name skeleton */}
              <div className="h-4 w-24 bg-gray-300 rounded mb-2" />

              {/* Role skeleton */}
              <div className="h-3 w-20 bg-gray-300 rounded" />
            </div>) :
              (<div className="inline-flex flex-col items-center w-full">
                <button
                  onClick={handleProfilePhotoClick}
                  className="relative group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full transition-transform hover:scale-105"
                >
                  {profilePhoto ? (
                    <div className="h-16 w-16 rounded-full overflow-hidden border-3 border-blue-500/40 group-hover:border-blue-500 transition-all shadow-md">
                      <img
                        src={profilePhoto || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-16 w-16 rounded-full overflow-hidden border-3 border-blue-500/40 group-hover:border-blue-500 transition-all shadow-md bg-gray-100">
                      <FallbackAvatar />
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">Edit</span>
                  </div>
                </button>
                <div className="mt-3 text-center">
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.first_name} {user?.last_name}
                  </p>
                  <p className={`mt-1 ${user ? "text-xs" : "text-sm"} text-gray-500 font-medium capitalize`}>
                    {user ? user.role : GlobalVariables.non_admin.role1}
                  </p>
                </div>
              </div>)}
          </div>
          <nav className="flex-1 mt-4 px-3 space-y-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 py-3">Navigation</div>
            <SidebarItem href="/" icon={Home} text="Home" active={isActive("/")} />
            <SidebarItem
              href="/student/dashboard"
              icon={LayoutDashboard}
              text="Dashboard"
              active={isActive("/student/dashboard")}
            />
            <SidebarItem
              href="/student/courses"
              icon={BookOpen}
              text="My Courses"
              active={isActive("/student/courses")}
            />
          </nav>

          <div className="px-3 py-4 border-t border-gray-200/60">
            {session?.user ? (
              <Button
                className="w-full justify-start bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-lg font-medium"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Button>
            ) : status === "loading" ? (
              <div
                className="w-full rounded-lg h-10 mr-3 bg-gray-300"
              />
            ) : (
              <Button
                className="w-full justify-start bg-gray-600 text-white hover:bg-gray-700 rounded-lg font-medium"
                onClick={() => router.push("/login")}
              >
                <LogIn className="mr-3 h-5 w-5" />
                Login
              </Button>
            )}
          </div>
        </div>
      </aside>

      <ProfilePhotoUpload
        isOpen={isPhotoUploadOpen}
        onClose={() => setIsPhotoUploadOpen(false)}
        onPhotoUpdate={handlePhotoUpdate}
      />
    </>
  )
}
