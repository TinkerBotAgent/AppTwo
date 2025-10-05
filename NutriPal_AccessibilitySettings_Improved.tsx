import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { User } from '@/entities/User';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Palette,
  Volume2,
  VolumeX,
  Eye,
  Sun,
  Moon,
  Accessibility,
  Loader2,
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
  Bell,
  BellOff,
  Edit3,
  Trash2 as Trash2Icon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Lock as LockIcon,
  Unlock as UnlockIcon,
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
  accessibility_settings?: AccessibilitySettings;
  profile_completed?: boolean;
  subscription_tier?: 'basic' | 'pro' | 'family';
}

interface AccessibilitySettings {
  // Visual Settings
  dark_mode?: boolean;
  high_contrast?: boolean;
  font_size?: number;
  colorblind_mode?: 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia' | 'monochromacy';
  
  // Audio Settings
  sound_effects?: boolean;
  sound_volume?: number;
  screen_reader?: boolean;
  voice_feedback?: boolean;
  
  // Motion Settings
  reduce_motion?: boolean;
  
  // Additional Settings
  keyboard_navigation?: boolean;
  focus_indicators?: boolean;
  large_touch_targets?: boolean;
  auto_play_media?: boolean;
  notification_sounds?: boolean;
  haptic_feedback?: boolean;
  text_to_speech?: boolean;
  speech_rate?: number;
  language?: string;
  timezone?: string;
}

interface AccessibilitySettingsProps {
  user: UserData;
  onUpdate?: (settings: AccessibilitySettings) => void;
  showPreview?: boolean;
  showReset?: boolean;
  compact?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

interface AccessibilityScore {
  overall: number;
  visual: number;
  audio: number;
  motor: number;
  cognitive: number;
  recommendations: string[];
}

// ✅ Custom hook for accessibility settings management
const useAccessibilitySettings = (user: UserData) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(user.accessibility_settings || {});
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [accessibilityScore, setAccessibilityScore] = useState<AccessibilityScore>({
    overall: 0,
    visual: 0,
    audio: 0,
    motor: 0,
    cognitive: 0,
    recommendations: []
  });
  const { toast } = useToast();

  // ✅ Calculate accessibility score
  const calculateAccessibilityScore = useCallback(() => {
    const visualScore = [
      settings.dark_mode ? 20 : 0,
      settings.high_contrast ? 20 : 0,
      settings.font_size && settings.font_size >= 16 ? 20 : 0,
      settings.colorblind_mode !== 'none' ? 20 : 0,
      settings.focus_indicators ? 20 : 0
    ].reduce((sum, score) => sum + score, 0);

    const audioScore = [
      settings.sound_effects ? 25 : 0,
      settings.screen_reader ? 25 : 0,
      settings.voice_feedback ? 25 : 0,
      settings.text_to_speech ? 25 : 0
    ].reduce((sum, score) => sum + score, 0);

    const motorScore = [
      settings.large_touch_targets ? 33 : 0,
      settings.keyboard_navigation ? 33 : 0,
      settings.haptic_feedback ? 34 : 0
    ].reduce((sum, score) => sum + score, 0);

    const cognitiveScore = [
      settings.reduce_motion ? 25 : 0,
      settings.auto_play_media === false ? 25 : 0,
      settings.notification_sounds ? 25 : 0,
      settings.speech_rate && settings.speech_rate > 0 ? 25 : 0
    ].reduce((sum, score) => sum + score, 0);

    const overall = Math.round((visualScore + audioScore + motorScore + cognitiveScore) / 4);

    const recommendations: string[] = [];
    if (visualScore < 60) recommendations.push('Enable high contrast mode for better visibility');
    if (audioScore < 50) recommendations.push('Turn on sound effects for better feedback');
    if (motorScore < 50) recommendations.push('Enable large touch targets for easier interaction');
    if (cognitiveScore < 50) recommendations.push('Reduce motion for better focus');

    setAccessibilityScore({
      overall,
      visual: visualScore,
      audio: audioScore,
      motor: motorScore,
      cognitive: cognitiveScore,
      recommendations
    });
  }, [settings]);

