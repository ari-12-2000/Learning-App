"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import usePrevious from "@/hooks/usePrevious"
import { useCourses } from "@/contexts/course-context"

export default function RouteChangeHandler() {
  const pathname = usePathname()
  const prevPathname = usePrevious(pathname)
  const { filterCategory, loading, setFilterCategory, setLoading } = useCourses()

  useEffect(() => {
    if (!prevPathname) return

       if (prevPathname?.startsWith("/courses/search") && filterCategory) {
      setFilterCategory("");
    }
    if (prevPathname?.startsWith("/payment/") && loading) {
      setLoading(false);
    }
  }, [pathname, prevPathname])

  return null
}