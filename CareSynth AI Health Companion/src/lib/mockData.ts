// Mock data for CareSynth AI Health Companion

export interface Patient {
  id: string;
  name: string;
  age: number;
  surgery: string;
  dayPostOp: number;
  riskScore: number;
  painLevel: number;
  lastCheckIn: string;
  photo: string;
  status: 'stable' | 'warning' | 'critical';
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  taken: boolean[];
  nextDose: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'surgery' | 'checkup' | 'milestone' | 'alert';
  completed: boolean;
}

export interface Alert {
  id: string;
  patientId: string;
  patientName: string;
  type: 'pain' | 'wound' | 'medication' | 'vitals';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'patient' | 'ai' | 'doctor';
  message: string;
  timestamp: string;
  aiSummary?: string;
}

export interface WhatsAppLog {
  id: string;
  timestamp: string;
  type: 'check-in' | 'reminder' | 'alert';
  patientResponse: string;
  aiAnalysis?: string;
}

export const currentPatient: Patient = {
  id: '230177',
  name: 'Kiran',
  age: 32,
  surgery: 'Left Knee Arthroscopy (Partial Meniscectomy)',
  dayPostOp: 3,
  riskScore: 15,
  painLevel: 5,
  lastCheckIn: '2 hours ago',
  photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  status: 'stable'
};

export const medications: Medication[] = [
  {
    id: '1',
    name: 'Oxycodone',
    dosage: '5mg',
    frequency: 'Every 6 hours',
    taken: [true, true, false, false],
    nextDose: 'In 2 hours'
  },
  {
    id: '2',
    name: 'Aspirin',
    dosage: '81mg',
    frequency: 'Once daily (morning)',
    taken: [true, false, false, false],
    nextDose: 'Tomorrow 8:00 AM'
  }
];

export const timeline: TimelineEvent[] = [
  {
    id: '1',
    date: 'Nov 9, 2025',
    title: 'Left Knee Arthroscopy Surgery',
    description: 'Partial meniscectomy performed successfully',
    type: 'surgery',
    completed: true
  },
  {
    id: '2',
    date: 'Nov 9, 2025',
    title: 'Day 1 Post-Op Check',
    description: 'Moderate pain, mild swelling - as expected',
    type: 'checkup',
    completed: true
  },
  {
    id: '3',
    date: 'Nov 11, 2025',
    title: 'Partial Weight Bearing Begins',
    description: 'Start weight bearing with walker/crutch',
    type: 'milestone',
    completed: true
  },
  {
    id: '4',
    date: 'Nov 12, 2025',
    title: 'Physical Therapy Session 1',
    description: 'Initial PT exercises and straight leg raising',
    type: 'checkup',
    completed: false
  },
  {
    id: '4a',
    date: 'Nov 12, 2025',
    title: 'Post-PT Pain Spike',
    description: 'Pain increased to 6/10 after exercises; advised ice and rest',
    type: 'alert',
    completed: true
  },
  {
    id: '5',
    date: 'Nov 19, 2025',
    title: 'Follow-up Appointment',
    description: 'Day 10 post-op check with Dr. Gaurav Menon',
    type: 'checkup',
    completed: false
  },
  {
    id: '6a',
    date: 'Nov 22, 2025',
    title: 'Mobility Improvement Milestone',
    description: 'Straight leg raise without assistance achieved',
    type: 'milestone',
    completed: false
  },
  {
    id: '6',
    date: 'Nov 29, 2025',
    title: 'Return to Full Activities',
    description: 'Expected full recovery and mobility',
    type: 'milestone',
    completed: false
  }
];

export const allPatients: Patient[] = [
  currentPatient,
  {
    id: '2',
    name: 'Michael Chen',
    age: 45,
    surgery: 'Hip Replacement',
    dayPostOp: 3,
    riskScore: 42,
    painLevel: 7,
    lastCheckIn: '30 minutes ago',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    status: 'warning'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    age: 62,
    surgery: 'Spinal Fusion',
    dayPostOp: 2,
    riskScore: 68,
    painLevel: 8,
    lastCheckIn: '15 minutes ago',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    status: 'critical'
  },
  {
    id: '4',
    name: 'James Wilson',
    age: 51,
    surgery: 'Shoulder Surgery',
    dayPostOp: 8,
    riskScore: 12,
    painLevel: 3,
    lastCheckIn: '4 hours ago',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    status: 'stable'
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    age: 55,
    surgery: 'ACL Reconstruction',
    dayPostOp: 6,
    riskScore: 25,
    painLevel: 5,
    lastCheckIn: '1 hour ago',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    status: 'stable'
  }
];

