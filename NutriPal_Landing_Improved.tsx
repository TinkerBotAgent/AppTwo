import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useTranslation } from "@/components/lib/translations";
import { User } from "@/entities/User";
import Logo from "@/components/shared/Logo";
import {
  ArrowRight,
  Shield,
  Star,
  Users,
  CheckCircle,
  Sparkles,
  Globe,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Heart,
  Brain,
  Target,
  Award,
  Zap,
  Lock,
  TrendingUp,
  Clock,
  Smartphone,
  Laptop,
  Monitor
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Type Definitions
interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

interface Benefit {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
  gradient: string;
  features: string[];
}

interface FeatureCard {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  gradient: string;
  badge: string;
  badgeColor: string;
  features: string[];
  price?: string;
  isPopular?: boolean;
}

// ✅ Enhanced languages with flags and native names
const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'es', name: 'Español', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'zh', name: '中文', flag: '🇨🇳', nativeName: '中文' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'ko', name: '한국어', flag: '🇰🇷', nativeName: '한국어' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', nativeName: 'हिन्दी' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', nativeName: 'Português' },
];

// ✅ Custom hook for audio management
const useAudio = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      clickSoundRef.current = new Audio('/sounds/click.mp3');
      clickSoundRef.current.volume = 0.3;
      clickSoundRef.current.preload = 'auto';
      
      // Background music (optional)
      backgroundMusicRef.current = new Audio('/sounds/background.mp3');
      backgroundMusicRef.current.volume = 0.1;
      backgroundMusicRef.current.loop = true;
      backgroundMusicRef.current.preload = 'none';
    } catch (e) {
      console.warn("Audio initialization failed. Sound effects may not work.", e);
      setIsSupported(false);
    }
  }, []);

  const playSound = useCallback((audioRef: React.RefObject<HTMLAudioElement>) => {
    if (!isSupported || isMuted || !audioRef.current) return;
    
    try {
      if (audioRef.current.readyState >= 2) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => {
          console.warn("Error playing sound (likely autoplay policy):", e);
        });
      } else {
        audioRef.current.load();
        audioRef.current.oncanplaythrough = () => {
          audioRef.current?.play().catch(() => {});
          audioRef.current!.oncanplaythrough = null;
        };
      }
    } catch (error) {
      console.warn("Error playing sound:", error);
    }
  }, [isSupported, isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
    if (backgroundMusicRef.current) {
      if (isMuted) {
        backgroundMusicRef.current.play().catch(() => {});
      } else {
        backgroundMusicRef.current.pause();
      }
    }
  }, [isMuted]);

  return {
    isMuted,
    isSupported,
    clickSoundRef,
    backgroundMusicRef,
    playSound,
    toggleMute
  };
};

