import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { User } from '@/entities/User';
import { InvokeLLM } from '@/integrations/Core';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Loader2, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle, 
  ShieldCheck, 
  ArrowLeft,
  Clock,
  Heart,
  Brain,
  TrendingUp,
  Shield,
  Calendar,
  Target,
  Zap,
  RefreshCw,
  Save,
  BookOpen,
  Users,
  Activity,
  Award,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useToast } from "@/components/ui/use-toast";

// ✅ Type Definitions
interface UserData {
  id: string;
  age?: number;
  gender?: string;
  medical_conditions?: string[];
  medications?: string[];
  supplements?: string[];
  dietary_preferences?: string[];
  profile_completed?: boolean;
}

interface IFPlan {
  plan_type: string;
  description: string;
  fasting_hours: number;
  eating_hours: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  benefits: string[];
  icon: React.ComponentType<any>;
  color: string;
}

interface AnalysisResult {
  recommendation_type: 'recommended' | 'not_recommended' | 'use_with_caution';
  reason: string;
  plan_type: string;
  benefits?: string[];
  getting_started_tips?: string[];
  warnings?: string[];
  risk_factors?: string[];
  doctor_consultation?: boolean;
  alternative_suggestions?: string[];
}

// ✅ IF Plan configurations
const IF_PLANS: Record<string, IFPlan> = {
  '12:12': {
    plan_type: '12:12',
    description: '12 hours fasting, 12 hours eating',
    fasting_hours: 12,
    eating_hours: 12,
    difficulty: 'beginner',
    benefits: ['Easy to start', 'Natural circadian rhythm', 'Minimal lifestyle changes'],
    icon: Clock,
    color: 'text-green-600'
  },
  '14:10': {
    plan_type: '14:10',
    description: '14 hours fasting, 10 hours eating',
    fasting_hours: 14,
    eating_hours: 10,
    difficulty: 'beginner',
    benefits: ['Good for beginners', 'Flexible eating window', 'Metabolic benefits'],
    icon: Heart,
    color: 'text-blue-600'
  },
  '16:8': {
    plan_type: '16:8',
    description: '16 hours fasting, 8 hours eating',
    fasting_hours: 16,
    eating_hours: 8,
    difficulty: 'intermediate',
    benefits: ['Popular choice', 'Significant metabolic benefits', 'Weight management'],
    icon: Target,
    color: 'text-purple-600'
  },
  '18:6': {
    plan_type: '18:6',
    description: '18 hours fasting, 6 hours eating',
    fasting_hours: 18,
    eating_hours: 6,
    difficulty: 'intermediate',
    benefits: ['Enhanced autophagy', 'Better insulin sensitivity', 'Time-restricted eating'],
    icon: Zap,
    color: 'text-orange-600'
  },
  '20:4': {
    plan_type: '20:4',
    description: '20 hours fasting, 4 hours eating',
    fasting_hours: 20,
    eating_hours: 4,
    difficulty: 'advanced',
    benefits: ['Maximum autophagy', 'Intense metabolic benefits', 'Advanced fasting'],
    icon: Brain,
    color: 'text-red-600'
  },
  '5:2': {
    plan_type: '5:2',
    description: '5 days normal eating, 2 days restricted calories',
    fasting_hours: 0,
    eating_hours: 24,
    difficulty: 'intermediate',
    benefits: ['Flexible schedule', 'Calorie restriction benefits', 'Social eating friendly'],
    icon: Calendar,
    color: 'text-indigo-600'
  }
};