export const alerts: Alert[] = [
  {
    id: '1',
    patientId: '3',
    patientName: 'Emily Rodriguez',
    type: 'pain',
    severity: 'high',
    message: 'Pain level escalated to 8/10, medication not providing relief',
    timestamp: '15 min ago',
    read: false
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Michael Chen',
    type: 'wound',
    severity: 'medium',
    message: 'Wound image flagged for inflammation - possible infection',
    timestamp: '30 min ago',
    read: false
  },
  {
    id: '3',
    patientId: '1',
    patientName: 'Sarah Johnson',
    type: 'medication',
    severity: 'low',
    message: 'Missed afternoon medication dose',
    timestamp: '2 hours ago',
    read: true
  },
  {
    id: '4',
    patientId: '2',
    patientName: 'Michael Chen',
    type: 'pain',
    severity: 'medium',
    message: 'Pain increased from 5/10 to 7/10 over 24 hours',
    timestamp: '3 hours ago',
    read: true
  }
];

export const chatHistory: ChatMessage[] = [
  {
    id: '1',
    sender: 'ai',
    message: 'Good morning, Sarah! How are you feeling today? Remember to complete your daily check-in.',
    timestamp: '8:00 AM'
  },
  {
    id: '2',
    sender: 'patient',
    message: 'I\'m feeling okay. My knee is a bit stiff this morning.',
    timestamp: '8:15 AM'
  },
  {
    id: '3',
    sender: 'ai',
    message: 'That\'s normal for Day 5 post-op. Have you tried the gentle exercises from your physical therapy plan? Also, remember to take your morning medications.',
    timestamp: '8:16 AM'
  },
  {
    id: '4',
    sender: 'patient',
    message: 'Yes, I did them. Should I be concerned about some swelling?',
    timestamp: '8:20 AM'
  },
  {
    id: '5',
    sender: 'ai',
    message: 'Some swelling is expected. However, if it\'s increasing or accompanied by warmth and redness, please upload a photo so I can analyze it. You can also message your doctor directly.',
    timestamp: '8:21 AM'
  }
];

export const whatsappLogs: WhatsAppLog[] = [
  {
    id: '1',
    timestamp: 'Today 8:00 AM',
    type: 'check-in',
    patientResponse: 'Pain: 4/10. Took morning meds. Feeling okay.',
    aiAnalysis: 'Stable - pain within expected range, medication compliance good'
  },
  {
    id: '2',
    timestamp: 'Yesterday 8:00 PM',
    type: 'check-in',
    patientResponse: 'Pain: 5/10. A bit uncomfortable but manageable.',
    aiAnalysis: 'Stable - slight increase noted, monitoring for trend'
  },
  {
    id: '3',
    timestamp: 'Yesterday 2:00 PM',
    type: 'reminder',
    patientResponse: 'Thanks! Just took my Cephalexin.',
    aiAnalysis: 'Medication reminder acknowledged and completed'
  },
  {
    id: '4',
    timestamp: 'Yesterday 8:00 AM',
    type: 'check-in',
    patientResponse: 'Pain: 4/10. Slept well. Did morning exercises.',
    aiAnalysis: 'Good progress - pain stable, exercises completed'
  },
  {
    id: '5',
    timestamp: 'Nov 6, 8:00 PM',
    type: 'check-in',
    patientResponse: 'Pain: 6/10 after PT session. Took extra pain med.',
    aiAnalysis: 'Expected - post-therapy discomfort, self-managed appropriately'
  }
];

