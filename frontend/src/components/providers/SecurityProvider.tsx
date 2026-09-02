"use client";

import { useEffect } from "react";

/**
 * Disables the React DevTools browser extension in production.
 *
 * In development this is a no-op so DevTools continue to work normally.
 * In production this blocks the extension from inspecting component trees,
 * props, state, and hooks — preventing reverse-engineering of the UI logic.
 */
export function SecurityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    // Disable React DevTools if the extension is installed
    if (typeof window !== "undefined") {
      const noop = () => undefined;
      const noopObj = { ...Object.fromEntries(Object.keys(Object).map((k) => [k, noop])) };

      // The extension hooks into __REACT_DEVTOOLS_GLOBAL_HOOK__
      if ((window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        const hook = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;
        // Disable all listeners
        hook.inject = noop;
        hook.onCommitFiberRoot = noop;
        hook.onCommitFiberUnmount = noop;
        hook.onPostCommitFiberRoot = noop;
        hook._renderers = {};
        hook.supportsFiber = false;
      }
    }
  }, []);

  return <>{children}</>;
}
