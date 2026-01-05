# AI PO Generator - Development Plan

## Design Guidelines

### Design References (Primary Inspiration)
- **Stripe.com**: Clean, professional, trust-building design
- **Linear.app**: Modern SaaS interface with excellent form UX
- **Style**: Modern Professional + Clean Forms + Business Trust

### Color Palette
- Primary: #0F172A (Slate 900 - professional dark)
- Secondary: #1E293B (Slate 800 - cards/sections)
- Accent: #3B82F6 (Blue 500 - CTAs and highlights)
- Success: #10B981 (Emerald 500 - confirmations)
- Text: #0F172A (Dark), #64748B (Slate 500 - secondary)
- Background: #F8FAFC (Slate 50 - light background)

### Typography
- Heading1: Inter font-weight 700 (48px)
- Heading2: Inter font-weight 600 (36px)
- Heading3: Inter font-weight 600 (24px)
- Body/Normal: Inter font-weight 400 (16px)
- Body/Emphasis: Inter font-weight 600 (16px)
- Form Labels: Inter font-weight 500 (14px)

### Key Component Styles
- **Buttons**: Blue primary (#3B82F6), white text, 8px rounded, hover: darken 10%
- **Cards**: White background, subtle shadow, 12px rounded, 1px border (#E2E8F0)
- **Forms**: Clean inputs with border, focus: blue ring, proper spacing
- **PO Preview**: Professional document styling with borders and structured layout

### Layout & Spacing
- Hero section: Centered content, clear value proposition
- Form layout: Two-column responsive grid for better space utilization
- Section padding: 64px vertical, 24px horizontal
- Card spacing: 24px gaps between sections

### Images to Generate
1. **hero-business-documents.jpg** - Professional business documents and laptop setup, clean desk, modern office (Style: photorealistic, bright professional)
2. **icon-automation.png** - AI automation icon, modern minimalist design (Style: vector-style, blue accent)
3. **icon-document.png** - Document/PO icon, clean line art (Style: vector-style, professional)
4. **background-pattern.png** - Subtle geometric pattern for header background (Style: minimalist, light blue)

---

## Development Tasks

### 1. Setup & Structure
- Initialize shadcn-ui template
- Install dependencies
- Set up project structure

### 2. Generate Images
- Create all 4 images using ImageCreator.generate_image following design guidelines

### 3. Landing Page (Hero Section)
- Hero section with value proposition
- Feature highlights (AI-powered, Fast, Professional)
- Call-to-action button to generator
- Professional styling with generated images

### 4. PO Generator Form
- Company Information section (Name, GST, Address, Contact)
- Vendor Information section (Name, GST, Address, Contact)
- Line Items section (Dynamic add/remove items)
  - Product/Service Description
  - HSN/SAC Code
  - Quantity
  - Rate
  - Tax Rate (%)
  - Amount (auto-calculated)
- Additional Details (PO Number, Date, Payment Terms, Delivery Date)
- Terms & Conditions textarea

### 5. AI-Powered Features
- Auto-generate PO number (format: PO-YYYY-MM-XXXXX)
- Auto-calculate line item amounts (Quantity × Rate)
- Auto-calculate tax amounts
- Auto-calculate subtotal, total tax, and grand total
- Smart field validation
- Date picker for PO date and delivery date

### 6. Live Preview Panel
- Real-time PO preview as user fills form
- Professional document formatting
- Company letterhead area
- Vendor details section
- Itemized table with calculations
- Terms and conditions display
- Signature section

### 7. Download/Export Functionality
- Generate PDF button
- Print functionality
- Professional PO template formatting
- Proper page breaks and margins

### 8. Components to Create
- `src/components/Hero.tsx` - Landing hero section
- `src/components/POForm.tsx` - Main form component
- `src/components/CompanySection.tsx` - Company info form
- `src/components/VendorSection.tsx` - Vendor info form
- `src/components/LineItemsSection.tsx` - Dynamic line items
- `src/components/POPreview.tsx` - Live preview panel
- `src/components/PODocument.tsx` - Printable PO template
- `src/App.tsx` - Main app with routing/state

### 9. Styling & Responsiveness
- Apply design system consistently
- Responsive layouts (mobile, tablet, desktop)
- Form validation styling
- Loading states and animations
- Print-specific CSS for PO document

### 10. Testing & Final Check
- Test all calculations
- Test form validation
- Test PDF generation
- Test responsive design
- Run lint and build