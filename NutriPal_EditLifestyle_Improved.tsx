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
  Leaf,
  Clock,
  Utensils,
  Coffee,
  Wine,
  Cigarette,
  Activity,
  Moon,
  Sun,
  Zap,
  Target,
  Heart,
  Brain,
  Shield,
  CheckCircle,
  AlertTriangle,
  Info,
  Loader2,
  Plus,
  X,
  Edit3,
  Calendar,
  User,
  Star,
  Award,
  TrendingUp,
  Scale,
  Timer,
  Droplets,
  Flame,
  Apple,
  Carrot,
  Fish,
  Beef,
  Milk,
  Wheat,
  Nuts,
  Egg
} from 'lucide-react';

// ✅ Type Definitions
interface UserData {
  id: string;
  dietary_preferences?: string[];
  dietary_restrictions?: string[];
  food_allergies?: string[];
  lifestyle_factors?: string[];
  health_goals?: string[];
  intermittent_fasting?: string;
  meal_preferences?: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
    snacks?: string;
  };
  water_intake?: number;
  caffeine_intake?: number;
  alcohol_consumption?: 'none' | 'light' | 'moderate' | 'heavy';
  smoking_status?: 'never' | 'former' | 'current';
  sleep_schedule?: {
    bedtime?: string;
    wake_time?: string;
    quality?: 'poor' | 'fair' | 'good' | 'excellent';
  };
  exercise_routine?: {
    type?: string[];
    frequency?: string;
    duration?: number;
    intensity?: 'low' | 'moderate' | 'high';
  };
  stress_management?: string[];
  work_schedule?: {
    hours_per_week?: number;
    shift_type?: 'day' | 'night' | 'rotating';
    remote_work?: boolean;
  };
  profile_completed?: boolean;
}

interface FormData {
  dietary_preferences: string[];
  dietary_restrictions: string[];
  food_allergies: string[];
  lifestyle_factors: string[];
  health_goals: string[];
  intermittent_fasting: string;
  meal_preferences: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string;
  };
  water_intake: number;
  caffeine_intake: number;
  alcohol_consumption: string;
  smoking_status: string;
  sleep_schedule: {
    bedtime: string;
    wake_time: string;
    quality: string;
  };
  exercise_routine: {
    type: string[];
    frequency: string;
    duration: number;
    intensity: string;
  };
  stress_management: string[];
  work_schedule: {
    hours_per_week: number;
    shift_type: string;
    remote_work: boolean;
  };
}

interface FormErrors {
  [key: string]: string;
}

