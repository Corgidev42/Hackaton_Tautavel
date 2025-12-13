import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  FileMap,
  Settings,
  Eye,
  EyeOff,
  GitMerge,
  X,
  UserCheck,
  TrendingUp,
  Activity
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// ==================== INTERFACES ====================

interface Contribution {
  day: string;
  contributions: number;
}

interface UserDrawing {
  userId: string;
  userName: string;
  color: string;
  pathData: string;
  confidence: number;
}

interface Conflict {
  id: string;
  itemName: string;
  itemType: string;
  mapImageUrl: string;
  drawings: UserDrawing[];
  createdAt: string;
  priority: 'high' | 'medium' | 'low';
}

interface KPICard {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
  progress?: number;
}

// ==================== MOCK DATA ====================

const mockContributions: Contribution[] = [
  { day: 'Mon', contributions: 245 },
  { day: 'Tue', contributions: 312 },
  { day: 'Wed', contributions: 289 },
  { day: 'Thu', contributions: 401 },
  { day: 'Fri', contributions: 378 },
  { day: 'Sat', contributions: 456 },
  { day: 'Sun', contributions: 423 },
];

const initialConflicts: Conflict[] = [
  {
    id: 'conf-001',
    itemName: 'Pottery Fragment #2847',
    itemType: 'Ceramic',
    mapImageUrl: 'https://images.unsplash.com/photo-1595147389795-37094173bfd8?w=800&h=600&fit=crop',
    drawings: [
      {
        userId: 'user-a',
        userName: 'User A (Expert)',
        color: '#00FFFF',
        pathData: 'M 150 100 L 250 120 L 280 200 L 200 250 L 120 220 Z',
        confidence: 92
      },
      {
        userId: 'user-b',
        userName: 'User B',
        color: '#FF00FF',
        pathData: 'M 155 105 L 255 125 L 285 205 L 205 255 L 125 225 Z',
        confidence: 78
      },
      {
        userId: 'user-c',
        userName: 'User C',
        color: '#FFFF00',
        pathData: 'M 145 95 L 245 115 L 275 195 L 195 245 L 115 215 Z',
        confidence: 85
      }
    ],
    createdAt: '2025-12-13T10:30:00Z',
    priority: 'high'
  },
  {
    id: 'conf-002',
    itemName: 'Stone Tool #1204',
    itemType: 'Lithic',
    mapImageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01f3fcb?w=800&h=600&fit=crop',
    drawings: [
      {
        userId: 'user-d',
        userName: 'User D',
        color: '#00FFFF',
        pathData: 'M 100 150 Q 200 100 300 150 T 500 150',
        confidence: 88
      },
      {
        userId: 'user-e',
        userName: 'User E (Expert)',
        color: '#FF00FF',
        pathData: 'M 105 155 Q 205 105 305 155 T 505 155',
        confidence: 94
      },
      {
        userId: 'user-f',
        userName: 'User F',
        color: '#FFFF00',
        pathData: 'M 95 145 Q 195 95 295 145 T 495 145',
        confidence: 81
      }
    ],
    createdAt: '2025-12-13T09:15:00Z',
    priority: 'medium'
  },
  {
    id: 'conf-003',
    itemName: 'Wall Structure #5621',
    itemType: 'Architecture',
    mapImageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    drawings: [
      {
        userId: 'user-g',
        userName: 'User G',
        color: '#00FFFF',
        pathData: 'M 50 200 L 550 200 L 550 400 L 50 400 Z',
        confidence: 76
      },
      {
        userId: 'user-h',
        userName: 'User H',
        color: '#FF00FF',
        pathData: 'M 55 205 L 555 205 L 555 405 L 55 405 Z',
        confidence: 83
      },
      {
        userId: 'user-i',
        userName: 'User I (Expert)',
        color: '#FFFF00',
        pathData: 'M 48 198 L 548 198 L 548 398 L 48 398 Z',
        confidence: 91
      }
    ],
    createdAt: '2025-12-13T08:45:00Z',
    priority: 'low'
  }
];

