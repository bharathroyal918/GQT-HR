import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { healthApi } from '@/api/healthApi';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import {
  ShieldCheck,
  Server,
  Layers,
  ArrowRight,
  Terminal,
  Clock,
  Sparkles,
  Building2,
  Briefcase,
  Palette,
  GraduationCap,
  FileCheck,
  Send,
  Calendar,
  Award,
  MessageSquare,
  Activity,
  BarChart3,
  RotateCcw,
  Users,
  FileText,
  User as UserIcon,
  CheckCircle2,
  Lock,
  Zap,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, isAuthenticated, hasRole, hasAnyRole } = useAuth();

  const isStudent = hasRole('STUDENT');
  const isAdmin = hasRole('ADMIN');
  const isPlacementHead = hasRole('PLACEMENT_HEAD') && !isAdmin;
  const isDesigner = hasRole('CREATIVE_DESIGNER') && !isAdmin && !hasRole('PLACEMENT_HEAD');
  const isTrainerOrEvaluator = hasAnyRole(['TRAINER', 'EVALUATOR']) && !isAdmin && !hasRole('PLACEMENT_HEAD');

  // Fetch health probe only for admin view
  const {
    data: health,
    isLoading: isHealthLoading,
    isError: isHealthError,
    refetch: refetchHealth,
  } = useQuery({
    queryKey: ['system-health'],
    queryFn: healthApi.getHealth,
    enabled: isAuthenticated && isAdmin,
  });

  // Admin All-Workspaces Directory
  const adminWorkspaces = [
    { category: 'CRM', name: 'Company Acquisition & Outreach', tag: 'Hiring Partners', href: '/crm', icon: Building2 },
    { category: 'Jobs', name: 'Job Requirements & Openings', tag: 'Verification', href: '/jobs', icon: Briefcase },
    { category: 'Creatives', name: 'Creative Studio & Media', tag: 'Campaigns', href: '/creatives', icon: Palette },
    { category: 'Students', name: 'Student Roster & Eligibility', tag: 'Candidate Pool', href: '/students', icon: GraduationCap },
    { category: 'Preparation', name: 'Resume Reviews & Mentorship', tag: 'Rubrics & ATS', href: '/preparation/resume-reviews', icon: FileCheck },
    { category: 'Dispatch', name: 'Candidate Submissions', tag: 'Rosters', href: '/submissions', icon: Send },
    { category: 'Interviews', name: 'Interview Schedules & Rounds', tag: 'Tracking', href: '/interviews', icon: Calendar },
    { category: 'Placements', name: 'Placement Management & Offers', tag: 'Joining', href: '/placements', icon: Award },
    { category: 'Feedback', name: '360° Stakeholder Feedback', tag: 'Quality', href: '/feedback', icon: MessageSquare },
    { category: 'Reconciliation', name: 'CRM Database Reconciliation', tag: 'Integrity', href: '/crm/reconciliation', icon: Activity },
    { category: 'Analytics', name: 'Reports & Funnel Analytics', tag: 'Insights', href: '/reports', icon: BarChart3 },
    { category: 'Automation', name: 'Follow-Up & Reminder Engine', tag: 'Alerts', href: '/crm/follow-ups', icon: Calendar },
    { category: 'Improvement', name: 'Continuous Curriculum Evolution', tag: 'Skill Gaps', href: '/continuous-improvement', icon: RotateCcw },
  ];

  // -------------------------------------------------------------
  // 1. PUBLIC / UNAUTHENTICATED GUEST SHOWCASE INDEX PAGE
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="space-y-12 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F294A] via-[#1B365D] to-[#0A192F] text-white p-8 sm:p-14 shadow-2xl border border-white/10">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-gqt-blue/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold tracking-wide uppercase border border-white/20">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Global Quest Technologies HRMS Ecosystem
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Enterprise Institutional Placement &amp; Talent Operating System
            </h1>

            <p className="text-base sm:text-lg text-blue-100/90 max-w-3xl leading-relaxed">
              A unified recruitment platform orchestrating corporate hiring partner acquisition, deterministic candidate eligibility verification, multi-stage interview tracking, and transparent placement governance.
            </p>

            {/* Quick Access Gateway Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link to="/login/student">
                <Button variant="secondary" size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-md text-sm border-0">
                  <GraduationCap className="w-5 h-5 mr-1.5" />
                  Student Portal Login
                </Button>
              </Link>
              <Link to="/login/staff">
                <Button variant="secondary" size="lg" className="bg-white hover:bg-blue-50 text-gqt-navy font-bold shadow-md text-sm">
                  <Building2 className="w-5 h-5 mr-1.5 text-gqt-blue" />
                  Placement Cell Login
                </Button>
              </Link>
              <Link to="/login/admin">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold text-sm">
                  <ShieldCheck className="w-5 h-5 mr-1.5 text-indigo-300" />
                  Administrator Console
                </Button>
              </Link>
              <Link to="/login/trainer">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold text-sm">
                  <Users className="w-5 h-5 mr-1.5 text-purple-300" />
                  Trainer &amp; Evaluator
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 4 Interactive Portal Gateways */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gqt-neutral-200 pb-3">
            <div>
              <h2 className="text-xl font-extrabold text-gqt-navy">Role-Segregated Access Gateways</h2>
              <p className="text-xs text-gqt-neutral-500 mt-0.5">
                Each stakeholder logs into a dedicated workspace designed exclusively for their operational responsibilities.
              </p>
            </div>
            <StatusBadge variant="info" label="Distinct Role URLs" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. Student Gateway Card */}
            <div className="p-6 rounded-2xl border border-emerald-200/80 bg-gradient-to-b from-white to-emerald-50/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-2xs">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Candidate Portal</div>
                  <h3 className="text-base font-bold text-gqt-navy group-hover:text-emerald-700 transition-colors">
                    Student Candidate
                  </h3>
                  <p className="text-xs text-gqt-neutral-600 mt-1.5 leading-relaxed">
                    View certified placement drives, upload verified resumes, track interview rounds, and accept corporate offers.
                  </p>
                </div>
                <div className="space-y-1.5 text-xs text-gqt-neutral-600 pt-1">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Real-time drive notifications</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ATS resume benchmark scoring</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Multi-round interview schedules</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/login/student" className="block">
                  <Button variant="primary" size="md" className="w-full justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">
                    Launch Student Login <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
                <div className="text-center mt-2">
                  <Link to="/students/register" className="text-[11px] font-semibold text-emerald-700 hover:underline">
                    New candidate registration &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. Placement Head Gateway Card */}
            <div className="p-6 rounded-2xl border border-blue-200/80 bg-gradient-to-b from-white to-blue-50/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-gqt-blue flex items-center justify-center group-hover:bg-gqt-blue group-hover:text-white transition-colors shadow-2xs">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gqt-blue">Executive Authority</div>
                  <h3 className="text-base font-bold text-gqt-navy group-hover:text-gqt-blue transition-colors">
                    Placement Cell &amp; Head
                  </h3>
                  <p className="text-xs text-gqt-neutral-600 mt-1.5 leading-relaxed">
                    Verify corporate requirements with 5-point checklist, sign off hiring drives, and manage candidate dispatch.
                  </p>
                </div>
                <div className="space-y-1.5 text-xs text-gqt-neutral-600 pt-1">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gqt-blue" />
                    <span>Authoritative 5-point job sign-off</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gqt-blue" />
                    <span>Candidate readiness gate certification</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gqt-blue" />
                    <span>Excel candidate roster dispatch</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/login/staff" className="block">
                  <Button variant="primary" size="md" className="w-full justify-center bg-gqt-navy hover:bg-gqt-navy-light text-white font-bold text-xs">
                    Launch Placement Login <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
                <div className="text-center mt-2 text-[11px] text-gqt-neutral-400">
                  URL: <code>/login/staff</code>
                </div>
              </div>
            </div>

            {/* 3. System Administrator Gateway Card */}
            <div className="p-6 rounded-2xl border border-indigo-200/80 bg-gradient-to-b from-white to-indigo-50/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:bg-indigo-700 group-hover:text-white transition-colors shadow-2xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">Platform Governance</div>
                  <h3 className="text-base font-bold text-gqt-navy group-hover:text-indigo-700 transition-colors">
                    System Administrator
                  </h3>
                  <p className="text-xs text-gqt-neutral-600 mt-1.5 leading-relaxed">
                    Full-platform governance, role-based access management, security audit history, and engine diagnostics.
                  </p>
                </div>
                <div className="space-y-1.5 text-xs text-gqt-neutral-600 pt-1">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>RBAC account provisioning</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Live engine &amp; DB diagnostics</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Interactive OpenAPI Swagger testing</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/login/admin" className="block">
                  <Button variant="primary" size="md" className="w-full justify-center bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs">
                    Launch Admin Login <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
                <div className="text-center mt-2 text-[11px] text-gqt-neutral-400">
                  URL: <code>/login/admin</code>
                </div>
              </div>
            </div>

            {/* 4. Trainer & Evaluator Gateway Card */}
            <div className="p-6 rounded-2xl border border-purple-200/80 bg-gradient-to-b from-white to-purple-50/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:bg-purple-700 group-hover:text-white transition-colors shadow-2xs">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-purple-700">Mentorship Hub</div>
                  <h3 className="text-base font-bold text-gqt-navy group-hover:text-purple-700 transition-colors">
                    Trainer &amp; Evaluator
                  </h3>
                  <p className="text-xs text-gqt-neutral-600 mt-1.5 leading-relaxed">
                    Evaluate candidate resumes against rubrics, conduct 1-on-1 mock interviews, and submit readiness ratings.
                  </p>
                </div>
                <div className="space-y-1.5 text-xs text-gqt-neutral-600 pt-1">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>Structured mock interview scoring</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>ATS resume rubric evaluations</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>360° candidate readiness ratings</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/login/trainer" className="block">
                  <Button variant="primary" size="md" className="w-full justify-center bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs">
                    Launch Trainer Login <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
                <div className="text-center mt-2 text-[11px] text-gqt-neutral-400">
                  URL: <code>/login/trainer</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Architecture & Core Pillars */}
        <div className="space-y-4">
          <div className="border-b border-gqt-neutral-200 pb-3">
            <h2 className="text-xl font-extrabold text-gqt-navy">Authoritative HRMS Platform Pillars</h2>
            <p className="text-xs text-gqt-neutral-500 mt-0.5">
              Built on strict corporate recruitment specifications and fail-closed enterprise security standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5 space-y-2 border-t-4 border-t-gqt-blue">
              <div className="flex items-center gap-2 text-gqt-blue font-bold text-xs uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                Corporate CRM
              </div>
              <h4 className="font-bold text-sm text-gqt-navy">100+ Touchpoints / Day</h4>
              <p className="text-xs text-gqt-neutral-500 leading-relaxed">
                Automated outreach logs, company tiers (Tier-1, Tier-2, Startup), decision-maker HR contacts, and follow-up escalations.
              </p>
            </Card>

            <Card className="p-5 space-y-2 border-t-4 border-t-emerald-500">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                Verification Gate
              </div>
              <h4 className="font-bold text-sm text-gqt-navy">5-Point Checklist Audit</h4>
              <p className="text-xs text-gqt-neutral-500 leading-relaxed">
                Mandatory verification of eligibility cutoffs, CTC authenticity, company legitimacy, selection rounds, and registration deadlines.
              </p>
            </Card>

            <Card className="p-5 space-y-2 border-t-4 border-t-indigo-500">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                Eligibility Engine
              </div>
              <h4 className="font-bold text-sm text-gqt-navy">Deterministic Screening</h4>
              <p className="text-xs text-gqt-neutral-500 leading-relaxed">
                Automated matching of academic GPA, graduation batch, active backlogs, and certified resume credentials.
              </p>
            </Card>

            <Card className="p-5 space-y-2 border-t-4 border-t-purple-500">
              <div className="flex items-center gap-2 text-purple-600 font-bold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4" />
                Placement Lifecycle
              </div>
              <h4 className="font-bold text-sm text-gqt-navy">Offers to Joining</h4>
              <p className="text-xs text-gqt-neutral-500 leading-relaxed">
                Batch roster dispatch, multi-round interview tracking, offer letter ingestion, student acceptance, and joining audits.
              </p>
            </Card>
          </div>
        </div>

        {/* Security & System Compliance Footer Strip */}
        <div className="rounded-2xl p-6 bg-white border border-gqt-neutral-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-gqt-navy uppercase tracking-wider">Enterprise Security Baseline</h5>
              <p className="text-xs text-gqt-neutral-500 mt-0.5">
                256-Bit TLS &bull; HttpOnly Cookie Authentication &bull; Strict Role Isolation &bull; Audit Trail Immutability
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/api/v1/schema/swagger/" target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="text-xs font-semibold">
                OpenAPI 3.0 Documentation
              </Button>
            </a>
            <Link to="/login">
              <Button size="sm" variant="primary" className="text-xs font-bold bg-gqt-navy">
                Access HRMS Portal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. AUTHENTICATED: STUDENT CAREER PORTAL DASHBOARD
  // -------------------------------------------------------------
  if (isStudent) {
    return (
      <div className="space-y-8 pb-12">
        {/* Student Welcome Banner */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gqt-navy via-slate-900 to-gqt-blue text-white p-8 sm:p-10 shadow-lg border border-gqt-navy/40">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-semibold tracking-wide uppercase border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-gqt-blue-accent" />
              Student Candidate Career Portal
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Welcome back, {user?.full_name || 'Candidate'}!
            </h1>
            <p className="text-sm sm:text-base text-blue-100 max-w-2xl leading-relaxed">
              Explore verified campus placement drives, prepare with resume &amp; assessment feedback, monitor your interview schedules, and respond to official placement offers.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link to="/students/drives">
                <Button variant="secondary" size="md" className="bg-white text-gqt-navy hover:bg-blue-50 font-bold shadow-xs">
                  <Briefcase className="w-4 h-4 mr-1.5 text-gqt-blue" />
                  Browse Placement Drives
                </Button>
              </Link>
              <Link to="/students/profile">
                <Button variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold">
                  <UserIcon className="w-4 h-4 mr-1.5" />
                  My Profile &amp; Resume Vault
                </Button>
              </Link>
              <Link to="/preparation/assessments">
                <Button variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold">
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  Practice Assessments
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 4 Primary Student Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/students/drives"
            className="group p-5 rounded-2xl border border-gqt-neutral-200 bg-white hover:border-gqt-blue hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-gqt-blue flex items-center justify-center group-hover:bg-gqt-blue group-hover:text-white transition-colors">
                <Briefcase className="w-5 h-5" />
              </div>
              <StatusBadge variant="info" label="Active Drives" showDot={false} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gqt-navy group-hover:text-gqt-blue transition-colors">
                Placement Drives
              </h3>
              <p className="text-xs text-gqt-neutral-500 mt-1 line-clamp-2">
                Browse verified campus recruitment opportunities and apply before deadlines.
              </p>
            </div>
            <div className="text-xs font-semibold text-gqt-blue flex items-center gap-1 pt-1">
              View opportunities <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/students/profile"
            className="group p-5 rounded-2xl border border-gqt-neutral-200 bg-white hover:border-gqt-blue hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <StatusBadge variant="neutral" label="Resume Vault" showDot={false} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gqt-navy group-hover:text-gqt-blue transition-colors">
                Profile &amp; Documents
              </h3>
              <p className="text-xs text-gqt-neutral-500 mt-1 line-clamp-2">
                Manage your academic credentials, verified PDF resumes, and contact details.
              </p>
            </div>
            <div className="text-xs font-semibold text-gqt-blue flex items-center gap-1 pt-1">
              Manage resume <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/interviews"
            className="group p-5 rounded-2xl border border-gqt-neutral-200 bg-white hover:border-gqt-blue hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <StatusBadge variant="warning" label="Pipeline" showDot={false} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gqt-navy group-hover:text-gqt-blue transition-colors">
                My Interviews
              </h3>
              <p className="text-xs text-gqt-neutral-500 mt-1 line-clamp-2">
                Check reporting timings, interview links, venues, and multi-round results.
              </p>
            </div>
            <div className="text-xs font-semibold text-gqt-blue flex items-center gap-1 pt-1">
              Track rounds <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/placements"
            className="group p-5 rounded-2xl border border-gqt-neutral-200 bg-white hover:border-gqt-blue hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Award className="w-5 h-5" />
              </div>
              <StatusBadge variant="success" label="Offers" showDot={false} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gqt-navy group-hover:text-gqt-blue transition-colors">
                Offers &amp; Joining
              </h3>
              <p className="text-xs text-gqt-neutral-500 mt-1 line-clamp-2">
                Review official corporate offer letters, CTC packages, and acceptance deadlines.
              </p>
            </div>
            <div className="text-xs font-semibold text-gqt-blue flex items-center gap-1 pt-1">
              View offers <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Candidate Readiness & Practice Workspaces */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <CardTitle>Candidate Readiness &amp; Practice Workspaces</CardTitle>
                <p className="text-xs text-gqt-neutral-500 mt-1">
                  Sharpen your technical, communication, and aptitude skills before corporate selection rounds.
                </p>
              </div>
              <StatusBadge variant="success" label="Preparation Open" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Link
                to="/preparation/resume-reviews"
                className="group p-4 rounded-xl border border-gqt-neutral-200 bg-white hover:border-gqt-blue hover:shadow-xs transition-all space-y-2 block"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-gqt-blue group-hover:bg-gqt-blue group-hover:text-white transition-colors">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-xs text-gqt-navy group-hover:text-gqt-blue transition-colors">Resume Reviews</span>
                </div>
                <p className="text-xs text-gqt-neutral-500 line-clamp-2">
                  ATS analysis, mentor rubric scores, and formatting guidelines.
                </p>
              </Link>

              <Link
                to="/preparation/assessments"
                className="group p-4 rounded-xl border border-gqt-neutral-200 bg-white hover:border-gqt-blue hover:shadow-xs transition-all space-y-2 block"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-xs text-gqt-navy group-hover:text-gqt-blue transition-colors">Assessments</span>
                </div>
                <p className="text-xs text-gqt-neutral-500 line-clamp-2">
                  Technical, logical, and coding tests with immediate score feedback.
                </p>
              </Link>

              <Link
                to="/preparation/mock-interviews"
                className="group p-4 rounded-xl border border-gqt-neutral-200 bg-white hover:border-gqt-blue hover:shadow-xs transition-all space-y-2 block"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-xs text-gqt-navy group-hover:text-gqt-blue transition-colors">Mock Interviews</span>
                </div>
                <p className="text-xs text-gqt-neutral-500 line-clamp-2">
                  1-on-1 interview simulations with senior institutional trainers.
                </p>
              </Link>

              <Link
                to="/feedback"
                className="group p-4 rounded-xl border border-gqt-neutral-200 bg-white hover:border-gqt-blue hover:shadow-xs transition-all space-y-2 block"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-xs text-gqt-navy group-hover:text-gqt-blue transition-colors">Share Feedback</span>
                </div>
                <p className="text-xs text-gqt-neutral-500 line-clamp-2">
                  Submit anonymous feedback regarding recruiter interview questions &amp; format.
                </p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 3. AUTHENTICATED: PLACEMENT HEAD VIEW
  // -------------------------------------------------------------
  if (isPlacementHead) {
    return (
      <div className="space-y-8 pb-12">
        {/* Placement Head Hero */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-gqt-navy to-indigo-900 text-white p-8 sm:p-10 shadow-lg border border-gqt-navy/40">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-semibold tracking-wide uppercase border border-white/20">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Executive Placement Office
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Placement Operations &amp; Executive Command
            </h1>
            <p className="text-sm sm:text-base text-blue-100 max-w-2xl leading-relaxed">
              Managing corporate partnerships, hiring requirement approvals, candidate readiness certification, roster submissions, and final placement outcomes.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link to="/jobs/approvals">
                <Button variant="secondary" size="md" className="bg-white text-gqt-navy hover:bg-blue-50 font-bold shadow-xs">
                  <FileCheck className="w-4 h-4 mr-1.5 text-emerald-600" />
                  Review &amp; Approvals Queue
                </Button>
              </Link>
              <Link to="/crm">
                <Button variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold">
                  <Building2 className="w-4 h-4 mr-1.5" />
                  Corporate CRM
                </Button>
              </Link>
              <Link to="/preparation/readiness-gate">
                <Button variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold">
                  <ShieldCheck className="w-4 h-4 mr-1.5 text-amber-300" />
                  Readiness Gate Certification
                </Button>
              </Link>
              <Link to="/reports">
                <Button variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold">
                  <BarChart3 className="w-4 h-4 mr-1.5" />
                  Placement Analytics
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Executive Workspaces Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/crm"
            className="group p-5 rounded-2xl border border-gqt-neutral-200 bg-white hover:border-gqt-blue hover:shadow-md transition-all space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-blue-50 text-gqt-blue group-hover:bg-gqt-blue group-hover:text-white transition-colors">
                <Building2 className="w-5 h-5" />
              </div>
              <StatusBadge variant="info" label="100/day Target" showDot={false} />
            </div>
            <h4 className="font-bold text-sm text-gqt-navy group-hover:text-gqt-blue transition-colors">
              Corporate CRM
            </h4>
            <p className="text-xs text-gqt-neutral-500 line-clamp-2">
              Hiring partners, HR contacts directory, and relationship manager outreach logs.
            </p>
          </Link>

          <Link
            to="/jobs/approvals"
            className="group p-5 rounded-2xl border border-gqt-neutral-200 bg-white hover:border-gqt-blue hover:shadow-md transition-all space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <FileCheck className="w-5 h-5" />
              </div>
              <StatusBadge variant="success" label="Sign-off" showDot={false} />
            </div>
            <h4 className="font-bold text-sm text-gqt-navy group-hover:text-gqt-blue transition-colors">
              Review &amp; Approvals
            </h4>
            <p className="text-xs text-gqt-neutral-500 line-clamp-2">
              Verify 5-point requirement criteria and sign off opportunities for candidate drive.
            </p>
          </Link>

          <Link
            to="/preparation/readiness-gate"
            className="group p-5 rounded-2xl border border-gqt-neutral-200 bg-white hover:border-gqt-blue hover:shadow-md transition-all space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <StatusBadge variant="neutral" label="Certification Gate" showDot={false} />
            </div>
            <h4 className="font-bold text-sm text-gqt-navy group-hover:text-gqt-blue transition-colors">
              Readiness Gate
            </h4>
            <p className="text-xs text-gqt-neutral-500 line-clamp-2">
              Formal placement certification across resumes, test scores, and mock interview performance.
            </p>
          </Link>

          <Link
            to="/submissions"
            className="group p-5 rounded-2xl border border-gqt-neutral-200 bg-white hover:border-gqt-blue hover:shadow-md transition-all space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Send className="w-5 h-5" />
              </div>
              <StatusBadge variant="warning" label="Dispatch" showDot={false} />
            </div>
            <h4 className="font-bold text-sm text-gqt-navy group-hover:text-gqt-blue transition-colors">
              Candidate Submissions
            </h4>
            <p className="text-xs text-gqt-neutral-500 line-clamp-2">
              Filter eligible student cohorts, package verified candidate profiles, and dispatch to recruiters.
            </p>
          </Link>

          <Link
            to="/interviews"
            className="group p-5 rounded-2xl border border-gqt-neutral-200 bg-white hover:border-gqt-blue hover:shadow-md transition-all space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-blue-50 text-gqt-blue group-hover:bg-gqt-blue group-hover:text-white transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <StatusBadge variant="info" label="Rounds" showDot={false} />
            </div>
            <h4 className="font-bold text-sm text-gqt-navy group-hover:text-gqt-blue transition-colors">
              Interview Tracking
            </h4>
            <p className="text-xs text-gqt-neutral-500 line-clamp-2">
              Monitor drive schedules, attendance confirmations, and multi-round recruiter clearances.
            </p>
          </Link>

          <Link
            to="/placements"
            className="group p-5 rounded-2xl border border-gqt-neutral-200 bg-white hover:border-gqt-blue hover:shadow-md transition-all space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Award className="w-5 h-5" />
              </div>
              <StatusBadge variant="success" label="Results" showDot={false} />
            </div>
            <h4 className="font-bold text-sm text-gqt-navy group-hover:text-gqt-blue transition-colors">
              Placement Management
            </h4>
            <p className="text-xs text-gqt-neutral-500 line-clamp-2">
              Ingest corporate hiring results, manage offer letters, track acceptance, and verify joining.
            </p>
          </Link>

          <Link
            to="/feedback"
            className="group p-5 rounded-2xl border border-gqt-neutral-200 bg-white hover:border-gqt-blue hover:shadow-md transition-all space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <MessageSquare className="w-5 h-5" />
              </div>
              <StatusBadge variant="neutral" label="Quality" showDot={false} />
            </div>
            <h4 className="font-bold text-sm text-gqt-navy group-hover:text-gqt-blue transition-colors">
              360° Feedback
            </h4>
            <p className="text-xs text-gqt-neutral-500 line-clamp-2">
              Triangulated reviews from candidates, corporate HR interviewers, and training faculty.
            </p>
          </Link>

          <Link
            to="/continuous-improvement"
            className="group p-5 rounded-2xl border border-gqt-neutral-200 bg-white hover:border-gqt-blue hover:shadow-md transition-all space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <RotateCcw className="w-5 h-5" />
              </div>
              <StatusBadge variant="info" label="Curricula" showDot={false} />
            </div>
            <h4 className="font-bold text-sm text-gqt-navy group-hover:text-gqt-blue transition-colors">
              Continuous Improvement
            </h4>
            <p className="text-xs text-gqt-neutral-500 line-clamp-2">
              Identify candidate skill gaps, evaluate training impact, and refine placement strategies.
            </p>
          </Link>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 4. AUTHENTICATED: CREATIVE DESIGNER VIEW
  // -------------------------------------------------------------
  if (isDesigner) {
    return (
      <div className="space-y-8 pb-12">
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-900 text-white p-8 sm:p-10 shadow-lg border border-purple-800/40">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-semibold tracking-wide uppercase border border-white/20">
              <Palette className="w-3.5 h-3.5 text-purple-300" />
              Creative Studio
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Recruitment Media &amp; Design Studio
            </h1>
            <p className="text-sm sm:text-base text-purple-100 max-w-2xl leading-relaxed">
              Design and deliver branded promotional campaign assets, verify creative specifications, and manage graphic revision queues.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link to="/creatives/my-tasks">
                <Button variant="secondary" size="md" className="bg-white text-purple-900 hover:bg-purple-50 font-bold shadow-xs">
                  <Sparkles className="w-4 h-4 mr-1.5 text-purple-600" />
                  My Designer Tasks
                </Button>
              </Link>
              <Link to="/creatives">
                <Button variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold">
                  Creative Studio Directory
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold">
                  Approved Jobs Reference
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 5. AUTHENTICATED: TRAINER / EVALUATOR VIEW
  // -------------------------------------------------------------
  if (isTrainerOrEvaluator) {
    return (
      <div className="space-y-8 pb-12">
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950 to-emerald-950 text-white p-8 sm:p-10 shadow-lg border border-teal-800/40">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-semibold tracking-wide uppercase border border-white/20">
              <Users className="w-3.5 h-3.5 text-emerald-300" />
              Candidate Training &amp; Mentorship Hub
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Candidate Readiness &amp; Mentorship
            </h1>
            <p className="text-sm sm:text-base text-teal-100 max-w-2xl leading-relaxed">
              Conduct technical and HR mock interviews, evaluate candidate resumes against industry rubrics, score assessments, and certify readiness.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link to="/preparation/mock-interviews">
                <Button variant="secondary" size="md" className="bg-white text-teal-900 hover:bg-teal-50 font-bold shadow-xs">
                  <Users className="w-4 h-4 mr-1.5 text-teal-600" />
                  Mock Interview Evaluations
                </Button>
              </Link>
              <Link to="/preparation/resume-reviews">
                <Button variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold">
                  Resume Reviews
                </Button>
              </Link>
              <Link to="/preparation/assessments">
                <Button variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold">
                  Assessments
                </Button>
              </Link>
              <Link to="/feedback">
                <Button variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold">
                  Trainer Feedback
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 6. AUTHENTICATED: SYSTEM ADMINISTRATOR VIEW (Default for ADMIN)
  // -------------------------------------------------------------
  return (
    <div className="space-y-8 pb-12">
      {/* Administrator Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gqt-navy via-gqt-navy-light to-gqt-blue text-white p-8 sm:p-10 shadow-lg border border-gqt-navy/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-semibold tracking-wide uppercase border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-gqt-blue-accent" />
            Enterprise Talent Management &bull; Superuser
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            GQT HRMS Administration Console
          </h1>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl leading-relaxed">
            Enterprise recruitment platform for Global Quest Technologies. Seamlessly managing corporate outreach, candidate readiness, hiring drives, user access governance, and real-time database synchronization.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link to="/admin/users">
              <Button variant="secondary" size="md" className="bg-white text-gqt-navy hover:bg-blue-50 font-bold shadow-xs">
                <Users className="w-4 h-4 mr-1 text-indigo-600" />
                User Management
              </Button>
            </Link>
            <Link to="/crm">
              <Button variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold">
                Corporate CRM
              </Button>
            </Link>
            <Link to="/jobs">
              <Button variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold">
                Job Requirements
              </Button>
            </Link>
            <Link to="/diagnostics">
              <Button variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold">
                System Diagnostics
              </Button>
            </Link>
            <a
              href="/api/v1/schema/swagger/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold">
                OpenAPI Docs
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Grid: Foundation Invariants & Live System Probe */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Foundation Metric Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-gqt-blue-light flex items-center justify-center text-gqt-blue">
                  <Server className="w-5 h-5" />
                </div>
                <StatusBadge variant="success" label="Active" />
              </div>
              <div>
                <h4 className="text-base font-bold text-gqt-charcoal">Backend Engine</h4>
                <p className="text-xs text-gqt-neutral-500 mt-1">
                  Django 5.1.15 + Django REST Framework with strict 5-Layer pattern and versioned REST endpoints (/api/v1/).
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <StatusBadge variant="success" label="Enforced" />
              </div>
              <div>
                <h4 className="text-base font-bold text-gqt-charcoal">Security Baseline</h4>
                <p className="text-xs text-gqt-neutral-500 mt-1">
                  Fail-closed production settings, sensitive data redaction filter, correlation tracing, and zero secret leakage.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <Layers className="w-5 h-5" />
                </div>
                <StatusBadge variant="info" label="Ready" />
              </div>
              <div>
                <h4 className="text-base font-bold text-gqt-charcoal">PostgreSQL Engine</h4>
                <p className="text-xs text-gqt-neutral-500 mt-1">
                  Psycopg 3.2+ driver with SSL require support, connection pooler optimization, and migration consistency checks.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <Terminal className="w-5 h-5" />
                </div>
                <StatusBadge variant="info" label="Verified Architecture" />
              </div>
              <div>
                <h4 className="text-base font-bold text-gqt-charcoal">System Integrity</h4>
                <p className="text-xs text-gqt-neutral-500 mt-1">
                  Modular Django DRF service layer, PostgreSQL database constraints, and TypeScript strict compiler checks.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Health Check Widget */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>System Liveness</CardTitle>
              <StatusBadge
                variant={health?.status === 'UP' ? 'success' : 'danger'}
                label={health?.status || 'Probing...'}
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between space-y-4">
            {isHealthLoading && <LoadingState message="Connecting to API..." />}
            {isHealthError && (
              <ErrorState
                title="API Unavailable"
                message="Unable to connect to the backend API service."
                onRetry={() => refetchHealth()}
              />
            )}
            {health && (
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-gqt-neutral-50 border border-gqt-neutral-200/80 space-y-2">
                  <div className="flex justify-between py-1 border-b border-gqt-neutral-200/60">
                    <span className="text-gqt-neutral-500">Service:</span>
                    <span className="font-semibold text-gqt-navy">{health.service}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gqt-neutral-200/60">
                    <span className="text-gqt-neutral-500">Version:</span>
                    <span className="font-semibold text-gqt-charcoal">{health.version}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gqt-neutral-200/60">
                    <span className="text-gqt-neutral-500">Environment:</span>
                    <span className="font-semibold text-gqt-blue capitalize">{health.environment}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gqt-neutral-500">Correlation ID:</span>
                    <span className="font-mono text-[10px] text-gqt-charcoal truncate max-w-[140px]">
                      {health.correlation_id}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-gqt-neutral-400 text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  Checked: {new Date(health.timestamp).toLocaleTimeString()}
                </div>
              </div>
            )}
            <Link to="/diagnostics" className="pt-2">
              <Button variant="outline" size="sm" className="w-full">
                View Full Diagnostics
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Integrated Operations Workspace Directory */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle>Talent &amp; Placement Operations Hub</CardTitle>
              <p className="text-xs text-gqt-neutral-500 mt-1">
                Unified institutional recruitment workflow. Select any operational workspace to launch.
              </p>
            </div>
            <StatusBadge variant="success" label="All Workspaces Active" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {adminWorkspaces.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.category}
                  to={p.href}
                  className="group p-3.5 rounded-xl border border-gqt-neutral-200 bg-white hover:border-gqt-blue hover:shadow-md transition-all space-y-2 block"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-md bg-gqt-neutral-100 text-gqt-neutral-600 group-hover:bg-gqt-blue-light group-hover:text-gqt-blue transition-colors">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-mono text-xs font-black text-gqt-blue">{p.category}</span>
                    </div>
                    <StatusBadge variant="neutral" label={p.tag} showDot={false} className="text-[10px] px-2 py-0" />
                  </div>
                  <h5 className="text-xs font-bold text-gqt-charcoal group-hover:text-gqt-blue transition-colors truncate">
                    {p.name}
                  </h5>
                  <div className="text-[11px] text-gqt-neutral-400 group-hover:text-gqt-blue flex items-center gap-1 font-medium transition-colors">
                    Launch workspace <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
