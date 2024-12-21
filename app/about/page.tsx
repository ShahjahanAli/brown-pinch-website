import Image from 'next/image';

export default function About() {
  return (
    <main className="pt-20">
      <div className="bg-rose-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">About Brows Pinch</h1>
          
          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-[400px]">
              <Image
                src="/about/bakery.jpg"
                alt="Our Bakery"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-rose-600">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2020, Brows Pinch began with a simple mission: to create delightful moments through exceptional pastries and cakes. What started as a small family bakery has grown into a beloved destination for cake lovers across the city.
              </p>
              <p className="text-gray-700">
                Every creation that leaves our kitchen is crafted with love, using only the finest ingredients and time-honored recipes passed down through generations.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-rose-600">Quality</h3>
              <p className="text-gray-700">We use only the finest ingredients to ensure every bite is perfect.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-rose-600">Creativity</h3>
              <p className="text-gray-700">Each creation is unique and crafted with artistic attention to detail.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-rose-600">Service</h3>
              <p className="text-gray-700">Customer satisfaction is at the heart of everything we do.</p>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-8 text-rose-600">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Sarah Smith', role: 'Head Baker', image: '/team/baker1.jpg' },
                { name: 'John Davis', role: 'Pastry Chef', image: '/team/baker2.jpg' },
                { name: 'Emily Wilson', role: 'Cake Designer', image: '/team/baker3.jpg' },
              ].map((member, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="relative h-48 mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 