import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();

    // Mock user data
    const user = {
        name: "John Doe",
        email: "john@example.com",
    };

    // Mock bookings
    const bookings = [
        {
            id: 1,
            propertyName: "Charming Apartment",
            location: "Nairobi, Kilimani",
            checkIn: "2025-12-01",
            checkOut: "2025-12-05",
            image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&auto=format&fit=crop&q=60",
            status: "Upcoming",
        },
        {
            id: 2,
            propertyName: "Beachfront Villa",
            location: "Diani Beach, Kwale",
            checkIn: "2025-11-15",
            checkOut: "2025-11-20",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=60",
            status: "Completed",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="container mx-auto px-6 py-8 flex-grow">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

                {/* User Info */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Account Information
                    </h2>
                    <div className="space-y-3">
                        <div>
                            <label className="text-sm font-medium text-gray-600">
                                Name
                            </label>
                            <p className="text-gray-800">{user.name}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">
                                Email
                            </label>
                            <p className="text-gray-800">{user.email}</p>
                        </div>
                    </div>
                </div>

                {/* Bookings */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                        My Trips
                    </h2>

                    {bookings.length === 0 ? (
                        <div className="text-center py-12">
                            <svg
                                className="h-16 w-16 text-gray-400 mx-auto mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                            <p className="text-gray-600 mb-4">No trips booked yet</p>
                            <button
                                onClick={() => navigate("/")}
                                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Start exploring
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="flex items-start border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                                    onClick={() => navigate(`/properties/${booking.id}`)}
                                >
                                    <img
                                        src={booking.image}
                                        alt={booking.propertyName}
                                        className="w-32 h-32 object-cover rounded-lg mr-4"
                                    />
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-gray-800 text-lg">
                                            {booking.propertyName}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-2">
                                            {booking.location}
                                        </p>
                                        <div className="flex items-center text-sm text-gray-600 mb-2">
                                            <svg
                                                className="h-4 w-4 mr-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                                            {new Date(booking.checkOut).toLocaleDateString()}
                                        </div>
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${booking.status === "Upcoming"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProfilePage;
