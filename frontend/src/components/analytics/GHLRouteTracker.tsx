"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Tracks route changes in Next.js SPA navigation for GoHighLevel (msgsndr) external tracking.
 * The external-tracking.js script natively tracks the initial page load.
 * This component ensures subsequent client-side page transitions are also recorded.
 */
export function GHLRouteTracker() {
  const pathname = usePathname();
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip initial mount because external-tracking.js handles the initial page load event
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (typeof window !== "undefined") {
      const ghl = (window as any)._lcTracking;
      if (ghl?.tracker?.sendEvent) {
        try {
          ghl.tracker.sendEvent({
            type: "external_script_page_view",
            timestamp: Date.now(),
            title: document.title,
            url: window.location.href,
            path: window.location.pathname,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
          });
        } catch {
          // Silent fallback if tracking fails
        }
      }
    }
  }, [pathname]);

  return null;
}
