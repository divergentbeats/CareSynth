# CareSynth AI Health Companion

A comprehensive healthcare monitoring and communication platform featuring AI-assisted patient care, real-time risk assessment, and WhatsApp automation integration.

## 🎯 Features

### Patient View
- **Animated Risk Gauge**: Real-time risk assessment with beautiful circular gauge animation
- **Daily Check-In**: Interactive pain level slider (0-10) with AI-powered alerts
- **Wound Monitoring**: Photo upload with AI analysis and flagging system
- **Medication Tracker**: Visual medication tracking with dose completion
- **Recovery Timeline**: Animated timeline showing post-op milestones
- **AI Chat Companion**: 24/7 AI assistant for health questions
- **AI-Assisted Messaging**: Generate and edit AI summaries before messaging doctor
- **WhatsApp Automation Logs**: View automated check-in responses and AI analysis

### Doctor View
- **Patient List**: Sortable patient list by risk score with status indicators
- **Real-Time Alert Feed**: Prioritized alerts for pain escalation, wound concerns, and medication issues
- **Patient Detail Modal**: Comprehensive patient overview with AI-generated summaries
- **Analytics Dashboard**: 
  - Pain trend charts
  - Risk score distribution
  - Medication compliance tracking
  - AI-generated insights
- **Bulk Actions**: Manage multiple patients efficiently

## 🚀 Demo Interactions

The prototype includes three pre-built demo scenarios:

