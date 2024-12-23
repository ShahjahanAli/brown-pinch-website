import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center bg-rose-50">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Delightful Moments with <br />
          <span className="text-rose-600">Brown Pinch</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Handcrafted cakes and pastries made with love
        </p>
        <button className="bg-rose-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-rose-700 transition duration-300">
          <Link href="/menu">
            Order Now
          </Link>
        </button>
      </div>
    </div>
  );
} 