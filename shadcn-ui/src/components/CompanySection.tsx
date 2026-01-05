import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompanyInfo } from '@/types/po';
import { Building2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CompanySectionProps {
  company: CompanyInfo;
  onChange: (field: keyof CompanyInfo, value: string) => void;
}

export default function CompanySection({ company, onChange }: CompanySectionProps) {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange('logo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-slate-50">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <Building2 className="h-5 w-5 text-blue-600" />
          Company Information
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="company-name">Company Name *</Label>
          <Input
            id="company-name"
            placeholder="Enter company name"
            value={company.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="border-slate-300 focus:border-blue-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company-logo">Company Logo (Optional)</Label>
          <div className="flex items-center gap-4">
            <Input
              id="company-logo"
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="border-slate-300 focus:border-blue-500"
            />
            {company.logo && (
              <div className="flex-shrink-0">
                <img src={company.logo} alt="Company logo" className="h-12 w-12 object-contain border border-slate-200 rounded" />
              </div>
            )}
          </div>
          <p className="text-xs text-slate-500">Upload your company logo (PNG, JPG, SVG)</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company-gst">GST Number (Optional)</Label>
          <Input
            id="company-gst"
            placeholder="e.g., 29ABCDE1234F1Z5"
            value={company.gst}
            onChange={(e) => onChange('gst', e.target.value.toUpperCase())}
            className="border-slate-300 focus:border-blue-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company-address">Address *</Label>
          <Input
            id="company-address"
            placeholder="Street address"
            value={company.address}
            onChange={(e) => onChange('address', e.target.value)}
            className="border-slate-300 focus:border-blue-500"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company-city">City *</Label>
            <Input
              id="company-city"
              placeholder="City"
              value={company.city}
              onChange={(e) => onChange('city', e.target.value)}
              className="border-slate-300 focus:border-blue-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company-state">State *</Label>
            <Input
              id="company-state"
              placeholder="State"
              value={company.state}
              onChange={(e) => onChange('state', e.target.value)}
              className="border-slate-300 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company-pincode">Pincode *</Label>
            <Input
              id="company-pincode"
              placeholder="e.g., 560001"
              value={company.pincode}
              onChange={(e) => onChange('pincode', e.target.value)}
              className="border-slate-300 focus:border-blue-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company-phone">Phone *</Label>
            <Input
              id="company-phone"
              placeholder="e.g., +91 9876543210"
              value={company.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className="border-slate-300 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company-email">Email *</Label>
          <Input
            id="company-email"
            type="email"
            placeholder="company@example.com"
            value={company.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="border-slate-300 focus:border-blue-500"
          />
        </div>
      </CardContent>
    </Card>
  );
}