import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  Map,
  Settings,
  Eye,
  EyeOff,
  GitMerge,
  X,
  UserCheck,
  TrendingUp,
  Activity,
  Menu,
  FileText,
  Grid3x3,
  List,
  Gift,
  Mail,
  Trophy,
  Calendar
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
  onClick?: () => void;
}

interface Plan {
  id: string;
  name: string;
  type: 'Pierre' | 'Industrie' | 'Galet' | 'Schiste' | 'Ossement' | 'Calcite';
  completedBy: string;
  completedAt: string;
  vectorCount: number;
  accuracy: number;
  imageUrl: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plansCompleted: number;
  accuracy: number;
  points: number;
  rewards: Reward[];
  joinedAt: string;
  status: 'online' | 'offline';
}

interface Reward {
  id: string;
  type: 'visit' | 'merch' | 'badge' | 'certificate';
  title: string;
  description: string;
  earnedAt: string;
  claimed: boolean;
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
    itemName: 'Fragment de Pierre #2847',
    itemType: 'Pierre',
    mapImageUrl: 'https://images.unsplash.com/photo-1595147389795-37094173bfd8?w=800&h=600&fit=crop',
    drawings: [
      {
        userId: 'user-a',
        userName: 'User A (Expert)',
        color: '#DC2626',
        pathData: 'M 150 100 L 250 120 L 280 200 L 200 250 L 120 220 Z',
        confidence: 92
      },
      {
        userId: 'user-b',
        userName: 'User B',
        color: '#EF4444',
        pathData: 'M 155 105 L 255 125 L 285 205 L 205 255 L 125 225 Z',
        confidence: 78
      },
      {
        userId: 'user-c',
        userName: 'User C',
        color: '#F87171',
        pathData: 'M 145 95 L 245 115 L 275 195 L 195 245 L 115 215 Z',
        confidence: 85
      }
    ],
    createdAt: '2025-12-13T10:30:00Z',
    priority: 'high'
  },
  {
    id: 'conf-002',
    itemName: 'Outil Industrie #1204',
    itemType: 'Industrie',
    mapImageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01f3fcb?w=800&h=600&fit=crop',
    drawings: [
      {
        userId: 'user-d',
        userName: 'User D',
        color: '#2563EB',
        pathData: 'M 100 150 Q 200 100 300 150 T 500 150',
        confidence: 88
      },
      {
        userId: 'user-e',
        userName: 'User E (Expert)',
        color: '#3B82F6',
        pathData: 'M 105 155 Q 205 105 305 155 T 505 155',
        confidence: 94
      },
      {
        userId: 'user-f',
        userName: 'User F',
        color: '#60A5FA',
        pathData: 'M 95 145 Q 195 95 295 145 T 495 145',
        confidence: 81
      }
    ],
    createdAt: '2025-12-13T09:15:00Z',
    priority: 'medium'
  },
  {
    id: 'conf-003',
    itemName: 'Ossement #5621',
    itemType: 'Ossement',
    mapImageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    drawings: [
      {
        userId: 'user-g',
        userName: 'User G',
        color: '#EAB308',
        pathData: 'M 50 200 L 550 200 L 550 400 L 50 400 Z',
        confidence: 76
      },
      {
        userId: 'user-h',
        userName: 'User H',
        color: '#FACC15',
        pathData: 'M 55 205 L 555 205 L 555 405 L 55 405 Z',
        confidence: 83
      },
      {
        userId: 'user-i',
        userName: 'User I (Expert)',
        color: '#FDE047',
        pathData: 'M 48 198 L 548 198 L 548 398 L 48 398 Z',
        confidence: 91
      }
    ],
    createdAt: '2025-12-13T08:45:00Z',
    priority: 'low'
  }
];

