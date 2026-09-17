import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const isProd = process.env.NODE_ENV === "production";

// ─────────────────────────────────────────────────────────────
// Security HTTP Headers
// ─────────────────────────────────────────────────────────────

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' https://link.msgsndr.com${!isProd ? " 'unsafe-eval'" : ""};
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com data:;
      img-src 'self' data: https: blob:;
      connect-src 'self' ${!isProd ? "http://localhost:5000 http://127.0.0.1:5000 " : ""}https://api.scaliify.com https://backend.leadconnectorhq.com https://staging.backend.leadconnectorhq.com https://services.leadconnectorhq.com https://link.msgsndr.com;
      frame-src 'self' https://link.msgsndr.com https://*.leadconnectorhq.com;
      frame-ancestors 'none';
      form-action 'self';
      base-uri 'self';
    `
      .replace(/\s{2,}/g, " ")
      .trim(),
  },
];

// ─────────────────────────────────────────────────────────────
// Next.js Config
// ─────────────────────────────────────────────────────────────

const nextConfig: NextConfig = {
  transpilePackages: ["@scaliify/shared"],

  // Never expose the framework version header
  poweredByHeader: false,

  // ── Source Map Protection ──────────────────────────────────
  // Disabling source maps in production prevents anyone from
  // reading your original source code via DevTools > Sources.
  // Minified/mangled output is all they will see.
  productionBrowserSourceMaps: false,

  // ── Compiler Options ──────────────────────────────────────
  compiler: {
    // Remove all console.* calls from production builds
    // so internal logs never appear in the browser console
    removeConsole: isProd
      ? { exclude: ["error"] } // keep console.error for runtime errors only
      : false,

    // Mangle React component display names in production
    // (they show in React DevTools; this makes them unreadable)
    reactRemoveProperties: isProd
      ? { properties: ["^data-testid$"] }
      : false,
  },

  // ── Image Security ────────────────────────────────────────
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.scaliify.com" },
    ],
  },

  // ── Security Headers ──────────────────────────────────────
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  // ── Redirects ─────────────────────────────────────────────
  async redirects() {
    return [
      {
        source: "/insights/blog",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/insights/blog/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/services/hr-it-implementation",
        destination: "/services/implementation-optimisation",
        permanent: true,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
