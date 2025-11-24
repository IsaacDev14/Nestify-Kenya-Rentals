import React from "react";
import InfoPage from "../components/InfoPage";

const HowItWorksPage: React.FC = () => {
    return (
        <InfoPage
            title="How Nestify Works"
            content={
                <div className="space-y-8">
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border border-red-100">
                        <p className="text-lg text-gray-700">
                            Booking your perfect stay in Kenya is simple with Nestify. Follow these easy steps to get started!
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">For Guests</h2>
                        <div className="space-y-6">
                            {[
                                {
                                    step: 1,
                                    title: "Search & Discover",
                                    description: "Browse thousands of unique properties across Kenya. Use filters to find exactly what you're looking for - from beachfront villas to safari lodges.",
                                    icon: "🔍"
                                },
                                {
                                    step: 2,
                                    title: "Book Securely",
                                    description: "Found your perfect place? Book instantly or send an inquiry to the host. Your payment is protected until check-in.",
                                    icon: "🔒"
                                },
                                {
                                    step: 3,
                                    title: "Enjoy Your Stay",
                                    description: "Check in and enjoy your accommodation. Need help? Our 24/7 support team is always here for you.",
                                    icon: "🏖️"
                                },
                                {
                                    step: 4,
                                    title: "Leave a Review",
                                    description: "Share your experience to help other travelers and hosts improve their services.",
                                    icon: "⭐"
                                }
                            ].map((item) => (
                                <div key={item.step} className="flex gap-6 bg-white p-6 rounded-lg shadow-md border border-gray-100">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl">
                                            {item.icon}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                                {item.step}
                                            </span>
                                            <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                                        </div>
                                        <p className="text-gray-700">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t-2 border-gray-200 pt-8">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">For Hosts</h2>
                        <div className="space-y-6">
                            {[
                                {
                                    step: 1,
                                    title: "List Your Property",
                                    description: "Create a listing in minutes. Add photos, set your price, and describe what makes your place special.",
                                    icon: "📝"
                                },
                                {
                                    step: 2,
                                    title: "Set Your Rules",
                                    description: "Choose your house rules, cancellation policy, and availability calendar. You're in control.",
                                    icon: "⚙️"
                                },
                                {
                                    step: 3,
                                    title: "Welcome Guests",
                                    description: "Accept bookings and communicate with guests. We handle the payments securely.",
                                    icon: "🤝"
                                },
                                {
                                    step: 4,
                                    title: "Earn Money",
                                    description: "Get paid 24 hours after guest check-in. Track your earnings in your host dashboard.",
                                    icon: "💰"
                                }
                            ].map((item) => (
                                <div key={item.step} className="flex gap-6 bg-white p-6 rounded-lg shadow-md border border-gray-100">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">
                                            {item.icon}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                                {item.step}
                                            </span>
                                            <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                                        </div>
                                        <p className="text-gray-700">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Need Help?</h2>
                        <p className="text-gray-700 mb-4">
                            Our support team is available 24/7 to help you with any questions or issues.
                        </p>
                        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                            Contact Support
                        </button>
                    </div>
                </div>
            }
        />
    );
};

export default HowItWorksPage;
