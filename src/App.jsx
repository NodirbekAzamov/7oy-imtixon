import React from 'react'
import SingleUp from './features/Auth/SingleUp'
import { Route, Routes } from 'react-router-dom'
import Logout from './features/Auth/Logout'
import SignIn from './features/Auth/SignIn'
import Single_Page from './features/book/Single_Page'
import Single_Author from './features/Author/Single_Author'
import Menu from './SideBar/Menu'

export default function App() {

  return (
    <>
      <div className=''>
        <Routes>
          <Route path='/' element={<SingleUp />} />
          <Route path='signIn' element={<SignIn />} />
          <Route path='logout' element={<Logout />} />
          <Route path='books' element={<Menu />} />
          <Route path='single_page/:id' element={<Single_Page/>}/>
          <Route path='singleAuthor/:id' element={<Single_Author/>}/>
        </Routes>
      </div>
    </>
  )
}


