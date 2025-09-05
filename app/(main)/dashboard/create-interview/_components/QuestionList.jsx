// import React from 'react'
// import axios from 'axios'
// import { useState,useEffect } from "react";
// import { toast } from "sonner" 
// import { Loader2Icon } from 'lucide-react'

// const QuestionList = ({formData}) => {
  
//   const [loading,setLoading] = useState(false)
//   const [questionList,setQuestionList] = useState()

//   useEffect(()=>{
//       if(formData){
//         GenerateQuestionList()
//       }
//   },[formData])

//   const GenerateQuestionList = async()=>{
//     setLoading(true)
//     try{
//         const result = await axios.post('/api/ai-model',{
//           ...formData
//         }) 
//         console.log(result.data.content)
//         const Content = result.data.content
//         const FINAL_CONTENT = Content.replace('```','').replace('```','')
//         setQuestionList(JSON.parse(FINAL_CONTENT)?.interviewQuestions)
//         setLoading(false)
//       }
//       catch(e){
//         toast("Server Error, Try Again!")
//         setLoading(false)
//       }
//   }

//   return (
//     <div>
//       {loading&&
//       <div className='p-5  bg-blue-100 rounded-xl border border-primary-100 flex gap-5'>
//          <Loader2Icon className='animate-spin' />
//          <div>
//           <h2 className='font-medium'>Generating Interview Questions</h2>
//           <p className='text-primary'>Our AI is crafting personalized questions based on your job position </p>
//          </div>
//       </div>
//       }
//       {questionList?.length>0&&
//          <div className='p-5 border border-gray-300 rounded-xl'>
//           {questionList.map((item,index)=>(
//             <div key={index} className='p-3 border border-gray-200 rounded-xl'>
//               <h2 className='font-medium'>{item.question}</h2>
//               <h2>Type: {item?.type}</h2>
//             </div>
//           ))}
//          </div>
//         }
//     </div>
//   )
// }

// export default QuestionList

"use client"
import React from 'react';
import axios from 'axios';
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Loader2Icon } from 'lucide-react';
import { QuestionListContainer } from './QuestionListContainer'; 
import { Button } from '@/components/ui/button'; // Assuming you have this for a "Start Interview" button
import { supabase } from '@/services/supabaseClient'
import {useUser} from '@/app/provider'
import { v4 as uuidv4 } from 'uuid';

