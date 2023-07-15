/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import routesName from "@/routes"
import UserContext from "@/context/UserContext"
import { UserContextIn } from "@/interfaces/User"
import { GetToken } from "@/functions/localData"
import { GetUserData } from "@/services/firebase/UserDoc"
import SideBar from "@/components/Sidebar"
import Home from "@/components/Home"
import React from "react"
type loading = true | false
export default function Index() {
  const [loading, setLoading] = useState<loading>(true)
  const User = useContext<UserContextIn>(UserContext)
  const router = useRouter()

  const get = async (token: string) => {
    const userData = await GetUserData(token)
    userData ? User.dispatch({ type: "SET_USER", payload: userData }) : router.replace(routesName.auth)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    const token = GetToken()
    !token ? router.replace(routesName.auth) : get(token)
  }, [router])

  return (
    <React.Fragment>
      {loading ? "Loading...." :
        <Home />
      }
    </React.Fragment>
  )
}
