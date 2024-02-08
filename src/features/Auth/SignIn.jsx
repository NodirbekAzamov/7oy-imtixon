import React, { useEffect, useState } from 'react'
import AxiosClent from '../../plugins/AxiosClent';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEyeSlash } from "react-icons/fa";
import { Notification } from '../../Notification/Notification';
import { MdOutlineRemoveRedEye } from "react-icons/md";
export default function SignIn() {
    const navigate = useNavigate()
    const [eye, setEye] = useState(false)
    const handleBtn = (e) => {
        e.preventDefault();
        let payload = {
            username: e.target[0].value,
            password: e.target[1].value
        }
        AxiosClent.post('auth/signin', { ...payload }).then((res) => {
            if (res.status === 201) {
                Notification({ text: res?.data?.message, type: "success" })
                setTimeout(() => {
                    navigate("/books")
                }, 2500)
            }
        }).catch((err) => {
            console.log(err);
            Notification({ text: err.resspons?.data?.message[0], type: "error" })
        })
    }

    return (
        <div className='flex justify-center items-center flex-col bg-slate-200 w-[100%] h-[100vh]'>
            <ToastContainer />
            <div className='pt-[50px] bg-white  w-[450px] h-[500px] '>
                <h2 className='text-[30px] text-center font-[600]'>Sing In</h2>
                <p className=' text-center'>Create an account to unlock exclusive features.</p>
                <form onSubmit={handleBtn} className='flex justify-center ml-[70px] flex-col gap-[10px]'>
                    <label htmlFor="">Username</label>
                    <input type="text" placeholder='username' className='border rounded-[5px] px-[8px] py-[10px] w-[300px]' />
                    <label htmlFor="">Password</label>
                    <div className='flex justify-between items-center border rounded-[5px] px-[8px] py-[10px] w-[300px]'>
                        <input type={eye ? "text" : "password"} placeholder='password' className=' outline-none' />
                        {
                            eye  ? <MdOutlineRemoveRedEye onClick={() => setEye(prev => !prev)} /> : <FaEyeSlash onClick={() => setEye(prev => !prev)} className=' cursor-pointer' />
                        }
                    </div>
                    <button className='text-[20px] border text-[#fff] rounded-[10px] py-[5px] w-[80%] bg-[#4747ed]'>Sing In</button>
                </form>
            </div>
        </div>
    )
}
