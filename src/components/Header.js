import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { useTheme } from '../contexts/ThemeContext';

function Header() {
    const {portfolioData} = useSelector((state) => state.root);
    const {headers} = portfolioData || {};
    const {firstLetter = '', middleLetter = '', lastLetter = ''} = headers || {};
    const { isDarkMode, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`p-5 flex justify-between items-center header fixed-header transition-all duration-300 ${
            isScrolled 
                ? 'bg-opacity-95 backdrop-blur-md shadow-lg' 
                : 'bg-opacity-100'
        } ${isDarkMode ? 'bg-primary' : 'bg-surface'}`}>
            {/* Logo/Brand */}
            <div className="flex items-center gap-2">
                <h1 className='text-secondary text-4xl font-bold sm:text-2xl transition-all duration-300 hover:scale-110'>{firstLetter || ''}</h1>
                <h1 className='text-white text-4xl font-bold sm:text-2xl transition-all duration-300 hover:scale-110'>{middleLetter || ''}</h1>
                <h1 className='text-tertiary text-4xl font-bold sm:text-2xl transition-all duration-300 hover:scale-110'>{lastLetter || ''}</h1>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center">
                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="p-3 rounded-full bg-opacity-20 bg-white hover:bg-opacity-30 transition-all duration-300 group"
                    aria-label="Toggle theme"
                >
                    <div className="relative w-6 h-6">
                        {/* Sun Icon */}
                        <svg
                            className={`absolute inset-0 w-6 h-6 text-yellow-400 transition-all duration-500 ${
                                isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                        </svg>
                        
                        {/* Moon Icon */}
                        <svg
                            className={`absolute inset-0 w-6 h-6 text-blue-300 transition-all duration-500 ${
                                isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                        </svg>
                    </div>
                </button>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden p-2 text-white hover:text-tertiary transition-colors duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Header;