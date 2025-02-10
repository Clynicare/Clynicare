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
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/Services">Services</Link></li>
                        <li><Link href="/Signup">Bookings</Link></li>
                        <li><Link href="/About">About Us</Link></li>
                        <li><Link href="#">Contact Us</Link></li>
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
                    <Link href="/" className="block" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link href="/Services" className="block" onClick={() => setIsMenuOpen(false)}>Services</Link>
                    <Link href="/Signup" className="block" onClick={() => setIsMenuOpen(false)}>Bookings</Link>
                    <Link href="/About" className="block" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                    <Link href="#" className="block" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                </div>
            )}
        </section>
    );
}