  // ✅ Update setting
  const updateSetting = useCallback(async (field: keyof AccessibilitySettings, value: any) => {
    const newSettings = { ...settings, [field]: value };
    setSettings(newSettings);
    setHasUnsavedChanges(true);

    // Auto-save after a delay
    setTimeout(async () => {
      try {
        setIsLoading(true);
        await User.updateMyUserData({ accessibility_settings: newSettings });
        setHasUnsavedChanges(false);
        toast({
          title: "Settings Updated",
          description: "Your accessibility preferences have been saved.",
          duration: 2000,
        });
      } catch (error) {
        console.error("Error updating accessibility settings:", error);
        toast({
          title: "Update Failed",
          description: "Failed to save your accessibility settings. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  }, [settings, toast]);

  // ✅ Reset to defaults
  const resetToDefaults = useCallback(async () => {
    const defaultSettings: AccessibilitySettings = {
      dark_mode: false,
      high_contrast: false,
      font_size: 16,
      colorblind_mode: 'none',
      sound_effects: true,
      sound_volume: 0.7,
      screen_reader: false,
      voice_feedback: false,
      reduce_motion: false,
      keyboard_navigation: true,
      focus_indicators: true,
      large_touch_targets: false,
      auto_play_media: true,
      notification_sounds: true,
      haptic_feedback: false,
      text_to_speech: false,
      speech_rate: 1.0
    };

    try {
      setIsLoading(true);
      await User.updateMyUserData({ accessibility_settings: defaultSettings });
      setSettings(defaultSettings);
      setHasUnsavedChanges(false);
      toast({
        title: "Settings Reset",
        description: "Accessibility settings have been reset to defaults.",
        duration: 2000,
      });
    } catch (error) {
      console.error("Error resetting settings:", error);
      toast({
        title: "Reset Failed",
        description: "Failed to reset your settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // ✅ Apply settings to document
  const applySettingsToDocument = useCallback(() => {
    const root = document.documentElement;
    
    // Apply visual settings
    if (settings.dark_mode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    if (settings.high_contrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    if (settings.font_size) {
      root.style.fontSize = `${settings.font_size}px`;
    }
    
    if (settings.colorblind_mode !== 'none') {
      root.classList.add(`colorblind-${settings.colorblind_mode}`);
    } else {
      root.classList.remove('colorblind-deuteranopia', 'colorblind-protanopia', 'colorblind-tritanopia', 'colorblind-monochromacy');
    }
    
    if (settings.reduce_motion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, [settings]);

  // ✅ Load initial settings
  useEffect(() => {
    setSettings(user.accessibility_settings || {});
  }, [user.accessibility_settings]);

  // ✅ Calculate score and apply settings
  useEffect(() => {
    calculateAccessibilityScore();
    applySettingsToDocument();
  }, [calculateAccessibilityScore, applySettingsToDocument]);

  return {
    settings,
    isLoading,
    hasUnsavedChanges,
    showPreview,
    setShowPreview,
    accessibilityScore,
    updateSetting,
    resetToDefaults
  };
};

// ✅ Accessibility score component
const AccessibilityScoreCard = ({ score }: { score: AccessibilityScore }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <Card className={`${getScoreBg(score.overall)} border-2`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-600" />
          Accessibility Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Score */}
        <div className="text-center">
          <div className={`text-4xl font-bold ${getScoreColor(score.overall)}`}>
            {score.overall}/100
          </div>
          <p className="text-sm text-slate-600 mt-1">
            {score.overall >= 80 ? 'Excellent' : score.overall >= 60 ? 'Good' : 'Needs Improvement'}
          </p>
        </div>

        {/* Category Scores */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-white/50 rounded">
            <div className="text-lg font-semibold text-blue-600">{score.visual}</div>
            <div className="text-xs text-slate-600">Visual</div>
          </div>
          <div className="text-center p-2 bg-white/50 rounded">
            <div className="text-lg font-semibold text-green-600">{score.audio}</div>
            <div className="text-xs text-slate-600">Audio</div>
          </div>
          <div className="text-center p-2 bg-white/50 rounded">
            <div className="text-lg font-semibold text-purple-600">{score.motor}</div>
            <div className="text-xs text-slate-600">Motor</div>
          </div>
          <div className="text-center p-2 bg-white/50 rounded">
            <div className="text-lg font-semibold text-amber-600">{score.cognitive}</div>
            <div className="text-xs text-slate-600">Cognitive</div>
          </div>
        </div>

        {/* Recommendations */}
        {score.recommendations.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-700 mb-2">Recommendations</h4>
            <div className="space-y-1">
              {score.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-slate-600">
                  <Info className="w-3 h-3 text-blue-500 mt-0.5" />
                  {rec}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function AccessibilitySettings({ 
  user, 
  onUpdate,
  showPreview = true,
  showReset = true,
  compact = false,
  variant = 'default'
}: AccessibilitySettingsProps) {
  const {
    settings,
    isLoading,
    hasUnsavedChanges,
    showPreview: showPreviewState,
    setShowPreview,
    accessibilityScore,
    updateSetting,
    resetToDefaults
  } = useAccessibilitySettings(user);

  // ✅ Handle setting update
  const handleSettingUpdate = useCallback((field: keyof AccessibilitySettings, value: any) => {
    updateSetting(field, value);
    onUpdate?.(settings);
  }, [updateSetting, settings, onUpdate]);

  if (compact) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Accessibility className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-slate-700">Accessibility</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark_mode">Dark Mode</Label>
            <Switch
              id="dark_mode"
              checked={settings.dark_mode === true}
              onCheckedChange={(checked) => handleSettingUpdate('dark_mode', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sound_effects">Sound Effects</Label>
            <Switch
              id="sound_effects"
              checked={settings.sound_effects === true}
              onCheckedChange={(checked) => handleSettingUpdate('sound_effects', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="high_contrast">High Contrast</Label>
            <Switch
              id="high_contrast"
              checked={settings.high_contrast === true}
              onCheckedChange={(checked) => handleSettingUpdate('high_contrast', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="reduce_motion">Reduce Motion</Label>
            <Switch
              id="reduce_motion"
              checked={settings.reduce_motion === true}
              onCheckedChange={(checked) => handleSettingUpdate('reduce_motion', checked)}
            />
          </div>
        </div>

        {hasUnsavedChanges && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Unsaved Changes</AlertTitle>
            <AlertDescription>
              You have unsaved changes. Settings will be saved automatically.
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Accessibility className="w-6 h-6 text-emerald-600" />
          <h3 className="text-lg font-semibold text-slate-700">Accessibility & Preferences</h3>
        </div>
        <div className="flex items-center gap-2">
          {showPreview && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreviewState)}
            >
              {showPreviewState ? 'Hide' : 'Show'} Preview
            </Button>
          )}
          {showReset && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetToDefaults}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Accessibility Score */}
      {showPreviewState && (
        <AccessibilityScoreCard score={accessibilityScore} />
      )}

      {/* Visual Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Visual Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dark_mode">Dark Mode</Label>
              <p className="text-sm text-slate-500">Easier on the eyes in low light</p>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-yellow-500" />
              <Switch
                id="dark_mode"
                checked={settings.dark_mode === true}
                onCheckedChange={(checked) => handleSettingUpdate('dark_mode', checked)}
              />
              <Moon className="w-4 h-4 text-slate-600" />
            </div>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="high_contrast">High Contrast Mode</Label>
              <p className="text-sm text-slate-500">Enhanced visibility for low vision</p>
            </div>
            <Switch
              id="high_contrast"
              checked={settings.high_contrast === true}
              onCheckedChange={(checked) => handleSettingUpdate('high_contrast', checked)}
            />
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <Label>Font Size: {settings.font_size || 16}px</Label>
            <Slider
              value={[settings.font_size || 16]}
              onValueChange={(value) => handleSettingUpdate('font_size', value[0])}
              max={24}
              min={12}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>Small (12px)</span>
              <span>Large (24px)</span>
            </div>
          </div>

          {/* Colorblind Support */}
          <div className="space-y-2">
            <Label htmlFor="colorblind_mode">Colorblind Support</Label>
            <Select
              value={settings.colorblind_mode || "none"}
              onValueChange={(value) => handleSettingUpdate('colorblind_mode', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No adjustment</SelectItem>
                <SelectItem value="deuteranopia">Deuteranopia (Red-Green)</SelectItem>
                <SelectItem value="protanopia">Protanopia (Red-Green)</SelectItem>
                <SelectItem value="tritanopia">Tritanopia (Blue-Yellow)</SelectItem>
                <SelectItem value="monochromacy">Monochromacy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Focus Indicators */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="focus_indicators">Enhanced Focus Indicators</Label>
              <p className="text-sm text-slate-500">Better keyboard navigation visibility</p>
            </div>
            <Switch
              id="focus_indicators"
              checked={settings.focus_indicators === true}
              onCheckedChange={(checked) => handleSettingUpdate('focus_indicators', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Audio Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Audio & Sound
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Sound Effects */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sound_effects">Sound Effects</Label>
              <p className="text-sm text-slate-500">Button clicks, swipe sounds, notifications</p>
            </div>
            <div className="flex items-center gap-2">
              <VolumeX className="w-4 h-4 text-slate-400" />
              <Switch
                id="sound_effects"
                checked={settings.sound_effects === true}
                onCheckedChange={(checked) => handleSettingUpdate('sound_effects', checked)}
              />
              <Volume2 className="w-4 h-4 text-emerald-600" />
            </div>
          </div>

          {/* Sound Volume */}
          <div className="space-y-2">
            <Label>Sound Volume: {Math.round((settings.sound_volume || 0.7) * 100)}%</Label>
            <Slider
              value={[settings.sound_volume || 0.7]}
              onValueChange={(value) => handleSettingUpdate('sound_volume', value[0])}
              max={1}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Screen Reader */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="screen_reader">Enhanced Screen Reader Support</Label>
              <p className="text-sm text-slate-500">Additional ARIA labels and descriptions</p>
            </div>
            <Switch
              id="screen_reader"
              checked={settings.screen_reader === true}
              onCheckedChange={(checked) => handleSettingUpdate('screen_reader', checked)}
            />
          </div>

          {/* Voice Feedback */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="voice_feedback">Voice Feedback</Label>
              <p className="text-sm text-slate-500">Spoken confirmations for important actions</p>
            </div>
            <Switch
              id="voice_feedback"
              checked={settings.voice_feedback === true}
              onCheckedChange={(checked) => handleSettingUpdate('voice_feedback', checked)}
            />
          </div>

          {/* Text to Speech */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="text_to_speech">Text to Speech</Label>
              <p className="text-sm text-slate-500">Read content aloud</p>
            </div>
            <Switch
              id="text_to_speech"
              checked={settings.text_to_speech === true}
              onCheckedChange={(checked) => handleSettingUpdate('text_to_speech', checked)}
            />
          </div>

          {/* Speech Rate */}
          {settings.text_to_speech && (
            <div className="space-y-2">
              <Label>Speech Rate: {settings.speech_rate || 1.0}x</Label>
              <Slider
                value={[settings.speech_rate || 1.0]}
                onValueChange={(value) => handleSettingUpdate('speech_rate', value[0])}
                max={2}
                min={0.5}
                step={0.1}
                className="w-full"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Motion & Interaction Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <MousePointer className="w-5 h-5" />
            Motion & Interaction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Reduce Motion */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="reduce_motion">Reduce Motion</Label>
              <p className="text-sm text-slate-500">Minimize animations and transitions</p>
            </div>
            <Switch
              id="reduce_motion"
              checked={settings.reduce_motion === true}
              onCheckedChange={(checked) => handleSettingUpdate('reduce_motion', checked)}
            />
          </div>

          {/* Large Touch Targets */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="large_touch_targets">Large Touch Targets</Label>
              <p className="text-sm text-slate-500">Easier to tap on mobile devices</p>
            </div>
            <Switch
              id="large_touch_targets"
              checked={settings.large_touch_targets === true}
              onCheckedChange={(checked) => handleSettingUpdate('large_touch_targets', checked)}
            />
          </div>

          {/* Keyboard Navigation */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="keyboard_navigation">Enhanced Keyboard Navigation</Label>
              <p className="text-sm text-slate-500">Better keyboard shortcuts and navigation</p>
            </div>
            <Switch
              id="keyboard_navigation"
              checked={settings.keyboard_navigation === true}
              onCheckedChange={(checked) => handleSettingUpdate('keyboard_navigation', checked)}
            />
          </div>

          {/* Haptic Feedback */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="haptic_feedback">Haptic Feedback</Label>
              <p className="text-sm text-slate-500">Vibration feedback on mobile devices</p>
            </div>
            <Switch
              id="haptic_feedback"
              checked={settings.haptic_feedback === true}
              onCheckedChange={(checked) => handleSettingUpdate('haptic_feedback', checked)}
            />
          </div>
        </CardContent>
      </Card>

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
