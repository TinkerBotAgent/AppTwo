import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { User } from '@/entities/User';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ArrowLeft, 
  Share2,
  Copy,
  Check,
  Gift,
  Users,
  Star,
  Award,
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  Mail,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Whatsapp,
  Telegram,
  Link,
  QrCode,
  Download,
  Upload,
  RefreshCw,
  Eye,
  EyeOff,
  Settings,
  Bell,
  Shield,
  ShieldCheck,
  KeyRound,
  Fingerprint,
  Database,
  HardDrive,
  Wifi,
  WifiOff,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  UserCheck,
  UserX,
  LogOut,
  AlertTriangle,
  CheckCircle,
  Info,
  Loader2,
  Plus,
  X,
  Edit3,
  Heart,
  Brain,
  Zap
} from 'lucide-react';

// ✅ Type Definitions
interface UserData {
  id: string;
  referral_code?: string;
  referral_count?: number;
  referral_rewards?: Array<{
    tier: string;
    reward: string;
    earned_date: string;
    status: 'pending' | 'active' | 'expired';
  }>;
  referral_history?: Array<{
    email: string;
    name: string;
    signup_date: string;
    status: 'pending' | 'active' | 'cancelled';
    reward_earned: boolean;
  }>;
  profile_completed?: boolean;
}

interface ReferralTier {
  count: number;
  reward: string;
  months: number;
  badge?: {
    name: string;
    tier: string;
  };
  description?: string;
  benefits?: string[];
}

interface ReferralStats {
  total_referrals: number;
  active_referrals: number;
  pending_referrals: number;
  total_rewards_earned: number;
  next_tier: ReferralTier | null;
  progress_to_next: number;
}

// ✅ Referral tiers configuration
const referralTiers: ReferralTier[] = [
  { 
    count: 5, 
    reward: "1 month free", 
    months: 1,
    description: "Get your first month free when you refer 5 friends",
    benefits: ["1 month free subscription", "Early access to new features"]
  },
  { 
    count: 10, 
    reward: "3 months free", 
    months: 3,
    description: "Earn 3 months free when you refer 10 friends",
    benefits: ["3 months free subscription", "Priority support", "Referral Badge"]
  },
  { 
    count: 20, 
    reward: "6 months free", 
    months: 6,
    description: "Get 6 months free when you refer 20 friends",
    benefits: ["6 months free subscription", "Priority support", "Gold Referral Badge", "Exclusive content"]
  },
  { 
    count: 50, 
    reward: "12 months free + Social Butterfly Badge", 
    months: 12, 
    badge: { name: "Social Butterfly", tier: "Diamond" },
    description: "Become a referral champion with 12 months free",
    benefits: ["12 months free subscription", "VIP support", "Diamond Social Butterfly Badge", "Exclusive content", "Early beta access"]
  },
  { 
    count: 100, 
    reward: "Lifetime free + Ambassador Status", 
    months: 999, 
    badge: { name: "Ambassador", tier: "Platinum" },
    description: "Achieve ambassador status with lifetime free access",
    benefits: ["Lifetime free subscription", "VIP support", "Platinum Ambassador Badge", "Exclusive content", "Early beta access", "Revenue sharing"]
  }
];

// ✅ Custom hook for referral management
const useReferralData = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [shareMethod, setShareMethod] = useState<string | null>(null);
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

  const generateReferralCode = useCallback(async () => {
    try {
      // Generate a unique referral code
      const code = `${user?.id?.slice(0, 8) || 'USER'}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      await User.updateMyUserData({ referral_code: code });
      setUser(prev => prev ? { ...prev, referral_code: code } : null);
      toast({
        title: "Referral Code Generated! 🎉",
        description: "Your unique referral code has been created.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error generating referral code:", error);
      toast({
        title: "Generation Failed",
        description: "Could not generate referral code. Please try again.",
        variant: "destructive"
      });
    }
  }, [user?.id, toast]);

  const copyReferralCode = useCallback(async () => {
    if (user?.referral_code) {
      try {
        await navigator.clipboard.writeText(user.referral_code);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
        toast({
          title: "Copied! 📋",
          description: "Referral code copied to clipboard.",
          duration: 2000,
        });
      } catch (error) {
        console.error("Error copying referral code:", error);
        toast({
          title: "Copy Failed",
          description: "Could not copy referral code. Please try again.",
          variant: "destructive"
        });
      }
    }
  }, [user?.referral_code, toast]);

  const shareReferral = useCallback((method: string) => {
    if (!user?.referral_code) return;

    const referralUrl = `${window.location.origin}/signup?ref=${user.referral_code}`;
    const shareText = `Join me on NutriPal! Use my referral code ${user.referral_code} to get started. ${referralUrl}`;

    switch (method) {
      case 'email':
        window.open(`mailto:?subject=Join me on NutriPal&body=${encodeURIComponent(shareText)}`);
        break;
      case 'sms':
        window.open(`sms:?body=${encodeURIComponent(shareText)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralUrl)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralUrl)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`);
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(referralUrl)}&text=${encodeURIComponent(shareText)}`);
        break;
    }

    setShareMethod(method);
    setTimeout(() => setShareMethod(null), 3000);
  }, [user?.referral_code]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return {
    user,
    isLoading,
    error,
    copiedCode,
    shareMethod,
    generateReferralCode,
    copyReferralCode,
    shareReferral,
    refetch: loadUser
  };
};

