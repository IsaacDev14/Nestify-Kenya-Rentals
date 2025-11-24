import React from "react";
import InfoPage from "../components/InfoPage";

const AboutPage: React.FC = () => {
    return (
        <InfoPage
            title="About Nestify"
            content={
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Story</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Nestify was founded with a simple mission: to make finding and booking unique accommodations across Kenya as easy as possible. We believe that every traveler deserves an authentic, memorable experience, whether you're exploring the beaches of Diani, the wildlife of Maasai Mara, or the vibrant culture of Nairobi.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">What We Offer</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-semibold text-lg mb-2 text-gray-800">For Travelers</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li>✓ Verified properties across Kenya</li>
                                    <li>✓ Secure booking and payment</li>
                                    <li>✓ 24/7 customer support</li>
                                    <li>✓ Best price guarantee</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-semibold text-lg mb-2 text-gray-800">For Hosts</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li>✓ Easy property listing</li>
                                    <li>✓ Flexible pricing tools</li>
                                    <li>✓ Host protection insurance</li>
                                    <li>✓ Marketing support</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Values</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800">Trust & Safety</h3>
                                <p className="text-gray-700">Every property is verified, and we provide secure payment processing to protect both guests and hosts.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800">Community First</h3>
                                <p className="text-gray-700">We're committed to supporting local communities and promoting sustainable tourism across Kenya.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800">Innovation</h3>
                                <p className="text-gray-700">We continuously improve our platform to make booking and hosting as seamless as possible.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Join Our Community</h2>
                        <p className="text-gray-700 mb-4">
                            Whether you're looking to explore Kenya or share your property with travelers, we're here to help you every step of the way.
                        </p>
                        <div className="flex gap-4">
                            <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium">
                                Start Exploring
                            </button>
                            <button className="border-2 border-red-500 text-red-500 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors font-medium">
                                Become a Host
                            </button>
                        </div>
                    </div>
                </div>
            }
        />
    );
};

export default AboutPage;
