import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure this is in place
import { Logo,} from '../assets';

function Navbar({ toggleMenu, name, lastname, isAdmin, setIsAdmin }) {

  const navigate = useNavigate();

  

  return (
    <div className='w-screen h-[70px] bg-thegray drop-shadow-md shadow-inner flex items-center justify-between sm:px-[40px] px-[10px] fixed top-0 right-0 left-0 z-50'>
      {/* Logo */}
      <a href="/Home"><img src={Logo} alt="Logo" className="h-[70px] " /></a>

      

      {/* Navbar Links */}
      <ul className='items-center text-lg font-semibold flex w-[300px] justify-between mx-[30px] space-x-[20px]'>
        <a href="/Products"><li className="cursor-pointer hover:underline text-white hover:text-bluemk2">Products</li></a>
        <a href="/Projects"><li className="cursor-pointer hover:underline text-white hover:text-bluemk2">Projects</li></a>
        <a href="/Events"><li className="cursor-pointer hover:underline text-white hover:text-bluemk2">Events</li></a>
        <a href="/Users"><li className="cursor-pointer hover:underline text-white hover:text-bluemk2">Users</li></a>
      </ul>


      {/* Toggle and Account Button Container */}
      <div className="flex items-center sm:space-x-[30px] space-x-[10px]">
        {/* Account Button */}
        <div className='bg-thegrey text-theyellow h-[55px] w-[55px] border-2 rounded-full flex items-center justify-center text-3xl font-semibold hover:cursor-pointer' onClick={toggleMenu}>
          {`${name.charAt(0)}${lastname.charAt(0)}`.toUpperCase()}
        </div>
      </div>
    </div>




  );
}

export default Navbar;
