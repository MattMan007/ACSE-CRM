import React , {useState} from 'react'
import { Logo } from '../assets'

function ResetPassword() {

    const [passowrd, setPassword] = useState('');
    const [confirmpassowrd, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [notMatch,setNotMatch] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

        setNotMatch(false);

        if (!passwordRegex.test(passowrd)) {
            setError('Password must be at least 10 characters long and include: one uppercase letter, one lowercase letter, one number, and one special character');
            return
        } else if (passowrd !== confirmpassowrd) {
            setError('Passwords do not match');
            setNotMatch(true);
            return
        }

        setError('');
        window.location.href = '/Login';
    };

  return (
    <div className='sm:w-[450px] sm:h-[550px] sm:mt-[20px] bg-thegary place-self-center sm:rounded-xl border-2 border-theblue drop-shadow-xl w-screen h-screen'>
        <div className='flex flex-col place-content-center'>
            <img src={Logo} alt="Logo" className='h-[120px] drop-shadow-xl self-center sm:mt-[10px] mt-[20px]' />
            <h1 className='self-center text-3xl font-bold'>Reset Password</h1>
            <p className='w-[50%] text-center self-center text-banace'>Enter your new password and confirm it below.</p>
                <form onSubmit={handleSubmit} className="flex flex-col place-content-center">
                    <div className='flex flex-col w-[250px] self-center'>
                        <label className='mt-[10px] ml-[8px]'>New Password</label>
                        <div className={`w-full bg-offwhite border-2 h-[35px] rounded-xl flex items-center justify-center ${error ? 'border-red-600' : 'border-theblue'}`}>
                            <input type="password" value={passowrd} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='bg-offwhite h-[25px] focus:outline-none focus:ring-0 w-[95%]' required />
                        </div>
                        <label className='ml-[8px]'>Confirm New password</label>
                        <div className={`w-full bg-offwhite border-2 h-[35px] rounded-xl flex items-center justify-center ${error ? 'border-red-600' : 'mb-[64px] border-theblue'}`}>
                            <input type="password" value={confirmpassowrd} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' className='bg-offwhite h-[25px] focus:outline-none focus:ring-0 w-[95%]' required />
                        </div>
                        {error && <p className={`text-xs text-red-600 ${notMatch ? 'mb-[48px]' : 'mb-0'}`}>{error}</p>}
                    </div>
                    <div className='flex flex-col mt-[40px]'>
                        <button type="submit" className='self-center w-[150px] h-[50px] bg-theblue text-theyellow text-2xl font-semibold rounded-xl'>
                            Submit
                        </button>
                        
                    </div>
                </form>
        </div>
    </div>
  )
}

export default ResetPassword