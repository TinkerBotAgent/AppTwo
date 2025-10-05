import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { User } from '@/entities/User';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  User as UserIcon,
  Calendar,
  Scale,
  Ruler,
  Activity,
  Heart,
  Target,
  Check,
  X,
  AlertTriangle,
  Info,
  RefreshCw,
  Settings,
  Shield,
  ShieldCheck,
  Zap,
  Sparkles,
  Crown,
  Gem,
  Medal,
  TrendingUp,
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
  User as UserIconAlt,
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
import { useToast } from '@/components/ui/use-toast';

// ✅ Type Definitions
interface UserData {
  id: string;
  age?: number;
  gender?: 'male' | 'female' | 'non_binary' | 'prefer_not_to_say';
  height_feet?: number;
  height_inches?: number;
  weight?: number;
  activity_level?: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active';
  profile_completed?: boolean;
  subscription_tier?: 'basic' | 'pro' | 'family';
}

interface BasicInfoProps {
  user: UserData;
  onUpdate?: (updates: Partial<UserData>) => void;
  showCalculations?: boolean;
  showValidation?: boolean;
  compact?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
  onComplete?: () => void;
}

interface HealthMetrics {
  bmi: number;
  bmiCategory: string;
  idealWeightRange: { min: number; max: number };
  caloriesPerDay: { maintenance: number; weightLoss: number; weightGain: number };
  completionRate: number;
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

interface FormField {
  id: keyof UserData;
  label: string;
  type: 'number' | 'select';
  placeholder: string;
  min?: number;
  max?: number;
  required: boolean;
  icon: React.ComponentType<any>;
  options?: Array<{ value: string; label: string; description?: string }>;
}

// ✅ Form field configurations
const FORM_FIELDS: FormField[] = [
  {
    id: 'age',
    label: 'Age',
    type: 'number',
    placeholder: '25',
    min: 1,
    max: 120,
    required: true,
    icon: Calendar
  },
  {
    id: 'gender',
    label: 'Gender',
    type: 'select',
    placeholder: 'Select gender',
    required: true,
    icon: UserIcon,
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'non_binary', label: 'Non-binary' },
      { value: 'prefer_not_to_say', label: 'Prefer not to say' }
    ]
  },
  {
    id: 'height_feet',
    label: 'Height (feet)',
    type: 'number',
    placeholder: '5',
    min: 3,
    max: 8,
    required: true,
    icon: Ruler
  },
  {
    id: 'height_inches',
    label: 'Height (inches)',
    type: 'number',
    placeholder: '8',
    min: 0,
    max: 11,
    required: true,
    icon: Ruler
  },
  {
    id: 'weight',
    label: 'Weight (lbs)',
    type: 'number',
    placeholder: '150',
    min: 50,
    max: 500,
    required: true,
    icon: Scale
  },
  {
    id: 'activity_level',
    label: 'Activity Level',
    type: 'select',
    placeholder: 'Select activity level',
    required: true,
    icon: Activity,
    options: [
      { 
        value: 'sedentary', 
        label: 'Sedentary', 
        description: 'Little to no exercise' 
      },
      { 
        value: 'lightly_active', 
        label: 'Lightly Active', 
        description: '1-3 days per week' 
      },
      { 
        value: 'moderately_active', 
        label: 'Moderately Active', 
        description: '3-5 days per week' 
      },
      { 
        value: 'very_active', 
        label: 'Very Active', 
        description: '6-7 days per week' 
      },
      { 
        value: 'extremely_active', 
        label: 'Extremely Active', 
        description: '2x per day, intense' 
      }
    ]
  }
];

