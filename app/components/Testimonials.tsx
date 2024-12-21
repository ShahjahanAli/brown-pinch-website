'use client'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      text: "The best cakes I've ever tasted! The attention to detail is amazing.",
      author: "Sarah Johnson"
    },
    {
      id: 2,
      text: "Perfect for every celebration. My family loves their pastries!",
      author: "Michael Brown"
    },
    {
      id: 3,
      text: "Outstanding quality and service. Will definitely order again!",
      author: "Emily Davis"
    }
  ];

  return (
    <section className="py-16 bg-rose-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
              <p className="font-semibold">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}