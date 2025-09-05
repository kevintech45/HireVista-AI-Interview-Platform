// import React from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import moment from 'moment'
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";

// function CandidateList({candidates}) {
//   return (
//         <div className="mt-8">
//           <h2 className="text-xl font-bold text-gray-800 mb-4">Candidates ({candidates?.length})</h2>
//           <div className="bg-white rounded-lg border border-gray-200 shadow-sm divide-y">
//             {candidates?.map((candidate,index) => (
//               <div key={index} className="flex justify-between items-center p-4">
//                 <div className="flex items-center gap-3">
//                     <h2>{candidate?.userEmail[0]}</h2>  {/* change it with name */}
//                 <div>
//                     <h2>{candidate.userEmail}</h2> {/* change it with name */}
//                     <h2>Completed on: {moment(candidate?.created_at).format("MMM DD, yyyy")}</h2>
//                  </div>
//                   <div>
//                     <p className="font-semibold text-sm text-gray-800">{candidate.name}</p>
//                     <p className="text-xs text-gray-500">
//                       {candidate.status === 'Completed' ? `Completed on ${moment(candidate.date).format('MMM DD, YYYY')}` : `Pending - Scheduled for ${moment(candidate.date).format('MMM DD, YYYY')}`}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   {candidate.status === 'Completed' ? (
//                     <p className="text-sm font-bold text-primary">{candidate.score}/10</p>
//                   ) : (
//                     <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200 font-medium">{candidate.status}</Badge>
//                   )}
//                   <Button variant="ghost" size="sm" className="text-primary hover:text-primary font-semibold">View Report</Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//   )
// }

// export default CandidateList


import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import moment from 'moment';
import CandidateFeedbackDialog from './CandidateFeedbackDialog'


function CandidateList({ candidates }) { 
  // const ratings = candidates[0]?.feedback?.feedback?.rating;
  //   const overallScore = ratings 
  //   ? ((ratings.technicalSkills + ratings.communication + ratings.problemSolving + ratings.experience) / 4).toFixed(1) 
  //   : 'N/A';
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Candidates ({candidates?.length || 0})</h2>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm divide-y">
        
        {candidates?.map((candidate, index) => (
            
            <div key={candidate.interview_id || index} className="flex justify-between items-center p-4">
              
              <div className="flex items-center gap-3">
                
                <h2 className="bg-primary p-1.5 px-3.5 text-white font-semibold rounded-full">{candidate.userEmail[0]}</h2>
                
                <div>
                  <p className="font-semibold text-sm text-gray-800">
                    {candidate.userName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Completed on : {moment(candidate.created_at).format("MMM DD, YYYY")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">   
                {/* <p className="text-sm font-semibold text-primary">{overallScore}/10</p> */}
                <CandidateFeedbackDialog candidate={candidate}/>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}

export default CandidateList;