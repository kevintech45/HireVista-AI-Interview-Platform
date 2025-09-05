// import React from 'react'
// import moment from 'moment'

// function InterviewCard({interview}) {
//   return (
//     <div>
//       <div>
//         <div className='h-[40px] w-[40px] bg-primary rounded-full'></div>
//         <h2>{moment(interview?.created_at).format('DD MMM yyy')}</h2>
//       </div>
//     </div>
//   )
// }

// export default InterviewCard

"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Copy, Send, ArrowRight } from "lucide-react";
import { useParams } from 'next/navigation'
import Link from "next/link";
import { toast } from "sonner";
import moment from 'moment';


function InterviewCard({ interview,viewDetail=false }) {
  
  const {interview_id} = useParams()
  const interviewLink = `${window.location.origin}/interview/${interview.interview_id}`;

  const onCopyLink = () => {
    navigator.clipboard.writeText(interviewLink);
    toast.success("Interview link copied to clipboard!");
  };

  const onSend=()=>{
    window.location.href = 'mailto:kevinshah775@gmail.com?subject=hirevista Interview Link & body=Interview Link:' + interviewLink
  }

  return (
    // The main card container
    <div className="bg-white p-4 border rounded-lg shadow-sm flex flex-col space-y-4 hover:shadow-md transition-all">
      
      {/* Top Section: Icon and Date */}
      <div className="flex justify-between items-start">
        <Avatar>
          <AvatarFallback className="text-sm bg-gray-100 font-bold text-primary">
            {interview.jobPosition?.[0]}
          </AvatarFallback>
        </Avatar>
        <p className="text-xs font-medium text-gray-500">
          {moment(interview?.created_at).format('DD MMM YYYY')}
        </p>
      </div>

      {/* Middle Section: Job Info */}
      <div className="flex-grow">
        <h3 className="font-bold text-base text-gray-800">{interview.jobPosition}</h3>
        <p className="text-sm flex justify-between text-gray-500 mt-1">{interview.duration} 
          <span>{interview['interview-feedback']?.length} Candidates</span>
        </p>
      </div>

      {/* --- THIS IS THE KEY FIX --- */}
      {/* Bottom Section: Action Buttons */}
      {!viewDetail?<div className="flex justify-between items-center border-t pt-3">
        {/* "Copy Link" button on the left */}
        <Button 
          onClick={onCopyLink}
          variant="outline" 
          className="text-sm flex items-center gap-2 text-gray-700 cursor-pointer"
        >
          <Copy className="h-4 w-4" />
          Copy Link
        </Button>

        {/* "Send" button on the right */}
          <Button onClick={onSend} className="text-sm flex items-center gap-2 cursor-pointer">
            <Send className="h-4 w-4" />
            Send
          </Button>
      </div>
      :
      <Link href={'/scheduled-interview/'+interview?.interview_id+'/details'}>
      <Button  className='mt-5 w-full cursor-pointer' variant='outline'>View Detail <ArrowRight/></Button>
      </Link> 
      }
      {/* --- END OF FIX --- */}

    </div>
  );
}

export default InterviewCard;
