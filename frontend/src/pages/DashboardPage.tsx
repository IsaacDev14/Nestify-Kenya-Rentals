import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Booking {
    id: number;
    propertyName: string;
    location: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    total: number;
    status: "upcoming" | "completed" | "cancelled";
    image: string;
}

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "payments" | "settings">("overview");

    // Mock bookings data
    const [bookings] = useState<Booking[]>([
        {
            id: 1,
            propertyName: "Luxury Beach Villa",
            location: "Diani Beach, Kenya",
            checkIn: "2025-12-15",
            checkOut: "2025-12-20",
            guests: 4,
            total: 75000,
            status: "upcoming",
            image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400"
        },
        {
            id: 2,
            propertyName: "Safari Lodge",
            location: "Maasai Mara, Kenya",
            checkIn: "2025-11-01",
            checkOut: "2025-11-05",
            guests: 2,
            total: 45000,
            status: "completed",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400"
        }
    ]);

    const upcomingBookings = bookings.filter(b => b.status === "upcoming");
    const completedBookings = bookings.filter(b => b.status === "completed");

    if (!user) {
        navigate("/login");
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="container mx-auto px-6 py-8 flex-grow">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.name}!</h1>
                    <p className="text-gray-600 mt-2">Manage your bookings, payments, and account settings</p>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-8">
                    <nav className="flex space-x-8">
                        {["overview", "bookings", "payments", "settings"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab
                                        ? "border-red-500 text-red-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Overview Tab */}
                {activeTab === "overview" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Stats Cards */}
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Upcoming Trips</p>
                                    <p className="text-3xl font-bold text-gray-800 mt-2">{upcomingBookings.length}</p>
                                </div>
                                <div className="bg-red-100 p-3 rounded-full">
                                    <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Total Spent</p>
                                    <p className="text-3xl font-bold text-gray-800 mt-2">KSh {bookings.reduce((sum, b) => sum + b.total, 0).toLocaleString()}</p>
                                </div>
                                <div className="bg-green-100 p-3 rounded-full">
                                    <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Completed Trips</p>
                                    <p className="text-3xl font-bold text-gray-800 mt-2">{completedBookings.length}</p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Bookings Tab */}
                {activeTab === "bookings" && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
                            <button
                                onClick={() => navigate("/")}
                                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Book New Property
                            </button>
                        </div>

                        {bookings.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-md p-12 text-center">
                                <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-gray-600 mb-4">No bookings yet</p>
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
                                    <div key={booking.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex items-start gap-6">
                                            <img
                                                src={booking.image}
                                                alt={booking.propertyName}
                                                className="w-32 h-32 object-cover rounded-lg"
                                            />
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-800">{booking.propertyName}</h3>
                                                        <p className="text-gray-600 text-sm mt-1">{booking.location}</p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === "upcoming" ? "bg-green-100 text-green-800" :
                                                            booking.status === "completed" ? "bg-gray-100 text-gray-800" :
                                                                "bg-red-100 text-red-800"
                                                        }`}>
                                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-4 mt-4">
                                                    <div>
                                                        <p className="text-xs text-gray-500">Check-in</p>
                                                        <p className="font-medium text-gray-800">{new Date(booking.checkIn).toLocaleDateString()}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Check-out</p>
                                                        <p className="font-medium text-gray-800">{new Date(booking.checkOut).toLocaleDateString()}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Guests</p>
                                                        <p className="font-medium text-gray-800">{booking.guests} guests</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                                                    <p className="text-lg font-bold text-gray-800">KSh {booking.total.toLocaleString()}</p>
                                                    <div className="flex gap-2">
                                                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                                            View Details
                                                        </button>
                                                        {booking.status === "upcoming" && (
                                                            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">
                                                                Cancel Booking
                                                            </button>
                                                        )}
                                                        {booking.status === "completed" && (
                                                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                                                                Leave Review
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Payments Tab */}
                {activeTab === "payments" && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Methods & History</h2>

                        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Saved Payment Methods</h3>
                            <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-red-500 hover:bg-red-50 transition-colors">
                                <svg className="h-8 w-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <p className="text-gray-600">Add Payment Method</p>
                            </button>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction History</h3>
                            <div className="space-y-3">
                                {bookings.map((booking) => (
                                    <div key={booking.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                                        <div>
                                            <p className="font-medium text-gray-800">{booking.propertyName}</p>
                                            <p className="text-sm text-gray-500">{new Date(booking.checkIn).toLocaleDateString()}</p>
                                        </div>
                                        <p className="font-bold text-gray-800">KSh {booking.total.toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>

                        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        defaultValue={user.name}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        defaultValue={user.email}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="+254 700 000 000"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
                                    Save Changes
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
                                    Update Password
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default DashboardPage;
