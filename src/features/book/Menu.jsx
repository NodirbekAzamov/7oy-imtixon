import React from 'react'
import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <div>
        <div className=' flex justify-center items-center fixed top-0 left-0 flex-col gap-[50px] w-[200px] h-[100vh] bg-[#44114d]'>
            <Link to="/books" className=' no-underline text-[20px] text-[#fff]  bg-[#4646e8] px-[60px] py-[10px] rounded-[10px]'>Book</Link>
            <Link to="/janr" className='no-underline text-[20px] text-[#fff]  bg-[#4646e8] px-[60px] py-[10px] rounded-[10px]'>Janr</Link>
            <Link to="/author" className='no-underline text-[20px] text-[#fff]  bg-[#4646e8] px-[60px] py-[10px] rounded-[10px]'>Author</Link>
        </div>
    </div>
  )
}
