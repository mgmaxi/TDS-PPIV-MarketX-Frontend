import { Product } from "./products";

export interface CartItem extends Product {
  quantity: number;
}

export const initialCart: CartItem[] = [
  {
    id: 1,
    name: "Auriculares Bluetooth Sony WH-1000XM5",
    price: 420,
    quantity: 1,
    image: "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Smartphone Samsung Galaxy S24",
    price: 1100,
    quantity: 2,
    image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];
