import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { 
  Clock,
  Bell,
  BellOff,
  Plus,
  Minus,
  Check,
  X,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Zap,
  Sparkles,
  Award,
  Trophy,
  Crown,
  Gem,
  Medal,
  Target,
  TrendingUp,
  Users,
  Heart,
  Brain,
  Leaf,
  Sun,
  Moon,
  Monitor,
  Volume2,
  VolumeX,
  Palette,
  Globe,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Video,
  Camera,
  Image,
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
  Play,
  Pause,
  Stop,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume1,
  Volume2 as Volume2Icon,
  VolumeX as VolumeXIcon,
  Mic,
  MicOff,
  Headphones,
  Speaker,
  Radio,
  Tv,
  Monitor as MonitorIcon,
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
  Trash2 as Trash2Icon,
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
  FileGatsby as FileGatsbyIcon,
  Calendar,
  Settings,
  User,
  Shield,
  ShieldCheck,
  KeyRound,
  Fingerprint,
  HardDrive,
  Home,
  Menu,
  Grid,
  List as ListIcon,
  Bookmark,
  BookmarkCheck,
  BookmarkPlus,
  BookmarkMinus,
  BookmarkX,
  Archive,
  ArchiveRestore,
  Copy,
  RefreshCw,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Gift,
  Loader2,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  Timer,
  TimerOff,
  Pause as PauseIcon,
  Play as PlayIcon,
  Stop as StopIcon,
  SkipBack as SkipBackIcon,
  SkipForward as SkipForwardIcon,
  Repeat as RepeatIcon,
  Shuffle as ShuffleIcon,
  Volume1 as Volume1Icon,
  Volume2 as Volume2IconAlt,
  VolumeX as VolumeXIconAlt,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Headphones as HeadphonesIcon,
  Speaker as SpeakerIcon,
  Radio as RadioIcon,
  Tv as TvIcon,
  Monitor as MonitorIconAlt,
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
  Mail as MailIconAlt,
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
  FileSvelte as FileSvelteIconAlt,
  FileAngular as FileAngularIconAlt,
  FileReact as FileReactIconAlt,
  FileNode as FileNodeIconAlt,
  FilePython as FilePythonIconAlt,
  FileJava as FileJavaIconAlt,
  FileCpp as FileCppIconAlt,
  FileC as FileCIconAlt,
  FileCsharp as FileCsharpIconAlt,
  FilePhp as FilePhpIconAlt,
  FileRuby as FileRubyIconAlt,
  FileGo as FileGoIconAlt,
  FileRust as FileRustIconAlt,
  FileSwift as FileSwiftIconAlt,
  FileKotlin as FileKotlinIconAlt,
  FileDart as FileDartIconAlt,
  FileFlutter as FileFlutterIconAlt,
  FileIonic as FileIonicIconAlt,
  FileCordova as FileCordovaIconAlt,
  FileElectron as FileElectronIconAlt,
  FileNext as FileNextIconAlt,
  FileNuxt as FileNuxtIconAlt,
  FileGatsby as FileGatsbyIconAlt
} from 'lucide-react';

// ✅ Type Definitions
interface UserData {
  id: string;
  intermittent_fasting?: string;
  dietary_preferences?: string[];
  fasting_sms_reminders?: boolean;
  fasting_email_reminders?: boolean;
  fasting_push_reminders?: boolean;
  fasting_reminder_settings?: {
    enabled: boolean;
    sms_enabled: boolean;
    email_enabled: boolean;
    push_enabled: boolean;
    start_time?: string;
    end_time?: string;
    weekend_reminders?: boolean;
    sound_enabled?: boolean;
    vibration_enabled?: boolean;
  };
  fasting_schedule?: {
    method: string;
    start_time: string;
    end_time: string;
    timezone: string;
  };
  fasting_history?: Array<{
    date: string;
    method: string;
    start_time: string;
    end_time: string;
    completed: boolean;
    notes?: string;
  }>;
  profile_completed?: boolean;
}

