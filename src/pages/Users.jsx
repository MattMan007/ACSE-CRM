import React, { useState } from 'react';
import { Navbar, AccountMenu, ChangePass} from '../components';
import { users } from '../data/users';

function Users() {
    const [currentView, setCurrentView] = useState(null);
    const [isBurgOpen, setIsBurgOpen] = useState(false);
    const [name, setName] = useState("Alexandru");
    const [lastname, setLastname] = useState("Cristescu");

    const [selectedUser, setSelectedUser] = useState(null);
    const [filters, setFilters] = useState({ department: "", score: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [editableUser, setEditableUser] = useState(null);

    const [dropdownOpen, setDropdownOpen] = useState(false); // For dropdown menu

    // Function to toggle the Account Menu visibility
    const toggleMenu = () => {
        setCurrentView((prev) => (prev === 'menu' ? null : 'menu'));
    };

    const toggleBurg = () => {
        setIsBurgOpen((prev) => !prev);
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setEditableUser({ ...user });
        setIsEditing(false);
        setTags(user.tags || []); // Load user's tags
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableUser((prev) => ({ ...prev, [name]: value }));
    };

    const filteredUsers = users.filter((user) => {
        return (
            (filters.department === "" || user.department === filters.department) &&
            (filters.score === "" || user.score === filters.score)
        );
    });

    // Dropdown toggle function
    const toggleDropdown = () => setDropdownOpen((prev) => !prev);

    return (
        <div className="relative pt-[80px]">
            {/* Pass the toggleMenu function and name/lastname to Navbar */}
            <Navbar toggleMenu={toggleMenu} toggleBerg={toggleBurg} name={name} lastname={lastname} />
            {/* Render AccountMenu based on isMenuOpen */}
            {isBurgOpen && <Hamburger_menu toggleBurg={toggleBurg} />}
            {currentView === 'menu' && (<AccountMenu toggleMenu={toggleMenu} name={name} lastname={lastname} setName={setName} setLastname={setLastname} setCurrentView={setCurrentView} />)}
            {currentView === 'changePass' && (<ChangePass onBack={() => setCurrentView('menu')} />)}

            {/* Main Page Content */}
            <div className="md:flex-row flex-col flex gap-8 p-6">
                {/* User List Section */}
                <div className="md:w-1/3 w-full min-w-[450px] rounded-xl p-4 max-h-[750px] mb-[30px] flex flex-col drop-shadow-xl">
                    {/* Filters Section */}
                    <div className="flex justify-between mx-[40px] mb-4">
                        <select name="department" value={filters.department} onChange={handleFilterChange} className="p-2 border rounded-lg bg-offwhite shadow-inner">
                            <option value="">Department</option>
                            <option value="Accounting">Accounting</option>
                            <option value="HR">HR</option>
                            <option value="Marketing">Marketing</option>
                            <option value="IT">IT</option>
                        </select>
                    </div>

                    {/* User List */}
                    <div className="overflow-y-auto flex-1">
                        {filteredUsers.map((user) => (
                            <div key={user.id} className={`flex items-center justify-between bg-bluemk3 p-4 mb-2 rounded-xl w-[95%] shadow cursor-pointer hover:bg-gray-100 ${selectedUser?.id === user.id ? "border-2 border-bluemk1" : ""}`} onClick={() => handleSelectUser(user)}>
                                <div className="flex items-center">
                                    <div className="h-10 w-10 bg-dark text-white rounded-full text-xl font-semibold flex items-center justify-center mr-4">
                                        {`${user.name.charAt(0)}${user.lastname.charAt(0)}`}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{`${user.name} ${user.lastname}`}</p>
                                        <p className="text-sm text-bluemk1">{user.department}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Campaigns Section */}
                <div className="md:w-2/3 w-full min-w-[400px]">
                    {/* User Details Section */}
                    <div className='bg-thelightblue rounded-xl p-6 drop-shadow-xl'>
                        {selectedUser ? (
                            <div>
                                <div className="flex items-center mb-4">
                                    <div className="h-12 w-12 bg-bluemk2 text-theyellow rounded-full flex items-center justify-center mr-4">
                                        {`${selectedUser.name.charAt(0)}${selectedUser.lastname.charAt(0)}`}
                                    </div>
                                    <h2 className="text-2xl font-semibold">{`${selectedUser.name} ${selectedUser.lastname}`}</h2>
                                    
                                    {/* Dropdown Button */}
                                    <div className="ml-auto relative">
                                        <button onClick={toggleDropdown} className="px-4 py-2 bg-theblue text-theyellow rounded-full">
                                            &#9660;
                                        </button>
                                        {dropdownOpen && (
                                            <div className="absolute right-0 bg-dark shadow-lg rounded-lg mt-2 w-[200px]">
                                                <button onClick={() => setIsEditing((prev) => !prev)} className="w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-thegray" >{isEditing ? "Save" : "Edit User"}</button>
                                                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-thegray" onClick={() => alert("Delete User")}>Delete User</button>
                                                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-thegray" onClick={() => alert("Reset Password")}>Reset Password</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                    <div>
                                        <label className="text-sm text-gray-500">Name</label>
                                        <input type="text" name="name" value={editableUser.name} onChange={handleInputChange} disabled={!isEditing} className="p-2 border bg-offwhite rounded w-full"/>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Surname</label>
                                        <input type="text" name="lastname" value={editableUser.lastname} onChange={handleInputChange} disabled={!isEditing} className="p-2 border bg-offwhite rounded w-full" />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Email Address</label>
                                        <input type="email" name="email" value={editableUser.email} onChange={handleInputChange} disabled={!isEditing} className="p-2 border bg-offwhite rounded w-full" />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Phone Number</label>
                                        <input type="text" name="phone" value={editableUser.phone} onChange={handleInputChange} disabled={!isEditing} className="p-2 border bg-offwhite rounded w-full" />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Department</label>
                                        <select value={editableUser.department} onChange={handleInputChange} disabled={!isEditing} className="p-2 border bg-offwhite rounded w-full" >
                                            <option>Department</option>
                                            <option value="Accounting">Accounting</option>
                                            <option value="HR">HR</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="IT">IT</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500">Select a user to see details</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;
