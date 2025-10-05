import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { User } from '@/entities/User';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Heart, 
  AlertCircle,
  Shield,
  Star,
  Check,
  X,
  Info,
  RefreshCw,
  Settings,
  Zap,
  Sparkles,
  Crown,
  Gem,
  Medal,
  Target,
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
  User as UserIcon,
  Shield as ShieldIcon,
  ShieldCheck,
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
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Gift,
  AlertCircle as AlertCircleIcon,
  Info as InfoIcon,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  Loader2,
  Bell,
  BellOff,
  Edit3,
  Trash2 as Trash2Icon,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Zap as ZapIcon,
  Sparkles as SparklesIcon,
  Crown as CrownIcon,
  Gem as GemIcon,
  Medal as MedalIcon,
  Target as TargetIcon,
  Calendar as CalendarIcon,
  MapPin as MapPinIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  MessageSquare as MessageSquareIcon,
  Video as VideoIcon,
  Camera as CameraIcon,
  File as FileIcon,
  Folder as FolderIcon,
  Link as LinkIcon,
  ExternalLink as ExternalLinkIcon,
  Maximize as MaximizeIcon,
  Minimize as MinimizeIcon,
  RotateCcw as RotateCcwIcon,
  RotateCw as RotateCwIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Move as MoveIcon,
  MousePointer as MousePointerIcon,
  Hand as HandIcon,
  Type as TypeIcon,
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  AlignLeft as AlignLeftIcon,
  AlignCenter as AlignCenterIcon,
  AlignRight as AlignRightIcon,
  AlignJustify as AlignJustifyIcon,
  List as ListIcon,
  ListOrdered as ListOrderedIcon,
  Quote as QuoteIcon,
  Code as CodeIcon,
  Terminal as TerminalIcon,
  Database as DatabaseIcon,
  Server as ServerIcon,
  Cloud as CloudIcon,
  CloudOff as CloudOffIcon,
  Wifi as WifiIcon,
  WifiOff as WifiOffIcon,
  Signal as SignalIcon,
  SignalZero as SignalZeroIcon,
  SignalLow as SignalLowIcon,
  SignalMedium as SignalMediumIcon,
  SignalHigh as SignalHighIcon,
  Battery as BatteryIcon,
  BatteryLow as BatteryLowIcon,
  BatteryMedium as BatteryMediumIcon,
  BatteryHigh as BatteryHighIcon,
  BatteryFull as BatteryFullIcon,
  Plug as PlugIcon,
  PlugZap as PlugZapIcon,
  Power as PowerIcon,
  PowerOff as PowerOffIcon,
  Timer as TimerIcon,
  TimerOff as TimerOffIcon,
  Play as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  SkipBack as SkipBackIcon,
  SkipForward as SkipForwardIcon,
  Repeat as RepeatIcon,
  Shuffle as ShuffleIcon,
  Volume1 as Volume1Icon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Headphones as HeadphonesIcon,
  Speaker as SpeakerIcon,
  Radio as RadioIcon,
  Tv as TvIcon,
  Monitor as MonitorIcon,
  Laptop as LaptopIcon,
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
  Watch as WatchIcon,
  Gamepad2 as Gamepad2Icon,
  Joystick as JoystickIcon,
  Keyboard as KeyboardIcon,
  Mouse as MouseIcon,
  Printer as PrinterIcon,
  Scanner as ScannerIcon,
  Fax as FaxIcon,
  Mailbox as MailboxIcon,
  Inbox as InboxIcon,
  Outbox as OutboxIcon,
  Send as SendIcon,
  Reply as ReplyIcon,
  ReplyAll as ReplyAllIcon,
  Forward as ForwardIcon,
  Archive as ArchiveIcon,
  ArchiveRestore as ArchiveRestoreIcon,
  Trash as TrashIcon,
  Trash2 as Trash2IconAlt,
  Delete as DeleteIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
  Cut as CutIcon,
  Copy as CopyIcon,
  Paste as PasteIcon,
  Clipboard as ClipboardIcon,
  ClipboardCheck as ClipboardCheckIcon,
  ClipboardCopy as ClipboardCopyIcon,
  ClipboardList as ClipboardListIcon,
  ClipboardPaste as ClipboardPasteIcon,
  ClipboardX as ClipboardXIcon,
  FileText as FileTextIcon,
  FileImage as FileImageIcon,
  FileVideo as FileVideoIcon,
  FileAudio as FileAudioIcon,
  FileArchive as FileArchiveIcon,
  FileCode as FileCodeIcon,
  FileSpreadsheet as FileSpreadsheetIcon,
  FilePresentation as FilePresentationIcon,
  FilePdf as FilePdfIcon,
  FileWord as FileWordIcon,
  FileExcel as FileExcelIcon,
  FilePowerpoint as FilePowerpointIcon,
  FileZip as FileZipIcon,
  FileRar as FileRarIcon,
  File7z as File7zIcon,
  FileTxt as FileTxtIcon,
  FileCsv as FileCsvIcon,
  FileJson as FileJsonIcon,
  FileXml as FileXmlIcon,
  FileHtml as FileHtmlIcon,
  FileCss as FileCssIcon,
  FileJs as FileJsIcon,
  FileTs as FileTsIcon,
  FileJsx as FileJsxIcon,
  FileTsx as FileTsxIcon,
  FileVue as FileVueIcon,
  FileSvelte as FileSvelteIcon,
  FileAngular as FileAngularIcon,
  FileReact as FileReactIcon,
  FileNode as FileNodeIcon,
  FilePython as FilePythonIcon,
  FileJava as FileJavaIcon,
  FileCpp as FileCppIcon,
  FileC as FileCIcon,
  FileCsharp as FileCsharpIcon,
  FilePhp as FilePhpIcon,
  FileRuby as FileRubyIcon,
  FileGo as FileGoIcon,
  FileRust as FileRustIcon,
  FileSwift as FileSwiftIcon,
  FileKotlin as FileKotlinIcon,
  FileDart as FileDartIcon,
  FileFlutter as FileFlutterIcon,
  FileIonic as FileIonicIcon,
  FileCordova as FileCordovaIcon,
  FileElectron as FileElectronIcon,
  FileNext as FileNextIcon,
  FileNuxt as FileNuxtIcon,
  FileGatsby as FileGatsbyIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useToast } from '@/components/ui/use-toast';

