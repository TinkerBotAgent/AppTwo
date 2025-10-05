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
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ArrowLeft, 
  Save, 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Clock,
  Shield,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Eye,
  EyeOff,
  Edit3,
  Camera,
  Upload,
  Trash2,
  RefreshCw,
  Info,
  Star,
  Award,
  Target,
  Heart,
  Brain,
  Zap
} from 'lucide-react';

// ✅ Type Definitions
interface UserData {
  id: string;
  email?: string;
  display_name?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say' | 'other';
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
  };
  timezone?: string;
  language?: string;
  profile_picture?: string;
  bio?: string;
  website?: string;
  social_links?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
  preferences?: {
    email_notifications?: boolean;
    sms_notifications?: boolean;
    marketing_emails?: boolean;
    profile_visibility?: 'public' | 'private' | 'friends';
    data_sharing?: boolean;
  };
  subscription_tier?: 'free' | 'basic' | 'pro' | 'premium';
  profile_completed?: boolean;
  created_at?: string;
  updated_at?: string;
}

interface FormErrors {
  [key: string]: string;
}

interface FormData {
  display_name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  bio: string;
  website: string;
  timezone: string;
  language: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
  };
  social_links: {
    twitter: string;
    linkedin: string;
    instagram: string;
    facebook: string;
  };
  preferences: {
    email_notifications: boolean;
    sms_notifications: boolean;
    marketing_emails: boolean;
    profile_visibility: string;
    data_sharing: boolean;
  };
}

