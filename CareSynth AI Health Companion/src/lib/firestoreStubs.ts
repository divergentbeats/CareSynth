// Firestore-like stubs for data management

import { Patient, Alert, ChatMessage, WhatsAppLog, Medication } from './mockData';

// Simulated Firestore operations
export class FirestoreStub {
  private data: Map<string, any[]> = new Map();

  constructor() {
    this.data.set('patients', []);
    this.data.set('alerts', []);
    this.data.set('messages', []);
    this.data.set('whatsappLogs', []);
    this.data.set('medications', []);
  }

  // Get collection
  collection(name: string) {
    return {
      get: async () => {
        const items = this.data.get(name) || [];
        return {
          docs: items.map((item, index) => ({
            id: item.id || `${name}_${index}`,
            data: () => item
          }))
        };
      },
      add: async (item: any) => {
        const items = this.data.get(name) || [];
        const newItem = { ...item, id: `${name}_${Date.now()}` };
        items.push(newItem);
        this.data.set(name, items);
        return { id: newItem.id };
      },
      doc: (id: string) => ({
        get: async () => {
          const items = this.data.get(name) || [];
          const item = items.find(i => i.id === id);
          return {
            exists: !!item,
            data: () => item
          };
        },
        update: async (updates: any) => {
          const items = this.data.get(name) || [];
          const index = items.findIndex(i => i.id === id);
          if (index !== -1) {
            items[index] = { ...items[index], ...updates };
            this.data.set(name, items);
          }
        },
        delete: async () => {
          const items = this.data.get(name) || [];
          const filtered = items.filter(i => i.id !== id);
          this.data.set(name, filtered);
        }
      })
    };
  }

  // Query operations
  query(collection: string, field: string, operator: string, value: any) {
    const items = this.data.get(collection) || [];
    return items.filter(item => {
      switch (operator) {
        case '==':
          return item[field] === value;
        case '>':
          return item[field] > value;
        case '<':
          return item[field] < value;
        case '>=':
          return item[field] >= value;
        case '<=':
          return item[field] <= value;
        default:
          return true;
      }
    });
  }

  // Initialize with mock data
  initialize(collection: string, data: any[]) {
    this.data.set(collection, data);
  }
}

export const db = new FirestoreStub();

// API stub for external services
export class APIStub {
  // Twilio WhatsApp API stub
  async sendWhatsAppMessage(to: string, message: string) {
    console.log(`[Twilio API] Sending WhatsApp to ${to}:`, message);
    return {
      success: true,
      messageId: `msg_${Date.now()}`,
      status: 'queued'
    };
  }

  // AI Risk Prediction API stub
  async predictRisk(patientData: any) {
    console.log('[Risk API] Analyzing patient data:', patientData);
    // Mock risk calculation
    const baseRisk = 15;
    const painFactor = patientData.painLevel * 3;
    const dayFactor = Math.max(0, (7 - patientData.dayPostOp) * 2);
    const riskScore = Math.min(100, baseRisk + painFactor + dayFactor);
    
    return {
      success: true,
      riskScore,
      factors: [
        { name: 'Pain Level', impact: painFactor, status: painFactor > 15 ? 'warning' : 'good' },
        { name: 'Recovery Stage', impact: dayFactor, status: dayFactor > 10 ? 'warning' : 'good' }
      ]
    };
  }

  // AI Wound Analysis API stub
  async analyzeWoundImage(imageData: string) {
    console.log('[Wound AI] Analyzing wound image...');
    // Mock analysis with random variation
    const isHealthy = Math.random() > 0.3;
    
    return {
      success: true,
      analysis: {
        status: isHealthy ? 'healing_well' : 'needs_attention',
        confidence: Math.random() * 0.3 + 0.7,
        findings: isHealthy 
          ? ['Normal healing progress', 'No signs of infection', 'Appropriate wound closure']
          : ['Mild inflammation detected', 'Slight redness noted', 'Recommend doctor review'],
        recommendation: isHealthy 
          ? 'Continue current care regimen'
          : 'Upload additional photos and notify your care team',
        flagged: !isHealthy
      }
    };
  }

  // AI Chat Assistant stub
  async getAIResponse(message: string, context: any) {
    console.log('[AI Chat] Processing message:', message);
    
    // Simple mock responses based on keywords
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('pain')) {
      return {
        success: true,
        response: 'I understand you\'re experiencing pain. Can you rate it on a scale of 0-10? If it\'s above 7 or sudden, please contact your doctor immediately.',
        sentiment: 'concerned'
      };
    } else if (lowerMessage.includes('medication') || lowerMessage.includes('med')) {
      return {
        success: true,
        response: 'For medication questions, please check your medication tracker. Remember to take your medications as prescribed. Is there a specific medication you have questions about?',
        sentiment: 'helpful'
      };
    } else if (lowerMessage.includes('exercise') || lowerMessage.includes('therapy')) {
      return {
        success: true,
        response: 'Physical therapy is crucial for recovery. Start with gentle exercises and gradually increase intensity. Never push through sharp pain. Would you like me to show you your exercise schedule?',
        sentiment: 'encouraging'
      };
    } else {
      return {
        success: true,
        response: 'I\'m here to help with your recovery. You can ask me about pain management, medications, exercises, or wound care. How can I assist you today?',
        sentiment: 'neutral'
      };
    }
  }

  // Generate AI summary for doctor messaging
  async generateAISummary(patientData: any) {
    console.log('[AI Summary] Generating patient summary...');
    
    const { name, painLevel, riskScore, dayPostOp, lastCheckIn } = patientData;
    
    return {
      success: true,
      summary: `Patient Update - ${name}\n\n📊 Current Status:\n• Day ${dayPostOp} post-op\n• Pain Level: ${painLevel}/10\n• Risk Score: ${riskScore}/100\n• Last Check-in: ${lastCheckIn}\n\n💊 Medications:\n• Oxycodone 5mg - Compliant\n• Cephalexin 500mg - Compliant\n\n⚠️ Concerns:\n${painLevel > 6 ? '• Elevated pain level requiring attention\n' : '• Pain well-managed\n'}${riskScore > 40 ? '• Risk score above threshold\n' : '• Risk within normal range\n'}\n📝 Patient Notes:\n[Patient can add specific concerns here]`,
      timestamp: new Date().toISOString()
    };
  }
}

export const api = new APIStub();
