import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { GrEmoji } from 'react-icons/gr';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsMic } from 'react-icons/bs';
interface InputProps {
    label: string;
    id: string;
    type?: string;
    require?: boolean;
    // register: UseFormRegister<FieldValues>;
    // errors: FieldErrors
    disabled?: boolean
}

export const MessageFooter: React.FC<InputProps> = ({
    label,
    id,
    type,
    // register,
    require,
    // errors,
    disabled
}) => {
    const [isFocus, setIsFocus] = React.useState<boolean>(false);
    return (
        <React.Fragment>
            <div className='px-4 h-16 flex items-center sticky bottom-0 bg-white'>
                <GrEmoji size={30} className='absolute left-6' />
                <div className='absolute right-8'>
                    {isFocus ? <button className='font-semibold text-blue-500 hover:text-black cursor-pointer'>Send</button> :
                        <div className='flex gap-3'>
                            <BsMic size={28}/>
                            <HiOutlinePhotograph size={28}/>
                            <AiOutlineHeart size={28}/>
                        </div>
                    }
                </div>
                <input
                    onFocus={() => { setIsFocus(true) }}
                    onBlur={() => { setIsFocus(false) }}
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    placeholder={label}
                    className='w-full p-2 px-12 border-[1px]
                border-gray-300 rounded-full outline-none focus:none
                '
                // {...register(id, { required: true })}
                />
                {/* {errors[id] && <span className='text-red-500'>This field is required</span>} */}
            </div>

        </React.Fragment>
    )
}
