import React, { useEffect, useState } from 'react'
import Books from '../features/book/Books'
import Author from '../features/Author/Author'
import Janr from '../features/Janr/Janr'
import SideBar from './SideBar'

export default function Menu() {
  const [id, setId] = useState("")
  const [component, setComponent] = useState([
    { id: 1, component: <Books /> },
    { id: 2, component: <Janr /> },
    { id: 3, component: <Author /> },
  ])
  useEffect(() => {
    setId(localStorage.getItem("id"))
  }, [])
  return (
    <div>
      <div>
        <SideBar />
      </div>
      <div>
        {
          component.filter((item) => item.id == id).map((item, index) => {
            return item.component
          })
        }
      </div>
    </div>
  )
}
