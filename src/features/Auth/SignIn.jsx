import React, { useEffect, useState } from 'react'
import AxiosClent from '../../plugins/AxiosClent';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
    const navigate = useNavigate()
    const handleBtn = (e) => {
        e.preventDefault();
        let payload = {
            username: e.target[0].value,
            password: e.target[1].value
        }
        AxiosClent.post('auth/signin', { ...payload }).then((res) => {
            if (res.status === 201) {
                toast.success("success")
                setTimeout(() => {
                    navigate("/books")
                }, 2500)
            } else {
                toast.error("error")
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <div>
            <ToastContainer />
            <div className=' flex justify-center items-center flex-col my-[100px] '>
                <h2 className='text-[30px] font-[600]'>Sing In</h2>
                <form onSubmit={handleBtn} className=' flex justify-center items-center flex-col gap-[10px]'>
                    <input type="text" placeholder='username' className='border rounded-[5px] px-[8px] py-[5px] w-[300px]' />
                    <input type="password" placeholder='password' className='border rounded-[5px] px-[8px] py-[5px] w-[300px]' />
                    <button className='text-[20px] border text-[#fff] rounded-[10px] py-[5px] w-[150px] bg-[#4747ed]'>Sing In</button>
                </form>
            </div>
        </div>
    )
}
