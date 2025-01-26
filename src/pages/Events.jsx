import React, { useState, useEffect } from 'react';
import { Navbar, AccountMenu, ChangePass, EditParticipants } from '../components';
import { events } from '../data/events'; // Import your events data

function Events() {
    const [currentView, setCurrentView] = useState(null);
    const [isBurgOpen, setIsBurgOpen] = useState(false);
    const [name, setName] = useState("Alexandru");
    const [lastname, setLastname] = useState("Cristescu");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditParticipantsOpen, setIsEditParticipantsOpen] = useState(false); // State for EditParticipants visibility

    // Function to toggle the Account Menu visibility
    const toggleMenu = () => {
        setCurrentView((prev) => (prev === 'menu' ? null : 'menu'));
    };

    const toggleBurg = () => {
        setIsBurgOpen((prev) => !prev);
    };

    // Function to handle event selection
    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setIsEditing(false); // Reset editing mode when selecting a new event
        setDropdownOpen(false); // Close the dropdown if selecting an event
    };

    // Function to toggle the dropdown menu
    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    // Handle input changes when editing event
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedEvent((prev) => ({ ...prev, [name]: value }));
    };

    // Handle save after editing the event
    const handleSaveEvent = () => {
        // Here you can save the event details to your backend or state
        setIsEditing(false);
    };

    // Function to open EditParticipants modal
    const openEditParticipants = () => {
        setIsEditParticipantsOpen(true);
        setDropdownOpen(false); // Close the dropdown when opening EditParticipants
    };

    // Function to close EditParticipants modal
    const closeEditParticipants = () => {
        setIsEditParticipantsOpen(false);
    };

    useEffect(() => {
        if (currentView === 'changePass' || isEditParticipantsOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [currentView, isEditParticipantsOpen]);

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
                {/* Event List Section */}
                <div className="md:w-[500px] w-[400px] rounded-xl p-4 max-h-[750px] mb-[30px] flex flex-col drop-shadow-xl">
                    {/* Event List */}
                    <div className="overflow-y-auto flex-1">
                        {events.map((event) => (
                            <div key={event.id} className={`flex items-center justify-between bg-bluemk3 p-4 mb-2 rounded-xl w-full shadow cursor-pointer hover:bg-gray-100 ${selectedEvent?.id === event.id ? "border-2 border-bluemk1" : ""}`} onClick={() => handleSelectEvent(event)}>
                                <div className="flex items-center">
                                    <div className="h-10 w-10 bg-dark text-white rounded-full text-xl font-semibold flex items-center justify-center mr-4">
                                        {`${event.name.charAt(0)}${event.name.charAt(1)}`}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{event.name}</p>
                                        <p className="text-sm text-bluemk1">{new Date(event.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Event Details Section */}
                <div className="md:w-[600px] w-full min-w-[600px]">
                    <div className='rounded-xl p-6 drop-shadow-xl'>
                        {selectedEvent ? (
                            <div>
                                <div className="flex items-center mb-4">
                                    <div className="h-12 w-12 bg-bluemk2 text-theyellow rounded-full flex items-center justify-center mr-4">
                                        {`${selectedEvent.name.charAt(0)}${selectedEvent.name.charAt(1)}`}
                                    </div>
                                    <h2 className="text-2xl font-semibold">{selectedEvent.name}</h2>
                                    
                                    {/* Dropdown Button */}
                                    <div className="ml-auto relative">
                                        <button onClick={toggleDropdown} className="px-4 py-2 bg-theblue text-theyellow rounded-full">
                                            &#9660;
                                        </button>
                                        {dropdownOpen && (
                                            <div className="absolute right-0 bg-dark shadow-lg rounded-lg mt-2 w-[200px]">
                                                <button onClick={() => setIsEditing((prev) => !prev)} className="w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-thegray">{isEditing ? "Save" : "Edit Event"}</button>
                                                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-thegray">Delete Event</button>
                                                <button onClick={openEditParticipants} className="w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-thegray">Edit Participants</button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Event Editable Fields */}
                                {isEditing ? (
                                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-500">Event Name</label>
                                            <input type="text" name="name" value={selectedEvent.name} onChange={handleInputChange} className="p-2 border bg-offwhite rounded w-full" />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-500">Event Date</label>
                                            <input type="date" name="date" value={new Date(selectedEvent.date).toISOString().split("T")[0]} onChange={handleInputChange} className="p-2 border bg-offwhite rounded w-full" />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-500">Location</label>
                                            <input type="text" name="location" value={selectedEvent.location} onChange={handleInputChange} className="p-2 border bg-offwhite rounded w-full" />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-500">Participants</label>
                                            <input type="text" name="participants" value={selectedEvent.participants.join(", ")} onChange={handleInputChange} className="p-2 border bg-offwhite rounded w-full" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                        <div><p><strong>Event Name:</strong> {selectedEvent.name}</p></div>
                                        <div><p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}</p></div>
                                        <div><p><strong>Location:</strong> {selectedEvent.location}</p></div>
                                        <div><p><strong>Participants:</strong> {selectedEvent.participants.join(", ")}</p></div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-500">Select an event to see details</p>
                        )}
                    </div>
                </div>
            </div>

            {/* EditParticipants modal */}
            {isEditParticipantsOpen && selectedEvent && (
                <EditParticipants 
                    onBack={closeEditParticipants} 
                    event={selectedEvent} 
                    setEvent={setSelectedEvent} 
                />
            )}
        </div>
    );
}

export default Events;
