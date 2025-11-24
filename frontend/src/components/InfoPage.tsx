import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface InfoPageProps {
    title: string;
    content: React.ReactNode;
}

const InfoPage: React.FC<InfoPageProps> = ({ title, content }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="container mx-auto px-6 py-12 flex-grow">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">{title}</h1>
                <div className="bg-white rounded-xl shadow-md p-8">
                    <div className="prose max-w-none text-gray-700">
                        {content}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default InfoPage;