// Prescription Summary Mock Data - Kiran's Complete Prescription
export const prescriptionSummary = {
  hospital: 'Sunrise Orthopaedic & Multispeciality Hospital',
  address: '1/220, Main Road, Bengaluru - 560034',
  contact: '080-44478899',
  doctor: 'Dr. Gaurav Menon, MS (Ortho)',
  registrationNo: 'KMC/59721',
  patientName: 'Kiran',
  patientId: '230177',
  age: 32,
  date: '12/11/2025',
  condition: 'Left Knee Arthroscopy (Partial Meniscectomy)',
  surgeryDate: '09/11/2025',
  recoveryDays: 21,
  medications: [
    { name: 'Oxycodone 5mg', dosage: 'One tablet every 6 hours for pain' },
    { name: 'Aspirin 81mg', dosage: 'One tablet once daily (morning) for 14 days' }
  ],
  symptomProgression: [
    { day: '1-2', description: 'Moderate pain, mild swelling' },
    { day: '3-5', description: 'Pain reduces, swelling may persist' },
    { day: '6-10', description: 'Discomfort on movement, gradual improvement' },
    { day: 'After 10', description: 'Minimal pain, improved knee mobility' }
  ],
  mobilityGuidance: [
    'Straight leg raising and ankle pumps – 5 mins, 4x daily',
    'Partial weight bearing with walker/crutch from Day 3',
    'Physiotherapy session to start Day 4 (as scheduled)',
    'Avoid squatting, twisting for 3 weeks'
  ],
  doctorInstructions: [
    'Keep the operated knee elevated while resting',
    'Apply ice packs for 10 minutes every 4 hours',
    'Change dressing as instructed',
    'Adhere to physiotherapy schedule',
    'Perform ankle pump exercises every hour while awake',
    'Begin gentle quadriceps strengthening exercises immediately',
    'Sleep with a pillow between knees to maintain proper alignment',
    'Avoid bending knee beyond 90° for first 3 weeks',
    'Do not drive until cleared by physician (typically 2-3 weeks)',
    'Attend all scheduled physical therapy appointments',
    'Monitor for infection: fever, increased redness, swelling, or drainage',
    'Monitor for DVT symptoms: calf pain, swelling, shortness of breath',
    'Gradually increase walking distance as tolerated',
    'Maintain healthy diet and adequate hydration for healing',
    'Avoid high-impact activities and contact sports for 6 weeks'
  ],
  redFlagSymptoms: [
    'Sudden onset swelling, severe pain',
    'Fever above 100°F',
    'Knee locking or inability to move knee',
    'Bleeding or discharge from wound site',
    'Increased warmth or redness around incision',
    'Sudden shortness of breath or chest pain',
    'Calf pain, swelling, or redness (DVT signs)',
    'Numbness or tingling in leg or foot'
  ],
  followUpDate: '19/11/2025 (Day 10 after surgery)'
};

// Mock conflicts detected today
export const conflictsToday = [
  {
    id: 'conf1',
    title: 'Elevated Heart Rate During Rest',
    description: 'Resting heart rate increased from 72 to 88 bpm while patient reports feeling calm. May indicate early infection or stress response.',
    severity: 'medium',
    trend: 'up'
  },
  {
    id: 'conf2',
    title: 'Pain Scores vs. Medication Timing',
    description: 'Patient reports moderate pain (6/10) but last pain medication was taken 8 hours ago. Consider timing adjustment.',
    severity: 'low',
    trend: 'stable'
  },
  {
    id: 'conf3',
    title: 'Sleep Quality vs. Energy Levels',
    description: 'Patient reports poor sleep (4 hours) but indicates high energy levels. Monitor for medication side effects or sleep apnea.',
    severity: 'medium',
    trend: 'down'
  },
  {
    id: 'conf4',
    title: 'Wound Assessment Discrepancy',
    description: 'Patient describes minimal swelling but wound photo shows increased erythema. Schedule clinical evaluation.',
    severity: 'high',
    trend: 'up'
  },
  {
    id: 'conf5',
    title: 'Appetite vs. Weight Bearing',
    description: 'Patient reports good appetite but minimal weight bearing progress. May indicate pain inhibition or depression.',
    severity: 'low',
    trend: 'stable'
  }
];

export const analyticsData = {
  painTrend: [
    { day: 'Day 1', pain: 8, target: 7 },
    { day: 'Day 2', pain: 7, target: 6 },
    { day: 'Day 3', pain: 6, target: 5 },
    { day: 'Day 4', pain: 5, target: 5 },
    { day: 'Day 5', pain: 4, target: 4 },
    { day: 'Day 6', pain: 4, target: 4 },
    { day: 'Day 7', pain: 3, target: 3 }
  ],
  riskDistribution: [
    { range: '0-20', count: 15, color: '#10b981' },
    { range: '21-40', count: 8, color: '#f59e0b' },
    { range: '41-60', count: 4, color: '#ef4444' },
    { range: '61+', count: 2, color: '#dc2626' }
  ],
  medicationCompliance: [
    { week: 'Week 1', compliance: 95 },
    { week: 'Week 2', compliance: 88 },
    { week: 'Week 3', compliance: 92 },
    { week: 'Week 4', compliance: 97 }
  ]
};

