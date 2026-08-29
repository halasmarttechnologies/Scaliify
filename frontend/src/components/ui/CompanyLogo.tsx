import React from "react";

export const CompanyLogo = React.memo(function CompanyLogo({ id, className = "w-5 h-5 flex-shrink-0" }: { id: string; className?: string }) {
  switch (id) {
    case "softwareone":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#6366F1" fillOpacity="0.15" stroke="#4F46E5" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 2v20M3 7l9 5 9-5" stroke="#4F46E5" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "westbridge":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 17C6 11 10 7 12 7s6 4 9 10" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          <path d="M7 17C9 13 11 11 12 11s3 2 5 6" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="5" r="1.5" fill="#059669" />
        </svg>
      );
    case "krones":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="12" r="6" stroke="#2563EB" strokeWidth="1.8" />
          <circle cx="15" cy="12" r="6" stroke="#1D4ED8" strokeWidth="1.8" strokeDasharray="3 2" />
          <circle cx="12" cy="12" r="2" fill="#2563EB" />
        </svg>
      );
    case "symrise":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3C8.5 7.5 5 11.5 5 15a7 7 0 0014 0c0-3.5-3.5-7.5-7-12z" fill="#F43F5E" fillOpacity="0.2" stroke="#E11D48" strokeWidth="1.5" />
          <path d="M12 8c-2 2.5-4 4.8-4 7a4 4 0 008 0c0-2.2-2-4.5-4-7z" fill="#E11D48" />
        </svg>
      );
    case "tiemeyer":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="12" rx="3" stroke="#DC2626" strokeWidth="1.6" />
          <path d="M7 10h10M12 10v6" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "tscnet":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8" fill="#0891B2" fillOpacity="0.15" />
          <path d="M13 3L6 14h5l-1 7 7-11h-5l1-7z" fill="#0891B2" />
        </svg>
      );
    case "takkt":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="7" height="7" rx="1.5" fill="#4F46E5" />
          <rect x="13" y="4" width="7" height="7" rx="1.5" fill="#818CF8" />
          <rect x="4" y="13" width="7" height="7" rx="1.5" fill="#818CF8" />
          <rect x="13" y="13" width="7" height="7" rx="1.5" fill="#4F46E5" />
        </svg>
      );
    case "think-cell":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="12" width="3.5" height="8" rx="1" fill="#0D9488" />
          <rect x="10.25" y="8" width="3.5" height="12" rx="1" fill="#14B8A6" />
          <rect x="16.5" y="4" width="3.5" height="16" rx="1" fill="#2DD4BF" />
        </svg>
      );
    case "idnow":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3l7 3.5v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10v-5L12 3z" fill="#7C3AED" fillOpacity="0.15" stroke="#7C3AED" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M9.5 12l2 2 3.5-3.5" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "trb-chemedica":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="#0284C7" strokeWidth="1.5" />
          <path d="M12 7v10M7 12h10" stroke="#0284C7" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "icig":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4l6 3.5v7L12 18l-6-3.5v-7L12 4z" stroke="#334155" strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="12" cy="11" r="2.5" fill="#334155" />
        </svg>
      );
    case "harrer":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 19L12 5l8 14H4z" stroke="#D97706" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M8 15h8M12 9v6" stroke="#D97706" strokeWidth="1.4" />
        </svg>
      );
    case "amsilk":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 18C8 12 10 6 12 6s4 6 6 12" stroke="#C026D3" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M8 14c2-3 3-5 4-5s2 2 4 5" stroke="#E879F9" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="18" r="1.5" fill="#C026D3" />
        </svg>
      );
    case "st-engineering":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 14l8-9 8 9-8 4-8-4z" fill="#1E40AF" fillOpacity="0.15" stroke="#1E40AF" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 5v13M7 12l5 2 5-2" stroke="#1E40AF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "armedangels":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4c-3 3-7 5-9 6 3 2 6 3 9 3s6-1 9-3c-2-1-6-3-9-6z" fill="#18181B" />
          <circle cx="12" cy="17" r="2" fill="#18181B" />
        </svg>
      );
    default:
      return (
        <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-gray-700">
          •
        </div>
      );
  }
});
