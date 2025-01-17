import React, { useState } from 'react';
import { Navbar, AccountMenu, ChangePass, EditParticipants } from '../components';
import { products } from '../data/products'; // Import products data

function Products() {
    const [currentView, setCurrentView] = useState(null);
    const [isBurgOpen, setIsBurgOpen] = useState(false);
    const [name, setName] = useState("Alexandru");
    const [lastname, setLastname] = useState("Cristescu");
    const [isEditParticipantsOpen, setIsEditParticipantsOpen] = useState(false); // State for EditParticipants visibility
    const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product

    // Function to toggle the Account Menu visibility
    const toggleMenu = () => {
        setCurrentView((prev) => (prev === 'menu' ? null : 'menu'));
    };

    const toggleBurg = () => {
        setIsBurgOpen((prev) => !prev);
    };

    // Function to open EditParticipants modal
    const openEditParticipants = () => {
        setIsEditParticipantsOpen(true);
    };

    // Function to close EditParticipants modal
    const closeEditParticipants = () => {
        setIsEditParticipantsOpen(false);
    };

    // Handle product selection
    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
    };

    // Handle Modify and Delete actions (dummy handlers for now)
    const handleModify = () => {
        alert("Modify product");
    };

    const handleDelete = () => {
        alert("Delete product");
    };

    return (
        <div className="relative min-h-screen">
            {/* Pass the toggleMenu function and name/lastname to Navbar */}
            <Navbar toggleMenu={toggleMenu} toggleBerg={toggleBurg} name={name} lastname={lastname} />
            {/* Render AccountMenu based on isMenuOpen */}
            {isBurgOpen && <Hamburger_menu toggleBurg={toggleBurg} />}
            {currentView === 'menu' && (<AccountMenu toggleMenu={toggleMenu} name={name} lastname={lastname} setName={setName} setLastname={setLastname} setCurrentView={setCurrentView} />)}
            {currentView === 'changePass' && (<ChangePass onBack={() => setCurrentView('menu')} />)}

            {/* Main Page Content - Full-screen layout */}
            <div className="flex flex-col md:flex-row gap-8 p-6 w-full h-full mt-[80px]">
                {/* Product List Section - Full-width and height */}
                <div className="flex-1 rounded-xl p-4 max-h-full mb-[30px] flex flex-col drop-shadow-xl overflow-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">Our Products</h1>

                        {/* Button Group */}
                        <div className="flex gap-4">
                            {/* Add Product Button */}
                            <button
                                className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-all duration-300"
                            >
                                Add Product
                            </button>

                            {/* Modify Product Button */}
                            <button
                                className={`px-6 py-2 rounded-md ${selectedProduct ? 'bg-bluemk3 text-white hover:bg-bluemk2' : 'bg-gray-400 text-gray-600 cursor-not-allowed'}`}
                                onClick={handleModify}
                                disabled={!selectedProduct}
                            >
                                Modify
                            </button>

                            {/* Delete Product Button */}
                            <button
                                className={`px-6 py-2 rounded-md ${selectedProduct ? 'bg-red-800 text-white hover:bg-red-600' : 'bg-gray-400 text-gray-600 cursor-not-allowed'}`}
                                onClick={handleDelete}
                                disabled={!selectedProduct}
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* Grid layout for product items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className={`bg-bluemk3 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer ${selectedProduct?.id === product.id ? 'border-2 border-bluemk1' : ''}`}
                                onClick={() => handleSelectProduct(product)}
                            >
                                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                <p className="text-sm text-bluemk1 mb-4">{product.description}</p>
                                <p className="font-semibold text-lg">€{product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* EditParticipants modal */}
            {isEditParticipantsOpen && (
                <EditParticipants 
                    onBack={closeEditParticipants} 
                    setEvent={() => {}} 
                />
            )}
        </div>
    );
}

export default Products;
