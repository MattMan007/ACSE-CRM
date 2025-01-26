import React, { useState, useEffect } from 'react';
import { Navbar, AccountMenu, ChangePass, ModifyProduct, AddProduct } from '../components';
import { products as initialProducts } from '../data/products'; // Import products data

function Products() {
    const [currentView, setCurrentView] = useState(null);
    const [isBurgOpen, setIsBurgOpen] = useState(false);
    const [name, setName] = useState("Alexandru");
    const [lastname, setLastname] = useState("Cristescu");
    const [isEditParticipantsOpen, setIsEditParticipantsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModifyProductOpen, setIsModifyProductOpen] = useState(false);
    const [isAddProductOpen, setIsAddProductOpen] = useState(false); // State for AddProduct modal
    const [products, setProducts] = useState(initialProducts); // Local products state

    const toggleMenu = () => {
        setCurrentView((prev) => (prev === 'menu' ? null : 'menu'));
    };

    const toggleBurg = () => {
        setIsBurgOpen((prev) => !prev);
    };

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
    };

    const handleModify = () => {
        if (selectedProduct) {
            setIsModifyProductOpen(true); // Open the ModifyProduct modal
        }
    };

    const handleSaveProduct = (updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            )
        );
        setIsModifyProductOpen(false); // Close the ModifyProduct modal
    };

    const handleDelete = () => {
        if (selectedProduct) {
            const confirmDelete = window.confirm(
                `Are you sure you want to delete "${selectedProduct.name}"? This action cannot be undone.`
            );
            if (confirmDelete) {
                setProducts((prevProducts) =>
                    prevProducts.filter((product) => product.id !== selectedProduct.id)
                );
                setSelectedProduct(null); // Clear the selected product
            }
        }
    };

    const handleAddProduct = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        setIsAddProductOpen(false); // Close the AddProduct modal
    };

    useEffect(() => {
        if (currentView === 'changePass' || isModifyProductOpen || isAddProductOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [currentView, isModifyProductOpen, isAddProductOpen]);

    return (
        <div className="relative min-h-screen">
            <Navbar toggleMenu={toggleMenu} toggleBerg={toggleBurg} name={name} lastname={lastname} />
            {isBurgOpen && <Hamburger_menu toggleBurg={toggleBurg} />}
            {currentView === 'menu' && (
                <AccountMenu
                    toggleMenu={toggleMenu}
                    name={name}
                    lastname={lastname}
                    setName={setName}
                    setLastname={setLastname}
                    setCurrentView={setCurrentView}
                />
            )}
            {currentView === 'changePass' && <ChangePass onBack={() => setCurrentView('menu')} />}

            <div className="flex flex-col md:flex-row gap-8 p-6 w-full h-full mt-[80px]">
                <div className="flex-1 rounded-xl p-4 max-h-full mb-[30px] flex flex-col drop-shadow-xl overflow-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">Our Products</h1>

                        <div className="flex gap-4">
                            <button
                                className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-all duration-300"
                                onClick={() => setIsAddProductOpen(true)}
                            >
                                Add Product
                            </button>

                            <button
                                className={`px-6 py-2 rounded-md ${
                                    selectedProduct
                                        ? 'bg-bluemk3 text-white hover:bg-bluemk2'
                                        : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                }`}
                                onClick={handleModify}
                                disabled={!selectedProduct}
                            >
                                Modify
                            </button>

                            <button
                                className={`px-6 py-2 rounded-md ${
                                    selectedProduct
                                        ? 'bg-red-800 text-white hover:bg-red-600'
                                        : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                }`}
                                onClick={handleDelete}
                                disabled={!selectedProduct}
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className={`bg-bluemk3 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer ${
                                    selectedProduct?.id === product.id ? 'border-2 border-bluemk1' : ''
                                }`}
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

            {isAddProductOpen && (
                <AddProduct
                    onBack={() => setIsAddProductOpen(false)}
                    onSave={handleAddProduct}
                />
            )}

            {isModifyProductOpen && selectedProduct && (
                <ModifyProduct
                    product={selectedProduct}
                    onBack={() => setIsModifyProductOpen(false)}
                    onSave={handleSaveProduct}
                />
            )}
        </div>
    );
}

export default Products;
