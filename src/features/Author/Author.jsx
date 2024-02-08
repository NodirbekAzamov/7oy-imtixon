import React, { useEffect, useState } from 'react'
import Menu from '../../SideBar/Menu'
import ModalAuthor from '../Modals/ModalAuthor'
import AxiosClent from '../../plugins/AxiosClent'
import { Link } from 'react-router-dom'
import DleteAuthor from '../Modals/DleteAuthor'
import AuthorCard from './AuthorCard'

export default function Author() {
    const [modalAuthor, setModalAuthor] = useState(false)
    const [author, setAuthor] = useState([])
    const [ items, setItems] = useState("")
    const [deletelAuthor, setDeleteAuthor] = useState(false)
    const [link, setLink] = useState("")

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
        setItems("")
    }
    const editAuthor = (item) => {
        setItems(item)
        setModalAuthor(true)
        setLink(item.image)
    }

    const removeAuthor = (id) => {
        setDeleteAuthor(true)
        setItems(id)
    }

    return (
        <div className='flex gap-[50px]'>
            <div className='w-[220px]'></div>
            <div className='my-[20px]'>
                <ModalAuthor open={modalAuthor} toggle={toggle} items={items} link={link} setLink={setLink} />
                <DleteAuthor open={deletelAuthor} toggle={()=> setDeleteAuthor(false)} id={items}/>
                <button onClick={addAuther} className=' px-[15px] py-[8px] bg-[#42d93a] text-[#fff] mt-[10px] ml-[15px] rounded-[10px]'>add Author</button>

                <div className="flex flex-wrap gap-[55px] w-[100%] my-[20px] px-[20px]">
                    {
                        author?.map((item, index) => {
                            return <AuthorCard item={item} removeAuthor={removeAuthor} editAuthor={editAuthor}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
