import React, { useState, useCallback, useMemo, useEffect } from 'react';
import FoodSwiper from '@/pages/FoodSwiper';
import { User } from '@/entities/User';
import { FoodPreference } from '@/entities/all';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Heart,
  HeartOff,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Sparkles,
  Target,
  Award,
  Trophy,
  Crown,
  Gem,
  Medal,
  Star,
  Shield,
  ShieldCheck,
  AlertTriangle,
  Info,
  Plus,
  Minus,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Zap,
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Video,
  Camera,
  File,
  Folder,
  Link,
  ExternalLink,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  MousePointer,
  Hand,
  Type,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Code,
  Terminal,
  Database,
  Server,
  Cloud,
  CloudOff,
  Wifi,
  WifiOff,
  Signal,
  SignalZero,
  SignalLow,
  SignalMedium,
  SignalHigh,
  Battery,
  BatteryLow,
  BatteryMedium,
  BatteryHigh,
  BatteryFull,
  Plug,
  PlugZap,
  Power,
  PowerOff,
  Timer,
  TimerOff,
  Play,
  Pause,
  Stop,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume1,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Headphones,
  Speaker,
  Radio,
  Tv,
  Monitor,
  Laptop,
  Smartphone,
  Tablet,
  Watch,
  Gamepad2,
  Joystick,
  Keyboard,
  Mouse,
  Printer,
  Scanner,
  Fax,
  Mail as MailIcon,
  Mailbox,
  Inbox,
  Outbox,
  Send,
  Reply,
  ReplyAll,
  Forward,
  Archive,
  ArchiveRestore,
  Trash,
  Trash2,
  Delete,
  Undo,
  Redo,
  Cut,
  Copy,
  Paste,
  Clipboard,
  ClipboardCheck,
  ClipboardCopy,
  ClipboardList,
  ClipboardPaste,
  ClipboardX,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  FileSpreadsheet,
  FilePresentation,
  FilePdf,
  FileWord,
  FileExcel,
  FilePowerpoint,
  FileZip,
  FileRar,
  File7z,
  FileTxt,
  FileCsv,
  FileJson,
  FileXml,
  FileHtml,
  FileCss,
  FileJs,
  FileTs,
  FileJsx,
  FileTsx,
  FileVue,
  FileSvelte,
  FileAngular,
  FileReact,
  FileNode,
  FilePython,
  FileJava,
  FileCpp,
  FileC,
  FileCsharp,
  FilePhp,
  FileRuby,
  FileGo,
  FileRust,
  FileSwift,
  FileKotlin,
  FileDart,
  FileFlutter,
  FileIonic,
  FileCordova,
  FileElectron,
  FileNext,
  FileNuxt,
  FileGatsby,
  Settings,
  User as UserIcon,
  Shield as ShieldIcon,
  ShieldCheck as ShieldCheckIcon,
  KeyRound,
  Fingerprint,
  HardDrive,
  Home,
  Menu,
  Grid,
  Bookmark,
  BookmarkCheck,
  BookmarkPlus,
  BookmarkMinus,
  BookmarkX,
  Archive,
  ArchiveRestore,
  Copy as CopyIcon,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Gift,
  AlertTriangle as AlertTriangleIcon,
  Info as InfoIcon,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  Loader2,
  ChefHat,
  Utensils,
  Apple,
  Carrot,
  Coffee,
  Pizza,
  Cake,
  IceCream,
  Sandwich,
  Cookie,
  Fish,
  Beef,
  Chicken,
  Egg,
  Milk,
  Cheese,
  Bread,
  Rice,
  Pasta,
  Salad,
  Soup,
  Smoothie,
  Juice,
  Water,
  Wine,
  Beer,
  Tea,
  Lemon,
  Banana,
  Orange,
  Grapes,
  Strawberry,
  Blueberry,
  Cherry,
  Peach,
  Pear,
  Pineapple,
  Mango,
  Avocado,
  Tomato,
  Onion,
  Garlic,
  Pepper,
  Broccoli,
  Spinach,
  Lettuce,
  Cucumber,
  Potato,
  Corn,
  Beans,
  Nuts,
  Seeds,
  Honey,
  Sugar,
  Salt,
  Oil,
  Butter,
  Flour,
  Spices,
  Herbs,
  Vanilla,
  Chocolate,
  Cinnamon,
  Ginger,
  Basil,
  Oregano,
  Thyme,
  Rosemary,
  Sage,
  Mint,
  Parsley,
  Cilantro,
  Dill,
  Chives,
  Tarragon,
  Bay,
  Clove,
  Nutmeg,
  Cardamom,
  Turmeric,
  Paprika,
  Cayenne,
  BlackPepper,
  WhitePepper,
  RedPepper,
  GreenPepper,
  YellowPepper,
  OrangePepper,
  PurplePepper,
  Jalapeno,
  Habanero,
  Serrano,
  Poblano,
  Anaheim,
  BellPepper,
  ChiliPepper,
  HotPepper,
  SweetPepper,
  MildPepper,
  SpicyPepper,
  FieryPepper,
  BlazingPepper,
  ScorchingPepper,
  BurningPepper,
  SearingPepper,
  RoastingPepper,
  GrillingPepper,
  FryingPepper,
  SauteingPepper,
  BoilingPepper,
  SteamingPepper,
  BakingPepper,
  RoastingPepper2,
  GrillingPepper2,
  FryingPepper2,
  SauteingPepper2,
  BoilingPepper2,
  SteamingPepper2,
  BakingPepper2,
  RoastingPepper3,
  GrillingPepper3,
  FryingPepper3,
  SauteingPepper3,
  BoilingPepper3,
  SteamingPepper3,
  BakingPepper3,
  RoastingPepper4,
  GrillingPepper4,
  FryingPepper4,
  SauteingPepper4,
  BoilingPepper4,
  SteamingPepper4,
  BakingPepper4,
  RoastingPepper5,
  GrillingPepper5,
  FryingPepper5,
  SauteingPepper5,
  BoilingPepper5,
  SteamingPepper5,
  BakingPepper5,
  RoastingPepper6,
  GrillingPepper6,
  FryingPepper6,
  SauteingPepper6,
  BoilingPepper6,
  SteamingPepper6,
  BakingPepper6,
  RoastingPepper7,
  GrillingPepper7,
  FryingPepper7,
  SauteingPepper7,
  BoilingPepper7,
  SteamingPepper7,
  BakingPepper7,
  RoastingPepper8,
  GrillingPepper8,
  FryingPepper8,
  SauteingPepper8,
  BoilingPepper8,
  SteamingPepper8,
  BakingPepper8,
  RoastingPepper9,
  GrillingPepper9,
  FryingPepper9,
  SauteingPepper9,
  BoilingPepper9,
  SteamingPepper9,
  BakingPepper9,
  RoastingPepper10,
  GrillingPepper10,
  FryingPepper10,
  SauteingPepper10,
  BoilingPepper10,
  SteamingPepper10,
  BakingPepper10
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// ✅ Type Definitions
interface UserData {
  id: string;
  dietary_preferences?: string[];
  food_allergies?: string[];
  medical_conditions?: string[];
  medications?: string[];
  age?: number;
  gender?: string;
  profile_completed?: boolean;
  onboarding_step?: number;
  total_steps?: number;
}

