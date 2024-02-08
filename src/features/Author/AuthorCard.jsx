import React from 'react'
import { Link } from 'react-router-dom/dist'

export default function AuthorCard({ item, removeAuthor, editAuthor }) {
    return (
        <div>
            <div className='w-[280px]  h-[420px] mt-[20px] border p-[15px] hover:scale-[1.1] transition-[0.5s]' >
                <img src={item.image} alt="img" className='h-[50%] w-[100%] object-cover  ' />
                <h5 className='my-[20px]'>Full Name: <span className='text-[#f34646]'>{item.full_name}</span></h5>
                <h5>Country: {item.country}</h5>
                <button className='bg-[#beff3c] mt-[5px] mx-auto rounded-[10px] text-[#fff] py-[8px] w-[100%]'><Link to={`/singleAuthor/${item.id}`} className=' no-underline'>Single_Page</Link></button>
                <div className='flex gap-[8px]'>
                    <button onClick={() => editAuthor(item)} className='bg-[#21589b] mt-[5px] mx-auto rounded-[10px] text-[#fff] py-[8px] w-[50%]'>edit</button>
                    <button onClick={() => removeAuthor(item.id)} className='bg-[#ff2525] mt-[5px] mx-auto rounded-[10px] text-[#fff] py-[8px] w-[50%]'>delete</button>
                </div>
            </div>
        </div>
    )
}
