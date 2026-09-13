export const ROUTES = {
  home: "/",
  toolFinder: "/tool-finder",
  contact: "/contact",
  letsTalk: "/lets-talk",
  blog: "/blog",
  hrItSelection: "/services/hr-it-selection",
} as const;

export const COMPANY_ROTATION_INTERVAL_MS = 1000;

export interface RotatingCompany {
  name: string;
  type: "text" | "logo" | "orderbird" | "spendesk";
  id?: string;
  className?: string;
}

export const ROTATING_COMPANIES: RotatingCompany[] = [
  { name: "LUSH", type: "text", className: "font-black tracking-tight text-white text-xs sm:text-sm" },
  { name: "SoftwareOne", type: "logo", id: "softwareone" },
  { name: "orderbird", type: "orderbird" },
  { name: "Westbridge", type: "logo", id: "westbridge" },
  { name: "statista", type: "text", className: "font-bold tracking-tight text-white text-xs sm:text-sm lowercase" },
  { name: "KRONES AG", type: "logo", id: "krones" },
  { name: "symrise", type: "logo", id: "symrise" },
  { name: "TIEMEYER", type: "logo", id: "tiemeyer" },
];
