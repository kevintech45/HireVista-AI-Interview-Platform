"use client"
import { Button } from '@/components/ui/button'
import { Video } from 'lucide-react'
import React, { useState,useEffect } from 'react'
import { supabase } from '@/services/supabaseClient'
import { useUser } from '@/app/provider'
import InterviewCard from './InterviewCard';

const LatestInterviewsList = () => {
    const [interviewList, setInterviewList] = useState([])
    const {user} = useUser()

    useEffect(()=>{
        user && GetInterviewList()
    },[user])

    const GetInterviewList = async()=>{
        let { data: Interviews, error } = await supabase
            .from('Interviews')
            .select('*')
            .eq('userEmail',user?.email)
            .order('id',{ascending:false})
            .limit(6)
        console.log(Interviews)
        setInterviewList(Interviews)
    }
    return (
        <div className='my-5'>
            <h2 className='font-bold text-xl mb-4'>
                Previously Created Interviews
            </h2>

            {interviewList?.length == 0 &&
                <div className='p-5 flex flex-col gap-3 items-center rounded-md bg-white mt-5'>
                    <Video className='h-10 w-10 text-primary' />
                    <h2>You don't have any interview created!</h2>
                    <Button>+ Create New Interview</Button>
                </div>}
            {interviewList && 
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {interviewList.map((interview,index)=>(
                        <InterviewCard interview={interview} key={index}/>
                    ))}
                </div>
            }
        </div>


    )
}

export default LatestInterviewsList