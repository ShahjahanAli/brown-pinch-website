'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CartIcon from './CartIcon';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-rose-600">Brows Pinch</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-rose-600">Home</Link>
            <Link href="/menu" className="text-gray-700 hover:text-rose-600">Menu</Link>
            <Link href="/about" className="text-gray-700 hover:text-rose-600">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-rose-600">Contact</Link>
            <CartIcon />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <CartIcon />
            <button
              className="text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-rose-600">Home</Link>
              <Link href="/menu" className="block px-3 py-2 text-gray-700 hover:text-rose-600">Menu</Link>
              <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-rose-600">About</Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-rose-600">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 