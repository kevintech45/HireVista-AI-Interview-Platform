import React from 'react'
import { Button } from '@/components/ui/button';


export const QuestionListContainer = ({questionList}) => {

  return (
    
      <div className='p-5 border bg-white rounded-xl space-y-5'>
                    <div>
                        <h2 className='text-xl font-bold'>Your Interview Questions</h2>
                        <p className='text-sm text-gray-500'>Review the questions below. You can start the interview when you're ready.</p>
                    </div>

                    <div className='space-y-4'>
                        {questionList.map((item, index) => (
                            <div key={index} className='p-3 border border-gray-300 rounded-xl'>
                                <h3 className='font-semibold'>{index + 1}. {item.question}</h3>
                                <p className='text-sm text-gray-500 mt-1'>Type: <span className='font-medium text-primary  px-2 py-0.5 rounded-full'>{item?.type}</span></p>
                            </div>
                        ))}
                    </div>
                </div>
  )
}