1. **Pain Escalation**: Patient reports pain level > 7/10, triggering automatic doctor alert
2. **Wound Flag**: AI wound analysis detects inflammation and flags for review
3. **AI Summary Message**: Patient can generate, edit, and send AI-enhanced health summary to doctor

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS v4.0
- **Animations**: Motion (formerly Framer Motion)
- **UI Components**: Shadcn/ui + Radix UI primitives
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📦 Installation

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
\`\`\`

## 🔌 Integration Guide

### 1. Twilio WhatsApp API Integration

Replace the stub in `/lib/firestoreStubs.ts`:

\`\`\`typescript
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async sendWhatsAppMessage(to: string, message: string) {
  try {
    const result = await client.messages.create({
      from: 'whatsapp:+14155238886', // Your Twilio WhatsApp number
      to: \`whatsapp:\${to}\`,
      body: message
    });
    return {
      success: true,
      messageId: result.sid,
      status: result.status
    };
  } catch (error) {
    console.error('Twilio error:', error);
    throw error;
  }
}
\`\`\`

**Environment Variables:**
\`\`\`
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=+14155238886
\`\`\`

**Webhook Setup:**
Configure Twilio webhook to receive incoming WhatsApp messages:
- URL: \`https://your-domain.com/api/whatsapp/webhook\`
- Method: POST

### 2. AI Risk Prediction API

Replace the stub in `/lib/firestoreStubs.ts`:

\`\`\`typescript
async predictRisk(patientData: any) {
  const response = await fetch('https://your-ml-api.com/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${process.env.ML_API_KEY}\`
    },
    body: JSON.stringify({
      patient_id: patientData.id,
      pain_level: patientData.painLevel,
      days_post_op: patientData.dayPostOp,
      surgery_type: patientData.surgery,
      vitals: patientData.vitals
    })
  });
  
  const result = await response.json();
  return {
    success: true,
    riskScore: result.risk_score,
    factors: result.risk_factors
  };
}
\`\`\`

**Model Requirements:**
- Input features: pain level, days post-op, vitals, medication compliance
- Output: Risk score (0-100) + contributing factors
- Recommended: Gradient Boosting or Neural Network model
- Training data: Historical patient outcomes

### 3. Wound Analysis AI

Replace the stub in `/lib/firestoreStubs.ts`:

\`\`\`typescript
async analyzeWoundImage(imageData: string) {
  const formData = new FormData();
  formData.append('image', imageData);
  
  const response = await fetch('https://your-vision-api.com/analyze', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${process.env.VISION_API_KEY}\`
    },
    body: formData
  });
  
  const result = await response.json();
  return {
    success: true,
    analysis: {
      status: result.healing_status,
      confidence: result.confidence,
      findings: result.findings,
      recommendation: result.recommendation,
      flagged: result.requires_attention
    }
  };
}
\`\`\`

**Vision API Options:**
- Google Cloud Vision API
- AWS Rekognition Custom Labels
- Azure Computer Vision
- Custom TensorFlow/PyTorch model

### 4. Firestore Database Setup

Replace `/lib/firestoreStubs.ts` with real Firestore:

\`\`\`typescript
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
\`\`\`

**Collections Schema:**

\`\`\`typescript
// patients collection
{
  id: string,
  name: string,
  age: number,
  surgery: string,
  dayPostOp: number,
  riskScore: number,
  painLevel: number,
  status: 'stable' | 'warning' | 'critical',
  createdAt: timestamp
}

// medications collection
{
  id: string,
  patientId: string,
  name: string,
  dosage: string,
  frequency: string,
  schedule: string[],
  taken: boolean[]
}

// alerts collection
{
  id: string,
  patientId: string,
  type: 'pain' | 'wound' | 'medication' | 'vitals',
  severity: 'low' | 'medium' | 'high',
  message: string,
  read: boolean,
  timestamp: timestamp
}

// whatsapp_logs collection
{
  id: string,
  patientId: string,
  timestamp: timestamp,
  type: 'check-in' | 'reminder' | 'alert',
  patientResponse: string,
  aiAnalysis: string
}
\`\`\`

## 🔐 Security Considerations

**Important**: This prototype is for demonstration purposes only.

### Before Production Deployment:

1. **HIPAA Compliance**
   - Implement end-to-end encryption
   - Add audit logging for all data access
   - Use BAA (Business Associate Agreement) with all service providers
   - Implement access controls and role-based permissions

2. **Authentication**
   - Implement OAuth 2.0 or similar
   - Add multi-factor authentication
   - Use secure session management

3. **Data Privacy**
   - Do NOT collect PII without proper consent and compliance
   - Implement data anonymization for analytics
   - Add data retention policies
   - Provide patient data export/deletion capabilities

4. **API Security**
   - Use API keys and rotate regularly
   - Implement rate limiting
   - Add request validation and sanitization
   - Use HTTPS only

## 📱 WhatsApp Automation Flow

1. **Scheduled Check-ins**: Automated messages sent at 8:00 AM & 8:00 PM
2. **Patient Response**: Patient replies with pain level and status
3. **AI Analysis**: Automatically analyzes response and updates risk score
4. **Alert Generation**: Creates alerts for doctor if thresholds exceeded
5. **Medication Reminders**: Sent 30 minutes before scheduled doses

## 🎨 Design System

- **Colors**: Soft blues (#3b82f6) and greens (#10b981) for healthcare calm
- **Typography**: Inter font family
- **Border Radius**: 12-16px for modern, friendly feel
- **Animations**: Subtle entrance animations, gauge progressions, micro-interactions
- **Responsive**: Mobile-first design with tablet and desktop layouts

## 🧪 Testing Mock Data

The app includes comprehensive mock data for testing:
- 5 demo patients with varying risk levels
- 4 active alerts (pain, wound, medication)
- 5 WhatsApp automation logs
- 3 medications with dose tracking
- 6 recovery timeline events
- Chat history with AI responses

## 📊 Analytics Tracked

- Pain level trends over time
- Risk score distribution across patients
- Medication compliance rates
- Alert response times
- Patient engagement metrics

## 🤝 Contributing

This is a prototype. For production use:
1. Implement proper backend API
2. Add comprehensive error handling
3. Write unit and integration tests
4. Add accessibility features (WCAG 2.1 AA)
5. Implement proper logging and monitoring

## 📄 License

MIT License - See LICENSE file for details

## ⚠️ Disclaimer

This is a prototype for demonstration purposes only. It is NOT intended for clinical use or collection of actual patient data. Always consult with healthcare compliance experts before deploying any healthcare-related software.

---

Built with ❤️ for better patient outcomes
