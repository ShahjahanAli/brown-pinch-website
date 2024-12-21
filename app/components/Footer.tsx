'use client';
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Brows Pinch</h3>
            <p>Crafting sweet moments since 2020</p>
            <div className="flex space-x-4 mt-4">
              <Link href="https://facebook.com" className="hover:text-rose-400">
                <FaFacebook size={24} />
              </Link>
              <Link href="https://instagram.com" className="hover:text-rose-400">
                <FaInstagram size={24} />
              </Link>
              <Link href="https://twitter.com" className="hover:text-rose-400">
                <FaTwitter size={24} />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/menu" className="hover:text-rose-400">Menu</Link></li>
              <li><Link href="/about" className="hover:text-rose-400">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-rose-400">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p>123 Bakery Street</p>
            <p>New York, NY 10001</p>
            <p>Phone: (555) 123-4567</p>
            <p>Email: info@browspinch.com</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Hours</h3>
            <p>Monday - Friday: 8am - 8pm</p>
            <p>Saturday: 9am - 6pm</p>
            <p>Sunday: 10am - 4pm</p>
          </div>
        </div>
        <div className="text-center mt-8 pt-8 border-t border-gray-700">
          <p>&copy; 2024 Brows Pinch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 