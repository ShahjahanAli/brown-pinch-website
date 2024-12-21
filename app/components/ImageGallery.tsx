'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BsDot } from 'react-icons/bs';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isAnimating]);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="relative group">
      {/* Main Image */}
      <div className="relative h-72 md:h-[500px] w-full overflow-hidden rounded-lg">
        {images.map((image, index) => (
          <div
            key={image}
            className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
              index === currentIndex
                ? 'translate-x-0'
                : index < currentIndex
                ? '-translate-x-full'
                : 'translate-x-full'
            }`}
          >
            <Image
              src={image}
              alt={`${productName} - Image ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Previous image"
      >
        <FaChevronLeft className="w-4 h-4 text-gray-800" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Next image"
      >
        <FaChevronRight className="w-4 h-4 text-gray-800" />
      </button>

      {/* Thumbnail Navigation */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex justify-center items-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? 'text-rose-600 scale-150'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              aria-label={`Go to image ${index + 1}`}
            >
              <BsDot className="w-6 h-6" />
            </button>
          ))}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="hidden md:flex justify-center mt-4 space-x-2">
        {images.map((image, index) => (
          <button
            key={image}
            onClick={() => handleDotClick(index)}
            className={`relative w-20 h-20 rounded-lg overflow-hidden ${
              index === currentIndex
                ? 'ring-2 ring-rose-600'
                : 'hover:ring-2 hover:ring-gray-300'
            }`}
          >
            <Image
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
} 