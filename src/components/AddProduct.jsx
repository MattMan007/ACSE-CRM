import React, { useState } from 'react';

function AddProduct({ onBack, onSave }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleSave = () => {
        if (!name || !description || !price) {
            alert("All fields are required!");
            return;
        }
        const newProduct = { id: Date.now(), name, description, price: parseFloat(price) };
        onSave(newProduct); // Pass the new product to the parent
        onBack(); // Close the modal
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="w-[650px] h-[450px] bg-thegray rounded-xl border-2 border-bluemk3 drop-shadow-xl p-6">
                <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
                <div className="mb-4">
                    <label className="block text-sm text-gray-500">Product Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 border rounded w-full"
                        placeholder="Enter product name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm text-gray-500">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-2 border rounded w-full"
                        placeholder="Enter product description"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm text-gray-500">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="p-2 border rounded w-full"
                        placeholder="Enter product price"
                    />
                </div>
                <div className="flex justify-between gap-4">
                    <button
                        onClick={handleSave}
                        className="w-[100px] h-[40px] bg-green-600 text-white rounded-xl hover:bg-green-500"
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

export default AddProduct;