const QuestionList = ({ formData,onCreateLink }) => {
    const [loading, setLoading] = useState(true);
    const [questionList, setQuestionList] = useState(null);
    const {user} = useUser()
    const [saveLoading, setsaveLoading] = useState(false)
    const hasFetched = useRef(false);

    useEffect(() => {
        if (formData && !hasFetched.current) {
            GenerateQuestionList();
            hasFetched.current = true;
        }
    }, [formData]);

    // const GenerateQuestionList = async () => {
    //     setLoading(true);
    //     setQuestionList(null);

    //     try {
    //         const result = await axios.post('/api/ai-model', {
    //             ...formData
    //         });

    //         if (!result.data || !result.data.content) {
    //             toast.error("Received an invalid response from the server.");
    //             return;
    //         }

    //         const content = result.data.content;
    //         console.log("Raw content from AI:", content);

    //         // --- THIS IS THE ROBUST FIX ---
    //         // Find the start of the array `[` and the end of the array `]`.
    //         const startIndex = content.indexOf('[');
    //         const endIndex = content.lastIndexOf(']');

    //         if (startIndex === -1 || endIndex === -1) {
    //             toast.error("Could not find a valid list of questions in the AI's response.");
    //             return;
    //         }

    //         // Extract the string that contains ONLY the array.
    //         let jsonString = content.substring(startIndex, endIndex + 1);
            
    //         console.log("1. Extracted Array String:", jsonString);

    //          // --- THIS IS THE NEW, TWO-STEP FIX ---

    //     // Step A: Fix unquoted property names (e.g., { question: ... } -> { "question": ... })
    //     // This regex finds any word followed by a colon and wraps the word in quotes.
    //     jsonString = jsonString.replace(/(\w+):/g, '"$1":');
    //     console.log("2. After Fixing Keys:", jsonString);

    //     // Step B: Fix single quotes used for values (e.g., { type: 'Technical' } -> { type: "Technical" })
    //     jsonString = jsonString.replace(/'/g, '"');
    //     console.log("3. After Fixing Values (Final String to Parse):", jsonString);

    //     jsonString = jsonString.replace(/,(\s*[\}\]])/g, '$1');
    //         // Parse the extracted array string.
    //         const parsedJson = JSON.parse(jsonString);

    //         // Final check to ensure it's an array
    //         if (Array.isArray(parsedJson)) {
    //             setQuestionList(parsedJson);
    //         } else {
    //             toast.error("The AI's response format was recognized but invalid.");
    //         }
    //         // --- END OF FIX ---

    //     } catch (error) {
    //         // This catch block will now only handle true API errors or critical parsing failures.
    //         console.error("Error in GenerateQuestionList:", error);
    //         toast.error("An error occurred. Please try generating questions again.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const GenerateQuestionList = async () => {
        setLoading(true);
        setQuestionList(null);

        try {
            const result = await axios.post('/api/ai-model', {
                ...formData
            });

            if (!result.data || !result.data.content) {
                toast.error("Received an invalid response from the server.");
                return;
            }

            const content = result.data.content;
            console.log("Raw content from AI:", content);

            const startIndex = content.indexOf('[');
            const endIndex = content.lastIndexOf(']');

            if (startIndex === -1 || endIndex === -1) {
                toast.error("Could not find a valid list of questions in the AI's response.");
                return;
            }

            let jsonString = content.substring(startIndex, endIndex + 1);
            console.log("1. Extracted Array String:", jsonString);

            // --- THE DEFINITIVE 3-STEP CLEANING PROCESS ---

            // Step 1: Fix unquoted property names (e.g., { question: ... } -> { "question": ... })
            jsonString = jsonString.replace(/(\w+):/g, '"$1":');
            console.log("2. After Fixing Keys:", jsonString);
            
            // Step 2 (THE NEW FIX): Replace single-quoted values, but ignore apostrophes.
            // This regex looks for a single quote, followed by characters that are NOT a single quote,
            // and then a closing single quote. It replaces only the wrapping quotes.
            jsonString = jsonString.replace(/'([^']*)'/g, '"$1"');
            console.log("3. After Fixing Values:", jsonString);
            
            // Step 3: Remove trailing commas from objects and arrays
            jsonString = jsonString.replace(/,(\s*[\}\]])/g, '$1');
            console.log("4. Final String to be Parsed:", jsonString);

            // --- END OF FIX ---

            try {
                const parsedJson = JSON.parse(jsonString);
                if (Array.isArray(parsedJson)) {
                    setQuestionList(parsedJson);
                } else {
                    toast.error("The AI's response format was recognized but invalid.");
                }
            } catch (parseError) {
                console.error("JSON Parse Error:", parseError, " on string: ", jsonString);
                toast.error("Failed to parse the response from the AI. The format was incorrect.");
            }

        } catch (error) {
            console.error("Error in GenerateQuestionList:", error);
            toast.error("An error occurred. Please try generating questions again.");
        } finally {
            setLoading(false);
        }
    };

    const onFinish = async() =>{
        setsaveLoading(true)
        const interview_id = uuidv4();
        const { data, error } = await supabase
            .from('Interviews')
            .insert([
            { ...formData, questionList:questionList,userEmail:user.email,interview_id:interview_id },
        ])
    .select()    
    // update user credits
    const userCreditsUpdate = await supabase
        .from('Users')
        .update({ credits: Number(user?.credits)-1})
        .eq('email',user?.email)
        .select()
    console.log(userCreditsUpdate)

    setsaveLoading(false)
    //console.log(data)

    onCreateLink(interview_id)

    }

    return (
        <div className='my-5'>
            {loading && (
                <div className='p-5 bg-blue-100 rounded-xl border flex gap-5 items-center'>
                    <Loader2Icon className='animate-spin h-6 w-6' />
                    <div>
                        <h2 className='font-medium'>Generating Interview Questions</h2>
                        <p className='text-primary text-sm'>Our AI is crafting personalized questions based on your job details...</p>
                    </div>
                </div>
            )}
            
            {!loading && questionList?.length > 0 && (
              <div>
                <QuestionListContainer questionList={questionList}/>
              </div>
            )}
            <div className='flex justify-end mt-5'>
                <Button onClick={()=>onFinish()} disabled={saveLoading}> {saveLoading&&<Loader2Icon className='animate-spin'/>}Create Interview Link & Finish</Button>
            </div>
        </div>
    );
};

export default QuestionList;