import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

function CandidateFeedbackDialog({candidate}) {
    const feedback = candidate?.feedback?.feedback
    const ratings = feedback?.rating;
    const overallScore = ratings 
    ? ((ratings.technicalSkills + ratings.communication + ratings.problemSolving + ratings.experience) / 4).toFixed(1) 
    : 'N/A';
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-primary hover:text-primary font-semibold cursor-pointer">
                View Report
            </Button></DialogTrigger>
        <DialogContent>
    <DialogHeader>
      <DialogTitle>Feedback</DialogTitle>
      <DialogDescription asChild>
        <div>
            <div className="flex justify-between items-center p-4">
              
              <div className="flex items-center gap-3">
                
                <h2 className="bg-primary p-1.5 px-3.5 text-white font-semibold rounded-full">{candidate.userEmail[0]}</h2>
                
                <div>
                  <p className="font-semibold text-sm text-gray-800">
                    {candidate.userName} 
                  </p>
                  <p className="text-xs text-gray-500">
                    {candidate?.userEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">   
                <p className="text-2xl font-semibold text-primary">{overallScore}/10</p>
              </div>
            </div>
            <div className='mt-5'>
                <h2 className='font-semibold text-black'>Skills Assesment</h2>
                <div className='mt-3 grid grid-cols-2 gap-10'>
                     <div>
                        <h2 className='flex justify-between'>Technical Skills <span>{feedback?.rating?.technicalSkills}/10</span></h2>
                        <Progress value={feedback?.rating?.technicalSkills*10} className='mt-1'/>
                     </div>
                     <div>
                        <h2 className='flex justify-between'>Communication<span>{feedback?.rating?.communication}/10</span></h2>
                        <Progress value={feedback?.rating?.communication*10} className='mt-1'/>
                     </div>
                     <div>
                        <h2 className='flex justify-between'>Problem Solving<span>{feedback?.rating?.problemSolving}/10</span></h2>
                        <Progress value={feedback?.rating?.problemSolving*10} className='mt-1'/>
                     </div>
                     <div>
                        <h2 className='flex justify-between'>Experience<span>{feedback?.rating?.experience}/10</span></h2>
                        <Progress value={feedback?.rating?.experience*10} className='mt-1'/>
                     </div>
                </div>
            </div>
            <div className='mt-5'>
                <h2 className='font-semibold text-black'>Performance Summary</h2>
                <div className='mt-2'>
                    <p className="text-sm bg-blue-100 rounded-lg p-4 leading-relaxed">
                        {feedback?.summery}
                    </p>
                </div>
            </div>
            <div className={`p-5 mt-4 rounded-lg flex items-center justify-between ${feedback?.Recommendation=='NO'?'bg-red-100':'bg-green-100'}`}>
                <div>
                <h2 className={`${feedback?.Recommendation=='NO'?'text-red-700':'text-green-700'}`}>Recommendation msg:</h2>
                <p className={`${feedback?.Recommendation=='NO'?'text-red-500':'text-green-500'}`}>{feedback?.RecommendationMsg}</p>
                </div>
                <Button size='sm' className={`${feedback?.Recommendation=='NO'?'bg-red-700':'bg-green-700'}`}>Send Msg</Button>
            </div>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default CandidateFeedbackDialog

