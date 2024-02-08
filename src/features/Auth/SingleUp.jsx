import React, { useState } from 'react'
import AxiosClent from '../../plugins/AxiosClent';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaEyeSlash } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { Notification } from '../../Notification/Notification';
import { MdOutlineRemoveRedEye } from "react-icons/md";
export default function SingleUp() {
    const navigate = useNavigate()
    const [eye, setEye] = useState(false)
    const handleBtn = (e) => {
        e.preventDefault();
        let payload = {
            full_name: e.target[0].value,
            username: e.target[1].value,
            password: e.target[2].value,
        }

        AxiosClent.post("auth/signup", { ...payload }).then((res) => {
            localStorage.setItem("token", res?.data?.tokens?.access_token)
            if (res.status === 201) {
                Notification( {text: res?.data?.message, type: "success"})
                setTimeout(() => {
                    navigate("/signIn")
                }, 2500)
            }
        }).catch((err) => {
            console.log(err);
            Notification( {text: err.response?.data?.message[0], type: "error"})
        })
    }

    return (
        <div className='flex justify-center items-center flex-col bg-slate-200 w-[100%] h-[100vh]'>
            <ToastContainer />
            <div className=" pt-[50px] bg-white  w-[450px] h-[500px]">
                <h1 className='text-center'>Single Up</h1>
                <p className=' text-center'>Create an account to unlock exclusive features.</p>
                <form onSubmit={handleBtn} className=' flex justify-center ml-[70px] flex-col gap-[10px]'>
                    <label htmlFor="" className=' '>Full Name</label>
                    <input type="text" placeholder='full_name' className='border rounded-[5px] px-[8px] py-[5px] w-[300px]' />
                    <label htmlFor="" className=' '>Username</label>
                    <input type="text" placeholder='username' className='border rounded-[5px] px-[8px] py-[5px] w-[300px]' />
                    <label htmlFor="" className=' '>Password</label>
                    <div className='flex justify-between items-center border rounded-[5px] px-[8px] py-[5px] w-[300px]'>
                        <input type={eye ? "text" : "password"} placeholder='password' className=' outline-none' />
                        {/* <FaEyeSlash onClick={() => setEye(prev => !prev)} className=' cursor-pointer' /> */}
                        {
                            eye  ? <MdOutlineRemoveRedEye onClick={() => setEye(prev => !prev)} /> : <FaEyeSlash onClick={() => setEye(prev => !prev)} className=' cursor-pointer' />
                        }
                    </div>
                    <button type='submit' className='text-[20px] border text-[#fff] rounded-[10px] py-[5px] w-[80%] bg-[#4747ed]'>Sign Up</button>
                    <p>Already have an account?   <Link to="/signIn" className='text-center no-underline text-[20px]  text-[blue]  ' >Sign In</Link></p>
                </form>
            </div>
        </div>
    )
}




