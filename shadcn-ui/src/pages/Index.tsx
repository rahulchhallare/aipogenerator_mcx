import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Hero from '@/components/Hero';
import CompanySection from '@/components/CompanySection';
import VendorSection from '@/components/VendorSection';
import LineItemsSection from '@/components/LineItemsSection';
import POPreview from '@/components/POPreview';
import { CompanyInfo, VendorInfo, LineItem, POData } from '@/types/po';
import { Calendar, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function Index() {
  const [showForm, setShowForm] = useState(false);
  const [company, setCompany] = useState<CompanyInfo>({
    name: '',
    gst: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    logo: ''
  });
  
  const [vendor, setVendor] = useState<VendorInfo>({
    name: '',
    gst: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: ''
  });
  
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: crypto.randomUUID(),
      description: '',
      unit: 'Nos',
      quantity: 1,
      rate: 0,
      taxRate: 0,
      amount: 0,
      taxAmount: 0,
      total: 0
    }
  ]);
  
  const [poNumber, setPoNumber] = useState('');
  const [poDate, setPoDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('Net 30 Days');
  const [termsConditions, setTermsConditions] = useState('1. Payment terms as agreed\n2. Delivery as per schedule\n3. Quality as per specifications');
  
  // Generate PO Number on mount
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const random = String(Math.floor(Math.random() * 99999)).padStart(5, '0');
    setPoNumber(`PO-${year}-${month}-${random}`);
    setPoDate(today.toISOString().split('T')[0]);
    
    // Set delivery date to 30 days from now
    const deliveryDate = new Date(today);
    deliveryDate.setDate(deliveryDate.getDate() + 30);
    setDeliveryDate(deliveryDate.toISOString().split('T')[0]);
  }, []);
  
  // Calculate line item totals
  useEffect(() => {
    setLineItems(items => items.map(item => {
      const amount = item.quantity * item.rate;
      const taxAmount = (amount * item.taxRate) / 100;
      const total = amount + taxAmount;
      return { ...item, amount, taxAmount, total };
    }));
  }, []);
  
  const updateCompany = (field: keyof CompanyInfo, value: string) => {
    setCompany(prev => ({ ...prev, [field]: value }));
  };
  
  const updateVendor = (field: keyof VendorInfo, value: string) => {
    setVendor(prev => ({ ...prev, [field]: value }));
  };
  
  const addLineItem = () => {
    setLineItems(prev => [...prev, {
      id: crypto.randomUUID(),
      description: '',
      unit: 'Nos',
      quantity: 1,
      rate: 0,
      taxRate: 0,
      amount: 0,
      taxAmount: 0,
      total: 0
    }]);
    toast.success('New item added');
  };
  
  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(prev => prev.filter(item => item.id !== id));
      toast.success('Item removed');
    }
  };
  
  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        const amount = updated.quantity * updated.rate;
        const taxAmount = (amount * updated.taxRate) / 100;
        const total = amount + taxAmount;
        return { ...updated, amount, taxAmount, total };
      }
      return item;
    }));
  };
  
  const calculateTotals = () => {
    const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
    const totalTax = lineItems.reduce((sum, item) => sum + item.taxAmount, 0);
    const grandTotal = subtotal + totalTax;
    return { subtotal, totalTax, grandTotal };
  };
  
  const { subtotal, totalTax, grandTotal } = calculateTotals();
  
  const poData: POData = {
    poNumber,
    poDate,
    deliveryDate,
    paymentTerms,
    company,
    vendor,
    lineItems,
    termsConditions,
    subtotal,
    totalTax,
    grandTotal
  };
  
  const handleDownload = () => {
    toast.success('Preparing PDF download...', {
      description: 'Your PO will be downloaded shortly'
    });
    
    // Small delay to show the toast before printing
    setTimeout(() => {
      window.print();
    }, 500);
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  if (!showForm) {
    return <Hero onGetStarted={() => setShowForm(true)} />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200 no-print">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowForm(false)}
                className="text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">AI PO Generator</h1>
                <p className="text-sm text-slate-600">Create professional purchase orders instantly</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="h-4 w-4" />
              <span>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6 no-print">
            {/* PO Details */}
            <Card className="shadow-md">
              <CardHeader className="bg-slate-50">
                <CardTitle className="text-slate-900">Purchase Order Details</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="po-number">PO Number</Label>
                    <Input
                      id="po-number"
                      value={poNumber}
                      onChange={(e) => setPoNumber(e.target.value)}
                      className="border-slate-300 focus:border-blue-500 bg-slate-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="po-date">PO Date</Label>
                    <Input
                      id="po-date"
                      type="date"
                      value={poDate}
                      onChange={(e) => setPoDate(e.target.value)}
                      className="border-slate-300 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="delivery-date">Delivery Date</Label>
                    <Input
                      id="delivery-date"
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="border-slate-300 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-terms">Payment Terms</Label>
                    <Input
                      id="payment-terms"
                      value={paymentTerms}
                      onChange={(e) => setPaymentTerms(e.target.value)}
                      className="border-slate-300 focus:border-blue-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <CompanySection company={company} onChange={updateCompany} />
            <VendorSection vendor={vendor} onChange={updateVendor} />
            <LineItemsSection
              lineItems={lineItems}
              onAddItem={addLineItem}
              onRemoveItem={removeLineItem}
              onUpdateItem={updateLineItem}
            />
            
            {/* Terms & Conditions */}
            <Card className="shadow-md">
              <CardHeader className="bg-slate-50">
                <CardTitle className="text-slate-900">Terms & Conditions</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Textarea
                  value={termsConditions}
                  onChange={(e) => setTermsConditions(e.target.value)}
                  rows={6}
                  className="border-slate-300 focus:border-blue-500"
                  placeholder="Enter terms and conditions..."
                />
              </CardContent>
            </Card>
            
            {/* Summary Card */}
            <Card className="shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-slate-700">
                    <span>Subtotal:</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Total Tax:</span>
                    <span className="font-semibold">₹{totalTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-blue-900 pt-3 border-t-2 border-blue-300">
                    <span>Grand Total:</span>
                    <span>₹{grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Preview */}
          <div>
            <POPreview 
              poData={poData} 
              onDownload={handleDownload}
              onPrint={handlePrint}
            />
          </div>
        </div>
      </div>
      
      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            margin: 0.5cm;
            size: A4;
          }
          
          body {
            margin: 0;
            padding: 0;
          }
          
          .no-print,
          .no-print * {
            display: none !important;
          }
          
          #po-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            max-width: 100%;
            margin: 0;
            padding: 20px;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
          }
          
          /* Ensure proper page breaks */
          .page-break {
            page-break-before: always;
          }
          
          /* Prevent elements from breaking across pages */
          table, .signature-section {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}