// ==================== MAIN APP COMPONENT ====================

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'validation' | 'users' | 'settings'>('dashboard');
  const [conflicts, setConflicts] = useState<Conflict[]>(initialConflicts);
  const [currentConflictIndex, setCurrentConflictIndex] = useState(0);
  const [visibleLayers, setVisibleLayers] = useState<Record<string, boolean>>({
    'user-a': true,
    'user-b': true,
    'user-c': true,
    'user-d': true,
    'user-e': true,
    'user-f': true,
    'user-g': true,
    'user-h': true,
    'user-i': true,
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const currentConflict = conflicts[currentConflictIndex];

  // ==================== HANDLERS ====================

  const handleValidateConsensus = () => {
    showSuccessToast('✓ Conflict resolved - Consensus validated!');
    moveToNextConflict();
  };

  const handleSelectUser = (userName: string) => {
    showSuccessToast(`✓ ${userName}'s drawing selected!`);
    moveToNextConflict();
  };

  const handleRejectAll = () => {
    showSuccessToast('✗ All submissions rejected - Item flagged for review');
    moveToNextConflict();
  };

  const moveToNextConflict = () => {
    setTimeout(() => {
      if (currentConflictIndex < conflicts.length - 1) {
        setCurrentConflictIndex(currentConflictIndex + 1);
      } else {
        // Remove resolved conflict and reset to first
        const updatedConflicts = conflicts.filter((_, idx) => idx !== currentConflictIndex);
        setConflicts(updatedConflicts);
        setCurrentConflictIndex(0);
      }
    }, 1000);
  };

  const showSuccessToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const toggleLayerVisibility = (userId: string) => {
    setVisibleLayers(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  // ==================== KPI DATA ====================

  const kpiCards: KPICard[] = [
    {
      title: 'Total Progress',
      value: '45%',
      subtitle: '23,402 vectors traced',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-600',
      progress: 45
    },
    {
      title: 'Conflict Queue',
      value: conflicts.length,
      subtitle: 'requiring validation',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'from-rose-500 to-red-600',
    },
    {
      title: 'Active Users',
      value: 120,
      subtitle: 'currently online',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-emerald-500 to-green-600',
    },
    {
      title: 'Accuracy',
      value: '89%',
      subtitle: 'consensus rate',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'from-cyan-500 to-blue-600',
    }
  ];

  // ==================== RENDER FUNCTIONS ====================

  const renderSidebar = () => (
    <div className="w-64 bg-slate-900 border-r border-slate-800 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <FileMap className="w-8 h-8 text-indigo-400" />
          <div>
            <h1 className="text-xl font-bold text-white">ArcheoTrace</h1>
            <p className="text-xs text-slate-400">Admin Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavItem
          icon={<LayoutDashboard className="w-5 h-5" />}
          label="Dashboard"
          active={currentView === 'dashboard'}
          onClick={() => setCurrentView('dashboard')}
        />
        <NavItem
          icon={<AlertTriangle className="w-5 h-5" />}
          label="Validation Queue"
          badge={conflicts.length}
          active={currentView === 'validation'}
          onClick={() => setCurrentView('validation')}
        />
        <NavItem
          icon={<Users className="w-5 h-5" />}
          label="User Base"
          active={currentView === 'users'}
          onClick={() => setCurrentView('users')}
        />
        <NavItem
          icon={<Settings className="w-5 h-5" />}
          label="Settings"
          active={currentView === 'settings'}
          onClick={() => setCurrentView('settings')}
        />
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg p-3">
          <p className="text-xs text-slate-300 font-medium">Pro Tip</p>
          <p className="text-xs text-slate-400 mt-1">Use keyboard shortcuts to speed up validation</p>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
        <p className="text-slate-400">Welcome back! Here's what's happening with your project.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`bg-gradient-to-br ${card.color} p-3 rounded-lg`}>
                {card.icon}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{card.value}</h3>
            <p className="text-slate-400 text-sm mb-2">{card.title}</p>
            {card.subtitle && (
              <p className="text-slate-500 text-xs">{card.subtitle}</p>
            )}
            {card.progress !== undefined && (
              <div className="mt-4">
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r ${card.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${card.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-1">Contributions Over Time</h3>
          <p className="text-slate-400 text-sm">Last 7 days activity</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mockContributions}>
            <defs>
              <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="day" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#F1F5F9'
              }}
            />
            <Area
              type="monotone"
              dataKey="contributions"
              stroke="#8B5CF6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorContributions)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { user: 'Expert_Marie_L', action: 'validated 12 conflicts', time: '5 min ago', color: 'text-emerald-400' },
            { user: 'ArcheoStudent_23', action: 'submitted new drawing', time: '12 min ago', color: 'text-blue-400' },
            { user: 'Prof_Durant', action: 'flagged conflict', time: '23 min ago', color: 'text-rose-400' },
            { user: 'Volunteer_Alex', action: 'traced 34 vectors', time: '1 hour ago', color: 'text-indigo-400' },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="text-slate-300 font-medium">{activity.user}</span>
                <span className="text-slate-500">{activity.action}</span>
              </div>
              <span className="text-slate-500 text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderValidationView = () => {
    if (conflicts.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">All Conflicts Resolved! 🎉</h3>
            <p className="text-slate-400">Great work! There are no pending validations.</p>
          </div>
        </div>
      );
    }

    if (!currentConflict) return null;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Conflict Resolution</h2>
            <p className="text-slate-400">
              Item {currentConflictIndex + 1} of {conflicts.length} • {currentConflict.itemType}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentConflict.priority === 'high' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50' :
              currentConflict.priority === 'medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50' :
              'bg-slate-500/20 text-slate-300 border border-slate-500/50'
            }`}>
              {currentConflict.priority.toUpperCase()} PRIORITY
            </span>
          </div>
        </div>

        {/* Main Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Visual View */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-700 bg-slate-900/50">
              <h3 className="text-lg font-bold text-white">{currentConflict.itemName}</h3>
              <p className="text-slate-400 text-sm">Archaeological Plan View</p>
            </div>
            <div className="relative aspect-[4/3] bg-slate-900">
              {/* Background Image */}
              <img
                src={currentConflict.mapImageUrl}
                alt="Archaeological plan"
                className="w-full h-full object-cover opacity-40"
              />
              {/* SVG Overlay */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 600 450"
                xmlns="http://www.w3.org/2000/svg"
              >
                {currentConflict.drawings.map((drawing) => (
                  visibleLayers[drawing.userId] && (
                    <path
                      key={drawing.userId}
                      d={drawing.pathData}
                      fill="none"
                      stroke={drawing.color}
                      strokeWidth="3"
                      className="drop-shadow-[0_0_8px_currentColor] transition-all duration-300"
                      style={{ filter: `drop-shadow(0 0 8px ${drawing.color})` }}
                    />
                  )
                ))}
              </svg>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="space-y-4">
            {/* Layer Toggles */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Layer Visibility
              </h4>
              <div className="space-y-3">
                {currentConflict.drawings.map((drawing) => (
                  <div
                    key={drawing.userId}
                    className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: drawing.color }}
                      />
                      <div>
                        <p className="text-white font-medium">{drawing.userName}</p>
                        <p className="text-slate-400 text-xs">Confidence: {drawing.confidence}%</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleLayerVisibility(drawing.userId)}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      {visibleLayers[drawing.userId] ? (
                        <Eye className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <EyeOff className="w-5 h-5 text-slate-500" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">Resolution Actions</h4>
              <div className="space-y-3">
                <button
                  onClick={handleValidateConsensus}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/50"
                >
                  <GitMerge className="w-5 h-5" />
                  <span>Validate Consensus (Merge)</span>
                </button>

                {currentConflict.drawings.map((drawing) => (
                  <button
                    key={drawing.userId}
                    onClick={() => handleSelectUser(drawing.userName)}
                    className="w-full flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 border border-slate-600 hover:border-indigo-500"
                  >
                    <UserCheck className="w-5 h-5" />
                    <span>Select {drawing.userName} Only</span>
                  </button>
                ))}

                <button
                  onClick={handleRejectAll}
                  className="w-full flex items-center justify-center space-x-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/50 hover:border-rose-500 font-medium py-3 px-4 rounded-lg transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                  <span>Reject All Submissions</span>
                </button>
              </div>
            </div>

            {/* Metadata */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">Conflict Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Conflict ID:</span>
                  <span className="text-slate-300 font-mono">{currentConflict.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Created:</span>
                  <span className="text-slate-300">{new Date(currentConflict.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Contributors:</span>
                  <span className="text-slate-300">{currentConflict.drawings.length} users</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPlaceholderView = (title: string, icon: React.ReactNode) => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        {icon}
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400">This view is coming soon...</p>
      </div>
    </div>
  );

  // ==================== MAIN RENDER ====================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {renderSidebar()}
      
      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {currentView === 'dashboard' && renderDashboard()}
          {currentView === 'validation' && renderValidationView()}
          {currentView === 'users' && renderPlaceholderView('User Base', <Users className="w-16 h-16 text-indigo-500 mx-auto mb-4" />)}
          {currentView === 'settings' && renderPlaceholderView('Settings', <Settings className="w-16 h-16 text-indigo-500 mx-auto mb-4" />)}
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-slate-800 border border-emerald-500/50 rounded-lg shadow-lg shadow-emerald-500/20 p-4 animate-slide-up">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
            <p className="text-white font-medium">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== SUB-COMPONENTS ====================

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, badge, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
      active
        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50'
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-300'
    }`}
  >
    <div className="flex items-center space-x-3">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    {badge !== undefined && (
      <span className="bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">
        {badge}
      </span>
    )}
  </button>
);

export default App;
