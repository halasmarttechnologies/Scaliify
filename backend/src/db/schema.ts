import { pgTable, text, timestamp, integer, boolean, jsonb, uuid, index } from "drizzle-orm/pg-core";

/**
 * HR Tools Catalog Table
 */
export const tools = pgTable(
  "tools",
  {
    id: text("id").primaryKey(), // e.g. 'personio', 'deel', 'greenhouse'
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    category: text("category").notNull(), // 'hris', 'recruiting', 'performance', 'payroll_eor', 'time_tracking', 'other'
    categoryLabel: text("category_label").notNull(),
    shortDescription: text("short_description").notNull(),
    fullDescription: text("full_description"),
    websiteUrl: text("website_url").notNull(),
    logoUrl: text("logo_url"),
    minTeamSize: integer("min_team_size").default(1),
    maxTeamSize: integer("max_team_size").default(10000),
    badge: text("badge"), // e.g. 'Best for DACH SMEs', 'Global EOR Leader'
    pricingTier: text("pricing_tier").default("growth"), // 'starter', 'growth', 'enterprise', 'custom'
    regions: text("regions").array().notNull(), // ['region_dach', 'region_uk_europe', ...]
    features: text("features").array().notNull(), // ['core_onboarding', 'int_datev', ...]
    integrations: text("integrations").array().notNull(), // ['int_datev', 'int_slack_teams', ...]
    strengths: text("strengths").array(),
    limitations: text("limitations").array(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("tools_category_idx").on(table.category),
    index("tools_is_active_idx").on(table.isActive),
  ]
);

/**
 * Leads & Assessment Contacts Table
 */
export const leads = pgTable(
  "leads",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    companyName: text("company_name").notNull(),
    jobTitle: text("job_title").notNull(),
    phone: text("phone"),
    companySize: text("company_size"),
    source: text("source").default("tool_finder").notNull(),
    status: text("status").default("new").notNull(), // 'new', 'contacted', 'qualified', 'closed'
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("leads_email_idx").on(table.email),
    index("leads_created_at_idx").on(table.createdAt),
  ]
);

/**
 * Tool Finder Submissions & Assessment Results Table
 */
export const toolFinderSubmissions = pgTable(
  "tool_finder_submissions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    leadId: uuid("lead_id").references(() => leads.id, { onDelete: "cascade" }),
    answers: jsonb("answers").notNull(), // Full JSON user choices
    topRecommendations: jsonb("top_recommendations").notNull(), // Ranked scored tools output
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("submissions_lead_id_idx").on(table.leadId),
    index("submissions_created_at_idx").on(table.createdAt),
  ]
);

export type Tool = typeof tools.$inferSelect;
export type NewTool = typeof tools.$inferInsert;
export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type ToolFinderSubmission = typeof toolFinderSubmissions.$inferSelect;
export type NewToolFinderSubmission = typeof toolFinderSubmissions.$inferInsert;
