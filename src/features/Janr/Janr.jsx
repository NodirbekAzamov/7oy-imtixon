import React, { useEffect, useState } from 'react'
import Menu from '../../SideBar/Menu'
import ModalJanr from '../Modals/ModalJanr'
import AxiosClent from '../../plugins/AxiosClent'
import DeleteJanr from '../Modals/DeleteJanr'
import GenreCard from './GenreCard'

export default function Janr() {
    const [modalJanr, setModalJanr] = useState(false)
    const [deleteJanr, setDeleteJanr] = useState(false)
    const [janr, setJanr] = useState([])
    const [item, setItem] = useState("")
    const [required, setRequired] = useState(false)
    useEffect(() => {
        AxiosClent.get("/category/get/all").then((res) => {
            setJanr(res?.data)
        })
    }, [])
    const addJanr = () => {
        setModalJanr(true)
        setItem("")
        setRequired(true)
    }
    const toogle = () => {
        setModalJanr(false)
    }
    const JanrEdit = (item) =>{
        setModalJanr(true)
        setItem(item)
        setRequired(true)
    }
    const removeJanr = (id) => {
        setDeleteJanr(true)
        setItem(id)
    }
    return (
        <div className='flex gap-[30px]'>
            <div className='w-[220px]'></div>
            <div>
                <ModalJanr open={modalJanr} toggle={toogle} item={item} setItem={setItem} required={required}/>
                <DeleteJanr open={deleteJanr} toggle={(()=>setDeleteJanr(false))} item={item}/>
                <button onClick={addJanr} className='px-[15px] py-[8px] my-[20px] rounded-[10px] bg-[#42d93a]'>add Janr</button>

                <div className='flex  gap-[50px] flex-wrap justify-between'>
                    {
                        janr?.map((item, index) => {
                            return <GenreCard item={item} removeJanr={removeJanr} JanrEdit={JanrEdit} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

// required