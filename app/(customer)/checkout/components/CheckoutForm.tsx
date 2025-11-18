"use client";

import React from "react";
import { FormState } from "@/types/formCheckout";

interface CheckoutFormProps {
  form: FormState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ form, handleChange, handleSubmit }) => {
  return (
    <form
      className="lg:col-span-2 max-w-2xl mx-auto space-y-6 bg-white p-8 rounded-lg shadow-lg border-t-4 border-primary"
      onSubmit={handleSubmit}
    >
      {/* Datos personales */}
      <input
        type="text"
        name="name"
        placeholder="Nombre completo"
        value={form.name}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        required
      />

      <input
        type="text"
        name="address"
        placeholder="Dirección completa (calle, número, etc.)"
        value={form.address}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        required
      />

      <input
        type="text"
        name="city"
        placeholder="Ciudad"
        value={form.city}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        required
      />

      <input
        type="text"
        name="zip"
        placeholder="Código postal"
        value={form.zip}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        required
      />

      {/* Método de pago */}
      <div className="space-y-4">
        <select
          name="payment"
          value={form.payment}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          required
        >
          <option value="">Selecciona un método de pago</option>
          <option value="credito">Tarjeta de crédito</option>
          <option value="debito">Tarjeta de débito</option>
          <option value="efectivo">Efectivo</option>
          <option value="transferencia">Transferencia bancaria</option>
        </select>

        {(form.payment === "credito" || form.payment === "debito") && (
          <>
            <input
              type="text"
              name="cardNumber"
              placeholder="Número de tarjeta"
              value={form.cardNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              required
            />
            <div className="flex gap-4">
              <input
                type="text"
                name="expiry"
                placeholder="Fecha de vencimiento (MM/AA)"
                value={form.expiry}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              />
              <input
                type="text"
                name="cvv"
                placeholder="Código de seguridad (CVV)"
                value={form.cvv}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              />
            </div>
          </>
        )}

        {form.payment === "efectivo" && (
          <p className="text-gray-600">
            Pagarás en efectivo al recibir tu pedido.
          </p>
        )}

        {form.payment === "transferencia" && (
          <p className="text-gray-600">
            Te enviaremos los datos bancarios por correo para completar la
            transferencia.
          </p>
        )}
      </div>

      <button
        type="submit"
        className="btn-primary w-full py-3 mt-4 text-lg font-semibold rounded-lg"
      >
        Confirmar compra
      </button>
    </form>
  );
};

export default CheckoutForm;
