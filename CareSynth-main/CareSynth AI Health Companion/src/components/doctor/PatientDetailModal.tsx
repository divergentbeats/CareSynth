import { X, Activity, Calendar, Heart, TrendingDown, MessageSquare, Download, Send, Phone, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Patient } from '../../lib/mockData';
import { RiskGauge } from '../common/RiskGauge';
import { APIBadge } from '../common/APIBadge';
import { useTheme } from '../../lib/ThemeContext';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface PatientDetailModalProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PatientDetailModal({ patient, isOpen, onClose }: PatientDetailModalProps) {
  const { isDarkTheme } = useTheme();
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [message, setMessage] = useState('');
  
  if (!patient) return null;

  // GET /patient/{id}/generate-report
  const handleDownloadReport = () => {
    toast.success(`Generating PDF report for ${patient.name}...`, {
      description: 'Report will include pain trends, medication log, and recovery timeline.',
      duration: 3000
    });
  };

  // POST /patient/{id}/send-message
  const handleSendMessage = () => {
    if (!message.trim()) return;
    toast.success(`Message sent to ${patient.name}`, {
      description: 'Patient will receive notification via WhatsApp',
      duration: 3000
    });
    setMessage('');
    setShowMessageBox(false);
  };

  // POST /patient/{id}/alert
  const handleContactPatient = (method: 'whatsapp' | 'sms' | 'call') => {
    const methodLabels = {
      whatsapp: 'WhatsApp',
      sms: 'SMS',
      call: 'Phone Call'
    };
    toast.success(`Initiating ${methodLabels[method]} to ${patient.name}`, {
      description: 'Patient contact workflow triggered',
      duration: 3000
    });
  };

  const stats = [
    {
      icon: Calendar,
      label: 'Days Post-Op',
      value: patient.dayPostOp,
      color: 'text-blue-500 bg-blue-100'
    },
    {
      icon: Activity,
      label: 'Pain Level',
      value: `${patient.painLevel}/10`,
      color: 'text-purple-500 bg-purple-100'
    },
    {
      icon: Heart,
      label: 'Status',
      value: patient.status === 'stable' ? 'Stable' : patient.status === 'warning' ? 'Warning' : 'Critical',
      color: patient.status === 'stable' ? 'text-green-500 bg-green-100' : patient.status === 'warning' ? 'text-amber-500 bg-amber-100' : 'text-red-500 bg-red-100'
    }
  ];

  const mockWoundImages = [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
    'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl ${
        isDarkTheme ? 'dark-glass-card border-white/[0.12]' : 'bg-white border-gray-200'
      }`}>
        {/* Accessibility - Visually hidden but accessible to screen readers */}
        <DialogTitle className="sr-only">
          Patient Details: {patient.name}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Detailed patient information for {patient.name}, including recovery status, risk score, medication compliance, and recent activity.
        </DialogDescription>
        
        <div>
          {/* Header */}
          <div className={`sticky top-0 border-b p-6 rounded-t-2xl z-10 backdrop-blur-md ${
            isDarkTheme ? 'bg-[#0E1113]/95 border-white/[0.12]' : 'bg-white/95 border-gray-200'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#37E29D]/30">
                  <img src={patient.photo} alt={patient.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="gradient-text-glow mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '24px' }}>
                    {patient.name}, {patient.age}
                  </h2>
                  <p className="gradient-text-secondary" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                    {patient.surgery}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        patient.status === 'stable'
                          ? 'bg-[#37E29D]/20 text-[#37E29D] border-[#37E29D]/30'
                          : patient.status === 'warning'
                          ? 'bg-[#FFD580]/20 text-[#FFD580] border-[#FFD580]/30'
                          : 'bg-[#F47C7C]/20 text-[#F47C7C] border-[#F47C7C]/30'
                      }`}
                      style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                    >
                      {patient.status}
                    </Badge>
                    <span className="text-sm gradient-text-muted" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                      Last check-in: {patient.lastCheckIn}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <APIBadge endpoint="GET /patient/{id}/summary" />
                <Button variant="ghost" onClick={onClose} className="rounded-full p-2 gradient-text-muted hover:gradient-text">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* GET /patient/{id}/alerts */}
            <div className="mb-4">
              <APIBadge endpoint="GET /patient/{id}/alerts" variant="full" />
            </div>

            {/* Risk and Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Risk Gauge */}
              <div className={`flex items-center justify-center p-6 rounded-xl ${
                isDarkTheme ? 'bg-white/[0.03] border border-white/[0.08]' : 'bg-gray-50'
              }`}>
                <RiskGauge score={patient.riskScore} size={180} />
              </div>

              {/* Stats */}
              <div className="space-y-3">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`flex items-center gap-4 p-4 rounded-xl ${
                      isDarkTheme ? 'bg-white/[0.03] border border-white/[0.08]' : 'bg-gray-50'
                    }`}
                  >
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="gradient-text-secondary text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                        {stat.label}
                      </p>
                      <p className="gradient-text-glow" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '18px' }}>
                        {stat.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Summary */}
            <div
              className={`p-6 rounded-xl border ${
                isDarkTheme
                  ? 'bg-gradient-to-br from-[#5BC7FF]/10 to-[#37E29D]/10 border-[#5BC7FF]/30'
                  : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'
              }`}
            >
              <h3 className="gradient-text-glow mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '18px' }}>
                AI-Generated Summary
              </h3>
              <div className="space-y-2 text-sm gradient-text" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                <p>
                  <strong className="gradient-text-glow">Current Status:</strong> Patient is on Day {patient.dayPostOp} of recovery 
                  following {patient.surgery}. Pain is reported at {patient.painLevel}/10, which is within 
                  expected range for this stage.
                </p>
                <p>
                  <strong className="gradient-text-glow">Risk Factors:</strong> Risk score of {patient.riskScore}/100 indicates 
                  {patient.riskScore <= 30 ? ' low risk with good recovery trajectory' : patient.riskScore <= 60 ? ' moderate risk requiring monitoring' : ' high risk requiring immediate attention'}.
                </p>
                <p>
                  <strong className="gradient-text-glow">Medication Compliance:</strong> Patient has maintained 90% adherence to 
                  prescribed medication schedule. WhatsApp automation shows consistent engagement.
                </p>
                <p>
                  <strong className="gradient-text-glow">Recommendation:</strong> Continue current care plan. Schedule follow-up 
                  consultation in 48 hours to assess progress.
                </p>
              </div>
            </div>

            {/* Wound Images */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="gradient-text-glow" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '18px' }}>
                  Recent Wound Images
                </h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`rounded-lg ${
                    isDarkTheme
                      ? 'border-white/20 bg-white/[0.03] hover:bg-white/[0.08] text-[#5BC7FF]'
                      : 'border-gray-300 bg-white hover:bg-gray-50'
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {mockWoundImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative rounded-xl overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={img}
                      alt={`Wound ${index + 1}`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                      <Button
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 hover:bg-gray-100"
                      >
                        View Analysis
                      </Button>
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs rounded">
                      AI: Normal
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="gradient-text-glow mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '18px' }}>
                Recent Activity
              </h3>
              <div className="space-y-3">
                {[
                  { time: '2 hours ago', action: 'Completed daily check-in', icon: Activity },
                  { time: '5 hours ago', action: 'Medication taken as prescribed', icon: Heart },
                  { time: '1 day ago', action: 'Uploaded wound photo', icon: TrendingDown }
                ].map((activity, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      isDarkTheme ? 'bg-white/[0.03] border border-white/[0.08]' : 'bg-gray-50'
                    }`}
                  >
                    <activity.icon className={`w-4 h-4 ${isDarkTheme ? 'text-[#5BC7FF]' : 'text-gray-600'}`} />
                    <span className="flex-1 text-sm gradient-text" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                      {activity.action}
                    </span>
                    <span className="text-xs gradient-text-muted" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Actions Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="gradient-text-glow" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '18px' }}>
                  Quick Actions
                </h3>
                <div className="flex gap-2">
                  <APIBadge endpoint="GET /patient/{id}/generate-report" />
                  <APIBadge endpoint="POST /patient/{id}/send-message" />
                </div>
              </div>

              {/* Primary Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Download Report - GET /patient/{id}/generate-report */}
                <Button 
                  onClick={handleDownloadReport}
                  className="btn-gradient-shift text-white rounded-xl h-12"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report (PDF)
                </Button>

                {/* Contact Patient - POST /patient/{id}/alert */}
                <Button 
                  onClick={() => handleContactPatient('whatsapp')}
                  variant="outline"
                  className={`rounded-xl h-12 ${
                    isDarkTheme
                      ? 'border-white/20 bg-white/[0.03] hover:bg-white/[0.08] text-[#37E29D]'
                      : 'border-gray-300 bg-white hover:bg-gray-50 text-[#0BAF85]'
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Patient
                </Button>

                {/* Send Message */}
                <Button 
                  onClick={() => setShowMessageBox(!showMessageBox)}
                  variant="outline"
                  className={`rounded-xl h-12 ${
                    isDarkTheme
                      ? 'border-white/20 bg-white/[0.03] hover:bg-white/[0.08] text-[#5BC7FF]'
                      : 'border-gray-300 bg-white hover:bg-gray-50 text-[#0BAF85]'
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>

              {/* In-Dashboard Message Box */}
              {showMessageBox && (
                <div
                  className={`rounded-xl border p-4 transition-all duration-300 ${
                    isDarkTheme
                      ? 'bg-white/[0.03] border-white/[0.12]'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Type your message to ${patient.name}...`}
                      className={`flex-1 min-h-[80px] p-3 rounded-lg resize-none ${
                        isDarkTheme
                          ? 'bg-white/[0.05] border border-white/[0.12] text-white placeholder:text-[#6B7280]'
                          : 'bg-white border border-gray-300 placeholder:text-gray-400'
                      }`}
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="btn-gradient-shift text-white rounded-lg h-12 px-4"
                      style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs gradient-text-muted mt-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                    Message will be sent via in-app notification and WhatsApp
                  </p>
                </div>
              )}

              {/* Secondary Contact Actions */}
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleContactPatient('sms')}
                  variant="outline" 
                  size="sm"
                  className={`flex-1 rounded-lg ${
                    isDarkTheme
                      ? 'border-white/20 bg-white/[0.03] hover:bg-white/[0.08]'
                      : 'border-gray-300 bg-white hover:bg-gray-50'
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="gradient-text">Send SMS</span>
                </Button>
                <Button 
                  onClick={() => handleContactPatient('call')}
                  variant="outline" 
                  size="sm"
                  className={`flex-1 rounded-lg ${
                    isDarkTheme
                      ? 'border-white/20 bg-white/[0.03] hover:bg-white/[0.08]'
                      : 'border-gray-300 bg-white hover:bg-gray-50'
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="gradient-text">Schedule Call</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
