import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Star,
  Heart,
  Bookmark,
  BookmarkCheck,
  Share2,
  Download,
  Upload,
  Edit3,
  Trash2,
  MoreHorizontal,
  MoreVertical,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Zap,
  Sparkles,
  Award,
  Trophy,
  Crown,
  Gem,
  Medal,
  Target,
  TrendingUp,
  Users,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Clock,
  Bell,
  BellOff,
  Settings,
  User,
  Shield,
  ShieldCheck,
  KeyRound,
  Fingerprint,
  Database,
  HardDrive,
  Wifi,
  WifiOff,
  Home,
  Menu,
  Grid,
  List,
  BookmarkPlus,
  BookmarkMinus,
  BookmarkX,
  Archive,
  ArchiveRestore,
  Copy,
  Check,
  Plus,
  RefreshCw,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Gift,
  Loader2,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  Heart as HeartIcon,
  Brain,
  Leaf,
  Sun,
  Moon,
  Monitor,
  Volume2,
  VolumeX,
  Palette,
  Globe,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Video,
  Camera,
  Image,
  File,
  Folder,
  Link,
  ExternalLink,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  MousePointer,
  Hand,
  Type,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Code,
  Terminal,
  Database as DatabaseIcon,
  Server,
  Cloud,
  CloudOff,
  Wifi as WifiIcon,
  WifiOff as WifiOffIcon,
  Signal,
  SignalZero,
  SignalLow,
  SignalMedium,
  SignalHigh,
  Battery,
  BatteryLow,
  BatteryMedium,
  BatteryHigh,
  BatteryFull,
  Plug,
  PlugZap,
  Power,
  PowerOff,
  Play,
  Pause,
  Stop,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume1,
  Volume2 as Volume2Icon,
  VolumeX as VolumeXIcon,
  Mic,
  MicOff,
  Headphones,
  Speaker,
  Radio,
  Tv,
  Monitor as MonitorIcon,
  Laptop,
  Smartphone,
  Tablet,
  Watch,
  Gamepad2,
  Joystick,
  Keyboard,
  Mouse,
  Printer,
  Scanner,
  Fax,
  Mail as MailIcon,
  Mailbox,
  Inbox,
  Outbox,
  Send,
  Reply,
  ReplyAll,
  Forward,
  Archive as ArchiveIcon,
  ArchiveRestore as ArchiveRestoreIcon,
  Trash,
  Trash2 as Trash2Icon,
  Delete,
  Undo,
  Redo,
  Cut,
  Copy as CopyIcon,
  Paste,
  Clipboard,
  ClipboardCheck,
  ClipboardCopy,
  ClipboardList,
  ClipboardPaste,
  ClipboardX,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  FileSpreadsheet,
  FilePresentation,
  FilePdf,
  FileWord,
  FileExcel,
  FilePowerpoint,
  FileZip,
  FileRar,
  File7z,
  FileTxt,
  FileCsv,
  FileJson,
  FileXml,
  FileHtml,
  FileCss,
  FileJs,
  FileTs,
  FileJsx,
  FileTsx,
  FileVue,
  FileSvelte,
  FileAngular,
  FileReact,
  FileNode,
  FilePython,
  FileJava,
  FileCpp,
  FileC,
  FileCsharp,
  FilePhp,
  FileRuby,
  FileGo,
  FileRust,
  FileSwift,
  FileKotlin,
  FileDart,
  FileFlutter,
  FileIonic,
  FileCordova,
  FileElectron,
  FileNext,
  FileNuxt,
  FileGatsby,
  FileSvelte as FileSvelteIcon,
  FileAngular as FileAngularIcon,
  FileReact as FileReactIcon,
  FileNode as FileNodeIcon,
  FilePython as FilePythonIcon,
  FileJava as FileJavaIcon,
  FileCpp as FileCppIcon,
  FileC as FileCIcon,
  FileCsharp as FileCsharpIcon,
  FilePhp as FilePhpIcon,
  FileRuby as FileRubyIcon,
  FileGo as FileGoIcon,
  FileRust as FileRustIcon,
  FileSwift as FileSwiftIcon,
  FileKotlin as FileKotlinIcon,
  FileDart as FileDartIcon,
  FileFlutter as FileFlutterIcon,
  FileIonic as FileIonicIcon,
  FileCordova as FileCordovaIcon,
  FileElectron as FileElectronIcon,
  FileNext as FileNextIcon,
  FileNuxt as FileNuxtIcon,
  FileGatsby as FileGatsbyIcon
} from 'lucide-react';