// Patient-specific analytics data
// GET /patient/{id}/data
// GET /patient/{id}/recovery-trends
export const patientAnalyticsData: { [patientId: string]: any } = {
  '1': {
    painTrend: [
      { day: 'Mon', pain: 5, target: 5, date: 'Nov 4' },
      { day: 'Tue', pain: 5, target: 5, date: 'Nov 5' },
      { day: 'Wed', pain: 4, target: 4, date: 'Nov 6' },
      { day: 'Thu', pain: 4, target: 4, date: 'Nov 7' },
      { day: 'Fri', pain: 4, target: 4, date: 'Nov 8' },
      { day: 'Sat', pain: 3, target: 3, date: 'Nov 9' },
      { day: 'Sun', pain: 4, target: 3, date: 'Nov 10' }
    ],
    riskDistribution: [
      { range: 'Low', count: 18, color: '#37E29D' },
      { range: 'Moderate', count: 0, color: '#FFD580' },
      { range: 'High', count: 0, color: '#F47C7C' }
    ],
    medicationLog: {
      daily: [
        { day: 'Mon', morning: 2, evening: 2, night: 1 },
        { day: 'Tue', morning: 2, evening: 2, night: 1 },
        { day: 'Wed', morning: 2, evening: 1, night: 1 },
        { day: 'Thu', morning: 2, evening: 2, night: 1 },
        { day: 'Fri', morning: 2, evening: 2, night: 1 },
        { day: 'Sat', morning: 2, evening: 2, night: 1 },
        { day: 'Sun', morning: 2, evening: 1, night: 0 }
      ],
      weekly: [
        { week: 'Week 1', morning: 14, evening: 13, night: 6 },
        { week: 'Week 2', morning: 14, evening: 14, night: 7 }
      ],
      monthly: [
        { month: 'Nov', morning: 28, evening: 27, night: 13 }
      ]
    }
  },
  '2': {
    painTrend: [
      { day: 'Mon', pain: 8, target: 7, date: 'Nov 4' },
      { day: 'Tue', pain: 7, target: 6, date: 'Nov 5' },
      { day: 'Wed', pain: 7, target: 6, date: 'Nov 6' },
      { day: 'Thu', pain: 7, target: 5, date: 'Nov 7' },
      { day: 'Fri', pain: 6, target: 5, date: 'Nov 8' },
      { day: 'Sat', pain: 7, target: 5, date: 'Nov 9' },
      { day: 'Sun', pain: 7, target: 4, date: 'Nov 10' }
    ],
    riskDistribution: [
      { range: 'Low', count: 5, color: '#37E29D' },
      { range: 'Moderate', count: 12, color: '#FFD580' },
      { range: 'High', count: 1, color: '#F47C7C' }
    ],
    medicationLog: {
      daily: [
        { day: 'Mon', morning: 2, evening: 2, night: 1 },
        { day: 'Tue', morning: 2, evening: 1, night: 1 },
        { day: 'Wed', morning: 2, evening: 2, night: 0 },
        { day: 'Thu', morning: 1, evening: 2, night: 1 },
        { day: 'Fri', morning: 2, evening: 2, night: 1 },
        { day: 'Sat', morning: 2, evening: 1, night: 1 },
        { day: 'Sun', morning: 2, evening: 2, night: 1 }
      ],
      weekly: [
        { week: 'Week 1', morning: 13, evening: 12, night: 6 },
        { week: 'Week 2', morning: 13, evening: 12, night: 6 }
      ],
      monthly: [
        { month: 'Nov', morning: 26, evening: 24, night: 12 }
      ]
    }
  },
  '3': {
    painTrend: [
      { day: 'Mon', pain: 9, target: 8, date: 'Nov 4' },
      { day: 'Tue', pain: 9, target: 7, date: 'Nov 5' },
      { day: 'Wed', pain: 8, target: 7, date: 'Nov 6' },
      { day: 'Thu', pain: 8, target: 6, date: 'Nov 7' },
      { day: 'Fri', pain: 8, target: 6, date: 'Nov 8' },
      { day: 'Sat', pain: 7, target: 6, date: 'Nov 9' },
      { day: 'Sun', pain: 8, target: 5, date: 'Nov 10' }
    ],
    riskDistribution: [
      { range: 'Low', count: 2, color: '#37E29D' },
      { range: 'Moderate', count: 8, color: '#FFD580' },
      { range: 'High', count: 8, color: '#F47C7C' }
    ],
    medicationLog: {
      daily: [
        { day: 'Mon', morning: 3, evening: 2, night: 2 },
        { day: 'Tue', morning: 2, evening: 2, night: 2 },
        { day: 'Wed', morning: 3, evening: 3, night: 1 },
        { day: 'Thu', morning: 3, evening: 2, night: 2 },
        { day: 'Fri', morning: 2, evening: 3, night: 2 },
        { day: 'Sat', morning: 3, evening: 2, night: 2 },
        { day: 'Sun', morning: 3, evening: 2, night: 1 }
      ],
      weekly: [
        { week: 'Week 1', morning: 19, evening: 16, night: 12 },
        { week: 'Week 2', morning: 19, evening: 16, night: 12 }
      ],
      monthly: [
        { month: 'Nov', morning: 38, evening: 32, night: 24 }
      ]
    }
  },
  '4': {
    painTrend: [
      { day: 'Mon', pain: 3, target: 3, date: 'Nov 4' },
      { day: 'Tue', pain: 3, target: 3, date: 'Nov 5' },
      { day: 'Wed', pain: 2, target: 3, date: 'Nov 6' },
      { day: 'Thu', pain: 3, target: 2, date: 'Nov 7' },
      { day: 'Fri', pain: 2, target: 2, date: 'Nov 8' },
      { day: 'Sat', pain: 3, target: 2, date: 'Nov 9' },
      { day: 'Sun', pain: 3, target: 2, date: 'Nov 10' }
    ],
    riskDistribution: [
      { range: 'Low', count: 20, color: '#37E29D' },
      { range: 'Moderate', count: 0, color: '#FFD580' },
      { range: 'High', count: 0, color: '#F47C7C' }
    ],
    medicationLog: {
      daily: [
        { day: 'Mon', morning: 1, evening: 1, night: 1 },
        { day: 'Tue', morning: 1, evening: 1, night: 1 },
        { day: 'Wed', morning: 1, evening: 1, night: 1 },
        { day: 'Thu', morning: 1, evening: 1, night: 1 },
        { day: 'Fri', morning: 1, evening: 1, night: 1 },
        { day: 'Sat', morning: 1, evening: 1, night: 1 },
        { day: 'Sun', morning: 1, evening: 1, night: 0 }
      ],
      weekly: [
        { week: 'Week 1', morning: 7, evening: 7, night: 6 },
        { week: 'Week 2', morning: 7, evening: 7, night: 7 }
      ],
      monthly: [
        { month: 'Nov', morning: 14, evening: 14, night: 13 }
      ]
    }
  },
  '5': {
    painTrend: [
      { day: 'Mon', pain: 6, target: 5, date: 'Nov 4' },
      { day: 'Tue', pain: 5, target: 5, date: 'Nov 5' },
      { day: 'Wed', pain: 5, target: 4, date: 'Nov 6' },
      { day: 'Thu', pain: 5, target: 4, date: 'Nov 7' },
      { day: 'Fri', pain: 4, target: 4, date: 'Nov 8' },
      { day: 'Sat', pain: 5, target: 4, date: 'Nov 9' },
      { day: 'Sun', pain: 5, target: 3, date: 'Nov 10' }
    ],
    riskDistribution: [
      { range: 'Low', count: 15, color: '#37E29D' },
      { range: 'Moderate', count: 3, color: '#FFD580' },
      { range: 'High', count: 0, color: '#F47C7C' }
    ],
    medicationLog: {
      daily: [
        { day: 'Mon', morning: 2, evening: 2, night: 1 },
        { day: 'Tue', morning: 2, evening: 2, night: 1 },
        { day: 'Wed', morning: 2, evening: 2, night: 1 },
        { day: 'Thu', morning: 2, evening: 1, night: 1 },
        { day: 'Fri', morning: 2, evening: 2, night: 1 },
        { day: 'Sat', morning: 2, evening: 2, night: 1 },
        { day: 'Sun', morning: 2, evening: 2, night: 1 }
      ],
      weekly: [
        { week: 'Week 1', morning: 14, evening: 13, night: 7 },
        { week: 'Week 2', morning: 14, evening: 14, night: 7 }
      ],
      monthly: [
        { month: 'Nov', morning: 28, evening: 27, night: 14 }
      ]
    }
  }
};
