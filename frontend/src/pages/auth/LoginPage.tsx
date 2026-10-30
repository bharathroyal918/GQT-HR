import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GQTLogo } from '../../components/brand/GQTLogo';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  AlertCircle,
  ShieldCheck,
  Award,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Building2,
  KeyRound,
  ArrowRight,
  UserPlus,
  Briefcase,
  FileCheck,
  Activity,
  Layers,
  Users,
} from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface RoleConfig {
  id: string;
  slug: string;
  title: string;
  badge: string;
  portalName: string;
  email: string;
  password: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  gradient: string;
  headline: string;
  subheadline: string;
  statBadge: string;
  features: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }[];
}

type RoleKey = 'admin' | 'head' | 'student';
const ROLE_CONFIGS: Record<RoleKey, RoleConfig> = {
  admin: {
    id: 'admin',
    slug: 'admin',
    title: 'System Administrator',
    badge: '👑 Superuser Console',
    portalName: 'Enterprise Governance Portal',
    email: 'admin@gqt.local',
    password: 'Admin@12345',
    icon: ShieldCheck,
    accentColor: 'border-indigo-300 bg-indigo-50/80 text-indigo-900 hover:border-indigo-500',
    gradient: 'from-[#0F172A] via-[#1E1B4B] to-[#312E81]',
    headline: 'Institutional Governance & Platform Administration',
    subheadline:
      'Superuser access to all 13 recruitment modules, RBAC security roles, live diagnostics, database reconciliation, and OpenAPI testing harness.',
    statBadge: '13 Workspaces Active • 147 Automated Tests Verified',
    features: [
      {
        icon: Users,
        title: 'Multi-Role RBAC Administration',
        desc: 'Instant user provisioning, role synchronization, security audit trails, and account locks.',
      },
      {
        icon: Activity,
        title: 'Continuous System Diagnostics',
        desc: 'Probing Django 5.1 engine, PostgreSQL pool, cache liveness, and database reconciliation.',
      },
      {
        icon: Layers,
        title: 'Live OpenAPI 3.0 Integration',
        desc: 'Interactive Swagger UI schema testing harness with authenticated endpoint verification.',
      },
    ],
  },
  head: {
    id: 'head',
    slug: 'placement-head',
    title: 'Placement Head',
    badge: '👔 Executive Operations',
    portalName: 'Corporate Placement Office',
    email: 'head@gqt.local',
    password: 'Head@12345',
    icon: Award,
    accentColor: 'border-blue-300 bg-blue-50/80 text-blue-900 hover:border-blue-500',
    gradient: 'from-[#0A192F] via-[#0F294A] to-[#1B365D]',
    headline: 'Corporate Outreach & Placement Operations',
    subheadline:
      'Manage verified corporate partnerships, sign off 5-point job requirements, certify candidate readiness gates, and accelerate campus drive outcomes.',
    statBadge: '500+ Corporate Partners • 98.4% Placement Clearance',
    features: [
      {
        icon: Building2,
        title: 'Corporate CRM & 100/day Targets',
        desc: 'Hiring partner accounts, HR contacts directory, and relationship manager outreach monitoring.',
      },
      {
        icon: FileCheck,
        title: '5-Point Job Verification Sign-Off',
        desc: 'Authoritative audit of CTC authenticity, eligibility criteria, and selection rounds before drive broadcast.',
      },
      {
        icon: ShieldCheck,
        title: 'Readiness Gate Certification',
        desc: 'Institutional certification verifying candidate resume ATS scores, assessment benchmarks, and mock interview cleared status.',
      },
    ],
  },
  student: {
    id: 'student',
    slug: 'student',
    title: 'Student Candidate',
    badge: '🎓 Candidate Career Hub',
    portalName: 'Student Career Portal',
    email: 'bharath@gmail.com',
    password: 'Student@12345',
    icon: GraduationCap,
    accentColor: 'border-emerald-300 bg-emerald-50/80 text-emerald-900 hover:border-emerald-500',
    gradient: 'from-[#062019] via-[#064E3B] to-[#047857]',
    headline: 'Launch Your Career with Top Hiring Partners',
    subheadline:
      'Explore certified campus recruitment opportunities, prepare with ATS resume feedback, practice assessments, and track interview offers in real time.',
    statBadge: '25,000+ Enrolled Candidates • 100% Verified Placements',
    features: [
      {
        icon: Briefcase,
        title: 'Verified Placement Drives',
        desc: 'Browse accredited hiring drives matching your graduation year, branch, and minimum CGPA criteria.',
      },
      {
        icon: FileCheck,
        title: 'ATS Resume Scoring & Document Vault',
        desc: 'Institutional ATS keyword review, trainer rubric scores, and verified PDF resume versioning.',
      },
      {
        icon: Award,
        title: 'Interview Tracking & Placement Offers',
        desc: 'Real-time multi-round interview notifications, corporate offer letter intake, and acceptance confirmation.',
      },
    ],
  },
};

