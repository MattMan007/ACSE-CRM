import React, { useState } from 'react';

function ChangePass({ onBack }) {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [notMatch, setNotMatch] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

        setNotMatch(false);

        if (oldPassword !== "pass") {
            setError('Wrong password');
            setNotMatch(true);
            return;
        } else if (!passwordRegex.test(password)) {
            setError(
                'Password must be at least 10 characters long and include: one uppercase letter, one lowercase letter, one number, and one special character'
            );
            return;
        } else if (password !== confirmPassword) {
            setError('Passwords do not match');
            setNotMatch(true);
            return;
        }

        setError('');
        onBack(); // Navigate back to AccountMenu
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="w-[450px] h-[550px] mt-[20px] bg-thelightblue place-self-center rounded-xl border-2 border-theblue drop-shadow-xl">
                <div className="flex flex-col place-content-center">
                    <h1 className="mt-[20px] self-center text-3xl font-bold">Change Password</h1>
                    <p className="w-[50%] text-center self-center text-banace">
                        Enter your new password and confirm it below.
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col place-content-center">
                        <div className="flex flex-col w-[250px] self-center">
                            <label className="mt-[10px] ml-[8px]">Old Password</label>
                            <div className={`w-full bg-offwhite border-2 h-[35px] rounded-xl flex items-center justify-center ${error ? 'border-red-600' : 'border-theblue'}`} >
                                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Old Password" className="bg-offwhite h-[25px] focus:outline-none focus:ring-0 w-[95%]" required/>
                            </div>
                            <label className="ml-[8px]">New Password</label>
                            <div className={`w-full bg-offwhite border-2 h-[35px] rounded-xl flex items-center justify-center ${error ? 'border-red-600' : 'border-theblue'}`}>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" className="bg-offwhite h-[25px] focus:outline-none focus:ring-0 w-[95%]" required />
                            </div>
                            <label className="ml-[8px]">Confirm New Password</label>
                            <div className={`w-full bg-offwhite border-2 h-[35px] rounded-xl flex items-center justify-center ${error ? 'mb-0 border-red-600' : 'mb-[64px] border-theblue'}`}>
                                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" className="bg-offwhite h-[25px] focus:outline-none focus:ring-0 w-[95%]" required/>
                            </div>
                            {error && (<p className={`text-xs text-red-600 ${notMatch ? 'mb-[48px]' : 'mb-0'}`}>{error}</p>)}
                        </div>
                        <div className="flex flex-col mt-[40px]">
                            <button type="submit" className="self-center w-[150px] h-[50px] bg-theblue text-theyellow text-2xl font-semibold rounded-xl">
                                Submit
                            </button>
                            {/* Back Button */}
                            <button type="button" onClick={onBack} className="self-center mt-4 w-[150px] h-[50px] bg-gray-500 text-white text-xl font-semibold rounded-xl">
                                Back
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangePass;
