import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { User } from '@/entities/User';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ArrowLeft, 
  Save, 
  Accessibility,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Volume1,
  VolumeHigh,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Settings,
  Palette,
  Type,
  MousePointer,
  Keyboard,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  AlertTriangle,
  CheckCircle,
  Info,
  Loader2,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Plus,
  X,
  Edit3,
  Calendar,
  Clock,
  Star,
  Award,
  Target,
  Heart,
  Brain,
  Zap,
  Bell,
  Shield,
  ShieldCheck,
  KeyRound,
  Fingerprint,
  QrCode,
  Database,
  HardDrive,
  Wifi,
  WifiOff,
  Activity,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  Users,
  UserCheck,
  UserX,
  LogOut,
  Download as DownloadIcon,
  Upload as UploadIcon
} from 'lucide-react';

// ✅ Type Definitions
interface UserData {
  id: string;
  accessibility?: {
    high_contrast: boolean;
    large_text: boolean;
    reduced_motion: boolean;
    screen_reader: boolean;
    color_blind_support: boolean;
    font_size: 'small' | 'medium' | 'large' | 'extra-large';
    color_scheme: 'light' | 'dark' | 'auto';
    contrast_ratio: 'normal' | 'high' | 'maximum';
    text_spacing: 'normal' | 'wide' | 'extra-wide';
    line_height: 'normal' | 'relaxed' | 'loose';
    focus_indicators: 'normal' | 'high' | 'maximum';
    keyboard_navigation: boolean;
    voice_navigation: boolean;
    audio_descriptions: boolean;
    captions: boolean;
    sign_language: boolean;
    magnification: number;
    cursor_size: 'normal' | 'large' | 'extra-large';
    click_targets: 'normal' | 'large' | 'extra-large';
    animations: 'all' | 'reduced' | 'none';
    transitions: 'all' | 'reduced' | 'none';
    hover_effects: 'all' | 'reduced' | 'none';
    sound_effects: 'all' | 'reduced' | 'none';
    vibration: 'all' | 'reduced' | 'none';
    notifications: {
      visual: boolean;
      audio: boolean;
      haptic: boolean;
      duration: 'short' | 'medium' | 'long';
    };
    input_methods: {
      keyboard: boolean;
      mouse: boolean;
      touch: boolean;
      voice: boolean;
      switch_control: boolean;
      eye_tracking: boolean;
    };
    assistive_technologies: {
      screen_reader: boolean;
      voice_control: boolean;
      switch_control: boolean;
      eye_tracking: boolean;
      mouth_stick: boolean;
      head_pointer: boolean;
    };
  };
  profile_completed?: boolean;
}

interface FormData {
  high_contrast: boolean;
  large_text: boolean;
  reduced_motion: boolean;
  screen_reader: boolean;
  color_blind_support: boolean;
  font_size: string;
  color_scheme: string;
  contrast_ratio: string;
  text_spacing: string;
  line_height: string;
  focus_indicators: string;
  keyboard_navigation: boolean;
  voice_navigation: boolean;
  audio_descriptions: boolean;
  captions: boolean;
  sign_language: boolean;
  magnification: number;
  cursor_size: string;
  click_targets: string;
  animations: string;
  transitions: string;
  hover_effects: string;
  sound_effects: string;
  vibration: string;
  notifications: {
    visual: boolean;
    audio: boolean;
    haptic: boolean;
    duration: string;
  };
  input_methods: {
    keyboard: boolean;
    mouse: boolean;
    touch: boolean;
    voice: boolean;
    switch_control: boolean;
    eye_tracking: boolean;
  };
  assistive_technologies: {
    screen_reader: boolean;
    voice_control: boolean;
    switch_control: boolean;
    eye_tracking: boolean;
    mouth_stick: boolean;
    head_pointer: boolean;
  };
}

interface FormErrors {
  [key: string]: string;
}