interface LoginPageProps {
  initialRole?: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({ initialRole }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ role?: string }>();

  // Resolve role from URL param or initialRole prop
  const getInitialRoleKey = (): RoleKey => {
    const raw = (params.role || initialRole || '').toLowerCase();
    if (raw === 'admin') return 'admin';
    if (raw === 'head' || raw === 'placement-head' || raw === 'placement') return 'head';
    if (raw === 'student' || raw === 'candidate') return 'student';
    return 'admin';
  };

  const [selectedRoleKey, setSelectedRoleKey] = useState<RoleKey>(getInitialRoleKey());
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const currentRoleConfig = ROLE_CONFIGS[selectedRoleKey] || ROLE_CONFIGS.admin;
  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Sync role key when URL params change (don't auto-fill credentials)
  useEffect(() => {
    const roleKey = getInitialRoleKey();
    setSelectedRoleKey(roleKey);
    setServerError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.role, initialRole]);

  // Handle role tab switch with URL synchronization
  const handleSelectRole = (key: RoleKey) => {
    setSelectedRoleKey(key);
    setServerError(null);
    // Update URL to match role without triggering page reload
    navigate(`/login/${ROLE_CONFIGS[key].slug}`, { replace: true });
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError(null);
      await login(data);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials. Please try again.';
      setServerError(msg);
    }
  };

