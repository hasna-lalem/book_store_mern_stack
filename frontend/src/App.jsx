import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import ShowBook from './pages/ShowBook'
import CreateBook from './pages/CreateBook'
import DeleteBook from './pages/DeleteBook'
import EditBook from './pages/EditBook'
import Login from './components/login'
function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/books/details/:id' element={<ShowBook />} />
        <Route path='/books/create' element={<CreateBook />} />
        <Route path='/books/delete/:id' element={<DeleteBook />} />
        <Route path='/books/Edit/:id' element={<EditBook />} />
      </Routes>
    </>
  )
}

export default App
