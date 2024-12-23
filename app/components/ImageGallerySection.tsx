'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ImageModal from './ImageModal';

const galleryImages = [
  {
    id: 1,
    src: '/gallery/cake-1.jpg',
    title: 'Wedding Cake Elegance',
    description: 'Three-tiered white wedding cake with floral decorations'
  },
  {
    id: 2,
    src: '/gallery/cake-2.jpg',
    title: 'Birthday Celebration',
    description: 'Colorful birthday cake with chocolate drip'
  },
  {
    id: 3,
    src: '/gallery/cake-3.jpg',
    title: 'Chocolate Dream',
    description: 'Rich chocolate cake with ganache and berries'
  },
  // Add more images as needed
];

export default function ImageGallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const visibleImages = [
    galleryImages[(currentIndex - 1 + galleryImages.length) % galleryImages.length],
    galleryImages[currentIndex],
    galleryImages[(currentIndex + 1) % galleryImages.length],
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Gallery</h2>
        
        <div className="relative">
          {/* Main Carousel */}
          <div className="relative h-[500px] overflow-hidden rounded-lg">
            <div className="flex h-full transition-transform duration-500 ease-in-out">
              {visibleImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`absolute w-full h-full transition-transform duration-500 ${
                    index === 0
                      ? '-translate-x-full'
                      : index === 1
                      ? 'translate-x-0'
                      : 'translate-x-full'
                  }`}
                >
                  <div 
                    className="relative h-full cursor-pointer group"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center p-4">
                        <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                        <p className="text-sm">{image.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Previous image"
          >
            <FaChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Next image"
          >
            <FaChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Thumbnail Strip */}
        <div className="flex justify-center mt-6 space-x-2 overflow-x-auto pb-4">
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${
                index === currentIndex
                  ? 'ring-2 ring-rose-600 scale-110'
                  : 'hover:ring-2 hover:ring-gray-300'
              }`}
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Zoom Modal */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
} 