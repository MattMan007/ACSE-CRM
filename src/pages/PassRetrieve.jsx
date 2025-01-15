import React , {useState} from 'react'
import { Logo } from '../assets'

function PassRetrieve() {

    const [email, setEmail] = useState('');
    const [errorE, setErrorE] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        setErrorE('Invalid email format');
        return;
    }
        setErrorE('');
        window.location.href = '/Login';
    };

  return (
    <div className='sm:w-[450px] sm:h-[450px] sm:mt-[30px] bg-thegray place-self-center sm:rounded-xl border-2 border-bluemk3 drop-shadow-xl w-screen h-screen'>
        <div className='flex flex-col place-content-center'>
            <img src={Logo} alt="Logo" className='h-[120px] drop-shadow-xl self-center sm:mt-[20px] mt-[30px]' />
            <h1 className='self-center text-3xl font-bold'>Retrieve Password</h1>
            <p className='w-[50%] text-center self-center text-banace'>Insert your email below.</p>
            
            <form onSubmit={handleSubmit} className="self-center flex flex-col place-content-center">
                <div className='flex flex-col w-[250px] self-center'>
                    <label className='mt-[20px] ml-[8px]'>Email</label>
                    <div className={`w-full bg-offwhite border-2 h-[35px] rounded-xl flex items-center justify-center ${errorE ? 'mb-0 border-red-600' : 'mb-4 border-theblue'}`}>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='bg-thegray h-[25px] focus:outline-none focus:ring-0 w-[93%]' />
                    </div>
                    {errorE && <p className='text-xs text-red-600'>{errorE}</p>}
                </div>
                <div className='flex flex-col mt-[40px]'>
                        <button className='self-center w-[150px] h-[50px] bg-theblue text-theyellow text-2xl font-semibold rounded-xl'>
                            Send
                        </button>
                </div>
            </form>

        </div>
    </div>
  )
}

export default PassRetrieve