// ✅ Custom hook for accessibility form management
const useAccessibilityForm = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    high_contrast: false,
    large_text: false,
    reduced_motion: false,
    screen_reader: false,
    color_blind_support: false,
    font_size: 'medium',
    color_scheme: 'auto',
    contrast_ratio: 'normal',
    text_spacing: 'normal',
    line_height: 'normal',
    focus_indicators: 'normal',
    keyboard_navigation: true,
    voice_navigation: false,
    audio_descriptions: false,
    captions: false,
    sign_language: false,
    magnification: 100,
    cursor_size: 'normal',
    click_targets: 'normal',
    animations: 'all',
    transitions: 'all',
    hover_effects: 'all',
    sound_effects: 'all',
    vibration: 'all',
    notifications: {
      visual: true,
      audio: true,
      haptic: false,
      duration: 'medium'
    },
    input_methods: {
      keyboard: true,
      mouse: true,
      touch: true,
      voice: false,
      switch_control: false,
      eye_tracking: false
    },
    assistive_technologies: {
      screen_reader: false,
      voice_control: false,
      switch_control: false,
      eye_tracking: false,
      mouth_stick: false,
      head_pointer: false
    }
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { toast } = useToast();

  const loadUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const userData = await User.me();
      setUser(userData);
      
      // Populate form with user data
      if (userData.accessibility) {
        setFormData({
          high_contrast: userData.accessibility.high_contrast || false,
          large_text: userData.accessibility.large_text || false,
          reduced_motion: userData.accessibility.reduced_motion || false,
          screen_reader: userData.accessibility.screen_reader || false,
          color_blind_support: userData.accessibility.color_blind_support || false,
          font_size: userData.accessibility.font_size || 'medium',
          color_scheme: userData.accessibility.color_scheme || 'auto',
          contrast_ratio: userData.accessibility.contrast_ratio || 'normal',
          text_spacing: userData.accessibility.text_spacing || 'normal',
          line_height: userData.accessibility.line_height || 'normal',
          focus_indicators: userData.accessibility.focus_indicators || 'normal',
          keyboard_navigation: userData.accessibility.keyboard_navigation ?? true,
          voice_navigation: userData.accessibility.voice_navigation || false,
          audio_descriptions: userData.accessibility.audio_descriptions || false,
          captions: userData.accessibility.captions || false,
          sign_language: userData.accessibility.sign_language || false,
          magnification: userData.accessibility.magnification || 100,
          cursor_size: userData.accessibility.cursor_size || 'normal',
          click_targets: userData.accessibility.click_targets || 'normal',
          animations: userData.accessibility.animations || 'all',
          transitions: userData.accessibility.transitions || 'all',
          hover_effects: userData.accessibility.hover_effects || 'all',
          sound_effects: userData.accessibility.sound_effects || 'all',
          vibration: userData.accessibility.vibration || 'all',
          notifications: userData.accessibility.notifications || {
            visual: true,
            audio: true,
            haptic: false,
            duration: 'medium'
          },
          input_methods: userData.accessibility.input_methods || {
            keyboard: true,
            mouse: true,
            touch: true,
            voice: false,
            switch_control: false,
            eye_tracking: false
          },
          assistive_technologies: userData.accessibility.assistive_technologies || {
            screen_reader: false,
            voice_control: false,
            switch_control: false,
            eye_tracking: false,
            mouth_stick: false,
            head_pointer: false
          }
        });
      }
    } catch (error) {
      console.error("Error loading user:", error);
      toast({
        title: "Error",
        description: "Could not load user data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};
    
    // Basic validation
    if (formData.magnification < 50 || formData.magnification > 500) {
      newErrors.magnification = 'Magnification must be between 50% and 500%';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasUnsavedChanges(true);
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  }, [errors]);

  const handleNestedInputChange = useCallback((parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof FormData],
        [field]: value
      }
    }));
    setHasUnsavedChanges(true);
  }, []);

  const saveUserData = useCallback(async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before saving.",
        variant: "destructive"
      });
      return false;
    }

    setIsSaving(true);
    try {
      await User.updateMyUserData({ accessibility: formData });
      setHasUnsavedChanges(false);
      toast({
        title: "Saved! 🎉",
        description: "Your accessibility settings have been updated.",
        duration: 5000,
      });
      return true;
    } catch (error) {
      console.error("Error saving:", error);
      toast({
        title: "Save Failed",
        description: "Could not save your settings. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [formData, validateForm, toast]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return {
    user,
    formData,
    errors,
    isLoading,
    isSaving,
    hasUnsavedChanges,
    handleInputChange,
    handleNestedInputChange,
    saveUserData,
    validateForm
  };
};

// ✅ Loading component
const AccessibilityLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-slate-600" />
      <p className="text-slate-600 text-lg">Loading your accessibility settings...</p>
      <p className="text-slate-500 text-sm mt-2">Preparing accessibility form</p>
    </div>
  </div>
);

// ✅ Form field component
const FormField = ({ 
  label, 
  children, 
  error, 
  required = false,
  icon: Icon,
  description 
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  icon?: React.ComponentType<any>;
  description?: string;
}) => (
  <div className="space-y-2">
    <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
      {Icon && <Icon className="w-4 h-4" />}
      {label}
      {required && <span className="text-red-500">*</span>}
    </Label>
    {description && (
      <p className="text-xs text-slate-500">{description}</p>
    )}
    {children}
    {error && (
      <p className="text-xs text-red-600 flex items-center gap-1">
        <AlertTriangle className="w-3 h-3" />
        {error}
      </p>
    )}
  </div>
);

