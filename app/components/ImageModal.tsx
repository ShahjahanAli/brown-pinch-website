'use client';
import { useState } from 'react';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageModalProps {
  image: {
    src: string;
    title: string;
    description: string;
  };
  onClose: () => void;
}

export default function ImageModal({ image, onClose }: ImageModalProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
    setScale(Math.min(Math.max(1, newScale), 3));
  };

  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = () => setIsDragging(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
        >
          <IoMdClose size={30} />
        </button>

        <motion.div
          className="relative w-full h-full max-w-4xl max-h-[80vh] m-4 cursor-move"
          drag
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onClick={(e) => e.stopPropagation()}
          style={{
            scale,
            x: position.x,
            y: position.y,
          }}
          onWheel={handleWheel}
        >
          <div className="relative w-full h-full">
            <Image
              src={image.src}
              alt={image.title}
              fill
              className="object-contain"
              quality={100}
              priority
            />
          </div>
          {!isDragging && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center">
              <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
              <p className="text-sm">{image.description}</p>
            </div>
          )}
        </motion.div>

        <div className="absolute bottom-4 left-4 text-white text-sm">
          <p>Scroll to zoom • Drag to pan</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 