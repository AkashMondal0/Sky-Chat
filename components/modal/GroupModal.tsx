/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useCallback, useEffect } from 'react'
import Modal from './modal'
import useGroupController from '@/hooks/modal.controller/GroupModal'
import { Checkbox, Typography } from '@/app/Material'
import useUser from '@/hooks/states/useUser'
import { BtnInstagram } from '../Button/Button'
import { CreateConversationGroup } from '@/services/firebase/Conversation'
import { ConversationGroup, initialConversationGroup } from '@/interfaces/Conversation'
import uuid4 from 'uuid4'
import dynamic from 'next/dynamic'
import { LoadingBox } from '../loadingBox'

const UserCard = dynamic(() => import('../Sidebar/Left/components/UserCard',), {
    loading: () => <LoadingBox className='my-2' />,
    ssr: false
})


const GroupModal = () => {
    const groupModal = useGroupController()
    const currentUser = useUser()
    const [group, setGroup] = React.useState<ConversationGroup>(initialConversationGroup)

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
        setGroup(initialConversationGroup)
        groupModal.close()
    }



    const bodyContent = (
        <>
            <div className='overflow-y-scroll h-96'>
                {currentUser.FriendList?.map((item, index) => {
                    const UserData = currentUser.FriendList.find((friend) => friend.id === item.id)
                    if (UserData) {
                        return <UserCard
                            key={item.id}
                            user={UserData}
                            right={
                                <>
                                    <Checkbox
                                        onClick={() => { handleSelectUser(UserData.id) }}
                                        ripple={false}
                                        className="h-6 w-6
                                 rounded-full 
                                  duration-200"/>
                                </>
                            } />
                    }
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
            onSubmit={() => { }}
        />
    )
}

export default GroupModal