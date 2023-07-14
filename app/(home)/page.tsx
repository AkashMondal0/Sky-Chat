/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import routesName from "@/routes"
import UserContext from "@/context/UserContext"
import { UserContextIn } from "@/interfaces/User"
import HomePage from "./home"

export default function Index() {
  const User = useContext<UserContextIn>(UserContext)
  const router = useRouter()
  useEffect(() => {
    if (!User.state.emailVerified) {
      router.replace(routesName.auth)
    }
  }, [router])

  return (
    <div>
      Loading....
      <HomePage />
    </div>
  )
}
