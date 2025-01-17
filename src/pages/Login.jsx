import React, { useState } from 'react'
import { Logo } from '../assets'

function Login() {
    const [email, setEmail] = useState('');
    const [passowrd, setPassword] = useState('');
    const [errorP, setErrorP] = useState('');
    const [errorE, setErrorE] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let hasErrors = false;

    if (!emailRegex.test(email)) {
        setErrorE('Invalid email format');
        hasErrors = true;
    } else {
        setErrorE('');
    }

    if (passowrd != "pass") {
        setErrorP('Incorect Email or password');
        hasErrors = true;
    } else {
        setErrorP('');
    }

    if (!hasErrors) {
        window.location.href = '/Home';
    }
    };

  return (
    <div className='sm:w-[450px] sm:h-[600px] sm:mt-[30px] bg-thegray place-self-center sm:rounded-xl border-2 border-bluemk3 drop-shadow-xl w-screen h-screen'>
        <div className='flex flex-col place-content-center '>

            <img src={Logo} alt="Logo" className='h-[120px] drop-shadow-xl self-center sm:mt-[20px] mt-[30px]' />
            <h1 className='self-center text-4xl font-bold'>Log in</h1>

                <form onSubmit={handleSubmit} className="flex flex-col place-content-center">
                    <div className='flex flex-col w-[250px] self-center'>
                        <label className='mt-[10px] ml-[8px]'>Email</label>
                        <div className={`w-full bg-offwhite border-2 h-[35px] rounded-xl flex items-center justify-center ${errorE ? 'mb-0 border-red-600' : 'mb-[16px] border-theblue'}`}>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='bg-thegray h-[25px] focus:outline-none focus:ring-0 w-[95%]' required />
                        </div>
                        {errorE && <p className='text-xs text-red-600'>{errorE}</p>}
                        <label className='ml-[8px]'>Password</label>
                        <div className={`w-full bg-offwhite border-2 h-[35px] rounded-xl flex items-center justify-center ${errorP ? 'border-red-600' : 'mb-[16px] border-theblue'}`}>
                            <input type="password" value={passowrd} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='bg-thegray h-[25px] focus:outline-none focus:ring-0 w-[95%]' required />
                        </div>
                        {errorP && <p className='text-xs text-red-600'>{errorP}</p>}
                        <a href="/PasswordRetrive" className='ml-[8px] hover:underline'>Forgot your password?</a>
                    </div>

                    <div className='flex flex-col mt-[40px]'>
                        <button type='submit' className='self-center bg-bluemk3  text-2xl font-semibold rounded-xl'>
                                Log in
                        </button>
                    </div>
                </form>
                <a href="/Signup" className='self-center'>    
                    <button className=' border-[3px] border-bluemk3 text-2xl font-semibold rounded-xl mt-[20px]' onClick="/">
                        Sign up
                    </button>
                </a>
        </div>
    </div>
  )
}

export default Login