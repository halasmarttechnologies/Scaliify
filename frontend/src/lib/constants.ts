export const ROUTES = {
  home: "/",
  toolFinder: "/tool-finder",
  contact: "/contact",
  letsTalk: "/lets-talk",
  blog: "/blog",
  hrItSelection: "/services/hr-it-selection",
} as const;

export const COMPANY_ROTATION_INTERVAL_MS = 1800;

export interface RotatingCompany {
  name: string;
  type: "text" | "logo";
  id?: string;
  className?: string;
}

export const ROTATING_COMPANIES: RotatingCompany[] = [
  { name: "SoftwareOne", type: "logo", id: "softwareone" },
  { name: "Westbridge", type: "logo", id: "westbridge" },
  { name: "think-cell", type: "logo", id: "think-cell" },
  { name: "KRONES AG", type: "logo", id: "krones" },
  { name: "Symrise", type: "logo", id: "symrise" },
  { name: "IDnow", type: "logo", id: "idnow" },
  { name: "TSCNET Services", type: "logo", id: "tscnet" },
  { name: "TIEMEYER", type: "logo", id: "tiemeyer" },
  { name: "ARMEDANGELS", type: "logo", id: "armedangels" },
  { name: "Harrer Ingenieure", type: "logo", id: "harrer" },
];
