export type BlogCategory =
  | "All"
  | "Talent Acquisition"
  | "Operational Excellence"
  | "Strategy"
  | "Inside Scaliify"
  | "Product";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: BlogCategory;
  coverType: "photo" | "pulse_green" | "pulse_orange" | "pulse_purple" | "power_lavender";
  imageUrl?: string;
  excerpt: string;
  readTime: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  "All",
  "Talent Acquisition",
  "Operational Excellence",
  "Strategy",
  "Inside Scaliify",
  "Product",
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "eu-pay-transparency-directive-guide",
    title: "The EU Pay Transparency Directive: What HR Managers and Scaliify Users Need to Know",
    date: "27. July 2026",
    category: "Operational Excellence",
    coverType: "photo",
    imageUrl: "/blog-1.jpg",
    excerpt: "How to audit your compensation structures, prepare salary bands, and comply with upcoming EU pay disclosure mandates.",
    readTime: "6 min read",
  },
  {
    id: "2",
    slug: "hr-trends-precision-hiring",
    title: "HR trends and what they mean: Precision hiring",
    date: "15. July 2026",
    category: "Strategy",
    coverType: "pulse_green",
    excerpt: "Why high-growth organizations are replacing volume recruitment with competency-based structured hiring rubrics.",
    readTime: "4 min read",
  },
  {
    id: "3",
    slug: "hr-trends-junior-talent-squeeze",
    title: "HR trends and what they mean: The junior talent squeeze",
    date: "2. July 2026",
    category: "Strategy",
    coverType: "pulse_orange",
    excerpt: "Navigating entry-level talent development and career progression frameworks in an AI-accelerated workplace.",
    readTime: "5 min read",
  },
  {
    id: "4",
    slug: "two-days-back-intelligent-hr",
    title: "Two days back every week: What the data says about intelligent HR",
    date: "2. July 2026",
    category: "Product",
    coverType: "power_lavender",
    excerpt: "Analyzing workflow automation benchmarks across 500+ European SMEs that modernized their HR tech stack.",
    readTime: "7 min read",
  },
  {
    id: "5",
    slug: "hr-trends-the-ai-job-title",
    title: "HR trends and what they mean: The AI job title",
    date: "17. June 2026",
    category: "Strategy",
    coverType: "pulse_purple",
    excerpt: "How emerging AI leadership roles are reshaping organizational charts and people operations responsibilities.",
    readTime: "5 min read",
  },
  {
    id: "6",
    slug: "best-bamboohr-alternatives-uk-eu",
    title: "Best BambooHR alternatives for UK & EU businesses: 5 HR platforms compared in 2026",
    date: "16. June 2026",
    category: "Talent Acquisition",
    coverType: "photo",
    imageUrl: "/blog-2.jpg",
    excerpt: "Comparing Personio, Factorial, Deel, Ashby, and Workmotion for European labor law, DATEV integration, and ATS capabilities.",
    readTime: "8 min read",
  },
];
