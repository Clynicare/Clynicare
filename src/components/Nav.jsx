"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <section className="fixed w-full bg-transparent text-black py-4 backdrop-blur-md z-50 px-6 md:px-[100px]">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <h1 className="font-rejoice font-bold text-3xl md:text-4xl tracking-normal bg-gradient-to-b from-[#4DA1A9] to-[#007BA7] text-transparent bg-clip-text">
                    CLYNICARE
                </h1>

                {/* Desktop Navigation */}
                <div className="hidden md:flex font-rejoice">
                    <ul className="flex w-[500px] justify-evenly text-gray-500">
                        <li><a href="/Hero">Home</a></li>
                        <li><a href="/Services">Services</a></li>
                        <li><a href="/About">About Us</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Help</a></li>
                    </ul>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button 
                        className="text-gray-500 focus:outline-none text-3xl" 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden flex flex-col space-y-4 mt-4 text-center text-gray-500 bg-white shadow-lg rounded-lg p-4">
                    <Link href="/Hero" className="block" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link href="/Services" className="block" onClick={() => setIsMenuOpen(false)}>Services</Link>
                    <Link href="/About" className="block" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                    <Link href="#" className="block" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                    <Link href="#" className="block" onClick={() => setIsMenuOpen(false)}>Help</Link>
                </div>
            )}
        </section>
    );
}
