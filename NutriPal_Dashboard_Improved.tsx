import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { User } from "@/entities/User";
import { FoodAnalysis } from "@/entities/FoodAnalysis";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Heart,
  AlertTriangle,
  Crown,
  CheckCircle,
  Utensils,
  FileText,
  Activity,
  BrainCircuit,
  Calendar,
  Gift,
  TrendingUp,
  Award,
  Clock,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { differenceInCalendarDays, format, isToday } from "date-fns";

import MedicalDisclaimer from "@/components/shared/MedicalDisclaimer";
import RemindersContainer from "@/components/dashboard/RemindersContainer";
import DangerFoodsList from "@/components/dashboard/DangerFoodsList";
import { GridCard, ExpandedCard, CollapsedIcon } from "@/components/shared/ExpandableCardSystem";
import HealthInsights from "@/components/dashboard/HealthInsights";
import RecentActivity from "@/components/dashboard/RecentActivity";

// ✅ Type Definitions
interface UserData {
  id: string;
  subscription_tier: 'basic' | 'pro' | 'premium';
  display_name?: string;
  full_name?: string;
  profile_completed: boolean;
  daily_streak: number;
  last_check_in_date?: string;
  last_login_date?: string;
  badges?: BadgeData[];
}

interface BadgeData {
  name: string;
  date_earned: string;
  tier: string;
}

interface FoodAnalysisData {
  id: string;
  analysis_type: string;
  created_date: string;
  // Add other properties as needed
}

interface DashboardSection {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  gradient: string;
  component?: React.ComponentType<any>;
  props?: Record<string, any>;
  isClickthrough?: boolean;
  path?: string;
  badge?: string;
  priority?: number;
}

// ✅ Constants
const STREAK_BADGES = [
  { streak: 7, name: "Week-long Warrior", tier: "Bronze", icon: "🥉" },
  { streak: 14, name: "Fortnight Challenger", tier: "Silver", icon: "🥈" },
  { streak: 30, name: "Month of Momentum", tier: "Gold", icon: "🥇" },
  { streak: 60, name: "Two-Month Titan", tier: "Platinum", icon: "💎" },
  { streak: 100, name: "Century Sage", tier: "Diamond", icon: "💠" },
] as const;

// ✅ Custom hook for dashboard data
const useDashboardData = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [foodAnalysis, setFoodAnalysis] = useState<FoodAnalysisData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      const [userData, analysisData] = await Promise.all([
        User.me(),
        FoodAnalysis.list("-created_date", 50)
      ]);
      
      setUser(userData);
      setFoodAnalysis(analysisData || []);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      setError(error instanceof Error ? error.message : "Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { user, foodAnalysis, isLoading, error, refetch: loadData };
};

// ✅ Custom hook for streak management
const useStreakManager = (user: UserData | null, setUser: (user: UserData | null) => void) => {
  const { toast } = useToast();

  const awardStreakBadge = useCallback(async (streak: number, currentUser: UserData) => {
    const badgeToAward = STREAK_BADGES.find(b => b.streak === streak);
    if (badgeToAward) {
      const existingBadges = currentUser.badges || [];
      if (!existingBadges.some(b => b.name === badgeToAward.name)) {
        const newBadge: BadgeData = { 
          name: badgeToAward.name, 
          date_earned: new Date().toISOString(), 
          tier: badgeToAward.tier 
        };
        
        try {
          await User.updateMyUserData({ badges: [...existingBadges, newBadge] });
          toast({
            title: "🏆 Streak Badge Unlocked!",
            description: `${badgeToAward.icon} You've earned the "${badgeToAward.name}" badge for ${streak} days!`,
            duration: 5000,
          });
        } catch (error) {
          console.error("Error awarding badge:", error);
        }
      }
    }
  }, [toast]);

  const handleDailyCheckIn = useCallback(async (currentUser: UserData) => {
    if (!currentUser) return;
    
    const today = new Date();
    const lastCheckIn = currentUser.last_check_in_date ? new Date(currentUser.last_check_in_date) : null;
    let newStreak = currentUser.daily_streak || 0;
    
    // Check if already checked in today
    if (lastCheckIn && isToday(lastCheckIn)) {
      return; // Already checked in today
    }
    
    if (!lastCheckIn || differenceInCalendarDays(today, lastCheckIn) > 1) {
      newStreak = 1; // Reset streak
    } else if (differenceInCalendarDays(today, lastCheckIn) === 1) {
      newStreak += 1; // Continue streak
    }
    
    try {
      await User.updateMyUserData({
        daily_streak: newStreak,
        last_check_in_date: today.toISOString().split('T')[0]
      });

      await awardStreakBadge(newStreak, { ...currentUser, daily_streak: newStreak });

      setUser(prev => prev ? {
        ...prev, 
        daily_streak: newStreak, 
        last_check_in_date: today.toISOString().split('T')[0]
      } : null);
    } catch (error) {
      console.error("Error updating daily streak:", error);
      toast({
        title: "Streak Update Failed",
        description: "There was an error updating your daily streak. Please try again.",
        variant: "destructive"
      });
    }
  }, [awardStreakBadge, setUser, toast]);

  return { handleDailyCheckIn };
};

