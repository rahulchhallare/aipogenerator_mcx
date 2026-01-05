import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { POData } from '@/types/po';
import { FileText, Download, Printer } from 'lucide-react';

interface POPreviewProps {
  poData: POData;
  onDownload: () => void;
  onPrint: () => void;
}

export default function POPreview({ poData, onDownload, onPrint }: POPreviewProps) {
  return (
    <Card className="shadow-md sticky top-6">
      <CardHeader className="bg-slate-50 no-print">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <FileText className="h-5 w-5 text-blue-600" />
            Live Preview
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={onPrint}
              className="border-slate-300"
            >
              <Printer className="h-4 w-4 mr-1" />
              Print
            </Button>
            <Button 
              size="sm"
              onClick={onDownload}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div id="po-preview" className="bg-white border border-slate-200 rounded-lg p-8 text-sm">
          {/* Header - Logo and Title on Same Line */}
          <div className="mb-8 pb-6 border-b-2 border-slate-900">
            <div className="flex items-center justify-between mb-4">
              {poData.company.logo && (
                <img src={poData.company.logo} alt="Company logo" className="h-16 object-contain" />
              )}
              <h1 className="text-3xl font-bold text-slate-900">PURCHASE ORDER</h1>
              {!poData.company.logo && <div className="w-16"></div>}
            </div>
            <div className="text-center">
              <p className="text-slate-600">PO Number: {poData.poNumber || 'N/A'}</p>
              <p className="text-slate-600">Date: {poData.poDate || 'N/A'}</p>
            </div>
          </div>
          
          {/* Company and Vendor Info */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-slate-900 mb-3 text-base">From:</h3>
              <div className="space-y-1 text-slate-700">
                <p className="font-semibold">{poData.company.name || 'Company Name'}</p>
                {poData.company.gst && <p>GST: {poData.company.gst}</p>}
                <p>{poData.company.address || 'Address'}</p>
                <p>{poData.company.city && poData.company.state ? `${poData.company.city}, ${poData.company.state}` : ''} {poData.company.pincode}</p>
                <p>{poData.company.phone}</p>
                <p>{poData.company.email}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-slate-900 mb-3 text-base">To:</h3>
              <div className="space-y-1 text-slate-700">
                <p className="font-semibold">{poData.vendor.name || 'Vendor Name'}</p>
                {poData.vendor.gst && <p>GST: {poData.vendor.gst}</p>}
                <p>{poData.vendor.address || 'Address'}</p>
                <p>{poData.vendor.city && poData.vendor.state ? `${poData.vendor.city}, ${poData.vendor.state}` : ''} {poData.vendor.pincode}</p>
                <p>{poData.vendor.phone}</p>
                <p>{poData.vendor.email}</p>
              </div>
            </div>
          </div>
          
          {/* PO Details */}
          <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-slate-50 rounded">
            <div>
              <p className="text-slate-600">Payment Terms:</p>
              <p className="font-semibold text-slate-900">{poData.paymentTerms || 'N/A'}</p>
            </div>
            <div>
              <p className="text-slate-600">Delivery Date:</p>
              <p className="font-semibold text-slate-900">{poData.deliveryDate || 'N/A'}</p>
            </div>
          </div>
          
          {/* Line Items Table */}
          <div className="mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ backgroundColor: '#dbeafe' }} className="text-slate-900">
                  <th className="border border-slate-300 p-2 text-left">#</th>
                  <th className="border border-slate-300 p-2 text-left">Description</th>
                  <th className="border border-slate-300 p-2 text-left">Unit</th>
                  <th className="border border-slate-300 p-2 text-right">Qty</th>
                  <th className="border border-slate-300 p-2 text-right">Rate</th>
                  <th className="border border-slate-300 p-2 text-right">Amount</th>
                  <th className="border border-slate-300 p-2 text-right">Tax</th>
                  <th className="border border-slate-300 p-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {poData.lineItems.length > 0 ? (
                  poData.lineItems.map((item, index) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-2">{index + 1}</td>
                      <td className="border border-slate-300 p-2">{item.description || 'N/A'}</td>
                      <td className="border border-slate-300 p-2">{item.unit || '-'}</td>
                      <td className="border border-slate-300 p-2 text-right">{item.quantity}</td>
                      <td className="border border-slate-300 p-2 text-right">₹{item.rate.toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right">₹{item.amount.toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right">₹{item.taxAmount.toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right font-semibold">₹{item.total.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="border border-slate-300 p-4 text-center text-slate-500">
                      No items added
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-64 space-y-2">
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">Subtotal:</span>
                <span className="font-semibold">₹{poData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">Total Tax:</span>
                <span className="font-semibold">₹{poData.totalTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3 bg-slate-900 text-white px-3 rounded">
                <span className="font-bold">Grand Total:</span>
                <span className="font-bold text-lg">₹{poData.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Terms and Conditions */}
          {poData.termsConditions && (
            <div className="mb-8">
              <h3 className="font-bold text-slate-900 mb-2">Terms & Conditions:</h3>
              <p className="text-slate-700 whitespace-pre-wrap text-sm">{poData.termsConditions}</p>
            </div>
          )}
          
          {/* Signature */}
          <div className="mt-12 pt-8 border-t border-slate-300 signature-section">
            <div className="flex justify-between">
              <div>
                <p className="text-slate-600 mb-8">Vendor Signature</p>
                <div className="border-t border-slate-400 w-48 pt-1">
                  <p className="text-xs text-slate-500">Date: ___________</p>
                </div>
              </div>
              <div>
                <p className="text-slate-600 mb-8">Authorized Signatory</p>
                <div className="border-t border-slate-400 w-48 pt-1">
                  <p className="text-xs text-slate-500">Date: ___________</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}