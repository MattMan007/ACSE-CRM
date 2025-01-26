import React, { useState } from 'react';
import { users } from '../data/users'; // Import users data
import { products } from '../data/products'; // Import products data

function AddProject({ onBack, onSave }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [client, setClient] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleSave = () => {
        if (!name || !description || !client) {
            alert('Please fill in all required fields.');
            return;
        }

        const newProject = {
            id: Date.now(), // Generate a unique ID
            name,
            description,
            client,
            users: selectedUsers,
            products: selectedProducts,
        };

        onSave(newProject); // Pass the new project to the parent
        onBack(); // Close the modal
    };

    const handleUserToggle = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId) // Remove user
                : [...prevSelected, userId] // Add user
        );
    };

    const handleProductToggle = (productId) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.includes(productId)
                ? prevSelected.filter((id) => id !== productId) // Remove product
                : [...prevSelected, productId] // Add product
        );
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="w-[700px] h-[600px] bg-thegray rounded-xl border-2 border-bluemk3 drop-shadow-xl p-6 overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-4">Add New Project</h2>

                {/* Project Name */}
                <div className="mb-4">
                    <label className="block text-sm text-gray-500">Project Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 border rounded w-full"
                        placeholder="Enter project name"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-sm text-gray-500">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-2 border rounded w-full"
                        placeholder="Enter project description"
                    />
                </div>

                {/* Client */}
                <div className="mb-4">
                    <label className="block text-sm text-gray-500">Client</label>
                    <input
                        type="text"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                        className="p-2 border rounded w-full"
                        placeholder="Enter client name"
                    />
                </div>

                {/* Select Users */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-500">Users Handling the Project</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {users.map((user) => (
                            <button
                                key={user.id}
                                type="button"
                                onClick={() => handleUserToggle(user.id)}
                                className={`px-3 py-1 rounded-full ${
                                    selectedUsers.includes(user.id)
                                        ? 'bg-bluemk1 text-bluemk3'
                                        : 'bg-bluemk3 text-bluemk1 hover:bg-gray-200'
                                }`}
                            >
                                {user.name} ({user.department})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Select Products */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-500">Products Used in the Project</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {products.map((product) => (
                            <button
                                key={product.id}
                                type="button"
                                onClick={() => handleProductToggle(product.id)}
                                className={`px-3 py-1 rounded-full ${
                                    selectedProducts.includes(product.id)
                                        ? 'bg-bluemk1 text-bluemk3'
                                        : 'bg-bluemk3 text-bluemk1 hover:bg-gray-200'
                                }`}
                            >
                                {product.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between gap-4">
                    <button
                        onClick={handleSave}
                        className="w-[100px] h-[40px] bg-green-700 hover:bg-green-600 text-white rounded-xl"
                    >
                        Save
                    </button>
                    <button
                        onClick={onBack}
                        className="w-[100px] h-[40px] bg-gray-500 text-white rounded-xl hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddProject;
