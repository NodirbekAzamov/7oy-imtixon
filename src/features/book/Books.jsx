import React, { useEffect, useState } from 'react'
import AxiosClent from '../../plugins/AxiosClent'
import ModalBooks from '../Modals/ModalBooks'
import Menu from '../../SideBar/Menu'
import { Link } from 'react-router-dom'
import DeleteBook from '../Modals/DeleteBook'
import BookCard from './BookCard'

export default function Books() {
  const [books, setBooks] = useState([])
  const [modal, setModal] = useState(false)
  const [items, setItems] = useState("")
  const [deleteBook, setDeleteBook] = useState(false)
  const [link, setLink] = useState("")

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
    setLink(item.image)
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
      <div className='w-[220px]'></div>
      <div>
        <ModalBooks open={modal} toogle={toggle} items={items} link={link} setLink={setLink} />
        <DeleteBook open={deleteBook} toggle={() => setDeleteBook(false)} id={items} />
        <div className=' mb-[50px] mt-[20px] '>
          <button onClick={addBook} className='bg-[#42d93a] px-[15px] py-[8px] rounded-[10px] text-[#fff]'>Add Book</button>
        </div>
        <div className=' '>
          <div className='flex justify-around gap-[100px] flex-wrap  '>
            {
              books?.map((item, index) => {
                return <BookCard item={item} remodeBook={remodeBook} BookEdit={BookEdit} />
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
