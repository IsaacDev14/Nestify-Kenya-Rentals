import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PaymentModal from "../components/PaymentModal";
import { useNotification } from "../context/NotificationContext";
import type { Property } from "../types";

const CheckoutPage: React.FC = () => {
    const { propertyId } = useParams<{ propertyId: string }>();
    const navigate = useNavigate();
    const { addNotification } = useNotification();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/properties/${propertyId}`
                );
                setProperty(response.data);
            } catch (error) {
                console.error("Error fetching property:", error);
                addNotification("error", "Failed to load property details");
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [propertyId, addNotification]);

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!checkIn || !checkOut) {
            addNotification("warning", "Please select check-in and check-out dates");
            return;
        }

        setShowPaymentModal(true);
    };

    const handlePaymentSuccess = async () => {
        try {
            // Send booking to backend
            await axios.post("http://localhost:5000/api/bookings", {
                propertyId: property?.id,
                checkIn,
                checkOut,
                guests,
                total: totalPrice * 1.1
            });

            addNotification("success", "Booking confirmed! Check your email for details.");
            setTimeout(() => navigate("/dashboard"), 2000);
        } catch (error) {
            addNotification("error", "Booking failed. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-xl">Property not found</div>
                </div>
                <Footer />
            </div>
        );
    }

    const pricePerNight = parseInt(property.price.replace(/[^0-9]/g, ""));
    const nights =
        checkIn && checkOut
            ? Math.ceil(
                (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
                (1000 * 60 * 60 * 24)
            )
            : 0;
    const totalPrice = nights > 0 ? pricePerNight * nights : 0;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="container mx-auto px-6 py-8 flex-grow">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
                >
                    <svg
                        className="h-5 w-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back
                </button>

                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Confirm and pay
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Booking Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                Your trip
                            </h2>
                            <form onSubmit={handleBooking}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Check-in
                                        </label>
                                        <input
                                            type="date"
                                            value={checkIn}
                                            onChange={(e) => setCheckIn(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Check-out
                                        </label>
                                        <input
                                            type="date"
                                            value={checkOut}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Guests
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={guests}
                                        onChange={(e) =>
                                            setGuests(parseInt(e.target.value))
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Proceed to Payment
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                            <div className="flex items-start mb-4">
                                <img
                                    src={property.imageUrls[0]}
                                    alt={property.name}
                                    className="w-24 h-24 object-cover rounded-lg mr-4"
                                />
                                <div>
                                    <h3 className="font-bold text-gray-800">
                                        {property.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {property.location}
                                    </p>
                                    <div className="flex items-center mt-1">
                                        <svg
                                            className="h-4 w-4 text-yellow-500 mr-1"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-sm font-medium">
                                            {property.rating}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="font-bold text-gray-800 mb-3">
                                    Price details
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>
                                            {property.price} x {nights || 0} nights
                                        </span>
                                        <span>KSh {totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Service fee</span>
                                        <span>KSh {(totalPrice * 0.1).toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>
                                        KSh {(totalPrice * 1.1).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {showPaymentModal && (
                <PaymentModal
                    isOpen={showPaymentModal}
                    onClose={() => setShowPaymentModal(false)}
                    amount={totalPrice * 1.1}
                    propertyName={property.name}
                    onPaymentSuccess={handlePaymentSuccess}
                />
            )}

            <Footer />
        </div>
    );
};

export default CheckoutPage;