const mockPlans: Plan[] = [
  {
    id: 'plan-001',
    name: 'Secteur A - Niveau 3',
    type: 'Pierre',
    completedBy: 'Marie Dubois',
    completedAt: '2025-12-10T14:30:00Z',
    vectorCount: 156,
    accuracy: 94,
    imageUrl: 'https://images.unsplash.com/photo-1595147389795-37094173bfd8?w=400&h=300&fit=crop'
  },
  {
    id: 'plan-002',
    name: 'Secteur B - Niveau 2',
    type: 'Industrie',
    completedBy: 'Jean Martin',
    completedAt: '2025-12-11T09:15:00Z',
    vectorCount: 203,
    accuracy: 89,
    imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01f3fcb?w=400&h=300&fit=crop'
  },
  {
    id: 'plan-003',
    name: 'Secteur C - Niveau 4',
    type: 'Ossement',
    completedBy: 'Sophie Laurent',
    completedAt: '2025-12-11T16:45:00Z',
    vectorCount: 87,
    accuracy: 96,
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop'
  },
  {
    id: 'plan-004',
    name: 'Secteur D - Niveau 1',
    type: 'Galet',
    completedBy: 'Pierre Rousseau',
    completedAt: '2025-12-12T11:20:00Z',
    vectorCount: 134,
    accuracy: 91,
    imageUrl: 'https://images.unsplash.com/photo-1595147389795-37094173bfd8?w=400&h=300&fit=crop'
  },
  {
    id: 'plan-005',
    name: 'Secteur E - Niveau 5',
    type: 'Schiste',
    completedBy: 'Lucie Bernard',
    completedAt: '2025-12-12T15:30:00Z',
    vectorCount: 98,
    accuracy: 88,
    imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01f3fcb?w=400&h=300&fit=crop'
  },
  {
    id: 'plan-006',
    name: 'Secteur F - Niveau 2',
    type: 'Calcite',
    completedBy: 'Antoine Moreau',
    completedAt: '2025-12-13T08:00:00Z',
    vectorCount: 176,
    accuracy: 93,
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop'
  }
];

const mockUsers: User[] = [
  {
    id: 'user-001',
    name: 'Marie Dubois',
    email: 'marie.dubois@email.fr',
    avatar: 'https://i.pravatar.cc/150?img=1',
    plansCompleted: 45,
    accuracy: 94,
    points: 4500,
    status: 'online',
    joinedAt: '2025-10-01T00:00:00Z',
    rewards: [
      {
        id: 'rew-001',
        type: 'visit',
        title: 'Visite Guidée VIP',
        description: 'Accès à une visite privée du musée',
        earnedAt: '2025-11-15T00:00:00Z',
        claimed: true
      },
      {
        id: 'rew-002',
        type: 'badge',
        title: 'Expert Niveau 1',
        description: '50 plans complétés avec 90% de précision',
        earnedAt: '2025-12-01T00:00:00Z',
        claimed: true
      }
    ]
  },
  {
    id: 'user-002',
    name: 'Jean Martin',
    email: 'jean.martin@email.fr',
    avatar: 'https://i.pravatar.cc/150?img=12',
    plansCompleted: 32,
    accuracy: 89,
    points: 3200,
    status: 'offline',
    joinedAt: '2025-10-15T00:00:00Z',
    rewards: [
      {
        id: 'rew-003',
        type: 'merch',
        title: 'T-Shirt ArcheoTrace',
        description: 'T-Shirt collector du projet',
        earnedAt: '2025-11-20T00:00:00Z',
        claimed: false
      }
    ]
  },
  {
    id: 'user-003',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@email.fr',
    avatar: 'https://i.pravatar.cc/150?img=5',
    plansCompleted: 28,
    accuracy: 96,
    points: 2950,
    status: 'online',
    joinedAt: '2025-11-01T00:00:00Z',
    rewards: [
      {
        id: 'rew-004',
        type: 'certificate',
        title: 'Certificat de Contribution',
        description: 'Certificat officiel signé par le musée',
        earnedAt: '2025-12-05T00:00:00Z',
        claimed: true
      }
    ]
  }
];

