import React, { useState } from 'react'
import { Modal, ModalBody } from 'reactstrap'
import AxiosClent from '../../plugins/AxiosClent';

export default function ModalAuthor({ open, toggle, items }) {
    const [img, setImg] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();
        const imgData = new FormData();
        imgData.append("file", img)
        let payload = {
            full_name: e.target[1].value ? e.target[1].value : items.full_name,
            birthdate: e.target[2].value ? e.target[2].value : items.birthdate,
            country: e.target[3].value ? e.target[3].value : items.country
        }
        if (items !== "") {
            if (img) {
                AxiosClent.post("/files/upload", imgData).then((res) => {
                    if (res.status === 201) {
                        AxiosClent.patch(`/author/${items.id}`, { ...payload, image: res?.data?.link }).then((res) => {
                            window.location.reload();
                            toggle();
                        })
                    }
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                AxiosClent.patch(`/author/${items.id}`, { ...payload, image: items.image }).then((res) => {
                    window.location.reload();
                    toggle();
                })
            }
        } else {
            AxiosClent.post("/files/upload", imgData).then((res) => {
                if (res.status === 201) {
                    AxiosClent.post("/author", { ...payload, image: res?.data?.link }).then((res) => {
                        window.location.reload();
                        toggle();
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }


    return (
        <div>
            <Modal isOpen={open} toggle={toggle}>
                <ModalBody>
                    <form onSubmit={handleSubmit} >
                        <input type="file" required onChange={(e) => setImg(e.target.files[0])} className='w-[100%] ' />
                        <input type="text" placeholder='full_name' required defaultValue={items.full_name} className='w-[100%] border py-[8px] px-[10px] rounded-[8px] my-1' />
                        <input type="date" placeholder='birthdate' required defaultValue={items.birthdate} className='w-[100%] border py-[8px] px-[10px] rounded-[8px] my-1' />
                        <input type="text" placeholder='country' required defaultValue={items.country} className='w-[100%] border py-[8px] px-[10px] rounded-[8px] my-1' />
                        <button type='submit' className='px-[15px] py-[8px] rounded-[10px] bg-[#4882e7]'>save</button>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    )
}
