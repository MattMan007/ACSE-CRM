import React, { useState } from 'react';
import { Navbar, AccountMenu, ChangePass } from '../components';
import { events } from '../data/events'; // Import events data
import { projects } from '../data/projects'; // Import projects data
import { products } from '../data/products'; // Import products data

function Home() {
    const [currentView, setCurrentView] = useState(null);
    const [isBurgOpen, setIsBurgOpen] = useState(false);
    const [name, setName] = useState("John");
    const [lastname, setLastname] = useState("Doe");
    const [isAdmin, setIsAdmin] = useState(false);

    const toggleMenu = () => {
        setCurrentView((prev) => (prev === 'menu' ? null : 'menu'));
    };

    const toggleBurg = () => {
        setIsBurgOpen((prev) => !prev);
    };

    // Calculate days or hours left for each event
    const getUpcomingEvents = () => {
        const now = new Date();
        return events
            .filter((event) => {
                const eventDate = new Date(event.date);
                const timeDiff = eventDate - now;
                const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                return daysLeft < 100 && daysLeft >= 0; // Less than 100 days and future events
            })
            .map((event) => {
                const eventDate = new Date(event.date);
                const timeDiff = eventDate - now;
                const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hoursLeft = Math.ceil(timeDiff / (1000 * 60 * 60));
                return {
                    ...event,
                    timeLeft: daysLeft > 0 ? `${daysLeft} days` : `${hoursLeft} hours`,
                };
            })
            .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
    };

    // Calculate the most successful products by the number of projects they are used in
    const getMostSuccessfulProducts = () => {
        const productUsage = products.map((product) => ({
            ...product,
            projectCount: projects.filter((project) =>
                project.products.includes(product.id)
            ).length,
        }));

        return productUsage
            .sort((a, b) => b.projectCount - a.projectCount) // Sort by project count
            .slice(0, 5); // Get top 5 products
    };

    const upcomingEvents = getUpcomingEvents();
    const successfulProducts = getMostSuccessfulProducts();

    return (
        <div className="relative pt-[80px] p-[30px] flex flex-col gap-[30px]">
            {/* Navbar */}
            <Navbar toggleMenu={toggleMenu} toggleBerg={toggleBurg} name={name} lastname={lastname} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />

            {/* Account Menu */}
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
            {currentView === 'changePass' && (
                <ChangePass onBack={() => setCurrentView('menu')} />
            )}

            {/* Main Content */}
            <div className="flex flex-row gap-[30px]">
                {/* Upcoming Events */}
                <div className="flex-1 rounded-xl drop-shadow-xl bg-thelightblue p-[30px]">
                    <div className="text-center text-3xl font-bold mb-4">Upcoming Events</div>
                    {upcomingEvents.length > 0 ? (
                        <ul className="space-y-4">
                            {upcomingEvents.map((event) => (
                                <li
                                    key={event.id}
                                    className="flex justify-between items-center p-4 bg-bluemk3 rounded-lg shadow-md"
                                >
                                    <div className="font-medium">{event.name}</div>
                                    <div className="text-bluemk1">{event.timeLeft}</div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500">No upcoming events</p>
                    )}
                </div>

                {/* Most Successful Products */}
                <div className="flex-1 rounded-xl drop-shadow-xl bg-thelightblue p-[30px]">
                    <div className="text-center text-3xl font-bold mb-4">Top Products</div>
                    {successfulProducts.length > 0 ? (
                        <ul className="space-y-4">
                            {successfulProducts.map((product) => (
                                <li
                                    key={product.id}
                                    className="flex justify-between items-center p-4 bg-bluemk3 rounded-lg shadow-md"
                                >
                                    <div className="font-medium">{product.name}</div>
                                    <div className="text-bluemk1">
                                        Used in {product.projectCount} {product.projectCount === 1 ? "project" : "projects"}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500">No data available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
