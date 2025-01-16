import React, { useState } from 'react';


function AccountMenu({ toggleMenu, name, lastname, setName, setLastname, setCurrentView }) {

  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [editMode, setEditMode] = useState(false);


  return (
    <div className="fixed top-0 right-0 xm:w-[45%] md:w-[35%] w-full h-full bg-bluemk2 text-offwhite shadow-xl z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-bluemk3 shadow-md h-[70px]">
        <div className="flex items-center gap-4">
          <div className="h-[55px] w-[55px] bg-offwhite text-theblue rounded-full flex items-center justify-center text-3xl font-bold">
            {`${name.charAt(0)}${lastname.charAt(0)}`.toUpperCase()}
          </div>
          <span className="text-xl font-semibold">{name} {lastname}</span>
        </div>
        <button onClick={toggleMenu} className="text-2xl bg-bluemk3">&times;</button>
      </div>
      {/* Acc ount Information */}
      <div className="p-6 space-y-4">
        {/* Name Row */}
        <div className="flex justify-between">
          <div className='flex flex-col'>
            <label className="block text-sm">Name</label>
            <input type="name" value={name} onChange={(e) => setName(e.target.value)} disabled={!editMode} className="w-full bg-offwhite text-theblue rounded-md px-3 py-1 outline-none drop-shadow-lg" />
          </div>
          <div className='flex flex-col w-12'>
            <label className="block text-sm">Age</label>
            <input type="age" value={age} onChange={(e) => setAge(e.target.value)} disabled={!editMode} className="w-full bg-offwhite text-theblue rounded-md px-3 py-1 outline-none drop-shadow-lg" />
          </div>
        </div>

        {/* Surname Row */}
        <div className="flex justify-between">
          <div className="flex flex-col">
            <label className="block text-sm">Last Name</label>
            <input type="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} disabled={!editMode} className="w-full bg-offwhite text-theblue rounded-md px-3 py-1 outline-none drop-shadow-lg" />
          </div>
          <div className="w-30">
            <label className="block text-sm">Sex</label>
            <select disabled={!editMode} className="w-full bg-offwhite text-theblue rounded-md px-3 py-1 outline-none drop-shadow-lg">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm">Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!editMode} className="w-full bg-offwhite text-theblue rounded-md px-3 py-1 outline-none drop-shadow-lg" />
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm">Department</label>
          <select disabled={!editMode} className="w-full bg-offwhite text-theblue rounded-md px-3 py-1 outline-none drop-shadow-lg">
            <option>IT</option>
            <option>Leagal</option>
            <option>Sales</option>
            <option>HR</option>

          </select>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm">Phone Number</label>
          <input type="text" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} disabled={!editMode} className="w-full bg-offwhite text-theblue rounded-md px-3 py-1 outline-none drop-shadow-lg" />
        </div>

        {/* Change Password Button */}
        <div className="text-center">
          <button onClick={() => setCurrentView('changePass')}  className="bg-bluemk3 text-offwhite px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-thegray mr-[20px]">
            Change Password
          </button>
          <button onClick={() => setEditMode(!editMode)} className="bg-bluemk3 text-offwhite px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-thegray" >
            {editMode ? "Save Info" : "Edit Info"}
          </button>
        </div>
        <div className='flex justify-center'>
          <a href="/Login">
            <button className='bg-thegray text-white hover:bg-white hover:text-thegray text-2xl font-semibold rounded-xl'>
              Log out
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AccountMenu;