export default function Landing() {
  const [currentBenefit, setCurrentBenefit] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { t, setLanguage, language } = useTranslation();
  const { isMuted, isSupported, clickSoundRef, playSound, toggleMute } = useAudio();

  // ✅ Enhanced benefits with more details
  const benefits: Benefit[] = useMemo(() => [
    {
      icon: CheckCircle,
      title: t('benefit1_title'),
      description: t('benefit1_desc'),
      color: "text-red-500",
      gradient: "bg-gradient-to-br from-red-50 to-pink-50",
      features: ["Medical-grade accuracy", "Drug interaction alerts", "Allergy warnings"]
    },
    {
      icon: Shield,
      title: t('benefit2_title'),
      description: t('benefit2_desc'),
      color: "text-blue-500",
      gradient: "bg-gradient-to-br from-blue-50 to-indigo-50",
      features: ["HIPAA compliant", "End-to-end encryption", "Privacy protected"]
    },
    {
      icon: Star,
      title: t('benefit3_title'),
      description: t('benefit3_desc'),
      color: "text-emerald-500",
      gradient: "bg-gradient-to-br from-emerald-50 to-green-50",
      features: ["AI-powered insights", "Personalized recommendations", "Real-time analysis"]
    },
    {
      icon: Users,
      title: t('benefit4_title'),
      description: t('benefit4_desc'),
      color: "text-purple-500",
      gradient: "bg-gradient-to-br from-purple-50 to-pink-50",
      features: ["Family profiles", "Shared meal planning", "Multi-device sync"]
    }
  ], [t]);

  // ✅ Enhanced feature cards
  const featureCards: FeatureCard[] = useMemo(() => [
    {
      icon: CheckCircle,
      title: t('free_plan_title'),
      description: t('free_plan_desc'),
      gradient: "bg-gradient-to-br from-emerald-50 to-green-50",
      badge: t('always_free'),
      badgeColor: "bg-emerald-100 text-emerald-700",
      features: [
        "Basic food analysis",
        "Food allergy alerts",
        "Profile management",
        "Mobile app access"
      ]
    },
    {
      icon: Star,
      title: t('pro_plan_title'),
      description: t('pro_plan_desc'),
      gradient: "bg-gradient-to-br from-blue-50 to-indigo-50",
      badge: t('pro_plan_price'),
      badgeColor: "bg-blue-100 text-blue-700",
      price: "$9.99/month",
      isPopular: true,
      features: [
        "Everything in Free",
        "Advanced AI analysis",
        "Personalized recipes",
        "PDF reports for doctors",
        "Priority support",
        "Unlimited food tracking"
      ]
    }
  ], [t]);

  // ✅ Load user data
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await User.me();
        setCurrentUser(user);
      } catch (error) {
        // User not logged in
        setCurrentUser(null);
      }
    };
    loadUser();
  }, []);

  // ✅ Auto-rotate benefits
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefit(prev => (prev + 1) % benefits.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [benefits.length]);

  const handleLanguageChange = useCallback(async (langCode: string) => {
    playSound(clickSoundRef);
    setLanguage(langCode);
    try {
      if (currentUser) {
        await User.updateMyUserData({ language: langCode });
      }
    } catch (e) {
      // Not logged in, language is already saved to localStorage by setLanguage
    }
    // Small delay to show the change before reload
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }, [playSound, clickSoundRef, setLanguage, currentUser]);

  const handleBenefitIndicatorClick = useCallback((index: number) => {
    playSound(clickSoundRef);
    setCurrentBenefit(index);
  }, [playSound, clickSoundRef]);

  const handleCTA = useCallback(() => {
    playSound(clickSoundRef);
  }, [playSound, clickSoundRef]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-green-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23059669" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Audio Controls */}
      {isSupported && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleMute}
            className="bg-white/80 backdrop-blur-sm border-white/20 hover:bg-white/90"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
          <div className="text-center mb-12">
            {/* Logo with animation */}
            <motion.div 
              className="mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Logo size="w-32 h-32 md:w-40 md:h-40" className="mx-auto shadow-2xl rounded-full hover:shadow-3xl transition-shadow duration-300" />
            </motion.div>

            {/* Title with animation */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-800 mb-4">
                Nutri<span className="text-emerald-600">Pal</span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                {t('tagline')}
              </p>
            </motion.div>

            {/* Enhanced Language Selector */}
            <motion.div 
              className="mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-slate-600" />
                  <p className="text-sm text-slate-600 font-medium">Choose your language:</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`px-3 py-2 text-sm rounded-full transition-all duration-300 font-medium flex items-center gap-2 ${
                        language === lang.code
                          ? 'bg-emerald-500 text-white shadow-lg scale-105'
                          : 'bg-white/80 text-slate-700 hover:bg-white hover:shadow-md'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Enhanced CTA Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link to={createPageUrl(currentUser ? "Dashboard" : "Profile")}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
                  onClick={handleCTA}
                >
                  {currentUser ? t('go_to_dashboard') : t('get_started_free')}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              {currentUser && (
                <p className="text-sm text-slate-500 mt-3">
                  Welcome back, {currentUser.display_name || currentUser.full_name?.split(' ')[0] || 'there'}! 👋
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Benefits Section */}
      <div className="py-20 bg-white/60 backdrop-blur-sm relative">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              {t('why_choose')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover how NutriPal transforms your relationship with food through cutting-edge technology and personalized insights.
            </p>
          </motion.div>

          {/* Enhanced Animated Benefit Display */}
          <div className="h-64 flex items-center justify-center mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBenefit}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="text-center max-w-2xl mx-auto"
              >
                <div className={`w-20 h-20 rounded-full ${benefits[currentBenefit].gradient} shadow-xl flex items-center justify-center mx-auto mb-6`}>
                  {React.createElement(benefits[currentBenefit].icon, {
                    className: `w-10 h-10 ${benefits[currentBenefit].color}`
                  })}
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-4">
                  {benefits[currentBenefit].title}
                </h3>
                <p className="text-slate-600 text-lg mb-6 max-w-xl mx-auto">
                  {benefits[currentBenefit].description}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {benefits[currentBenefit].features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="bg-slate-100 text-slate-700">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced Benefit Indicators */}
          <div className="flex justify-center gap-3 mb-16">
            {benefits.map((_, index) => (
              <button
                key={index}
                onClick={() => handleBenefitIndicatorClick(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentBenefit
                    ? 'bg-emerald-500 scale-125 shadow-lg'
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          {/* Enhanced Feature Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {featureCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className={`shadow-xl ${card.gradient} border-0 relative overflow-hidden group hover:shadow-2xl transition-all duration-300 ${
                  card.isPopular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}>
                  {card.isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8 text-center relative">
                    <div className={`w-16 h-16 rounded-full ${card.gradient} shadow-lg flex items-center justify-center mx-auto mb-6`}>
                      {React.createElement(card.icon, {
                        className: "w-8 h-8 text-emerald-600"
                      })}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">{card.title}</h3>
                    <p className="text-slate-600 mb-6 text-lg">
                      {card.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      {card.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm text-slate-700">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Badge className={`${card.badgeColor} text-sm font-medium px-4 py-2`}>
                      {card.price || card.badge}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Footer CTA */}
      <div className="py-20 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-6xl mx-auto px-4 text-center relative">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('footer_cta_title')}
            </h2>
            <p className="text-emerald-100 text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              {t('footer_cta_desc')}
            </p>
            <Link to={createPageUrl(currentUser ? "Dashboard" : "Profile")}>
              <Button
                size="lg"
                className="bg-white text-emerald-600 hover:bg-emerald-50 px-10 py-5 text-xl font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 group"
                onClick={handleCTA}
              >
                {currentUser ? t('go_to_dashboard') : t('start_journey')}
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 text-emerald-100">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                <span className="text-sm">256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span className="text-sm">Medical Grade</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