// ✅ Custom hook for form management
const useBasicInfoForm = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    display_name: '',
    full_name: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    gender: '',
    bio: '',
    website: '',
    timezone: '',
    language: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip_code: '',
      country: ''
    },
    social_links: {
      twitter: '',
      linkedin: '',
      instagram: '',
      facebook: ''
    },
    preferences: {
      email_notifications: true,
      sms_notifications: false,
      marketing_emails: false,
      profile_visibility: 'private',
      data_sharing: false
    }
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const loadUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const userData = await User.me();
      setUser(userData);
      
      // Populate form with user data
      setFormData({
        display_name: userData.display_name || '',
        full_name: userData.full_name || '',
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        date_of_birth: userData.date_of_birth || '',
        gender: userData.gender || '',
        bio: userData.bio || '',
        website: userData.website || '',
        timezone: userData.timezone || 'America/New_York',
        language: userData.language || 'en',
        address: {
          street: userData.address?.street || '',
          city: userData.address?.city || '',
          state: userData.address?.state || '',
          zip_code: userData.address?.zip_code || '',
          country: userData.address?.country || 'US'
        },
        social_links: {
          twitter: userData.social_links?.twitter || '',
          linkedin: userData.social_links?.linkedin || '',
          instagram: userData.social_links?.instagram || '',
          facebook: userData.social_links?.facebook || ''
        },
        preferences: {
          email_notifications: userData.preferences?.email_notifications ?? true,
          sms_notifications: userData.preferences?.sms_notifications ?? false,
          marketing_emails: userData.preferences?.marketing_emails ?? false,
          profile_visibility: userData.preferences?.profile_visibility || 'private',
          data_sharing: userData.preferences?.data_sharing ?? false
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
    
    // Required fields
    if (!formData.display_name.trim()) {
      newErrors.display_name = 'Display name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation (optional but if provided, should be valid)
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Date of birth validation
    if (formData.date_of_birth) {
      const birthDate = new Date(formData.date_of_birth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 13) {
        newErrors.date_of_birth = 'You must be at least 13 years old';
      } else if (age > 120) {
        newErrors.date_of_birth = 'Please enter a valid birth date';
      }
    }
    
    // Website validation
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid website URL (include http:// or https://)';
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
      await User.updateMyUserData(formData);
      setHasUnsavedChanges(false);
      toast({
        title: "Saved! 🎉",
        description: "Your basic information has been updated.",
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
    showPassword,
    setShowPassword,
    handleInputChange,
    handleNestedInputChange,
    saveUserData,
    validateForm
  };
};

// ✅ Loading component
const BasicInfoLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-emerald-600" />
      <p className="text-slate-600 text-lg">Loading your profile...</p>
      <p className="text-slate-500 text-sm mt-2">Preparing basic information form</p>
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

// ✅ Profile completion indicator
const ProfileCompletionIndicator = ({ user }: { user: UserData | null }) => {
  if (!user) return null;

  const completionFields = [
    { field: 'display_name', label: 'Display Name', weight: 20 },
    { field: 'email', label: 'Email', weight: 20 },
    { field: 'phone', label: 'Phone', weight: 15 },
    { field: 'date_of_birth', label: 'Birth Date', weight: 15 },
    { field: 'gender', label: 'Gender', weight: 10 },
    { field: 'bio', label: 'Bio', weight: 10 },
    { field: 'address.city', label: 'City', weight: 10 }
  ];

  const completionScore = completionFields.reduce((score, { field, weight }) => {
    const value = field.includes('.') 
      ? user[field.split('.')[0] as keyof UserData]?.[field.split('.')[1] as keyof any]
      : user[field as keyof UserData];
    
    return score + (value ? weight : 0);
  }, 0);

  const getCompletionColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompletionIcon = (score: number) => {
    if (score >= 80) return CheckCircle;
    if (score >= 60) return Target;
    return AlertTriangle;
  };

  const CompletionIcon = getCompletionIcon(completionScore);

  return (
    <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CompletionIcon className={`w-6 h-6 ${getCompletionColor(completionScore)}`} />
            <div>
              <h3 className="font-semibold text-slate-800">Profile Completion</h3>
              <p className="text-sm text-slate-600">{completionScore}% complete</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getCompletionColor(completionScore)}`}>
              {completionScore}%
            </div>
            <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  completionScore >= 80 ? 'bg-emerald-500' : 
                  completionScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${completionScore}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function EditBasicInfo() {
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
  } = useBasicInfoForm();

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
    return <BasicInfoLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-slate-800">Basic Information</CardTitle>
                <p className="text-slate-600">Update your personal details and preferences</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Profile Completion Indicator */}
        <ProfileCompletionIndicator user={user} />

        {/* Basic Information Form */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField 
                label="Display Name" 
                required 
                error={errors.display_name}
                icon={UserIcon}
                description="This is how your name appears to others"
              >
                <Input
                  value={formData.display_name}
                  onChange={(e) => handleInputChange('display_name', e.target.value)}
                  placeholder="Enter your display name"
                  className={errors.display_name ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                label="Email Address" 
                required 
                error={errors.email}
                icon={Mail}
                description="Your primary email address"
              >
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className={errors.email ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                label="First Name" 
                error={errors.first_name}
                icon={UserIcon}
              >
                <Input
                  value={formData.first_name}
                  onChange={(e) => handleInputChange('first_name', e.target.value)}
                  placeholder="Enter your first name"
                />
              </FormField>

              <FormField 
                label="Last Name" 
                error={errors.last_name}
                icon={UserIcon}
              >
                <Input
                  value={formData.last_name}
                  onChange={(e) => handleInputChange('last_name', e.target.value)}
                  placeholder="Enter your last name"
                />
              </FormField>

              <FormField 
                label="Phone Number" 
                error={errors.phone}
                icon={Phone}
                description="Optional - for account security and notifications"
              >
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                  className={errors.phone ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                label="Date of Birth" 
                error={errors.date_of_birth}
                icon={Calendar}
                description="Used for age-appropriate recommendations"
              >
                <Input
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                  className={errors.date_of_birth ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                label="Gender" 
                error={errors.gender}
                icon={Heart}
                description="Helps personalize health recommendations"
              >
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non-binary">Non-binary</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField 
                label="Website" 
                error={errors.website}
                icon={Globe}
                description="Your personal or professional website"
              >
                <Input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://your-website.com"
                  className={errors.website ? 'border-red-500' : ''}
                />
              </FormField>
            </div>

            <FormField 
              label="Bio" 
              error={errors.bio}
              icon={Edit3}
              description="Tell us a bit about yourself"
            >
              <Textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Write a short bio about yourself..."
                rows={3}
                className="resize-none"
              />
            </FormField>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField 
                label="Street Address" 
                error={errors['address.street']}
                icon={MapPin}
              >
                <Input
                  value={formData.address.street}
                  onChange={(e) => handleNestedInputChange('address', 'street', e.target.value)}
                  placeholder="Enter your street address"
                />
              </FormField>

              <FormField 
                label="City" 
                error={errors['address.city']}
                icon={MapPin}
              >
                <Input
                  value={formData.address.city}
                  onChange={(e) => handleNestedInputChange('address', 'city', e.target.value)}
                  placeholder="Enter your city"
                />
              </FormField>

              <FormField 
                label="State/Province" 
                error={errors['address.state']}
                icon={MapPin}
              >
                <Input
                  value={formData.address.state}
                  onChange={(e) => handleNestedInputChange('address', 'state', e.target.value)}
                  placeholder="Enter your state or province"
                />
              </FormField>

              <FormField 
                label="ZIP/Postal Code" 
                error={errors['address.zip_code']}
                icon={MapPin}
              >
                <Input
                  value={formData.address.zip_code}
                  onChange={(e) => handleNestedInputChange('address', 'zip_code', e.target.value)}
                  placeholder="Enter your ZIP or postal code"
                />
              </FormField>

              <FormField 
                label="Country" 
                error={errors['address.country']}
                icon={Globe}
              >
                <Select value={formData.address.country} onValueChange={(value) => handleNestedInputChange('address', 'country', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="GB">United Kingdom</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                    <SelectItem value="DE">Germany</SelectItem>
                    <SelectItem value="FR">France</SelectItem>
                    <SelectItem value="ES">Spain</SelectItem>
                    <SelectItem value="IT">Italy</SelectItem>
                    <SelectItem value="JP">Japan</SelectItem>
                    <SelectItem value="KR">South Korea</SelectItem>
                    <SelectItem value="CN">China</SelectItem>
                    <SelectItem value="IN">India</SelectItem>
                    <SelectItem value="BR">Brazil</SelectItem>
                    <SelectItem value="MX">Mexico</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Social Links
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField 
                label="Twitter" 
                error={errors['social_links.twitter']}
                icon={Share2}
              >
                <Input
                  value={formData.social_links.twitter}
                  onChange={(e) => handleNestedInputChange('social_links', 'twitter', e.target.value)}
                  placeholder="https://twitter.com/username"
                />
              </FormField>

              <FormField 
                label="LinkedIn" 
                error={errors['social_links.linkedin']}
                icon={Share2}
              >
                <Input
                  value={formData.social_links.linkedin}
                  onChange={(e) => handleNestedInputChange('social_links', 'linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                />
              </FormField>

              <FormField 
                label="Instagram" 
                error={errors['social_links.instagram']}
                icon={Share2}
              >
                <Input
                  value={formData.social_links.instagram}
                  onChange={(e) => handleNestedInputChange('social_links', 'instagram', e.target.value)}
                  placeholder="https://instagram.com/username"
                />
              </FormField>

              <FormField 
                label="Facebook" 
                error={errors['social_links.facebook']}
                icon={Share2}
              >
                <Input
                  value={formData.social_links.facebook}
                  onChange={(e) => handleNestedInputChange('social_links', 'facebook', e.target.value)}
                  placeholder="https://facebook.com/username"
                />
              </FormField>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Preferences & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField 
                label="Email Notifications" 
                icon={Mail}
                description="Receive important updates via email"
              >
                <Select value={formData.preferences.email_notifications.toString()} onValueChange={(value) => handleNestedInputChange('preferences', 'email_notifications', value === 'true')}>
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
                label="SMS Notifications" 
                icon={Phone}
                description="Receive updates via text message"
              >
                <Select value={formData.preferences.sms_notifications.toString()} onValueChange={(value) => handleNestedInputChange('preferences', 'sms_notifications', value === 'true')}>
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
                icon={Zap}
                description="Receive promotional content and tips"
              >
                <Select value={formData.preferences.marketing_emails.toString()} onValueChange={(value) => handleNestedInputChange('preferences', 'marketing_emails', value === 'true')}>
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
                label="Profile Visibility" 
                icon={Eye}
                description="Who can see your profile information"
              >
                <Select value={formData.preferences.profile_visibility} onValueChange={(value) => handleNestedInputChange('preferences', 'profile_visibility', value)}>
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
                icon={Shield}
                description="Allow anonymized data for research and improvements"
              >
                <Select value={formData.preferences.data_sharing.toString()} onValueChange={(value) => handleNestedInputChange('preferences', 'data_sharing', value === 'true')}>
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
                label="Language" 
                icon={Languages}
                description="Preferred language for the interface"
              >
                <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="it">Italiano</SelectItem>
                    <SelectItem value="pt">Português</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                    <SelectItem value="ko">한국어</SelectItem>
                    <SelectItem value="hi">हिन्दी</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField 
                label="Timezone" 
                icon={Clock}
                description="Your local timezone for scheduling and notifications"
              >
                <Select value={formData.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="Europe/London">London (GMT)</SelectItem>
                    <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                    <SelectItem value="Asia/Shanghai">Shanghai (CST)</SelectItem>
                    <SelectItem value="Australia/Sydney">Sydney (AEST)</SelectItem>
                    <SelectItem value="America/Sao_Paulo">São Paulo (BRT)</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
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
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 w-full sm:w-auto shadow-md"
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
