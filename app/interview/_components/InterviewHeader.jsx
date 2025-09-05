import React from 'react'
import Image from 'next/Image'

function InterviewHeader() {
  return (
    <div className='p-2 shadow'>
      <Image src={'/logo.png'} alt='logo' width={200} height={100}
      className='w-[140px]'/>
    </div>
  )
}

export default InterviewHeader
