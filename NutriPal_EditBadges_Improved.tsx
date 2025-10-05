import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { User } from '@/entities/User';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ArrowLeft, 
  Award, 
  Trophy,
  Star,
  Crown,
  Gem,
  Medal,
  Zap,
  Target,
  TrendingUp,
  Users,
  Heart,
  Brain,
  CheckCircle,
  Lock,
  Eye,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Calendar,
  Clock,
  Gift,
  Sparkles,
  Loader2,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  Edit3,
  Share2,
  Download,
  Upload,
  RefreshCw,
  Settings,
  User,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Bell,
  Shield,
  ShieldCheck,
  KeyRound,
  Fingerprint,
  Database,
  HardDrive,
  Wifi,
  WifiOff,
  UserCheck,
  UserX,
  LogOut,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon,
  Home,
  Menu,
  MoreHorizontal,
  MoreVertical,
  Grid,
  List,
  Bookmark,
  BookmarkCheck,
  BookmarkPlus,
  BookmarkMinus,
  BookmarkX,
  BookmarkIcon,
  BookmarkCheckIcon,
  BookmarkPlusIcon,
  BookmarkMinusIcon,
  BookmarkXIcon,
  BookmarkIcon as BookmarkIconAlt,
  BookmarkCheckIcon as BookmarkCheckIconAlt,
  BookmarkPlusIcon as BookmarkPlusIconAlt,
  BookmarkMinusIcon as BookmarkMinusIconAlt,
  BookmarkXIcon as BookmarkXIconAlt
} from 'lucide-react';
import { format } from 'date-fns';

// ✅ Type Definitions
interface UserData {
  id: string;
  badges?: Array<{
    id: string;
    name: string;
    description: string;
    tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Special';
    category: 'achievement' | 'streak' | 'social' | 'health' | 'premium' | 'special';
    date_earned: string;
    progress?: number;
    max_progress?: number;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    points: number;
    icon?: string;
    color?: string;
    unlocked?: boolean;
  }>;
  total_badge_points?: number;
  badge_level?: number;
  profile_completed?: boolean;
}

interface BadgeCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  count: number;
}

interface BadgeStats {
  total_badges: number;
  total_points: number;
  badge_level: number;
  categories: BadgeCategory[];
  recent_badges: UserData['badges'];
  next_level_points: number;
  progress_to_next: number;
}