// ✅ Loading component
const ReferralLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-purple-600" />
      <p className="text-slate-600 text-lg">Loading your referral program...</p>
      <p className="text-slate-500 text-sm mt-2">Preparing referral information</p>
    </div>
  </div>
);

// ✅ Referral stats component
const ReferralStats = ({ user, tiers }: { user: UserData | null; tiers: ReferralTier[] }) => {
  if (!user) return null;

  const stats: ReferralStats = useMemo(() => {
    const totalReferrals = user.referral_count || 0;
    const activeReferrals = user.referral_history?.filter(r => r.status === 'active').length || 0;
    const pendingReferrals = user.referral_history?.filter(r => r.status === 'pending').length || 0;
    const totalRewardsEarned = user.referral_rewards?.length || 0;
    
    const nextTier = tiers.find(tier => tier.count > totalReferrals) || null;
    const progressToNext = nextTier ? (totalReferrals / nextTier.count) * 100 : 100;

    return {
      total_referrals: totalReferrals,
      active_referrals: activeReferrals,
      pending_referrals: pendingReferrals,
      total_rewards_earned: totalRewardsEarned,
      next_tier: nextTier,
      progress_to_next: progressToNext
    };
  }, [user, tiers]);

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-800">{stats.total_referrals}</div>
            <div className="text-sm text-slate-600">Total Referrals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.active_referrals}</div>
            <div className="text-sm text-slate-600">Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending_referrals}</div>
            <div className="text-sm text-slate-600">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.total_rewards_earned}</div>
            <div className="text-sm text-slate-600">Rewards Earned</div>
          </div>
        </div>

        {stats.next_tier && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">Next Tier: {stats.next_tier.reward}</h3>
              <span className="text-sm text-slate-600">
                {stats.total_referrals}/{stats.next_tier.count} referrals
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(stats.progress_to_next, 100)}%` }}
              />
            </div>
            <p className="text-sm text-slate-600">
              {stats.next_tier.count - stats.total_referrals} more referrals needed
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// ✅ Referral tiers component
const ReferralTiers = ({ tiers, currentCount }: { tiers: ReferralTier[]; currentCount: number }) => (
  <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
    <CardHeader>
      <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
        <Trophy className="w-5 h-5" />
        Referral Tiers
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="space-y-4">
        {tiers.map((tier, index) => {
          const isAchieved = currentCount >= tier.count;
          const isNext = currentCount < tier.count && (index === 0 || currentCount >= tiers[index - 1].count);
          
          return (
            <div 
              key={index} 
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                isAchieved 
                  ? 'bg-green-50 border-green-200' 
                  : isNext 
                    ? 'bg-yellow-50 border-yellow-200' 
                    : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {isAchieved ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : isNext ? (
                    <Target className="w-6 h-6 text-yellow-600" />
                  ) : (
                    <Star className="w-6 h-6 text-slate-400" />
                  )}
                  <div>
                    <h3 className="font-semibold text-slate-800">{tier.reward}</h3>
                    <p className="text-sm text-slate-600">{tier.count} referrals</p>
                  </div>
                </div>
                {isAchieved && (
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Achieved
                  </Badge>
                )}
                {isNext && (
                  <Badge className="bg-yellow-100 text-yellow-700">
                    <Target className="w-3 h-3 mr-1" />
                    Next
                  </Badge>
                )}
              </div>
              
              {tier.description && (
                <p className="text-sm text-slate-600 mb-3">{tier.description}</p>
              )}
              
              {tier.benefits && (
                <div className="space-y-1">
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {tier.badge && (
                <div className="mt-3">
                  <Badge className={`${
                    tier.badge.tier === 'Diamond' ? 'bg-purple-100 text-purple-700' :
                    tier.badge.tier === 'Platinum' ? 'bg-gray-100 text-gray-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    <Award className="w-3 h-3 mr-1" />
                    {tier.badge.name} ({tier.badge.tier})
                  </Badge>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </CardContent>
  </Card>
);

