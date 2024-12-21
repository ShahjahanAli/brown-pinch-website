'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image 
                className="h-12 w-auto" 
                src="/logo.png" 
                alt="Brown Pinch"
                width={48}
                height={48}
                priority
              />
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-8">
                <Link 
                  href="/" 
                  className="font-body text-brand-500 hover:text-brand-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link 
                  href="/menu" 
                  className="font-body text-gray-700 hover:text-brand-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Our Menu
                </Link>
                <Link 
                  href="/about" 
                  className="font-body text-gray-700 hover:text-brand-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  About Us
                </Link>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Link href="/cart" className="p-2 rounded-full hover:bg-brand-100">
              <ShoppingBagIcon className="h-6 w-6 text-brand-500" />
            </Link>
            
            <button 
              className="md:hidden ml-2 p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-700" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div 
        className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            href="/" 
            className="block px-3 py-2 rounded-md text-base font-medium text-brand-500 hover:text-brand-400"
          >
            Home
          </Link>
          <Link 
            href="/menu" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-400"
          >
            Our Menu
          </Link>
          <Link 
            href="/about" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-400"
          >
            About Us
          </Link>
        </div>
      </motion.div>
    </nav>
  )
}

export default Navbar 