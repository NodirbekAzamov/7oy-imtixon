import React, { useEffect, useState } from 'react'
import AxiosClent from '../../plugins/AxiosClent'
import ModalBooks from '../Modals/ModalBooks'
import Menu from './Menu'
import { Link } from 'react-router-dom'
import DeleteBook from '../Modals/DeleteBook'

export default function Books() {
  const [books, setBooks] = useState([])
  const [modal, setModal] = useState(false)
  const [items, setItems] = useState("")
  const [deleteBook, setDeleteBook] = useState(false)
  useEffect(() => {
    AxiosClent.get("/book").then((res) => {
      setBooks(res?.data)
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  const addBook = () => {
    setModal(true)
    setItems("")
  }

  const BookEdit = (item) => {
    setModal(true)
    setItems(item)
  }
  const remodeBook = (id) => {
    setDeleteBook(id)
    setItems(id)
  }

  const toggle = () => {
    setModal(false)
  }
  return (
    <div className='flex gap-[50px]'>
      <div>
        <Menu />
      </div>
      <div>
        <ModalBooks open={modal} toogle={toggle} items={items} />
        <DeleteBook open={deleteBook} toggle={()=>setDeleteBook(false)} id={items}/>
        <div className='ml-[180px] my-[20px]'>
          <button onClick={addBook} className='bg-[#42d93a] px-[15px] py-[8px] rounded-[10px] text-[#fff]'>Add Book</button>
        </div>
        <div className=' flex  ml-[180px]'>
          <div className='flex justify-around gap-[100px] flex-wrap px-[50px]'>
            {
              books?.map((item, index) => {
                return <div key={index} className='border w-[270px] h-[420px] rounded-[20px] p-[15px] '>
                  <img src={item.image} alt="img" className='w-[100%] h-[50%] rounded-[20px]' />
                  <h6 className='text-[20px] pt-[10px] max-w-[120px]'>Name: {item.name}</h6>
                  <h6 className='text-[18px] py-[5px]'>Price: ${item.price}</h6>
                  <button className='bg-[#21589b] mx-auto rounded-[10px]   py-[8px] w-[100%]'><Link to={`/single_page/${item.id}`} className=' no-underline text-[#fff]' >More</Link></button>
                  <div className='flex gap-[8px] mt-[15px]'>
                    <button onClick={() => BookEdit(item)} className='bg-[#21589b] mt-[5px] mx-auto rounded-[10px] text-[#fff] py-[8px] w-[50%]'>edit</button>
                    <button onClick={() => remodeBook(item.id)} className='bg-[#ff2525] mt-[5px] mx-auto rounded-[10px] text-[#fff] py-[8px] w-[50%]'>delete</button>
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
