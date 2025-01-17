import React, { useState, useEffect } from 'react';

function ModifyProduct({ onBack, product, onSave }) {
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);

    // Update form fields when the product changes
    useEffect(() => {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
    }, [product]);

    const handleSave = () => {
        const updatedProduct = { ...product, name, description, price };
        onSave(updatedProduct); // Pass the updated product to the parent
        onBack(); // Close the modal
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="w-[450px] bg-white rounded-xl border-2 border-bluemk3 drop-shadow-xl p-6">
                <h2 className="text-2xl font-semibold mb-4">Modify Product</h2>
                <div className="mb-4">
                    <label className="block text-sm text-gray-500">Product Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm text-gray-500">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm text-gray-500">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                </div>
                <div className="flex justify-between gap-4">
                    <button
                        onClick={handleSave}
                        className="w-[100px] h-[40px] bg-bluemk3 text-white rounded-xl"
                    >
                        Save
                    </button>
                    <button
                        onClick={onBack}
                        className="w-[100px] h-[40px] bg-gray-500 text-white rounded-xl"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModifyProduct;
