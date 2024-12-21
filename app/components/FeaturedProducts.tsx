import Image from 'next/image';
import AddToCartButton from './AddToCartButton';

const products = [
  {
    id: 1,
    name: 'Classic Chocolate Cake',
    price: 35,
    description: 'Rich chocolate layers with ganache',
    image: '/cakes/chocolate-cake.jpg',
    category: 'Cakes'
  },
  {
    id: 2,
    name: 'Strawberry Cheesecake',
    price: 40,
    description: 'Light and fluffy with vanilla buttercream',
    image: '/cakes/strawberry-cheesecake.jpg',
    category: 'Cakes'
  },
  {
    id: 3,
    name: 'Fruit Tart',
    price: 25,
    description: 'Fresh seasonal fruits on custard',
    image: '/cakes/fruit-tart.jpg',
    category: 'Pastries'
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
              <div className="relative h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-rose-600 font-bold mb-4">${product.price}</p>
                <AddToCartButton product={product} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 