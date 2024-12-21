'use client';
import { useState } from 'react';
import Image from 'next/image';
import AddToCartButton from '../components/AddToCartButton';
import ProductDetailsModal from '../components/ProductDetailsModal';
import { FaInfoCircle } from 'react-icons/fa';
import { Product } from '../types'; // Ensure you import the Product type from the correct path

const menuCategories = [
  {
    id: 1,
    name: 'Cakes',
    items: [
      { 
        id: 1, 
        name: 'Classic Chocolate Cake', 
        price: 35, 
        description: 'Rich chocolate layers with ganache',
        image: '/cakes/chocolate-cake.jpg',
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
    ]
  },
  {
    id: 2,
    name: 'Pastries',
    items: [
      { 
        id: 4, 
        name: 'Croissants', 
        price: 4, 
        description: 'Buttery and flaky classic croissants',
        image: '/pastries/croissant.jpg',
        category: 'Pastries',
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
        id: 5, 
        name: 'Danish Pastries', 
        price: 4.50, 
        description: 'Assorted fruit and cream filled danish',
        image: '/pastries/danish.jpg',
        category: 'Pastries',
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
        id: 6, 
        name: 'Eclairs', 
        price: 5, 
        description: 'Chocolate topped with vanilla custard filling',
        image: '/pastries/eclair.jpg',
        category: 'Pastries',
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
    ]
  },
  {
    id: 3,
    name: 'Special Occasions',
    items: [
      { 
        id: 7, 
        name: 'Wedding Cake', 
        price: 200, 
        description: 'Custom designed wedding cakes',
        image: '/cakes/wedding-cake.jpg',
        category: 'Special Occasions',
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
        id: 8, 
        name: 'Birthday Cake', 
        price: 45, 
        description: 'Personalized birthday cakes',
        image: '/cakes/birthday-cake.jpg',
        category: 'Special Occasions',
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
        id: 9, 
        name: 'Celebration Cake', 
        price: 50, 
        description: 'Special occasion custom cakes',
        image: '/cakes/celebration-cake.jpg',
        category: 'Special Occasions',
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
    ]
  }
];

export default function Menu() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <main className="pt-20">
      <div className="bg-rose-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Our Menu</h1>
          
          {menuCategories.map((category: any) => (
            <div key={category.id} className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-rose-600">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item: any ) => (
                  <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden group">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        onClick={() => setSelectedProduct(item)}
                        className="absolute bottom-2 right-2 bg-white bg-opacity-90 p-2 rounded-full shadow hover:bg-opacity-100 transition-opacity"
                      >
                        <FaInfoCircle className="text-rose-600" />
                      </button>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-rose-600 font-bold">${item.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">{item.details.weight} • {item.details.servings}</p>
                    </div>
                    <AddToCartButton product={item} />
                  </div>
                ))}
              </div>
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
    </main>
  );
} 