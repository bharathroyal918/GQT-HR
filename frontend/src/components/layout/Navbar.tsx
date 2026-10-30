import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GQTLogo } from '../brand/GQTLogo';
import { NotificationBell } from '../notifications/NotificationBell';
import {
  LayoutDashboard,
  Building2,
  Users,
  PhoneCall,
  Calendar,
  Activity,
  Briefcase,
  FileCheck,
  Palette,
  Sparkles,
  GraduationCap,
  ShieldCheck,
  Send,
  Award,
  MessageSquare,
  BarChart3,
  RotateCcw,
  User as UserIcon,
  LogOut,
  FileCode2,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  UserPlus,
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface NavGroup {
  label: string;
  prefix: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  badge?: string;
  isRightAligned?: boolean;
  sections: NavSection[];
}

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout, hasAnyRole, hasRole } = useAuth();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setOpenGroup(null);
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenGroup(null);
        setUserMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenGroup(null);
        setUserMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const canAccessCRM = hasAnyRole([
    'ADMIN',
    'PLACEMENT_HEAD',
    'PLACEMENT_OFFICER',
    'HR_RELATIONSHIP_MGR',
    'AUDITOR',
  ]);

  const canAccessJobs = hasAnyRole([
    'ADMIN',
    'PLACEMENT_HEAD',
    'PLACEMENT_OFFICER',
    'HR_RELATIONSHIP_MGR',
    'CREATIVE_DESIGNER',
    'AUDITOR',
  ]);

  const canAccessCreatives = hasAnyRole([
    'ADMIN',
    'PLACEMENT_HEAD',
    'PLACEMENT_OFFICER',
    'CREATIVE_DESIGNER',
    'AUDITOR',
  ]);

  const isStaff = hasAnyRole([
    'ADMIN',
    'PLACEMENT_HEAD',
    'PLACEMENT_OFFICER',
    'AUDITOR',
  ]);

  const isStudent = hasRole('STUDENT');

  // Build Workspace Groups with Organized Categorized Sections
  const navGroups: NavGroup[] = [];

  // 1. Corporate CRM Group (2-column organized mega menu)
  if (canAccessCRM) {
    navGroups.push({
      label: 'CRM',
      prefix: '/crm',
      icon: Building2,
      description: 'Hiring partner acquisition, HR contacts & engagement pipeline',
      isRightAligned: false,
      sections: [
        {
          title: 'Accounts & Directory',
          items: [
            { name: 'Companies', href: '/crm/companies', description: 'Verified hiring partners & tiers', icon: Building2 },
            { name: 'HR Contacts', href: '/crm/contacts', description: 'Decision-maker directory', icon: Users },
          ],
        },
        {
          title: 'Outreach & Operations',
          items: [
            { name: 'CRM Dashboard', href: '/crm', description: 'Operations & 100/day targets', icon: LayoutDashboard },
            { name: 'Outreach Logs', href: '/crm/outreach', description: 'Calls, emails & meetings', icon: PhoneCall },
            { name: 'Follow-ups', href: '/crm/follow-ups', description: 'Scheduled tasks & alerts', icon: Calendar },
            { name: 'Reconciliation', href: '/crm/reconciliation', description: 'Database sync diagnostics', icon: Activity },
          ],
        },
      ],
    });
  }

  // 2. Jobs & Creatives Group (2-column organized mega menu)
  const jobSections: NavSection[] = [];
  if (canAccessJobs) {
    jobSections.push({
      title: 'Job Requirements',
      items: [
        { name: 'Job Requirements', href: '/jobs', description: 'Verified corporate job openings', icon: Briefcase },
        { name: 'Review & Approvals', href: '/jobs/approvals', description: 'Multi-stage sign-off queue', icon: FileCheck },
      ],
    });
  }
  if (canAccessCreatives) {
    const creativeItems: NavItem[] = [
      { name: 'Creative Studio', href: '/creatives', description: 'Recruitment promotional assets', icon: Palette },
    ];
    if (isStaff) {
      creativeItems.push({
        name: 'Creative Reviews',
        href: '/creatives/queue',
        description: 'Quality verification queue',
        icon: Sparkles,
      });
    }
    if (hasRole('CREATIVE_DESIGNER') || hasRole('ADMIN')) {
      creativeItems.push({
        name: 'My Designer Tasks',
        href: '/creatives/my-tasks',
        description: 'Design tasks assigned to me',
        icon: Sparkles,
      });
    }
    jobSections.push({
      title: 'Creative Studio & Media',
      items: creativeItems,
    });
  }
  if (jobSections.length > 0) {
    navGroups.push({
      label: 'Jobs & Creatives',
      prefix: '/jobs',
      icon: Briefcase,
      description: 'Job openings verification & recruitment marketing assets',
      isRightAligned: false,
      sections: jobSections,
    });
  }

  // 3. Students & Preparation Group (2-column organized mega menu)
  const candidateItems: NavItem[] = [];
  if (isStudent) {
    candidateItems.push(
      { name: 'My Profile & Resume', href: '/students/profile', description: 'Academic profile & document vault', icon: UserIcon },
      { name: 'Placement Drives', href: '/students/drives', description: 'Eligible hiring opportunities', icon: Briefcase }
    );
  }
  if (isStaff) {
    candidateItems.push(
      { name: 'Student Directory', href: '/students', description: 'Enrolled candidate roster & search', icon: GraduationCap },
      { name: 'Register Candidate', href: '/students/register', description: 'Enroll new student candidate', icon: UserPlus }
    );
  }

  const prepItems: NavItem[] = [
    { name: 'Resume Reviews', href: '/preparation/resume-reviews', description: 'ATS analysis & trainer rubrics', icon: FileCheck },
    { name: 'Assessments', href: '/preparation/assessments', description: 'Technical & aptitude drills', icon: Sparkles },
    { name: 'Mock Interviews', href: '/preparation/mock-interviews', description: '1-on-1 interview evaluations', icon: Users },
  ];
  if (isStaff) {
    prepItems.push({
      name: 'Readiness Gate',
      href: '/preparation/readiness-gate',
      description: 'Formal placement certification',
      icon: ShieldCheck,
    });
  }

  const studentSections: NavSection[] = [];
  if (candidateItems.length > 0) {
    studentSections.push({
      title: isStudent ? 'Candidate Portal' : 'Candidate Management',
      items: candidateItems,
    });
  }
  if (prepItems.length > 0) {
    studentSections.push({
      title: 'Training & Certification',
      items: prepItems,
    });
  }
  if (studentSections.length > 0) {
    navGroups.push({
      label: 'Students & Prep',
      prefix: '/students',
      icon: GraduationCap,
      description: 'Candidate records, readiness training & mock evaluations',
      isRightAligned: true,
      sections: studentSections,
    });
  }

  // 4. Operations Group (Submissions, Interviews, Placements, Feedback)
  const dispatchItems: NavItem[] = [];
  if (hasAnyRole(['ADMIN', 'PLACEMENT_HEAD', 'PLACEMENT_OFFICER', 'HR_RELATIONSHIP_MGR', 'AUDITOR'])) {
    dispatchItems.push({
      name: 'Candidate Submissions',
      href: '/submissions',
      description: 'Batch roster dispatch & packaging',
      icon: Send,
    });
  }
  if (hasAnyRole(['ADMIN', 'PLACEMENT_HEAD', 'PLACEMENT_OFFICER', 'HR_RELATIONSHIP_MGR', 'EVALUATOR', 'TRAINER', 'STUDENT', 'AUDITOR'])) {
    dispatchItems.push({
      name: 'Interview Tracking',
      href: '/interviews',
      description: 'Multi-round schedules & results',
      icon: Calendar,
    });
  }

  const outcomeItems: NavItem[] = [];
  if (hasAnyRole(['ADMIN', 'PLACEMENT_HEAD', 'PLACEMENT_OFFICER', 'HR_RELATIONSHIP_MGR', 'STUDENT', 'AUDITOR'])) {
    outcomeItems.push({
      name: 'Placement Management',
      href: '/placements',
      description: 'Offers, acceptance & joining',
      icon: Award,
    });
  }
  if (hasAnyRole(['ADMIN', 'PLACEMENT_HEAD', 'PLACEMENT_OFFICER', 'HR_RELATIONSHIP_MGR', 'TRAINER', 'EVALUATOR', 'STUDENT', 'AUDITOR'])) {
    outcomeItems.push({
      name: '360° Feedback',
      href: '/feedback',
      description: 'Student, HR & trainer reviews',
      icon: MessageSquare,
    });
  }

  const operationSections: NavSection[] = [];
  if (dispatchItems.length > 0) {
    operationSections.push({
      title: 'Candidate Dispatch',
      items: dispatchItems,
    });
  }
  if (outcomeItems.length > 0) {
    operationSections.push({
      title: 'Results & 360° Review',
      items: outcomeItems,
    });
  }
  if (operationSections.length > 0) {
    navGroups.push({
      label: 'Operations',
      prefix: '/submissions',
      icon: Award,
      description: 'Interview pipelines, offers & quality evaluations',
      isRightAligned: true,
      sections: operationSections,
    });
  }

  // 5. Analytics & Strategy Group
  const analyticsItems: NavItem[] = [];
  if (hasAnyRole(['ADMIN', 'PLACEMENT_HEAD', 'PLACEMENT_OFFICER', 'HR_RELATIONSHIP_MGR', 'AUDITOR', 'STUDENT'])) {
    analyticsItems.push({
      name: 'Reports & Analytics',
      href: '/reports',
      description: 'Funnels, CTC distributions & metrics',
      icon: BarChart3,
    });
  }
  if (hasAnyRole(['ADMIN', 'PLACEMENT_HEAD', 'PLACEMENT_OFFICER', 'HR_RELATIONSHIP_MGR', 'TRAINER', 'EVALUATOR', 'AUDITOR'])) {
    analyticsItems.push({
      name: 'Continuous Improvement',
      href: '/continuous-improvement',
      description: 'Skill gaps, curricula & cycles',
      icon: RotateCcw,
    });
  }
  if (analyticsItems.length > 0) {
    navGroups.push({
      label: 'Analytics',
      prefix: '/reports',
      icon: BarChart3,
      description: 'Placement metrics, performance funnels & curriculum evolution',
      isRightAligned: true,
      sections: [
        {
          title: 'Intelligence & Insights',
          items: analyticsItems,
        },
      ],
    });
  }

  // 6. Admin Group (Administrative Workspace)
  if (hasRole('ADMIN')) {
    navGroups.push({
      label: 'Admin',
      prefix: '/admin',
      icon: ShieldCheck,
      badge: 'Superuser',
      description: 'Access governance, security audits & diagnostic probes',
      isRightAligned: true,
      sections: [
        {
          title: 'Administrative Governance',
          items: [
            { name: 'User & Role Management', href: '/admin/users', description: 'RBAC accounts & security audit', icon: Users },
            { name: 'System Diagnostics', href: '/diagnostics', description: 'Engine health, DB & cache check', icon: Activity },
          ],
        },
      ],
    });
  }

  const isGroupActive = (group: NavGroup) => {
    return group.sections.some((sec) =>
      sec.items.some((item) => location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(`${item.href}/`)))
    );
  };

  const getUserInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0]?.[0] || ''}${parts[1]?.[0] || ''}`.toUpperCase();
    }
    return (name[0] || 'U').toUpperCase();
  };

  const primaryRole = user?.roles?.[0] ? user.roles[0].replace(/_/g, ' ') : 'Member';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gqt-neutral-200/80 shadow-2xs" ref={navRef}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Brand Logo */}
          <Link to="/" className="shrink-0 transition-transform hover:scale-[1.01] flex items-center pr-2">
            <GQTLogo size="sm" />
          </Link>

          {/* Desktop Categorized Navigation Bar */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-1 justify-start ml-2">
            {/* Direct Dashboard Link */}
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${location.pathname === '/'
                  ? 'bg-gqt-blue-light text-gqt-blue font-bold'
                  : 'text-gqt-neutral-600 hover:text-gqt-navy hover:bg-gqt-neutral-100'
                }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>

            {/* Categorized Dropdowns */}
            {navGroups.map((group) => {
              const Icon = group.icon;
              const isActive = isGroupActive(group);
              const isOpen = openGroup === group.label;
              const isAdminGroup = group.label === 'Admin';
              const isMultiSection = group.sections.length > 1;

              return (
                <div key={group.label} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      setOpenGroup(isOpen ? null : group.label);
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${isAdminGroup
                        ? isActive || isOpen
                          ? 'bg-indigo-600 text-white font-bold shadow-xs'
                          : 'bg-indigo-50/80 text-indigo-800 border border-indigo-200/90 hover:bg-indigo-100 font-bold'
                        : isActive || isOpen
                          ? 'bg-gqt-blue-light text-gqt-blue font-bold'
                          : 'text-gqt-neutral-600 hover:text-gqt-navy hover:bg-gqt-neutral-100'
                      }`}
                    aria-expanded={isOpen}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{group.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 text-current transition-transform duration-200 ease-in-out ${isOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  {/* Dropdown Menu Panel with Smooth Transitions & Multi-Column Layout */}
                  {isOpen && (
                    <div
                      className={`absolute ${group.isRightAligned ? 'right-0 origin-top-right' : 'left-0 origin-top-left'
                        } mt-1.5 ${isMultiSection ? 'w-[520px] sm:w-[560px]' : 'w-72 sm:w-80'
                        } bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-gqt-neutral-200/90 py-3 px-3 z-50 transition-all duration-200 ease-out animate-in fade-in-0 zoom-in-95 slide-in-from-top-2`}
                    >
                      {/* Workspace Header Bar */}
                      <div className="px-2 pb-2.5 mb-2.5 border-b border-gqt-neutral-100 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gqt-navy">{group.label} Workspace</span>
                            {group.badge && (
                              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                                {group.badge}
                              </span>
                            )}
                          </div>
                          {group.description && (
                            <p className="text-[10px] text-gqt-neutral-500 mt-0.5">{group.description}</p>
                          )}
                        </div>
                      </div>

                      {/* Sections Content Area (Multi-Column or Single-Column) */}
                      <div
                        className={
                          isMultiSection
                            ? 'grid grid-cols-2 gap-3 divide-x divide-gqt-neutral-100'
                            : 'space-y-1'
                        }
                      >
                        {group.sections.map((section, sIdx) => (
                          <div key={section.title} className={sIdx > 0 ? 'pl-3' : ''}>
                            <div className="px-2 py-1 mb-1 text-[10px] font-bold text-gqt-neutral-400 uppercase tracking-wider">
                              {section.title}
                            </div>
                            <div className="space-y-0.5">
                              {section.items.map((item) => {
                                const ItemIcon = item.icon;
                                const isItemActive =
                                  location.pathname === item.href ||
                                  (item.href !== '/' && location.pathname.startsWith(`${item.href}/`));

                                return (
                                  <Link
                                    key={item.href}
                                    to={item.href}
                                    className={`flex items-start gap-2.5 p-2 text-xs rounded-xl transition-all duration-150 group ${isItemActive
                                        ? 'bg-gqt-blue-light text-gqt-blue font-semibold shadow-xs'
                                        : 'text-gqt-charcoal hover:bg-gqt-neutral-50 hover:text-gqt-navy'
                                      }`}
                                    onClick={() => setOpenGroup(null)}
                                  >
                                    <div
                                      className={`p-1.5 rounded-lg shrink-0 mt-0.5 transition-colors ${isItemActive
                                          ? 'bg-gqt-blue text-white shadow-xs'
                                          : isAdminGroup
                                            ? 'bg-indigo-50 text-indigo-700 group-hover:bg-indigo-100'
                                            : 'bg-gqt-neutral-100 text-gqt-neutral-600 group-hover:bg-blue-100/70 group-hover:text-gqt-blue'
                                        }`}
                                    >
                                      <ItemIcon className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-semibold truncate text-xs">{item.name}</div>
                                      {item.description && (
                                        <div className="text-[10px] text-gqt-neutral-500 font-normal truncate mt-0.5">
                                          {item.description}
                                        </div>
                                      )}
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Superuser Interactive API Docs Footer inside Admin dropdown */}
                      {isAdminGroup && (
                        <div className="pt-2 mt-2.5 border-t border-gqt-neutral-100">
                          <a
                            href="/api/v1/schema/swagger/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between px-2.5 py-2 text-xs text-gqt-neutral-700 hover:text-gqt-navy hover:bg-gqt-neutral-50 rounded-xl transition-colors group"
                            onClick={() => setOpenGroup(null)}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 group-hover:bg-indigo-100 transition-colors">
                                <FileCode2 className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <div className="font-semibold text-xs text-gqt-navy">OpenAPI Swagger UI</div>
                                <div className="text-[10px] text-gqt-neutral-500">Live API documentation & endpoint test harness</div>
                              </div>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-gqt-neutral-400 group-hover:text-gqt-blue transition-colors" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Section: Notifications, Executive User Menu, API link & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Quick Notification Bell */}
            {isAuthenticated && <NotificationBell />}

            {/* Authenticated User Menu */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setOpenGroup(null);
                    setUserMenuOpen(!userMenuOpen);
                  }}
                  className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-lg border border-gqt-neutral-200 hover:border-gqt-neutral-300 bg-white hover:bg-gqt-neutral-50 transition-all text-left"
                  aria-expanded={userMenuOpen}
                  aria-label="User profile and account settings"
                >
                  <div className="w-7 h-7 rounded-full bg-gqt-navy text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs">
                    {getUserInitials(user.full_name)}
                  </div>
                  <div className="hidden sm:flex flex-col leading-tight min-w-0">
                    <span className="text-xs font-bold text-gqt-navy truncate max-w-[110px]" title={user.full_name}>
                      {user.full_name}
                    </span>
                    <span className="text-[9px] font-semibold text-gqt-neutral-500 uppercase tracking-tight">
                      {primaryRole}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-3 h-3 text-gqt-neutral-400 hidden sm:block transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                {/* Profile Dropdown Panel */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-1.5 w-64 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-gqt-neutral-200/90 py-2.5 px-2 z-50 transition-all duration-200 ease-out animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
                    <div className="px-3 py-2 border-b border-gqt-neutral-100">
                      <p className="text-xs font-bold text-gqt-navy truncate">{user.full_name}</p>
                      <p className="text-[11px] text-gqt-neutral-500 truncate mt-0.5">{user.email}</p>
                      <div className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-gqt-blue border border-blue-200">
                        {primaryRole}
                      </div>
                    </div>

                    <div className="py-1 space-y-0.5">
                      {hasRole('ADMIN') && (
                        <>
                          <Link
                            to="/admin/users"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gqt-charcoal hover:bg-gqt-neutral-50 hover:text-gqt-navy rounded-lg transition-colors"
                          >
                            <Users className="w-4 h-4 text-indigo-600" />
                            <span>User Management</span>
                          </Link>
                          <Link
                            to="/diagnostics"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gqt-charcoal hover:bg-gqt-neutral-50 hover:text-gqt-navy rounded-lg transition-colors"
                          >
                            <Activity className="w-4 h-4 text-gqt-blue" />
                            <span>System Diagnostics</span>
                          </Link>
                        </>
                      )}

                      {isStudent && (
                        <>
                          <Link
                            to="/students/profile"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gqt-charcoal hover:bg-gqt-neutral-50 hover:text-gqt-navy rounded-lg transition-colors"
                          >
                            <UserIcon className="w-4 h-4 text-gqt-blue" />
                            <span>My Profile & Resume</span>
                          </Link>
                          <Link
                            to="/students/drives"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gqt-charcoal hover:bg-gqt-neutral-50 hover:text-gqt-navy rounded-lg transition-colors"
                          >
                            <Briefcase className="w-4 h-4 text-emerald-600" />
                            <span>Placement Drives</span>
                          </Link>
                        </>
                      )}

                      <a
                        href="/api/v1/schema/swagger/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 text-xs font-medium text-gqt-charcoal hover:bg-gqt-neutral-50 hover:text-gqt-navy rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <FileCode2 className="w-4 h-4 text-gqt-blue" />
                          <span>Interactive API Docs</span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-gqt-neutral-400" />
                      </a>
                    </div>

                    <div className="pt-1 border-t border-gqt-neutral-100">
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gqt-navy hover:bg-gqt-navy-light text-white transition-colors shadow-2xs"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Direct Quick Logout Button (Header Icon) */}
            {isAuthenticated && (
              <button
                type="button"
                onClick={() => logout()}
                title="Sign out of GQT HRMS"
                className="hidden sm:inline-flex p-1.5 rounded-lg text-gqt-neutral-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}

            {/* Mobile / Tablet Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gqt-neutral-600 hover:text-gqt-navy hover:bg-gqt-neutral-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gqt-neutral-200 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-4 space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
          {/* Mobile User Profile Summary */}
          {isAuthenticated && user && (
            <div className="p-3 rounded-xl bg-gqt-neutral-50 border border-gqt-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gqt-navy text-white text-xs font-bold flex items-center justify-center">
                  {getUserInitials(user.full_name)}
                </div>
                <div>
                  <div className="font-bold text-xs text-gqt-navy">{user.full_name}</div>
                  <div className="text-[10px] text-gqt-neutral-500">{user.email}</div>
                  <div className="text-[9px] font-bold text-gqt-blue uppercase mt-0.5">{primaryRole}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => logout()}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          )}

          {/* Dashboard Direct Link */}
          <Link
            to="/"
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${location.pathname === '/'
                ? 'bg-gqt-blue-light text-gqt-blue font-bold'
                : 'text-gqt-charcoal hover:bg-gqt-neutral-50'
              }`}
          >
            <LayoutDashboard className="w-4 h-4 text-gqt-blue" />
            <span>Dashboard Hub</span>
          </Link>

          {/* Grouped Workspaces in Mobile Drawer */}
          {navGroups.map((group) => {
            const isAdmin = group.label === 'Admin';
            return (
              <div
                key={group.label}
                className={`rounded-2xl p-3 space-y-2 ${isAdmin ? 'bg-indigo-50/50 border border-indigo-200/70' : 'border border-gqt-neutral-200/80 bg-white shadow-2xs'
                  }`}
              >
                <div className="px-1 text-[11px] font-bold text-gqt-navy uppercase tracking-wider flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <group.icon className="w-3.5 h-3.5 text-gqt-blue" />
                    <span>{group.label}</span>
                  </div>
                  {isAdmin && (
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800">
                      Restricted
                    </span>
                  )}
                </div>

                {group.sections.map((section) => (
                  <div key={section.title} className="space-y-1 pt-1">
                    <div className="text-[9px] font-bold text-gqt-neutral-400 uppercase tracking-wider px-2">
                      {section.title}
                    </div>
                    <div className="space-y-0.5">
                      {section.items.map((item) => {
                        const ItemIcon = item.icon;
                        const isItemActive = location.pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition-colors ${isItemActive
                                ? 'bg-gqt-blue-light text-gqt-blue font-bold'
                                : 'text-gqt-charcoal hover:bg-gqt-neutral-50'
                              }`}
                          >
                            <ItemIcon className="w-4 h-4 text-gqt-neutral-500 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="truncate font-semibold text-xs">{item.name}</div>
                              {item.description && (
                                <div className="text-[10px] text-gqt-neutral-400 font-normal truncate">
                                  {item.description}
                                </div>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}

          {/* Mobile Footer Tools */}
          <div className="pt-3 border-t border-gqt-neutral-200 flex flex-col gap-2">
            <a
              href="/api/v1/schema/swagger/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-gqt-charcoal hover:bg-gqt-neutral-50 border border-gqt-neutral-200"
            >
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-gqt-blue" />
                <span>Interactive OpenAPI Documentation</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-gqt-neutral-400" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
