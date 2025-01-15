import React, { useState } from 'react';
import { Navbar, AccountMenu, ChangePass } from '../components';

function Users() {
    const [currentView, setCurrentView] = useState(null);
    const [isBurgOpen, setIsBurgOpen] = useState(false);
    const [name, setName] = useState("Alexandru");
    const [lastname, setLastname] = useState("Cristescu");
    const [isAdmin, setIsAdmin] = useState(false);


    // Function to toggle the Account Menu visibility
    const toggleMenu = () => {
        setCurrentView((prev) => (prev === 'menu' ? null : 'menu'));
    };

    const toggleBurg = () => {
        setIsBurgOpen((prev) => !prev);
    };
    
    return (
        <div className="relative pt-[80px]">
            {/* Pass the toggleMenu function and name/lastname to Navbar */}
            <Navbar toggleMenu={toggleMenu} toggleBerg={toggleBurg} name={name} lastname={lastname} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
            {/* Render AccountMenu based on isMenuOpen */}
            {currentView === 'menu' && (<AccountMenu toggleMenu={toggleMenu} name={name} lastname={lastname} setName={setName} setLastname={setLastname} setCurrentView={setCurrentView} />)}
            {currentView === 'changePass' && (<ChangePass onBack={() => setCurrentView('menu')} />)}

            {/* Your main page content */}
            <div className="p-[50px] w-full flex flex-row gap-6 space-x-[5%]">
                <div className='p-[30px] w-[65%] h-[700px] rounded-xl drop-shadow-xl bg-thelightblue'>
                    <div className='text-center text-3xl font-bold'>Campaign overview</div>
                    <div>Select campaign</div>
                    <div>campaing info like date and type or whatever</div>
                </div>
                <div className='p-[30px] w-[30%] h-[700px] rounded-xl drop-shadow-xl bg-thelightblue'>
                    <div className='text-center text-3xl font-bold'>Score</div>
                    <div>Graph</div>
                    <div>You are in the top 3% of the company! Congratulations!</div>
                </div>
            </div>
        </div>
    );
}

export default Users;
