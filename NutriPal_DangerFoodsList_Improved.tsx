import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { User } from '@/entities/User';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  Eye, 
  EyeOff, 
  Crown,
  Shield,
  ShieldCheck,
  Check,
  X,
  Info,
  RefreshCw,
  Settings,
  Zap,
  Sparkles,
  Gem,
  Medal,
  Target,
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
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Gift,
  AlertTriangle as AlertTriangleIcon,
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
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Lock,
  Unlock,
  Zap as ZapIcon,
  Sparkles as SparklesIcon,
  Crown as CrownIcon,
  Gem as GemIcon,
  Medal as MedalIcon,
  Target as TargetIcon,
  TrendingUp as TrendingUpIcon,
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
}

interface DangerFood {
  food_name: string;
  reason: string;
  severity: 'low' | 'medium' | 'high';
  related_conditions?: string[];
  related_medications?: string[];
  interaction_mechanism?: string;
  medical_source?: string;
  apple_rating?: number;
  created_at?: string;
  last_updated?: string;
}

interface DangerFoodsListProps {
  foods: DangerFood[];
  isLoading: boolean;
  user: UserData;
  showStats?: boolean;
  showFilters?: boolean;
  showExport?: boolean;
  compact?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
  onFoodUpdate?: (foodData: any) => void;
  onGenerateAnalysis?: () => void;
}

interface DangerFoodStats {
  totalFoods: number;
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
  byCondition: Record<string, number>;
  byMedication: Record<string, number>;
  lastUpdated: string;
}

