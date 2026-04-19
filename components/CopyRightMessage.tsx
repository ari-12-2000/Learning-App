"use client"
import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'

const CopyRightMessage = ({className}:{className?:string}) => {

 const [mounted, setMounted] = useState(false)
 useEffect(()=> setMounted(true), [])

  return (
    <p className={cn(className)}>© {mounted ? new Date().getFullYear() : ''} Eduportal. All rights reserved.</p>
  )
}

export default CopyRightMessage