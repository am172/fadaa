import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
// import DashbordStudent from './DashbordStudent'
import HousCards from './HousCards'
import Home from './home'
import Student from './student'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './login'
import DashbordStudent from'./DashbordStudent.jsx'
import  News from './News'
function App() {

  return (
<BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      {/* <Route path='/dashordStudent' element={<DashbordStudent />}></Route> */}
      <Route path='/student' element={<Student />}></Route>
      <Route path='/home' element={<Student />}></Route>
      <Route path='/student/houses' element={<HousCards />}></Route>
      <Route path='/student/students' element={<DashbordStudent />}></Route>
      <Route path='/student/News' element={<News />}></Route>


    </Routes>
</BrowserRouter>
  )
}

export default App