// ✅ Type Definitions
interface UserData {
  id: string;
  medical_conditions?: string[];
  medications?: string[];
  food_allergies?: string[];
  subscription_tier?: 'basic' | 'pro' | 'family';
  profile_completed?: boolean;
  age?: number;
  gender?: string;
}

interface FoodAnalysis {
  food_name: string;
  analysis_type: 'avoid' | 'safe' | 'recommended';
  reason: string;
  severity?: 'low' | 'medium' | 'high';
  related_conditions?: string[];
  related_medications?: string[];
  apple_rating?: number;
  created_date: string;
  medical_source?: string;
  interaction_mechanism?: string;
}

interface HealthInsightsProps {
  user: UserData;
  foodAnalysis: FoodAnalysis[];
  isLoading: boolean;
  showStats?: boolean;
  showTrends?: boolean;
  showRecommendations?: boolean;
  compact?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
  onInsightUpdate?: (insightData: any) => void;
  onGenerateAnalysis?: () => void;
}

interface HealthInsight {
  type: 'risk' | 'recommendation' | 'trend' | 'tip';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  category: string;
  food_name?: string;
  apple_rating?: number;
  related_conditions?: string[];
  actionable?: boolean;
  source?: string;
}

interface InsightStats {
  totalRisks: number;
  highRisks: number;
  mediumRisks: number;
  lowRisks: number;
  totalRecommendations: number;
  averageRating: number;
  topConditions: Array<{ condition: string; count: number }>;
  riskTrend: 'increasing' | 'decreasing' | 'stable';
}

