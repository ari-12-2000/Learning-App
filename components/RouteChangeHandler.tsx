"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import usePrevious from "@/hooks/usePrevious"
import { clearFilterCategory } from "@/features/course/courseSlice"
import { RootState } from "@/store"
import { useSelector } from "react-redux"
import { useAppDispatch } from "@/store/hooks"

export default function RouteChangeHandler() {
  const pathname = usePathname()
  const prevPathname = usePrevious(pathname)
  const { filterCategory } = useSelector((state: RootState) => state.course)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!prevPathname)
      return

    if (prevPathname?.startsWith("/courses/search") && filterCategory) {
      dispatch(clearFilterCategory());
    }

  }, [pathname, prevPathname])

  return null
}