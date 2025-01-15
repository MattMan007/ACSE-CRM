import React, { useState } from 'react'
import { Logo } from '../assets'

function Signup() {
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [errorP, setErrorP] = useState('');
    const [errorE, setErrorE] = useState('');
    const [notMatch,setNotMatch] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

        let hasErrors = false;

    if (!emailRegex.test(email)) {
        setErrorE('Invalid email format');
        hasErrors = true;
    } else {
        setErrorE('');
    }

    if (!passwordRegex.test(password)) {
        setErrorP('Password must be at least 10 characters long and include: one uppercase letter, one lowercase letter, one number, and one special character');
        hasErrors = true;
        setNotMatch(false);
    } else if (password !== confirmpassword) {
        setErrorP('Passwords do not match');
        setNotMatch(true);
        hasErrors = true;
    } else {
        setErrorP('');
        setNotMatch(false);
    }

    if (!hasErrors) {
        window.location.href = '/Login';
    }
    };

  return (
    <div className='sm:w-[450px] sm:h-[650px] sm:mt-[10px] bg-thegray place-self-center sm:rounded-xl border-2 border-bluemk3 drop-shadow-xl w-screen h-screen'>
        <div className='flex flex-col place-content-center'>
            <img src={Logo} alt="Logo" className='h-[120px] drop-shadow-xl self-center sm:mt-[5px] mt-[10px]' />
            <h1 className='self-center text-3xl font-bold'>Sign up</h1>
                <form onSubmit={handleSubmit} className="flex flex-col place-content-center">
                    <div className='flex flex-col w-[250px] self-center'>
                        <label className='mt-[0px] ml-[8px]'>Name</label>
                        <div className='w-full bg-offwhite border-2 h-[35px] border-theblue rounded-xl flex items-center justify-center'>
                            <input type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='bg-offwhite h-[25px] focus:outline-none focus:ring-0 w-[95%]' required />
                        </div>
                        <label className='ml-[8px]'>Last name</label>
                        <div className='w-full bg-offwhite border-2 h-[35px] border-theblue rounded-xl flex items-center justify-center'>
                            <input type="lastname" value={lastname} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' className='bg-offwhite h-[25px] focus:outline-none focus:ring-0 w-[95%]' required />
                        </div>
                        <label className='ml-[8px]'>Email</label>
                        <div className={`w-full bg-offwhite border-2 h-[35px] rounded-xl flex items-center justify-center ${errorE ? 'mb-0 border-red-600' : 'mb-[16px] border-theblue'}`}>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='bg-offwhite h-[25px] focus:outline-none focus:ring-0 w-[95%]' required />
                        </div>
                        {errorE && <p className='text-xs text-red-600'>{errorE}</p>}
                        <label className='mt-[10px] ml-[8px]'>Password</label>
                        <div className={`w-full bg-offwhite border-2 h-[35px] rounded-xl flex items-center justify-center ${errorP ? 'border-red-600' : 'border-theblue'}`}>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='bg-offwhite h-[25px] focus:outline-none focus:ring-0 w-[95%]' required />
                        </div>
                        <label className='ml-[8px]'>Confirm password</label>
                        <div className={`w-full bg-offwhite border-2 h-[35px] rounded-xl flex items-center justify-center ${errorP ? 'border-red-600' : 'mb-[64px] border-theblue'}`}>
                            <input type="password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' className='bg-offwhite h-[25px] focus:outline-none focus:ring-0 w-[95%]' required />
                        </div>
                        {errorP && <p className={`text-xs text-red-600 ${notMatch ? 'mb-[48px]' : 'mb-0'}`}>{errorP}</p>}
                    </div>
                    <div className='flex flex-col mt-[10px]'>
                        <button type="submit" className='self-center w-[150px] h-[50px] bg-theblue text-theyellow text-2xl font-semibold rounded-xl'>
                            Submit
                        </button>
                        
                    </div>
                </form>
        </div>
    </div>
  )
}

export default Signup