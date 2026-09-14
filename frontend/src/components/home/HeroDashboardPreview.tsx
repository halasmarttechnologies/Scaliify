"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import {
  Folder,
  Sliders,
  Sparkles,
  Zap,
  Check,
  Layers,
  ArrowRight,
  Cpu,
  Users,
  UserCheck,
  Compass,
  X,
  Calendar,
  FileText,
  ShieldCheck,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

type ServiceKey = "it-selection" | "outsourced-hr" | "interim-management" | "hr-advisory";

interface WorkflowStep {
  stepNumber: number;
  badge: string;
  badgeColor: string;
  statusPill: string;
  avatarSrc: string;
  clientTitle: string;
  clientSubtitle: string;
  focusTitle: string;
  focusSubtitle: string;
  focusIcon: React.ElementType;
  focusIconBg: string;
  keyItems?: { label: string; value: string; highlight?: boolean }[];
  checklist?: string[];
  metricNumber?: string;
  metricLabel?: string;
  bottomCallout: string;
  ctaText: string;
  ctaTextDe?: string;
  ctaHref: string;
}

interface ServiceWorkflow {
  id: ServiceKey;
  label: string;
  labelDe: string;
  icon: React.ElementType;
  canvasTitle: string;
  canvasTitleDe: string;
  badgeText: string;
  steps: WorkflowStep[];
}

// ─────────────────────────────────────────────────────────────
// Service Workflow Data Sets (4 Pillars)
// ─────────────────────────────────────────────────────────────

