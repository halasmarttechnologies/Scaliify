import type { NextConfig } from "next";

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
      script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""};
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com data:;
      img-src 'self' data: https: blob:;
      connect-src 'self' ${process.env.NODE_ENV === "development" ? "http://localhost:5000 http://127.0.0.1:5000 " : ""}https://api.scaliify.com;
      frame-ancestors 'none';
      form-action 'self';
      base-uri 'self';
    `
      .replace(/\s{2,}/g, " ")
      .trim(),
  },
];

const nextConfig: NextConfig = {
  transpilePackages: ["@scaliify/shared"],
  poweredByHeader: false,
  images: {},
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
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

export default nextConfig;
