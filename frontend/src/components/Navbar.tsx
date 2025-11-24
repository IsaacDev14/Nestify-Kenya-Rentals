import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NestifyLogo from '../assets/nestify_logo.svg';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
            setIsMobileMenuOpen(false);
        }
    };

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
        navigate("/");
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-white shadow-sm py-3 px-4 md:py-4 md:px-6 lg:px-12 sticky top-0 z-50">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                    <img src={NestifyLogo} alt="Nestify logo" className="h-8 w-8 md:h-10 md:w-10 mr-2" />
                    <span className="text-lg md:text-2xl font-bold text-gray-800">Nestify</span>
                </div>

                {/* Desktop Search Bar */}
                <form onSubmit={handleSearch} className="hidden lg:flex items-center border border-gray-300 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex-1 max-w-md mx-8">
                    <div className="px-3 border-r border-gray-300">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="text-sm font-medium focus:outline-none w-24"
                        />
                    </div>
                    <div className="px-3 flex items-center">
                        <button type="submit" className="bg-red-500 p-2 rounded-full hover:bg-red-600 transition-colors">
                            <svg
                                className="h-4 w-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </form>

                {/* Desktop User Menu */}
                <div className="hidden md:flex relative items-center space-x-4" ref={dropdownRef}>
                    {user && (
                        <button
                            onClick={() => navigate('/host/dashboard')}
                            className="py-2 px-5 rounded-full text-gray-700 font-medium text-sm hover:bg-gray-100 transition-colors duration-300"
                        >
                            {user.isHost ? "Host Dashboard" : "Become a Host"}
                        </button>
                    )}
                    <button
                        onClick={() => navigate('/wishlist')}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
                    >
                        <svg
                            className="h-6 w-6 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </button>
                    <div
                        className="flex items-center space-x-2 border border-gray-300 rounded-full p-1 pl-3 hover:shadow-md transition-all duration-300 cursor-pointer"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <svg
                            className="h-5 w-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                        <div className="h-8 w-8 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center text-white">
                            {user ? (
                                <span className="text-sm font-semibold">{user.name.charAt(0).toUpperCase()}</span>
                            ) : (
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </div>
                    </div>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100 animate-fade-in">
                            {user ? (
                                <>
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            navigate("/dashboard");
                                            setIsDropdownOpen(false);
                                        }}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        My Dashboard
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigate("/wishlist");
                                            setIsDropdownOpen(false);
                                        }}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        Wishlist
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigate("/dashboard/messages");
                                            setIsDropdownOpen(false);
                                        }}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                        Messages
                                    </button>
                                    <div className="border-t border-gray-200 my-2"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                                    >
                                        <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Log out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            navigate("/login");
                                            setIsDropdownOpen(false);
                                        }}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        Log in
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigate("/register");
                                            setIsDropdownOpen(false);
                                        }}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        Sign up
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 animate-fade-in">
                    {/* Mobile Search */}
                    <form onSubmit={handleSearch} className="mb-4">
                        <input
                            type="text"
                            placeholder="Search properties..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </form>

                    {/* Mobile Menu Items */}
                    {user ? (
                        <div className="space-y-2">
                            <div className="px-4 py-2 bg-gray-50 rounded-lg">
                                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                            <button
                                onClick={() => {
                                    navigate("/dashboard");
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                My Dashboard
                            </button>
                            <button
                                onClick={() => {
                                    navigate("/wishlist");
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Wishlist
                            </button>
                            <button
                                onClick={() => {
                                    navigate("/dashboard/messages");
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Messages
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                Log out
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <button
                                onClick={() => {
                                    navigate("/login");
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Log in
                            </button>
                            <button
                                onClick={() => {
                                    navigate("/register");
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                Sign up
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;
