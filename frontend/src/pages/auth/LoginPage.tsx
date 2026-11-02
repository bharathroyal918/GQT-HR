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
  Building2,
  Server,
  Terminal,
  FileCheck,
  Send,
  FileText,
  Calendar,
  Briefcase,
  Users,
  MessageSquare,
  UserPlus,
} from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export interface RoleConfig {
  id: string;
  tabTitle: string;
  portalName: string;
  badge: string;
  urlPath: string;
  placeholderEmail: string;
  icon: React.ComponentType<{ className?: string }>;
  heroGradient: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  accentColor: string;
  accentBadge: string;
  highlights: Array<{
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
}

export const ROLE_CONFIGS: Record<string, RoleConfig> = {
  admin: {
    id: 'admin',
    tabTitle: 'Administrator',
    portalName: 'System Administration Console',
    badge: '👑 Root Superuser Clearance',
    urlPath: '/login/admin',
    placeholderEmail: 'admin@institution.local',
    icon: ShieldCheck,
    heroGradient: 'from-[#0B192C] via-[#1E3E62] to-[#0A192F]',
    heroBadge: 'Superuser Security • Root RBAC',
    heroTitle: 'System Administration & Platform Governance',
    heroSubtitle: 'Mission-critical enterprise access for user account provisioning, RBAC matrix enforcement, correlation trace audits, and system infrastructure diagnostics.',
    accentColor: 'border-indigo-400 bg-indigo-50/80 text-indigo-950',
    accentBadge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    highlights: [
      {
        title: 'Role-Based Access Control (RBAC)',
        description: 'Real-time user account provisioning, role revocation, and immutable security audit logs.',
        icon: ShieldCheck,
      },
      {
        title: 'Full-Stack Diagnostics & Probes',
        description: 'Live PostgreSQL connection pool monitors, cache latency metrics, and API health checks.',
        icon: Server,
      },
      {
        title: 'OpenAPI 3.0 REST Gateway',
        description: 'Auto-generated Swagger UI schema specifications, strict serializer validations, and correlation tracing.',
        icon: Terminal,
      },
    ],
  },
  head: {
    id: 'head',
    tabTitle: 'Placement Head',
    portalName: 'Corporate Relations & Placement Cell',
    badge: '👔 Placement Executive Clearance',
    urlPath: '/login/staff',
    placeholderEmail: 'placement.head@institution.local',
    icon: Award,
    heroGradient: 'from-[#0F294A] via-[#1B365D] to-[#0A2558]',
    heroBadge: 'Corporate Placement Command',
    heroTitle: 'Corporate Partnerships & Placement Cell Command',
    heroSubtitle: 'Orchestrate corporate recruiter outreach, 5-point job requirement verifications, candidate readiness gates, and final joining governance.',
    accentColor: 'border-blue-400 bg-blue-50/80 text-blue-950',
    accentBadge: 'bg-blue-100 text-blue-800 border-blue-200',
    highlights: [
      {
        title: 'Corporate Recruitment CRM',
        description: '100+ touchpoints/day benchmark, verified employer directory, and activity audit trails.',
        icon: Building2,
      },
      {
        title: '5-Point Job Verification Sign-off',
        description: 'Rigorous checklist approval gate before candidate drive notification and creative marketing.',
        icon: FileCheck,
      },
      {
        title: 'Candidate Dispatch & Offer Governance',
        description: 'Excel roster packaging, multi-round interview tracking, and joining verifications.',
        icon: Send,
      },
    ],
  },
  student: {
    id: 'student',
    tabTitle: 'Student Candidate',
    portalName: 'Student Placement & Career Portal',
    badge: '🎓 Candidate Access • 2024–2026 Cohort',
    urlPath: '/login/student',
    placeholderEmail: 'candidate@student.local',
    icon: GraduationCap,
    heroGradient: 'from-[#064E3B] via-[#047857] to-[#022C22]',
    heroBadge: 'Candidate Career Portal',
    heroTitle: 'Candidate Career Readiness & Campus Placement Portal',
    heroSubtitle: 'Explore accredited campus recruitment opportunities, manage verified resume vaults, track multi-round interview schedules, and accept corporate offers.',
    accentColor: 'border-emerald-400 bg-emerald-50/80 text-emerald-950',
    accentBadge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    highlights: [
      {
        title: 'Verified Campus Placement Drives',
        description: 'Direct eligibility preview matching your department, CGPA, and backlog criteria.',
        icon: Briefcase,
      },
      {
        title: 'ATS Resume Vault & Feedback',
        description: 'Multi-version PDF resume vault with ATS keyword matching and trainer rubrics.',
        icon: FileText,
      },
      {
        title: 'Live Interview Schedules & Offers',
        description: 'Real-time round updates, reporting venue/video links, and formal offer letters.',
        icon: Calendar,
      },
    ],
  },
  trainer: {
    id: 'trainer',
    tabTitle: 'Trainer / Evaluator',
    portalName: 'Candidate Mentorship & Evaluation Hub',
    badge: '🎙️ Trainer & Interview Evaluator Clearance',
    urlPath: '/login/trainer',
    placeholderEmail: 'evaluator@institution.local',
    icon: Sparkles,
    heroGradient: 'from-[#3B0764] via-[#581C87] to-[#1E1B4B]',
    heroBadge: 'Mentorship & Assessment Hub',
    heroTitle: 'Candidate Readiness & Mentorship Evaluation Hub',
    heroSubtitle: 'Evaluate candidate resumes against industry rubrics, conduct structured 1-on-1 mock interviews, and submit 360° candidate readiness ratings.',
    accentColor: 'border-purple-400 bg-purple-50/80 text-purple-950',
    accentBadge: 'bg-purple-100 text-purple-800 border-purple-200',
    highlights: [
      {
        title: 'Resume Scoring Rubrics',
        description: 'Multi-point evaluation criteria with actionable improvement feedback.',
        icon: FileCheck,
      },
      {
        title: '1-on-1 Mock Interview Evaluations',
        description: 'Standardized scoring across technical aptitude, coding, and behavioral communication.',
        icon: Users,
      },
      {
        title: '360° Recruiter & Student Feedback',
        description: 'Triangulated reviews to guide continuous institutional curriculum refinement.',
        icon: MessageSquare,
      },
    ],
  },
};

interface LoginPageProps {
  defaultRole?: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({ defaultRole }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ role?: string }>();

  // Determine active role based on path, params, or default
  const getActiveRoleKey = (): string => {
    const path = location.pathname.toLowerCase();
    if (path.includes('admin')) return 'admin';
    if (path.includes('student')) return 'student';
    if (path.includes('staff') || path.includes('placement') || path.includes('head')) return 'head';
    if (path.includes('trainer') || path.includes('evaluator')) return 'trainer';
    if (params.role && ROLE_CONFIGS[params.role.toLowerCase()]) return params.role.toLowerCase();
    if (defaultRole && ROLE_CONFIGS[defaultRole]) return defaultRole;
    return 'admin';
  };

  const [activeRoleKey, setActiveRoleKey] = useState<string>(getActiveRoleKey());
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const activeRole: RoleConfig = ROLE_CONFIGS[activeRoleKey] ?? (ROLE_CONFIGS['admin'] as RoleConfig);

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Sync role when location path changes
  useEffect(() => {
    const newRole = getActiveRoleKey();
    setActiveRoleKey(newRole);
    setServerError(null);
  }, [location.pathname, params.role, defaultRole]);

  // Switch active role gateway presentation
  const handleSelectRole = (roleKey: string, syncUrl = true) => {
    const target = ROLE_CONFIGS[roleKey];
    if (!target) return;
    setActiveRoleKey(roleKey);
    setServerError(null);
    if (syncUrl && location.pathname !== target.urlPath) {
      navigate(target.urlPath, { replace: true });
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError(null);
      await login(data);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials. Please verify your email and password.';
      setServerError(msg);
    }
  };

  const ActiveIcon = activeRole.icon;

  return (
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-12 bg-gqt-neutral-50 selection:bg-gqt-blue selection:text-white">
      {/* Left Column: Dynamic Role-Specific Hero Panel */}
      <div
        className={`lg:col-span-5 xl:col-span-4 bg-gradient-to-br ${activeRole.heroGradient} text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 transition-colors duration-300`}
      >
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <Link to="/" className="inline-block transition-transform hover:scale-[1.01]">
            <GQTLogo variant="official" size="md" />
          </Link>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/20 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {activeRole.heroBadge}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {activeRole.heroTitle}
            </h1>
            <p className="text-sm text-blue-100/90 leading-relaxed">
              {activeRole.heroSubtitle}
            </p>
          </div>

          {/* Dynamic Tailored Highlights */}
          <div className="space-y-3 pt-2">
            {activeRole.highlights.map((h) => {
              const HighlightIcon = h.icon;
              return (
                <div
                  key={h.title}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white/8 border border-white/15 backdrop-blur-xs transition-all hover:bg-white/12"
                >
                  <HighlightIcon className="w-5 h-5 text-blue-200 shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-xs font-bold text-white uppercase tracking-wider">{h.title}</h2>
                    <p className="text-[11px] text-blue-100/80 mt-0.5 leading-snug">
                      {h.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security & System Info Footer */}
        <div className="relative z-10 pt-6 mt-6 border-t border-white/15 text-[11px] text-blue-100/70 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit TLS &bull; HttpOnly Session Protection &bull; Strict RBAC Matrix</span>
          </div>
          <div>&copy; {new Date().getFullYear()} Global Quest Technologies (GQT). All rights reserved.</div>
        </div>
      </div>

      {/* Right Column: Interactive Role Switcher & Login Card */}
      <div className="lg:col-span-7 xl:col-span-8 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-xl space-y-5">
          {/* Role Gateway Switcher Tabs */}
          <div className="bg-white p-1.5 rounded-2xl border border-gqt-neutral-200 shadow-2xs">
            <div className="text-[10px] font-bold text-gqt-neutral-400 uppercase tracking-wider px-3 pt-1.5 pb-1 flex items-center justify-between">
              <span>Select Login Role Gateway</span>
              <span className="font-normal text-gqt-neutral-500">Each role has a distinct URL</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
              {Object.values(ROLE_CONFIGS).map((r) => {
                const TabIcon = r.icon;
                const isSelected = activeRoleKey === r.id;

                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleSelectRole(r.id, true)}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${isSelected
                        ? 'bg-gqt-navy text-white shadow-xs'
                        : 'text-gqt-neutral-600 hover:text-gqt-navy hover:bg-gqt-neutral-100'
                      }`}
                  >
                    <TabIcon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{r.tabTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Card Container */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gqt-neutral-200 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gqt-blue flex items-center gap-1.5">
                  <ActiveIcon className="w-3.5 h-3.5" />
                  {activeRole.portalName}
                </span>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${activeRole.accentBadge}`}>
                  {activeRole.id.toUpperCase()} GATEWAY
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-gqt-navy mt-1">
                Sign In to Your Workspace
              </h1>
              <p className="text-xs text-gqt-neutral-600 mt-1">
                Access URL: <code className="bg-gqt-neutral-100 px-1.5 py-0.5 rounded text-gqt-blue font-semibold">{activeRole.urlPath}</code>
              </p>
            </div>

            {/* Error Alert Banner */}
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

            {/* Main Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div>
                <Input
                  label="Work Email Address"
                  type="email"
                  autoComplete="email"
                  placeholder={activeRole.placeholderEmail}
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
                  HttpOnly session protection
                </span>
                <Link
                  to="/auth/forgot-password"
                  className="font-medium text-gqt-blue hover:text-gqt-blue-dark transition-colors"
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

            {/* Role-Specific Secondary Actions */}
            <div className="pt-4 border-t border-gqt-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gqt-neutral-500">
              {activeRole.id === 'student' ? (
                <>
                  <span>New candidate seeking campus placement?</span>
                  <Link
                    to="/students/register"
                    className="font-bold text-gqt-blue hover:underline flex items-center gap-1"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    Register Candidate Account
                  </Link>
                </>
              ) : activeRole.id === 'admin' ? (
                <>
                  <span>Restricted superuser environment</span>
                  <a
                    href="/api/v1/schema/swagger/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gqt-blue hover:underline"
                  >
                    OpenAPI Specification
                  </a>
                </>
              ) : (
                <>
                  <span>Restricted institutional platform</span>
                  <span>Need clearance? Contact Placement Administrator</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
