import React from 'react'
import AxiosClent from '../../plugins/AxiosClent';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function SingleUp() {
    const navigate = useNavigate()
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
                toast.success("success")
                setTimeout(() => {
                    navigate("/signIn")
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
            <div className="flex justify-center items-center flex-col my-[100px] ">
                <h1 className='text-center'>Single Up</h1>
                <form onSubmit={handleBtn} className=' flex justify-center items-center flex-col gap-[10px]'>
                    <input type="text" placeholder='full_name' className='border rounded-[5px] px-[8px] py-[5px] w-[300px]' />
                    <input type="text" placeholder='username' className='border rounded-[5px] px-[8px] py-[5px] w-[300px]' />
                    <input type="password" placeholder='password' className='border rounded-[5px] px-[8px] py-[5px] w-[300px]' />
                    <div className='flex gap-[10px]'>
                        <button type='submit' className='text-[20px] border text-[#fff] rounded-[10px] py-[5px] w-[150px] bg-[#4747ed]'>Sign Up</button>
                        <Link to="/signIn" className='text-center no-underline text-[20px] border text-[#fff] rounded-[10px] py-[5px] w-[150px] bg-[#4747ed]' >Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}



// Asilbek Asilbek Password123
