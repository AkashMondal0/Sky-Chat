/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React from "react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import routesName from "@/routes"
import { User } from "@/interfaces/User"
import { GetToken } from "@/functions/localData"
import Home from "@/components/inBox"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/services/firebase/config"
import useUser from "@/hooks/states/useUser"
import useAuthLoading from "@/hooks/authLoading"

type loading = true | false


export default function Index() {
  const [loading, setLoading] = useState<loading>(true)
  const userState = useUser()
  const router = useRouter()
  const AuthLoading = useAuthLoading()


  useEffect(() => {
    const token = GetToken()
    if (token) {
      try {
        const unSubscribe = onSnapshot(
          doc(db, "users", token),
          { includeMetadataChanges: true },
          (doc) => {
            const state: User = {
              ...doc.data() as User,
              activeUser: true
            }
            // console.log("User", state)
            console.log("start User fetch") // TODO: remove console.log
            userState.setUser(state)
            AuthLoading.stopLoading()
            setLoading(false)
          })
        return () => {
          unSubscribe()
        }
      } catch (e) {
        console.log("error", e)
      }
    } else {
      router.replace(routesName.auth)
    }
  }, [router])


  return (
    <div>
      {loading ? "Loading...." : <Home />}
    </div>
  )
}