// ✅ Accessibility status component
const AccessibilityStatus = ({ formData }: { formData: FormData }) => {
  const getAccessibilityScore = () => {
    let score = 0;
    let maxScore = 0;

    // Visual accessibility (0-30 points)
    maxScore += 30;
    if (formData.high_contrast) score += 10;
    if (formData.large_text) score += 10;
    if (formData.color_blind_support) score += 10;

    // Motion accessibility (0-20 points)
    maxScore += 20;
    if (formData.reduced_motion) score += 10;
    if (formData.animations === 'reduced' || formData.animations === 'none') score += 10;

    // Navigation accessibility (0-25 points)
    maxScore += 25;
    if (formData.keyboard_navigation) score += 10;
    if (formData.voice_navigation) score += 10;
    if (formData.focus_indicators === 'high' || formData.focus_indicators === 'maximum') score += 5;

    // Assistive technologies (0-25 points)
    maxScore += 25;
    if (formData.screen_reader) score += 10;
    if (formData.assistive_technologies.screen_reader) score += 10;
    if (formData.assistive_technologies.voice_control) score += 5;

    return Math.round((score / maxScore) * 100);
  };

  const accessibilityScore = getAccessibilityScore();
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return CheckCircle;
    if (score >= 60) return Target;
    if (score >= 40) return AlertTriangle;
    return AlertTriangle;
  };

  const ScoreIcon = getScoreIcon(accessibilityScore);

  return (
    <Card className="bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ScoreIcon className={`w-6 h-6 ${getScoreColor(accessibilityScore)}`} />
            <div>
              <h3 className="font-semibold text-slate-800">Accessibility Score</h3>
              <p className="text-sm text-slate-600">Based on your current accessibility settings</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getScoreColor(accessibilityScore)}`}>
              {accessibilityScore}%
            </div>
            <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  accessibilityScore >= 80 ? 'bg-green-500' : 
                  accessibilityScore >= 60 ? 'bg-yellow-500' : 
                  accessibilityScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${accessibilityScore}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function EditAccessibility() {
  const navigate = useNavigate();
  const {
    user,
    formData,
    errors,
    isLoading,
    isSaving,
    hasUnsavedChanges,
    handleInputChange,
    handleNestedInputChange,
    saveUserData
  } = useAccessibilityForm();

  const handleSave = async () => {
    const success = await saveUserData();
    if (success) {
      navigate(createPageUrl('Settings'));
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate(createPageUrl('Settings'));
      }
    } else {
      navigate(createPageUrl('Settings'));
    }
  };

  if (isLoading) {
    return <AccessibilityLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-slate-500 to-gray-500 flex items-center justify-center shadow-lg">
                <Accessibility className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-slate-800">Accessibility</CardTitle>
                <p className="text-slate-600">Adjust visual, audio, and motion settings for better accessibility</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Accessibility Status */}
        <AccessibilityStatus formData={formData} />

        {/* Visual Accessibility */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Visual Accessibility
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-slate-800">High Contrast</p>
                      <p className="text-sm text-slate-600">Increase contrast for better visibility</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.high_contrast}
                    onCheckedChange={(checked) => handleInputChange('high_contrast', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Type className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-slate-800">Large Text</p>
                      <p className="text-sm text-slate-600">Increase text size for better readability</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.large_text}
                    onCheckedChange={(checked) => handleInputChange('large_text', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Palette className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-slate-800">Color Blind Support</p>
                      <p className="text-sm text-slate-600">Optimize colors for color blindness</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.color_blind_support}
                    onCheckedChange={(checked) => handleInputChange('color_blind_support', checked)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <FormField 
                  label="Font Size" 
                  error={errors.font_size}
                  icon={Type}
                  description="Adjust the base font size"
                >
                  <Select value={formData.font_size} onValueChange={(value) => handleInputChange('font_size', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="extra-large">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField 
                  label="Color Scheme" 
                  error={errors.color_scheme}
                  icon={Palette}
                  description="Choose your preferred color scheme"
                >
                  <Select value={formData.color_scheme} onValueChange={(value) => handleInputChange('color_scheme', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField 
                  label="Contrast Ratio" 
                  error={errors.contrast_ratio}
                  icon={Eye}
                  description="Adjust contrast for better visibility"
                >
                  <Select value={formData.contrast_ratio} onValueChange={(value) => handleInputChange('contrast_ratio', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="maximum">Maximum</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Motion & Animation */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Motion & Animation
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-slate-800">Reduced Motion</p>
                      <p className="text-sm text-slate-600">Minimize motion and animations</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.reduced_motion}
                    onCheckedChange={(checked) => handleInputChange('reduced_motion', checked)}
                  />
                </div>

                <FormField 
                  label="Animations" 
                  error={errors.animations}
                  icon={Play}
                  description="Control animation effects"
                >
                  <Select value={formData.animations} onValueChange={(value) => handleInputChange('animations', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="reduced">Reduced</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField 
                  label="Transitions" 
                  error={errors.transitions}
                  icon={RefreshCw}
                  description="Control transition effects"
                >
                  <Select value={formData.transitions} onValueChange={(value) => handleInputChange('transitions', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="reduced">Reduced</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </div>

              <div className="space-y-4">
                <FormField 
                  label="Hover Effects" 
                  error={errors.hover_effects}
                  icon={MousePointer}
                  description="Control hover effects"
                >
                  <Select value={formData.hover_effects} onValueChange={(value) => handleInputChange('hover_effects', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="reduced">Reduced</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField 
                  label="Sound Effects" 
                  error={errors.sound_effects}
                  icon={Volume2}
                  description="Control sound effects"
                >
                  <Select value={formData.sound_effects} onValueChange={(value) => handleInputChange('sound_effects', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="reduced">Reduced</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField 
                  label="Vibration" 
                  error={errors.vibration}
                  icon={Zap}
                  description="Control vibration feedback"
                >
                  <Select value={formData.vibration} onValueChange={(value) => handleInputChange('vibration', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="reduced">Reduced</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation & Input */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Keyboard className="w-5 h-5" />
              Navigation & Input
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Keyboard className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-slate-800">Keyboard Navigation</p>
                      <p className="text-sm text-slate-600">Enable keyboard-only navigation</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.keyboard_navigation}
                    onCheckedChange={(checked) => handleInputChange('keyboard_navigation', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-slate-800">Voice Navigation</p>
                      <p className="text-sm text-slate-600">Enable voice commands</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.voice_navigation}
                    onCheckedChange={(checked) => handleInputChange('voice_navigation', checked)}
                  />
                </div>

                <FormField 
                  label="Focus Indicators" 
                  error={errors.focus_indicators}
                  icon={Target}
                  description="Control focus indicator visibility"
                >
                  <Select value={formData.focus_indicators} onValueChange={(value) => handleInputChange('focus_indicators', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="maximum">Maximum</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </div>

              <div className="space-y-4">
                <FormField 
                  label="Cursor Size" 
                  error={errors.cursor_size}
                  icon={MousePointer}
                  description="Adjust cursor size"
                >
                  <Select value={formData.cursor_size} onValueChange={(value) => handleInputChange('cursor_size', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="extra-large">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField 
                  label="Click Targets" 
                  error={errors.click_targets}
                  icon={Target}
                  description="Adjust click target size"
                >
                  <Select value={formData.click_targets} onValueChange={(value) => handleInputChange('click_targets', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="extra-large">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField 
                  label="Magnification" 
                  error={errors.magnification}
                  icon={Eye}
                  description="Adjust screen magnification"
                >
                  <div className="space-y-2">
                    <Slider
                      value={[formData.magnification]}
                      onValueChange={(value) => handleInputChange('magnification', value[0])}
                      min={50}
                      max={500}
                      step={10}
                      className="w-full"
                    />
                    <div className="text-center text-sm text-slate-600">
                      {formData.magnification}%
                    </div>
                  </div>
                </FormField>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assistive Technologies */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Assistive Technologies
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-slate-800">Screen Reader</p>
                      <p className="text-sm text-slate-600">Optimize for screen readers</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.screen_reader}
                    onCheckedChange={(checked) => handleInputChange('screen_reader', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-slate-800">Audio Descriptions</p>
                      <p className="text-sm text-slate-600">Enable audio descriptions</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.audio_descriptions}
                    onCheckedChange={(checked) => handleInputChange('audio_descriptions', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-slate-800">Captions</p>
                      <p className="text-sm text-slate-600">Enable captions for audio</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.captions}
                    onCheckedChange={(checked) => handleInputChange('captions', checked)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-slate-800">Sign Language</p>
                      <p className="text-sm text-slate-600">Enable sign language support</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.sign_language}
                    onCheckedChange={(checked) => handleInputChange('sign_language', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-slate-800">Voice Control</p>
                      <p className="text-sm text-slate-600">Enable voice control</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.assistive_technologies.voice_control}
                    onCheckedChange={(checked) => handleNestedInputChange('assistive_technologies', 'voice_control', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-slate-800">Switch Control</p>
                      <p className="text-sm text-slate-600">Enable switch control</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.assistive_technologies.switch_control}
                    onCheckedChange={(checked) => handleNestedInputChange('assistive_technologies', 'switch_control', checked)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unsaved Changes Alert */}
        {hasUnsavedChanges && (
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Unsaved Changes</AlertTitle>
            <AlertDescription className="text-yellow-700">
              You have unsaved changes. Don't forget to save your updates.
            </AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="w-full sm:w-auto bg-white hover:bg-slate-50 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Settings
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gradient-to-r from-slate-500 to-gray-500 hover:from-slate-600 hover:to-gray-600 text-white px-6 w-full sm:w-auto shadow-md"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