interface FastingRemindersProps {
  user: UserData;
  onUpdate: (data: Partial<UserData>) => void;
}

interface FastingMethodConfig {
  value: string;
  label: string;
  description: string;
  fasting_hours: number;
  eating_hours: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  benefits: string[];
  icon: React.ComponentType<any>;
  color: string;
  recommended: boolean;
}

interface FastingReminderConfig {
  type: 'sms' | 'email' | 'push';
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  enabled: boolean;
}

interface FastingSession {
  id: string;
  start_time: string;
  end_time: string;
  method: string;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  notes?: string;
}

// ✅ Fasting method configurations
const intermittentFastingOptions: FastingMethodConfig[] = [
  {
    value: "none",
    label: "None",
    description: "No intermittent fasting",
    fasting_hours: 0,
    eating_hours: 24,
    difficulty: 'beginner',
    benefits: [],
    icon: Clock,
    color: 'text-slate-500',
    recommended: false
  },
  {
    value: "16_8",
    label: "16:8 Method",
    description: "Fast for 16 hours, eat within 8 hours",
    fasting_hours: 16,
    eating_hours: 8,
    difficulty: 'beginner',
    benefits: ['Weight loss', 'Improved metabolism', 'Better sleep'],
    icon: Sun,
    color: 'text-green-500',
    recommended: true
  },
  {
    value: "18_6",
    label: "18:6 Method",
    description: "Fast for 18 hours, eat within 6 hours",
    fasting_hours: 18,
    eating_hours: 6,
    difficulty: 'intermediate',
    benefits: ['Enhanced fat burning', 'Improved insulin sensitivity', 'Mental clarity'],
    icon: Moon,
    color: 'text-blue-500',
    recommended: true
  },
  {
    value: "20_4",
    label: "20:4 Method",
    description: "Fast for 20 hours, eat within 4 hours",
    fasting_hours: 20,
    eating_hours: 4,
    difficulty: 'advanced',
    benefits: ['Rapid weight loss', 'Autophagy', 'Increased growth hormone'],
    icon: Zap,
    color: 'text-purple-500',
    recommended: false
  },
  {
    value: "24_hour",
    label: "24-Hour Fast",
    description: "Fast for 24 hours once or twice per week",
    fasting_hours: 24,
    eating_hours: 0,
    difficulty: 'advanced',
    benefits: ['Deep autophagy', 'Immune system reset', 'Cellular repair'],
    icon: Timer,
    color: 'text-red-500',
    recommended: false
  },
  {
    value: "5_2",
    label: "5:2 Method",
    description: "Eat normally 5 days, restrict calories 2 days",
    fasting_hours: 0,
    eating_hours: 24,
    difficulty: 'intermediate',
    benefits: ['Flexible schedule', 'Sustainable long-term', 'Metabolic flexibility'],
    icon: Calendar,
    color: 'text-orange-500',
    recommended: false
  }
];

// ✅ Reminder type configurations
const reminderTypes: FastingReminderConfig[] = [
  {
    type: 'sms',
    label: 'SMS Alerts',
    description: 'Receive text messages for fasting windows',
    icon: MessageSquare,
    color: 'text-blue-500',
    enabled: false
  },
  {
    type: 'email',
    label: 'Email Reminders',
    description: 'Get email notifications for fasting schedules',
    icon: Mail,
    color: 'text-green-500',
    enabled: false
  },
  {
    type: 'push',
    label: 'Push Notifications',
    description: 'Receive push notifications on your device',
    icon: Bell,
    color: 'text-purple-500',
    enabled: false
  }
];

