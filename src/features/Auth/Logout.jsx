import React from 'react'
import AxiosClent from '../../plugins/AxiosClent';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate()
  const handleBtn = (e) => {
    e.preventDefault();
    let payload = {
      username: e.target[0].value,
      password: e.target[1].value,
    }

    AxiosClent.post('auth/logout', { ...payload }).then((res) => {
      console.log(res);
      if (res.status === 201) {
        navigate("/logout");
      }
    }).catch((err => {
      console.log(err);
    }))
  }
  return (
    <div>
      <div className='flex justify-center items-center flex-col my-[100px]'>
        <h1 className='text-[30px] font-[600] '>Logout</h1>
        <form onSubmit={handleBtn} className=' flex justify-center items-center flex-col gap-[10px]'>
          <input type="text" placeholder='username' className='border rounded-[5px] px-[8px] py-[5px] w-[300px]' />
          <input type="password" placeholder='password' className='border rounded-[5px] px-[8px] py-[5px] w-[300px]' />
          <button type='submit' className='text-[20px] border text-[#fff] rounded-[10px] py-[5px] w-[150px] bg-[#4747ed]'>Logout</button>
        </form>
      </div>
    </div>
  )
}


// Abdujabor Abdujabor Abdujabor123