  // Instant 1-click login for current active role
  const handleQuickCurrentRoleLogin = async () => {
    try {
      setServerError(null);
      setValue('email', currentRoleConfig.email, { shouldValidate: true });
      setValue('password', currentRoleConfig.password, { shouldValidate: true });
      await login({ email: currentRoleConfig.email, password: currentRoleConfig.password });
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign-in failed. Please verify backend server.';
      setServerError(msg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-12 bg-gqt-neutral-50 selection:bg-gqt-blue selection:text-white">
      {/* Left Column: Dynamic Role-Specific Hero Panel */}
      <div
        className={`lg:col-span-5 xl:col-span-5 bg-gradient-to-br ${currentRoleConfig.gradient} text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 transition-all duration-300`}
      >
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-block transition-transform hover:scale-[1.02]">
              <GQTLogo variant="official" size="md" />
            </Link>
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 backdrop-blur-xs">
              {currentRoleConfig.portalName}
            </span>
          </div>

          <div className="space-y-3 pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/25 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{currentRoleConfig.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {currentRoleConfig.headline}
            </h1>
            <p className="text-sm text-blue-100/90 leading-relaxed max-w-xl">
              {currentRoleConfig.subheadline}
            </p>
          </div>

          {/* Role Feature Highlights */}
          <div className="space-y-3 pt-2">
            {currentRoleConfig.features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs transition-transform hover:translate-x-1 duration-150"
                >
                  <div className="p-1.5 rounded-lg bg-white/15 text-white shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-white tracking-wide">{feat.title}</h2>
                    <p className="text-[11px] text-blue-100/80 mt-0.5 leading-snug">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security & System Info Footer */}
        <div className="relative z-10 pt-6 mt-6 border-t border-white/15 text-[11px] text-blue-200/80 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit TLS • HttpOnly Session Protection</span>
            </div>
            <span className="text-[10px] font-semibold text-white/70">{currentRoleConfig.statBadge}</span>
          </div>
          <div className="text-[10px] text-white/60">
            © {new Date().getFullYear()} Global Quest Technologies (GQT). All institutional rights reserved.
          </div>
        </div>
      </div>

      {/* Right Column: Authentication Card & Role Gateway */}
      <div className="lg:col-span-7 xl:col-span-7 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-xl space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gqt-neutral-200 space-y-6">
            {/* Gateway Heading */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gqt-blue">
                  Role-Segregated Gateway
                </span>
                <span className="text-xs text-gqt-neutral-500 font-medium flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-gqt-blue" />
                  Dedicated Role Login
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-gqt-navy mt-1">
                Sign In as {currentRoleConfig.title}
              </h1>
              <p className="text-xs text-gqt-neutral-600 mt-1">
                Select your account role to activate that portal, or enter your registered work credentials.
              </p>
            </div>

            {/* Role Gateway Switcher Pills */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gqt-neutral-700">
                <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-gqt-blue" />
                  Select User Role Login
                </span>
                <span className="text-[10px] text-gqt-neutral-400 font-normal">
                  Updates URL &amp; portal view
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {Object.values(ROLE_CONFIGS).map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRoleKey === role.id;

                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => handleSelectRole(role.id as RoleKey)}
                      className={`text-left p-3 rounded-xl border transition-all duration-150 relative cursor-pointer ${isSelected
                          ? 'border-gqt-navy bg-gqt-navy text-white shadow-sm ring-2 ring-gqt-blue/30 scale-[1.01]'
                          : `${role.accentColor} bg-white shadow-2xs hover:bg-slate-50`
                        }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gqt-blue'}`} />
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
                      </div>
                      <div className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-gqt-navy'}`}>
                        {role.title}
                      </div>
                      <div
                        className={`text-[10px] mt-0.5 truncate font-mono ${isSelected ? 'text-blue-200' : 'text-gqt-neutral-500'
                          }`}
                      >
                        /login/{role.slug}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 1-Click Fast Launch for the Active Role */}
              <div className="pt-1.5">
                {(() => {
                  const ActiveRoleIcon = currentRoleConfig.icon;
                  return (
                    <button
                      type="button"
                      onClick={handleQuickCurrentRoleLogin}
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl text-xs font-bold bg-indigo-50/90 border border-indigo-200 text-indigo-900 hover:bg-indigo-100 hover:border-indigo-300 transition-all shadow-2xs group cursor-pointer"
                    >
                      <ActiveRoleIcon className="w-4 h-4 text-indigo-700" />
                      <span>
                        1-Click Launch {currentRoleConfig.title} ({currentRoleConfig.email})
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-indigo-600 group-hover:translate-x-1 transition-transform" />
                    </button>
                  );
                })()}
              </div>
            </div>

            {/* Error Alert */}
            {serverError && (
              <div
                role="alert"
                className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-xs text-red-800 animate-fadeIn"
              >
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Authentication Failed</p>
                  <p className="text-red-700 mt-0.5">{serverError}</p>
                </div>
              </div>
            )}

            {/* Standard Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div>
                <Input
                  label="Work Email Address"
                  type="email"
                  autoComplete="email"
                  placeholder="name@gqt.local"
                  leftIcon={<Mail className="w-4 h-4 text-gqt-neutral-400" />}
                  error={errors.email?.message}
                  {...register('email')}
                />
              </div>

              <div>
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  leftIcon={<Lock className="w-4 h-4 text-gqt-neutral-400" />}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="text-gqt-neutral-400 hover:text-gqt-charcoal transition-colors p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  error={errors.password?.message}
                  {...register('password')}
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-0.5">
                <span className="text-gqt-neutral-500 text-[11px] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  HttpOnly Cookie Authentication
                </span>
                <Link
                  to="/auth/forgot-password"
                  className="font-semibold text-gqt-blue hover:text-gqt-blue-dark transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center bg-gqt-navy hover:bg-gqt-navy-light text-white font-bold py-2.5 shadow-sm text-sm"
                  isLoading={isSubmitting}
                >
                  Sign In
                </Button>
              </div>
            </form>

            {/* Student Registration Callout if on student role */}
            {selectedRoleKey === 'student' ? (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-emerald-600" />
                  <span>Not enrolled yet? Register candidate profile:</span>
                </div>
                <Link
                  to="/students/register"
                  className="font-bold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  Register Now <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ) : (
              <div className="pt-3 border-t border-gqt-neutral-100 flex items-center justify-between text-[11px] text-gqt-neutral-500">
                <span>Restricted institutional platform</span>
                <span>Need access? Contact Placement Office</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