// ✅ Type Definitions
interface GridCardProps {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  gradient: string;
  onClick: (id: string) => void;
  badge?: string | number;
  disabled?: boolean;
  locked?: boolean;
  featured?: boolean;
  category?: string;
  tags?: string[];
  rating?: number;
  isFavorite?: boolean;
  onFavorite?: (id: string) => void;
  onShare?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

interface ExpandedCardProps {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  gradient: string;
  children: React.ReactNode;
  onClose: () => void;
  onEdit?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
  badge?: string | number;
  disabled?: boolean;
  locked?: boolean;
  featured?: boolean;
  category?: string;
  tags?: string[];
  rating?: number;
  className?: string;
}

interface CollapsedIconProps {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  gradient: string;
  isActive: boolean;
  onClick: (id: string) => void;
  badge?: string | number;
  disabled?: boolean;
  locked?: boolean;
  featured?: boolean;
  className?: string;
}

// ✅ Enhanced GridCard component
export const GridCard = ({ 
  id, 
  title, 
  icon: Icon, 
  description, 
  gradient, 
  onClick,
  badge,
  disabled = false,
  locked = false,
  featured = false,
  category,
  tags = [],
  rating,
  isFavorite = false,
  onFavorite,
  onShare,
  onEdit,
  onDelete,
  className = ''
}: GridCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(() => {
    if (!disabled && !locked) {
      onClick(id);
    }
  }, [disabled, locked, onClick, id]);

  const handleFavorite = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite?.(id);
  }, [onFavorite, id]);

  const handleShare = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(id);
  }, [onShare, id]);

  const handleEdit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(id);
  }, [onEdit, id]);

  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(id);
  }, [onDelete, id]);

  const cardClasses = useMemo(() => `
    shadow-lg hover:shadow-xl transition-all duration-300 
    bg-white/80 backdrop-blur-sm border-0 overflow-hidden 
    group cursor-pointer transform hover:scale-105 h-full flex flex-col
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${locked ? 'ring-2 ring-yellow-300' : ''}
    ${featured ? 'ring-2 ring-purple-300' : ''}
    ${className}
  `.trim(), [disabled, locked, featured, className]);

  return (
    <Card 
      className={cardClasses}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`h-2 ${gradient}`} />
      
      {/* Badge */}
      {badge && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="secondary" className="bg-white/90 text-slate-700">
            {badge}
          </Badge>
        </div>
      )}

      {/* Lock indicator */}
      {locked && (
        <div className="absolute top-2 left-2 z-10">
          <Lock className="w-4 h-4 text-yellow-600" />
        </div>
      )}

      {/* Featured indicator */}
      {featured && (
        <div className="absolute top-2 left-2 z-10">
          <Star className="w-4 h-4 text-purple-600 fill-current" />
        </div>
      )}

      <CardHeader className="text-center pb-4 relative">
        <div className={`w-16 h-16 mx-auto rounded-full ${gradient} bg-opacity-10 flex items-center justify-center mb-4`}>
          <Icon className="w-8 h-8 text-slate-700" />
        </div>
        <CardTitle className="text-lg font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
          {title}
        </CardTitle>
        {category && (
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="flex-grow flex flex-col">
        <p className="text-slate-600 text-sm text-center w-full mb-4">{description}</p>
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Rating */}
        {rating && (
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < rating ? 'text-yellow-400 fill-current' : 'text-slate-300'
                }`}
              />
            ))}
          </div>
        )}

        {/* Action buttons */}
        {(isHovered || isFavorite) && (
          <div className="flex items-center justify-center gap-2 mt-auto">
            {onFavorite && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavorite}
                className={`p-1 h-8 w-8 ${
                  isFavorite ? 'text-red-500' : 'text-slate-400'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
            )}
            {onShare && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="p-1 h-8 w-8 text-slate-400"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            )}
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="p-1 h-8 w-8 text-slate-400"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="p-1 h-8 w-8 text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// ✅ Enhanced ExpandedCard component
export const ExpandedCard = ({ 
  id, 
  title, 
  icon: Icon, 
  gradient, 
  children, 
  onClose,
  onEdit,
  onShare,
  onDelete,
  onFavorite,
  isFavorite = false,
  badge,
  disabled = false,
  locked = false,
  featured = false,
  category,
  tags = [],
  rating,
  className = ''
}: ExpandedCardProps) => {
  const handleFavorite = useCallback(() => {
    onFavorite?.();
  }, [onFavorite]);

  const handleShare = useCallback(() => {
    onShare?.();
  }, [onShare]);

  const handleEdit = useCallback(() => {
    onEdit?.();
  }, [onEdit]);

  const handleDelete = useCallback(() => {
    onDelete?.();
  }, [onDelete]);

  const cardClasses = useMemo(() => `
    shadow-xl bg-white/90 backdrop-blur-sm border-0 overflow-hidden
    ${disabled ? 'opacity-50' : ''}
    ${locked ? 'ring-2 ring-yellow-300' : ''}
    ${featured ? 'ring-2 ring-purple-300' : ''}
    ${className}
  `.trim(), [disabled, locked, featured, className]);

  return (
    <Card className={cardClasses}>
      <div className={`h-3 ${gradient}`} />
      
      {/* Badge */}
      {badge && (
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="secondary" className="bg-white/90 text-slate-700">
            {badge}
          </Badge>
        </div>
      )}

      <CardHeader className="bg-white border-b relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${gradient} bg-opacity-10`}>
              <Icon className="w-6 h-6 text-slate-700" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-slate-800">{title}</CardTitle>
              {category && (
                <Badge variant="outline" className="text-xs mt-1">
                  {category}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Action buttons */}
            {onFavorite && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavorite}
                className={`p-1 h-8 w-8 ${
                  isFavorite ? 'text-red-500' : 'text-slate-400'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
            )}
            {onShare && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="p-1 h-8 w-8 text-slate-400"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            )}
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="p-1 h-8 w-8 text-slate-400"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="p-1 h-8 w-8 text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-500 hover:text-slate-700">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Tags and rating */}
        {(tags.length > 0 || rating) && (
          <div className="flex items-center gap-4 mt-4">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            {rating && (
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < rating ? 'text-yellow-400 fill-current' : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
};

// ✅ Enhanced CollapsedIcon component
export const CollapsedIcon = ({ 
  id, 
  title, 
  icon: Icon, 
  gradient, 
  isActive, 
  onClick,
  badge,
  disabled = false,
  locked = false,
  featured = false,
  className = ''
}: CollapsedIconProps) => {
  const handleClick = useCallback(() => {
    if (!disabled && !locked) {
      onClick(id);
    }
  }, [disabled, locked, onClick, id]);

  const iconClasses = useMemo(() => `
    w-16 h-16 rounded-lg shadow-lg cursor-pointer transition-all duration-300 
    ${gradient} bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center
    ${isActive ? 'ring-2 ring-emerald-500 bg-opacity-20' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${locked ? 'ring-2 ring-yellow-300' : ''}
    ${featured ? 'ring-2 ring-purple-300' : ''}
    ${className}
  `.trim(), [isActive, disabled, locked, featured, className]);

  return (
    <div className="relative">
      <div 
        className={iconClasses}
        onClick={handleClick}
        title={title}
      >
        <Icon className="w-8 h-8 text-slate-700" />
        
        {/* Badge */}
        {badge && (
          <div className="absolute -top-1 -right-1 z-10">
            <Badge variant="secondary" className="bg-white/90 text-slate-700 text-xs h-5 min-w-5 px-1">
              {badge}
            </Badge>
          </div>
        )}

        {/* Lock indicator */}
        {locked && (
          <div className="absolute -top-1 -left-1 z-10">
            <Lock className="w-3 h-3 text-yellow-600" />
          </div>
        )}

        {/* Featured indicator */}
        {featured && (
          <div className="absolute -top-1 -left-1 z-10">
            <Star className="w-3 h-3 text-purple-600 fill-current" />
          </div>
        )}
      </div>
    </div>
  );
};
