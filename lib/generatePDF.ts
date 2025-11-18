import { jsPDF } from "jspdf";
import { FormState } from "@/types/formCheckout";
import { CartItem } from "@/types/cartItems";

export const generarComprobante = (
  form: FormState,
  cartItems: CartItem[],
  total: number
) => {
  const doc = new jsPDF();

  // Establecer los estilos
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);

  // Título de la factura
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Factura de Compra", 14, 30);

  // Información de la tienda
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("MarketX S.A.", 14, 45);
  doc.text("Calle Ficticia 123, Ciudad", 14, 50);
  doc.text("Email: marketx.hermes.lab@gmail.com", 14, 55);
  doc.text("Teléfono: +1 234 567 890", 14, 60);

  // Línea de separación
  doc.setLineWidth(0.5);
  doc.line(14, 65, 200, 65);

  // Información del cliente
  doc.setFont("helvetica", "bold");
  doc.text("Datos del Cliente", 14, 75);
  doc.setFont("helvetica", "normal");
  doc.text(`Nombre: ${form.name}`, 14, 85);
  doc.text(`Email: ${form.email}`, 14, 90);
  doc.text(`Dirección: ${form.address}, ${form.city}, ${form.zip}`, 14, 95);

  // Línea de separación
  doc.setLineWidth(0.5);
  doc.line(14, 100, 200, 100);

  // Detalles de la compra
  doc.setFont("helvetica", "bold");
  doc.text("Detalle de la Compra", 14, 110);

  // Tabla de productos
  let startY = 120;
  const columns = ["Producto", "Cantidad", "Precio Unitario", "Subtotal"];

  // Definir el tamaño de las columnas
  const tableWidth = 180;
  const columnWidth = {
    product: 100,
    quantity: 25,
    price: 30,
    subtotal: 30
  };

  // Ubicación de las columnas
  const startX = 14;
  const productX = startX;
  const quantityX = productX + columnWidth.product;
  const priceX = quantityX + columnWidth.quantity;
  const subtotalX = priceX + columnWidth.price;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  // Dibujar encabezados de la tabla con ubicaciones fijas
  let headerY = startY;
  columns.forEach((column, index) => {
    const xPos = [productX, quantityX, priceX, subtotalX][index];
    doc.text(column, xPos, headerY);
  });

  // Mapeamos los productos del carrito para generar las filas de la tabla
  const rows: [string, string, string, string][] = cartItems.map((item) => [
    item.name, // Producto
    item.quantity.toString(), // Cantidad
    `$${item.price.toFixed(2)}`, // Precio Unitario
    `$${(item.price * item.quantity).toFixed(2)}` // Subtotal
  ]);

  // Dibujar filas de la tabla
  rows.forEach((row) => {
    startY += 10;

    // Dibujar la columna Producto (con salto de línea si es necesario)
    const productText = row[0];
    const productLines = doc.splitTextToSize(productText, columnWidth.product);
    let currentY = startY;

    // Si el texto del producto ocupa más de una línea, ajustamos el alto
    if (productLines.length > 1) {
      currentY += (productLines.length - 1) * 6; // Ajustar el espacio si hay más de una línea
    }

    // Dibujar el producto (en varias líneas si es necesario)
    doc.text(productLines, productX, currentY);

    // Dibujar las demás columnas (Cantidad, Precio, Subtotal)
    doc.text(row[1], quantityX, currentY);  // Cantidad
    doc.text(row[2], priceX, currentY);     // Precio Unitario
    doc.text(row[3], subtotalX, currentY);  // Subtotal
  });

  // Total y Totales
  startY += 15;
  doc.setFont("helvetica", "bold");
  doc.text(`Total: $${total.toFixed(2)}`, startX, startY);

  // Método de pago
  startY += 10;
  doc.setFont("helvetica", "normal");
  doc.text(`Método de Pago: ${form.payment === "credito" ? "Tarjeta de crédito" : form.payment === "debito" ? "Tarjeta de débito" : form.payment === "efectivo" ? "Efectivo" : "Transferencia bancaria"}`, startX, startY);

  // Fecha y número de factura
  const fecha = new Date().toLocaleString();
  doc.text(`Fecha: ${fecha}`, startX, startY + 10);
  doc.text(`Factura No: ${Math.floor(Math.random() * 10000)}`, startX, startY + 20);

  // Descargar el PDF
  doc.save(`comprobante_compra_${new Date().toISOString()}.pdf`);
};