// ✅ Custom hook for basic info management
const useBasicInfo = (user: UserData) => {
  const [formData, setFormData] = useState<UserData>(user);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics>({
    bmi: 0,
    bmiCategory: '',
    idealWeightRange: { min: 0, max: 0 },
    caloriesPerDay: { maintenance: 0, weightLoss: 0, weightGain: 0 },
    completionRate: 0,
    isValid: false,
    errors: [],
    warnings: []
  });
  const { toast } = useToast();

  // ✅ Calculate health metrics
  const calculateHealthMetrics = useCallback((): HealthMetrics => {
    const { age, gender, height_feet, height_inches, weight, activity_level } = formData;
    
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Calculate completion rate
    const requiredFields = FORM_FIELDS.filter(field => field.required);
    const completedFields = requiredFields.filter(field => formData[field.id] !== undefined && formData[field.id] !== '');
    const completionRate = (completedFields.length / requiredFields.length) * 100;
    
    // Basic validation
    if (!age || age < 1 || age > 120) {
      errors.push('Please enter a valid age between 1 and 120');
    }
    
    if (!gender) {
      errors.push('Please select your gender');
    }
    
    if (!height_feet || height_feet < 3 || height_feet > 8) {
      errors.push('Please enter a valid height in feet');
    }
    
    if (height_inches === undefined || height_inches < 0 || height_inches > 11) {
      errors.push('Please enter a valid height in inches');
    }
    
    if (!weight || weight < 50 || weight > 500) {
      errors.push('Please enter a valid weight between 50 and 500 lbs');
    }
    
    if (!activity_level) {
      errors.push('Please select your activity level');
    }
    
    // Calculate BMI if we have height and weight
    let bmi = 0;
    let bmiCategory = '';
    let idealWeightRange = { min: 0, max: 0 };
    
    if (height_feet && height_inches !== undefined && weight) {
      const totalHeightInches = height_feet * 12 + height_inches;
      const heightInMeters = totalHeightInches * 0.0254;
      const weightInKg = weight * 0.453592;
      
      bmi = weightInKg / (heightInMeters * heightInMeters);
      
      if (bmi < 18.5) {
        bmiCategory = 'Underweight';
      } else if (bmi < 25) {
        bmiCategory = 'Normal weight';
      } else if (bmi < 30) {
        bmiCategory = 'Overweight';
      } else {
        bmiCategory = 'Obese';
      }
      
      // Calculate ideal weight range (BMI 18.5-24.9)
      const minBMI = 18.5;
      const maxBMI = 24.9;
      idealWeightRange.min = Math.round((minBMI * heightInMeters * heightInMeters) / 0.453592);
      idealWeightRange.max = Math.round((maxBMI * heightInMeters * heightInMeters) / 0.453592);
      
      if (bmi < 18.5) {
        warnings.push('Your BMI suggests you may be underweight. Consider consulting a healthcare provider.');
      } else if (bmi > 30) {
        warnings.push('Your BMI suggests you may be obese. Consider consulting a healthcare provider.');
      }
    }
    
    // Calculate calories if we have all required data
    let caloriesPerDay = { maintenance: 0, weightLoss: 0, weightGain: 0 };
    
    if (age && gender && height_feet && height_inches !== undefined && weight && activity_level) {
      const totalHeightInches = height_feet * 12 + height_inches;
      const heightInCm = totalHeightInches * 2.54;
      const weightInKg = weight * 0.453592;
      
      // BMR calculation (Mifflin-St Jeor Equation)
      let bmr: number;
      if (gender === 'male') {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
      } else {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
      }
      
      // Activity multipliers
      const activityMultipliers = {
        sedentary: 1.2,
        lightly_active: 1.375,
        moderately_active: 1.55,
        very_active: 1.725,
        extremely_active: 1.9
      };
      
      const maintenanceCalories = Math.round(bmr * activityMultipliers[activity_level]);
      caloriesPerDay = {
        maintenance: maintenanceCalories,
        weightLoss: Math.round(maintenanceCalories - 500), // 500 calorie deficit
        weightGain: Math.round(maintenanceCalories + 500)  // 500 calorie surplus
      };
    }
    
    return {
      bmi,
      bmiCategory,
      idealWeightRange,
      caloriesPerDay,
      completionRate,
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }, [formData]);

  // ✅ Update form data
  const updateFormData = useCallback(async (field: keyof UserData, value: any) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    setHasUnsavedChanges(true);

    // Auto-save after a delay
    setTimeout(async () => {
      try {
        setIsLoading(true);
        await User.updateMyUserData(newFormData);
        setHasUnsavedChanges(false);
        toast({
          title: "Information Updated",
          description: "Your basic information has been saved.",
          duration: 2000,
        });
      } catch (error) {
        console.error("Error updating basic info:", error);
        toast({
          title: "Update Failed",
          description: "Failed to save your information. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  }, [formData, toast]);

  // ✅ Calculate health metrics when form data changes
  useEffect(() => {
    const metrics = calculateHealthMetrics();
    setHealthMetrics(metrics);
  }, [calculateHealthMetrics]);

  return {
    formData,
    isLoading,
    hasUnsavedChanges,
    healthMetrics,
    updateFormData
  };
};

// ✅ Health metrics display component
const HealthMetricsDisplay = ({ metrics }: { metrics: HealthMetrics }) => {
  if (!metrics.isValid) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-600" />
          Health Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* BMI */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {metrics.bmi.toFixed(1)}
            </div>
            <div className="text-xs text-blue-600">BMI</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-sm font-semibold text-green-600">
              {metrics.bmiCategory}
            </div>
            <div className="text-xs text-green-600">Category</div>
          </div>
        </div>

        {/* Ideal Weight Range */}
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-lg font-semibold text-purple-600">
            {metrics.idealWeightRange.min} - {metrics.idealWeightRange.max} lbs
          </div>
          <div className="text-xs text-purple-600">Ideal Weight Range</div>
        </div>

        {/* Daily Calories */}
        <div>
          <h4 className="font-semibold text-slate-700 mb-2">Daily Calorie Needs</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Weight Loss</span>
              <Badge variant="outline" className="text-red-600">
                {metrics.caloriesPerDay.weightLoss} cal
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Maintenance</span>
              <Badge variant="outline" className="text-blue-600">
                {metrics.caloriesPerDay.maintenance} cal
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Weight Gain</span>
              <Badge variant="outline" className="text-green-600">
                {metrics.caloriesPerDay.weightGain} cal
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ✅ Form field component
const FormFieldComponent = ({ 
  field, 
  value, 
  onUpdate, 
  isLoading 
}: {
  field: FormField;
  value: any;
  onUpdate: (value: any) => void;
  isLoading: boolean;
}) => {
  const Icon = field.icon;

  if (field.type === 'select' && field.options) {
    return (
      <div className="space-y-2">
        <Label htmlFor={field.id} className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-slate-500" />
          {field.label}
        </Label>
        <Select
          value={value || ''}
          onValueChange={onUpdate}
        >
          <SelectTrigger className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500">
            <SelectValue placeholder={field.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div>
                  <div className="font-medium">{option.label}</div>
                  {option.description && (
                    <div className="text-xs text-slate-500">{option.description}</div>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={field.id} className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-slate-500" />
        {field.label}
      </Label>
      <Input
        id={field.id}
        type={field.type}
        value={value || ''}
        onChange={(e) => onUpdate(field.type === 'number' ? parseInt(e.target.value) || undefined : e.target.value)}
        placeholder={field.placeholder}
        min={field.min}
        max={field.max}
        disabled={isLoading}
        className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
      />
    </div>
  );
};

export default function BasicInfo({ 
  user, 
  onUpdate,
  showCalculations = true,
  showValidation = true,
  compact = false,
  variant = 'default',
  onComplete
}: BasicInfoProps) {
  const {
    formData,
    isLoading,
    hasUnsavedChanges,
    healthMetrics,
    updateFormData
  } = useBasicInfo(user);

  // ✅ Handle field update
  const handleFieldUpdate = useCallback((field: keyof UserData, value: any) => {
    updateFormData(field, value);
    onUpdate?.({ [field]: value });
  }, [updateFormData, onUpdate]);

  // ✅ Handle completion
  useEffect(() => {
    if (healthMetrics.isValid && healthMetrics.completionRate === 100) {
      onComplete?.();
    }
  }, [healthMetrics.isValid, healthMetrics.completionRate, onComplete]);

  if (compact) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-slate-700">Basic Information</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormFieldComponent
            field={FORM_FIELDS[0]} // Age
            value={formData.age}
            onUpdate={(value) => handleFieldUpdate('age', value)}
            isLoading={isLoading}
          />
          <FormFieldComponent
            field={FORM_FIELDS[1]} // Gender
            value={formData.gender}
            onUpdate={(value) => handleFieldUpdate('gender', value)}
            isLoading={isLoading}
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <FormFieldComponent
            field={FORM_FIELDS[2]} // Height feet
            value={formData.height_feet}
            onUpdate={(value) => handleFieldUpdate('height_feet', value)}
            isLoading={isLoading}
          />
          <FormFieldComponent
            field={FORM_FIELDS[3]} // Height inches
            value={formData.height_inches}
            onUpdate={(value) => handleFieldUpdate('height_inches', value)}
            isLoading={isLoading}
          />
          <FormFieldComponent
            field={FORM_FIELDS[4]} // Weight
            value={formData.weight}
            onUpdate={(value) => handleFieldUpdate('weight', value)}
            isLoading={isLoading}
          />
        </div>

        <FormFieldComponent
          field={FORM_FIELDS[5]} // Activity level
          value={formData.activity_level}
          onUpdate={(value) => handleFieldUpdate('activity_level', value)}
          isLoading={isLoading}
        />

        {/* Completion indicator */}
        <div className="text-center">
          <Badge variant="outline" className="text-xs">
            {Math.round(healthMetrics.completionRate)}% Complete
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <UserIcon className="w-6 h-6 text-emerald-600" />
        <h3 className="text-lg font-semibold text-slate-700">Basic Information</h3>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Profile Completion</span>
          <span className="text-slate-500">{Math.round(healthMetrics.completionRate)}%</span>
        </div>
        <Progress value={healthMetrics.completionRate} className="h-2" />
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Age and Gender */}
        <div className="space-y-4">
          <FormFieldComponent
            field={FORM_FIELDS[0]} // Age
            value={formData.age}
            onUpdate={(value) => handleFieldUpdate('age', value)}
            isLoading={isLoading}
          />
          <FormFieldComponent
            field={FORM_FIELDS[1]} // Gender
            value={formData.gender}
            onUpdate={(value) => handleFieldUpdate('gender', value)}
            isLoading={isLoading}
          />
        </div>

        {/* Height and Weight */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <FormFieldComponent
              field={FORM_FIELDS[2]} // Height feet
              value={formData.height_feet}
              onUpdate={(value) => handleFieldUpdate('height_feet', value)}
              isLoading={isLoading}
            />
            <FormFieldComponent
              field={FORM_FIELDS[3]} // Height inches
              value={formData.height_inches}
              onUpdate={(value) => handleFieldUpdate('height_inches', value)}
              isLoading={isLoading}
            />
          </div>
          <FormFieldComponent
            field={FORM_FIELDS[4]} // Weight
            value={formData.weight}
            onUpdate={(value) => handleFieldUpdate('weight', value)}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Activity Level */}
      <FormFieldComponent
        field={FORM_FIELDS[5]} // Activity level
        value={formData.activity_level}
        onUpdate={(value) => handleFieldUpdate('activity_level', value)}
        isLoading={isLoading}
      />

      {/* Health Metrics */}
      {showCalculations && healthMetrics.isValid && (
        <HealthMetricsDisplay metrics={healthMetrics} />
      )}

      {/* Validation Messages */}
      {showValidation && (healthMetrics.errors.length > 0 || healthMetrics.warnings.length > 0) && (
        <div className="space-y-2">
          {healthMetrics.errors.map((error, index) => (
            <Alert key={index} variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ))}
          {healthMetrics.warnings.map((warning, index) => (
            <Alert key={index} className="bg-yellow-50 border-yellow-200">
              <Info className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-700">{warning}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Unsaved Changes Warning */}
      {hasUnsavedChanges && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Unsaved Changes</AlertTitle>
          <AlertDescription>
            You have unsaved changes. Settings will be saved automatically in a moment.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
