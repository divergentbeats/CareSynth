import React, { useRef } from 'react';
import { Hospital, Stethoscope, User, Calendar, Pill, AlertTriangle, CheckCircle, Clock, MapPin, Phone, FileText, Activity, Printer, Download } from 'lucide-react';
import { Card } from '../ui/card';
import { useTheme } from '../../lib/ThemeContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function PrescriptionSummaryCard() {
  const { isDarkTheme } = useTheme();
  const printRef = useRef<HTMLDivElement>(null);

  const primaryText = isDarkTheme ? 'text-[#E8E8E8]' : 'text-[#0B1220]';
  const secondaryText = isDarkTheme ? 'text-[#A0A0A0]' : 'text-[#4B5563]';
  const cardBgClass = isDarkTheme ? 'bg-white/[0.06] backdrop-blur-xl border-[#5BC7FF]/20' : 'bg-white shadow-sm border-gray-200';
  const innerBg = isDarkTheme ? 'bg-white/[0.05]' : 'bg-gray-50';
  const innerBorder = isDarkTheme ? 'border-[#5BC7FF]/10' : 'border-gray-200';

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!printRef.current) return;

    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: isDarkTheme ? '#0E1113' : '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('Prescription_Summary_Kiran.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 p-4">
      {/* Header with Print/Download Buttons */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-center flex-1">
          <h1 className={`text-4xl font-bold ${primaryText} mb-2`} style={{ fontFamily: 'Poppins, sans-serif' }}>
            Medical Prescription Summary
          </h1>
          <p className={`text-lg ${secondaryText}`} style={{ fontFamily: 'Inter, sans-serif' }}>
            Complete Recovery Plan & Instructions
          </p>
        </div>
        <div className="flex gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-[#37E29D] hover:bg-[#2FCA89] text-white rounded-lg font-medium transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 px-4 py-2 bg-[#5BC7FF] hover:bg-[#4DA8E0] text-white rounded-lg font-medium transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Printable Content Container */}
      <div ref={printRef} className="space-y-6">
        {/* Hospital & Doctor Info */}
        <Card className={`p-6 ${cardBgClass} border rounded-2xl`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hospital Info */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#37E29D]/20 flex items-center justify-center flex-shrink-0">
                <Hospital className="w-6 h-6 text-[#37E29D]" />
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-semibold ${primaryText} mb-2`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Sunrise Orthopaedic & Multispeciality Hospital
                </h3>
                <div className="space-y-1">
                  <p className={`text-sm ${secondaryText} flex items-center gap-2`} style={{ fontFamily: 'Inter, sans-serif' }}>
                    <MapPin className="w-4 h-4" />
                    1/220, Main Road, Bengaluru - 560034
                  </p>
                  <p className={`text-sm ${secondaryText} flex items-center gap-2`} style={{ fontFamily: 'Inter, sans-serif' }}>
                    <Phone className="w-4 h-4" />
                    080-44478899
                  </p>
                </div>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#5BC7FF]/20 flex items-center justify-center flex-shrink-0">
                <Stethoscope className="w-6 h-6 text-[#5BC7FF]" />
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-semibold ${primaryText} mb-2`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Dr. Gaurav Menon, MS (Ortho)
                </h3>
                <div className="space-y-1">
                  <p className={`text-sm ${secondaryText}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                    Registration No: KMC/59721
                  </p>
                  <p className={`text-sm ${secondaryText} flex items-center gap-2`} style={{ fontFamily: 'Inter, sans-serif' }}>
                    <Calendar className="w-4 h-4" />
                    Consultation Date: 12/11/2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Patient Details */}
        <Card className={`p-6 ${cardBgClass} border rounded-2xl`}>
          <div className="flex items-center gap-3 mb-4">
            <User className="w-6 h-6 text-[#FFB84D]" />
            <h3 className={`text-xl font-semibold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              Patient Information
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl ${innerBg} border ${innerBorder}`}>
              <p className={`text-sm ${secondaryText} mb-1`} style={{ fontFamily: 'Inter, sans-serif' }}>Name</p>
              <p className={`font-semibold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>Kiran</p>
            </div>
            <div className={`p-4 rounded-xl ${innerBg} border ${innerBorder}`}>
              <p className={`text-sm ${secondaryText} mb-1`} style={{ fontFamily: 'Inter, sans-serif' }}>Patient ID</p>
              <p className={`font-semibold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>230177</p>
            </div>
            <div className={`p-4 rounded-xl ${innerBg} border ${innerBorder}`}>
              <p className={`text-sm ${secondaryText} mb-1`} style={{ fontFamily: 'Inter, sans-serif' }}>Age</p>
              <p className={`font-semibold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>32 years</p>
            </div>
          </div>
        </Card>

        {/* Diagnosis & Surgery */}
        <Card className={`p-6 ${cardBgClass} border rounded-2xl`}>
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-[#37E29D]" />
            <h3 className={`text-xl font-semibold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              Diagnosis & Surgery Summary
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl ${innerBg} border ${innerBorder}`}>
              <p className={`text-sm ${secondaryText} mb-2`} style={{ fontFamily: 'Inter, sans-serif' }}>Diagnosis</p>
              <p className={`font-semibold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                Left Knee Arthroscopy (Partial Meniscectomy)
              </p>
            </div>
            <div className={`p-4 rounded-xl ${innerBg} border ${innerBorder}`}>
              <p className={`text-sm ${secondaryText} mb-2`} style={{ fontFamily: 'Inter, sans-serif' }}>Surgery Date</p>
              <p className={`font-semibold ${primaryText} flex items-center gap-2`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                <Calendar className="w-4 h-4" />
                09/11/2025
              </p>
            </div>
          </div>
        </Card>

        {/* Medications */}
        <Card className={`p-6 ${cardBgClass} border rounded-2xl`}>
          <div className="flex items-center gap-3 mb-4">
            <Pill className="w-6 h-6 text-[#5BC7FF]" />
            <h3 className={`text-xl font-semibold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              Prescribed Medications
            </h3>
          </div>
          <div className="space-y-3">
            <div className={`p-4 rounded-xl ${innerBg} border ${innerBorder}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`font-semibold ${primaryText} mb-1`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Oxycodone 5mg
                  </p>
                  <p className={`text-sm ${secondaryText}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                    One tablet every 6 hours for pain
                  </p>
                </div>
                <Pill className="w-5 h-5 text-[#37E29D] flex-shrink-0" />
              </div>
            </div>
            <div className={`p-4 rounded-xl ${innerBg} border ${innerBorder}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`font-semibold ${primaryText} mb-1`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Aspirin 81mg
                  </p>
                  <p className={`text-sm ${secondaryText}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                    One tablet once daily (morning) for 14 days
                  </p>
                </div>
                <Pill className="w-5 h-5 text-[#5BC7FF] flex-shrink-0" />
              </div>
            </div>
          </div>
        </Card>

        {/* Symptom Progression Timeline */}
        <Card className={`p-6 ${cardBgClass} border rounded-2xl`}>
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-[#FFB84D]" />
            <h3 className={`text-xl font-semibold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              Expected Symptom Progression
            </h3>
          </div>
          <div className="space-y-3">
            <div className={`p-4 rounded-xl ${innerBg} border ${innerBorder}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#37E29D]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-[#37E29D]">1-2</span>
                </div>
                <div>
                  <p className={`font-semibold ${primaryText} mb-1`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Day 1–2: Moderate pain, mild swelling
                  </p>
                </div>
              </div>
            </div>
            <div className={`p-4 rounded-xl ${innerBg} border ${innerBorder}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#5BC7FF]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-[#5BC7FF]">3-5</span>
                </div>
                <div>
                  <p className={`font-semibold ${primaryText} mb-1`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Day 3–5: Pain reduces, swelling may persist
                  </p>
                </div>
              </div>
            </div>
            <div className={`p-4 rounded-xl ${innerBg} border ${innerBorder}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FFB84D]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-[#FFB84D]">6-10</span>
                </div>
                <div>
                  <p className={`font-semibold ${primaryText} mb-1`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Day 6–10: Discomfort on movement, gradual improvement
                  </p>
                </div>
              </div>
            </div>
            <div className={`p-4 rounded-xl ${innerBg} border ${innerBorder}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#37E29D]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-[#37E29D]">10+</span>
                </div>
                <div>
                  <p className={`font-semibold ${primaryText} mb-1`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                    After Day 10: Minimal pain, improved mobility
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Mobility & Physiotherapy */}
        <Card className={`p-6 ${cardBgClass} border rounded-2xl`}>
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-[#37E29D]" />
            <h3 className={`text-xl font-semibold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              Mobility & Physiotherapy Guidelines
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className={`p-3 rounded-lg ${innerBg} border ${innerBorder} flex items-center gap-3`}>
                <CheckCircle className="w-5 h-5 text-[#37E29D] flex-shrink-0" />
                <span className={`${primaryText} text-sm`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  Straight leg raises – 5 mins, 4x daily
                </span>
              </div>
              <div className={`p-3 rounded-lg ${innerBg} border ${innerBorder} flex items-center gap-3`}>
                <CheckCircle className="w-5 h-5 text-[#37E29D] flex-shrink-0" />
                <span className={`${primaryText} text-sm`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  Ankle pumps – 5 mins, 4x daily
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className={`p-3 rounded-lg ${innerBg} border ${innerBorder} flex items-center gap-3`}>
                <CheckCircle className="w-5 h-5 text-[#5BC7FF] flex-shrink-0" />
                <span className={`${primaryText} text-sm`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  Partial weight-bearing with walker from Day 3
                </span>
              </div>
              <div className={`p-3 rounded-lg ${innerBg} border ${innerBorder} flex items-center gap-3`}>
                <CheckCircle className="w-5 h-5 text-[#5BC7FF] flex-shrink-0" />
                <span className={`${primaryText} text-sm`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  Physiotherapy starts Day 4
                </span>
              </div>
              <div className={`p-3 rounded-lg ${innerBg} border ${innerBorder} flex items-center gap-3`}>
                <AlertTriangle className="w-5 h-5 text-[#FFB84D] flex-shrink-0" />
                <span className={`${primaryText} text-sm`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  Avoid squatting/twisting for 3 weeks
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Doctor Instructions */}
        <Card className={`p-6 ${cardBgClass} border rounded-2xl`}>
          <div className="flex items-center gap-3 mb-4">
            <Stethoscope className="w-6 h-6 text-[#5BC7FF]" />
            <h3 className={`text-xl font-semibold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              Doctor Instructions
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className={`p-3 rounded-lg ${innerBg} border ${innerBorder} flex items-center gap-3`}>
                <CheckCircle className="w-5 h-5 text-[#37E29D] flex-shrink-0" />
                <span className={`${primaryText} text-sm`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  Keep the knee elevated
                </span>
              </div>
              <div className={`p-3 rounded-lg ${innerBg} border ${innerBorder} flex items-center gap-3`}>
                <CheckCircle className="w-5 h-5 text-[#37E29D] flex-shrink-0" />
                <span className={`${primaryText} text-sm`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  Apply ice packs every 4 hours for 10 minutes
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className={`p-3 rounded-lg ${innerBg} border ${innerBorder} flex items-center gap-3`}>
                <CheckCircle className="w-5 h-5 text-[#5BC7FF] flex-shrink-0" />
                <span className={`${primaryText} text-sm`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  Change dressing as instructed
                </span>
              </div>
              <div className={`p-3 rounded-lg ${innerBg} border ${innerBorder} flex items-center gap-3`}>
                <CheckCircle className="w-5 h-5 text-[#5BC7FF] flex-shrink-0" />
                <span className={`${primaryText} text-sm`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  Follow physiotherapy schedule
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Red Flags */}
        <Card className={`p-6 bg-red-50 border-red-200 rounded-2xl ${isDarkTheme ? 'bg-red-900/20 border-red-800' : ''}`}>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h3 className={`text-xl font-semibold ${isDarkTheme ? 'text-red-400' : 'text-red-700'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              Critical Warning Signs (Red Flags)
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className={`p-3 rounded-lg ${isDarkTheme ? 'bg-red-900/30 border-red-800' : 'bg-white border-red-200'} border flex items-center gap-3`}>
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className={`${isDarkTheme ? 'text-red-300' : 'text-red-700'} text-sm`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  Severe swelling or pain
                </span>
              </div>
              <div className={`p-3 rounded-lg ${isDarkTheme ? 'bg-red-900/30 border-red-800' : 'bg-white border-red-200'} border flex items-center gap-3`}>
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className={`${isDarkTheme ? 'text-red-300' : 'text-red-700'} text-sm`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  Fever above 100°F
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className={`p-3 rounded-lg ${isDarkTheme ? 'bg-red-900/30 border-red-800' : 'bg-white border-red-200'} border flex items-center gap-3`}>
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className={`${isDarkTheme ? 'text-red-300' : 'text-red-700'} text-sm`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  Knee locking or inability to move
                </span>
              </div>
              <div className={`p-3 rounded-lg ${isDarkTheme ? 'bg-red-900/30 border-red-800' : 'bg-white border-red-200'} border flex items-center gap-3`}>
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className={`${isDarkTheme ? 'text-red-300' : 'text-red-700'} text-sm`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  Wound discharge or bleeding
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Follow-up & Signature */}
        <Card className={`p-6 ${cardBgClass} border rounded-2xl`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-4 rounded-xl ${innerBg} border ${innerBorder}`}>
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-[#37E29D]" />
                <span className={`font-semibold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Follow-up Date
                </span>
              </div>
              <p className={`${primaryText} text-lg`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                19/11/2025
              </p>
              <p className={`text-sm ${secondaryText}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                Day 10 after surgery
              </p>
            </div>

            <div className={`p-4 rounded-xl ${innerBg} border ${innerBorder}`}>
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-[#5BC7FF]" />
                <span className={`font-semibold ${primaryText}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Doctor's Signature
                </span>
              </div>
              <div className="space-y-2">
                <div className="border-b border-gray-400 w-full h-8"></div>
                <p className={`text-sm ${secondaryText}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  Dr. Gaurav Menon, MS (Ortho)
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          body {
            background: white !important;
          }
          .bg-white\\/\\[0\\.06\\], .bg-white {
            background: white !important;
            border: 1px solid #e5e7eb !important;
          }
          .text-\\[\\#E8E8E8\\] {
            color: #0B1220 !important;
          }
          .text-\\[\\#A0A0A0\\] {
            color: #4B5563 !important;
          }
          .bg-red-50, .bg-red-900\\/20 {
            background: #fef2f2 !important;
            border: 1px solid #fecaca !important;
          }
          .text-red-400, .text-red-700, .text-red-300 {
            color: #dc2626 !important;
          }
        }
      `}</style>
    </div>
  );
}
