import React from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { Clock } from 'lucide-react';
import { List } from 'lucide-react';
import { Calender } from 'lucide-react';
import { Mail } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { Plus } from 'lucide-react';
import Link from "next/link";


const InterviewLink = ({interview_id,formData}) => {
    const GetInterviewUrl = ()=>{
        const url = process.env.NEXT_PUBLIC_HOST_URL+'/'+interview_id
        return url 
    }
  return (
    <div className='flex flex-col items-center justify-center mt-5'>
      <Image src={'/check.webp'} alt='check'
      width={200}
      height={200}
      className='w-[50px] h-[50px]'/>
      <h2 className='font-bold text-lg mt-5'>Your AI Interview is Ready!</h2>
      <p className='mt-3'>Share this link with your candidates to start the Interview process</p>

      <div className='w-full p-7 mt-6 rounded-lg bg-white'>
        <div className='flex justify-between items-center'>
            <h2 className='font-bold'>Interview Link</h2>
            <h2 className='p-1 px-2 text-primary bg-blue-50 rounded-4xl'>valid For 30 Days</h2>
        </div>
            <div className='mt-3 flex gap-3 items-center'>
                <Input defaultValue={GetInterviewUrl()} disabled={true}/>
                <Button><Copy/>Copy Link</Button>
            </div>
            <hr className='my-5' />
            <div className= 'flex gap-10'>
                <h2 className='text-sx text-gray-500 flex gap-2 items-center'><Clock className='h-4 w-4'/> {formData?.duration}</h2>
                <h2 className='text-sx text-gray-500 flex gap-1 items-center'><List className='h-4 w-4'/> 10 Questions</h2>
                {/* <h2 className='text-sx text-gray-500 flex gap-2 items-center'><Calender className='h-4 w-4'/> 30min {formData?.duration}</h2> */}
            </div>
        </div>
        <div className='mt-5 bg-white p-5 rounded-lg w-full'>
            <h2 className='font-bold'>Share Via</h2>
            <div className='flex gap-5 mt-4'>
            <Button variant={'outline'} className=''><Mail/>Email</Button>
            <Button variant={'outline'} className=''><Mail/>Slack</Button>
            <Button variant={'outline'} className=''><Mail/>Whatsapp</Button>
            </div>
        </div>
        <div className='flex w-full gap-5 justify-between mt-6'>
            <Link href={'/dashboard'}>
            <Button variant={'outline'}><ArrowLeft/>Back to Dashboard</Button>
            </Link>
            <Link href={'/create-interview'}>
            <Button> <Plus/>Create New Interview</Button>
            </Link>
        </div>
    </div>
  )
}

export default InterviewLink
