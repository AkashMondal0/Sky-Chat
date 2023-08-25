'use client';
import LeftSideBar from "@/components/Sidebar/Left";
import RightSideBar from "@/components/Sidebar/Right";
import SideContainer from "@/components/Sidebar/SideContainer";
import { GetToken } from "@/functions/localData";
import useUser from "@/hooks/states/useUser";
import useRightSideBar from "@/hooks/useRightSideBar";
import { User } from "@/interfaces/User";
import routesName from "@/routes";
import { db } from "@/services/firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const currentUser = useUser()
    const router = useRouter()
    const rightSideBar = useRightSideBar()

    useEffect(() => {
        const token = GetToken()
        if (token) {
            try {
                const unSubscribe = onSnapshot(
                    doc(db, "users", token),
                    { includeMetadataChanges: true },
                    (doc) => {
                        currentUser.setUser(doc.data() as User)
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


    if (!currentUser.state?.id) {
        return <Loading/>
    }
    return (
        <div className="flex md:w-full max-h-[100vh]">
            <SideContainer>
                <LeftSideBar />
            </SideContainer>
            {children}
            {rightSideBar.sideBar && <RightSideBar />}
        </div>
    )
}
