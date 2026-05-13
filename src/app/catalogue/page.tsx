import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Star, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Professional LED UV Nail Lamp 120W",
    price: 350000,
    originalPrice: 450000,
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600",
    rating: 4.8,
    reviews: 124,
    isTrending: true,
  },
  {
    id: "2",
    name: "Premium Gel Polish Set 24 Colors",
    price: 850000,
    originalPrice: 1200000,
    image: "https://images.unsplash.com/photo-1632832865660-f46332ecf042?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    reviews: 89,
    isTrending: true,
  },
  {
    id: "3",
    name: "Electric Nail Drill Machine 35000RPM",
    price: 550000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1512496015851-a1c8e474ebf4?auto=format&fit=crop&q=80&w=600",
    rating: 4.7,
    reviews: 256,
  },
  {
    id: "4",
    name: "Luxury Nail Art Brush Set (15pcs)",
    price: 120000,
    originalPrice: 180000,
    image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=600",
    rating: 4.6,
    reviews: 67,
  },
  {
    id: "5",
    name: "Rhinestone Decor Kit 12 Grids",
    price: 45000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    reviews: 432,
  },
  {
    id: "6",
    name: "Acetone Resistant Manicure Bowl",
    price: 25000,
    originalPrice: 35000,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600",
    rating: 4.5,
    reviews: 12,
  }
];

export default function CataloguePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </Button>
          <select className="flex h-10 w-[180px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <option>Latest Arrivals</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Trending First</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-6 hidden md:block">
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="font-medium text-primary cursor-pointer">All Categories</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Nails & Art</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Beauty Tools</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Skincare</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Accessories</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="flex items-center gap-2">
              <input type="number" placeholder="Min" className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm" />
              <span>-</span>
              <input type="number" placeholder="Max" className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm" />
            </div>
            <Button className="w-full mt-3 h-9" size="sm">Apply</Button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <Card className="group h-full overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-background cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  {product.isTrending && (
                    <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                      HOT
                    </div>
                  )}
                  {product.originalPrice && (
                    <div className="absolute top-3 right-3 z-10 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded-md backdrop-blur-md">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </div>
                  )}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4 flex flex-col h-[calc(100%-125%)]">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{product.rating}</span>
                  </div>
                  <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="mt-auto flex flex-col gap-1">
                    <div className="flex items-end gap-2">
                      <span className="text-lg font-bold text-red-600">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through pb-0.5">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