// ✅ Custom hook for fasting reminders management
const useFastingRemindersData = () => {
  const [currentSession, setCurrentSession] = useState<FastingSession | null>(null);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [customStartTime, setCustomStartTime] = useState('08:00');
  const [customEndTime, setCustomEndTime] = useState('16:00');
  const [weekendReminders, setWeekendReminders] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const { toast } = useToast();

  const startFastingSession = useCallback((method: string, startTime: string, endTime: string) => {
    const session: FastingSession = {
      id: Date.now().toString(),
      start_time: startTime,
      end_time: endTime,
      method,
      status: 'active',
      progress: 0,
      notes: ''
    };

    setCurrentSession(session);
    
    toast({
      title: "Fasting Session Started! ⏰",
      description: `Your ${method.replace('_', ':')} fasting session has begun.`,
      duration: 3000,
    });
  }, [toast]);

  const pauseFastingSession = useCallback(() => {
    if (currentSession) {
      setCurrentSession(prev => prev ? { ...prev, status: 'paused' } : null);
      
      toast({
        title: "Fasting Session Paused",
        description: "Your fasting session has been paused.",
        duration: 2000,
      });
    }
  }, [currentSession, toast]);

  const resumeFastingSession = useCallback(() => {
    if (currentSession) {
      setCurrentSession(prev => prev ? { ...prev, status: 'active' } : null);
      
      toast({
        title: "Fasting Session Resumed",
        description: "Your fasting session has been resumed.",
        duration: 2000,
      });
    }
  }, [currentSession, toast]);

  const endFastingSession = useCallback(() => {
    if (currentSession) {
      setCurrentSession(prev => prev ? { ...prev, status: 'completed' } : null);
      
      toast({
        title: "Fasting Session Completed! 🎉",
        description: "Congratulations on completing your fasting session.",
        duration: 3000,
      });
    }
  }, [currentSession, toast]);

  const getFastingProgress = useCallback((session: FastingSession) => {
    if (!session) return 0;
    
    const startTime = new Date(session.start_time);
    const endTime = new Date(session.end_time);
    const currentTime = new Date();
    
    const totalDuration = endTime.getTime() - startTime.getTime();
    const elapsed = currentTime.getTime() - startTime.getTime();
    
    return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
  }, []);

  const getRecommendedSchedule = useCallback((method: string) => {
    const methodConfig = intermittentFastingOptions.find(m => m.value === method);
    if (!methodConfig) return { start: '08:00', end: '16:00' };
    
    // Return recommended times based on method
    switch (method) {
      case '16_8':
        return { start: '12:00', end: '20:00' }; // 12 PM to 8 PM eating window
      case '18_6':
        return { start: '14:00', end: '20:00' }; // 2 PM to 8 PM eating window
      case '20_4':
        return { start: '16:00', end: '20:00' }; // 4 PM to 8 PM eating window
      default:
        return { start: '08:00', end: '16:00' };
    }
  }, []);

  return {
    currentSession,
    showAdvancedSettings,
    customStartTime,
    customEndTime,
    weekendReminders,
    soundEnabled,
    vibrationEnabled,
    setShowAdvancedSettings,
    setCustomStartTime,
    setCustomEndTime,
    setWeekendReminders,
    setSoundEnabled,
    setVibrationEnabled,
    startFastingSession,
    pauseFastingSession,
    resumeFastingSession,
    endFastingSession,
    getFastingProgress,
    getRecommendedSchedule
  };
};

