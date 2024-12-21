'use client';
import Image from 'next/image';
import { useState } from 'react';
import AddToCartButton from './AddToCartButton';
import { Product } from '../types';
import { FaInfoCircle } from 'react-icons/fa';
import ProductDetailsModal from './ProductDetailsModal';

const products = [
    {
        id: 1,
        name: 'Classic Chocolate Cake',
        price: 35,
        description: 'Rich chocolate layers with ganache',
        image: '/cakes/chocolate-cake.jpg',
        images: [
            '/cakes/chocolate-cake-2.jpg',
            '/cakes/chocolate-cake-3.jpg',
            '/cakes/chocolate-cake-4.jpg',
        ],
        category: 'Cakes',
        details: {
            weight: '1.2 kg',
            size: '8 inches',
            servings: '8-10 persons',
            allergens: ['Eggs', 'Milk', 'Wheat', 'Soy'],
            ingredients: [
                'Belgian Chocolate',
                'Wheat Flour',
                'Fresh Cream',
                'Sugar',
                'Eggs',
                'Butter',
                'Vanilla Extract'
            ],
            nutritionalInfo: {
                calories: '350 kcal per 100g',
                fat: '18g',
                protein: '5g',
                carbs: '45g'
            },
            dietary: ['Vegetarian'],
            storageInfo: 'Store in refrigerator at 4°C. Consume within 48 hours of purchase.',
            shelfLife: '2-3 days when refrigerated',
            availableFlavors: [
                'Dark Chocolate',
                'Milk Chocolate',
                'White Chocolate'
            ]
        }
    },
    {
        id: 2,
        name: 'Vanilla Bean Cake',
        price: 32,
        description: 'Light and fluffy with vanilla buttercream',
        image: '/cakes/vanilla-cake.jpg',
        category: 'Cakes',
        details: {
            weight: '1.2 kg',
            size: '8 inches',
            servings: '8-10 persons',
            allergens: ['Eggs', 'Milk', 'Wheat', 'Soy'],
            ingredients: [
                'Belgian Chocolate',
                'Wheat Flour',
                'Fresh Cream',
                'Sugar',
                'Eggs',
                'Butter',
                'Vanilla Extract'
            ],
            nutritionalInfo: {
                calories: '350 kcal per 100g',
                fat: '18g',
                protein: '5g',
                carbs: '45g'
            },
            dietary: ['Vegetarian'],
            storageInfo: 'Store in refrigerator at 4°C. Consume within 48 hours of purchase.',
            shelfLife: '2-3 days when refrigerated',
            availableFlavors: [
                'Dark Chocolate',
                'Milk Chocolate',
                'White Chocolate'
            ]
        }

    },
    {
        id: 3,
        name: 'Red Velvet',
        price: 38,
        description: 'Traditional red velvet with cream cheese frosting',
        image: '/cakes/red-velvet.jpg',
        category: 'Cakes',
        details: {
            weight: '1.2 kg',
            size: '8 inches',
            servings: '8-10 persons',
            allergens: ['Eggs', 'Milk', 'Wheat', 'Soy'],
            ingredients: [
                'Belgian Chocolate',
                'Wheat Flour',
                'Fresh Cream',
                'Sugar',
                'Eggs',
                'Butter',
                'Vanilla Extract'
            ],
            nutritionalInfo: {
                calories: '350 kcal per 100g',
                fat: '18g',
                protein: '5g',
                carbs: '45g'
            },
            dietary: ['Vegetarian'],
            storageInfo: 'Store in refrigerator at 4°C. Consume within 48 hours of purchase.',
            shelfLife: '2-3 days when refrigerated',
            availableFlavors: [
                'Dark Chocolate',
                'Milk Chocolate',
                'White Chocolate'
            ]
        }
    },
];

export default function FeaturedProducts() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product: any) => (
                        <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
                            <div className="relative h-48 mb-4 rounded-lg overflow-hidden group">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <button
                                    onClick={() => setSelectedProduct(product)}
                                    className="absolute bottom-2 right-2 bg-white bg-opacity-90 p-2 rounded-full shadow hover:bg-opacity-100 transition-opacity"
                                >
                                    <FaInfoCircle className="text-rose-600" />
                                </button>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-3">{product.description}</p>
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-rose-600 font-bold">${product.price.toFixed(2)}</p>
                                <p className="text-sm text-gray-500">{product.details.weight} • {product.details.servings}</p>
                            </div>
                            <AddToCartButton product={product} />
                        </div>
                    ))}
                </div>
            </div>
            {selectedProduct && (
                <ProductDetailsModal 
                    product={selectedProduct}
                    isOpen={!!selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </section>
    );
} 