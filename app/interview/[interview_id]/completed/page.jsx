"use client";

import { Check, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Assuming you use shadcn/ui button

export default function InterviewCompletedPage() {
  return (
    // Main container to center the content vertically and provide padding
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      
      {/* Centered content box */}
      <div className="w-full max-w-2xl text-center">

        {/* Green Checkmark Circle */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
          <Check className="h-10 w-10 text-white" strokeWidth={3} />
        </div>

        {/* Main Heading */}
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
          Interview Complete!
        </h1>

        {/* Subheading */}
        <p className="mt-3 text-lg text-gray-500">
          Thank you for participating in the AI-driven interview with HireVista
        </p>

        {/* Illustration Card */}
        <div className="mt-8 overflow-hidden rounded-xl shadow-lg">
          {/* Replace src with your actual image path, e.g., '/interview-complete.png' */}
          <Image 
            src={"/interview-completed.jpg"} // LEAVE BLANK OR ADD YOUR IMAGE PATH
            alt="Two people at an interview desk"
            width={600}
            height={300}
            className="w-full h-auto object-cover bg-gray-200" // bg-gray-200 provides a placeholder color
          />
        </div>

        {/* What's Next Section */}
        <div className="mt-10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <Send className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            What's Next?
          </h2>
          <p className="mt-2 text-md text-gray-600">
            The recruiter will review your interview responses and will contact you soon regarding the next steps.
          </p>
        </div>

        {/* Optional: Add a button to go back to the dashboard or homepage */}
        <div className="mt-8">
            <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
            </Link>
        </div>

      </div>
    </div>
  );
}