// ✅ Custom hook for health insights management
const useHealthInsightsData = (user: UserData, foodAnalysis: FoodAnalysis[]) => {
  const [insights, setInsights] = useState<HealthInsight[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState<InsightStats>({
    totalRisks: 0,
    highRisks: 0,
    mediumRisks: 0,
    lowRisks: 0,
    totalRecommendations: 0,
    averageRating: 0,
    topConditions: [],
    riskTrend: 'stable'
  });
  const { toast } = useToast();

  // ✅ Generate health insights
  const generateInsights = useCallback((): HealthInsight[] => {
    const insights: HealthInsight[] = [];
    
    // Top risks
    const highRisks = foodAnalysis
      .filter(f => f.analysis_type === "avoid" && f.severity === "high")
      .slice(0, 3);
    
    highRisks.forEach(risk => {
      insights.push({
        type: 'risk',
        title: `Avoid ${risk.food_name}`,
        description: risk.reason,
        severity: 'high',
        category: 'Food Safety',
        food_name: risk.food_name,
        related_conditions: risk.related_conditions,
        actionable: true,
        source: risk.medical_source
      });
    });
    
    // Recommendations
    const recommendations = foodAnalysis
      .filter(f => f.analysis_type === "recommended")
      .slice(0, 3);
    
    recommendations.forEach(rec => {
      insights.push({
        type: 'recommendation',
        title: `Recommended: ${rec.food_name}`,
        description: rec.reason,
        severity: 'low',
        category: 'Nutrition',
        food_name: rec.food_name,
        apple_rating: rec.apple_rating,
        related_conditions: rec.related_conditions,
        actionable: true,
        source: rec.medical_source
      });
    });
    
    // Health tips based on user profile
    if (user.medical_conditions?.length > 0) {
      const condition = user.medical_conditions[0];
      insights.push({
        type: 'tip',
        title: `Managing ${condition}`,
        description: `Consider foods rich in anti-inflammatory properties to help manage ${condition}.`,
        severity: 'medium',
        category: 'Health Management',
        actionable: true
      });
    }
    
    // Medication interactions
    if (user.medications?.length > 0) {
      const medication = user.medications[0];
      insights.push({
        type: 'tip',
        title: `Medication Interaction Alert`,
        description: `Be aware of potential interactions between ${medication} and certain foods.`,
        severity: 'high',
        category: 'Medication Safety',
        actionable: true
      });
    }
    
    return insights;
  }, [foodAnalysis, user]);

  // ✅ Calculate statistics
  const calculateStats = useCallback((): InsightStats => {
    const risks = foodAnalysis.filter(f => f.analysis_type === "avoid");
    const recommendations = foodAnalysis.filter(f => f.analysis_type === "recommended");
    
    const highRisks = risks.filter(r => r.severity === "high").length;
    const mediumRisks = risks.filter(r => r.severity === "medium").length;
    const lowRisks = risks.filter(r => r.severity === "low").length;
    
    const averageRating = recommendations
      .filter(r => r.apple_rating)
      .reduce((sum, r) => sum + (r.apple_rating || 0), 0) / 
      recommendations.filter(r => r.apple_rating).length || 0;
    
    // Count conditions
    const conditionCounts: Record<string, number> = {};
    foodAnalysis.forEach(analysis => {
      analysis.related_conditions?.forEach(condition => {
        conditionCounts[condition] = (conditionCounts[condition] || 0) + 1;
      });
    });
    
    const topConditions = Object.entries(conditionCounts)
      .map(([condition, count]) => ({ condition, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
    
    return {
      totalRisks: risks.length,
      highRisks,
      mediumRisks,
      lowRisks,
      totalRecommendations: recommendations.length,
      averageRating,
      topConditions,
      riskTrend: 'stable' // Would be calculated from historical data
    };
  }, [foodAnalysis]);

  // ✅ Refresh insights
  const refreshInsights = useCallback(async () => {
    try {
      setIsRefreshing(true);
      // In a real app, this would regenerate insights
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newInsights = generateInsights();
      setInsights(newInsights);
      toast({
        title: "Insights Refreshed",
        description: "Your health insights have been updated.",
        duration: 2000,
      });
    } catch (error) {
      console.error("Error refreshing insights:", error);
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh your insights. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  }, [generateInsights, toast]);

  // ✅ Load initial data
  useEffect(() => {
    const newInsights = generateInsights();
    setInsights(newInsights);
    
    const newStats = calculateStats();
    setStats(newStats);
  }, [generateInsights, calculateStats]);

  return {
    insights,
    isRefreshing,
    stats,
    refreshInsights
  };
};

// ✅ Insight stats component
const InsightStats = ({ stats }: { stats: InsightStats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      <div className="text-center p-3 bg-red-50 rounded-lg">
        <div className="text-2xl font-bold text-red-600">{stats.highRisks}</div>
        <div className="text-xs text-red-600">High Risks</div>
      </div>
      <div className="text-center p-3 bg-yellow-50 rounded-lg">
        <div className="text-2xl font-bold text-yellow-600">{stats.mediumRisks}</div>
        <div className="text-xs text-yellow-600">Medium Risks</div>
      </div>
      <div className="text-center p-3 bg-green-50 rounded-lg">
        <div className="text-2xl font-bold text-green-600">{stats.totalRecommendations}</div>
        <div className="text-xs text-green-600">Recommendations</div>
      </div>
      <div className="text-center p-3 bg-blue-50 rounded-lg">
        <div className="text-2xl font-bold text-blue-600">{stats.averageRating.toFixed(1)}</div>
        <div className="text-xs text-blue-600">Avg Rating</div>
      </div>
    </div>
  );
};

// ✅ Individual insight item component
const InsightItem = ({ insight }: { insight: HealthInsight }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "risk": return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "recommendation": return <Heart className="w-4 h-4 text-emerald-500" />;
      case "trend": return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case "tip": return <Info className="w-4 h-4 text-amber-500" />;
      default: return <Info className="w-4 h-4 text-slate-500" />;
    }
  };

  const getBadgeColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-700 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "risk": return "bg-red-50 border-red-200";
      case "recommendation": return "bg-emerald-50 border-emerald-200";
      case "trend": return "bg-blue-50 border-blue-200";
      case "tip": return "bg-amber-50 border-amber-200";
      default: return "bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className={`p-4 ${getBackgroundColor(insight.type)} border rounded-lg transition-all hover:shadow-md`}>
      <div className="flex items-start gap-3">
        {getIcon(insight.type)}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-slate-800">{insight.title}</h4>
            <div className="flex items-center gap-2">
              {insight.apple_rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500" />
                  <span className="text-xs text-amber-600">{insight.apple_rating}</span>
                </div>
              )}
              <Badge className={getBadgeColor(insight.severity)}>
                {insight.severity}
              </Badge>
            </div>
          </div>
          
          <p className="text-sm text-slate-600 mb-2">{insight.description}</p>
          
          {insight.related_conditions && insight.related_conditions.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {insight.related_conditions.map((condition, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {condition}
                </Badge>
              ))}
            </div>
          )}
          
          {insight.source && (
            <p className="text-xs text-slate-500 mt-2">Source: {insight.source}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function HealthInsights({ 
  user, 
  foodAnalysis, 
  isLoading,
  showStats = true,
  showTrends = true,
  showRecommendations = true,
  compact = false,
  variant = 'default',
  onInsightUpdate,
  onGenerateAnalysis
}: HealthInsightsProps) {
  const {
    insights,
    isRefreshing,
    stats,
    refreshInsights
  } = useHealthInsightsData(user, foodAnalysis);

  const risks = insights.filter(i => i.type === 'risk');
  const recommendations = insights.filter(i => i.type === 'recommendation');
  const tips = insights.filter(i => i.type === 'tip');

  if (isLoading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Health Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-emerald-600" />
            <p>Loading insights...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Health Insights
            </CardTitle>
            <Badge variant="outline">
              {insights.length} insights
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {risks.slice(0, 2).map((insight, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="font-medium text-red-800 text-sm">{insight.food_name}</span>
                <Badge variant="destructive" className="text-xs">High Risk</Badge>
              </div>
            ))}
            {recommendations.slice(0, 2).map((insight, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-emerald-50 rounded">
                <Heart className="w-4 h-4 text-emerald-500" />
                <span className="font-medium text-emerald-800 text-sm">{insight.food_name}</span>
                <Badge className="bg-emerald-100 text-emerald-700 text-xs">Recommended</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Health Insights
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {insights.length} insights
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshInsights}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Statistics */}
        {showStats && <InsightStats stats={stats} />}

        {/* Health Risks */}
        {risks.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              Top Health Risks
            </h4>
            <div className="space-y-3">
              {risks.map((insight, index) => (
                <InsightItem key={`risk-${index}`} insight={insight} />
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-emerald-500" />
              Recommended for You
            </h4>
            <div className="space-y-3">
              {recommendations.map((insight, index) => (
                <InsightItem key={`rec-${index}`} insight={insight} />
              ))}
            </div>
          </div>
        )}

        {/* Health Tips */}
        {tips.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-500" />
              Health Tips
            </h4>
            <div className="space-y-3">
              {tips.map((insight, index) => (
                <InsightItem key={`tip-${index}`} insight={insight} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {insights.length === 0 && (
          <div className="text-center py-8">
            <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 mb-4">
              {user?.subscription_tier === "basic" ? 
                "Upgrade to Pro to see personalized health insights" : 
                "Complete food analysis to see personalized health insights"
              }
            </p>
            {user?.subscription_tier === "basic" ? (
              <Link to={createPageUrl("Subscription")}>
                <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white">
                  Upgrade to Pro
                </Button>
              </Link>
            ) : (
              <Button
                onClick={onGenerateAnalysis}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
              >
                Generate Analysis
              </Button>
            )}
          </div>
        )}

        {/* Pro Upgrade */}
        {user?.subscription_tier === "basic" && insights.length > 0 && (
          <div className="pt-4 border-t border-slate-200">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg p-4 text-white text-center">
              <Crown className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
              <h4 className="font-semibold mb-1">Want more detailed insights?</h4>
              <p className="text-emerald-100 text-sm mb-3">
                Upgrade to Pro for advanced health analytics, personalized recommendations, and detailed risk assessments
              </p>
              <Link to={createPageUrl("Subscription")}>
                <Button className="bg-white text-emerald-600 hover:bg-emerald-50 w-full font-semibold">
                  Upgrade to Pro
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
