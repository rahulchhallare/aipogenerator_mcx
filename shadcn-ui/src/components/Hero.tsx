import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, FileText, Shield } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('https://mgx-backend-cdn.metadl.com/generate/images/880299/2026-01-03/c4190ec3-f4ce-4509-a959-ef0f4f83eea2.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
          <div className="inline-block">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              AI-Powered Solution
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
            Generate Professional
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Purchase Orders </span>
            in Seconds
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed">
            Transform your procurement process with AI. Create accurate, compliant purchase orders instantly with intelligent automation and professional formatting.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
              onClick={onGetStarted}
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-slate-300 hover:border-blue-600 px-8 py-6 text-lg rounded-lg"
            >
              Watch Demo
            </Button>
          </div>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Zap className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">Instant Generation</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <FileText className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">GST Compliant</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Shield className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">Secure & Private</span>
            </div>
          </div>
        </div>
        
        {/* Right Image */}
        <div className="relative animate-in fade-in slide-in-from-right duration-700 delay-300">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://mgx-backend-cdn.metadl.com/generate/images/880299/2026-01-03/48cb35a7-99ec-4bf2-b2a1-df2f7ee9c6ad.png"
              alt="Professional business documents"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
          </div>
          
          {/* Floating Cards */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl animate-in fade-in slide-in-from-bottom duration-700 delay-500">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <img 
                  src="https://mgx-backend-cdn.metadl.com/generate/images/880299/2026-01-03/60b0acea-9ae6-4c49-a2ea-89b54229fdc7.png"
                  alt="AI automation"
                  className="w-8 h-8"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">AI-Powered</p>
                <p className="text-xs text-slate-600">Smart Calculations</p>
              </div>
            </div>
          </div>
          
          <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl animate-in fade-in slide-in-from-top duration-700 delay-500">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <img 
                  src="https://mgx-backend-cdn.metadl.com/generate/images/880299/2026-01-03/81c8d499-77f3-46d8-b3d8-afbe919d55fd.png"
                  alt="Document icon"
                  className="w-8 h-8"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Professional</p>
                <p className="text-xs text-slate-600">Export Ready</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}