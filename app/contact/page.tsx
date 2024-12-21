'use client';
import { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import useLoading from '../hooks/useLoading';

export default function Contact() {
  const { isLoading, withLoading } = useLoading();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await withLoading(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(formData);
    });
  };

  return (
    <main className="pt-20 relative">
      {isLoading && <LoadingSpinner />}
      <div className="bg-rose-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-rose-600">Get in Touch</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Address</h3>
                  <p className="text-gray-700">123 Bakery Street</p>
                  <p className="text-gray-700">New York, NY 10001</p>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Phone</h3>
                  <p className="text-gray-700">(555) 123-4567</p>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p className="text-gray-700">info@browspinch.com</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Hours</h3>
                  <p className="text-gray-700">Monday - Friday: 8am - 8pm</p>
                  <p className="text-gray-700">Saturday: 9am - 6pm</p>
                  <p className="text-gray-700">Sunday: 10am - 4pm</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-rose-600">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-rose-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-rose-500"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-rose-500"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-rose-500"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 