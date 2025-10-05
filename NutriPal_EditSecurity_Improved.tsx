import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { User } from '@/entities/User';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ArrowLeft, 
  Save, 
  Lock,
  Eye,
  EyeOff,
  Shield,
  Key,
  User,
  Mail,
  Phone,
  Smartphone,
  Monitor,
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
  Settings,
  Bell,
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
  email?: string;
  display_name?: string;
  username?: string;
  password?: string;
  two_factor_enabled?: boolean;
  two_factor_method?: 'sms' | 'email' | 'app' | 'backup_codes';
  backup_codes?: string[];
  recovery_email?: string;
  recovery_phone?: string;
  security_questions?: Array<{
    question: string;
    answer: string;
  }>;
  login_history?: Array<{
    timestamp: string;
    ip_address: string;
    location: string;
    device: string;
    browser: string;
    successful: boolean;
  }>;
  active_sessions?: Array<{
    session_id: string;
    device: string;
    browser: string;
    location: string;
    last_activity: string;
    ip_address: string;
  }>;
  privacy_settings?: {
    profile_visibility: 'public' | 'private' | 'friends';
    data_sharing: boolean;
    analytics: boolean;
    marketing_emails: boolean;
    security_notifications: boolean;
  };
  account_settings?: {
    email_notifications: boolean;
    sms_notifications: boolean;
    push_notifications: boolean;
    login_alerts: boolean;
    password_change_alerts: boolean;
    suspicious_activity_alerts: boolean;
  };
  data_export?: {
    last_export: string;
    export_frequency: 'never' | 'monthly' | 'quarterly' | 'yearly';
    export_format: 'json' | 'csv' | 'pdf';
  };
  account_deletion?: {
    deletion_requested: boolean;
    deletion_date: string;
    reason: string;
  };
  profile_completed?: boolean;
}

interface FormData {
  display_name: string;
  username: string;
  current_password: string;
  new_password: string;
  confirm_password: string;
  two_factor_enabled: boolean;
  two_factor_method: string;
  recovery_email: string;
  recovery_phone: string;
  security_questions: Array<{
    question: string;
    answer: string;
  }>;
  privacy_settings: {
    profile_visibility: string;
    data_sharing: boolean;
    analytics: boolean;
    marketing_emails: boolean;
    security_notifications: boolean;
  };
  account_settings: {
    email_notifications: boolean;
    sms_notifications: boolean;
    push_notifications: boolean;
    login_alerts: boolean;
    password_change_alerts: boolean;
    suspicious_activity_alerts: boolean;
  };
  data_export: {
    export_frequency: string;
    export_format: string;
  };
}

interface FormErrors {
  [key: string]: string;
}

