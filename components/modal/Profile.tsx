/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useCallback, useEffect } from 'react'
import Modal from './modal'
import useGroupController from '@/hooks/modal.controller/GroupModal'
import { Checkbox, Typography } from '@/app/Material'
import useUser from '@/hooks/states/useUser'
import UserCard from '../Sidebar/Left/components/UserCard'
import { BtnInstagram } from '../Button/Button'
import { CreateConversationGroup } from '@/services/firebase/Conversation'
import { ConversationGroup, GroupDetails } from '@/interfaces/Conversation'
import uuid4 from 'uuid4'


const ProfileModal = () => {
    const groupModal = useGroupController()
    const currentUser = useUser()
    const [group, setGroup] = React.useState<GroupDetails>({
        lastMessage: `${currentUser.state?.id}added you`,
        CreatedUser: currentUser.state?.id,
        groupName: "Test Group",
        groupImage: "",
        groupMembers: []
    })

    const handleSelectUser = useCallback((id: string) => {
        if (group.groupMembers.find((item) => item.id === id)) {
            const newGroup = group.groupMembers.filter((item) => item.id !== id)
            setGroup({
                ...group,
                groupMembers: newGroup
            })
        } else {
            setGroup({
                ...group,
                groupMembers: [...group.groupMembers, {
                    userId: id,
                    id: uuid4(),
                    permission: "member"
                }]
            })
        }
    }, [group])

    const handleCreateGroup = async () => {
        const newGroup: ConversationGroup = {
            admin: [currentUser.state.id],
            groupName: group.groupName,
            groupImage: group.groupImage,
            CreatedUser: currentUser.state.id,
            groupMembers: [...group.groupMembers, {
                userId: currentUser.state.id,
                id: uuid4(),
                permission: "Admin"
            }],
        }
        CreateConversationGroup(newGroup).catch((err) => {
            console.log(err)
        })
        setGroup({
            lastMessage: `${currentUser.state?.id}added you`,
            CreatedUser: currentUser.state?.id,
            groupName: "Test Group",
            groupImage: "",
            groupMembers: []
        })
        groupModal.close()
    }



    const bodyContent = (
        <>
            <div className='overflow-y-scroll h-96'>
                {currentUser.FriendList?.map((item, index) => {
                    return <div key={item.id}>
                        <UserCard item={item} UserId={item.id}
                            right={<>
                                <Checkbox
                                    onClick={() => { handleSelectUser(item.id) }}
                                    ripple={false}
                                    className="h-6 w-6
                                     rounded-full 
                                      duration-200"
                                />
                            </>} />
                    </div>
                })}
            </div>
        </>
    )


    return (
        <Modal
            title="Create Group"
            body={bodyContent}
            isOpen={groupModal.isOpen}
            onClose={groupModal.close}
            footer={<div onClick={handleCreateGroup}>
                <BtnInstagram fullWidth label={"Add Group"} css='h-12' />
            </div>
            }
            onSubmit={() => {
                
            }}
        />
    )
}

export default ProfileModal