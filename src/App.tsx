import React from 'react'
import FirstPage from './pages/firstPage/firstPage'
import { Route, Routes } from 'react-router-dom'
import SecondPage from './pages/secondPage/secondPage'
function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<FirstPage/>}/>
        <Route path='/firstPage'element={<FirstPage/>}/>
        <Route path='/secondPage' element={<SecondPage/>}/>
      </Routes>
      
      
    </>
  )
}

export default App
