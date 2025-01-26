import React, { useState } from 'react';
import { users } from '../data/users'; // Import users data

function EditParticipants({ onBack, event, setEvent }) {
    const [selectedParticipants, setSelectedParticipants] = useState(event.participants);
    
    // Function to handle adding a user to participants
    const handleAddParticipant = (user) => {
        if (!selectedParticipants.includes(user)) {
            setSelectedParticipants((prev) => [...prev, user]);
        }
    };

    // Function to handle removing a user from participants
    const handleRemoveParticipant = (user) => {
        setSelectedParticipants((prev) => prev.filter((p) => p !== user));
    };

    // Function to submit the updated participants list
    const handleSubmit = (e) => {
        e.preventDefault();
        setEvent((prev) => ({ ...prev, participants: selectedParticipants })); // Update the parent event state with the new participants
        onBack();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="w-[700px] h-[650px] bg-thegray rounded-xl border-2 border-bluemk3 drop-shadow-xl p-6">
                <h1 className="text-2xl font-bold text-center mb-4">Edit Participants</h1>
                <p className="text-sm text-center text-banace mb-6">
                    Add or remove participants for the selected event.
                </p>

                {/* Display selected participants with fixed height */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Selected Participants:</h2>
                    <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto">
                        {selectedParticipants.map((participant, index) => (
                            <div
                                key={index}
                                className="bg-theblue text-theyellow px-3 py-1 rounded-full flex items-center gap-2"
                            >
                                <span>{participant.name} {participant.lastname}</span>
                                <button
                                    type="button"
                                    className="text-red-500 font-bold"
                                    onClick={() => handleRemoveParticipant(participant)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                        {selectedParticipants.length === 0 && (
                            <p className="text-sm text-gray-500">No participants selected.</p>
                        )}
                    </div>
                </div>

                {/* Display all available users */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Available Users:</h2>
                    <div className="flex flex-wrap gap-2">
                        {users.map((user) => (
                            <button
                                key={user.id}
                                type="button"
                                className={`px-3 py-1 rounded-full ${
                                    selectedParticipants.includes(user)
                                        ? 'bg-bluemk1 text-bluemk3 cursor-not-allowed'
                                        : 'bg-bluemk3 text-bluemk1 hover:bg-gray-200'
                                }`}
                                disabled={selectedParticipants.includes(user)}
                                onClick={() => handleAddParticipant(user)}
                            >
                                {user.name} {user.lastname}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                    <button
                        type="submit"
                        className="w-[150px] h-[50px] bg-theblue text-theyellow text-xl font-semibold rounded-xl"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="w-[150px] h-[50px] bg-gray-500 text-white text-xl font-semibold rounded-xl"
                        onClick={onBack}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditParticipants;