// ✅ Badge tier configurations
const badgeTiers = {
  Bronze: { emoji: '🥉', color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
  Silver: { emoji: '🥈', color: 'text-gray-600', bgColor: 'bg-gray-50', borderColor: 'border-gray-200' },
  Gold: { emoji: '🥇', color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  Platinum: { emoji: '💎', color: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
  Diamond: { emoji: '🏆', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  Special: { emoji: '🎖️', color: 'text-pink-600', bgColor: 'bg-pink-50', borderColor: 'border-pink-200' }
};

// ✅ Badge rarity configurations
const badgeRarities = {
  common: { color: 'text-slate-600', bgColor: 'bg-slate-100', borderColor: 'border-slate-300' },
  rare: { color: 'text-blue-600', bgColor: 'bg-blue-100', borderColor: 'border-blue-300' },
  epic: { color: 'text-purple-600', bgColor: 'bg-purple-100', borderColor: 'border-purple-300' },
  legendary: { color: 'text-orange-600', bgColor: 'bg-orange-100', borderColor: 'border-orange-300' }
};

// ✅ Custom hook for badge management
const useBadgeData = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'tier' | 'points' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();

  const loadUser = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userData = await User.me();
      setUser(userData);
    } catch (error) {
      console.error("Error loading user:", error);
      setError(error instanceof Error ? error.message : "Failed to load user data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const badgeStats: BadgeStats = useMemo(() => {
    if (!user?.badges) {
      return {
        total_badges: 0,
        total_points: 0,
        badge_level: 0,
        categories: [],
        recent_badges: [],
        next_level_points: 100,
        progress_to_next: 0
      };
    }

    const totalBadges = user.badges.length;
    const totalPoints = user.badges.reduce((sum, badge) => sum + (badge.points || 0), 0);
    const badgeLevel = Math.floor(totalPoints / 100) + 1;
    const nextLevelPoints = badgeLevel * 100;
    const progressToNext = ((totalPoints % 100) / 100) * 100;

    const categories: BadgeCategory[] = [
      { id: 'achievement', name: 'Achievements', description: 'Goal-based accomplishments', icon: Target, color: 'text-green-600', count: user.badges.filter(b => b.category === 'achievement').length },
      { id: 'streak', name: 'Streaks', description: 'Consistency rewards', icon: TrendingUp, color: 'text-blue-600', count: user.badges.filter(b => b.category === 'streak').length },
      { id: 'social', name: 'Social', description: 'Community interactions', icon: Users, color: 'text-purple-600', count: user.badges.filter(b => b.category === 'social').length },
      { id: 'health', name: 'Health', description: 'Health milestones', icon: Heart, color: 'text-red-600', count: user.badges.filter(b => b.category === 'health').length },
      { id: 'premium', name: 'Premium', description: 'Premium features', icon: Crown, color: 'text-yellow-600', count: user.badges.filter(b => b.category === 'premium').length },
      { id: 'special', name: 'Special', description: 'Limited edition', icon: Sparkles, color: 'text-pink-600', count: user.badges.filter(b => b.category === 'special').length }
    ];

    const recentBadges = user.badges
      .sort((a, b) => new Date(b.date_earned).getTime() - new Date(a.date_earned).getTime())
      .slice(0, 5);

    return {
      total_badges: totalBadges,
      total_points: totalPoints,
      badge_level: badgeLevel,
      categories,
      recent_badges: recentBadges,
      next_level_points: nextLevelPoints,
      progress_to_next: progressToNext
    };
  }, [user?.badges]);

  const filteredBadges = useMemo(() => {
    if (!user?.badges) return [];

    let filtered = user.badges.filter(badge => {
      const matchesSearch = badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           badge.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || badge.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort badges
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date_earned).getTime() - new Date(b.date_earned).getTime();
          break;
        case 'tier':
          const tierOrder = { Bronze: 1, Silver: 2, Gold: 3, Platinum: 4, Diamond: 5, Special: 6 };
          comparison = tierOrder[a.tier] - tierOrder[b.tier];
          break;
        case 'points':
          comparison = (a.points || 0) - (b.points || 0);
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [user?.badges, searchTerm, selectedCategory, sortBy, sortOrder]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return {
    user,
    isLoading,
    error,
    searchTerm,
    selectedCategory,
    sortBy,
    sortOrder,
    viewMode,
    badgeStats,
    filteredBadges,
    setSearchTerm,
    setSelectedCategory,
    setSortBy,
    setSortOrder,
    setViewMode,
    refetch: loadUser
  };
};

// ✅ Loading component
const BadgeLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-yellow-600" />
      <p className="text-slate-600 text-lg">Loading your badges...</p>
      <p className="text-slate-500 text-sm mt-2">Preparing achievement collection</p>
    </div>
  </div>
);

// ✅ Badge stats component
const BadgeStats = ({ stats }: { stats: BadgeStats }) => (
  <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
    <CardContent className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-800">{stats.total_badges}</div>
          <div className="text-sm text-slate-600">Total Badges</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.total_points}</div>
          <div className="text-sm text-slate-600">Total Points</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.badge_level}</div>
          <div className="text-sm text-slate-600">Badge Level</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{stats.categories.length}</div>
          <div className="text-sm text-slate-600">Categories</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Next Level: {stats.badge_level + 1}</h3>
          <span className="text-sm text-slate-600">
            {stats.total_points}/{stats.next_level_points} points
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-yellow-500 to-amber-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(stats.progress_to_next, 100)}%` }}
          />
        </div>
        <p className="text-sm text-slate-600">
          {stats.next_level_points - stats.total_points} more points needed
        </p>
      </div>
    </CardContent>
  </Card>
);

// ✅ Badge filters component
const BadgeFilters = ({ 
  searchTerm, 
  selectedCategory, 
  sortBy, 
  sortOrder, 
  viewMode,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onSortOrderChange,
  onViewModeChange 
}: {
  searchTerm: string;
  selectedCategory: string;
  sortBy: string;
  sortOrder: string;
  viewMode: string;
  categories: BadgeCategory[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onSortOrderChange: (value: string) => void;
  onViewModeChange: (value: string) => void;
}) => (
  <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0">
    <CardContent className="p-6">
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search badges..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('all')}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Sort and View Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => onSortChange(e.target.value)}
              className="text-sm border rounded px-2 py-1"
            >
              <option value="date">Date</option>
              <option value="tier">Tier</option>
              <option value="points">Points</option>
              <option value="name">Name</option>
            </select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// ✅ Badge card component
const BadgeCard = ({ badge, viewMode }: { badge: UserData['badges'][0]; viewMode: string }) => {
  const tierConfig = badgeTiers[badge.tier];
  const rarityConfig = badgeRarities[badge.rarity];

  if (viewMode === 'list') {
    return (
      <div className={`p-4 rounded-lg border-2 ${tierConfig.bgColor} ${tierConfig.borderColor} shadow-sm`}>
        <div className="flex items-center gap-4">
          <div className="text-4xl">{tierConfig.emoji}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800">{badge.name}</h3>
            <p className="text-sm text-slate-600">{badge.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={`${rarityConfig.bgColor} ${rarityConfig.color} ${rarityConfig.borderColor}`}>
                {badge.rarity}
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-700">
                {badge.points} pts
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">{format(new Date(badge.date_earned), 'MMM yyyy')}</p>
            {badge.progress && badge.max_progress && (
              <div className="w-20 bg-slate-200 rounded-full h-1 mt-2">
                <div 
                  className="bg-green-500 h-1 rounded-full"
                  style={{ width: `${(badge.progress / badge.max_progress) * 100}%` }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`text-center p-4 rounded-lg border-2 ${tierConfig.bgColor} ${tierConfig.borderColor} shadow-sm hover:shadow-md transition-shadow`}>
      <div className="text-4xl mb-2">{tierConfig.emoji}</div>
      <h3 className="font-semibold text-slate-800 text-sm mb-1">{badge.name}</h3>
      <p className="text-xs text-slate-600 mb-2">{badge.description}</p>
      <div className="flex items-center justify-center gap-1 mb-2">
        <Badge className={`${rarityConfig.bgColor} ${rarityConfig.color} ${rarityConfig.borderColor} text-xs`}>
          {badge.rarity}
        </Badge>
        <Badge className="bg-yellow-100 text-yellow-700 text-xs">
          {badge.points} pts
        </Badge>
      </div>
      <p className="text-xs text-slate-500">{format(new Date(badge.date_earned), 'MMM yyyy')}</p>
      {badge.progress && badge.max_progress && (
        <div className="w-full bg-slate-200 rounded-full h-1 mt-2">
          <div 
            className="bg-green-500 h-1 rounded-full"
            style={{ width: `${(badge.progress / badge.max_progress) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default function EditBadges() {
  const navigate = useNavigate();
  const {
    user,
    isLoading,
    error,
    searchTerm,
    selectedCategory,
    sortBy,
    sortOrder,
    viewMode,
    badgeStats,
    filteredBadges,
    setSearchTerm,
    setSelectedCategory,
    setSortBy,
    setSortOrder,
    setViewMode
  } = useBadgeData();

  if (isLoading) {
    return <BadgeLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Error Loading Badges
            </h3>
            <p className="text-slate-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-slate-800">My Badges</CardTitle>
                <p className="text-slate-600">Your collection of achievements</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Badge Stats */}
        <BadgeStats stats={badgeStats} />

        {/* Filters */}
        <BadgeFilters
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          sortBy={sortBy}
          sortOrder={sortOrder}
          viewMode={viewMode}
          categories={badgeStats.categories}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onSortChange={setSortBy}
          onSortOrderChange={setSortOrder}
          onViewModeChange={setViewMode}
        />

        {/* Badges */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardContent className="p-6">
            {filteredBadges.length > 0 ? (
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4' 
                  : 'space-y-4'
              }`}>
                {filteredBadges.map((badge, index) => (
                  <BadgeCard 
                    key={`${badge.id || badge.name}-${index}`} 
                    badge={badge} 
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {searchTerm || selectedCategory !== 'all' ? 'No badges found' : 'No badges yet'}
                </h3>
                <p className="text-slate-600 mb-4">
                  {searchTerm || selectedCategory !== 'all' 
                    ? 'Try adjusting your search or filters'
                    : 'Start exploring the app to unlock your first badge!'
                  }
                </p>
                {searchTerm || selectedCategory !== 'all' ? (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                ) : (
                  <Button onClick={() => navigate(createPageUrl('Dashboard'))}>
                    Explore App
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0">
          <CardContent className="p-6">
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => navigate(createPageUrl("Settings"))}
                className="bg-white hover:bg-slate-50 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
