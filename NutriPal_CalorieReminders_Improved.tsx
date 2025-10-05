import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  dietary_preferences?: string[];
  number_of_meals?: number;
  calorie_reminder_times?: string[];
  calorie_reminder_settings?: {
    enabled: boolean;
    sms_enabled: boolean;
    email_enabled: boolean;
    push_enabled: boolean;
    weekend_reminders?: boolean;
    sound_enabled?: boolean;
    vibration_enabled?: boolean;
    reminder_frequency?: 'once' | 'twice' | 'thrice';
  };
  calorie_goals?: {
    daily_calories: number;
    meal_calories: number[];
    macro_goals?: {
      protein: number;
      carbs: number;
      fat: number;
    };
  };
  calorie_tracking_history?: Array<{
    date: string;
    meal_times: string[];
    logged_meals: number;
    total_calories: number;
    goal_calories: number;
    notes?: string;
  }>;
  profile_completed?: boolean;
}

interface CalorieRemindersProps {
  user: UserData;
  onUpdate: (data: Partial<UserData>) => void;
}

interface MealTimeConfig {
  id: string;
  label: string;
  time: string;
  enabled: boolean;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories?: number;
  notes?: string;
}

interface MealPlanConfig {
  meals: number;
  label: string;
  description: string;
  recommended_times: string[];
  benefits: string[];
  icon: React.ComponentType<any>;
  color: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface ReminderConfig {
  type: 'sms' | 'email' | 'push';
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  enabled: boolean;
}

// ✅ Meal plan configurations
const mealPlanOptions: MealPlanConfig[] = [
  {
    meals: 1,
    label: "1 Meal",
    description: "One Meal a Day (OMAD)",
    recommended_times: ['12:00'],
    benefits: ['Simple tracking', 'Focused eating', 'Time efficient'],
    icon: Sun,
    color: 'text-orange-500',
    difficulty: 'advanced'
  },
  {
    meals: 2,
    label: "2 Meals",
    description: "Two meals per day",
    recommended_times: ['08:00', '18:00'],
    benefits: ['Flexible schedule', 'Easy to track', 'Good for busy lifestyles'],
    icon: Moon,
    color: 'text-blue-500',
    difficulty: 'intermediate'
  },
  {
    meals: 3,
    label: "3 Meals",
    description: "Traditional three meals",
    recommended_times: ['08:00', '13:00', '19:00'],
    benefits: ['Balanced nutrition', 'Regular energy', 'Social eating'],
    icon: Clock,
    color: 'text-green-500',
    difficulty: 'beginner'
  },
  {
    meals: 4,
    label: "4 Meals",
    description: "Three meals plus one snack",
    recommended_times: ['08:00', '12:00', '16:00', '19:00'],
    benefits: ['Better portion control', 'Stable blood sugar', 'Reduced hunger'],
    icon: Zap,
    color: 'text-purple-500',
    difficulty: 'intermediate'
  },
  {
    meals: 5,
    label: "5 Meals",
    description: "Three meals plus two snacks",
    recommended_times: ['08:00', '11:00', '14:00', '17:00', '20:00'],
    benefits: ['Optimal metabolism', 'Consistent energy', 'Better recovery'],
    icon: Target,
    color: 'text-red-500',
    difficulty: 'advanced'
  },
  {
    meals: 6,
    label: "6 Meals",
    description: "Frequent small meals",
    recommended_times: ['08:00', '10:00', '12:00', '15:00', '17:00', '19:00'],
    benefits: ['Maximum metabolism', 'Muscle building', 'Professional athletes'],
    icon: Trophy,
    color: 'text-yellow-500',
    difficulty: 'advanced'
  }
];

// ✅ Reminder type configurations
const reminderTypes: ReminderConfig[] = [
  {
    type: 'sms',
    label: 'SMS Alerts',
    description: 'Receive text messages for meal reminders',
    icon: MessageSquare,
    color: 'text-blue-500',
    enabled: false
  },
  {
    type: 'email',
    label: 'Email Reminders',
    description: 'Get email notifications for meal logging',
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

// ✅ Custom hook for calorie reminders management
const useCalorieRemindersData = () => {
  const [mealTimes, setMealTimes] = useState<MealTimeConfig[]>([]);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [weekendReminders, setWeekendReminders] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [reminderFrequency, setReminderFrequency] = useState<'once' | 'twice' | 'thrice'>('once');
  const { toast } = useToast();

  const updateMealTimes = useCallback((times: string[]) => {
    const mealTypes: ('breakfast' | 'lunch' | 'dinner' | 'snack')[] = ['breakfast', 'lunch', 'dinner', 'snack'];
    const newMealTimes = times.map((time, index) => ({
      id: `meal-${index}`,
      label: `Meal ${index + 1}`,
      time,
      enabled: true,
      meal_type: mealTypes[index] || 'snack',
      calories: 0,
      notes: ''
    }));
    setMealTimes(newMealTimes);
  }, []);

  const addMealTime = useCallback(() => {
    const newMealTime: MealTimeConfig = {
      id: `meal-${Date.now()}`,
      label: `Meal ${mealTimes.length + 1}`,
      time: '12:00',
      enabled: true,
      meal_type: 'snack',
      calories: 0,
      notes: ''
    };
    setMealTimes(prev => [...prev, newMealTime]);
    
    toast({
      title: "Meal Added! 🍽️",
      description: "A new meal reminder has been added to your schedule.",
      duration: 2000,
    });
  }, [mealTimes.length, toast]);

  const removeMealTime = useCallback((id: string) => {
    setMealTimes(prev => prev.filter(meal => meal.id !== id));
    
    toast({
      title: "Meal Removed",
      description: "The meal reminder has been removed from your schedule.",
      duration: 2000,
    });
  }, [toast]);

  const updateMealTime = useCallback((id: string, updates: Partial<MealTimeConfig>) => {
    setMealTimes(prev => prev.map(meal => 
      meal.id === id ? { ...meal, ...updates } : meal
    ));
  }, []);

  const getRecommendedTimes = useCallback((mealCount: number) => {
    const plan = mealPlanOptions.find(p => p.meals === mealCount);
    return plan ? plan.recommended_times : [];
  }, []);

  const validateMealTimes = useCallback((times: string[]) => {
    const sortedTimes = times.sort();
    for (let i = 1; i < sortedTimes.length; i++) {
      const prevTime = new Date(`2000-01-01 ${sortedTimes[i-1]}`);
      const currentTime = new Date(`2000-01-01 ${sortedTimes[i]}`);
      const diffMinutes = (currentTime.getTime() - prevTime.getTime()) / (1000 * 60);
      
      if (diffMinutes < 60) {
        return {
          valid: false,
          message: `Meal times should be at least 1 hour apart. ${sortedTimes[i-1]} and ${sortedTimes[i]} are too close.`
        };
      }
    }
    return { valid: true };
  }, []);

  const getMealStats = useCallback(() => {
    const totalMeals = mealTimes.length;
    const enabledMeals = mealTimes.filter(meal => meal.enabled).length;
    const totalCalories = mealTimes.reduce((sum, meal) => sum + (meal.calories || 0), 0);
    
    return {
      totalMeals,
      enabledMeals,
      totalCalories,
      averageCalories: totalMeals > 0 ? Math.round(totalCalories / totalMeals) : 0
    };
  }, [mealTimes]);

  return {
    mealTimes,
    showAdvancedSettings,
    weekendReminders,
    soundEnabled,
    vibrationEnabled,
    reminderFrequency,
    setShowAdvancedSettings,
    setWeekendReminders,
    setSoundEnabled,
    setVibrationEnabled,
    setReminderFrequency,
    updateMealTimes,
    addMealTime,
    removeMealTime,
    updateMealTime,
    getRecommendedTimes,
    validateMealTimes,
    getMealStats
  };
};

// ✅ Meal time input component
const MealTimeInput = ({ 
  meal, 
  onUpdate, 
  onRemove,
  canRemove 
}: {
  meal: MealTimeConfig;
  onUpdate: (updates: Partial<MealTimeConfig>) => void;
  onRemove: () => void;
  canRemove: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTime, setTempTime] = useState(meal.time);

  const handleTimeChange = useCallback((newTime: string) => {
    setTempTime(newTime);
    onUpdate({ time: newTime });
  }, [onUpdate]);

  const handleSave = useCallback(() => {
    onUpdate({ time: tempTime });
    setIsEditing(false);
  }, [tempTime, onUpdate]);

  const handleCancel = useCallback(() => {
    setTempTime(meal.time);
    setIsEditing(false);
  }, [meal.time]);

  const mealTypeColors = {
    breakfast: 'bg-orange-100 text-orange-700',
    lunch: 'bg-blue-100 text-blue-700',
    dinner: 'bg-purple-100 text-purple-700',
    snack: 'bg-green-100 text-green-700'
  };

  const mealTypeIcons = {
    breakfast: Sun,
    lunch: Clock,
    dinner: Moon,
    snack: Zap
  };

  const MealIcon = mealTypeIcons[meal.meal_type];

  return (
    <Card className={`${meal.enabled ? 'bg-white' : 'bg-slate-50'} border-slate-200`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MealIcon className="w-4 h-4 text-slate-600" />
            <span className="font-medium text-slate-800">{meal.label}</span>
            <Badge className={`${mealTypeColors[meal.meal_type]} text-xs`}>
              {meal.meal_type}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdate({ enabled: !meal.enabled })}
            >
              {meal.enabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
            </Button>
            {canRemove && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRemove}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {/* Time input */}
          <div>
            <Label htmlFor={`time-${meal.id}`} className="text-sm text-slate-700">
              Reminder Time
            </Label>
            {isEditing ? (
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id={`time-${meal.id}`}
                  type="time"
                  value={tempTime}
                  onChange={(e) => setTempTime(e.target.value)}
                  className="flex-1"
                />
                <Button size="sm" onClick={handleSave}>
                  <Check className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div 
                className="flex items-center gap-2 mt-1 p-2 bg-slate-50 rounded border cursor-pointer hover:bg-slate-100"
                onClick={() => setIsEditing(true)}
              >
                <Clock className="w-4 h-4 text-slate-600" />
                <span className="text-slate-800">{meal.time}</span>
                <Edit3 className="w-4 h-4 text-slate-400 ml-auto" />
              </div>
            )}
          </div>

          {/* Calorie goal */}
          <div>
            <Label htmlFor={`calories-${meal.id}`} className="text-sm text-slate-700">
              Calorie Goal (optional)
            </Label>
            <Input
              id={`calories-${meal.id}`}
              type="number"
              placeholder="Enter calorie goal"
              value={meal.calories || ''}
              onChange={(e) => onUpdate({ calories: parseInt(e.target.value) || 0 })}
              className="mt-1"
            />
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor={`notes-${meal.id}`} className="text-sm text-slate-700">
              Notes (optional)
            </Label>
            <Input
              id={`notes-${meal.id}`}
              placeholder="Add notes for this meal"
              value={meal.notes || ''}
              onChange={(e) => onUpdate({ notes: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ✅ Meal plan selector component
const MealPlanSelector = ({ 
  selectedMeals, 
  onMealsChange 
}: {
  selectedMeals: number;
  onMealsChange: (meals: number) => void;
}) => {
  const selectedPlan = mealPlanOptions.find(p => p.meals === selectedMeals);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="number-of-meals" className="text-base font-medium text-slate-800">
          How many meals do you eat per day?
        </Label>
        <Select
          value={selectedMeals.toString()}
          onValueChange={(value) => onMealsChange(parseInt(value))}
        >
          <SelectTrigger id="number-of-meals" className="mt-2 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500">
            <SelectValue placeholder="Select number of meals" />
          </SelectTrigger>
          <SelectContent>
            {mealPlanOptions.map(option => (
              <SelectItem key={option.meals} value={option.meals.toString()}>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <option.icon className={`w-4 h-4 ${option.color}`} />
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-slate-500">{option.description}</div>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`ml-2 text-xs ${
                      option.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                      option.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}
                  >
                    {option.difficulty}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Plan details */}
      {selectedPlan && (
        <Card className="bg-slate-50">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <selectedPlan.icon className={`w-5 h-5 ${selectedPlan.color}`} />
                <h3 className="font-semibold text-slate-800">{selectedPlan.label}</h3>
              </div>
              
              <p className="text-sm text-slate-600">{selectedPlan.description}</p>
              
              <div>
                <h4 className="font-medium text-slate-800 mb-2">Recommended Times:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPlan.recommended_times.map((time, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {time}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedPlan.benefits.length > 0 && (
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {selectedPlan.benefits.map((benefit, index) => (
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
                  selectedPlan.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                  selectedPlan.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}
              >
                {selectedPlan.difficulty} level
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
        updates.calorie_sms_reminders = enabled;
        break;
      case 'email':
        updates.calorie_email_reminders = enabled;
        break;
      case 'push':
        updates.calorie_push_reminders = enabled;
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
            <div className="flex items-center gap-2">
              <reminder.icon className={`w-4 h-4 ${reminder.color}`} />
              <span className="text-sm font-medium text-slate-700">
                {reminder.label}
              </span>
            </div>
            <div className="ml-auto">
              <Button
                variant={reminder.enabled ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleReminderChange(reminder.type, !reminder.enabled)}
              >
                {reminder.enabled ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-2">
            {reminder.description}
          </p>
          {reminder.type === 'sms' && (
            <p className="text-xs text-slate-500 mt-1">
              Message and data rates may apply.
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

// ✅ Advanced settings component
const AdvancedCalorieSettings = ({ 
  user, 
  onUpdate,
  weekendReminders,
  soundEnabled,
  vibrationEnabled,
  reminderFrequency,
  onWeekendRemindersChange,
  onSoundEnabledChange,
  onVibrationEnabledChange,
  onReminderFrequencyChange
}: {
  user: UserData;
  onUpdate: (data: Partial<UserData>) => void;
  weekendReminders: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  reminderFrequency: 'once' | 'twice' | 'thrice';
  onWeekendRemindersChange: (value: boolean) => void;
  onSoundEnabledChange: (value: boolean) => void;
  onVibrationEnabledChange: (value: boolean) => void;
  onReminderFrequencyChange: (value: 'once' | 'twice' | 'thrice') => void;
}) => {
  const handleAdvancedSettingsUpdate = useCallback(() => {
    onUpdate({
      calorie_reminder_settings: {
        enabled: true,
        sms_enabled: user.calorie_sms_reminders || false,
        email_enabled: user.calorie_email_reminders || false,
        push_enabled: user.calorie_push_reminders || false,
        weekend_reminders: weekendReminders,
        sound_enabled: soundEnabled,
        vibration_enabled: vibrationEnabled,
        reminder_frequency: reminderFrequency
      }
    });
  }, [onUpdate, user, weekendReminders, soundEnabled, vibrationEnabled, reminderFrequency]);

  useEffect(() => {
    handleAdvancedSettingsUpdate();
  }, [handleAdvancedSettingsUpdate]);

  return (
    <Card className="bg-slate-50">
      <CardHeader>
        <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
          <Settings className="w-5 h-5 text-slate-600" />
          Advanced Calorie Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Reminder frequency */}
        <div>
          <Label htmlFor="reminder_frequency">Reminder Frequency</Label>
          <Select value={reminderFrequency} onValueChange={onReminderFrequencyChange}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="once">Once per meal</SelectItem>
              <SelectItem value="twice">Twice per meal</SelectItem>
              <SelectItem value="thrice">Three times per meal</SelectItem>
            </SelectContent>
          </Select>
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

// ✅ Meal stats component
const MealStats = ({ 
  stats 
}: {
  stats: {
    totalMeals: number;
    enabledMeals: number;
    totalCalories: number;
    averageCalories: number;
  };
}) => {
  return (
    <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
      <CardHeader>
        <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-600" />
          Meal Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">{stats.totalMeals}</div>
            <div className="text-xs text-slate-500">Total Meals</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.enabledMeals}</div>
            <div className="text-xs text-slate-500">Enabled</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{stats.totalCalories}</div>
            <div className="text-xs text-slate-500">Total Calories</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{stats.averageCalories}</div>
            <div className="text-xs text-slate-500">Average</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function CalorieReminders({ user, onUpdate }: CalorieRemindersProps) {
  const {
    mealTimes,
    showAdvancedSettings,
    weekendReminders,
    soundEnabled,
    vibrationEnabled,
    reminderFrequency,
    setShowAdvancedSettings,
    setWeekendReminders,
    setSoundEnabled,
    setVibrationEnabled,
    setReminderFrequency,
    updateMealTimes,
    addMealTime,
    removeMealTime,
    updateMealTime,
    getRecommendedTimes,
    validateMealTimes,
    getMealStats
  } = useCalorieRemindersData();

  const handleMealsChange = useCallback((meals: number) => {
    onUpdate({ number_of_meals: meals, calorie_reminder_times: [] });
    
    // Set recommended times for the new meal count
    const recommendedTimes = getRecommendedTimes(meals);
    updateMealTimes(recommendedTimes);
  }, [onUpdate, getRecommendedTimes, updateMealTimes]);

  const handleMealTimeChange = useCallback((index: number, value: string) => {
    const newTimes = [...(user.calorie_reminder_times || [])];
    newTimes[index] = value;
    onUpdate({ calorie_reminder_times: newTimes });
    
    // Update meal times in local state
    updateMealTimes(newTimes);
    
    // Validate meal times
    const validation = validateMealTimes(newTimes);
    if (!validation.valid) {
      // Show validation error
      console.warn(validation.message);
    }
  }, [user.calorie_reminder_times, onUpdate, updateMealTimes, validateMealTimes]);

  const handleAddMeal = useCallback(() => {
    const newMeals = (user.number_of_meals || 0) + 1;
    onUpdate({ number_of_meals: newMeals });
    addMealTime();
  }, [user.number_of_meals, onUpdate, addMealTime]);

  const handleRemoveMeal = useCallback((index: number) => {
    const newMeals = Math.max(1, (user.number_of_meals || 1) - 1);
    onUpdate({ number_of_meals: newMeals });
    removeMealTime(`meal-${index}`);
  }, [user.number_of_meals, onUpdate, removeMealTime]);

  // Check if user has calorie counting enabled
  const hasCalorieCounting = user.dietary_preferences?.includes('calorie_counting');

  if (!hasCalorieCounting) {
    return (
      <div className="text-center py-8">
        <Target className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          Calorie Counting Not Enabled
        </h3>
        <p className="text-slate-500 text-sm mb-4">
          To set up calorie reminders, first select "Calorie Counting" in your Lifestyle & Diet settings.
        </p>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Go to Settings
        </Button>
      </div>
    );
  }

  const mealStats = getMealStats();

  return (
    <div className="space-y-6">
      {/* Meal plan selector */}
      <MealPlanSelector
        selectedMeals={user.number_of_meals || 3}
        onMealsChange={handleMealsChange}
      />

      {/* Meal stats */}
      <MealStats stats={mealStats} />

      {/* Meal time inputs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <Label className="text-base font-medium text-slate-800">
            Set reminder times to log your meals:
          </Label>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddMeal}
            disabled={mealTimes.length >= 6}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Meal
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mealTimes.map((meal, index) => (
            <MealTimeInput
              key={meal.id}
              meal={meal}
              onUpdate={(updates) => updateMealTime(meal.id, updates)}
              onRemove={() => handleRemoveMeal(index)}
              canRemove={mealTimes.length > 1}
            />
          ))}
        </div>
      </div>

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
        <AdvancedCalorieSettings
          user={user}
          onUpdate={onUpdate}
          weekendReminders={weekendReminders}
          soundEnabled={soundEnabled}
          vibrationEnabled={vibrationEnabled}
          reminderFrequency={reminderFrequency}
          onWeekendRemindersChange={setWeekendReminders}
          onSoundEnabledChange={setSoundEnabled}
          onVibrationEnabledChange={setVibrationEnabled}
          onReminderFrequencyChange={setReminderFrequency}
        />
      )}
    </div>
  );
}
