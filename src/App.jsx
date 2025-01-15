import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import {Events, Home, Login, PassRetrieve, Products, ResetPassword, SignUp, Users,} from './pages'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route index element={<Home></Home>}></Route>
        <Route path="/Home" element={<Home></Home>}></Route>
        <Route path="/Login" element={<Login></Login>}></Route>
        <Route path="/Signup" element={<SignUp></SignUp>}></Route>
        <Route path="/PasswordRetrive" element={<PassRetrieve></PassRetrieve>}></Route>
        <Route path="/ResetPassword" element={<ResetPassword></ResetPassword>}></Route>
        <Route path="/Events" element={<Events></Events>}></Route>
        <Route path="/Projects" element={<Projects></Projects>}></Route>
        <Route path="/Users" element={<Users></Users>}></Route>
        <Route path="/Products" element={<Products></Products>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App