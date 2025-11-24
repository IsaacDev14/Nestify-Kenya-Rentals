import React from "react";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
    const navigate = useNavigate();

    return (
        <footer className="bg-white border-t border-gray-200 py-8 px-6 md:px-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-4">Support</h3>
                    <ul className="space-y-3">
                        <li><a onClick={() => navigate('/help-center')} className="text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer">Help Center</a></li>
                        <li><a onClick={() => navigate('/help-center')} className="text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer">Safety information</a></li>
                        <li><a onClick={() => navigate('/help-center')} className="text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer">Cancellation options</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-4">Community</h3>
                    <ul className="space-y-3">
                        <li><a onClick={() => navigate('/help-center')} className="text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer">Disaster relief</a></li>
                        <li><a onClick={() => navigate('/help-center')} className="text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer">Support refugees</a></li>
                        <li><a onClick={() => navigate('/help-center')} className="text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer">Combating discrimination</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-4">Hosting</h3>
                    <ul className="space-y-3">
                        <li><a onClick={() => navigate('/help-center')} className="text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer">Try hosting</a></li>
                        <li><a onClick={() => navigate('/help-center')} className="text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer">AirCover for Hosts</a></li>
                        <li><a onClick={() => navigate('/help-center')} className="text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer">Explore hosting resources</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-4">Nestify</h3>
                    <ul className="space-y-3">
                        <li><a onClick={() => navigate('/help-center')} className="text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer">Newsroom</a></li>
                        <li><a onClick={() => navigate('/help-center')} className="text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer">Careers</a></li>
                        <li><a onClick={() => navigate('/help-center')} className="text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer">Investors</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <span className="text-sm text-gray-600">© 2025 Nestify, Inc.</span>
                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">Privacy</a>
                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">Terms</a>
                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">Sitemap</a>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                        <svg className="h-5 w-5 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18.75c-4.832 0-8.75-3.918-8.75-8.75S7.168 3.25 12 3.25s8.75 3.918 8.75 8.75-3.918 8.75-8.75 8.75zM12 6.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zm0 9a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-600">English (US)</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-600">$ USD</span>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692V11.69h3.123V8.75c0-3.116 1.892-4.816 4.657-4.816 1.325 0 2.463.098 2.795.142v3.25l-1.938.001c-1.512 0-1.807.718-1.807 1.775V11.69h3.64l-.576 3.016h-3.064V24h6.115c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
