import { useState } from 'react';
import { Upload, Camera, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { api } from '../../lib/firestoreStubs';
import { useTheme } from '../../lib/ThemeContext';

export function WoundUploader() {
  const { isDarkTheme } = useTheme();
  const [isUploading, setIsUploading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setIsUploading(true);
    setAnalysis(null);

    try {
      // Simulate upload and analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      const result = await api.analyzeWoundImage(file.name);
      
      setAnalysis(result.analysis);
      setIsUploading(false);

      if (result.analysis.flagged) {
        toast.warning('Wound requires attention', {
          description: 'AI detected potential concerns. Review the analysis below.',
          duration: 5000
        });
      } else {
        toast.success('Wound analysis complete', {
          description: 'Your wound is healing well!',
          duration: 3000
        });
      }
    } catch (error) {
      setIsUploading(false);
      toast.error('Upload failed', {
        description: 'Please try again or contact support.'
      });
    }
  };

  const resetUpload = () => {
    setImagePreview(null);
    setAnalysis(null);
  };

  return (
    <Card className={`${isDarkTheme ? 'dark-glass-card' : 'light-glass-card'} p-6 rounded-[18px] card-hover-lift transition-all duration-400`}>
      <div className="animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: '200ms' }}>
        <h3 className={`mb-4 ${isDarkTheme ? 'text-[#E8E8E8]' : 'text-[#0B1220]'} font-semibold`} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}>
          Wound Monitoring
        </h3>

        {!imagePreview ? (
          <label className="block">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] ${
                isDarkTheme
                  ? 'border-white/20 hover:border-[#37E29D]/50 hover:bg-white/[0.03]'
                  : 'border-gray-300 hover:border-[#1C8B82] hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <div className={`p-4 rounded-full backdrop-blur-sm ${
                  isDarkTheme ? 'bg-[#1C8B82]/20' : 'bg-[#1C8B82]/10'
                }`}>
                  <Camera className="w-8 h-8 text-[#37E29D]" />
                </div>
                <div>
                  <p className="gradient-text mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                    Upload Wound Photo
                  </p>
                  <p className="gradient-text-secondary text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                    Click to take or upload a photo for AI analysis
                  </p>
                </div>
              </div>
            </div>
          </label>
        ) : (
          <div className="space-y-4">
            {/* Image Preview */}
            <div className="relative rounded-xl overflow-hidden animate-in zoom-in">
              <img
                src={imagePreview}
                alt="Wound preview"
                className="w-full h-48 object-cover"
              />
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center text-white">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-[#37E29D]" />
                    <p className="text-sm gradient-text" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                      Analyzing with AI...
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Analysis Results */}
            {analysis && (
              <div
                className={`p-4 rounded-xl border backdrop-blur-sm animate-in fade-in slide-in-from-top-2 ${
                  analysis.flagged
                    ? 'bg-[#FFD580]/20 border-[#FFD580]/30'
                    : 'bg-[#37E29D]/20 border-[#37E29D]/30'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  {analysis.flagged ? (
                    <AlertTriangle className="w-5 h-5 text-[#FFD580] flex-shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-[#37E29D] flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className={`${analysis.flagged ? 'text-[#FFD580]' : 'text-[#37E29D]'} mb-2`} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                      <strong>AI Analysis:</strong> {analysis.status === 'healing_well' ? 'Healing Well' : 'Needs Attention'}
                    </p>
                    <p className="gradient-text-secondary text-sm mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                      Confidence: {(analysis.confidence * 100).toFixed(0)}%
                    </p>
                    
                    <div className="space-y-1.5 mb-3">
                      {analysis.findings.map((finding: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm gradient-text-secondary animate-in fade-in slide-in-from-left-2"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, animationDelay: `${idx * 100}ms` }}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            isDarkTheme ? 'bg-[#A7B0B5]' : 'bg-gray-400'
                          }`} />
                          {finding}
                        </div>
                      ))}
                    </div>

                    <div className={`p-3 rounded-lg backdrop-blur-sm ${
                      isDarkTheme ? 'bg-white/[0.05]' : 'bg-gray-100'
                    }`}>
                      <p className="text-sm gradient-text" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                        <strong>Recommendation:</strong> {analysis.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                onClick={resetUpload}
                variant="outline"
                className={`flex-1 rounded-xl ${
                  isDarkTheme
                    ? 'border-white/20 bg-white/[0.03] hover:bg-white/[0.08]'
                    : 'border-gray-300 bg-white hover:bg-gray-50'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
              >
                <span className="gradient-text">Upload Another</span>
              </Button>
              {analysis?.flagged && (
                <Button 
                  className="flex-1 bg-[#FFD580]/30 hover:bg-[#FFD580]/40 text-[#FFD580] border border-[#FFD580]/40 rounded-xl"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                >
                  Notify Doctor
                </Button>
              )}
            </div>
          </div>
        )}

        <p className="gradient-text-muted text-sm mt-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
          💡 Tip: Take photos in good lighting, showing the entire wound area
        </p>
      </div>
    </Card>
  );
}
