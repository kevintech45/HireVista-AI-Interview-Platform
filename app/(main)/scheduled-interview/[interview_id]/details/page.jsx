'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@/app/provider'
import { useEffect,useState } from 'react'
import { supabase } from '@/services/supabaseClient'
import InterviewDetailContainer from './_components/InterviewDetailContainer'
import CandidateList from './_components/CandidateList'

function InterviewDetail() {
    const {interview_id} = useParams()
    const {user} = useUser()
    const [interviewDetail,setInterviewDetail] = useState() 

    useEffect(()=>{
        user && GetInterviewList()
    },[user])

    const GetInterviewList=async()=>{
        const result = await supabase.from('Interviews')
            .select(`jobPosition,jobDescription,type,questionList,duration,interview_id,created_at,
              interview-feedback(userEmail,userName,feedback,created_at)`)
            .eq('userEmail',user?.email)
            .eq('interview_id',interview_id)

            setInterviewDetail(result?.data[0])
            console.log(result)
    }

  return (
    <div>
      {/* <h1 className='font-bold text-2xl'>Interview Details</h1> */}
      <InterviewDetailContainer interviewDetail={interviewDetail}/>
      <CandidateList candidates = {interviewDetail?.['interview-feedback']}/>
    </div>
  )
}

export default InterviewDetail
