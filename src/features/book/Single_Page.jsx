import React, { useEffect, useState } from 'react'
import AxiosClent from '../../plugins/AxiosClent'
import Menu from '../../SideBar/Menu'

export default function Single_Page() {
    const [singleBook, setSingleBook] = useState("")
    let url = window.location.href.split('/')[4]
    useEffect(() => {
        AxiosClent.get(`/book/${url}`).then((res) => {
            setSingleBook(res?.data)
        })
    }, [])
    return (
        <div className='flex bg-[#bfc6c4] w-[100%]  h-[100vh]'>
            <div className=' flex justify-center items-center w-[100%]  '>
                <div style={{ boxShadow: '10px 14px 16px 15px rgba(255, 255, 255)' }} className='flex gap-[50px] justify-center items-center  ml-[210px] '>
                    <div>
                        <img src={singleBook.image} alt="img" className='w-[300px] h-[300px]' />
                    </div>
                    <div className=' w-[300px] p-[20px] h-[300px]'>
                        <h5>Name: <span className=' text-orange-700'>{singleBook?.name}</span></h5>
                        <h5>Full Name: <span className=' text-orange-700'> {singleBook?.author?.full_name}</span></h5>
                        <h5>Price: <span className=' text-orange-700'>{singleBook?.price}</span></h5>
                        <h5> Code: <span className=' text-orange-700'>{singleBook?.code}</span></h5>
                        <h5>Janr: <span className=' text-orange-700'> {singleBook?.janr?.name}</span></h5>
                        <h5>Description:</h5>
                        <hr />
                        <p>{singleBook.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
