"use client"
import React from 'react'
import Image from 'next/Image'
import {useEffect,useState,useContext} from 'react'
import { toast } from "sonner";
import { Clock } from 'lucide-react';
import { Info } from 'lucide-react';
import { Video } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {useParams} from 'next/navigation';
import { supabase } from '@/services/supabaseClient'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { useRouter } from 'next/navigation'
import { Loader2Icon } from 'lucide-react';

function Interview() {

  const {interview_id} = useParams();
  console.log(interview_id)
  const [interviewData,setInterviewData] = useState()
  const [userEmail,setUserEmail] = useState()
  const [userName,setUserName] = useState()
  const [loading,setLoading] = useState(false)
  const {interviewInfo,setInterviewInfo} = useContext(InterviewDataContext);
  const router = useRouter()


  useEffect(()=>{
    interview_id&&GetInterviewDetails()
  },[interview_id])

  const GetInterviewDetails = async()=>{
    setLoading(true)
    try{
    let { data: Interviews, error } = await supabase
    .from('Interviews')
    .select("jobPosition,jobDescription,duration,type")
    .eq('interview_id',interview_id)

    setInterviewData(Interviews[0])
    setLoading(false)
    if(Interviews?.length==0){
      toast("Incorrect Interview Link!")
    }
    }
    catch(e){
      setLoading(false)
      toast("Incorrect Interview Link!")
    }
    
  }

  const onJoinInterview=async()=>{
    setLoading(true)
    let { data: Interviews, error } = await supabase
    .from('Interviews')
    .select("*")
    .eq('interview_id',interview_id)
    console.log(Interviews[0]);
    setInterviewInfo({
      userName:userName,
      userEmail: userEmail,
      interviewData:Interviews[0]
    })
    router.push('/interview/'+interview_id+'/start')
    setLoading(false)
  }

  return (
        <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-10'>
            <div className='flex flex-col items-center justify-center border rounded-lg bg-white p-7 lg:px-33 xl:px-52 mb-20'>
                <Image src={'/logo.png'} alt='logo' width={200} height={100}
                className='w-[140px]'/>

                <h2 className='mt-3'>AI-Powered Interview Platform</h2>

                <Image src={'/interview.jpeg'} alt='logo' height={500} width={500}
                className='w-[300px] my-3'/>

                <h2 className='font-bold text-xl'>{interviewData?.jobPosition}</h2>
                <h2 className='flex gap-2 items-center text-gray-500 mt-3'><Clock className= 'h-4 w-4' />{interviewData?.duration} </h2>

                <div className='w-full'>
                  <h2 className='text-md mt-2'>Enter your Name</h2>
                  <Input placeholder='e.g. Siri' onChange={(event)=>setUserName(event.target.value)}/>
                </div>

                <div className='w-full'>
                  <h2 className='text-md mt-2'>Enter your Email</h2>
                  <Input placeholder='e.g. kevin@gmail.com' onChange={(event)=>setUserEmail(event.target.value)}/>
                </div>

              <div className='p-3 bg-blue-100 flex gap-4 rounded-lg mt-3'>
                <Info/>
                <div>
                    <h2 className='font-bold'>
                      Before You Begin
                    </h2>
                    <ul>
                      <li className='text-sm text-primary'>-Test your Camera and Microphone</li>
                      <li className='text-sm text-primary'>-Ensure you have a stable internet connection</li>
                      <li className='text-sm text-primary'>-Find a Quite place for Interview</li>
                    </ul>
                </div>
              </div>
              <Button className='mt-5 w-full font-bold'
              disabled={loading||!userName}
              onClick={()=>onJoinInterview()}> 
              <Video/>{loading&&<Loader2Icon/>}Join Interview</Button>
            </div>
        </div>
  )
}

export default Interview
