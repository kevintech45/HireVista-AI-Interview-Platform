"use client"
import { useUser } from '@/app/provider'
import React from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const WelcomeContainer = () => {
    const { user } = useUser()
    return (
        <div className='bg-white p-3 rounded-md flex justify-between items-center shadow'>
            <div>
                <h2 className='text-lg font-bold'> Welcome back , {user?.name}</h2>
                <h2 className='text-grey-500'>AI-Driven Interviews, Hassel-Free-Hiring</h2>
            </div>
            {/* image all ready add but not showing bcoz its white. change the picture in google settings of your gmail */}
            {user && <Image className='rounded-full' src={user?.picture} alt="userAvatar" width={50} height={50} />}
        </div>

    )
}

export default WelcomeContainer