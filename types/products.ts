import { mockProducts } from "@/components/ProductCarousel";
import { products } from "@/components/RecommendedCarousel";

export interface Product {
  id: number | string;
  name: string;
  price: number;
  image: string;
  seller?: string;
  description?: string;
  category?: string;
  stock?: number;
  featured?: boolean;
  href?: string;
  active?: boolean;
}

export const AllProducts = [...mockProducts, ...products];
