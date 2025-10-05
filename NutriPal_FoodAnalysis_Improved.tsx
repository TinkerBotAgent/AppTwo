import React, { useState, useEffect, useCallback, useMemo } from "react";
import { User } from "@/entities/User";
import { FoodAnalysis as FoodAnalysisEntity } from "@/entities/FoodAnalysis";
import { InvokeLLM } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Shield, 
  Star, 
  Lock, 
  ArrowLeft, 
  Download,
  RefreshCw,
  Loader2,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  FileText,
  Brain,
  Activity,
  Zap,
  Target,
  BookOpen,
  Search,
  Filter,
  SortAsc,
  SortDesc
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

import FoodList from "@/components/analysis/FoodList";
import AnalysisHeader from "@/components/analysis/AnalysisHeader";
import MedicalDisclaimer from "@/components/shared/MedicalDisclaimer";

// ✅ Type Definitions
interface UserData {
  id: string;
  age?: number;
  gender?: string;
  subscription_tier?: string;
  medical_conditions?: string[];
  medications?: string[];
  supplements?: string[];
  food_allergies?: string[];
  dietary_preferences?: string[];
}

interface FoodAnalysisData {
  id: string;
  food_name: string;
  analysis_type: 'avoid' | 'safe' | 'recommended';
  reason: string;
  severity?: 'low' | 'medium' | 'high';
  apple_rating?: number;
  medical_source?: string;
  related_conditions?: string[];
  related_medications?: string[];
  interaction_mechanism?: string;
  created_date: string;
}

interface AnalysisStats {
  total: number;
  avoid: number;
  safe: number;
  recommended: number;
  highSeverity: number;
  averageRating: number;
}

// ✅ Custom hook for food analysis management
const useFoodAnalysis = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [foodAnalysis, setFoodAnalysis] = useState<FoodAnalysisData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastGenerated, setLastGenerated] = useState<Date | null>(null);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      
      const [userData, analysis] = await Promise.all([
        User.me(),
        FoodAnalysisEntity.list("-created_date")
      ]);
      
      setUser(userData);
      setFoodAnalysis(analysis || []);
      
      // Set last generated date
      if (analysis && analysis.length > 0) {
        const latestDate = new Date(Math.max(...analysis.map(item => new Date(item.created_date).getTime())));
        setLastGenerated(latestDate);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setError(error instanceof Error ? error.message : "Failed to load food analysis");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateAnalysis = useCallback(async () => {
    if (!user) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      // First, clear previous analysis to avoid duplicates
      const oldAnalysis = await FoodAnalysisEntity.list();
      for (const item of oldAnalysis) {
        await FoodAnalysisEntity.delete(item.id);
      }

      // Robustly normalize all medical data to lowercase for the AI
      const normalizeArray = (arr: string[] | undefined): string[] => 
        arr?.map(item => item.toLowerCase().trim()).filter(Boolean) || [];

      const medicalConditions = normalizeArray(user.medical_conditions);
      const medications = normalizeArray(user.medications);
      const supplements = normalizeArray(user.supplements);
      const allergies = normalizeArray(user.food_allergies);

      const prompt = `You are a dual-specialist clinical pharmacist and registered dietitian. Your task is to provide a highly specific, evidence-based food interaction and recommendation analysis based on the provided patient profile. General wellness advice is forbidden.

      PATIENT PROFILE:
      - Age: ${user.age || 'Not specified'}
      - Gender: ${user.gender || 'Not specified'}  
      - Medical conditions: ${medicalConditions.join(", ") || "None reported"}
      - Current medications: ${medications.join(", ") || "None reported"}
      - Supplements: ${supplements.join(", ") || "None reported"}
      - Known food allergies: ${allergies.join(", ") || "None reported"}
      - Dietary restrictions: ${user.dietary_preferences?.join(", ") || "None"}

      CRITICAL ANALYSIS REQUIREMENTS:

      1.  **AVOID LIST (High-Severity Focus):**
          *   Identify foods with clinically documented, significant negative interactions with the EXACT medications and conditions listed.
          *   Prioritize interactions that could cause serious adverse effects (e.g., grapefruit and statins, tyramine and MAOIs, vitamin K and warfarin).
          *   For EACH food, you MUST provide the specific medical mechanism (e.g., "Inhibits CYP3A4 enzyme, increasing drug concentration and risk of toxicity").
          *   Assign a "severity" of "low", "medium", or "high".

      2.  **RECOMMENDED LIST (Targeted Nutritional Support):**
          *   This is NOT a generic 'healthy foods' list.
          *   Identify foods rich in specific nutrients that directly support the user's conditions or counteract known medication side effects.
          *   **Rationale is mandatory and must be specific.** Example: "If a user takes Furosemide (a diuretic that depletes potassium), recommend bananas and sweet potatoes because they are high in potassium, helping to prevent hypokalemia." Another example: "For a user with an inflammatory condition like rheumatoid arthritis, recommend salmon due to its high omega-3 fatty acid content (EPA/DHA), which has known anti-inflammatory properties."
          *   Connect every recommendation directly to a condition or medication from the profile.
          *   **Assign an "apple_rating" from 1 (beneficial) to 5 (critically important for this profile's health). The rating must be an integer.**

      3.  **SAFE LIST (Confirmed Neutrality):**
          *   Identify common, healthy foods with NO known clinically significant interactions with the user's profile.
          *   These must be verifiably 'neutral' foods. Briefly state why they are considered safe in this context (e.g., "Low in potassium and tyramine, does not affect CYP450 enzymes").

      4.  **GENERAL RULES:**
          *   Reference verifiable medical and nutritional science databases (e.g., PubMed, UpToDate, FDA guidelines, Examine.com). Mention the mechanism or source type in your reasoning.
          *   Do not invent interactions. If no significant interactions or recommendations exist for a profile, state that clearly for that category.
          *   Return exactly 20 foods total, balanced across the three categories as medically appropriate.`;

      const result = await InvokeLLM({
        prompt,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            foods: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  food_name: { type: "string" },
                  analysis_type: { type: "string", enum: ["avoid", "safe", "recommended"] },
                  reason: { type: "string", description: "Specific medical mechanism and reason" },
                  severity: { type: "string", enum: ["low", "medium", "high"] },
                  apple_rating: { type: "number" },
                  medical_source: { type: "string", description: "Medical reference or mechanism" },
                  related_conditions: { type: "array", items: { type: "string" }},
                  related_medications: { type: "array", items: { type: "string" }},
                  interaction_mechanism: { type: "string", description: "How the interaction occurs" }
                }
              }
            }
          }
        }
      });

      // Save analysis results
      if (result.foods && result.foods.length > 0) {
        await FoodAnalysisEntity.bulkCreate(result.foods);
        await loadData(); // Reload the data to show results immediately
        setLastGenerated(new Date());
      }
    } catch (error) {
      console.error("Error generating analysis:", error);
      setError(error instanceof Error ? error.message : "Failed to generate analysis");
    } finally {
      setIsGenerating(false);
    }
  }, [user, loadData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { 
    user, 
    foodAnalysis, 
    isLoading, 
    isGenerating, 
    error, 
    lastGenerated,
    generateAnalysis, 
    refetch: loadData 
  };
};

