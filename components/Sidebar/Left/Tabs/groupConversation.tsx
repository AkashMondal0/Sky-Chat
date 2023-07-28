import { FC } from 'react';
import { steps } from '..';
import { BiArrowBack } from 'react-icons/bi';
import { Typography } from '@/app/Material';
import useUser from '@/hooks/states/useUser';

interface GroupConversationProps {
    onTabChange: (value: steps) => void
}
const GroupConversation: FC<GroupConversationProps> = ({
    onTabChange
}) => {
    const currentUser = useUser()
    const handle = () => {}

    return (
        <>
            <div className='flex items-center gap-2 m-4'>
                <BiArrowBack className='cursor-pointer' size={30}
                    onClick={() => { onTabChange("myUserList") }}
                />
                <Typography variant="h4">Group</Typography>
            </div>
            <div>
                {currentUser.FriendList?.map((item, index) => {
                    return <div key={item.id}>
                        {item.name}
                    </div>
                })}
            </div>
        </>
    );
};

export default GroupConversation;