// ✅ Custom hook for IF analysis
const useIFAnalysis = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadUser = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const userData = await User.me();
      setUser(userData);
    } catch (error) {
      console.error("Failed to load user data:", error);
      setError(error instanceof Error ? error.message : "Failed to load user data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const analyzeProfile = useCallback(async () => {
    if (!user) return;
    
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setError(null);

    const prompt = `
      You are a dual-specialist clinical pharmacist and registered dietitian focused on metabolic health. Your primary goal is user safety. 
      Analyze this user's profile to determine if intermittent fasting (IF) is appropriate.

      USER PROFILE:
      - Age: ${user.age || 'Not specified'}
      - Gender: ${user.gender || 'Not specified'}
      - Medical Conditions: ${user.medical_conditions?.join(', ') || 'None'}
      - Medications: ${user.medications?.join(', ') || 'None'}
      - Supplements: ${user.supplements?.join(', ') || 'None'}
      - Dietary Preferences/Goals: ${user.dietary_preferences?.join(', ') || 'None'}

      ANALYSIS STEPS:
      1.  **Check for Contraindications:** Critically evaluate for risks. ABSOLUTE contraindications include Type 1 Diabetes, history of eating disorders, pregnancy, or being underweight. RELATIVE contraindications include taking medications that affect blood sugar (like metformin, insulin, sulfonylureas) or blood pressure, which require caution and doctor consultation.
      2.  **Determine Recommendation Type:**
          - If ABSOLUTE contraindications exist, set recommendation_type to "not_recommended".
          - If RELATIVE contraindications exist, set recommendation_type to "use_with_caution".
          - If it is safe, set recommendation_type to "recommended".
      3.  **Formulate Response:**
          - For "not_recommended": Provide a clear, empathetic reason explaining the specific risk.
          - For "use_with_caution": Explain the specific risks and STRONGLY advise consulting a doctor before proceeding. Suggest a very gentle starting plan like a 12:12 or 14:10 fast if they get medical approval.
          - For "recommended": Suggest the most suitable IF plan (e.g., 16:8, 18:6). Provide a rationale for why this plan is a good fit. Include a list of potential benefits for this user, a few getting started tips, and general warnings.

      Return ONLY a JSON object with the specified format.`;

    try {
      const result = await InvokeLLM({
        prompt,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            recommendation_type: { "type": "string", "enum": ["recommended", "not_recommended", "use_with_caution"] },
            reason: { "type": "string" },
            plan_type: { "type": "string", "enum": ["16:8", "18:6", "20:4", "5:2", "14:10", "12:12", "none"] },
            benefits: { "type": "array", "items": { "type": "string" } },
            getting_started_tips: { "type": "array", "items": { "type": "string" } },
            warnings: { "type": "array", "items": { "type": "string" } },
            risk_factors: { "type": "array", "items": { "type": "string" } },
            doctor_consultation: { "type": "boolean" },
            alternative_suggestions: { "type": "array", "items": { "type": "string" } }
          },
          required: ["recommendation_type", "reason"]
        }
      });
      setAnalysisResult(result);
    } catch (error) {
      console.error("Error during IF analysis:", error);
      setError(error instanceof Error ? error.message : "Analysis failed");
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [user, toast]);

  const savePlan = useCallback(async () => {
    if (!analysisResult || analysisResult.recommendation_type === 'not_recommended') return;
    
    try {
      await User.updateMyUserData({
        intermittent_fasting: analysisResult.plan_type
      });
      toast({
        title: "Plan Saved! 🎉",
        description: `Your intermittent fasting plan has been set to ${analysisResult.plan_type}.`,
        duration: 5000,
      });
      return true;
    } catch (error) {
      console.error("Error saving IF plan:", error);
      toast({
        title: "Save Failed",
        description: "Could not save your new plan. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  }, [analysisResult, toast]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return {
    user,
    isLoading,
    isAnalyzing,
    analysisResult,
    error,
    analyzeProfile,
    savePlan,
    refetch: loadUser
  };
};

// ✅ Loading component
const IFPlannerLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-emerald-600" />
      <p className="text-slate-600 text-lg">Loading your profile...</p>
      <p className="text-slate-500 text-sm mt-2">Preparing intermittent fasting analysis</p>
    </div>
  </div>
);

// ✅ Error component
const IFPlannerError = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-6">
    <Card className="max-w-md w-full">
      <CardContent className="pt-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          Loading Error
        </h3>
        <p className="text-slate-600 mb-4">{error}</p>
        <Button onClick={onRetry} className="touch-button">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default function IFPlanner() {
  const navigate = useNavigate();
  const { 
    user, 
    isLoading, 
    isAnalyzing, 
    analysisResult, 
    error, 
    analyzeProfile, 
    savePlan, 
    refetch 
  } = useIFAnalysis();

  // ✅ Memoized plan details
  const selectedPlan = useMemo(() => {
    if (!analysisResult?.plan_type || analysisResult.plan_type === 'none') return null;
    return IF_PLANS[analysisResult.plan_type];
  }, [analysisResult?.plan_type]);

  const handleSavePlan = async () => {
    const success = await savePlan();
    if (success) {
      // Navigate based on profile completion status
      if (!user?.profile_completed) {
        navigate(createPageUrl('Profile') + '?step=4');
      } else {
        navigate(createPageUrl('Dashboard'));
      }
    }
  };

  const handleGoBack = () => {
    if (!user?.profile_completed) {
      navigate(createPageUrl('Profile') + '?step=3');
    } else {
      navigate(createPageUrl('Profile'));
    }
  };

  const renderResult = () => {
    if (!analysisResult) return null;

    switch (analysisResult.recommendation_type) {
      case 'not_recommended':
        return (
          <>
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <AlertTitle className="text-red-800">Intermittent Fasting Not Recommended</AlertTitle>
              <AlertDescription className="text-sm leading-relaxed text-red-700">
                {analysisResult.reason} We strongly advise against starting intermittent fasting. Please consult your healthcare provider for guidance.
              </AlertDescription>
            </Alert>
            
            {analysisResult.alternative_suggestions && (
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800 text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Alternative Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResult.alternative_suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-blue-700">
                        <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
            
            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
              <Button variant="outline" onClick={handleGoBack} className="w-full sm:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              <Button onClick={() => {
                User.updateMyUserData({ intermittent_fasting: 'none' });
                if (!user?.profile_completed) {
                  navigate(createPageUrl('Profile') + '?step=4');
                } else {
                  navigate(createPageUrl('Profile'));
                }
              }} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                Continue Without IF
              </Button>
            </div>
          </>
        );

      case 'use_with_caution':
        return (
          <>
            <Alert variant="warning" className="bg-yellow-50 border-yellow-200">
              <ShieldCheck className="h-5 w-5 text-yellow-600" />
              <AlertTitle className="text-yellow-800">Caution Required</AlertTitle>
              <AlertDescription className="text-sm leading-relaxed text-yellow-700">
                {analysisResult.reason} Before starting any fasting schedule, consult with your doctor. If approved, the {analysisResult.plan_type} plan may be appropriate.
              </AlertDescription>
            </Alert>

            {selectedPlan && (
              <Card className="bg-yellow-50 border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-yellow-800 text-lg flex items-center gap-2">
                    <selectedPlan.icon className="w-5 h-5" />
                    Suggested Plan: {selectedPlan.plan_type}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/50 rounded-lg p-3">
                      <div className="font-medium text-yellow-800">Fasting</div>
                      <div className="text-yellow-700">{selectedPlan.fasting_hours} hours</div>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <div className="font-medium text-yellow-800">Eating</div>
                      <div className="text-yellow-700">{selectedPlan.eating_hours} hours</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-yellow-800 text-sm mb-2">Benefits</h4>
                    <ul className="space-y-1">
                      {selectedPlan.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-yellow-700">
                          <CheckCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {analysisResult.doctor_consultation && (
              <Card className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-800 text-lg flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Doctor Consultation Required
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-orange-700">
                    Due to your medical profile, we strongly recommend consulting with your healthcare provider before starting any intermittent fasting plan.
                  </p>
                </CardContent>
              </Card>
            )}
            
            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
              <Button variant="outline" onClick={handleGoBack} className="w-full sm:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              <Button onClick={handleSavePlan} className="bg-yellow-600 hover:bg-yellow-700 w-full sm:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save Plan (With Doctor Approval)
              </Button>
            </div>
          </>
        );

      case 'recommended':
        return (
          <Card className="bg-emerald-50 border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-800">Recommendation: {analysisResult.plan_type} Fasting</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-800 text-sm mb-2">Why this plan?</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{analysisResult.reason}</p>
              </div>

              {selectedPlan && (
                <Card className="bg-white/50 border-emerald-200">
                  <CardHeader>
                    <CardTitle className="text-emerald-800 text-lg flex items-center gap-2">
                      <selectedPlan.icon className="w-5 h-5" />
                      {selectedPlan.plan_type} Plan Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-emerald-100 rounded-lg p-3">
                        <div className="font-medium text-emerald-800">Fasting</div>
                        <div className="text-2xl font-bold text-emerald-700">{selectedPlan.fasting_hours}h</div>
                      </div>
                      <div className="bg-emerald-100 rounded-lg p-3">
                        <div className="font-medium text-emerald-800">Eating</div>
                        <div className="text-2xl font-bold text-emerald-700">{selectedPlan.eating_hours}h</div>
                      </div>
                      <div className="bg-emerald-100 rounded-lg p-3">
                        <div className="font-medium text-emerald-800">Level</div>
                        <Badge className="bg-emerald-600 text-white capitalize">{selectedPlan.difficulty}</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-emerald-800 text-sm mb-2">Benefits</h4>
                      <ul className="space-y-1">
                        {selectedPlan.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-emerald-700">
                            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}

              {analysisResult.benefits && (
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-2">Personalized Benefits</h4>
                  <ul className="space-y-2">
                    {analysisResult.benefits.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <TrendingUp className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {analysisResult.getting_started_tips && (
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-2">Getting Started</h4>
                  <ul className="space-y-2">
                    {analysisResult.getting_started_tips.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <Zap className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {analysisResult.warnings && (
                <Alert className="bg-blue-50 border-blue-200">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-800">Important Warnings</AlertTitle>
                  <AlertDescription className="text-sm text-blue-700">
                    <ul className="space-y-1 mt-2">
                      {analysisResult.warnings.map((warning, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
                <Button variant="outline" onClick={handleGoBack} className="w-full sm:w-auto">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
                <Button onClick={handleSavePlan} className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
                  <Save className="w-4 h-4 mr-2" />
                  Save Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  // ✅ Loading state
  if (isLoading) {
    return <IFPlannerLoading />;
  }

  // ✅ Error state
  if (error) {
    return <IFPlannerError error={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-800">Intermittent Fasting Planner</CardTitle>
            <p className="text-slate-600 mt-3 text-lg max-w-2xl mx-auto">
              Let's analyze your health profile to find the right intermittent fasting plan for you.
            </p>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            {!analysisResult && (
              <div className="text-center space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <Heart className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-emerald-800">Health-First</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-blue-800">AI-Powered</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-purple-800">Safe Analysis</div>
                  </div>
                </div>
                
                <Button 
                  onClick={analyzeProfile} 
                  disabled={isAnalyzing} 
                  className="w-full max-w-md py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg hover:shadow-xl text-lg font-semibold"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      Analyzing Your Profile...
                    </>
                  ) : (
                    <>
                      <Activity className="w-5 h-5 mr-3" />
                      Find My Ideal Plan
                    </>
                  )}
                </Button>
              </div>
            )}
            
            {analysisResult && (
              <div className="space-y-6">
                {renderResult()}
                {!['not_recommended', 'use_with_caution', 'recommended'].includes(analysisResult.recommendation_type) && (
                  <div className="text-center">
                    <Button variant="outline" onClick={() => setAnalysisResult(null)}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Start Over
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
