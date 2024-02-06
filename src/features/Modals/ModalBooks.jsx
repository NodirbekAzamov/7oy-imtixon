import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import AxiosClent from '../../plugins/AxiosClent';
import upload from "../../assets/upload.webp"
export default function ModalBooks({ open, toogle, items }) {
    const [img, setImg] = useState("")
    const [janr, setJanr] = useState([])
    const [author, setAuthor] = useState([])
    useEffect(() => {
        AxiosClent.get("/category/get/all").then((res) => {
            setJanr(res?.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        AxiosClent.get("/author").then((res) => {
            setAuthor(res?.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    console.log(items.image);

    const handleSubmit = (e) => {
        e.preventDefault();
        const imgData = new FormData();
        imgData.append("file", img)

        let payload = {
            name: e.target[1].value ? e.target[1].value : items.name,
            author_id: +e.target[2].value ? +e.target[2].value : items.author_id,
            price: +e.target[3].value ? +e.target[3].value : items.price,
            code: e.target[4].value ? e.target[4].value : items.code,
            janr_id: +e.target[5].value ? +e.target[5].value : items.janr_id,
            description: e.target[6].value ? e.target[6].value : items.description,
        }
        if (items !== "") {
            if (img) {
                AxiosClent.post("/files/upload", imgData).then(res => {
                    if (res.status === 201) {
                        AxiosClent.patch(`/book/${items.id}`, { ...payload, image: res?.data?.link }).then(res => {
                            if (res.status === 201) {
                                window.location.reload()
                                toogle()
                            }

                        })

                    }
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                AxiosClent.patch(`/book/${items.id}`, { ...payload, image: items.image }).then(res => {
                    if (res.status === 200) {
                        window.location.reload()
                        toogle()
                    }

                })
            }
        } else {
            AxiosClent.post("/files/upload", imgData).then(res => {
                if (res.status === 201) {
                    AxiosClent.post("/book/create", { ...payload, image: res?.data?.link }).then(res => {
                        if (res.status === 201) {
                            window.location.reload()
                        }
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    return (
        <Modal isOpen={open} toggle={toogle}>

            <ModalBody>
                <form onSubmit={handleSubmit} id='form' >
                    <div className='w-[100%] h-[100px] border relative'>
                        <input type="file" required onChange={(e) => setImg(e.target.files[0])} defaultValue={img} className=' opacity-0 my-1 absolute z-10 w-[100%] h-[100%]' />
                        <img src={upload} alt="" className='w-[100px] h-[100%] absolute top-0 left-[150px]' />

                    </div>
                    <input type="text" placeholder='name' required defaultValue={items.name} className='w-[100%] border py-[8px] px-[10px] rounded-[8px] my-1' />
                    <select defaultValue={items.author_id} required className='w-[100%] border py-[8px] px-[10px] rounded-[8px] my-1'>
                        <option value="" hidden>author</option>
                        {
                            author?.map((item, index) => {
                                return <option value={item.id} key={index}>{item.full_name}</option>
                            })
                        }
                    </select>
                    <input type="number" placeholder='price' required defaultValue={items.price} className='w-[100%] border py-[8px] px-[10px] rounded-[8px] my-1' />
                    <input type="number" placeholder='code' required defaultValue={items.code} className='w-[100%] border py-[8px] px-[10px] rounded-[8px] my-1' />
                    <select defaultValue={items.janr_id} required className='w-[100%] border py-[8px] px-[10px] rounded-[8px] my-1'>
                        <option value="" hidden>janr</option>
                        {
                            janr?.map((item, index) => {
                                return <option value={item.id} key={index}>{item.name}</option>
                            })
                        }
                    </select>
                    <textarea cols="60" rows="5" placeholder='Description' required defaultValue={items.description} className='border'></textarea>
                </form>
            </ModalBody>
            <ModalFooter>
                <button type='submit' form='form' className='bg-[#2fe43b] px-[15px] py-[5px] rounded-[10px] text-[#fff]'>save</button>
            </ModalFooter>
        </Modal>
    )
}