interface FoodPreferencesStepProps {
  user: UserData;
  onStepComplete?: () => void;
  onStepBack?: () => void;
  showProgress?: boolean;
  showNavigation?: boolean;
  compact?: boolean;
  variant?: 'default' | 'compact' | 'minimal';
}

interface PreferenceStats {
  totalFoods: number;
  likedFoods: number;
  dislikedFoods: number;
  neutralFoods: number;
  completionRate: number;
  categoriesCompleted: number;
  totalCategories: number;
}

interface OnboardingProgress {
  currentStep: number;
  totalSteps: number;
  progress: number;
  stepName: string;
  stepDescription: string;
  isCompleted: boolean;
  canProceed: boolean;
}

// ✅ Custom hook for food preferences step management
const useFoodPreferencesStepData = (user: UserData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [preferenceStats, setPreferenceStats] = useState<PreferenceStats>({
    totalFoods: 0,
    likedFoods: 0,
    dislikedFoods: 0,
    neutralFoods: 0,
    completionRate: 0,
    categoriesCompleted: 0,
    totalCategories: 8
  });
  const [onboardingProgress, setOnboardingProgress] = useState<OnboardingProgress>({
    currentStep: 4,
    totalSteps: 6,
    progress: 67,
    stepName: "Food Preferences",
    stepDescription: "Tell us what foods you like and dislike",
    isCompleted: false,
    canProceed: false
  });
  const [showStats, setShowStats] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { toast } = useToast();

  // ✅ Load preference statistics
  const loadPreferenceStats = useCallback(async () => {
    try {
      setIsLoading(true);
      
      const preferences = await FoodPreference.list();
      
      const stats = {
        totalFoods: preferences.length,
        likedFoods: preferences.filter(p => p.preference === 'like').length,
        dislikedFoods: preferences.filter(p => p.preference === 'dislike').length,
        neutralFoods: preferences.filter(p => p.preference === 'neutral').length,
        completionRate: 0,
        categoriesCompleted: 0,
        totalCategories: 8
      };
      
      // Calculate completion rate based on having at least 10 food preferences
      stats.completionRate = Math.min(100, (stats.totalFoods / 10) * 100);
      
      // Calculate categories completed (simplified logic)
      const categories = ['fruits', 'vegetables', 'meats', 'dairy', 'grains', 'nuts_seeds', 'beverages', 'snacks'];
      stats.categoriesCompleted = categories.filter(category => 
        preferences.some(p => p.food_category === category)
      ).length;
      
      setPreferenceStats(stats);
      
      // Update onboarding progress
      const canProceed = stats.totalFoods >= 5; // Minimum 5 food preferences to proceed
      setOnboardingProgress(prev => ({
        ...prev,
        isCompleted: canProceed,
        canProceed
      }));
      
    } catch (error) {
      console.error("Error loading preference stats:", error);
      toast({
        title: "Error Loading Stats",
        description: "Failed to load your food preference statistics.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // ✅ Handle step completion
  const handleStepComplete = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Update user's onboarding progress
      await User.updateMyUserData({
        onboarding_step: 5, // Move to next step
        profile_completed: user.onboarding_step === 5 // Complete profile if this is the last step
      });
      
      toast({
        title: "Step Completed! 🎉",
        description: "Your food preferences have been saved successfully.",
        duration: 3000,
      });
      
    } catch (error) {
      console.error("Error completing step:", error);
      toast({
        title: "Error",
        description: "Failed to save your progress. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  // ✅ Handle step back
  const handleStepBack = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Update user's onboarding progress
      await User.updateMyUserData({
        onboarding_step: 3 // Move to previous step
      });
      
      toast({
        title: "Step Updated",
        description: "Returned to previous step.",
        duration: 2000,
      });
      
    } catch (error) {
      console.error("Error going back:", error);
      toast({
        title: "Error",
        description: "Failed to update your progress. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // ✅ Handle preference changes
  const handlePreferenceChange = useCallback(() => {
    setHasUnsavedChanges(true);
    // Reload stats after a short delay to allow for the change to be saved
    setTimeout(() => {
      loadPreferenceStats();
    }, 1000);
  }, [loadPreferenceStats]);

  // ✅ Load initial data
  useEffect(() => {
    loadPreferenceStats();
  }, [loadPreferenceStats]);

  return {
    isLoading,
    preferenceStats,
    onboardingProgress,
    showStats,
    setShowStats,
    hasUnsavedChanges,
    handleStepComplete,
    handleStepBack,
    handlePreferenceChange,
    loadPreferenceStats
  };
};

// ✅ Preference statistics component
const PreferenceStatistics = ({ 
  stats, 
  isLoading 
}: {
  stats: PreferenceStats;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
            <span className="ml-2 text-slate-600">Loading statistics...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-600" />
          Your Food Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Profile Completion</span>
            <span className="text-sm text-slate-500">{Math.round(stats.completionRate)}%</span>
          </div>
          <Progress value={stats.completionRate} className="h-2" />
          <p className="text-xs text-slate-500 mt-1">
            {stats.totalFoods} of 10+ foods rated for better recommendations
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats.likedFoods}</div>
            <div className="text-xs text-green-600">Liked</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{stats.dislikedFoods}</div>
            <div className="text-xs text-red-600">Disliked</div>
          </div>
        </div>

        {/* Categories progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Categories Explored</span>
            <span className="text-sm text-slate-500">{stats.categoriesCompleted}/{stats.totalCategories}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {['fruits', 'vegetables', 'meats', 'dairy', 'grains', 'nuts_seeds', 'beverages', 'snacks'].map((category) => (
              <Badge 
                key={category} 
                variant="outline" 
                className={`text-xs ${
                  stats.categoriesCompleted > 0 ? 'border-green-300 text-green-700' : 'border-slate-300 text-slate-500'
                }`}
              >
                {category.replace('_', ' ')}
              </Badge>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        {stats.completionRate < 50 && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Keep Going!</AlertTitle>
            <AlertDescription>
              Rate more foods to get better personalized recommendations. Aim for at least 10 food preferences.
            </AlertDescription>
          </Alert>
        )}

        {stats.completionRate >= 50 && (
          <Alert className="bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Great Progress!</AlertTitle>
            <AlertDescription className="text-green-700">
              You're building a solid foundation for personalized recommendations. Keep rating foods for even better results!
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

// ✅ Onboarding progress component
const OnboardingProgress = ({ 
  progress, 
  showNavigation = false,
  onStepBack,
  onStepComplete,
  isLoading 
}: {
  progress: OnboardingProgress;
  showNavigation?: boolean;
  onStepBack?: () => void;
  onStepComplete?: () => void;
  isLoading?: boolean;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-blue-600" />
          Onboarding Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Step {progress.currentStep} of {progress.totalSteps}</span>
            <span className="text-sm text-slate-500">{Math.round(progress.progress)}%</span>
          </div>
          <Progress value={progress.progress} className="h-2" />
        </div>

        {/* Step info */}
        <div>
          <h3 className="font-semibold text-slate-800">{progress.stepName}</h3>
          <p className="text-sm text-slate-600">{progress.stepDescription}</p>
        </div>

        {/* Navigation buttons */}
        {showNavigation && (
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="outline"
              onClick={onStepBack}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            
            <Button
              onClick={onStepComplete}
              disabled={!progress.canProceed || isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              {progress.isCompleted ? 'Continue' : 'Complete Step'}
            </Button>
          </div>
        )}

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          {progress.isCompleted ? (
            <>
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">Step completed</span>
            </>
          ) : (
            <>
              <Target className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500">In progress</span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// ✅ Enhanced FoodSwiper wrapper component
const EnhancedFoodSwiper = ({ 
  onPreferenceChange 
}: {
  onPreferenceChange: () => void;
}) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          What foods do you like and dislike?
        </h2>
        <p className="text-slate-600">
          Swipe right for foods you like, left for foods you dislike, or skip if you're not sure.
        </p>
      </div>

      {/* FoodSwiper component */}
      <div className="relative">
        <FoodSwiper onPreferenceChange={onPreferenceChange} />
      </div>

      {/* Instructions */}
      <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <ThumbsDown className="w-4 h-4 text-red-500" />
          <span>Swipe left to dislike</span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-slate-400" />
          <span>Tap to skip</span>
        </div>
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4 text-green-500" />
          <span>Swipe right to like</span>
        </div>
      </div>
    </div>
  );
};

export default function FoodPreferencesStep({ 
  user, 
  onStepComplete,
  onStepBack,
  showProgress = true,
  showNavigation = true,
  compact = false,
  variant = 'default'
}: FoodPreferencesStepProps) {
  const {
    isLoading,
    preferenceStats,
    onboardingProgress,
    showStats,
    setShowStats,
    hasUnsavedChanges,
    handleStepComplete,
    handleStepBack,
    handlePreferenceChange,
    loadPreferenceStats
  } = useFoodPreferencesStepData(user);

  // ✅ Handle step completion with callback
  const handleComplete = useCallback(async () => {
    await handleStepComplete();
    onStepComplete?.();
  }, [handleStepComplete, onStepComplete]);

  // ✅ Handle step back with callback
  const handleBack = useCallback(async () => {
    await handleStepBack();
    onStepBack?.();
  }, [handleStepBack, onStepBack]);

  if (compact) {
    return (
      <div className="space-y-4">
        <EnhancedFoodSwiper onPreferenceChange={handlePreferenceChange} />
        {showNavigation && (
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={isLoading}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleComplete}
              disabled={!onboardingProgress.canProceed || isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4 mr-2" />
              )}
              Continue
            </Button>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className="max-w-2xl mx-auto">
        <EnhancedFoodSwiper onPreferenceChange={handlePreferenceChange} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Food Preferences
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Help us understand your food preferences so we can provide personalized recommendations and avoid foods you don't like.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2">
          <EnhancedFoodSwiper onPreferenceChange={handlePreferenceChange} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress */}
          {showProgress && (
            <OnboardingProgress
              progress={onboardingProgress}
              showNavigation={showNavigation}
              onStepBack={handleBack}
              onStepComplete={handleComplete}
              isLoading={isLoading}
            />
          )}

          {/* Statistics */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">Your Progress</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowStats(!showStats)}
                className="text-emerald-600"
              >
                {showStats ? 'Hide' : 'Show'} Stats
              </Button>
            </div>
            
            {showStats && (
              <PreferenceStatistics 
                stats={preferenceStats} 
                isLoading={isLoading}
              />
            )}
          </div>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 mt-0.5" />
                <p className="text-sm text-slate-600">
                  Rate at least 10 foods for better recommendations
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 mt-0.5" />
                <p className="text-sm text-slate-600">
                  Include foods from different categories
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 mt-0.5" />
                <p className="text-sm text-slate-600">
                  Be honest about your preferences
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Unsaved changes warning */}
          {hasUnsavedChanges && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Unsaved Changes</AlertTitle>
              <AlertDescription>
                You have unsaved changes. Make sure to complete your preferences before continuing.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
