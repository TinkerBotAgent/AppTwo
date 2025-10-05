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
  HeartPulse,
  Pill,
  AlertTriangle,
  Shield,
  CheckCircle,
  Plus,
  X,
  Trash2,
  Edit3,
  Calendar,
  Clock,
  User,
  Activity,
  Brain,
  Heart,
  Eye,
  Zap,
  Target,
  Star,
  Info,
  Loader2,
  RefreshCw,
  Download,
  Upload,
  FileText,
  Stethoscope,
  Syringe,
  Bandage,
  Thermometer,
  Blood,
  DNA,
  Microscope,
  FlaskConical,
  TestTube,
  ClipboardList,
  BookOpen,
  Search,
  Filter,
  SortAsc,
  SortDesc
} from 'lucide-react';

// ✅ Type Definitions
interface UserData {
  id: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  bmi?: number;
  medical_conditions?: string[];
  medications?: string[];
  supplements?: string[];
  allergies?: string[];
  family_history?: string[];
  lifestyle_factors?: string[];
  health_goals?: string[];
  dietary_restrictions?: string[];
  exercise_frequency?: string;
  sleep_hours?: number;
  stress_level?: 'low' | 'medium' | 'high';
  blood_type?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  last_checkup?: string;
  emergency_contact?: {
    name?: string;
    relationship?: string;
    phone?: string;
    email?: string;
  };
  health_insurance?: {
    provider?: string;
    policy_number?: string;
    group_number?: string;
  };
  primary_care_physician?: {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
  };
  specialists?: Array<{
    name?: string;
    specialty?: string;
    phone?: string;
    email?: string;
  }>;
  recent_tests?: Array<{
    test_name?: string;
    date?: string;
    results?: string;
    normal_range?: string;
  }>;
  vaccination_history?: Array<{
    vaccine_name?: string;
    date?: string;
    next_due?: string;
  }>;
  profile_completed?: boolean;
}

interface FormData {
  age: number;
  height: number;
  weight: number;
  blood_type: string;
  medical_conditions: string[];
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    prescribed_by: string;
    start_date: string;
    notes: string;
  }>;
  supplements: Array<{
    name: string;
    dosage: string;
    frequency: string;
    purpose: string;
    start_date: string;
    notes: string;
  }>;
  allergies: Array<{
    allergen: string;
    severity: 'mild' | 'moderate' | 'severe';
    symptoms: string;
    treatment: string;
    notes: string;
  }>;
  family_history: string[];
  lifestyle_factors: string[];
  health_goals: string[];
  dietary_restrictions: string[];
  exercise_frequency: string;
  sleep_hours: number;
  stress_level: string;
  last_checkup: string;
  emergency_contact: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  };
  health_insurance: {
    provider: string;
    policy_number: string;
    group_number: string;
  };
  primary_care_physician: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  specialists: Array<{
    name: string;
    specialty: string;
    phone: string;
    email: string;
  }>;
  recent_tests: Array<{
    test_name: string;
    date: string;
    results: string;
    normal_range: string;
  }>;
  vaccination_history: Array<{
    vaccine_name: string;
    date: string;
    next_due: string;
  }>;
}

interface FormErrors {
  [key: string]: string;
}

