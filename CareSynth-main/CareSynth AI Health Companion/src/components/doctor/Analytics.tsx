import { useState } from 'react';
import { TrendingUp, Users, AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';
import { Card } from '../ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { analyticsData, allPatients, patientAnalyticsData } from '../../lib/mockData';
import { APIBadge } from '../common/APIBadge';
import { useTheme } from '../../lib/ThemeContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface AnalyticsProps {
  onPatientChange?: (patientId: string, patientName: string) => void;
}

export function Analytics({ onPatientChange }: AnalyticsProps) {
  const { isDarkTheme } = useTheme();
  // GET /doctor/{id}/patients
  const [selectedPatientId, setSelectedPatientId] = useState<string>('1');
  const [medicationView, setMedicationView] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // GET /patient/{id}/data
  const selectedPatient = allPatients.find(p => p.id === selectedPatientId) || allPatients[0];
  const patientData = patientAnalyticsData[selectedPatientId] || patientAnalyticsData['1'];

  const handlePatientChange = (patientId: string) => {
    // Add smooth transition
    setIsTransitioning(true);
    
    // Small delay to allow fade out
    setTimeout(() => {
      setSelectedPatientId(patientId);
      const patient = allPatients.find(p => p.id === patientId);
      if (patient && onPatientChange) {
        onPatientChange(patientId, patient.name);
      }
      
      // Fade back in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 150);
  };

  // Ensure data exists before rendering
  if (!selectedPatient || !patientData) {
    return null;
  }

  const stats = [
    {
      icon: Users,
      label: 'Total Patients',
      value: '29',
      change: '+3 this week',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: CheckCircle,
      label: 'Stable Patients',
      value: '15',
      change: '52% of total',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: AlertCircle,
      label: 'Active Alerts',
      value: '4',
      change: '-2 from yesterday',
      color: 'text-amber-600 bg-amber-100'
    },
    {
      icon: TrendingUp,
      label: 'Avg Recovery',
      value: '94%',
      change: '+5% improvement',
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Patient Selection Dropdown */}
      <Card className={`${isDarkTheme ? 'dark-glass-card' : 'light-glass-card'} p-5 rounded-[18px] card-hover-lift transition-all duration-400`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="gradient-text-glow mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '22px' }}>
              Patient Analytics Dashboard
            </h3>
            <p className="gradient-text-secondary text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              Select a patient to view detailed recovery insights
            </p>
          </div>
          <div className="flex items-center gap-3">
            <APIBadge endpoint="GET /doctor/{id}/patients" variant="full" />
            <Select value={selectedPatientId} onValueChange={handlePatientChange}>
              <SelectTrigger 
                className={`w-[280px] rounded-xl ${
                  isDarkTheme
                    ? 'bg-white/[0.05] border-white/[0.12] text-white'
                    : 'bg-white border-gray-300'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
              >
                <div className="flex items-center gap-3">
                  {selectedPatient?.photo && (
                    <img 
                      src={selectedPatient.photo} 
                      alt={selectedPatient.name || 'Patient'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <SelectValue placeholder="Select patient" />
                </div>
              </SelectTrigger>
              <SelectContent className={isDarkTheme ? 'dark-glass-card border-white/[0.12]' : 'bg-white border-gray-200'}>
                {allPatients.map((patient) => (
                  <SelectItem 
                    key={patient.id} 
                    value={patient.id}
                    className={`${isDarkTheme ? 'focus:bg-white/10' : 'focus:bg-gray-100'}`}
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={patient.photo} 
                        alt={patient.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <div>
                        <p className="gradient-text" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                          {patient.name}
                        </p>
                        <p className="text-xs gradient-text-muted" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                          {patient.surgery} • Day {patient.dayPostOp}
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Patient Data Container - Smooth Transitions */}
      <div 
        className={`space-y-6 transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        key={`patient-data-${selectedPatientId}`}
      >
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="animate-in fade-in slide-in-from-bottom-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className={`${isDarkTheme ? 'dark-glass-card' : 'light-glass-card'} p-4 rounded-xl card-hover-lift transition-all duration-300`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${stat.color} backdrop-blur-sm border border-white/[0.12]`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="gradient-text-secondary text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                      {stat.label}
                    </p>
                    <p className="gradient-text-glow" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '20px' }}>
                      {stat.value}
                    </p>
                  </div>
                </div>
                <div className={`text-sm flex items-center gap-1 ${stat.change.startsWith('+') ? 'text-[#37E29D]' : 'text-[#F47C7C]'}`} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Charts Grid - Compact Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pain Trend Chart - GET /patient/{id}/recovery-trends */}
          <Card key={`pain-chart-${selectedPatientId}`} className={`${isDarkTheme ? 'dark-glass-card' : 'light-glass-card'} p-6 rounded-[18px] card-hover-lift transition-all duration-400`}>
            <div className="animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="gradient-text-glow" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '18px' }}>
                    Pain Level Trends
                  </h3>
                  <p className="gradient-text-secondary text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                    {selectedPatient?.name || 'Patient'} • 7-day view
                  </p>
                </div>
                <APIBadge endpoint="/patient/{id}/recovery-trends" />
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={patientData?.painTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'} />
                  <XAxis 
                    dataKey="day" 
                    stroke={isDarkTheme ? '#A7B0B5' : '#6B7280'} 
                    style={{ fontSize: '11px', fontFamily: 'Inter, sans-serif' }} 
                  />
                  <YAxis 
                    stroke={isDarkTheme ? '#A7B0B5' : '#6B7280'} 
                    style={{ fontSize: '11px', fontFamily: 'Inter, sans-serif' }} 
                    domain={[0, 10]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkTheme ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${isDarkTheme ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}`,
                      borderRadius: '8px',
                      color: isDarkTheme ? '#EAEAEA' : '#1F2937'
                    }}
                    labelFormatter={(label, payload) => {
                      if (payload && payload[0] && payload[0].payload) {
                        return `${payload[0].payload.date}`;
                      }
                      return label;
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'Inter, sans-serif' }} />
                  <Line
                    type="monotone"
                    dataKey="pain"
                    stroke="#F47C7C"
                    strokeWidth={2}
                    dot={{ fill: '#F47C7C', r: 4 }}
                    name="Actual Pain"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#37E29D"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#37E29D', r: 4 }}
                    name="Target Pain"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Risk Distribution - Compact */}
          <Card key={`risk-chart-${selectedPatientId}`} className={`${isDarkTheme ? 'dark-glass-card' : 'light-glass-card'} p-6 rounded-[18px] card-hover-lift transition-all duration-400`}>
            <div className="animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: '500ms' }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="gradient-text-glow" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '18px' }}>
                    Risk Score Distribution
                  </h3>
                  <p className="gradient-text-secondary text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                    {selectedPatient?.name || 'Patient'} • Historical analysis
                  </p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={patientData?.riskDistribution || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ range, count }) => `${count}`}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {(patientData?.riskDistribution || []).map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: isDarkTheme ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${isDarkTheme ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}`,
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {(patientData?.riskDistribution || []).map((item: any, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs gradient-text-muted" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                      {item.range}: {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Medication Compliance - Compact with Toggle - GET /patient/{id}/medication-log */}
        <Card key={`medication-chart-${selectedPatientId}`} className={`${isDarkTheme ? 'dark-glass-card' : 'light-glass-card'} p-6 rounded-[18px] card-hover-lift transition-all duration-400`}>
          <div className="animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: '600ms' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="gradient-text-glow" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '18px' }}>
                  Medication Compliance Log
                </h3>
                <p className="gradient-text-secondary text-xs" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  {selectedPatient?.name || 'Patient'} • Dosage tracking by time period
                </p>
              </div>
              <div className="flex items-center gap-3">
                <APIBadge endpoint="GET /patient/{id}/medication-log" />
                <Select value={medicationView} onValueChange={(v: any) => setMedicationView(v)}>
                  <SelectTrigger 
                    className={`w-[120px] rounded-lg ${
                      isDarkTheme
                        ? 'bg-white/[0.05] border-white/[0.12] text-[#5BC7FF]'
                        : 'bg-white border-gray-300 text-[#0BAF85]'
                    }`}
                    style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '13px' }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={isDarkTheme ? 'dark-glass-card border-white/[0.12]' : 'bg-white border-gray-200'}>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={patientData?.medicationLog?.[medicationView] || []}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'} />
                <XAxis 
                  dataKey={medicationView === 'daily' ? 'day' : medicationView === 'weekly' ? 'week' : 'month'} 
                  stroke={isDarkTheme ? '#A7B0B5' : '#6B7280'} 
                  style={{ fontSize: '11px', fontFamily: 'Inter, sans-serif' }} 
                />
                <YAxis 
                  stroke={isDarkTheme ? '#A7B0B5' : '#6B7280'} 
                  style={{ fontSize: '11px', fontFamily: 'Inter, sans-serif' }} 
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkTheme ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${isDarkTheme ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}`,
                    borderRadius: '8px',
                    color: isDarkTheme ? '#EAEAEA' : '#1F2937'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'Inter, sans-serif' }} />
                <Bar
                  dataKey="morning"
                  fill="#37E29D"
                  radius={[6, 6, 0, 0]}
                  name="Morning"
                />
                <Bar
                  dataKey="evening"
                  fill="#5BC7FF"
                  radius={[6, 6, 0, 0]}
                  name="Evening"
                />
                <Bar
                  dataKey="night"
                  fill="#A78BFA"
                  radius={[6, 6, 0, 0]}
                  name="Night"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}