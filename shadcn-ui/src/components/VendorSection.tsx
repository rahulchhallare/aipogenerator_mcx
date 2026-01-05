import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VendorInfo } from '@/types/po';
import { Users } from 'lucide-react';

interface VendorSectionProps {
  vendor: VendorInfo;
  onChange: (field: keyof VendorInfo, value: string) => void;
}

export default function VendorSection({ vendor, onChange }: VendorSectionProps) {
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <Users className="h-5 w-5 text-blue-600" />
          Vendor Information
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="vendor-name">Vendor Name *</Label>
          <Input
            id="vendor-name"
            placeholder="Enter vendor name"
            value={vendor.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="border-slate-300 focus:border-blue-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="vendor-gst">GST Number (Optional)</Label>
          <Input
            id="vendor-gst"
            placeholder="e.g., 29ABCDE1234F1Z5"
            value={vendor.gst}
            onChange={(e) => onChange('gst', e.target.value.toUpperCase())}
            className="border-slate-300 focus:border-blue-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="vendor-address">Address *</Label>
          <Input
            id="vendor-address"
            placeholder="Street address"
            value={vendor.address}
            onChange={(e) => onChange('address', e.target.value)}
            className="border-slate-300 focus:border-blue-500"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="vendor-city">City *</Label>
            <Input
              id="vendor-city"
              placeholder="City"
              value={vendor.city}
              onChange={(e) => onChange('city', e.target.value)}
              className="border-slate-300 focus:border-blue-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vendor-state">State *</Label>
            <Input
              id="vendor-state"
              placeholder="State"
              value={vendor.state}
              onChange={(e) => onChange('state', e.target.value)}
              className="border-slate-300 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="vendor-pincode">Pincode *</Label>
            <Input
              id="vendor-pincode"
              placeholder="e.g., 560001"
              value={vendor.pincode}
              onChange={(e) => onChange('pincode', e.target.value)}
              className="border-slate-300 focus:border-blue-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vendor-phone">Phone *</Label>
            <Input
              id="vendor-phone"
              placeholder="e.g., +91 9876543210"
              value={vendor.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className="border-slate-300 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="vendor-email">Email *</Label>
          <Input
            id="vendor-email"
            type="email"
            placeholder="vendor@example.com"
            value={vendor.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="border-slate-300 focus:border-blue-500"
          />
        </div>
      </CardContent>
    </Card>
  );
}