import React from "react";
import InfoPage from "../components/InfoPage";

const HelpCenterPage: React.FC = () => {
    return (
        <InfoPage
            title="Help Center"
            content={
                <>
                    <h2 className="text-2xl font-bold mb-4">How can we help you?</h2>
                    <p className="mb-4">
                        Welcome to the Nestify Help Center. Find answers to common questions and get support for your bookings.
                    </p>

                    <h3 className="text-xl font-semibold mt-6 mb-3">Popular Topics</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>How to book a property</li>
                        <li>Cancellation policy</li>
                        <li>Payment methods</li>
                        <li>Contacting your host</li>
                        <li>Reporting issues</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-3">Contact Support</h3>
                    <p>
                        If you need additional assistance, please contact our support team at{" "}
                        <a href="mailto:support@kenyarentals.com" className="text-red-500 hover:underline">
                            support@kenyarentals.com
                        </a>
                    </p>
                </>
            }
        />
    );
};

export default HelpCenterPage;