// ✅ Custom hook for lifestyle form management
const useLifestyleForm = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    dietary_preferences: [],
    dietary_restrictions: [],
    food_allergies: [],
    lifestyle_factors: [],
    health_goals: [],
    intermittent_fasting: '',
    meal_preferences: {
      breakfast: '',
      lunch: '',
      dinner: '',
      snacks: ''
    },
    water_intake: 8,
    caffeine_intake: 0,
    alcohol_consumption: 'none',
    smoking_status: 'never',
    sleep_schedule: {
      bedtime: '',
      wake_time: '',
      quality: 'good'
    },
    exercise_routine: {
      type: [],
      frequency: '',
      duration: 30,
      intensity: 'moderate'
    },
    stress_management: [],
    work_schedule: {
      hours_per_week: 40,
      shift_type: 'day',
      remote_work: false
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
      setFormData({
        dietary_preferences: userData.dietary_preferences || [],
        dietary_restrictions: userData.dietary_restrictions || [],
        food_allergies: userData.food_allergies || [],
        lifestyle_factors: userData.lifestyle_factors || [],
        health_goals: userData.health_goals || [],
        intermittent_fasting: userData.intermittent_fasting || '',
        meal_preferences: userData.meal_preferences || {
          breakfast: '',
          lunch: '',
          dinner: '',
          snacks: ''
        },
        water_intake: userData.water_intake || 8,
        caffeine_intake: userData.caffeine_intake || 0,
        alcohol_consumption: userData.alcohol_consumption || 'none',
        smoking_status: userData.smoking_status || 'never',
        sleep_schedule: userData.sleep_schedule || {
          bedtime: '',
          wake_time: '',
          quality: 'good'
        },
        exercise_routine: userData.exercise_routine || {
          type: [],
          frequency: '',
          duration: 30,
          intensity: 'moderate'
        },
        stress_management: userData.stress_management || [],
        work_schedule: userData.work_schedule || {
          hours_per_week: 40,
          shift_type: 'day',
          remote_work: false
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
    if (formData.water_intake < 0 || formData.water_intake > 20) {
      newErrors.water_intake = 'Water intake must be between 0 and 20 glasses';
    }
    
    if (formData.caffeine_intake < 0 || formData.caffeine_intake > 10) {
      newErrors.caffeine_intake = 'Caffeine intake must be between 0 and 10 cups';
    }
    
    if (formData.exercise_routine.duration < 0 || formData.exercise_routine.duration > 300) {
      newErrors['exercise_routine.duration'] = 'Exercise duration must be between 0 and 300 minutes';
    }
    
    if (formData.work_schedule.hours_per_week < 0 || formData.work_schedule.hours_per_week > 168) {
      newErrors['work_schedule.hours_per_week'] = 'Work hours must be between 0 and 168 per week';
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

  const handleArrayInputChange = useCallback((arrayField: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [arrayField]: [...prev[arrayField as keyof FormData], value]
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
        description: "Your lifestyle information has been updated.",
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
    removeArrayItem,
    saveUserData,
    validateForm
  };
};

// ✅ Loading component
const LifestyleLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-green-600" />
      <p className="text-slate-600 text-lg">Loading your lifestyle profile...</p>
      <p className="text-slate-500 text-sm mt-2">Preparing lifestyle information form</p>
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

// ✅ Tag input component
const TagInput = ({ 
  label, 
  tags, 
  onAdd, 
  onRemove, 
  placeholder, 
  icon: Icon,
  description 
}: {
  label: string;
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (index: number) => void;
  placeholder: string;
  icon?: React.ComponentType<any>;
  description?: string;
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <FormField label={label} icon={Icon} description={description}>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-green-100 text-green-700">
              {tag}
              <button
                onClick={() => onRemove(index)}
                className="ml-2 text-green-500 hover:text-green-700"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleAdd}
            disabled={!inputValue.trim() || tags.includes(inputValue.trim())}
            size="sm"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </FormField>
  );
};

// ✅ Lifestyle summary component
const LifestyleSummary = ({ formData }: { formData: FormData }) => {
  const getHealthScore = () => {
    let score = 0;
    let maxScore = 0;

    // Water intake (0-20 points)
    maxScore += 20;
    if (formData.water_intake >= 8) score += 20;
    else if (formData.water_intake >= 6) score += 15;
    else if (formData.water_intake >= 4) score += 10;
    else if (formData.water_intake >= 2) score += 5;

    // Exercise (0-25 points)
    maxScore += 25;
    if (formData.exercise_routine.frequency === 'daily') score += 25;
    else if (formData.exercise_routine.frequency === '4-5x-week') score += 20;
    else if (formData.exercise_routine.frequency === '2-3x-week') score += 15;
    else if (formData.exercise_routine.frequency === 'weekly') score += 10;
    else if (formData.exercise_routine.frequency === 'rarely') score += 5;

    // Sleep quality (0-20 points)
    maxScore += 20;
    if (formData.sleep_schedule.quality === 'excellent') score += 20;
    else if (formData.sleep_schedule.quality === 'good') score += 15;
    else if (formData.sleep_schedule.quality === 'fair') score += 10;
    else if (formData.sleep_schedule.quality === 'poor') score += 5;

    // Smoking status (0-15 points)
    maxScore += 15;
    if (formData.smoking_status === 'never') score += 15;
    else if (formData.smoking_status === 'former') score += 10;
    else if (formData.smoking_status === 'current') score += 0;

    // Alcohol consumption (0-10 points)
    maxScore += 10;
    if (formData.alcohol_consumption === 'none') score += 10;
    else if (formData.alcohol_consumption === 'light') score += 8;
    else if (formData.alcohol_consumption === 'moderate') score += 5;
    else if (formData.alcohol_consumption === 'heavy') score += 0;

    // Caffeine intake (0-10 points)
    maxScore += 10;
    if (formData.caffeine_intake <= 2) score += 10;
    else if (formData.caffeine_intake <= 4) score += 7;
    else if (formData.caffeine_intake <= 6) score += 5;
    else if (formData.caffeine_intake <= 8) score += 3;
    else score += 0;

    return Math.round((score / maxScore) * 100);
  };

  const healthScore = getHealthScore();
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

  const ScoreIcon = getScoreIcon(healthScore);

  return (
    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ScoreIcon className={`w-6 h-6 ${getScoreColor(healthScore)}`} />
            <div>
              <h3 className="font-semibold text-slate-800">Lifestyle Health Score</h3>
              <p className="text-sm text-slate-600">Based on your current lifestyle choices</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getScoreColor(healthScore)}`}>
              {healthScore}%
            </div>
            <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  healthScore >= 80 ? 'bg-green-500' : 
                  healthScore >= 60 ? 'bg-yellow-500' : 
                  healthScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${healthScore}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function EditLifestyle() {
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
    removeArrayItem,
    saveUserData
  } = useLifestyleForm();

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
    return <LifestyleLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-slate-800">Lifestyle & Diet</CardTitle>
                <p className="text-slate-600">Manage dietary preferences, exercise, and lifestyle habits</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Lifestyle Summary */}
        <LifestyleSummary formData={formData} />

        {/* Dietary Preferences */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Utensils className="w-5 h-5" />
              Dietary Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <TagInput
              label="Dietary Preferences"
              tags={formData.dietary_preferences}
              onAdd={(tag) => handleArrayInputChange('dietary_preferences', tag)}
              onRemove={(index) => removeArrayItem('dietary_preferences', index)}
              placeholder="e.g., Mediterranean, Keto, Vegetarian"
              icon={Utensils}
              description="Your preferred eating patterns and diets"
            />

            <TagInput
              label="Dietary Restrictions"
              tags={formData.dietary_restrictions}
              onAdd={(tag) => handleArrayInputChange('dietary_restrictions', tag)}
              onRemove={(index) => removeArrayItem('dietary_restrictions', index)}
              placeholder="e.g., No dairy, Low sodium, Gluten-free"
              icon={Shield}
              description="Foods or ingredients you avoid"
            />

            <TagInput
              label="Food Allergies"
              tags={formData.food_allergies}
              onAdd={(tag) => handleArrayInputChange('food_allergies', tag)}
              onRemove={(index) => removeArrayItem('food_allergies', index)}
              placeholder="e.g., Nuts, Shellfish, Soy"
              icon={AlertTriangle}
              description="Foods you are allergic to"
            />

            <FormField 
              label="Intermittent Fasting" 
              error={errors.intermittent_fasting}
              icon={Clock}
              description="Your current fasting schedule"
            >
              <Select value={formData.intermittent_fasting} onValueChange={(value) => handleInputChange('intermittent_fasting', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fasting schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No fasting</SelectItem>
                  <SelectItem value="12:12">12:12 (12 hours fasting, 12 hours eating)</SelectItem>
                  <SelectItem value="14:10">14:10 (14 hours fasting, 10 hours eating)</SelectItem>
                  <SelectItem value="16:8">16:8 (16 hours fasting, 8 hours eating)</SelectItem>
                  <SelectItem value="18:6">18:6 (18 hours fasting, 6 hours eating)</SelectItem>
                  <SelectItem value="20:4">20:4 (20 hours fasting, 4 hours eating)</SelectItem>
                  <SelectItem value="5:2">5:2 (5 days normal eating, 2 days restricted)</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </CardContent>
        </Card>

        {/* Meal Preferences */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Meal Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField 
                label="Breakfast" 
                error={errors['meal_preferences.breakfast']}
                icon={Sun}
                description="Your typical breakfast preferences"
              >
                <Textarea
                  value={formData.meal_preferences.breakfast}
                  onChange={(e) => handleNestedInputChange('meal_preferences', 'breakfast', e.target.value)}
                  placeholder="e.g., Oatmeal with berries, Greek yogurt, or skip breakfast"
                  rows={3}
                  className="resize-none"
                />
              </FormField>

              <FormField 
                label="Lunch" 
                error={errors['meal_preferences.lunch']}
                icon={Sun}
                description="Your typical lunch preferences"
              >
                <Textarea
                  value={formData.meal_preferences.lunch}
                  onChange={(e) => handleNestedInputChange('meal_preferences', 'lunch', e.target.value)}
                  placeholder="e.g., Salad with protein, Sandwich, or leftovers"
                  rows={3}
                  className="resize-none"
                />
              </FormField>

              <FormField 
                label="Dinner" 
                error={errors['meal_preferences.dinner']}
                icon={Moon}
                description="Your typical dinner preferences"
              >
                <Textarea
                  value={formData.meal_preferences.dinner}
                  onChange={(e) => handleNestedInputChange('meal_preferences', 'dinner', e.target.value)}
                  placeholder="e.g., Grilled chicken with vegetables, Pasta, or takeout"
                  rows={3}
                  className="resize-none"
                />
              </FormField>

              <FormField 
                label="Snacks" 
                error={errors['meal_preferences.snacks']}
                icon={Apple}
                description="Your typical snack preferences"
              >
                <Textarea
                  value={formData.meal_preferences.snacks}
                  onChange={(e) => handleNestedInputChange('meal_preferences', 'snacks', e.target.value)}
                  placeholder="e.g., Nuts, Fruit, Protein bars, or no snacks"
                  rows={3}
                  className="resize-none"
                />
              </FormField>
            </div>
          </CardContent>
        </Card>

        {/* Daily Habits */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Daily Habits
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField 
                label="Water Intake (glasses)" 
                required 
                error={errors.water_intake}
                icon={Droplets}
                description="Glasses of water per day"
              >
                <Input
                  type="number"
                  value={formData.water_intake}
                  onChange={(e) => handleInputChange('water_intake', parseInt(e.target.value) || 0)}
                  placeholder="Enter glasses per day"
                  min="0"
                  max="20"
                  className={errors.water_intake ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                label="Caffeine Intake (cups)" 
                error={errors.caffeine_intake}
                icon={Coffee}
                description="Cups of coffee/tea per day"
              >
                <Input
                  type="number"
                  value={formData.caffeine_intake}
                  onChange={(e) => handleInputChange('caffeine_intake', parseInt(e.target.value) || 0)}
                  placeholder="Enter cups per day"
                  min="0"
                  max="10"
                  className={errors.caffeine_intake ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                label="Alcohol Consumption" 
                error={errors.alcohol_consumption}
                icon={Wine}
                description="Your alcohol consumption level"
              >
                <Select value={formData.alcohol_consumption} onValueChange={(value) => handleInputChange('alcohol_consumption', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select consumption level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="light">Light (1-2 drinks/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (3-7 drinks/week)</SelectItem>
                    <SelectItem value="heavy">Heavy (8+ drinks/week)</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField 
                label="Smoking Status" 
                error={errors.smoking_status}
                icon={Cigarette}
                description="Your smoking status"
              >
                <Select value={formData.smoking_status} onValueChange={(value) => handleInputChange('smoking_status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select smoking status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never smoked</SelectItem>
                    <SelectItem value="former">Former smoker</SelectItem>
                    <SelectItem value="current">Current smoker</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </div>
          </CardContent>
        </Card>

        {/* Exercise & Sleep */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Exercise & Sleep
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Exercise Routine
                </h4>
                
                <TagInput
                  label="Exercise Types"
                  tags={formData.exercise_routine.type}
                  onAdd={(tag) => handleArrayInputChange('exercise_routine.type', tag)}
                  onRemove={(index) => removeArrayItem('exercise_routine.type', index)}
                  placeholder="e.g., Running, Yoga, Weightlifting"
                  description="Types of exercise you do"
                />

                <FormField 
                  label="Exercise Frequency" 
                  error={errors['exercise_routine.frequency']}
                  icon={Calendar}
                >
                  <Select value={formData.exercise_routine.frequency} onValueChange={(value) => handleNestedInputChange('exercise_routine', 'frequency', value)}>
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
                  label="Exercise Duration (minutes)" 
                  error={errors['exercise_routine.duration']}
                  icon={Timer}
                >
                  <Input
                    type="number"
                    value={formData.exercise_routine.duration}
                    onChange={(e) => handleNestedInputChange('exercise_routine', 'duration', parseInt(e.target.value) || 0)}
                    placeholder="Enter duration in minutes"
                    min="0"
                    max="300"
                    className={errors['exercise_routine.duration'] ? 'border-red-500' : ''}
                  />
                </FormField>

                <FormField 
                  label="Exercise Intensity" 
                  error={errors['exercise_routine.intensity']}
                  icon={Flame}
                >
                  <Select value={formData.exercise_routine.intensity} onValueChange={(value) => handleNestedInputChange('exercise_routine', 'intensity', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select intensity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Moon className="w-4 h-4" />
                  Sleep Schedule
                </h4>

                <FormField 
                  label="Bedtime" 
                  error={errors['sleep_schedule.bedtime']}
                  icon={Moon}
                >
                  <Input
                    type="time"
                    value={formData.sleep_schedule.bedtime}
                    onChange={(e) => handleNestedInputChange('sleep_schedule', 'bedtime', e.target.value)}
                  />
                </FormField>

                <FormField 
                  label="Wake Time" 
                  error={errors['sleep_schedule.wake_time']}
                  icon={Sun}
                >
                  <Input
                    type="time"
                    value={formData.sleep_schedule.wake_time}
                    onChange={(e) => handleNestedInputChange('sleep_schedule', 'wake_time', e.target.value)}
                  />
                </FormField>

                <FormField 
                  label="Sleep Quality" 
                  error={errors['sleep_schedule.quality']}
                  icon={Star}
                >
                  <Select value={formData.sleep_schedule.quality} onValueChange={(value) => handleNestedInputChange('sleep_schedule', 'quality', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sleep quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="poor">Poor</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="excellent">Excellent</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Goals & Stress Management */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Health Goals & Stress Management
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <TagInput
              label="Health Goals"
              tags={formData.health_goals}
              onAdd={(tag) => handleArrayInputChange('health_goals', tag)}
              onRemove={(index) => removeArrayItem('health_goals', index)}
              placeholder="e.g., Lose weight, Build muscle, Improve energy"
              icon={Target}
              description="Your health and fitness goals"
            />

            <TagInput
              label="Stress Management"
              tags={formData.stress_management}
              onAdd={(tag) => handleArrayInputChange('stress_management', tag)}
              onRemove={(index) => removeArrayItem('stress_management', index)}
              placeholder="e.g., Meditation, Exercise, Reading, Music"
              icon={Brain}
              description="Activities you use to manage stress"
            />

            <TagInput
              label="Lifestyle Factors"
              tags={formData.lifestyle_factors}
              onAdd={(tag) => handleArrayInputChange('lifestyle_factors', tag)}
              onRemove={(index) => removeArrayItem('lifestyle_factors', index)}
              placeholder="e.g., Travel frequently, Work night shifts, Have pets"
              icon={Heart}
              description="Factors that influence your lifestyle"
            />
          </CardContent>
        </Card>

        {/* Work Schedule */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <User className="w-5 h-5" />
              Work Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField 
                label="Hours per Week" 
                error={errors['work_schedule.hours_per_week']}
                icon={Clock}
                description="Average hours worked per week"
              >
                <Input
                  type="number"
                  value={formData.work_schedule.hours_per_week}
                  onChange={(e) => handleNestedInputChange('work_schedule', 'hours_per_week', parseInt(e.target.value) || 0)}
                  placeholder="Enter hours per week"
                  min="0"
                  max="168"
                  className={errors['work_schedule.hours_per_week'] ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                label="Shift Type" 
                error={errors['work_schedule.shift_type']}
                icon={Calendar}
                description="Your work schedule type"
              >
                <Select value={formData.work_schedule.shift_type} onValueChange={(value) => handleNestedInputChange('work_schedule', 'shift_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day shift</SelectItem>
                    <SelectItem value="night">Night shift</SelectItem>
                    <SelectItem value="rotating">Rotating shifts</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField 
                label="Remote Work" 
                error={errors['work_schedule.remote_work']}
                icon={Monitor}
                description="Do you work remotely?"
              >
                <Select value={formData.work_schedule.remote_work.toString()} onValueChange={(value) => handleNestedInputChange('work_schedule', 'remote_work', value === 'true')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
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
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 w-full sm:w-auto shadow-md"
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