// ✅ Enhanced ProActions component
const ProActions = ({ user }: { user: UserData | null }) => {
  const isBasic = user?.subscription_tier === "basic";
  const isPro = user?.subscription_tier === "pro";
  const isPremium = user?.subscription_tier === "premium";

  return (
    <div className="space-y-4">
      {isBasic && (
        <Card className="themed-accent-gradient text-white shadow-xl bg-gradient-to-br from-emerald-500 to-blue-500">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-yellow-300" />
              <CardTitle className="text-white text-lg">Upgrade to Pro</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-2 text-sm text-emerald-50 mb-4">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> 
                Safe foods list
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> 
                Recommended foods
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> 
                Personalized recipes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> 
                Advanced analytics
              </li>
            </ul>
            <Link to={createPageUrl("Subscription")}>
              <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50 touch-button">
                Upgrade Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {(isPro || isPremium) && (
        <Card className="themed-card border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-green-600" />
              <CardTitle className="text-green-800 text-lg">
                {isPremium ? "Premium Member" : "Pro Member"}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-green-700 text-sm mb-3">
              You have access to all premium features!
            </p>
            {isPremium && (
              <Badge className="bg-green-100 text-green-800">
                Premium Tier
              </Badge>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="themed-card">
        <CardHeader className="pb-3">
          <CardTitle className="themed-text-primary text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          <Link to={createPageUrl("FoodSwiper")}>
            <Button variant="outline" className="w-full justify-start touch-button">
              <Heart className="w-4 h-4 mr-2" /> 
              Rate More Foods
            </Button>
          </Link>
          <Link to={createPageUrl("Recipes")}>
            <Button variant="outline" className="w-full justify-start touch-button">
              <Utensils className="w-4 h-4 mr-2" /> 
              Browse Recipes
            </Button>
          </Link>
          <Link to={createPageUrl("FoodAnalysis")}>
            <Button variant="outline" className="w-full justify-start touch-button">
              <FileText className="w-4 h-4 mr-2" /> 
              Export Food Lists
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

// ✅ Loading component
const DashboardLoading = () => (
  <div className="p-6 themed-background min-h-screen">
    <div className="max-w-7xl mx-auto">
      <div className="animate-pulse space-y-6">
        <div className="h-12 bg-slate-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-slate-200 rounded w-1/4 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 bg-slate-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ✅ Error component
const DashboardError = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="min-h-screen themed-background flex items-center justify-center p-6">
    <Card className="max-w-md w-full themed-card">
      <CardContent className="pt-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold themed-text-primary mb-2">
          Dashboard Error
        </h3>
        <p className="themed-text-secondary mb-4">{error}</p>
        <Button onClick={onRetry} className="touch-button">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default function Dashboard() {
  const { user, foodAnalysis, isLoading, error, refetch } = useDashboardData();
  const { handleDailyCheckIn } = useStreakManager(user, (newUser) => {
    // This would need to be implemented based on your state management
    // For now, we'll handle it in the effect below
  });

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // ✅ Memoized dashboard sections
  const dashboardSections: DashboardSection[] = useMemo(() => [
    {
      id: 'reminders',
      title: 'Daily Reminders',
      description: 'Stay on track with your health goals.',
      icon: Calendar,
      gradient: 'bg-gradient-to-r from-sky-500 to-cyan-500',
      component: RemindersContainer,
      props: { user, foodAnalysis, isLoading },
      priority: 1
    },
    {
      id: 'alerts',
      title: 'Critical Food Alerts',
      description: 'Foods to avoid based on your profile.',
      icon: AlertTriangle,
      gradient: 'bg-gradient-to-r from-red-500 to-orange-500',
      component: DangerFoodsList,
      props: { 
        foods: foodAnalysis.filter(f => f.analysis_type === "avoid"), 
        isLoading 
      },
      priority: 2,
      badge: foodAnalysis.filter(f => f.analysis_type === "avoid").length > 0 
        ? `${foodAnalysis.filter(f => f.analysis_type === "avoid").length}` 
        : undefined
    },
    {
      id: 'pro_actions',
      title: 'Go Pro & Quick Links',
      description: 'Upgrade your plan and access features.',
      icon: Crown,
      gradient: 'bg-gradient-to-r from-amber-500 to-yellow-500',
      component: ProActions,
      props: { user },
      priority: 3
    },
    {
      id: 'insights',
      title: 'Your Health Insights',
      description: 'AI-powered insights from your data.',
      icon: BrainCircuit,
      gradient: 'bg-gradient-to-r from-purple-500 to-indigo-500',
      component: HealthInsights,
      props: { user, foodAnalysis, isLoading },
      priority: 4
    },
    {
      id: 'activity',
      title: 'Recent Activity',
      description: 'A log of your recent food analyses.',
      icon: Activity,
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500',
      component: RecentActivity,
      props: { foodAnalysis },
      priority: 5,
      badge: foodAnalysis.length > 0 ? `${foodAnalysis.length}` : undefined
    },
    {
      id: 'referrals',
      title: 'Referral Program',
      description: 'Invite friends, earn free months!',
      icon: Gift,
      gradient: 'bg-gradient-to-r from-pink-500 to-rose-500',
      isClickthrough: true,
      path: createPageUrl('Profile') + '?section=referrals',
      priority: 6
    }
  ], [user, foodAnalysis, isLoading]);

  // ✅ Handle daily check-in when user loads
  useEffect(() => {
    if (user && !isLoading) {
      handleDailyCheckIn(user);
    }
  }, [user, isLoading, handleDailyCheckIn]);

  // ✅ Scroll to content when section changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection]);

  const handleSectionClick = useCallback((sectionId: string) => {
    const section = dashboardSections.find(s => s.id === sectionId);
    if (section?.isClickthrough) {
      navigate(section.path!);
    } else {
      setActiveSection(sectionId);
    }
  }, [dashboardSections, navigate]);

  const handleCloseExpanded = useCallback(() => {
    setActiveSection(null);
  }, []);

  // ✅ Enhanced greeting with more context
  const getGreeting = useCallback(() => {
    if (!user) return "Welcome!";
    
    const displayName = user.display_name || user.full_name?.split(' ')[0] || 'there';
    const lastLoginDate = user.last_login_date ? new Date(user.last_login_date) : null;
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    const isReturningUser = lastLoginDate && lastLoginDate > twentyFourHoursAgo;
    const streak = user.daily_streak || 0;
    
    let greeting = `Welcome${isReturningUser ? ' back' : ''}, ${displayName}! 👋`;
    
    if (streak > 0) {
      greeting += ` You're on a ${streak}-day streak! 🔥`;
    }
    
    return greeting;
  }, [user]);

  // ✅ Get streak motivation message
  const getStreakMessage = useCallback(() => {
    const streak = user?.daily_streak || 0;
    
    if (streak === 0) return "Start your health journey today!";
    if (streak < 7) return `Keep it up! You're on day ${streak}.`;
    if (streak < 30) return `Amazing! ${streak} days strong! 💪`;
    return `Incredible dedication! ${streak} days! 🏆`;
  }, [user?.daily_streak]);

  // ✅ Loading state
  if (isLoading) {
    return <DashboardLoading />;
  }

  // ✅ Error state
  if (error) {
    return <DashboardError error={error} onRetry={refetch} />;
  }

  // ✅ Profile incomplete state
  if (!user?.profile_completed) {
    return (
      <div className="min-h-screen themed-background flex items-center justify-center p-6">
        <Card className="max-w-md w-full themed-card">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 themed-accent-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl themed-text-primary">Welcome to NutriPal!</CardTitle>
            <p className="themed-text-secondary mt-2">
              Let's set up your health profile to get personalized food recommendations
            </p>
          </CardHeader>
          <CardContent className="pt-4">
            <Link to={createPageUrl("Profile")}>
              <Button className="w-full themed-accent-gradient text-white py-3 touch-button">
                <Heart className="w-5 h-5 mr-2" />
                Complete Your Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const activeSectionData = activeSection ? dashboardSections.find(section => section.id === activeSection) : null;
  const ActiveComponent = activeSectionData?.component;

  return (
    <div ref={contentRef} className="p-0 themed-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* ✅ Enhanced Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold themed-text-primary mb-2">
                {getGreeting()}
              </h1>
              <p className="themed-text-secondary text-lg">
                {getStreakMessage()}
              </p>
            </div>
            
            {/* Streak indicator */}
            {user && user.daily_streak > 0 && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-orange-800">
                  {user.daily_streak} day streak
                </span>
                <Award className="w-5 h-5 text-orange-600" />
              </div>
            )}
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="themed-card text-center">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold themed-text-primary">
                  {foodAnalysis.length}
                </div>
                <div className="text-sm themed-text-secondary">
                  Food Analyses
                </div>
              </CardContent>
            </Card>
            <Card className="themed-card text-center">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold themed-text-primary">
                  {user?.badges?.length || 0}
                </div>
                <div className="text-sm themed-text-secondary">
                  Badges Earned
                </div>
              </CardContent>
            </Card>
            <Card className="themed-card text-center">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold themed-text-primary">
                  {user?.subscription_tier || 'basic'}
                </div>
                <div className="text-sm themed-text-secondary">
                  Plan
                </div>
              </CardContent>
            </Card>
            <Card className="themed-card text-center">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold themed-text-primary">
                  {user?.daily_streak || 0}
                </div>
                <div className="text-sm themed-text-secondary">
                  Day Streak
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {!activeSection ? (
          // ✅ Enhanced Grid view
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {dashboardSections
              .sort((a, b) => (a.priority || 0) - (b.priority || 0))
              .map((section) => (
                <GridCard
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  description={section.description}
                  icon={section.icon}
                  gradient={section.gradient}
                  onClick={handleSectionClick}
                  badge={section.badge}
                />
              ))}
          </div>
        ) : (
          // ✅ Enhanced Expanded view
          <div className="space-y-6 mb-8">
            <ExpandedCard
              id={activeSectionData.id}
              title={activeSectionData.title}
              icon={activeSectionData.icon}
              gradient={activeSectionData.gradient}
              onClose={handleCloseExpanded}
            >
              {ActiveComponent && <ActiveComponent {...activeSectionData.props} />}
            </ExpandedCard>

            {/* Collapsed icons */}
            <div className="flex justify-center gap-4 flex-wrap">
              {dashboardSections
                .filter(section => section.id !== activeSection)
                .map((section) => (
                  <CollapsedIcon
                    key={section.id}
                    id={section.id}
                    title={section.title}
                    icon={section.icon}
                    gradient={section.gradient}
                    isActive={false}
                    onClick={handleSectionClick}
                    badge={section.badge}
                  />
                ))}
            </div>
          </div>
        )}
        
        <MedicalDisclaimer />
      </div>
    </div>
  );
}
