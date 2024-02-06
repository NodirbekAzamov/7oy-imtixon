import React, { useEffect, useState } from 'react'
import Menu from '../book/Menu'
import ModalAuthor from '../Modals/ModalAuthor'
import AxiosClent from '../../plugins/AxiosClent'
import { Link } from 'react-router-dom'
import DleteAuthor from '../Modals/DleteAuthor'

export default function Author() {
    const [modalAuthor, setModalAuthor] = useState(false)
    const [author, setAuthor] = useState([])
    const [ items, setItems] = useState("")
    const [deletelAuthor, setDeleteAuthor] = useState(false)
    
    useEffect(() => {
        AxiosClent.get("/author").then(res => {
            setAuthor(res?.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    const addAuther = () => {
        setModalAuthor(true)
        setItems("")
    }
    const toggle = () => {
        setModalAuthor(false)
    }
    const editAuthor = (item) => {
        setItems(item)
        setModalAuthor(true)
        console.log(item);
    }

    const removeAuthor = (id) => {
        setDeleteAuthor(true)
        setItems(id)
        
        
    }

    return (
        <div className='flex gap-[50px]'>
            <Menu />
            <div className='ml-[180px] my-[20px]'>
                <ModalAuthor open={modalAuthor} toggle={toggle} items={items}  />
                <DleteAuthor open={deletelAuthor} toggle={()=> setDeleteAuthor(false)} id={items}/>
                <button onClick={addAuther} className=' px-[15px] py-[8px] bg-[#80eb4b] text-[#fff] rounded-[10px]'>add Author</button>

                <div className="flex flex-wrap gap-[55px] w-[100%] my-[20px] px-[20px]">
                    {
                        author?.map((item, index) => {
                            return <div className='w-[280px]  h-[420px] mt-[20px] border p-[15px]' key={index}>
                                <img src={item.image} alt="img" className='h-[50%] w-[100%] object-cover' />
                                <h5 className='my-[20px]'>Full Name: <span className='text-[#f34646]'>{item.full_name}</span></h5>
                                <h5>Country: {item.country}</h5>
                                <button className='bg-[#beff3c] mt-[5px] mx-auto rounded-[10px] text-[#fff] py-[8px] w-[100%]'><Link to={`/singleAuthor/${item.id}`} className=' no-underline'>Single_Page</Link></button>
                                <div className='flex gap-[8px]'>
                                    <button onClick={() => editAuthor(item)} className='bg-[#21589b] mt-[5px] mx-auto rounded-[10px] text-[#fff] py-[8px] w-[50%]'>edit</button>
                                    <button onClick={()=>removeAuthor(item.id)} className='bg-[#ff2525] mt-[5px] mx-auto rounded-[10px] text-[#fff] py-[8px] w-[50%]'>delete</button>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
