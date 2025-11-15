import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileText, CheckCircle, ArrowRight, ArrowLeft, Loader2, Zap, Brain, Database, Check } from 'lucide-react';
import { Card } from '../ui/card';
import { usePatient } from '../../lib/PatientContext';
import { generateDailyQuestions } from '../../lib/openai';

interface PrescriptionOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const PrescriptionOnboardingModal: React.FC<PrescriptionOnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const { setPatientProfile, setDailyQuestions, setIsAnalyzing } = usePatient();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzingLocal, setIsAnalyzingLocal] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { title: 'Upload Prescription', icon: Upload },
    { title: 'AI Analysis', icon: Brain },
    { title: 'Dashboard Ready', icon: CheckCircle },
  ];

  const analysisSteps = [
    { label: 'Extracting text from prescription...', icon: FileText, duration: 2000 },
    { label: 'Analyzing medical terminology...', icon: Brain, duration: 2500 },
    { label: 'Cross-referencing with medical database...', icon: Database, duration: 2000 },
    { label: 'Generating personalized recovery plan...', icon: Zap, duration: 1500 },
  ];

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const processFile = async (file: File) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, JPG, or PNG file.');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB.');
      return;
    }

    setUploadedFile(file);
    setCurrentStep(1); // Move to analysis step

    try {
      // Extract text from file
      const text = await extractTextFromFile(file);

      // Detect keywords and load appropriate profile
      const profile = await loadProfileFromText(text);

      // Set patient profile in context
      setPatientProfile(profile);

      // Generate daily questions using OpenAI
      const questions = await generateDailyQuestions(JSON.stringify(profile));
      setDailyQuestions(questions);

      // Start analysis animation
      setIsAnalyzingLocal(true);
      setIsAnalyzing(true);
      setAnalysisStep(0);

      // Run analysis steps
      for (let i = 0; i < analysisSteps.length; i++) {
        setAnalysisStep(i);
        await new Promise(resolve => setTimeout(resolve, analysisSteps[i].duration));
      }

      setIsAnalyzingLocal(false);
      setIsAnalyzing(false);
      setTimeout(() => setCurrentStep(2), 1000); // Move to completion step

    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file. Please try again.');
      setCurrentStep(0); // Go back to upload step
    }
  };

  const extractTextFromFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          // For demo purposes, we'll simulate text extraction
          // In a real app, you'd use a PDF parsing library or OCR for images
          resolve(result);
        } else {
          reject(new Error('Failed to read file'));
        }
      };

      reader.onerror = () => reject(new Error('File reading error'));

      if (file.type === 'application/pdf') {
        reader.readAsText(file); // This won't work for real PDFs, but for demo
      } else {
        reader.readAsText(file); // For images, you'd need OCR
      }
    });
  };

  const loadProfileFromText = async (text: string): Promise<any> => {
    const lowerText = text.toLowerCase();

    // Check for knee/arthroscopy keywords
    if (lowerText.includes('arthroscopy') || lowerText.includes('knee') || lowerText.includes('meniscectomy')) {
      const response = await fetch('/data/kiran.json');
      return await response.json();
    }
    // Check for respiratory/infection keywords
    else if (lowerText.includes('fever') || lowerText.includes('infection') || lowerText.includes('upper respiratory')) {
      const response = await fetch('/data/sahana.json');
      return await response.json();
    }
    // Default fallback
    else {
      const response = await fetch('/data/kiran.json');
      return await response.json();
    }
  };

  useEffect(() => {
    if (currentStep === 1 && !isAnalyzingLocal) {
      setIsAnalyzingLocal(true);
      setAnalysisStep(0);

      const runAnalysis = async () => {
        for (let i = 0; i < analysisSteps.length; i++) {
          setAnalysisStep(i);
          await new Promise(resolve => setTimeout(resolve, analysisSteps[i].duration));
        }
        setIsAnalyzingLocal(false);
        setTimeout(() => setCurrentStep(2), 1000);
      };

      runAnalysis();
    }
  }, [currentStep, isAnalyzingLocal]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-lg"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl mx-4 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold gradient-text-glow">Prescription Setup</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper */}
          <div className="px-6 pt-4">
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                  <div key={index} className="flex items-center">
                    <motion.div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                        isCompleted
                          ? 'bg-green-500 border-green-500 text-white'
                          : isActive
                          ? 'border-blue-500 text-blue-500'
                          : 'border-gray-300 text-gray-400'
                      }`}
                      animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </motion.div>
                    <span className={`ml-3 text-sm font-medium ${
                      isActive ? 'text-blue-600 dark:text-blue-400' :
                      isCompleted ? 'text-green-600 dark:text-green-400' :
                      'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-px mx-4 ${
                        index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Upload className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 gradient-text-secondary">
                      Upload Your Prescription
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Let's get started by uploading your prescription. Our AI will analyze it and create your personalized recovery plan.
                    </p>
                  </div>

                  <Card
                    className={`p-6 border-2 border-dashed transition-colors cursor-pointer group ${
                      isDragOver
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
                    }`}
                    onClick={handleFileSelect}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    <div className="text-center">
                      <FileText className={`w-12 h-12 mx-auto mb-4 transition-colors ${
                        isDragOver ? 'text-blue-500' : 'text-gray-400 group-hover:text-blue-500'
                      }`} />
                      <p className="text-lg font-medium mb-2">
                        {isDragOver ? 'Drop your prescription here' : 'Drop your prescription here'}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200">
                        Choose File
                      </button>
                      <p className="text-xs text-gray-400 mt-2">Supports PDF, JPG, PNG (max 10MB)</p>
                    </div>
                  </Card>

                  <div className="flex justify-end">
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="analysis"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <motion.div
                        className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Brain className="w-10 h-10 text-white" />
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 gradient-text-secondary">
                      AI Analysis in Progress
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our AI is analyzing your prescription and creating your personalized recovery plan.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {analysisSteps.map((step, index) => {
                      const Icon = step.icon;
                      const isActive = index === analysisStep;
                      const isCompleted = index < analysisStep;

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                            isCompleted
                              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                              : isActive
                              ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                              : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <div className={`flex-shrink-0 ${
                            isCompleted ? 'text-green-600' :
                            isActive ? 'text-blue-600' :
                            'text-gray-400'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : isActive ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Loader2 className="w-6 h-6" />
                              </motion.div>
                            ) : (
                              <Icon className="w-6 h-6" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium ${
                              isCompleted ? 'text-green-800 dark:text-green-200' :
                              isActive ? 'text-blue-800 dark:text-blue-200' :
                              'text-gray-600 dark:text-gray-400'
                            }`}>
                              {step.label}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={handlePrevious}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 10, stiffness: 300 }}
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2 gradient-text-secondary">
                      Your Dashboard is Ready!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      We've successfully analyzed your prescription and set up your personalized recovery dashboard.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { icon: Brain, title: 'AI Reality Check', desc: 'Monitor recovery alignment' },
                      { icon: FileText, title: 'Prescription Summary', desc: 'Complete recovery plan' },
                      { icon: Zap, title: 'Conflict Detection', desc: 'Proactive health monitoring' },
                    ].map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                        >
                          <Icon className="w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                          <h4 className="font-semibold mb-1">{feature.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex justify-center">
                    <motion.button
                      onClick={handleComplete}
                      className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PrescriptionOnboardingModal;
