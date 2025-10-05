import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FoodPreference } from "@/entities/FoodPreference";
import { User } from "@/entities/User";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Heart, 
  X, 
  Minus, 
  Check, 
  ArrowLeft, 
  PlusCircle, 
  RotateCcw,
  Loader2,
  AlertCircle,
  TrendingUp,
  Sparkles,
  Filter,
  RefreshCw,
  Save,
  SkipForward
} from "lucide-react";

// ✅ Type Definitions
interface UserData {
  id: string;
  dietary_preferences?: string[];
}

interface FoodPreferenceData {
  id?: string;
  food_name: string;
  preference: 'like' | 'dislike' | 'neutral';
  food_category?: string;
}

interface FoodData {
  food_name: string;
  preference: 'like' | 'dislike' | 'neutral';
}

interface CategoryData {
  key: string;
  label: string;
  count?: number;
}

// ✅ Enhanced food database with more foods and categories
const foodDatabase = {
  meats: [
    "Beef", "Pork", "Chicken", "Turkey", "Lamb", "Duck", "Bison", "Venison",
    "Salmon", "Tuna", "Cod", "Halibut", "Mackerel", "Sardines", "Trout", "Shrimp", 
    "Crab", "Lobster", "Scallops", "Mussels", "Oysters"
  ],
  plant_proteins: [
    "Tofu", "Tempeh", "Seitan", "Lentils", "Chickpeas", "Black Beans", "Kidney Beans", 
    "Pinto Beans", "Navy Beans", "Quinoa", "Nuts", "Seeds", "Hemp Seeds", "Chia Seeds"
  ],
  dairy: [
    "Milk", "Cheese", "Yogurt", "Butter", "Ice Cream", "Cream Cheese", "Sour Cream",
    "Cottage Cheese", "Ricotta", "Mozzarella", "Cheddar", "Parmesan"
  ],
  fruits: [
    "Apples", "Bananas", "Oranges", "Berries", "Grapes", "Avocado", "Mango", "Pineapple",
    "Strawberries", "Blueberries", "Raspberries", "Blackberries", "Peaches", "Pears",
    "Cherries", "Plums", "Kiwi", "Papaya", "Coconut", "Lemon", "Lime"
  ],
  vegetables: [
    "Broccoli", "Spinach", "Carrots", "Bell Peppers", "Onions", "Tomatoes", "Potatoes", 
    "Mushrooms", "Asparagus", "Brussels Sprouts", "Cauliflower", "Cabbage", "Lettuce",
    "Cucumber", "Zucchini", "Eggplant", "Sweet Potato", "Beets", "Radishes", "Celery"
  ],
  grains: [
    "Rice", "Bread", "Pasta", "Oats", "Cereals", "Crackers", "Barley", "Buckwheat",
    "Millet", "Amaranth", "Wild Rice", "Brown Rice", "White Rice", "Quinoa", "Bulgur"
  ],
  beverages: [
    "Water", "Coffee", "Tea", "Juice", "Soda", "Beer", "Wine", "Milk", "Smoothies",
    "Energy Drinks", "Sparkling Water", "Herbal Tea", "Green Tea", "Black Tea"
  ]
};

const categoryNames: Record<string, string> = {
  meats: "Meats & Fish",
  plant_proteins: "Plant Proteins", 
  dairy: "Dairy",
  fruits: "Fruits",
  vegetables: "Vegetables",
  grains: "Grains & Starches",
  beverages: "Beverages"
};

