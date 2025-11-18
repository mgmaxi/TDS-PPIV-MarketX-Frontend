"use client";

import { CartItem } from "@/types/cartItems";

interface CartSummaryProps {
  cartItems: CartItem[];
  total: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ cartItems, total }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-fit border-t-4 border-primary">
      <h2 className="text-xl font-bold mb-4">Resumen de compra</h2>
      <div className="space-y-2 text-sm text-gray-700">
        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))
        )}
        <div className="border-t pt-2 font-semibold text-lg">
          <span>Total: </span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
