import React, { useEffect, useState } from 'react'
import Menu from '../book/Menu'
import ModalJanr from '../Modals/ModalJanr'
import AxiosClent from '../../plugins/AxiosClent'
import DeleteJanr from '../Modals/DeleteJanr'

export default function Janr() {
    const [modalJanr, setModalJanr] = useState(false)
    const [deleteJanr, setDeleteJanr] = useState(false)
    const [janr, setJanr] = useState([])
    const [item, setItem] = useState("")
    useEffect(() => {
        AxiosClent.get("/category/get/all").then((res) => {
            setJanr(res?.data)
        })
    }, [])
    const addJanr = () => {
        setModalJanr(true)
        setItem("")
    }
    const toogle = () => {
        setModalJanr(false)
    }
    const JanrEdit = (item) =>{
        setModalJanr(true)
        setItem(item)
    }
    const removeJanr = (id) => {
        setDeleteJanr(true)
        setItem(id)
    }
    return (
        <div className='flex gap-[50px]'>
            <div >
                <Menu />
            </div>
            <div className='ml-[180px]'>
                <ModalJanr open={modalJanr} toggle={toogle} item={item} setItem={setItem}/>
                <DeleteJanr open={deleteJanr} toggle={(()=>setDeleteJanr(false))} item={item}/>
                <button onClick={addJanr} className='px-[15px] py-[8px] my-[20px] rounded-[10px] bg-[#4882e7]'>add Janr</button>

                <div className='flex  gap-[50px] flex-wrap justify-between'>
                    {
                        janr?.map((item, index) => {
                            return <div className='w-[200px] h-[150px] my-[20px] border shadow-[5px, 5px, 5px, #red]' key={index}>
                                <h5 className='text-center my-[10px] text-[#4635ff] font-[600]' >Janr: <span className='text'>{item.name}</span></h5>
                                <div className='flex gap-[8px] my-[25px]'>
                                    <button onClick={()=>JanrEdit(item)} className='bg-[#253886] mx-auto text-[#fff] rounded-[10px] py-[8px] px-[15px]'>edit</button>
                                    <button onClick={()=>removeJanr(item.id)} className='bg-[#ff2d2d] mx-auto text-[#fff] rounded-[10px] py-[8px] px-[15px]'>delete</button>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

// required