// ==================== MAIN APP COMPONENT ====================

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'validation' | 'users' | 'settings' | 'plans'>('dashboard');
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [plansViewMode, setPlansViewMode] = useState<'list' | 'cards'>('cards');

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

  const totalPlans = 32000;
  const completedPlans = 14250;
  const planProgress = Math.round((completedPlans / totalPlans) * 100);

  const kpiCards: KPICard[] = [
    {
      title: 'Plans Complétés',
      value: `${completedPlans.toLocaleString()} / ${totalPlans.toLocaleString()}`,
      subtitle: `${planProgress}% de progression`,
      icon: <Map className="w-6 h-6" />,
      color: 'from-amber-600 to-yellow-600',
      progress: planProgress,
      onClick: () => setCurrentView('plans')
    },
    {
      title: 'File de Validation',
      value: conflicts.length,
      subtitle: 'en attente',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'from-red-600 to-rose-700',
      onClick: () => setCurrentView('validation')
    },
    {
      title: 'Utilisateurs Actifs',
      value: 120,
      subtitle: 'en ligne maintenant',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-slate-200 to-slate-400',
      onClick: () => setCurrentView('users')
    },
    {
      title: 'Précision',
      value: '89%',
      subtitle: 'taux de consensus',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'from-amber-500 to-yellow-500',
    }
  ];

  // ==================== RENDER FUNCTIONS ====================

  const renderSidebar = () => (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col shadow-lg z-50 transition-transform duration-300 lg:translate-x-0 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-amber-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Map className="w-8 h-8 text-amber-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">ArcheoTrace</h1>
                <p className="text-xs text-gray-600">Tautavel</p>
              </div>
            </div>
            {/* Close button on mobile */}
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavItem
          icon={<LayoutDashboard className="w-5 h-5" />}
          label="Tableau de Bord"
          active={currentView === 'dashboard'}
          onClick={() => { setCurrentView('dashboard'); setIsMobileMenuOpen(false); }}
        />
        <NavItem
          icon={<AlertTriangle className="w-5 h-5" />}
          label="File de Validation"
          badge={conflicts.length}
          active={currentView === 'validation'}
          onClick={() => { setCurrentView('validation'); setIsMobileMenuOpen(false); }}
        />
        <NavItem
          icon={<FileText className="w-5 h-5" />}
          label="Plans Complétés"
          active={currentView === 'plans'}
          onClick={() => { setCurrentView('plans'); setIsMobileMenuOpen(false); }}
        />
        <NavItem
          icon={<Users className="w-5 h-5" />}
          label="Utilisateurs"
          active={currentView === 'users'}
          onClick={() => { setCurrentView('users'); setIsMobileMenuOpen(false); }}
        />
        <NavItem
          icon={<Settings className="w-5 h-5" />}
          label="Paramètres"
          active={currentView === 'settings'}
          onClick={() => { setCurrentView('settings'); setIsMobileMenuOpen(false); }}
        />
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs text-gray-800 font-medium">Astuce</p>
          <p className="text-xs text-gray-600 mt-1">Utilisez les raccourcis clavier pour accélérer la validation</p>
        </div>
      </div>
    </div>
    </>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Tableau de Bord</h2>
        <p className="text-sm sm:text-base text-gray-600">Bienvenue! Voici l'état d'avancement de votre projet.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        {kpiCards.map((card, idx) => (
          <div
            key={idx}
            onClick={card.onClick}
            className={`bg-white border border-gray-200 rounded-xl p-6 hover:border-amber-300 transition-all duration-300 hover:shadow-xl shadow-md ${
              card.onClick ? 'cursor-pointer active:scale-95' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`bg-gradient-to-br ${card.color} p-3 rounded-lg shadow-sm`}>
                <div className="text-white">{card.icon}</div>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 break-words">{card.value}</h3>
            <p className="text-gray-700 text-xs sm:text-sm font-medium mb-2">{card.title}</p>
            {card.subtitle && (
              <p className="text-gray-500 text-xs leading-tight">{card.subtitle}</p>
            )}
            {card.progress !== undefined && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
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
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-md mb-6">
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Évolution des Contributions</h3>
          <p className="text-gray-600 text-xs sm:text-sm">Activité des 7 derniers jours</p>
        </div>
        <ResponsiveContainer width="100%" height={250} className="sm:hidden">
          <AreaChart data={mockContributions}>
            <defs>
              <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D97706" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#DC2626" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="day" stroke="#94A3B8" tick={{ fontSize: 12 }} />
            <YAxis stroke="#94A3B8" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '2px solid #D97706',
                borderRadius: '8px',
                color: '#1F2937',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                fontSize: '12px'
              }}
            />
            <Area
              type="monotone"
              dataKey="contributions"
              stroke="#D97706"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorContributions)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={300} className="hidden sm:block">
          <AreaChart data={mockContributions}>
            <defs>
              <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D97706" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#DC2626" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="day" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '2px solid #D97706',
                borderRadius: '8px',
                color: '#1F2937',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Area
              type="monotone"
              dataKey="contributions"
              stroke="#D97706"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorContributions)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-md">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Activité Récente</h3>
        <div className="space-y-2 sm:space-y-3">
          {[
            { user: 'Expert_Marie_L', action: 'a validé 12 conflits', time: 'il y a 5 min', color: 'bg-amber-500' },
            { user: 'Étudiant_Archeo_23', action: 'a soumis un nouveau tracé', time: 'il y a 12 min', color: 'bg-blue-500' },
            { user: 'Prof_Durant', action: 'a signalé un conflit', time: 'il y a 23 min', color: 'bg-red-600' },
            { user: 'Bénévole_Alex', action: 'a tracé 34 vecteurs', time: 'il y a 1h', color: 'bg-yellow-500' },
          ].map((activity, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors gap-2">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${activity.color}`} />
                <span className="text-gray-900 font-medium text-sm sm:text-base truncate">{activity.user}</span>
                <span className="text-gray-600 text-xs sm:text-sm truncate">{activity.action}</span>
              </div>
              <span className="text-gray-500 text-xs sm:text-sm flex-shrink-0 sm:ml-4">{activity.time}</span>
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
            <CheckCircle className="w-16 h-16 text-amber-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Tous les Conflits Résolus! 🎉</h3>
            <p className="text-gray-600">Excellent travail! Il n'y a plus de validations en attente.</p>
          </div>
        </div>
      );
    }

    if (!currentConflict) return null;

    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Résolution de Conflits</h2>
            <p className="text-sm sm:text-base text-gray-600">
              Élément {currentConflictIndex + 1} sur {conflicts.length} • {currentConflict.itemType}
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Left: Visual View */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md">
            <div className="p-3 sm:p-4 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-white">
              <h3 className="text-base sm:text-lg font-bold text-gray-900">{currentConflict.itemName}</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Vue du Plan Archéologique</p>
            </div>
            <div className="relative aspect-[4/3] sm:aspect-[4/3] bg-gray-100 overflow-auto">
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
          <div className="space-y-3 sm:space-y-4">
            {/* Layer Toggles */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-md">
              <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-amber-600" />
                Visibilité des Calques
              </h4>
              <div className="space-y-2 sm:space-y-3">
                {currentConflict.drawings.map((drawing) => (
                  <div
                    key={drawing.userId}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-amber-300 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                      <div
                        className="w-4 h-4 rounded shadow-sm flex-shrink-0"
                        style={{ backgroundColor: drawing.color }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-gray-900 font-medium text-sm sm:text-base truncate">{drawing.userName}</p>
                        <p className="text-gray-600 text-xs">Confiance: {drawing.confidence}%</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleLayerVisibility(drawing.userId)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      {visibleLayers[drawing.userId] ? (
                        <Eye className="w-5 h-5 text-amber-600" />
                      ) : (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-md">
              <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Actions de Résolution</h4>
              <div className="space-y-2 sm:space-y-3">
                <button
                  onClick={handleValidateConsensus}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 active:scale-95 text-white font-bold py-3 sm:py-4 px-3 sm:px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-amber-500/50 text-sm sm:text-base touch-manipulation"
                >
                  <GitMerge className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="truncate">Valider le Consensus</span>
                </button>

                {currentConflict.drawings.map((drawing) => (
                  <button
                    key={drawing.userId}
                    onClick={() => handleSelectUser(drawing.userName)}
                    className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-900 font-medium py-3 sm:py-4 px-3 sm:px-4 rounded-lg transition-all duration-300 border border-gray-300 hover:border-amber-500 shadow-sm text-sm sm:text-base touch-manipulation"
                  >
                    <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="truncate">Sélectionner {drawing.userName}</span>
                  </button>
                ))}

                <button
                  onClick={handleRejectAll}
                  className="w-full flex items-center justify-center space-x-2 bg-red-600/10 hover:bg-red-600/20 active:scale-95 text-red-700 border border-red-600/50 hover:border-red-600 font-medium py-3 sm:py-4 px-3 sm:px-4 rounded-lg transition-all duration-300 text-sm sm:text-base touch-manipulation"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="truncate">Rejeter Toutes</span>
                </button>
              </div>
            </div>

            {/* Metadata */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-md">
              <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Détails du Conflit</h4>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">ID Conflit:</span>
                  <span className="text-gray-900 font-mono">{currentConflict.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Créé le:</span>
                  <span className="text-gray-900">{new Date(currentConflict.createdAt).toLocaleString('fr-FR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contributeurs:</span>
                  <span className="text-gray-900">{currentConflict.drawings.length} utilisateurs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPlansView = () => {
    const getTypeColor = (type: string) => {
      const colors: Record<string, string> = {
        'Pierre': 'bg-red-100 text-red-700 border-red-300',
        'Industrie': 'bg-blue-100 text-blue-700 border-blue-300',
        'Galet': 'bg-green-100 text-green-700 border-green-300',
        'Schiste': 'bg-purple-100 text-purple-700 border-purple-300',
        'Ossement': 'bg-yellow-100 text-yellow-700 border-yellow-300',
        'Calcite': 'bg-gray-100 text-gray-700 border-gray-300',
      };
      return colors[type] || 'bg-gray-100 text-gray-700';
    };

    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Header with toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Plans Complétés</h2>
            <p className="text-sm sm:text-base text-gray-600">
              {mockPlans.length} plans vectorisés • Total: {completedPlans.toLocaleString()}
            </p>
          </div>
          
          {/* View mode toggle */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setPlansViewMode('cards')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
                plansViewMode === 'cards'
                  ? 'bg-amber-100 text-amber-900'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Cards</span>
            </button>
            <button
              onClick={() => setPlansViewMode('list')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
                plansViewMode === 'list'
                  ? 'bg-amber-100 text-amber-900'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Liste</span>
            </button>
          </div>
        </div>

        {/* Cards View */}
        {plansViewMode === 'cards' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {mockPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:border-amber-300"
              >
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src={plan.imageUrl}
                    alt={plan.name}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(plan.type)}`}>
                      {plan.type}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Complété par:</span>
                      <span className="text-gray-900 font-medium">{plan.completedBy}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Vecteurs:</span>
                      <span className="text-gray-900 font-medium">{plan.vectorCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Précision:</span>
                      <span className={`font-bold ${plan.accuracy >= 90 ? 'text-green-600' : 'text-amber-600'}`}>
                        {plan.accuracy}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {new Date(plan.completedAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {plansViewMode === 'list' && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-amber-50 to-white border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Complété par
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Vecteurs
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Précision
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockPlans.map((plan) => (
                    <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{plan.name}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(plan.type)}`}>
                          {plan.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {plan.completedBy}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-900">
                        {plan.vectorCount}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className={`text-sm font-bold ${plan.accuracy >= 90 ? 'text-green-600' : 'text-amber-600'}`}>
                          {plan.accuracy}%
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {new Date(plan.completedAt).toLocaleDateString('fr-FR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderUsersView = () => {
    const getRewardIcon = (type: string) => {
      switch (type) {
        case 'visit': return <Map className="w-5 h-5" />;
        case 'merch': return <Gift className="w-5 h-5" />;
        case 'badge': return <Trophy className="w-5 h-5" />;
        case 'certificate': return <FileText className="w-5 h-5" />;
        default: return <Gift className="w-5 h-5" />;
      }
    };

    return (
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Contributeurs</h2>
          <p className="text-sm sm:text-base text-gray-600">
            {mockUsers.length} contributeurs actifs • Système de récompenses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {mockUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:border-amber-300"
            >
              {/* User Header */}
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-2 border-amber-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900 truncate">{user.name}</h3>
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{user.email}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{user.plansCompleted}</div>
                  <div className="text-xs text-gray-600">Plans</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">{user.accuracy}%</div>
                  <div className="text-xs text-gray-600">Précision</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{user.points}</div>
                  <div className="text-xs text-gray-600">Points</div>
                </div>
              </div>

              {/* Rewards */}
              {user.rewards.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-600" />
                    Récompenses ({user.rewards.length})
                  </h4>
                  <div className="space-y-2">
                    {user.rewards.map((reward) => (
                      <div
                        key={reward.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                          reward.claimed
                            ? 'bg-green-50 border-green-200'
                            : 'bg-amber-50 border-amber-200'
                        }`}
                      >
                        <div className={`flex-shrink-0 ${
                          reward.claimed ? 'text-green-600' : 'text-amber-600'
                        }`}>
                          {getRewardIcon(reward.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-gray-900">{reward.title}</p>
                            {reward.claimed && (
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{reward.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Member since */}
              <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                Membre depuis {new Date(user.joinedAt).toLocaleDateString('fr-FR')}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPlaceholderView = (title: string, icon: React.ReactNode) => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        {icon}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">Cette vue arrive bientôt...</p>
      </div>
    </div>
  );

  // ==================== MAIN RENDER ====================

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {renderSidebar()}
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 z-30 shadow-sm">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6 text-gray-900" />
          </button>
          <div className="flex items-center space-x-2">
            <Map className="w-6 h-6 text-amber-600" />
            <h1 className="text-lg font-bold text-gray-900">ArcheoTrace</h1>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="lg:ml-64 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {currentView === 'dashboard' && renderDashboard()}
          {currentView === 'validation' && renderValidationView()}
          {currentView === 'plans' && renderPlansView()}
          {currentView === 'users' && renderUsersView()}
          {currentView === 'settings' && renderPlaceholderView('Paramètres', <Settings className="w-16 h-16 text-amber-600 mx-auto mb-4" />)}
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 left-4 right-4 sm:bottom-8 sm:right-8 sm:left-auto bg-white border-2 border-amber-500 rounded-lg shadow-2xl p-4 animate-slide-up z-50">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 flex-shrink-0" />
            <p className="text-gray-900 font-medium text-sm sm:text-base">{toastMessage}</p>
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
        ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-sm'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    <div className="flex items-center space-x-3">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    {badge !== undefined && (
      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
        {badge}
      </span>
    )}
  </button>
);

export default App;
