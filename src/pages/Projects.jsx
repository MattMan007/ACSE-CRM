import React, { useState } from 'react';
import { Navbar, AccountMenu, ChangePass, EditParticipants } from '../components';
import { projects } from '../data/projects'; // Import projects data
import { users } from '../data/users'; // Import users data
import { products } from '../data/products'; // Import products data

function Projects() {
    const [currentView, setCurrentView] = useState(null);
    const [isBurgOpen, setIsBurgOpen] = useState(false);
    const [name, setName] = useState("Alexandru");
    const [lastname, setLastname] = useState("Cristescu");
    const [isEditParticipantsOpen, setIsEditParticipantsOpen] = useState(false); // State for EditParticipants visibility
    const [selectedProject, setSelectedProject] = useState(null); // Track selected project
    const [isModifyProjectOpen, setIsModifyProjectOpen] = useState(false); // State to control ModifyProject modal visibility

    // Function to toggle the Account Menu visibility
    const toggleMenu = () => {
        setCurrentView((prev) => (prev === 'menu' ? null : 'menu'));
    };

    const toggleBurg = () => {
        setIsBurgOpen((prev) => !prev);
    };

    // Handle project selection
    const handleSelectProject = (project) => {
        setSelectedProject(project);
    };

    // Handle Modify and Delete actions (dummy handlers for now)
    const handleModify = () => {
        alert("Modify project");
    };

    const handleDelete = () => {
        alert("Delete project");
    };

    // Function to open ModifyProject modal
    const openModifyProject = () => {
        setIsModifyProjectOpen(true);
    };

    // Function to close ModifyProject modal
    const closeModifyProject = () => {
        setIsModifyProjectOpen(false);
    };

    // Handle Save ModifyProject
    const handleSaveModifiedProject = (updatedProject) => {
        const updatedProjects = projects.map((project) =>
            project.id === updatedProject.id ? updatedProject : project
        );
        setSelectedProject(updatedProject); // Update selected project in state
    };

    // Get users associated with the selected project
    const getUsersForProject = (userIds) => {
        return users.filter((user) => userIds.includes(user.id));
    };

    // Get products associated with the selected project
    const getProductsForProject = (productIds) => {
        return products.filter((product) => productIds.includes(product.id));
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
                {/* Project List Section - Full-width and height */}
                <div className="flex-1 rounded-xl p-4 max-h-full mb-[30px] flex flex-col drop-shadow-xl overflow-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">Our Projects</h1>

                        {/* Button Group */}
                        <div className="flex gap-4">
                            {/* Add Project Button */}
                            <button
                                className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-all duration-300"
                            >
                                Add Project
                            </button>

                            {/* Modify Project Button */}
                            <button
                                className={`px-6 py-2 rounded-md ${selectedProject ? 'bg-bluemk3 text-white hover:bg-bluemk2' : 'bg-gray-400 text-gray-600 cursor-not-allowed'}`}
                                onClick={openModifyProject}
                                disabled={!selectedProject}
                            >
                                Modify
                            </button>

                            {/* Delete Project Button */}
                            <button
                                className={`px-6 py-2 rounded-md ${selectedProject ? 'bg-red-800 text-white hover:bg-red-600' : 'bg-gray-400 text-gray-600 cursor-not-allowed'}`}
                                onClick={handleDelete}
                                disabled={!selectedProject}
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* Grid layout for project items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className={`bg-bluemk3 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer ${selectedProject?.id === project.id ? 'border-2 border-bluemk1' : ''}`}
                                onClick={() => handleSelectProject(project)}
                            >
                                <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                                <p className="text-sm text-bluemk1 mb-4">{project.description}</p>
                                <p className="font-semibold text-lg">Client: {project.client}</p>
                                {/* Display associated users */}
                                <div className="mt-2">
                                    <strong>Users: </strong>
                                    {getUsersForProject(project.users).map((user) => (
                                        <span key={user.id} className="text-sm">{user.name} ({user.department}), </span>
                                    ))}
                                </div>
                                {/* Display associated products */}
                                <div className="mt-2">
                                    <strong>Products: </strong>
                                    {getProductsForProject(project.products).map((product) => (
                                        <span key={product.id} className="text-sm">{product.name} (€{product.price}), </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ModifyProject modal */}
            {isModifyProjectOpen && selectedProject && (
                <ModifyProduct
                    onBack={closeModifyProject}
                    project={selectedProject}
                    onSave={handleSaveModifiedProject}
                />
            )}
        </div>
    );
}

export default Projects;
