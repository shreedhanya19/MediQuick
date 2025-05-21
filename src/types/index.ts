export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  dosage?: string;
  usage?: string;
  sideEffects?: string;
  stock: number;
  dataAiHint?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  // medicalHistory?: string; // Simplified for now
  // insuranceInfo?: string; // Simplified for now
}

export interface LabTest {
  id: string;
  name: string;
  description: string;
  price: number;
  preparation?: string;
  imageUrl: string;
  dataAiHint?: string;
}
