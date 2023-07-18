/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React from "react"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import routesName from "@/routes"
import UserContext from "@/context/User/UserContext"
import { User, UserContextIn } from "@/interfaces/User"
import { GetToken } from "@/functions/localData"
import Home from "@/components/Home"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/services/firebase/config"
import { setData } from "./home"

type loading = true | false


export default function Index() {
  const [loading, setLoading] = useState<loading>(true)
  const User = useContext<UserContextIn>(UserContext)
  const router = useRouter()

  useEffect(() => {
    const token = GetToken()
    if (token) {
      console.log("start")
      try {
        const unSubscribe = onSnapshot(
          doc(db, "users", token),
          { includeMetadataChanges: true },
          (doc) => {
            setData(doc.data() as User)
              .then((data) => {
                const state: User = {
                  ...doc.data() as User,
                  localDataFriends: data
                }
                User.dispatch({ type: "SET_USER", payload: state })
              })
              .catch((e) => { console.log(e) })
              .finally(() => {
                setLoading(false)
              })
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
