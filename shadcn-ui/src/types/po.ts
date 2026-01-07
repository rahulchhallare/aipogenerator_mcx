export interface CompanyInfo {
  name: string;
  gst: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  logo?: string;
}

export interface VendorInfo {
  name: string;
  gst: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
}

export interface LineItem {
  id: string;
  description: string;
  unit: string;
  quantity: number;
  rate: number;
  amount: number;
  taxAmount: number;
  total: number;
  taxRate?: number;
}

export interface POData {
  poNumber: string;
  poDate: string;
  deliveryDate: string;
  paymentTerms: string;
  company: CompanyInfo;
  vendor: VendorInfo;
  lineItems: LineItem[];
  termsConditions: string;
  subtotal: number;
  totalTax: number;
  grandTotal: number;
}