// ✅ Enhanced export functionality
const useExport = () => {
  const exportToPDF = useCallback((foodAnalysis: FoodAnalysisData[]) => {
    // Enhanced CSV export with more details
    const csvData = foodAnalysis.map(food => ({
      Food: food.food_name,
      Category: food.analysis_type,
      Reason: food.reason,
      Severity: food.severity || 'N/A',
      'Apple Rating': food.apple_rating || 'N/A',
      'Medical Source': food.medical_source || 'N/A',
      'Related Conditions': food.related_conditions?.join('; ') || 'N/A',
      'Related Medications': food.related_medications?.join('; ') || 'N/A',
      'Interaction Mechanism': food.interaction_mechanism || 'N/A',
      'Generated Date': new Date(food.created_date).toLocaleDateString()
    }));

    const headers = Object.keys(csvData[0]);
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `food-analysis-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return { exportToPDF };
};

// ✅ Loading component
const FoodAnalysisLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-emerald-600" />
      <p className="text-slate-600 text-lg">Loading your food analysis...</p>
      <p className="text-slate-500 text-sm mt-2">Preparing personalized recommendations</p>
    </div>
  </div>
);

// ✅ Error component
const FoodAnalysisError = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-6">
    <Card className="max-w-md w-full">
      <CardContent className="pt-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          Analysis Error
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

export default function FoodAnalysis() {
  const navigate = useNavigate();
  const { user, foodAnalysis, isLoading, isGenerating, error, lastGenerated, generateAnalysis, refetch } = useFoodAnalysis();
  const { exportToPDF } = useExport();
  
  const [activeTab, setActiveTab] = useState("avoid");
  const [sortBy, setSortBy] = useState<'name' | 'severity' | 'rating'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // ✅ Check for tab parameter in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['avoid', 'safe', 'recommended'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);

  // ✅ Memoized analysis statistics
  const analysisStats: AnalysisStats = useMemo(() => {
    const avoid = foodAnalysis.filter(f => f.analysis_type === "avoid");
    const safe = foodAnalysis.filter(f => f.analysis_type === "safe");
    const recommended = foodAnalysis.filter(f => f.analysis_type === "recommended");
    
    return {
      total: foodAnalysis.length,
      avoid: avoid.length,
      safe: safe.length,
      recommended: recommended.length,
      highSeverity: avoid.filter(f => f.severity === 'high').length,
      averageRating: recommended.length > 0 
        ? Math.round(recommended.reduce((sum, f) => sum + (f.apple_rating || 0), 0) / recommended.length * 10) / 10
        : 0
    };
  }, [foodAnalysis]);

  // ✅ Memoized filtered and sorted foods
  const getFilteredFoods = useCallback((type: string) => {
    let foods = foodAnalysis.filter(f => f.analysis_type === type);
    
    // Sort foods
    foods.sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';
      
      switch (sortBy) {
        case 'name':
          aValue = a.food_name.toLowerCase();
          bValue = b.food_name.toLowerCase();
          break;
        case 'severity':
          const severityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
          aValue = severityOrder[a.severity as keyof typeof severityOrder] || 0;
          bValue = severityOrder[b.severity as keyof typeof severityOrder] || 0;
          break;
        case 'rating':
          aValue = a.apple_rating || 0;
          bValue = b.apple_rating || 0;
          break;
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
    
    return foods;
  }, [foodAnalysis, sortBy, sortOrder]);

  const avoidFoods = getFilteredFoods("avoid");
  const safeFoods = getFilteredFoods("safe");
  const recommendedFoods = getFilteredFoods("recommended");

  // ✅ Loading state
  if (isLoading) {
    return <FoodAnalysisLoading />;
  }

  // ✅ Error state
  if (error) {
    return <FoodAnalysisError error={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* ✅ Enhanced Header Card */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0 mb-8">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-slate-800">Food Analysis</CardTitle>
            </div>
            <p className="text-slate-600 mb-6 text-lg">
              Personalized food recommendations based on your health profile
            </p>
            
            {/* ✅ Enhanced statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
                  <span className="text-2xl font-bold text-red-700">{analysisStats.avoid}</span>
                </div>
                <p className="text-sm text-red-600 font-medium">Avoid</p>
                {analysisStats.highSeverity > 0 && (
                  <Badge className="bg-red-100 text-red-800 text-xs mt-1">
                    {analysisStats.highSeverity} High Risk
                  </Badge>
                )}
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="w-6 h-6 text-blue-600 mr-2" />
                  <span className="text-2xl font-bold text-blue-700">{analysisStats.safe}</span>
                </div>
                <p className="text-sm text-blue-600 font-medium">Safe</p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 text-emerald-600 mr-2" />
                  <span className="text-2xl font-bold text-emerald-700">{analysisStats.recommended}</span>
                </div>
                <p className="text-sm text-emerald-600 font-medium">Recommended</p>
                {analysisStats.averageRating > 0 && (
                  <Badge className="bg-emerald-100 text-emerald-800 text-xs mt-1">
                    Avg: {analysisStats.averageRating}/5
                  </Badge>
                )}
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Activity className="w-6 h-6 text-purple-600 mr-2" />
                  <span className="text-2xl font-bold text-purple-700">{analysisStats.total}</span>
                </div>
                <p className="text-sm text-purple-600 font-medium">Total</p>
                {lastGenerated && (
                  <Badge className="bg-purple-100 text-purple-800 text-xs mt-1">
                    {lastGenerated.toLocaleDateString()}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* ✅ Enhanced Analysis Header */}
        <AnalysisHeader 
          onGenerate={generateAnalysis}
          onExport={() => exportToPDF(foodAnalysis)}
          isGenerating={isGenerating}
          hasData={foodAnalysis.length > 0}
          lastGenerated={lastGenerated}
        />

        {/* ✅ Enhanced Tabs with Sorting */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0">
            <CardContent className="p-1">
              <TabsList className="grid w-full grid-cols-3 bg-transparent">
                <TabsTrigger 
                  value="avoid" 
                  className="data-[state=active]:bg-red-50 data-[state=active]:text-red-700 data-[state=active]:shadow-lg transition-all duration-300 touch-button text-xs sm:text-sm"
                >
                  <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Avoid ({analysisStats.avoid})
                </TabsTrigger>
                <TabsTrigger 
                  value="safe"
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-lg transition-all duration-300 touch-button text-xs sm:text-sm"
                >
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Safe ({analysisStats.safe})
                </TabsTrigger>
                <TabsTrigger 
                  value="recommended"
                  className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 data-[state=active]:shadow-lg transition-all duration-300 touch-button text-xs sm:text-sm"
                >
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Recommended ({analysisStats.recommended})
                </TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>

          {/* ✅ Enhanced Sorting Controls */}
          {foodAnalysis.length > 0 && (
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-slate-600" />
                    <span className="font-medium text-slate-700">Sort by:</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={sortBy === 'name' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSortBy('name')}
                      className="touch-button"
                    >
                      Name
                    </Button>
                    <Button
                      variant={sortBy === 'severity' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSortBy('severity')}
                      className="touch-button"
                    >
                      Severity
                    </Button>
                    <Button
                      variant={sortBy === 'rating' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSortBy('rating')}
                      className="touch-button"
                    >
                      Rating
                    </Button>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="touch-button"
                  >
                    {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                    {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <TabsContent value="avoid">
            <FoodList 
              foods={avoidFoods}
              type="avoid"
              userTier={user?.subscription_tier}
              isLoading={isLoading}
              sortBy={sortBy}
              sortOrder={sortOrder}
            />
          </TabsContent>

          <TabsContent value="safe">
            <FoodList 
              foods={safeFoods}
              type="safe" 
              userTier={user?.subscription_tier}
              isLoading={isLoading}
              sortBy={sortBy}
              sortOrder={sortOrder}
            />
          </TabsContent>

          <TabsContent value="recommended">
            <FoodList 
              foods={recommendedFoods}
              type="recommended"
              userTier={user?.subscription_tier} 
              isLoading={isLoading}
              sortBy={sortBy}
              sortOrder={sortOrder}
            />
          </TabsContent>
        </Tabs>
        
        <MedicalDisclaimer />

        {/* ✅ Enhanced Action Buttons */}
        <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 mt-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate(createPageUrl("Dashboard"))}
                className="w-full sm:w-auto bg-white hover:bg-slate-50 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              
              {foodAnalysis.length > 0 && (
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => exportToPDF(foodAnalysis)}
                    className="bg-white hover:bg-slate-50 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Analysis
                  </Button>
                  <Button
                    onClick={generateAnalysis}
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Regenerating...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerate Analysis
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
