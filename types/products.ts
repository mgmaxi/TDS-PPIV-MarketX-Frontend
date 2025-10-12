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
}
