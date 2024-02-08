import React, { useState } from 'react'
import { Modal, ModalBody } from 'reactstrap'
import AxiosClent from '../../plugins/AxiosClent';
import { ToastContainer, toast } from 'react-toastify';
import upload from "../../assets/image_upload.png"

import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import { Notification } from '../../Notification/Notification';

export default function ModalAuthor({ open, toggle, items, link, setLink }) {
    const [img, setImg] = useState("")
    const [required, setRequired] = useState(true)
    const handleSubmit = (e) => {
        e.preventDefault();
        const imgData = new FormData();
        imgData.append("file", img)
        let payload = {
            full_name: e.target[1].value ? e.target[1].value : items.full_name,
            birthdate: e.target[2].value ? e.target[2].value  : items.birthdate,
            country: e.target[3].value ? e.target[3].value : items.country,
            image: items.image ? items.image : link
        }
        if (items !== "") {
            AxiosClent.patch(`/author/${items.id}`, { ...payload }).then((res) => {
                window.location.reload();
            })
        } else {
            AxiosClent.post("/author", { ...payload }).then((res) => {
                window.location.reload();
            }).catch((err) => {
                Notification( {text: err.resspons?.data?.message[0], type: "error"})
            })
        }
    }

    const imgUpload = (e) => {
        const img = e.target.files[0]
        const imgData = new FormData();
        imgData.append("file", img)
        AxiosClent.post("/files/upload", imgData).then(res => {
            setLink(res?.data?.link)
        }).catch((err) => {
            console.log(err);
            toast.error("An error occurred")
        })
    }

    return (
        <div>
            <Modal isOpen={open} toggle={toggle}>
                <ToastContainer />
                <ModalBody>
                    <form onSubmit={handleSubmit} >
                        <div className='w-[100%] h-[150px] flex justify-center items-center cursor-pointer  border relative'>
                            <input type="file"  onChange={imgUpload} className='cursor-pointer  opacity-0 my-1 absolute z-10 w-[100%] h-[100%]' />
                            <img src={link ? link : upload} alt="image" className='w-[60%] h-[100%] cursor-pointer  object-cover absolute top-0 ' />
                        </div>
                        <input type="text" placeholder='full_name' required defaultValue={items.full_name} className='w-[100%] border py-[8px] px-[10px] rounded-[8px] my-1' />
                        <div className='w-[100%] border py-[8px] px-[10px] rounded-[8px] my-1'>
                            <input type="date" className=' outline-none'/>
                        </div>
                        <input type="text" placeholder='country' required defaultValue={items.country} className='w-[100%] border py-[8px] px-[10px] rounded-[8px] my-1' />
                        <button type='submit' className='bg-[#2fe43b] px-[20px] py-[10px] rounded-[10px] text-[#fff]'>save</button>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    )
}
