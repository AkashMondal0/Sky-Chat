/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import routesName from "@/routes"
import UserContext from "@/context/UserContext"
import { UserContextIn } from "@/interfaces/User"
import HomePage from "./home"
import { GetToken } from "@/functions/localData"
import { GetUserData } from "@/services/firebase/UserDoc"

export default function Index() {
  const User = useContext<UserContextIn>(UserContext)
  const router = useRouter()
  const get = async (token: string) => {
    const userData = await GetUserData(token)
    userData ? User.dispatch({ type: "SET_USER", payload: userData }) : router.replace(routesName.auth)
  }
  useEffect(() => {
    const token = GetToken()
    !token ? router.replace(routesName.auth) : get(token)
  }, [router])

  return (
    <div>
      Loading....
      <HomePage />
    </div>
  )
}
