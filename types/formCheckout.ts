export interface FormState {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  payment: "" | "credito" | "debito" | "efectivo" | "transferencia";
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export const initialFormState: FormState = {
  name: "",
  email: "",
  address: "",
  city: "",
  zip: "",
  payment: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};