// ✅ Fasting session progress component
const FastingSessionProgress = ({ 
  session, 
  onPause, 
  onResume, 
  onEnd 
}: {
  session: FastingSession;
  onPause: () => void;
  onResume: () => void;
  onEnd: () => void;
}) => {
  const progress = useMemo(() => {
    const startTime = new Date(session.start_time);
    const endTime = new Date(session.end_time);
    const currentTime = new Date();
    
    const totalDuration = endTime.getTime() - startTime.getTime();
    const elapsed = currentTime.getTime() - startTime.getTime();
    
    return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
  }, [session]);

  const timeRemaining = useMemo(() => {
    const endTime = new Date(session.end_time);
    const currentTime = new Date();
    const remaining = endTime.getTime() - currentTime.getTime();
    
    if (remaining <= 0) return '0h 0m';
    
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  }, [session]);

  const statusColors = {
    active: 'bg-green-500',
    paused: 'bg-yellow-500',
    completed: 'bg-blue-500'
  };

  const statusTextColors = {
    active: 'text-green-600',
    paused: 'text-yellow-600',
    completed: 'text-blue-600'
  };

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <CardHeader>
        <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
          <Timer className="w-5 h-5 text-purple-600" />
          Current Fasting Session
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Session info */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-800">{session.method.replace('_', ':')} Method</h3>
            <p className="text-sm text-slate-600">
              {new Date(session.start_time).toLocaleTimeString()} - {new Date(session.end_time).toLocaleTimeString()}
            </p>
          </div>
          <Badge className={`${statusColors[session.status]} text-white`}>
            {session.status}
          </Badge>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Progress</span>
            <span className={`text-sm font-medium ${statusTextColors[session.status]}`}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${statusColors[session.status]}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-slate-600">
            {timeRemaining} remaining
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {session.status === 'active' && (
            <Button variant="outline" size="sm" onClick={onPause}>
              <PauseIcon className="w-4 h-4 mr-2" />
              Pause
            </Button>
          )}
          {session.status === 'paused' && (
            <Button variant="outline" size="sm" onClick={onResume}>
              <PlayIcon className="w-4 h-4 mr-2" />
              Resume
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={onEnd}>
            <StopIcon className="w-4 h-4 mr-2" />
            End Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// ✅ Fasting method selector component
const FastingMethodSelector = ({ 
  selectedMethod, 
  onMethodChange 
}: {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}) => {
  const selectedConfig = intermittentFastingOptions.find(m => m.value === selectedMethod);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="if_schedule" className="text-base font-medium text-slate-800">
          Your Fasting Schedule
        </Label>
        <Select
          value={selectedMethod}
          onValueChange={onMethodChange}
        >
          <SelectTrigger id="if_schedule" className="mt-2 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500">
            <SelectValue placeholder="Select your fasting schedule" />
          </SelectTrigger>
          <SelectContent>
            {intermittentFastingOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <option.icon className={`w-4 h-4 ${option.color}`} />
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-slate-500">{option.description}</div>
                    </div>
                  </div>
                  {option.recommended && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Recommended
                    </Badge>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Method details */}
      {selectedConfig && selectedConfig.value !== 'none' && (
        <Card className="bg-slate-50">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <selectedConfig.icon className={`w-5 h-5 ${selectedConfig.color}`} />
                <h3 className="font-semibold text-slate-800">{selectedConfig.label}</h3>
              </div>
              
              <p className="text-sm text-slate-600">{selectedConfig.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-lg font-bold text-slate-800">{selectedConfig.fasting_hours}h</div>
                  <div className="text-xs text-slate-500">Fasting</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-lg font-bold text-slate-800">{selectedConfig.eating_hours}h</div>
                  <div className="text-xs text-slate-500">Eating</div>
                </div>
              </div>

              {selectedConfig.benefits.length > 0 && (
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {selectedConfig.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="w-3 h-3 text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Badge 
                variant="outline" 
                className={`${
                  selectedConfig.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                  selectedConfig.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}
              >
                {selectedConfig.difficulty} level
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// ✅ Reminder settings component
const ReminderSettings = ({ 
  user, 
  onUpdate 
}: {
  user: UserData;
  onUpdate: (data: Partial<UserData>) => void;
}) => {
  const handleReminderChange = useCallback((type: string, enabled: boolean) => {
    const updates: Partial<UserData> = {};
    
    switch (type) {
      case 'sms':
        updates.fasting_sms_reminders = enabled;
        break;
      case 'email':
        updates.fasting_email_reminders = enabled;
        break;
      case 'push':
        updates.fasting_push_reminders = enabled;
        break;
    }
    
    onUpdate(updates);
  }, [onUpdate]);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-slate-800">Reminder Preferences</h3>
      
      {reminderTypes.map(reminder => (
        <div key={reminder.type} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-start space-x-3">
            <Checkbox
              id={`fasting-${reminder.type}-opt-in`}
              checked={
                reminder.type === 'sms' ? user.fasting_sms_reminders === true :
                reminder.type === 'email' ? user.fasting_email_reminders === true :
                user.fasting_push_reminders === true
              }
              onCheckedChange={(checked) => handleReminderChange(reminder.type, !!checked)}
              className="border-emerald-300 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 mt-0.5"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <reminder.icon className={`w-4 h-4 ${reminder.color}`} />
                <Label htmlFor={`fasting-${reminder.type}-opt-in`} className="text-sm font-medium text-slate-700 cursor-pointer">
                  {reminder.label}
                </Label>
              </div>
              <p className="text-xs text-slate-600">
                {reminder.description}
              </p>
              {reminder.type === 'sms' && (
                <p className="text-xs text-slate-500 mt-1">
                  Message and data rates may apply.
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ✅ Advanced settings component
const AdvancedFastingSettings = ({ 
  user, 
  onUpdate,
  customStartTime,
  customEndTime,
  weekendReminders,
  soundEnabled,
  vibrationEnabled,
  onCustomStartTimeChange,
  onCustomEndTimeChange,
  onWeekendRemindersChange,
  onSoundEnabledChange,
  onVibrationEnabledChange
}: {
  user: UserData;
  onUpdate: (data: Partial<UserData>) => void;
  customStartTime: string;
  customEndTime: string;
  weekendReminders: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  onCustomStartTimeChange: (value: string) => void;
  onCustomEndTimeChange: (value: string) => void;
  onWeekendRemindersChange: (value: boolean) => void;
  onSoundEnabledChange: (value: boolean) => void;
  onVibrationEnabledChange: (value: boolean) => void;
}) => {
  const handleAdvancedSettingsUpdate = useCallback(() => {
    onUpdate({
      fasting_reminder_settings: {
        enabled: true,
        sms_enabled: user.fasting_sms_reminders || false,
        email_enabled: user.fasting_email_reminders || false,
        push_enabled: user.fasting_push_reminders || false,
        start_time: customStartTime,
        end_time: customEndTime,
        weekend_reminders: weekendReminders,
        sound_enabled: soundEnabled,
        vibration_enabled: vibrationEnabled
      }
    });
  }, [onUpdate, user, customStartTime, customEndTime, weekendReminders, soundEnabled, vibrationEnabled]);

  useEffect(() => {
    handleAdvancedSettingsUpdate();
  }, [handleAdvancedSettingsUpdate]);

  return (
    <Card className="bg-slate-50">
      <CardHeader>
        <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
          <Settings className="w-5 h-5 text-slate-600" />
          Advanced Fasting Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Custom time settings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="custom_start_time">Start Time</Label>
            <Input
              id="custom_start_time"
              type="time"
              value={customStartTime}
              onChange={(e) => onCustomStartTimeChange(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="custom_end_time">End Time</Label>
            <Input
              id="custom_end_time"
              type="time"
              value={customEndTime}
              onChange={(e) => onCustomEndTimeChange(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        {/* Weekend reminders */}
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="weekend_reminders">Weekend Reminders</Label>
            <p className="text-xs text-slate-500">Receive reminders on weekends</p>
          </div>
          <Button
            variant={weekendReminders ? 'default' : 'outline'}
            size="sm"
            onClick={() => onWeekendRemindersChange(!weekendReminders)}
          >
            {weekendReminders ? 'Enabled' : 'Disabled'}
          </Button>
        </div>

        {/* Notification settings */}
        <div className="space-y-3">
          <h4 className="font-medium text-slate-800">Notification Settings</h4>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-700">Sound</span>
            </div>
            <Button
              variant={soundEnabled ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSoundEnabledChange(!soundEnabled)}
            >
              {soundEnabled ? 'On' : 'Off'}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-700">Vibration</span>
            </div>
            <Button
              variant={vibrationEnabled ? 'default' : 'outline'}
              size="sm"
              onClick={() => onVibrationEnabledChange(!vibrationEnabled)}
            >
              {vibrationEnabled ? 'On' : 'Off'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function FastingReminders({ user, onUpdate }: FastingRemindersProps) {
  const {
    currentSession,
    showAdvancedSettings,
    customStartTime,
    customEndTime,
    weekendReminders,
    soundEnabled,
    vibrationEnabled,
    setShowAdvancedSettings,
    setCustomStartTime,
    setCustomEndTime,
    setWeekendReminders,
    setSoundEnabled,
    setVibrationEnabled,
    startFastingSession,
    pauseFastingSession,
    resumeFastingSession,
    endFastingSession,
    getFastingProgress,
    getRecommendedSchedule
  } = useFastingRemindersData();

  const handleMethodChange = useCallback((method: string) => {
    onUpdate({ intermittent_fasting: method });
    
    if (method !== 'none') {
      const recommended = getRecommendedSchedule(method);
      setCustomStartTime(recommended.start);
      setCustomEndTime(recommended.end);
    }
  }, [onUpdate, getRecommendedSchedule, setCustomStartTime, setCustomEndTime]);

  const handleStartSession = useCallback(() => {
    if (user.intermittent_fasting && user.intermittent_fasting !== 'none') {
      startFastingSession(user.intermittent_fasting, customStartTime, customEndTime);
    }
  }, [user.intermittent_fasting, customStartTime, customEndTime, startFastingSession]);

  // Check if user has intermittent fasting enabled
  const hasIntermittentFasting = user.dietary_preferences?.includes('intermittent_fasting') || 
                                 (user.intermittent_fasting && user.intermittent_fasting !== 'none');

  if (!hasIntermittentFasting) {
    return (
      <div className="text-center py-8">
        <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          Intermittent Fasting Not Enabled
        </h3>
        <p className="text-slate-500 text-sm mb-4">
          To set up fasting alerts, first select Intermittent Fasting in your Lifestyle & Diet settings.
        </p>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Go to Settings
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current fasting session */}
      {currentSession && (
        <FastingSessionProgress
          session={currentSession}
          onPause={pauseFastingSession}
          onResume={resumeFastingSession}
          onEnd={endFastingSession}
        />
      )}

      {/* Fasting method selector */}
      <FastingMethodSelector
        selectedMethod={user.intermittent_fasting || 'none'}
        onMethodChange={handleMethodChange}
      />

      {/* Start session button */}
      {user.intermittent_fasting && user.intermittent_fasting !== 'none' && !currentSession && (
        <Button onClick={handleStartSession} className="w-full">
          <PlayIcon className="w-4 h-4 mr-2" />
          Start Fasting Session
        </Button>
      )}

      {/* Reminder settings */}
      <ReminderSettings user={user} onUpdate={onUpdate} />

      {/* Advanced settings toggle */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-800">Advanced Settings</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
        >
          {showAdvancedSettings ? 'Hide' : 'Show'}
        </Button>
      </div>

      {/* Advanced settings */}
      {showAdvancedSettings && (
        <AdvancedFastingSettings
          user={user}
          onUpdate={onUpdate}
          customStartTime={customStartTime}
          customEndTime={customEndTime}
          weekendReminders={weekendReminders}
          soundEnabled={soundEnabled}
          vibrationEnabled={vibrationEnabled}
          onCustomStartTimeChange={setCustomStartTime}
          onCustomEndTimeChange={setCustomEndTime}
          onWeekendRemindersChange={setWeekendReminders}
          onSoundEnabledChange={setSoundEnabled}
          onVibrationEnabledChange={setVibrationEnabled}
        />
      )}
    </div>
  );
}