// ✅ Enhanced SwipeCard component
const SwipeCard = ({ food, onSwipe }: { food: FoodData; onSwipe: (direction: string) => void }) => {
  const { food_name, preference } = food;

  const getButtonClass = (type: string, currentPreference: string) => {
    const baseClass = "transition-all duration-200 hover:scale-105";
    
    if (currentPreference === type) {
      switch (type) {
        case 'dislike':
          return `${baseClass} bg-red-500 hover:bg-red-600 text-white shadow-lg`;
        case 'neutral':
          return `${baseClass} bg-slate-500 hover:bg-slate-600 text-white shadow-lg`;
        case 'like':
          return `${baseClass} bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg`;
        default:
          return baseClass;
      }
    } else {
      switch (type) {
        case 'dislike':
          return `${baseClass} bg-white hover:bg-red-50 hover:border-red-300 border-slate-300 text-slate-600`;
        case 'neutral':
          return `${baseClass} bg-white hover:bg-slate-50 hover:border-slate-400 border-slate-300 text-slate-600`;
        case 'like':
          return `${baseClass} bg-white hover:bg-emerald-50 hover:border-emerald-300 border-slate-300 text-slate-600`;
        default:
          return baseClass;
      }
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <span className="font-medium text-slate-800 group-hover:text-slate-900 transition-colors">
            {food_name}
          </span>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSwipe('dislike')}
              className={getButtonClass('dislike', preference)}
              title="Dislike this food"
            >
              <X className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSwipe('neutral')}
              className={getButtonClass('neutral', preference)}
              title="Neutral about this food"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSwipe('like')}
              className={getButtonClass('like', preference)}
              title="Like this food"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ✅ Custom hook for food preferences management