// ✅ Custom hook for security form management
const useSecurityForm = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    display_name: '',
    username: '',
    current_password: '',
    new_password: '',
    confirm_password: '',
    two_factor_enabled: false,
    two_factor_method: 'app',
    recovery_email: '',
    recovery_phone: '',
    security_questions: [],
    privacy_settings: {
      profile_visibility: 'private',
      data_sharing: false,
      analytics: false,
      marketing_emails: false,
      security_notifications: true
    },
    account_settings: {
      email_notifications: true,
      sms_notifications: false,
      push_notifications: true,
      login_alerts: true,
      password_change_alerts: true,
      suspicious_activity_alerts: true
    },
    data_export: {
      export_frequency: 'never',
      export_format: 'json'
    }
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const { toast } = useToast();

  const loadUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const userData = await User.me();
      setUser(userData);
      
      // Populate form with user data
      setFormData({
        display_name: userData.display_name || '',
        username: userData.username || '',
        current_password: '',
        new_password: '',
        confirm_password: '',
        two_factor_enabled: userData.two_factor_enabled || false,
        two_factor_method: userData.two_factor_method || 'app',
        recovery_email: userData.recovery_email || '',
        recovery_phone: userData.recovery_phone || '',
        security_questions: userData.security_questions || [],
        privacy_settings: userData.privacy_settings || {
          profile_visibility: 'private',
          data_sharing: false,
          analytics: false,
          marketing_emails: false,
          security_notifications: true
        },
        account_settings: userData.account_settings || {
          email_notifications: true,
          sms_notifications: false,
          push_notifications: true,
          login_alerts: true,
          password_change_alerts: true,
          suspicious_activity_alerts: true
        },
        data_export: userData.data_export || {
          export_frequency: 'never',
          export_format: 'json'
        }
      });
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
    if (!formData.display_name.trim()) {
      newErrors.display_name = 'Display name is required';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
    // Password validation (only if changing password)
    if (formData.new_password) {
      if (formData.new_password.length < 8) {
        newErrors.new_password = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.new_password)) {
        newErrors.new_password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }
      
      if (formData.new_password !== formData.confirm_password) {
        newErrors.confirm_password = 'Passwords do not match';
      }
      
      if (!formData.current_password) {
        newErrors.current_password = 'Current password is required to change password';
      }
    }
    
    // Recovery email validation
    if (formData.recovery_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.recovery_email)) {
      newErrors.recovery_email = 'Please enter a valid email address';
    }
    
    // Recovery phone validation
    if (formData.recovery_phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.recovery_phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.recovery_phone = 'Please enter a valid phone number';
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

  const handleArrayInputChange = useCallback((arrayField: string, index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [arrayField]: prev[arrayField as keyof FormData].map((item: any, i: number) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
    setHasUnsavedChanges(true);
  }, []);

  const addArrayItem = useCallback((arrayField: string, newItem: any) => {
    setFormData(prev => ({
      ...prev,
      [arrayField]: [...prev[arrayField as keyof FormData], newItem]
    }));
    setHasUnsavedChanges(true);
  }, []);

  const removeArrayItem = useCallback((arrayField: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [arrayField]: prev[arrayField as keyof FormData].filter((_: any, i: number) => i !== index)
    }));
    setHasUnsavedChanges(true);
  }, []);

  const togglePasswordVisibility = useCallback((field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
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
      await User.updateMyUserData(formData);
      setHasUnsavedChanges(false);
      toast({
        title: "Saved! 🎉",
        description: "Your security information has been updated.",
        duration: 5000,
      });
      return true;
    } catch (error) {
      console.error("Error saving:", error);
      toast({
        title: "Save Failed",
        description: "Could not save your information. Please try again.",
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
    showPasswords,
    handleInputChange,
    handleNestedInputChange,
    handleArrayInputChange,
    addArrayItem,
    removeArrayItem,
    togglePasswordVisibility,
    saveUserData,
    validateForm
  };
};

// ✅ Loading component
const SecurityLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-purple-600" />
      <p className="text-slate-600 text-lg">Loading your security settings...</p>
      <p className="text-slate-500 text-sm mt-2">Preparing security information form</p>
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

// ✅ Password field component
const PasswordField = ({ 
  label, 
  value, 
  onChange, 
  error, 
  required = false,
  icon: Icon,
  description,
  showPassword,
  onToggleVisibility 
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  icon?: React.ComponentType<any>;
  description?: string;
  showPassword: boolean;
  onToggleVisibility: () => void;
}) => (
  <FormField label={label} error={error} required={required} icon={Icon} description={description}>
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter ${label.toLowerCase()}`}
        className={`pr-10 ${error ? 'border-red-500' : ''}`}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={onToggleVisibility}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-slate-400" />
        ) : (
          <Eye className="h-4 w-4 text-slate-400" />
        )}
      </Button>
    </div>
  </FormField>
);

// ✅ Security status component
const SecurityStatus = ({ user }: { user: UserData | null }) => {
  if (!user) return null;

  const getSecurityScore = () => {
    let score = 0;
    let maxScore = 0;

    // Password strength (0-25 points)
    maxScore += 25;
    if (user.password && user.password.length >= 12) score += 25;
    else if (user.password && user.password.length >= 8) score += 15;
    else if (user.password && user.password.length >= 6) score += 10;
    else score += 5;

    // Two-factor authentication (0-30 points)
    maxScore += 30;
    if (user.two_factor_enabled) score += 30;
    else score += 0;

    // Recovery options (0-20 points)
    maxScore += 20;
    if (user.recovery_email && user.recovery_phone) score += 20;
    else if (user.recovery_email || user.recovery_phone) score += 10;
    else score += 0;

    // Security questions (0-15 points)
    maxScore += 15;
    if (user.security_questions && user.security_questions.length >= 3) score += 15;
    else if (user.security_questions && user.security_questions.length >= 2) score += 10;
    else if (user.security_questions && user.security_questions.length >= 1) score += 5;
    else score += 0;

    // Privacy settings (0-10 points)
    maxScore += 10;
    if (user.privacy_settings?.profile_visibility === 'private') score += 10;
    else if (user.privacy_settings?.profile_visibility === 'friends') score += 5;
    else score += 0;

    return Math.round((score / maxScore) * 100);
  };

  const securityScore = getSecurityScore();
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return ShieldCheck;
    if (score >= 60) return Shield;
    if (score >= 40) return AlertTriangle;
    return AlertTriangle;
  };

  const ScoreIcon = getScoreIcon(securityScore);

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ScoreIcon className={`w-6 h-6 ${getScoreColor(securityScore)}`} />
            <div>
              <h3 className="font-semibold text-slate-800">Security Score</h3>
              <p className="text-sm text-slate-600">Based on your current security settings</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getScoreColor(securityScore)}`}>
              {securityScore}%
            </div>
            <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  securityScore >= 80 ? 'bg-green-500' : 
                  securityScore >= 60 ? 'bg-yellow-500' : 
                  securityScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${securityScore}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ✅ Active sessions component
const ActiveSessions = ({ user }: { user: UserData | null }) => {
  if (!user?.active_sessions || user.active_sessions.length === 0) return null;

  return (
    <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
      <CardHeader>
        <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
          <Monitor className="w-5 h-5" />
          Active Sessions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {user.active_sessions.map((session, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Monitor className="w-5 h-5 text-slate-600" />
              <div>
                <p className="font-medium text-slate-800">{session.device}</p>
                <p className="text-sm text-slate-600">{session.browser} • {session.location}</p>
                <p className="text-xs text-slate-500">Last activity: {new Date(session.last_activity).toLocaleString()}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" />
              End Session
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default function EditSecurity() {
  const navigate = useNavigate();
  const {
    user,
    formData,
    errors,
    isLoading,
    isSaving,
    hasUnsavedChanges,
    showPasswords,
    handleInputChange,
    handleNestedInputChange,
    handleArrayInputChange,
    addArrayItem,
    removeArrayItem,
    togglePasswordVisibility,
    saveUserData
  } = useSecurityForm();

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
    return <SecurityLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-slate-800">Security & Account</CardTitle>
                <p className="text-slate-600">Manage password, 2FA, and account security</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Security Status */}
        <SecurityStatus user={user} />

        {/* Basic Account Information */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <User className="w-5 h-5" />
              Basic Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField 
                label="Display Name" 
                required 
                error={errors.display_name}
                icon={User}
                description="How your name appears to others"
              >
                <Input
                  value={formData.display_name}
                  onChange={(e) => handleInputChange('display_name', e.target.value)}
                  placeholder="Enter your display name"
                  className={errors.display_name ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                label="Username" 
                required 
                error={errors.username}
                icon={User}
                description="Your unique username"
              >
                <Input
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="Enter your username"
                  className={errors.username ? 'border-red-500' : ''}
                />
              </FormField>
            </div>
          </CardContent>
        </Card>

        {/* Password Management */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Key className="w-5 h-5" />
              Password Management
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <PasswordField
              label="Current Password"
              value={formData.current_password}
              onChange={(value) => handleInputChange('current_password', value)}
              error={errors.current_password}
              icon={Lock}
              description="Enter your current password to change it"
              showPassword={showPasswords.current}
              onToggleVisibility={() => togglePasswordVisibility('current')}
            />

            <PasswordField
              label="New Password"
              value={formData.new_password}
              onChange={(value) => handleInputChange('new_password', value)}
              error={errors.new_password}
              icon={Key}
              description="Must be at least 8 characters with uppercase, lowercase, and number"
              showPassword={showPasswords.new}
              onToggleVisibility={() => togglePasswordVisibility('new')}
            />

            <PasswordField
              label="Confirm New Password"
              value={formData.confirm_password}
              onChange={(value) => handleInputChange('confirm_password', value)}
              error={errors.confirm_password}
              icon={Key}
              description="Re-enter your new password"
              showPassword={showPasswords.confirm}
              onToggleVisibility={() => togglePasswordVisibility('confirm')}
            />
          </CardContent>
        </Card>

        {/* Two-Factor Authentication */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Two-Factor Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-slate-600" />
                <div>
                  <p className="font-medium text-slate-800">Enable Two-Factor Authentication</p>
                  <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
                </div>
              </div>
              <Checkbox
                checked={formData.two_factor_enabled}
                onCheckedChange={(checked) => handleInputChange('two_factor_enabled', checked)}
              />
            </div>

            {formData.two_factor_enabled && (
              <FormField 
                label="2FA Method" 
                error={errors.two_factor_method}
                icon={Smartphone}
                description="Choose your preferred 2FA method"
              >
                <Select value={formData.two_factor_method} onValueChange={(value) => handleInputChange('two_factor_method', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select 2FA method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="app">Authenticator App</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="backup_codes">Backup Codes</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            )}
          </CardContent>
        </Card>

        {/* Recovery Options */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              Recovery Options
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField 
                label="Recovery Email" 
                error={errors.recovery_email}
                icon={Mail}
                description="Email address for account recovery"
              >
                <Input
                  type="email"
                  value={formData.recovery_email}
                  onChange={(e) => handleInputChange('recovery_email', e.target.value)}
                  placeholder="Enter recovery email"
                  className={errors.recovery_email ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                label="Recovery Phone" 
                error={errors.recovery_phone}
                icon={Phone}
                description="Phone number for account recovery"
              >
                <Input
                  type="tel"
                  value={formData.recovery_phone}
                  onChange={(e) => handleInputChange('recovery_phone', e.target.value)}
                  placeholder="Enter recovery phone"
                  className={errors.recovery_phone ? 'border-red-500' : ''}
                />
              </FormField>
            </div>
          </CardContent>
        </Card>

        {/* Security Questions */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <KeyRound className="w-5 h-5" />
              Security Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {formData.security_questions.map((question, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-slate-800">Security Question #{index + 1}</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('security_questions', index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Question">
                    <Input
                      value={question.question}
                      onChange={(e) => handleArrayInputChange('security_questions', index, 'question', e.target.value)}
                      placeholder="Enter security question"
                    />
                  </FormField>
                  <FormField label="Answer">
                    <Input
                      value={question.answer}
                      onChange={(e) => handleArrayInputChange('security_questions', index, 'answer', e.target.value)}
                      placeholder="Enter answer"
                    />
                  </FormField>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => addArrayItem('security_questions', { question: '', answer: '' })}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Security Question
            </Button>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField 
                label="Profile Visibility" 
                error={errors['privacy_settings.profile_visibility']}
                icon={Eye}
                description="Who can see your profile information"
              >
                <Select value={formData.privacy_settings.profile_visibility} onValueChange={(value) => handleNestedInputChange('privacy_settings', 'profile_visibility', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="friends">Friends Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField 
                label="Data Sharing" 
                error={errors['privacy_settings.data_sharing']}
                icon={Database}
                description="Allow anonymized data for research and improvements"
              >
                <Select value={formData.privacy_settings.data_sharing.toString()} onValueChange={(value) => handleNestedInputChange('privacy_settings', 'data_sharing', value === 'true')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Enabled</SelectItem>
                    <SelectItem value="false">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField 
                label="Analytics" 
                error={errors['privacy_settings.analytics']}
                icon={BarChart3}
                description="Allow usage analytics and performance monitoring"
              >
                <Select value={formData.privacy_settings.analytics.toString()} onValueChange={(value) => handleNestedInputChange('privacy_settings', 'analytics', value === 'true')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Enabled</SelectItem>
                    <SelectItem value="false">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField 
                label="Marketing Emails" 
                error={errors['privacy_settings.marketing_emails']}
                icon={Mail}
                description="Receive promotional content and tips"
              >
                <Select value={formData.privacy_settings.marketing_emails.toString()} onValueChange={(value) => handleNestedInputChange('privacy_settings', 'marketing_emails', value === 'true')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Enabled</SelectItem>
                    <SelectItem value="false">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField 
                label="Security Notifications" 
                error={errors['privacy_settings.security_notifications']}
                icon={Bell}
                description="Receive important security alerts"
              >
                <Select value={formData.privacy_settings.security_notifications.toString()} onValueChange={(value) => handleNestedInputChange('privacy_settings', 'security_notifications', value === 'true')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Enabled</SelectItem>
                    <SelectItem value="false">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </div>
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <ActiveSessions user={user} />

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
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-6 w-full sm:w-auto shadow-md"
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
