import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User as UserEntity } from "@/entities/User";
import Logo from "@/components/shared/Logo";
import { 
  User,
  LayoutDashboard, 
  Heart,
  ChefHat,
  BookOpen,
  Calendar,
  BellRing,
  CreditCard,
  Settings,
  Menu,
  X,
  LogOut,
  ArrowUp,
  Palette,
  Sun,
  Moon,
  Monitor,
  Bell,
  BellOff,
  Shield,
  ShieldCheck,
  KeyRound,
  Fingerprint,
  Database,
  HardDrive,
  Wifi,
  WifiOff,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  UserCheck,
  UserX,
  Home,
  MoreHorizontal,
  MoreVertical,
  Grid,
  List,
  Bookmark,
  BookmarkCheck,
  BookmarkPlus,
  BookmarkMinus,
  BookmarkX,
  Trash2,
  Archive,
  ArchiveRestore,
  Copy,
  Check,
  Lock,
  Unlock,
  Zap,
  Brain,
  Target,
  TrendingUp,
  Users,
  Award,
  Trophy,
  Star,
  Crown,
  Gem,
  Medal,
  Loader2,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  Plus,
  Edit3,
  Share2,
  Download,
  Upload,
  RefreshCw,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Clock,
  Gift,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ✅ Type Definitions
interface NavigationItem {
  name: string;
  icon: React.ComponentType<any>;
  href: string;
  badge?: string | number;
  disabled?: boolean;
  category?: 'main' | 'tools' | 'settings';
}

interface UserData {
  id: string;
  email: string;
  name?: string;
  profile_completed?: boolean;
  subscription_tier?: string;
  avatar?: string;
}

interface LayoutProps {
  children: React.ReactNode;
  currentPageName: string;
}

interface ThemeConfig {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
}

// ✅ Theme configurations
const themes: ThemeConfig[] = [
  {
    id: 'bright',
    name: 'Bright',
    icon: Sun,
    description: 'Light and vibrant theme'
  },
  {
    id: 'sleek',
    name: 'Sleek',
    icon: Moon,
    description: 'Dark and modern theme'
  },
  {
    id: 'system',
    name: 'System',
    icon: Monitor,
    description: 'Follows system preference'
  }
];

// ✅ Custom hook for layout management
const useLayoutData = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTheme, setActiveTheme] = useState(localStorage.getItem('nutripal_theme') || 'bright');
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadUser = useCallback(async () => {
    try {
      const userData = await UserEntity.me();
      setUser(userData);
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await UserEntity.logout();
      window.location.href = createPageUrl("Landing");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Logout Failed",
        description: "Could not sign out. Please try again.",
        variant: "destructive"
      });
    }
  }, [toast]);

  const toggleTheme = useCallback(() => {
    const currentIndex = themes.findIndex(t => t.id === activeTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setActiveTheme(themes[nextIndex].id);
  }, [activeTheme]);

  const checkScroll = useCallback((mainRef: React.RefObject<HTMLElement>) => {
    if (mainRef.current && mainRef.current.scrollTop > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  }, []);

  const scrollToTop = useCallback((mainRef: React.RefObject<HTMLElement>) => {
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
    localStorage.setItem('nutripal_theme', activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return {
    sidebarOpen,
    setSidebarOpen,
    showScrollTop,
    activeTheme,
    user,
    isLoading,
    handleLogout,
    toggleTheme,
    checkScroll,
    scrollToTop
  };
};

// ✅ Navigation items configuration
const navigationItems: NavigationItem[] = [
  { name: "Profile", icon: User, href: createPageUrl("Profile"), category: 'main' },
  { name: "Dashboard", icon: LayoutDashboard, href: createPageUrl("Dashboard"), category: 'main' },
  { name: "My Foods", icon: Heart, href: createPageUrl("FoodAnalysis"), category: 'main' },
  { name: "Recipe Master", icon: ChefHat, href: createPageUrl("Recipes"), category: 'main' },
  { name: "My Cookbook", icon: BookOpen, href: createPageUrl("Cookbook"), category: 'main' },
  { name: "Meal Planner", icon: Calendar, href: createPageUrl("MealPlanner"), category: 'tools' },
  { name: "Reminders", icon: BellRing, href: createPageUrl("Reminders"), category: 'tools' },
  { name: "Subscription", icon: CreditCard, href: createPageUrl("Subscription"), category: 'settings' },
  { name: "Utilities", icon: Settings, href: createPageUrl("Utilities"), category: 'settings' }
];

// ✅ Sidebar component
const Sidebar = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  user, 
  handleLogout, 
  toggleTheme, 
  activeTheme 
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  user: UserData | null;
  handleLogout: () => void;
  toggleTheme: () => void;
  activeTheme: string;
}) => {
  const currentTheme = themes.find(t => t.id === activeTheme);
  
  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-sm border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <Logo size="w-8 h-8" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  window.location.pathname === item.href
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          {/* User menu */}
          <div className="p-4 border-t border-slate-200">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-slate-900">
                        {user?.name || 'User'}
                      </div>
                      <div className="text-xs text-slate-500">
                        {user?.subscription_tier || 'Free'}
                      </div>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleTheme}>
                  {currentTheme && <currentTheme.icon className="w-4 h-4 mr-2" />}
                  Theme: {currentTheme?.name}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};

// ✅ Header component
const Header = ({ 
  setSidebarOpen, 
  toggleTheme, 
  activeTheme 
}: {
  setSidebarOpen: (open: boolean) => void;
  toggleTheme: () => void;
  activeTheme: string;
}) => {
  const currentTheme = themes.find(t => t.id === activeTheme);
  
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-semibold text-slate-900">
            NutriPal
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="hidden sm:flex"
          >
            {currentTheme && <currentTheme.icon className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
};

// ✅ Scroll to top button
const ScrollToTop = ({ 
  showScrollTop, 
  scrollToTop 
}: {
  showScrollTop: boolean;
  scrollToTop: () => void;
}) => {
  if (!showScrollTop) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 rounded-full shadow-lg"
      size="sm"
    >
      <ArrowUp className="w-4 h-4" />
    </Button>
  );
};

export default function Layout({ children, currentPageName }: LayoutProps) {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const {
    sidebarOpen,
    setSidebarOpen,
    showScrollTop,
    activeTheme,
    user,
    isLoading,
    handleLogout,
    toggleTheme,
    checkScroll,
    scrollToTop
  } = useLayoutData();

  // Enhanced scroll to top on every page navigation
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const timeoutId = setTimeout(() => {
      if (mainRef.current) {
        mainRef.current.scrollTo({ top: 0, behavior: 'instant' });
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => checkScroll(mainRef);
    const mainElement = mainRef.current;
    
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
      return () => mainElement.removeEventListener('scroll', handleScroll);
    }
  }, [checkScroll]);

  // Don't show sidebar on landing page
  if (currentPageName === "Landing") {
    return children;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-emerald-600" />
          <p className="text-slate-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        :root[data-theme='bright'] {
          --bg-gradient-start: #f0fdf4;
          --bg-gradient-end: #e0f2fe;
          --sidebar-bg: rgba(255, 255, 255, 0.8);
          --card-bg: rgba(255, 255, 255, 0.8);
          --text-primary: #1e293b;
          --text-secondary: #475569;
          --border-color: rgba(203, 213, 225, 0.5);
          --accent-start: #10b981;
          --accent-end: #3b82f6;
          --card-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          --card-hover-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1);
        }

        :root[data-theme='sleek'] {
          --bg-gradient-start: #111827;
          --bg-gradient-end: #1f2937;
          --sidebar-bg: rgba(31, 41, 55, 0.8);
          --card-bg: #1f2937;
          --text-primary: #f9fafb;
          --text-secondary: #9ca3af;
          --border-color: rgba(75, 85, 99, 0.5);
          --accent-start: #059669;
          --accent-end: #2563eb;
          --card-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3);
          --card-hover-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -2px rgb(0 0 0 / 0.3);
        }

        :root[data-theme='system'] {
          --bg-gradient-start: #f0fdf4;
          --bg-gradient-end: #e0f2fe;
          --sidebar-bg: rgba(255, 255, 255, 0.8);
          --card-bg: rgba(255, 255, 255, 0.8);
          --text-primary: #1e293b;
          --text-secondary: #475569;
          --border-color: rgba(203, 213, 225, 0.5);
          --accent-start: #10b981;
          --accent-end: #3b82f6;
          --card-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          --card-hover-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1);
        }

        @media (prefers-color-scheme: dark) {
          :root[data-theme='system'] {
            --bg-gradient-start: #111827;
            --bg-gradient-end: #1f2937;
            --sidebar-bg: rgba(31, 41, 55, 0.8);
            --card-bg: #1f2937;
            --text-primary: #f9fafb;
            --text-secondary: #9ca3af;
            --border-color: rgba(75, 85, 99, 0.5);
            --accent-start: #059669;
            --accent-end: #2563eb;
            --card-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3);
            --card-hover-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -2px rgb(0 0 0 / 0.3);
          }
        }

        .theme-transition {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 theme-transition">
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            user={user}
            handleLogout={handleLogout}
            toggleTheme={toggleTheme}
            activeTheme={activeTheme}
          />

          {/* Main content */}
          <div className="flex-1 flex flex-col lg:ml-0">
            <Header
              setSidebarOpen={setSidebarOpen}
              toggleTheme={toggleTheme}
              activeTheme={activeTheme}
            />
            
            <main 
              ref={mainRef}
              className="flex-1 overflow-auto"
            >
              {children}
            </main>
          </div>
        </div>

        {/* Scroll to top button */}
        <ScrollToTop
          showScrollTop={showScrollTop}
          scrollToTop={() => scrollToTop(mainRef)}
        />
      </div>
    </>
  );
}