const useFoodPreferences = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [preferences, setPreferences] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      
      const [userData, existingPrefs] = await Promise.all([
        User.me(),
        FoodPreference.list()
      ]);
      
      setUser(userData);
      
      const prefMap: Record<string, string> = {};
      existingPrefs.forEach((pref: FoodPreferenceData) => {
        prefMap[pref.food_name] = pref.preference;
      });
      
      setPreferences(prefMap);
      setSmartDefaults(userData, prefMap);
    } catch (error) {
      console.error("Error loading data:", error);
      setError(error instanceof Error ? error.message : "Failed to load preferences");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setSmartDefaults = (userData: UserData, existingPrefs: Record<string, string>) => {
    const dietaryPrefs = userData.dietary_preferences || [];
    const newPrefs = { ...existingPrefs };
    
    // Vegan/Vegetarian defaults
    if (dietaryPrefs.includes('vegan') || dietaryPrefs.includes('vegetarian')) {
      [...foodDatabase.plant_proteins, ...foodDatabase.fruits, ...foodDatabase.vegetables].forEach(food => {
        if (!newPrefs[food]) newPrefs[food] = 'like';
      });
      
      // Set meat and dairy to dislike for vegans
      if (dietaryPrefs.includes('vegan')) {
        [...foodDatabase.meats, ...foodDatabase.dairy].forEach(food => {
          if (!newPrefs[food]) newPrefs[food] = 'dislike';
        });
      }
    }
    
    // Dairy-free defaults
    if (dietaryPrefs.includes('dairy_free') || dietaryPrefs.includes('vegan')) {
      foodDatabase.dairy.forEach(food => {
        if (!newPrefs[food]) newPrefs[food] = 'dislike';
      });
    }
    
    // Gluten-free defaults
    if (dietaryPrefs.includes('gluten_free')) {
      foodDatabase.grains.forEach(food => {
        if (!newPrefs[food]) newPrefs[food] = 'dislike';
      });
    }
    
    setPreferences(newPrefs);
  };

  const updatePreference = useCallback((foodName: string, preference: string) => {
    setPreferences(prev => ({
      ...prev,
      [foodName]: preference
    }));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { 
    user, 
    preferences, 
    isLoading, 
    error, 
    updatePreference, 
    refetch: loadData 
  };
};

// ✅ Loading component
const FoodSwiperLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-emerald-600" />
      <p className="text-slate-600 text-lg">Loading your food preferences...</p>
      <p className="text-slate-500 text-sm mt-2">Setting up smart defaults based on your profile</p>
    </div>
  </div>
);

// ✅ Error component
const FoodSwiperError = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
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

export default function FoodSwiper() {
  const navigate = useNavigate();
  const { user, preferences, isLoading, error, updatePreference, refetch } = useFoodPreferences();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [customFood, setCustomFood] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // ✅ Memoized categories with counts
  const categories = useMemo((): CategoryData[] => {
    return Object.keys(foodDatabase).map(key => ({
      key,
      label: categoryNames[key],
      count: foodDatabase[key as keyof typeof foodDatabase].length
    }));
  }, []);

  // ✅ Memoized filtered foods
  const filteredFoods = useMemo((): FoodData[] => {
    let allFoodsNames: string[] = [];
    
    if (selectedCategory === null) {
      Object.values(foodDatabase).forEach(categoryFoods => {
        allFoodsNames.push(...categoryFoods);
      });
    } else {
      allFoodsNames = foodDatabase[selectedCategory as keyof typeof foodDatabase] || [];
    }

    // Add custom dislikes
    const customDislikesNames = Object.keys(preferences).filter(foodName => 
      preferences[foodName] === 'dislike' && !Object.values(foodDatabase).flat().includes(foodName)
    );
    allFoodsNames = [...new Set([...allFoodsNames, ...customDislikesNames])];

    allFoodsNames.sort();
    
    let filteredFoodObjects = allFoodsNames.map(foodName => ({
      food_name: foodName,
      preference: (preferences[foodName] || 'neutral') as 'like' | 'dislike' | 'neutral'
    }));

    if (searchTerm) {
      filteredFoodObjects = filteredFoodObjects.filter(foodObj => 
        foodObj.food_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filteredFoodObjects;
  }, [selectedCategory, preferences, searchTerm]);

  // ✅ Memoized preference counts
  const preferenceCounts = useMemo(() => ({
    liked: Object.values(preferences).filter(p => p === 'like').length,
    disliked: Object.values(preferences).filter(p => p === 'dislike').length,
    neutral: Object.values(preferences).filter(p => p === 'neutral').length,
    total: Object.keys(preferences).length
  }), [preferences]);

  const handleSwipe = useCallback((food: FoodData, direction: string) => {
    updatePreference(food.food_name, direction);
  }, [updatePreference]);

  const handleBulkAction = useCallback((action: string) => {
    const newPrefs = { ...preferences };
    filteredFoods.forEach(foodObj => {
      newPrefs[foodObj.food_name] = action;
    });
    // Note: This would need to be implemented with a proper state setter
    // For now, we'll update each preference individually
    filteredFoods.forEach(foodObj => {
      updatePreference(foodObj.food_name, action);
    });
  }, [filteredFoods, preferences, updatePreference]);

  const findCategory = (foodName: string): string => {
    for (const [category, foods] of Object.entries(foodDatabase)) {
      if (foods.includes(foodName)) return category;
    }
    return "other";
  };

  const handleCustomDislike = useCallback(() => {
    if (customFood.trim() && !preferences[customFood.trim()]) {
      const formattedFood = customFood.trim().charAt(0).toUpperCase() + customFood.trim().slice(1).toLowerCase();
      updatePreference(formattedFood, 'dislike');
      setCustomFood("");
    }
  }, [customFood, preferences, updatePreference]);

  const savePreferences = async () => {
    setIsSaving(true);
    
    try {
      const prefsToSave: Omit<FoodPreferenceData, 'id'>[] = Object.entries(preferences)
        .filter(([_, pref]) => pref !== 'neutral')
        .map(([foodName, preference]) => ({
          food_name: foodName,
          preference: preference as 'like' | 'dislike',
          food_category: findCategory(foodName)
        }));

      if (prefsToSave.length > 0) {
        // Clear existing preferences
        const existing = await FoodPreference.list();
        for (const pref of existing) {
          await FoodPreference.delete(pref.id);
        }
        
        // Save new preferences
        await FoodPreference.bulkCreate(prefsToSave);
      }
      
      navigate(createPageUrl("FoodAnalysis"));
    } catch (error) {
      console.error("Error saving preferences:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // ✅ Loading state
  if (isLoading) {
    return <FoodSwiperLoading />;
  }

  // ✅ Error state
  if (error) {
    return <FoodSwiperError error={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* ✅ Enhanced Header Card */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0 mb-8">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-slate-800">Food Preferences</CardTitle>
            </div>
            <p className="text-slate-600 mb-6 text-lg">
              Tell us what you like to get personalized recommendations
            </p>
            
            {/* ✅ Enhanced preference stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-emerald-50 rounded-lg p-3">
                <div className="flex items-center justify-center mb-1">
                  <Heart className="w-5 h-5 text-emerald-600 mr-1" />
                  <span className="text-2xl font-bold text-emerald-700">{preferenceCounts.liked}</span>
                </div>
                <p className="text-sm text-emerald-600 font-medium">Liked</p>
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <div className="flex items-center justify-center mb-1">
                  <X className="w-5 h-5 text-red-600 mr-1" />
                  <span className="text-2xl font-bold text-red-700">{preferenceCounts.disliked}</span>
                </div>
                <p className="text-sm text-red-600 font-medium">Disliked</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="flex items-center justify-center mb-1">
                  <Minus className="w-5 h-5 text-slate-600 mr-1" />
                  <span className="text-2xl font-bold text-slate-700">{preferenceCounts.neutral}</span>
                </div>
                <p className="text-sm text-slate-600 font-medium">Neutral</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className="w-5 h-5 text-blue-600 mr-1" />
                  <span className="text-2xl font-bold text-blue-700">{preferenceCounts.total}</span>
                </div>
                <p className="text-sm text-blue-600 font-medium">Total</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* ✅ Enhanced Search and Categories Card */}
        <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 mb-6">
          <CardContent className="p-6">
            {/* Enhanced Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search for foods... (e.g., chicken, broccoli)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 h-12 text-base"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            {/* ✅ Enhanced Category Pills */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-5 h-5 text-slate-600" />
                <span className="font-medium text-slate-700">Filter by Category:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === null
                      ? 'bg-emerald-500 text-white shadow-lg transform scale-105'
                      : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 shadow-sm hover:shadow-md'
                  }`}
                >
                  All Foods ({Object.values(foodDatabase).flat().length})
                </button>
                {categories.map(category => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.key
                        ? 'bg-emerald-500 text-white shadow-lg transform scale-105'
                        : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 shadow-sm hover:shadow-md'
                    }`}
                  >
                    {category.label} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            {/* ✅ Enhanced Bulk Actions */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-slate-700 mr-2">Bulk Actions:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('like')}
                className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Heart className="w-4 h-4 mr-1" />
                Like All Visible
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('dislike')}
                className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <X className="w-4 h-4 mr-1" />
                Dislike All Visible
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('neutral')}
                className="bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset All Visible
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ✅ Enhanced Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
          {filteredFoods.map((food, index) => (
            <SwipeCard
              key={`${food.food_name}-${index}`}
              food={food}
              onSwipe={(direction) => handleSwipe(food, direction)}
            />
          ))}
        </div>

        {/* ✅ Enhanced Empty State */}
        {filteredFoods.length === 0 && searchTerm && (
          <Card className="text-center py-12 shadow-lg bg-white/80 backdrop-blur-sm border-0 mb-8">
            <CardContent>
              <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                No foods found
              </h3>
              <p className="text-slate-600 mb-4">
                No foods match "{searchTerm}". Try a different search term or add it as a custom dislike.
              </p>
              <Button
                variant="outline"
                onClick={() => setSearchTerm("")}
                className="touch-button"
              >
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ✅ Enhanced Custom Dislike Input Card */}
        <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0 mb-8">
          <CardHeader>
            <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-emerald-600" />
              Can't find a food you dislike?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">
              Add specific foods to your dislike list that aren't shown above. This helps us provide better personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                placeholder="e.g., Eggplant, Okra, Cilantro..."
                value={customFood}
                onChange={(e) => setCustomFood(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCustomDislike()}
                className="flex-1 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 h-12"
              />
              <Button 
                onClick={handleCustomDislike}
                disabled={!customFood.trim()}
                className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg transition-all duration-300 h-12"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Dislike
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ✅ Enhanced Action Buttons Card */}
        <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate(createPageUrl("Profile"))}
                className="w-full sm:w-auto bg-white hover:bg-slate-50 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Profile
              </Button>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate(createPageUrl("FoodAnalysis"))}
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <SkipForward className="w-4 h-4 mr-2" />
                  Skip for Now
                </Button>
                <Button
                  onClick={savePreferences}
                  disabled={isSaving || preferenceCounts.total === 0}
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences ({preferenceCounts.total})
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