const SERVICE_WORKFLOWS: Record<ServiceKey, ServiceWorkflow> = {
  "it-selection": {
    id: "it-selection",
    label: "HR IT Selection & Tech",
    labelDe: "HR-IT-Auswahl & Tech",
    icon: Cpu,
    canvasTitle: "This is how we partner with our clients: HR IT Selection & Optimization",
    canvasTitleDe: "So begleiten wir unsere Kunden: HR-IT-Auswahl & Optimierung",
    badgeText: "4-Step Tech Architecture",
    steps: [
      {
        stepNumber: 1,
        badge: "Step 1",
        badgeColor: "bg-[#00D2C4] text-[#05434B]",
        statusPill: "New Project",
        avatarSrc: "/avatars/catherine.jpg",
        clientTitle: "Scaleup People Lead",
        clientSubtitle: "120 employees · DE & UK",
        focusTitle: "HR Transformation Mandate",
        focusSubtitle: "Siloed tools, manual payroll exports & rapid scaling",
        focusIcon: Layers,
        focusIconBg: "bg-[#5BC7BC] text-[#05434B]",
        bottomCallout: "Comprehensive Requirements Audit",
        ctaText: "+ Discovery Call Initiated",
        ctaHref: "/lets-talk",
      },
      {
        stepNumber: 2,
        badge: "Step 2",
        badgeColor: "bg-pink-500 text-white",
        statusPill: "0% Bias",
        avatarSrc: "/avatars/silvia.jpg",
        clientTitle: "Procurement Committee",
        clientSubtitle: "Vendor evaluation underway",
        focusTitle: "Independent Tool Selection",
        focusSubtitle: "Benchmarked against 20+ verified European platforms",
        focusIcon: Sliders,
        focusIconBg: "bg-pink-100 text-pink-700",
        keyItems: [
          { label: "HRIS", value: "Personio / HiBob", highlight: true },
          { label: "ATS", value: "Greenhouse / Ashby" },
          { label: "Payroll", value: "DATEV LODAS", highlight: true },
        ],
        bottomCallout: "Process Redesign First",
        ctaText: "Explore Tool Evaluation",
        ctaHref: "/services/hr-it-selection",
      },
      {
        stepNumber: 3,
        badge: "Step 3",
        badgeColor: "bg-blue-600 text-white",
        statusPill: "Execution",
        avatarSrc: "/avatars/bente.jpg",
        clientTitle: "Implementation Lead",
        clientSubtitle: "Custom build & cutover",
        focusTitle: "Execution & Integrations",
        focusSubtitle: "Data migration, custom configuration & automated payroll sync",
        focusIcon: Zap,
        focusIconBg: "bg-blue-100 text-blue-700",
        checklist: [
          "Data Migration (100% Clean)",
          "DATEV Automated Pipeline",
          "Interim HR Lead Placed",
        ],
        bottomCallout: ">100 Network ● Live Rollout",
        ctaText: "View Integration Specs",
        ctaHref: "/services/hr-it-integrations",
      },
      {
        stepNumber: 4,
        badge: "Step 4",
        badgeColor: "bg-emerald-600 text-white",
        statusPill: "Live",
        avatarSrc: "/avatars/felix.jpg",
        clientTitle: "Leadership & Finance",
        clientSubtitle: "Operational excellence",
        focusTitle: "Single Source of Truth",
        focusSubtitle: "Automated workflows & zero payroll discrepancies",
        focusIcon: Sparkles,
        focusIconBg: "bg-emerald-100 text-emerald-700",
        metricNumber: "18h+",
        metricLabel: "Saved / Mo per HR Lead",
        bottomCallout: "100% Data Integrity Achieved",
        ctaText: "Scale Your HR Operations",
        ctaHref: "/lets-talk",
      },
    ],
  },
  "outsourced-hr": {
    id: "outsourced-hr",
    label: "Outsourced HR",
    labelDe: "Ausgelagertes HR",
    icon: Users,
    canvasTitle: "This is how we partner with our clients: Full-Service Outsourced HR",
    canvasTitleDe: "So begleiten wir unsere Kunden: Ausgelagertes HR-Management",
    badgeText: "Turnkey People Operations",
    steps: [
      {
        stepNumber: 1,
        badge: "Step 1",
        badgeColor: "bg-[#00D2C4] text-[#05434B]",
        statusPill: "Onboarding",
        avatarSrc: "/avatars/silvia.jpg",
        clientTitle: "Managing Director / Founder",
        clientSubtitle: "35 employees · Scaling team",
        focusTitle: "People Operations Audit",
        focusSubtitle: "Review contracts, personnel files & compliance gaps",
        focusIcon: FileText,
        focusIconBg: "bg-[#5BC7BC] text-[#05434B]",
        bottomCallout: "Immediate Workload Relief",
        ctaText: "+ Outsource Scoping Call",
        ctaHref: "/lets-talk",
      },
      {
        stepNumber: 2,
        badge: "Step 2",
        badgeColor: "bg-violet-600 text-white",
        statusPill: "Dedicated",
        avatarSrc: "/avatars/catherine.jpg",
        clientTitle: "Dedicated HR Lead",
        clientSubtitle: "Assigned within 5 days",
        focusTitle: "People Ops Pod Assigned",
        focusSubtitle: "Your personal, senior HR department on speed dial",
        focusIcon: Users,
        focusIconBg: "bg-violet-100 text-violet-700",
        keyItems: [
          { label: "Lead", value: "Senior HR Specialist", highlight: true },
          { label: "Admin", value: "Daily Employee Q&A" },
          { label: "Tooling", value: "Central Self-Service", highlight: true },
        ],
        bottomCallout: "Zero Internal HR Overhead",
        ctaText: "Meet the Pod Model",
        ctaHref: "/services/outsourced-hr",
      },
      {
        stepNumber: 3,
        badge: "Step 3",
        badgeColor: "bg-amber-600 text-white",
        statusPill: "Automated",
        avatarSrc: "/avatars/mo.jpg",
        clientTitle: "Monthly Operations",
        clientSubtitle: "Recurring rhythm",
        focusTitle: "Payroll & Contract Ops",
        focusSubtitle: "Flawless preliminary payroll, sick leaves & work certificates",
        focusIcon: ShieldCheck,
        focusIconBg: "bg-amber-100 text-amber-700",
        checklist: [
          "100% On-Time Payroll Prep",
          "Standardized Work Contracts",
          "Automated Absence Tracking",
        ],
        bottomCallout: "Tax Advisor Ready Cutover",
        ctaText: "Review Operational Scope",
        ctaHref: "/services/outsourced-hr",
      },
      {
        stepNumber: 4,
        badge: "Step 4",
        badgeColor: "bg-emerald-600 text-white",
        statusPill: "Scale",
        avatarSrc: "/avatars/bente.jpg",
        clientTitle: "Leadership & Growth",
        clientSubtitle: "Continuous advisory",
        focusTitle: "Scalable Infrastructure",
        focusSubtitle: "Structured performance reviews, onboarding & retention",
        focusIcon: Sparkles,
        focusIconBg: "bg-emerald-100 text-emerald-700",
        metricNumber: "25h+",
        metricLabel: "Saved / Week for Founders",
        bottomCallout: "Compliant & Scalable HR Hub",
        ctaText: "Get Started With Outsourced HR",
        ctaHref: "/lets-talk",
      },
    ],
  },
  "interim-management": {
    id: "interim-management",
    label: "Interim Management",
    labelDe: "Interim-Management",
    icon: UserCheck,
    canvasTitle: "This is how we partner with our clients: Interim HR Management",
    canvasTitleDe: "So begleiten wir unsere Kunden: Interim-HR-Management",
    badgeText: "Interim HR Placement",
    steps: [
      {
        stepNumber: 1,
        badge: "Step 1",
        badgeColor: "bg-[#00D2C4] text-[#05434B]",
        statusPill: "Urgent Need",
        avatarSrc: "/avatars/felix.jpg",
        clientTitle: "CEO / VP People",
        clientSubtitle: "Sudden vacancy / parental leave",
        focusTitle: "Rapid Leadership Assessment",
        focusSubtitle: "Diagnose leadership gap, define priorities & culture fit",
        focusIcon: Calendar,
        focusIconBg: "bg-[#5BC7BC] text-[#05434B]",
        bottomCallout: "Executive Match in 48 Hours",
        ctaText: "+ Request Interim Manager",
        ctaTextDe: "+ Interim-Manager anfragen",
        ctaHref: "/contact?topic=interim",
      },
      {
        stepNumber: 2,
        badge: "Step 2",
        badgeColor: "bg-cyan-600 text-white",
        statusPill: "<48 Hours",
        avatarSrc: "/avatars/catherine.jpg",
        clientTitle: "Senior Interim Director",
        clientSubtitle: "+10 yrs executive HR experience",
        focusTitle: "Immediate Deployment",
        focusSubtitle: "Hands-on day-1 immersion with your management team",
        focusIcon: UserCheck,
        focusIconBg: "bg-cyan-100 text-cyan-700",
        keyItems: [
          { label: "Profile", value: "VP / Head of People", highlight: true },
          { label: "Availability", value: "Immediate (Full/Part-Time)" },
          { label: "Focus", value: "Stabilization & Guidance", highlight: true },
        ],
        bottomCallout: "Pre-Vetted Senior Specialist",
        ctaText: "View Leadership Profiles",
        ctaHref: "/services/interim-management",
      },
      {
        stepNumber: 3,
        badge: "Step 3",
        badgeColor: "bg-indigo-600 text-white",
        statusPill: "Stability",
        avatarSrc: "/avatars/silvia.jpg",
        clientTitle: "People Team & Board",
        clientSubtitle: "Executing strategic roadmap",
        focusTitle: "Stabilization & Execution",
        focusSubtitle: "Restructuring, team retention, employee relations & works councils",
        focusIcon: ShieldCheck,
        focusIconBg: "bg-indigo-100 text-indigo-700",
        checklist: [
          "Leadership Continuity Maintained",
          "Team Morale & Retention Secured",
          "Strategic Key Hires Unblocked",
        ],
        bottomCallout: "Seamless Operational Rhythm",
        ctaText: "Explore Interim Scenarios",
        ctaHref: "/services/interim-management",
      },
      {
        stepNumber: 4,
        badge: "Step 4",
        badgeColor: "bg-emerald-600 text-white",
        statusPill: "Handover",
        avatarSrc: "/avatars/max.jpg",
        clientTitle: "Permanent Successor",
        clientSubtitle: "Onboarded & empowered",
        focusTitle: "Permanent Handover",
        focusSubtitle: "Hiring, onboarding & smooth succession to permanent hire",
        focusIcon: Sparkles,
        focusIconBg: "bg-emerald-100 text-emerald-700",
        metricNumber: "100%",
        metricLabel: "Seamless Leadership Continuity",
        bottomCallout: "Clean Handover Without Friction",
        ctaText: "Discuss Interim Placement",
        ctaHref: "/lets-talk",
      },
    ],
  },
  "hr-advisory": {
    id: "hr-advisory",
    label: "HR Advisory",
    labelDe: "HR-Beratung",
    icon: Compass,
    canvasTitle: "This is how we partner with our clients: Strategic HR Advisory & Org Design",
    canvasTitleDe: "So begleiten wir unsere Kunden: Strategische HR-Beratung",
    badgeText: "High-Impact Consulting",
    steps: [
      {
        stepNumber: 1,
        badge: "Step 1",
        badgeColor: "bg-[#00D2C4] text-[#05434B]",
        statusPill: "Diagnosis",
        avatarSrc: "/avatars/catherine.jpg",
        clientTitle: "Board & Executive Team",
        clientSubtitle: "Scaling across Europe",
        focusTitle: "Organizational Diagnosis",
        focusSubtitle: "Evaluate org structure, span of control & comp leveling",
        focusIcon: Compass,
        focusIconBg: "bg-[#5BC7BC] text-[#05434B]",
        bottomCallout: "Actionable 90-Day Blueprint",
        ctaText: "+ Schedule Strategy Session",
        ctaHref: "/lets-talk",
      },
      {
        stepNumber: 2,
        badge: "Step 2",
        badgeColor: "bg-teal-600 text-white",
        statusPill: "Framework",
        avatarSrc: "/avatars/bente.jpg",
        clientTitle: "Advisory Practice",
        clientSubtitle: "European market benchmarks",
        focusTitle: "Comp & Career Leveling",
        focusSubtitle: "Salary bands, job families & EU Pay Transparency architecture",
        focusIcon: TrendingUp,
        focusIconBg: "bg-teal-100 text-teal-700",
        keyItems: [
          { label: "Leveling", value: "Clear Job Ladders", highlight: true },
          { label: "Bands", value: "Market-Benchmarked Comp" },
          { label: "EU Law", value: "Pay Transparency 2026", highlight: true },
        ],
        bottomCallout: "Fair, Transparent Compensation",
        ctaText: "Explore Advisory Focus",
        ctaHref: "/services/hr-advisory",
      },
      {
        stepNumber: 3,
        badge: "Step 3",
        badgeColor: "bg-purple-600 text-white",
        statusPill: "Alignment",
        avatarSrc: "/avatars/mo.jpg",
        clientTitle: "People Leaders & Managers",
        clientSubtitle: "Hands-on rollout",
        focusTitle: "Change Architecture",
        focusSubtitle: "Manager training, works council negotiation & culture code",
        focusIcon: Zap,
        focusIconBg: "bg-purple-100 text-purple-700",
        checklist: [
          "Leadership Alignment Sessions",
          "Works Council Agreements Passed",
          "Manager Coaching Completed",
        ],
        bottomCallout: "Sustainable Cultural Buy-In",
        ctaText: "Review Advisory Playbooks",
        ctaHref: "/services/hr-advisory",
      },
      {
        stepNumber: 4,
        badge: "Step 4",
        badgeColor: "bg-emerald-600 text-white",
        statusPill: "Impact",
        avatarSrc: "/avatars/silvia.jpg",
        clientTitle: "High-Growth Enterprise",
        clientSubtitle: "Resilient & future-ready",
        focusTitle: "High-Performance Culture",
        focusSubtitle: "Measurable retention, predictable hiring & board clarity",
        focusIcon: Sparkles,
        focusIconBg: "bg-emerald-100 text-emerald-700",
        metricNumber: "35%+",
        metricLabel: "Increased Retention & Clarity",
        bottomCallout: "Board-Ready People Strategy",
        ctaText: "Partner With Our Advisors",
        ctaHref: "/lets-talk",
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export const HeroDashboardPreview = React.memo(function HeroDashboardPreview() {
  const locale = useLocale();
  const isDe = locale === "de";

  const [activeService, setActiveService] = useState<ServiceKey>("it-selection");
  const [selectedStep, setSelectedStep] = useState<WorkflowStep | null>(null);
  const [activeMobileStep, setActiveMobileStep] = useState<number>(0);

  // Scaled container measurement for desktop/tablet responsiveness
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopCanvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);
  const [canvasHeight, setCanvasHeight] = useState<number>(440);

  const DESKTOP_WIDTH = 980;

  const handleResize = useCallback(() => {
    if (!containerRef.current) return;
    const currentWidth = containerRef.current.offsetWidth;
    if (currentWidth < DESKTOP_WIDTH) {
      const calculatedScale = currentWidth / DESKTOP_WIDTH;
      setScale(calculatedScale);
    } else {
      setScale(1);
    }

    if (desktopCanvasRef.current) {
      const measured = desktopCanvasRef.current.offsetHeight;
      if (measured > 0) {
        setCanvasHeight(measured);
      }
    }
  }, []);

  useEffect(() => {
    handleResize();
    const ro = new ResizeObserver(handleResize);
    if (containerRef.current) ro.observe(containerRef.current);
    if (desktopCanvasRef.current) ro.observe(desktopCanvasRef.current);
    window.addEventListener("resize", handleResize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize, activeService]);

  const currentWorkflow = SERVICE_WORKFLOWS[activeService];

  return (
    <div className="mt-8 sm:mt-12 w-full max-w-5xl relative flex flex-col items-center">
      {/* ── 1. Interactive Service Pillar Toggles ───────────────── */}
      <div className="w-full mb-4 sm:mb-6 px-2 flex flex-col items-center">
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg w-full max-w-xl">
          {(Object.keys(SERVICE_WORKFLOWS) as ServiceKey[]).map((key) => {
            const service = SERVICE_WORKFLOWS[key];
            const isActive = activeService === key;
            const Icon = service.icon;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setActiveService(key);
                  setActiveMobileStep(0);
                }}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 text-center cursor-pointer select-none ${
                  isActive
                    ? "bg-gradient-to-r from-[#81D8D0] to-[#5BC7BC] text-[#05434B] shadow-[0_2px_12px_rgba(129,216,208,0.45)] scale-[1.02]"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="truncate">{isDe ? service.labelDe : service.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 2. Outer Frosted & Glowing Border Container ─────────── */}
      <div className="w-full relative p-[2px] sm:p-[2.5px] rounded-[24px] sm:rounded-[34px] overflow-hidden shadow-2xl">
        {/* Animated Tiffany Blue Border Beam */}
        <div
          className="absolute -inset-[200%] animate-border-beam pointer-events-none"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, transparent 0deg 270deg, #81D8D0 320deg, #A8F5EE 345deg, #FFFFFF 360deg)",
          }}
        />

        {/* Frosted Glass Outer Container */}
        <div className="relative z-10 w-full p-2 sm:p-3 rounded-[24px] sm:rounded-[34px] bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden">
          
          {/* Main Canvas Card */}
          <div className="w-full bg-[#FAFBFC] rounded-[20px] sm:rounded-[28px] border border-gray-200/90 text-gray-900 overflow-hidden relative">
            
            {/* Dot Grid Background Pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage: "radial-gradient(#94a3b8 1.1px, transparent 1.1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Top Canvas Status Bar */}
            <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 border-b border-gray-200/80 bg-white/90 backdrop-blur-sm relative z-20">
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-bold text-gray-600 uppercase tracking-wider hidden xs:inline truncate">
                  Scaliify Journey
                </span>
              </div>
              <h3 className="text-[11px] sm:text-xs md:text-sm font-bold text-gray-900 text-center truncate px-2">
                {isDe ? currentWorkflow.canvasTitleDe : currentWorkflow.canvasTitle}
              </h3>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-brand-dark bg-[#81D8D0]/30 px-2 sm:px-2.5 py-0.5 rounded-full shrink-0">
                <span>{currentWorkflow.badgeText}</span>
              </div>
            </div>

            {/* ── 3. Responsive Desktop/Tablet Viewport Container ──── */}
            <div
              ref={containerRef}
              className="hidden md:flex w-full relative overflow-hidden justify-center"
              style={{
                height: scale < 1 ? `${Math.ceil(canvasHeight * scale)}px` : "auto",
              }}
            >
              <div
                ref={desktopCanvasRef}
                style={{
                  width: scale < 1 ? `${DESKTOP_WIDTH}px` : "100%",
                  transform: scale < 1 ? `scale(${scale})` : "none",
                  transformOrigin: "top center",
                }}
                className="relative p-4 sm:p-6 lg:p-7 shrink-0 transition-transform duration-75 ease-out select-none"
              >
                {/* Scoped CSS Animation for Running Wire Connectors */}
                <style>{`
                  @keyframes wireRunning {
                    from {
                      stroke-dashoffset: 24;
                    }
                    to {
                      stroke-dashoffset: 0;
                    }
                  }
                  .wire-running {
                    stroke-dasharray: 6 6;
                    animation: wireRunning 1.2s linear infinite;
                  }
                `}</style>

                {/* SVG Connecting Horizontal Wire (Between cards) */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-4 pointer-events-none z-0 px-8">
                  <svg className="w-full h-8 overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12%" y1="50%" x2="88%" y2="50%" stroke="#E5E7EB" strokeWidth="2" />
                    <line
                      x1="12%"
                      y1="50%"
                      x2="88%"
                      y2="50%"
                      stroke="#00D2C4"
                      strokeWidth="2.5"
                      className="wire-running"
                    />
                  </svg>
                </div>

                {/* 4-Step Cards Desktop Grid (Always 4 columns) */}
                <div className="grid grid-cols-4 gap-4 sm:gap-5 items-stretch relative z-10">
                  {currentWorkflow.steps.map((step) => {
                    const FocusIcon = step.focusIcon;
                    return (
                      <div
                        key={step.stepNumber}
                        onClick={() => setSelectedStep(step)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && setSelectedStep(step)}
                        className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-xs flex flex-col justify-between relative group hover:border-[#81D8D0] hover:shadow-md transition-all duration-200 cursor-pointer text-left min-h-[340px]"
                      >
                        {/* Step Pill & Status */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 ${step.badgeColor}`}
                            >
                              <Folder className="w-2.5 h-2.5 fill-current" />
                              <span>{step.badge}</span>
                            </span>
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                              {step.statusPill}
                            </span>
                          </div>

                          {/* Client / Advisor Persona Header */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gray-200 shrink-0">
                              <Image
                                src={step.avatarSrc}
                                alt={step.clientTitle}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-[11px] font-bold text-gray-950 leading-tight">
                                {step.clientTitle}
                              </p>
                              <p className="text-[9px] text-gray-500">{step.clientSubtitle}</p>
                            </div>
                          </div>

                          {/* Focus Feature Box */}
                          <div className="bg-[#f4faf8] rounded-xl p-2.5 border border-[#76D8C8]/40 mb-3">
                            <div
                              className={`w-6 h-6 rounded-lg ${step.focusIconBg} flex items-center justify-center mb-1`}
                            >
                              <FocusIcon className="w-3 h-3 stroke-[2.5]" />
                            </div>
                            <p className="text-[11px] font-bold text-black leading-snug">
                              {step.focusTitle}
                            </p>
                            <p className="text-[9.5px] text-gray-600 mt-0.5 leading-snug line-clamp-2">
                              {step.focusSubtitle}
                            </p>
                          </div>

                          {/* Key Items List (if present) */}
                          {step.keyItems && (
                            <div className="space-y-1 mb-3 text-[10px]">
                              {step.keyItems.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between bg-gray-50 px-2 py-1 rounded-lg border border-gray-200/80"
                                >
                                  <span className="font-bold text-gray-800">{item.label}:</span>
                                  <span
                                    className={`px-1.5 py-0.2 rounded font-semibold ${
                                      item.highlight
                                        ? "text-[#05434B] bg-[#76D8C8]/25 font-extrabold"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    {item.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Checklist (if present) */}
                          {step.checklist && (
                            <div className="bg-[#FAF9FF] rounded-xl p-2 border border-gray-200/80 space-y-1 text-[9.5px] font-medium text-gray-700 mb-3">
                              {step.checklist.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                  <span>{item}</span>
                                  <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Metric Stat (if present) */}
                          {step.metricNumber && (
                            <div className="flex items-baseline justify-between mb-2">
                              <span className="text-2xl font-black text-black tracking-tight">
                                {step.metricNumber}
                              </span>
                              <span className="text-[9.5px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                                {step.metricLabel}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Bottom Outcome & CTA Button */}
                        <div>
                          <div className="bg-[#eaf7f2] rounded-xl p-1.5 text-center border border-[#76D8C8]/40 mb-2">
                            <p className="text-[9px] font-extrabold text-[#05434B] truncate">
                              {step.bottomCallout}
                            </p>
                          </div>

                          <Link
                            href={step.ctaHref}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full inline-flex items-center justify-center gap-1 bg-[#00D2C4] hover:bg-[#76D8C8] text-[#05434B] text-[11px] font-extrabold py-2 px-2.5 rounded-xl transition-colors shadow-2xs active:scale-95"
                          >
                            <span className="truncate">{isDe && step.ctaTextDe ? step.ctaTextDe : step.ctaText}</span>
                            <ArrowRight className="w-3 h-3 shrink-0" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── 4. Dedicated Native Mobile Stepper Card (block md:hidden) ── */}
            <div className="block md:hidden p-3.5 sm:p-4">
              {/* Step Tabs (All 4 steps clearly visible and touchable) */}
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-gray-100/90 rounded-xl mb-3 border border-gray-200/80">
                {currentWorkflow.steps.map((step, idx) => {
                  const isStepActive = activeMobileStep === idx;
                  return (
                    <button
                      key={step.stepNumber}
                      type="button"
                      onClick={() => setActiveMobileStep(idx)}
                      className={`py-2 px-1 rounded-lg text-xs font-bold transition-all text-center flex flex-col items-center justify-center cursor-pointer ${
                        isStepActive
                          ? "bg-[#05434B] text-white shadow-xs"
                          : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                      }`}
                    >
                      <span className="text-[11px] font-black uppercase tracking-wider">
                        Step {step.stepNumber}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Content Card */}
              {(() => {
                const step = currentWorkflow.steps[activeMobileStep] || currentWorkflow.steps[0];
                const FocusIcon = step.focusIcon;
                return (
                  <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-sm flex flex-col">
                    {/* Step Badge & Status */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${step.badgeColor}`}
                      >
                        {step.badge}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                        {step.statusPill}
                      </span>
                    </div>

                    {/* Step Title & Subtitle */}
                    <div className="flex items-start gap-2.5 mb-2.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${step.focusIconBg}`}
                      >
                        <FocusIcon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-black text-gray-900 leading-snug">
                          {step.focusTitle}
                        </h4>
                        <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">
                          {step.focusSubtitle}
                        </p>
                      </div>
                    </div>

                    {/* Stakeholder Info */}
                    <div className="flex items-center gap-2.5 p-2 bg-gray-50 rounded-xl border border-gray-200/60 mb-2.5">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 shrink-0">
                        <Image
                          src={step.avatarSrc}
                          alt={step.clientTitle}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-gray-900 truncate">
                          {step.clientTitle}
                        </p>
                        <p className="text-[10px] text-gray-500 truncate">
                          {step.clientSubtitle}
                        </p>
                      </div>
                    </div>

                    {/* Middle Details: keyItems / checklist / metric */}
                    {step.keyItems && (
                      <div className="space-y-1 mb-2.5 text-xs">
                        {step.keyItems.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-200/60"
                          >
                            <span className="font-semibold text-gray-600 text-[11px]">
                              {item.label}
                            </span>
                            <span className="font-bold text-[#05434B] text-[11px]">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {step.checklist && (
                      <div className="bg-[#FAF9FF] rounded-xl p-2.5 border border-purple-100 space-y-1.5 text-xs font-medium text-gray-700 mb-2.5">
                        {step.checklist.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-[11px]">
                            <span>{item}</span>
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" />
                          </div>
                        ))}
                      </div>
                    )}

                    {step.metricNumber && (
                      <div className="bg-gradient-to-r from-[#eaf7f2] to-[#cbf2ea] p-2.5 rounded-xl border border-[#76D8C8]/60 mb-2.5 flex items-center justify-between">
                        <span className="text-xl font-black text-black">
                          {step.metricNumber}
                        </span>
                        <span className="text-[11px] font-bold text-[#05434B]">
                          {step.metricLabel}
                        </span>
                      </div>
                    )}

                    {/* Bottom Callout */}
                    <div className="bg-[#eaf7f2] rounded-lg py-1 px-2 text-center border border-[#76D8C8]/40 mb-2.5">
                      <p className="text-[10px] font-extrabold text-[#05434B] truncate">
                        {step.bottomCallout}
                      </p>
                    </div>

                    {/* Full-width CTA Button */}
                    <Link
                      href={step.ctaHref}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-[#00D2C4] hover:bg-[#76D8C8] text-[#05434B] text-xs font-black py-2.5 px-3 rounded-xl transition-colors shadow-2xs active:scale-98"
                    >
                      <span>{isDe && step.ctaTextDe ? step.ctaTextDe : step.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })()}

              {/* Mobile Stepper Navigation Footer: Prev / Dots / Next */}
              <div className="flex items-center justify-between pt-3 mt-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveMobileStep((prev) =>
                      prev > 0 ? prev - 1 : currentWorkflow.steps.length - 1
                    )
                  }
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-700 bg-white border border-gray-200 shadow-2xs hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>{isDe ? "Zurück" : "Prev"}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {currentWorkflow.steps.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveMobileStep(idx)}
                      aria-label={`Go to step ${idx + 1}`}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeMobileStep === idx
                          ? "w-6 bg-[#05434B]"
                          : "w-2 bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setActiveMobileStep((prev) =>
                      prev < currentWorkflow.steps.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-[#05434B] bg-[#81D8D0]/30 hover:bg-[#81D8D0]/50 border border-[#81D8D0]/40 shadow-2xs active:scale-95 transition-all cursor-pointer"
                >
                  <span>{isDe ? "Weiter" : "Next"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── 5. Full-Detail Step Inspection Modal (Mobile & Desktop) ── */}
      {selectedStep && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedStep(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-gray-200 relative text-gray-900"
          >
            <button
              type="button"
              onClick={() => setSelectedStep(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span
                className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${selectedStep.badgeColor}`}
              >
                {selectedStep.badge}
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                {selectedStep.statusPill}
              </span>
            </div>

            <h4 className="text-xl font-extrabold text-gray-950 mb-2">
              {selectedStep.focusTitle}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {selectedStep.focusSubtitle}
            </p>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-200/70 mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 shrink-0">
                <Image
                  src={selectedStep.avatarSrc}
                  alt={selectedStep.clientTitle}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-950">{selectedStep.clientTitle}</p>
                <p className="text-[11px] text-gray-500">{selectedStep.clientSubtitle}</p>
              </div>
            </div>

            {selectedStep.keyItems && (
              <div className="space-y-1.5 mb-4 text-xs">
                {selectedStep.keyItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200"
                  >
                    <span className="font-semibold text-gray-700">{item.label}</span>
                    <span className="font-bold text-[#05434B]">{item.value}</span>
                  </div>
                ))}
              </div>
            )}

            {selectedStep.checklist && (
              <div className="bg-[#FAF9FF] rounded-2xl p-3.5 border border-gray-200 space-y-2 text-xs font-medium text-gray-700 mb-4">
                {selectedStep.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span>{item}</span>
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  </div>
                ))}
              </div>
            )}

            {selectedStep.metricNumber && (
              <div className="bg-gradient-to-r from-[#eaf7f2] to-[#cbf2ea] p-3 rounded-2xl border border-[#76D8C8]/60 mb-4 flex items-center justify-between">
                <span className="text-2xl font-black text-black">
                  {selectedStep.metricNumber}
                </span>
                <span className="text-xs font-bold text-[#05434B]">
                  {selectedStep.metricLabel}
                </span>
              </div>
            )}

            <div className="pt-2">
              <Link
                href={selectedStep.ctaHref}
                onClick={() => setSelectedStep(null)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#00D2C4] hover:bg-[#76D8C8] text-[#05434B] text-sm font-extrabold py-3 px-4 rounded-2xl transition-all shadow-md active:scale-95"
              >
                <span>{isDe && selectedStep.ctaTextDe ? selectedStep.ctaTextDe : selectedStep.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