// ✅ Custom hook for health form management
const useHealthInfoForm = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    age: 0,
    height: 0,
    weight: 0,
    blood_type: '',
    medical_conditions: [],
    medications: [],
    supplements: [],
    allergies: [],
    family_history: [],
    lifestyle_factors: [],
    health_goals: [],
    dietary_restrictions: [],
    exercise_frequency: '',
    sleep_hours: 8,
    stress_level: 'medium',
    last_checkup: '',
    emergency_contact: {
      name: '',
      relationship: '',
      phone: '',
      email: ''
    },
    health_insurance: {
      provider: '',
      policy_number: '',
      group_number: ''
    },
    primary_care_physician: {
      name: '',
      phone: '',
      email: '',
      address: ''
    },
    specialists: [],
    recent_tests: [],
    vaccination_history: []
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
      setFormData({
        age: userData.age || 0,
        height: userData.height || 0,
        weight: userData.weight || 0,
        blood_type: userData.blood_type || '',
        medical_conditions: userData.medical_conditions || [],
        medications: userData.medications || [],
        supplements: userData.supplements || [],
        allergies: userData.allergies || [],
        family_history: userData.family_history || [],
        lifestyle_factors: userData.lifestyle_factors || [],
        health_goals: userData.health_goals || [],
        dietary_restrictions: userData.dietary_restrictions || [],
        exercise_frequency: userData.exercise_frequency || '',
        sleep_hours: userData.sleep_hours || 8,
        stress_level: userData.stress_level || 'medium',
        last_checkup: userData.last_checkup || '',
        emergency_contact: userData.emergency_contact || {
          name: '',
          relationship: '',
          phone: '',
          email: ''
        },
        health_insurance: userData.health_insurance || {
          provider: '',
          policy_number: '',
          group_number: ''
        },
        primary_care_physician: userData.primary_care_physician || {
          name: '',
          phone: '',
          email: '',
          address: ''
        },
        specialists: userData.specialists || [],
        recent_tests: userData.recent_tests || [],
        vaccination_history: userData.vaccination_history || []
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
    if (formData.age < 13 || formData.age > 120) {
      newErrors.age = 'Age must be between 13 and 120';
    }
    
    if (formData.height < 100 || formData.height > 250) {
      newErrors.height = 'Height must be between 100 and 250 cm';
    }
    
    if (formData.weight < 30 || formData.weight > 300) {
      newErrors.weight = 'Weight must be between 30 and 300 kg';
    }
    
    if (formData.sleep_hours < 4 || formData.sleep_hours > 12) {
      newErrors.sleep_hours = 'Sleep hours must be between 4 and 12';
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
        description: "Your health information has been updated.",
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
    handleInputChange,
    handleNestedInputChange,
    handleArrayInputChange,
    addArrayItem,
    removeArrayItem,
    saveUserData,
    validateForm
  };
};

// ✅ Loading component
const HealthInfoLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-red-600" />
      <p className="text-slate-600 text-lg">Loading your health profile...</p>
      <p className="text-slate-500 text-sm mt-2">Preparing health information form</p>
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

// ✅ Array item component for medications, supplements, etc.
const ArrayItemCard = ({ 
  title, 
  item, 
  index, 
  onUpdate, 
  onRemove, 
  fields 
}: {
  title: string;
  item: any;
  index: number;
  onUpdate: (index: number, field: string, value: any) => void;
  onRemove: (index: number) => void;
  fields: Array<{
    key: string;
    label: string;
    type: 'text' | 'select' | 'textarea' | 'date';
    options?: string[];
    placeholder?: string;
  }>;
}) => (
  <Card className="bg-slate-50 border-slate-200">
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-slate-800">{title} #{index + 1}</h4>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRemove(index)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(field => (
          <FormField key={field.key} label={field.label}>
            {field.type === 'select' ? (
              <Select
                value={item[field.key] || ''}
                onValueChange={(value) => onUpdate(index, field.key, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : field.type === 'textarea' ? (
              <Textarea
                value={item[field.key] || ''}
                onChange={(e) => onUpdate(index, field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={2}
                className="resize-none"
              />
            ) : field.type === 'date' ? (
              <Input
                type="date"
                value={item[field.key] || ''}
                onChange={(e) => onUpdate(index, field.key, e.target.value)}
              />
            ) : (
              <Input
                type="text"
                value={item[field.key] || ''}
                onChange={(e) => onUpdate(index, field.key, e.target.value)}
                placeholder={field.placeholder}
              />
            )}
          </FormField>
        ))}
      </div>
    </CardContent>
  </Card>
);

// ✅ Health summary component
const HealthSummary = ({ user, formData }: { user: UserData | null; formData: FormData }) => {
  if (!user) return null;

  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightInMeters = formData.height / 100;
      return (formData.weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return null;
  };

  const bmi = calculateBMI();
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  const bmiInfo = bmi ? getBMICategory(parseFloat(bmi)) : null;

  return (
    <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-800">{formData.age || 'N/A'}</div>
            <div className="text-sm text-slate-600">Age</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-800">{formData.height || 'N/A'} cm</div>
            <div className="text-sm text-slate-600">Height</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-800">{formData.weight || 'N/A'} kg</div>
            <div className="text-sm text-slate-600">Weight</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${bmiInfo?.color || 'text-slate-800'}`}>
              {bmi || 'N/A'}
            </div>
            <div className="text-sm text-slate-600">
              BMI {bmiInfo ? `(${bmiInfo.category})` : ''}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function EditHealthInfo() {
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
    handleArrayInputChange,
    addArrayItem,
    removeArrayItem,
    saveUserData
  } = useHealthInfoForm();

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
    return <HealthInfoLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center shadow-lg">
                <HeartPulse className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-slate-800">Health & Medical</CardTitle>
                <p className="text-slate-600">Manage conditions, medications, and health data</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Health Summary */}
        <HealthSummary user={user} formData={formData} />

        {/* Basic Health Information */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <User className="w-5 h-5" />
              Basic Health Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField 
                label="Age" 
                required 
                error={errors.age}
                icon={Calendar}
                description="Your current age"
              >
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                  placeholder="Enter your age"
                  min="13"
                  max="120"
                  className={errors.age ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                label="Height (cm)" 
                required 
                error={errors.height}
                icon={Activity}
                description="Your height in centimeters"
              >
                <Input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', parseInt(e.target.value) || 0)}
                  placeholder="Enter your height"
                  min="100"
                  max="250"
                  className={errors.height ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                label="Weight (kg)" 
                required 
                error={errors.weight}
                icon={Target}
                description="Your weight in kilograms"
              >
                <Input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', parseInt(e.target.value) || 0)}
                  placeholder="Enter your weight"
                  min="30"
                  max="300"
                  className={errors.weight ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                label="Blood Type" 
                error={errors.blood_type}
                icon={Blood}
                description="Your blood type"
              >
                <Select value={formData.blood_type} onValueChange={(value) => handleInputChange('blood_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField 
                label="Exercise Frequency" 
                error={errors.exercise_frequency}
                icon={Activity}
                description="How often you exercise"
              >
                <Select value={formData.exercise_frequency} onValueChange={(value) => handleInputChange('exercise_frequency', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="rarely">Rarely</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="2-3x-week">2-3 times per week</SelectItem>
                    <SelectItem value="4-5x-week">4-5 times per week</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField 
                label="Sleep Hours" 
                error={errors.sleep_hours}
                icon={Clock}
                description="Average hours of sleep per night"
              >
                <Input
                  type="number"
                  value={formData.sleep_hours}
                  onChange={(e) => handleInputChange('sleep_hours', parseInt(e.target.value) || 8)}
                  placeholder="Enter sleep hours"
                  min="4"
                  max="12"
                  className={errors.sleep_hours ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                label="Stress Level" 
                error={errors.stress_level}
                icon={Brain}
                description="Your current stress level"
              >
                <Select value={formData.stress_level} onValueChange={(value) => handleInputChange('stress_level', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stress level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField 
                label="Last Checkup" 
                error={errors.last_checkup}
                icon={Calendar}
                description="Date of your last medical checkup"
              >
                <Input
                  type="date"
                  value={formData.last_checkup}
                  onChange={(e) => handleInputChange('last_checkup', e.target.value)}
                />
              </FormField>
            </div>
          </CardContent>
        </Card>

        {/* Medical Conditions */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Stethoscope className="w-5 h-5" />
              Medical Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              {formData.medical_conditions.map((condition, index) => (
                <Badge key={index} variant="secondary" className="bg-red-100 text-red-700">
                  {condition}
                  <button
                    onClick={() => {
                      const newConditions = formData.medical_conditions.filter((_, i) => i !== index);
                      handleInputChange('medical_conditions', newConditions);
                    }}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a medical condition"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const input = e.target as HTMLInputElement;
                    if (input.value.trim()) {
                      handleInputChange('medical_conditions', [...formData.medical_conditions, input.value.trim()]);
                      input.value = '';
                    }
                  }
                }}
              />
              <Button
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Add a medical condition"]') as HTMLInputElement;
                  if (input?.value.trim()) {
                    handleInputChange('medical_conditions', [...formData.medical_conditions, input.value.trim()]);
                    input.value = '';
                  }
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Medications */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Pill className="w-5 h-5" />
              Medications
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {formData.medications.map((medication, index) => (
              <ArrayItemCard
                key={index}
                title="Medication"
                item={medication}
                index={index}
                onUpdate={handleArrayInputChange.bind(null, 'medications')}
                onRemove={removeArrayItem.bind(null, 'medications')}
                fields={[
                  { key: 'name', label: 'Medication Name', type: 'text', placeholder: 'Enter medication name' },
                  { key: 'dosage', label: 'Dosage', type: 'text', placeholder: 'e.g., 10mg' },
                  { key: 'frequency', label: 'Frequency', type: 'select', options: ['Daily', 'Twice daily', 'Three times daily', 'Weekly', 'As needed'], placeholder: 'Select frequency' },
                  { key: 'prescribed_by', label: 'Prescribed By', type: 'text', placeholder: 'Doctor name' },
                  { key: 'start_date', label: 'Start Date', type: 'date' },
                  { key: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Additional notes' }
                ]}
              />
            ))}
            <Button
              variant="outline"
              onClick={() => addArrayItem('medications', {
                name: '',
                dosage: '',
                frequency: '',
                prescribed_by: '',
                start_date: '',
                notes: ''
              })}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Medication
            </Button>
          </CardContent>
        </Card>

        {/* Supplements */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <FlaskConical className="w-5 h-5" />
              Supplements
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {formData.supplements.map((supplement, index) => (
              <ArrayItemCard
                key={index}
                title="Supplement"
                item={supplement}
                index={index}
                onUpdate={handleArrayInputChange.bind(null, 'supplements')}
                onRemove={removeArrayItem.bind(null, 'supplements')}
                fields={[
                  { key: 'name', label: 'Supplement Name', type: 'text', placeholder: 'Enter supplement name' },
                  { key: 'dosage', label: 'Dosage', type: 'text', placeholder: 'e.g., 500mg' },
                  { key: 'frequency', label: 'Frequency', type: 'select', options: ['Daily', 'Twice daily', 'Three times daily', 'Weekly', 'As needed'], placeholder: 'Select frequency' },
                  { key: 'purpose', label: 'Purpose', type: 'text', placeholder: 'Why you take this supplement' },
                  { key: 'start_date', label: 'Start Date', type: 'date' },
                  { key: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Additional notes' }
                ]}
              />
            ))}
            <Button
              variant="outline"
              onClick={() => addArrayItem('supplements', {
                name: '',
                dosage: '',
                frequency: '',
                purpose: '',
                start_date: '',
                notes: ''
              })}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Supplement
            </Button>
          </CardContent>
        </Card>

        {/* Allergies */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Allergies
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {formData.allergies.map((allergy, index) => (
              <ArrayItemCard
                key={index}
                title="Allergy"
                item={allergy}
                index={index}
                onUpdate={handleArrayInputChange.bind(null, 'allergies')}
                onRemove={removeArrayItem.bind(null, 'allergies')}
                fields={[
                  { key: 'allergen', label: 'Allergen', type: 'text', placeholder: 'What you are allergic to' },
                  { key: 'severity', label: 'Severity', type: 'select', options: ['mild', 'moderate', 'severe'], placeholder: 'Select severity' },
                  { key: 'symptoms', label: 'Symptoms', type: 'textarea', placeholder: 'Describe your symptoms' },
                  { key: 'treatment', label: 'Treatment', type: 'textarea', placeholder: 'How you treat this allergy' },
                  { key: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Additional notes' }
                ]}
              />
            ))}
            <Button
              variant="outline"
              onClick={() => addArrayItem('allergies', {
                allergen: '',
                severity: '',
                symptoms: '',
                treatment: '',
                notes: ''
              })}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Allergy
            </Button>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Emergency Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField 
                label="Name" 
                error={errors['emergency_contact.name']}
                icon={User}
              >
                <Input
                  value={formData.emergency_contact.name}
                  onChange={(e) => handleNestedInputChange('emergency_contact', 'name', e.target.value)}
                  placeholder="Enter contact name"
                />
              </FormField>

              <FormField 
                label="Relationship" 
                error={errors['emergency_contact.relationship']}
                icon={Heart}
              >
                <Input
                  value={formData.emergency_contact.relationship}
                  onChange={(e) => handleNestedInputChange('emergency_contact', 'relationship', e.target.value)}
                  placeholder="e.g., Spouse, Parent, Friend"
                />
              </FormField>

              <FormField 
                label="Phone" 
                error={errors['emergency_contact.phone']}
                icon={Phone}
              >
                <Input
                  type="tel"
                  value={formData.emergency_contact.phone}
                  onChange={(e) => handleNestedInputChange('emergency_contact', 'phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </FormField>

              <FormField 
                label="Email" 
                error={errors['emergency_contact.email']}
                icon={Mail}
              >
                <Input
                  type="email"
                  value={formData.emergency_contact.email}
                  onChange={(e) => handleNestedInputChange('emergency_contact', 'email', e.target.value)}
                  placeholder="Enter email address"
                />
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
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 w-full sm:w-auto shadow-md"
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