// ✅ Custom hook for danger foods management
const useDangerFoodsData = (foods: DangerFood[], user: UserData) => {
  const [filteredFoods, setFilteredFoods] = useState<DangerFood[]>(foods);
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [conditionFilter, setConditionFilter] = useState<string>('all');
  const [showAll, setShowAll] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [stats, setStats] = useState<DangerFoodStats>({
    totalFoods: 0,
    highRisk: 0,
    mediumRisk: 0,
    lowRisk: 0,
    byCondition: {},
    byMedication: {},
    lastUpdated: ''
  });
  const { toast } = useToast();

  // ✅ Calculate statistics
  const calculateStats = useCallback((): DangerFoodStats => {
    const highRisk = foods.filter(f => f.severity === 'high').length;
    const mediumRisk = foods.filter(f => f.severity === 'medium').length;
    const lowRisk = foods.filter(f => f.severity === 'low').length;
    
    const byCondition: Record<string, number> = {};
    const byMedication: Record<string, number> = {};
    
    foods.forEach(food => {
      food.related_conditions?.forEach(condition => {
        byCondition[condition] = (byCondition[condition] || 0) + 1;
      });
      food.related_medications?.forEach(medication => {
        byMedication[medication] = (byMedication[medication] || 0) + 1;
      });
    });
    
    const lastUpdated = foods.length > 0 
      ? foods[0].last_updated || foods[0].created_at || new Date().toISOString()
      : new Date().toISOString();
    
    return {
      totalFoods: foods.length,
      highRisk,
      mediumRisk,
      lowRisk,
      byCondition,
      byMedication,
      lastUpdated
    };
  }, [foods]);

  // ✅ Filter foods
  const filterFoods = useCallback(() => {
    let filtered = [...foods];
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(food => 
        food.food_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.reason.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Severity filter
    if (severityFilter !== 'all') {
      filtered = filtered.filter(food => food.severity === severityFilter);
    }
    
    // Condition filter
    if (conditionFilter !== 'all') {
      filtered = filtered.filter(food => 
        food.related_conditions?.includes(conditionFilter)
      );
    }
    
    setFilteredFoods(filtered);
  }, [foods, searchQuery, severityFilter, conditionFilter]);

  // ✅ Export to CSV
  const exportToCSV = useCallback(async () => {
    try {
      setIsExporting(true);
      
      const csvContent = [
        ['Food Name', 'Reason', 'Severity', 'Related Conditions', 'Related Medications'],
        ...foods.map(food => [
          food.food_name,
          food.reason,
          food.severity,
          food.related_conditions?.join('; ') || '',
          food.related_medications?.join('; ') || ''
        ])
      ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `danger-foods-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Export Successful",
        description: "Your danger foods list has been exported to CSV.",
        duration: 2000,
      });
    } catch (error) {
      console.error("Error exporting foods:", error);
      toast({
        title: "Export Failed",
        description: "Failed to export your danger foods list. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  }, [foods, toast]);

  // ✅ Update filters and stats
  useEffect(() => {
    filterFoods();
    const newStats = calculateStats();
    setStats(newStats);
  }, [filterFoods, calculateStats]);

  return {
    filteredFoods,
    searchQuery,
    setSearchQuery,
    severityFilter,
    setSeverityFilter,
    conditionFilter,
    setConditionFilter,
    showAll,
    setShowAll,
    isExporting,
    stats,
    exportToCSV
  };
};

// ✅ Danger food stats component
const DangerFoodStats = ({ stats }: { stats: DangerFoodStats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      <div className="text-center p-3 bg-red-50 rounded-lg">
        <div className="text-2xl font-bold text-red-600">{stats.totalFoods}</div>
        <div className="text-xs text-red-600">Total Foods</div>
      </div>
      <div className="text-center p-3 bg-red-100 rounded-lg">
        <div className="text-2xl font-bold text-red-700">{stats.highRisk}</div>
        <div className="text-xs text-red-700">High Risk</div>
      </div>
      <div className="text-center p-3 bg-yellow-50 rounded-lg">
        <div className="text-2xl font-bold text-yellow-600">{stats.mediumRisk}</div>
        <div className="text-xs text-yellow-600">Medium Risk</div>
      </div>
      <div className="text-center p-3 bg-orange-50 rounded-lg">
        <div className="text-2xl font-bold text-orange-600">{stats.lowRisk}</div>
        <div className="text-xs text-orange-600">Low Risk</div>
      </div>
    </div>
  );
};

// ✅ Food filter component
const FoodFilters = ({ 
  searchQuery,
  setSearchQuery,
  severityFilter,
  setSeverityFilter,
  conditionFilter,
  setConditionFilter,
  availableConditions,
  showFilters
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  severityFilter: string;
  setSeverityFilter: (filter: string) => void;
  conditionFilter: string;
  setConditionFilter: (filter: string) => void;
  availableConditions: string[];
  showFilters: boolean;
}) => {
  if (!showFilters) return null;

  return (
    <div className="space-y-3 mb-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search foods..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="px-3 py-1 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
        >
          <option value="all">All Severities</option>
          <option value="high">High Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="low">Low Risk</option>
        </select>

        <select
          value={conditionFilter}
          onChange={(e) => setConditionFilter(e.target.value)}
          className="px-3 py-1 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
        >
          <option value="all">All Conditions</option>
          {availableConditions.map(condition => (
            <option key={condition} value={condition}>{condition}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

// ✅ Individual food item component
const DangerFoodItem = ({ food }: { food: DangerFood }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low': return 'bg-orange-100 border-orange-300 text-orange-800';
      default: return 'bg-slate-100 border-slate-300 text-slate-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'medium': return <Info className="w-4 h-4 text-yellow-600" />;
      case 'low': return <Info className="w-4 h-4 text-orange-600" />;
      default: return <Info className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className={`p-4 ${getSeverityColor(food.severity)} border rounded-lg transition-all hover:shadow-md`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {getSeverityIcon(food.severity)}
          <h4 className="font-semibold">{food.food_name}</h4>
        </div>
        <Badge variant="outline" className="text-xs">
          {food.severity} risk
        </Badge>
      </div>
      
      <p className="text-sm mb-3">{food.reason}</p>
      
      {food.related_conditions && food.related_conditions.length > 0 && (
        <div className="mb-2">
          <p className="text-xs font-medium mb-1">Related Conditions:</p>
          <div className="flex flex-wrap gap-1">
            {food.related_conditions.map((condition, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {condition}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {food.related_medications && food.related_medications.length > 0 && (
        <div>
          <p className="text-xs font-medium mb-1">Related Medications:</p>
          <div className="flex flex-wrap gap-1">
            {food.related_medications.map((medication, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {medication}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function DangerFoodsList({ 
  foods, 
  isLoading, 
  user,
  showStats = true,
  showFilters = true,
  showExport = true,
  compact = false,
  variant = 'default',
  onFoodUpdate,
  onGenerateAnalysis
}: DangerFoodsListProps) {
  const {
    filteredFoods,
    searchQuery,
    setSearchQuery,
    severityFilter,
    setSeverityFilter,
    conditionFilter,
    setConditionFilter,
    showAll,
    setShowAll,
    isExporting,
    stats,
    exportToCSV
  } = useDangerFoodsData(foods, user);

  const displayedFoods = showAll ? filteredFoods : filteredFoods.slice(0, 3);
  const availableConditions = useMemo(() => {
    const conditions = new Set<string>();
    foods.forEach(food => {
      food.related_conditions?.forEach(condition => conditions.add(condition));
    });
    return Array.from(conditions);
  }, [foods]);

  if (isLoading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Foods to Avoid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-emerald-600" />
            <p>Loading your personalized list...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (foods.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Foods to Avoid
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 mb-4">
              Generate your food analysis to see foods you should avoid based on your health profile.
            </p>
            <Button 
              onClick={onGenerateAnalysis}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
            >
              Generate Food Analysis
            </Button>
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
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Foods to Avoid
            </CardTitle>
            <Badge className="bg-red-100 text-red-700">
              {foods.length} foods
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {displayedFoods.map((food, index) => (
              <div key={index} className="p-2 bg-red-50 border border-red-200 rounded">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-red-800 text-sm">{food.food_name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {food.severity}
                  </Badge>
                </div>
                <p className="text-red-700 text-xs mt-1">{food.reason}</p>
              </div>
            ))}
          </div>
          
          {filteredFoods.length > 3 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="w-full mt-3"
            >
              {showAll ? 'Show Less' : `Show All ${filteredFoods.length} Foods`}
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Foods to Avoid
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className="bg-red-100 text-red-700">
              {filteredFoods.length} foods
            </Badge>
            {showExport && (
              <Button
                variant="outline"
                size="sm"
                onClick={exportToCSV}
                disabled={isExporting}
              >
                {isExporting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FileIcon className="w-4 h-4" />
                )}
                Export
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Statistics */}
        {showStats && <DangerFoodStats stats={stats} />}

        {/* Filters */}
        <FoodFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          severityFilter={severityFilter}
          setSeverityFilter={setSeverityFilter}
          conditionFilter={conditionFilter}
          setConditionFilter={setConditionFilter}
          availableConditions={availableConditions}
          showFilters={showFilters}
        />

        {/* Food List */}
        <div className="space-y-3">
          {displayedFoods.map((food, index) => (
            <DangerFoodItem key={`${food.food_name}-${index}`} food={food} />
          ))}
        </div>

        {/* Show More/Less */}
        {filteredFoods.length > 3 && (
          <div className="pt-4 border-t border-slate-200">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="w-full mb-3"
            >
              {showAll ? (
                <>
                  <EyeOff className="w-4 h-4 mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Show All {filteredFoods.length} Foods
                </>
              )}
            </Button>
          </div>
        )}

        {/* Pro Upgrade */}
        <div className="pt-4 border-t border-slate-200">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg p-4 text-white text-center">
            <Crown className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
            <h4 className="font-semibold mb-1">Want to see safe foods & recommendations?</h4>
            <p className="text-emerald-100 text-sm mb-3">
              Upgrade to Pro to unlock safe foods list, recommended foods, and personalized recipes
            </p>
            <Link to={createPageUrl("Subscription")}>
              <Button className="bg-white text-emerald-600 hover:bg-emerald-50 w-full font-semibold">
                View More Features
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
