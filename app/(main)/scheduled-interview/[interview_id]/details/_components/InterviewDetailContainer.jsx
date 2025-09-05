// import React from 'react'

// function InterviewDetailContainer({interviewDetail}) {
//   return (
//     <div>
//         <h2>{interviewDetail?.jobPosition}</h2>
//     </div>
//   )
// }

// export default InterviewDetailContainer

import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Tag, Filter, Upload, Dot } from "lucide-react";
import moment from 'moment';

function InterviewDetailContainer({ interviewDetail }) {
  // A guard clause to prevent errors if the data isn't loaded yet
  if (!interviewDetail) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading interview details...</p>
      </div>
    );
  }

  // Assuming 'candidates' is an array within your interviewDetail object
  const candidates = interviewDetail.candidates || [];

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-8 mt-6 rounded-lg">
      <div className="max-w-4xl mx-auto">
        {/* === HEADER === */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Interview Details</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <Upload className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* === INTERVIEW INFO CARD === */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
          {/* Top Info */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{interviewDetail.jobPosition}</h2>
              {/* <p className="text-sm text-gray-500">{interviewDetail.companyName || "N/A"}</p> */}
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 font-medium">
              Active
            </Badge>
          </div>
          
          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 border-t border-b py-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500">Duration</p>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-semibold text-gray-700">{interviewDetail.duration}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500">Created On</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-semibold text-gray-700">
                  {moment(interviewDetail.created_at).format('MMM DD, YYYY')}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500">Type</p>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-semibold text-gray-700">{JSON.parse(interviewDetail?.type)[0]}</span>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-800">Job Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{interviewDetail.jobDescription}</p>
          </div>
          
          {/* Interview Questions */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800">Interview Questions</h3>
            <ul className="space-y-2">
              {interviewDetail.questionList?.map((question, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <Dot className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{question.question}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewDetailContainer;
