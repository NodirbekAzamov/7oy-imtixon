import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom/dist'
import book from "../assets/books.jpg"
import { CiLogin } from "react-icons/ci";
export default function SideBar() {
    const [page, setPage] = useState("")
    const [link, setLink] = useState([
        { id: 1, title: "Books" },
        { id: 2, title: "Genger" },
        { id: 3, title: "Authors" },
    ])
    const Page = (id) => {
        localStorage.setItem("id", id)
        window.location.reload()
    }
    useEffect(() => {
        setPage(localStorage.getItem("id"))
    }, [])
    return (
        <div className=''>

            <div className=' flex  items-center fixed top-0 left-0 flex-col  gap-[50px] w-[220px]  h-[100vh] bg-[#44114d]'>
                <div className='mt-[20px]'>
                    <img src={book} alt="image" className='w-[180px] h-[180px] rounded-[50%]  hover:scale-[1.2] hover:border-[10px] border-[#21219eb7] transition-[0.5s] ' />
                </div>
                <ul className='flex justify-center items-center gap-[30px] flex-col p-0 m-0 w-[100%] '>
                    {
                        link?.map((item, index) => {
                            return <li key={index} className='hover:scale-[1.1] transition-[0.5s] hover:bg-[#5050af8a] py-[10px]  rounded-[10px]'>
                                <Link onClick={() => Page(item.id)} className={` ${item.id == page ? "text-[20px] text-[#fff]   bg-[#4646e8]  rounded-[10px]" : "rounded-[10px] border text-[20px] text-[#fff] "} no-underline px-[50px] py-[8px] `}>{item.title}</Link>
                            </li>
                        })
                    }
                    <li>
                        <Link to="/signIn" className=' no-underline flex items-center gap-[10px]'>Log out <span className=' text-[#fff] text-[20px]'><CiLogin /></span> </Link>
                    </li>
                </ul>

            </div>
        </div>
    )
}
