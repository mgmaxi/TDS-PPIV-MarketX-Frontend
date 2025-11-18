"use client";

interface ModalConfirmProps {
  isOpen: boolean;
  total: number;
  confirmPurchase: () => void;
  cancelPurchase: () => void;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  isOpen,
  total,
  confirmPurchase,
  cancelPurchase,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full border-t-4 border-primary">
        <h3 className="text-xl font-bold mb-4">¿Estás seguro de realizar la compra?</h3>
        <p>El total de tu compra es: ${total.toFixed(2)}</p>
        <div className="mt-6 flex justify-between">
          <button
            onClick={confirmPurchase}
            className="btn-primary py-2 px-6 text-lg font-semibold rounded-lg"
          >
            Confirmar
          </button>
          <button
            onClick={cancelPurchase}
            className="btn-secondary py-2 px-6 text-lg font-semibold rounded-lg"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
