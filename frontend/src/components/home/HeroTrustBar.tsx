import { CompanyLogo } from "@/components/ui/CompanyLogo";

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

const COMPANIES = [
  { id: "softwareone", name: "SoftwareOne", colSpan: false },
  { id: "westbridge",  name: "Westbridge",  colSpan: false },
  { id: "krones",      name: "KRONES AG",   colSpan: false },
  { id: "symrise",     name: "symrise",     colSpan: false },
  { id: "tiemeyer",    name: "TIEMEYER",    colSpan: true  },
] as const;

type CompanyId = (typeof COMPANIES)[number]["id"];

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export function HeroTrustBar() {
  return (
    <div className="mt-14 sm:mt-16 w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 pt-8 border-t border-white/10 text-center items-center justify-items-center">
      {COMPANIES.map(({ id, name, colSpan }) => (
        <div
          key={id}
          className={colSpan ? "flex items-center justify-center col-span-2 sm:col-span-1" : "flex items-center justify-center"}
        >
          <div className="flex items-center gap-2.5 opacity-90 hover:opacity-100 transition-opacity">
            <CompanyLogo id={id} className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="font-bold text-base sm:text-lg tracking-tight text-white">{name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
