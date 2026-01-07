import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineItem } from '@/types/po';
import { Plus, Trash2, ShoppingCart } from 'lucide-react';

interface LineItemsSectionProps {
  lineItems: LineItem[];
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, field: keyof LineItem, value: string | number) => void;
}

const UNITS = ['Nos', 'Pcs', 'Sqft', 'Sqm', 'Kg', 'Ltr', 'Box', 'Set', 'Pair', 'Dozen'];

export default function LineItemsSection({ 
  lineItems, 
  onAddItem, 
  onRemoveItem, 
  onUpdateItem 
}: LineItemsSectionProps) {
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-slate-50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <ShoppingCart className="h-5 w-5 text-blue-600" />
            Line Items
          </CardTitle>
          <Button 
            onClick={onAddItem}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Item
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {lineItems.map((item, index) => (
          <div key={item.id} className="p-4 border border-slate-200 rounded-lg space-y-4 bg-slate-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-700">Item #{index + 1}</span>
              {lineItems.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label>Description *</Label>
                <Input
                  placeholder="Product or service description"
                  value={item.description}
                  onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                  className="border-slate-300 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Unit *</Label>
                <Select
                  value={item.unit}
                  onValueChange={(value) => onUpdateItem(item.id, 'unit', value)}
                >
                  <SelectTrigger className="border-slate-300 focus:border-blue-500">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {UNITS.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Quantity *</Label>
                <Input
                  type="number"
                  min="1"
                  placeholder="0"
                  value={item.quantity || ''}
                  onChange={(e) => onUpdateItem(item.id, 'quantity', e.target.value)}
                  className="border-slate-300 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Rate (₹) *</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={item.rate || ''}
                  onChange={(e) => onUpdateItem(item.id, 'rate', e.target.value)}
                  className="border-slate-300 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Tax Rate (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="0"
                  value={item.taxRate || ''}
                  onChange={(e) => onUpdateItem(item.id, 'taxRate', e.target.value)}
                  className="border-slate-300 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-slate-200">
              <div className="text-center">
                <p className="text-xs text-slate-600 mb-1">Amount</p>
                <p className="text-sm font-semibold text-slate-900">₹{item.amount.toFixed(2)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-600 mb-1">Tax</p>
                <p className="text-sm font-semibold text-slate-900">₹{item.taxAmount.toFixed(2)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-600 mb-1">Total</p>
                <p className="text-sm font-semibold text-blue-600">₹{item.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
        
        {lineItems.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No items added yet. Click "Add Item" to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}