// ✅ Referral code component
const ReferralCode = ({ user, copiedCode, onGenerate, onCopy }: { 
  user: UserData | null; 
  copiedCode: boolean; 
  onGenerate: () => void;
  onCopy: () => void;
}) => {
  if (!user) return null;

  return (
    <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
      <CardHeader>
        <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
          <Link className="w-5 h-5" />
          Your Referral Code
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {user.referral_code ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Input
                value={user.referral_code}
                readOnly
                className="font-mono text-lg"
              />
              <Button
                onClick={onCopy}
                className={`${copiedCode ? 'bg-green-600 hover:bg-green-700' : ''}`}
              >
                {copiedCode ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            
            <div className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-2">Share Your Link:</h4>
              <p className="text-sm text-slate-600 font-mono break-all">
                {window.location.origin}/signup?ref={user.referral_code}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-slate-600">You don't have a referral code yet.</p>
            <Button onClick={onGenerate} className="bg-purple-600 hover:bg-purple-700">
              <Gift className="w-4 h-4 mr-2" />
              Generate Referral Code
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// ✅ Share options component
const ShareOptions = ({ user, shareMethod, onShare }: { 
  user: UserData | null; 
  shareMethod: string | null;
  onShare: (method: string) => void;
}) => {
  if (!user?.referral_code) return null;

  const shareMethods = [
    { id: 'email', name: 'Email', icon: Mail, color: 'bg-blue-500' },
    { id: 'sms', name: 'SMS', icon: MessageSquare, color: 'bg-green-500' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'bg-blue-400' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' },
    { id: 'whatsapp', name: 'WhatsApp', icon: Whatsapp, color: 'bg-green-600' },
    { id: 'telegram', name: 'Telegram', icon: Telegram, color: 'bg-blue-500' }
  ];

  return (
    <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
      <CardHeader>
        <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          Share Your Referral
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {shareMethods.map((method) => (
            <Button
              key={method.id}
              variant="outline"
              onClick={() => onShare(method.id)}
              className={`h-16 flex flex-col items-center gap-2 ${
                shareMethod === method.id ? 'bg-green-50 border-green-200' : ''
              }`}
            >
              <method.icon className="w-5 h-5" />
              <span className="text-xs">{method.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// ✅ Referral history component
const ReferralHistory = ({ user }: { user: UserData | null }) => {
  if (!user?.referral_history || user.referral_history.length === 0) return null;

  return (
    <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
      <CardHeader>
        <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Referral History
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {user.referral_history.map((referral, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {referral.name?.charAt(0) || referral.email?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-slate-800">{referral.name || 'Unknown'}</p>
                  <p className="text-sm text-slate-600">{referral.email}</p>
                  <p className="text-xs text-slate-500">
                    Signed up: {new Date(referral.signup_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={`${
                  referral.status === 'active' ? 'bg-green-100 text-green-700' :
                  referral.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {referral.status}
                </Badge>
                {referral.reward_earned && (
                  <Badge className="bg-purple-100 text-purple-700 ml-2">
                    <Gift className="w-3 h-3 mr-1" />
                    Reward
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function EditReferrals() {
  const navigate = useNavigate();
  const {
    user,
    isLoading,
    error,
    copiedCode,
    shareMethod,
    generateReferralCode,
    copyReferralCode,
    shareReferral
  } = useReferralData();

  if (isLoading) {
    return <ReferralLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Error Loading Referrals
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
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-slate-800">Referral Program</CardTitle>
                <p className="text-slate-600">Share with friends and earn rewards</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Referral Stats */}
        <ReferralStats user={user} tiers={referralTiers} />

        {/* Referral Code */}
        <ReferralCode 
          user={user} 
          copiedCode={copiedCode}
          onGenerate={generateReferralCode}
          onCopy={copyReferralCode}
        />

        {/* Share Options */}
        <ShareOptions 
          user={user} 
          shareMethod={shareMethod}
          onShare={shareReferral}
        />

        {/* Referral Tiers */}
        <ReferralTiers 
          tiers={referralTiers} 
          currentCount={user?.referral_count || 0}
        />

        {/* Referral History */}
        <ReferralHistory user={user} />

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
