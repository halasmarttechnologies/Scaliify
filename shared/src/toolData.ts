export interface ToolData {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryLabel: string;
  shortDescription: string;
  fullDescription?: string | null;
  websiteUrl: string;
  logoUrl?: string | null;
  minTeamSize?: number | null;
  maxTeamSize?: number | null;
  badge?: string | null;
  pricingTier?: string | null;
  regions: string[];
  features: string[];
  integrations: string[];
  strengths?: string[] | null;
  limitations?: string[] | null;
  isActive: boolean;
}
