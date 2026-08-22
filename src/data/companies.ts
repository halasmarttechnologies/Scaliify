export interface Company {
  id: string;
  name: string;
  fullName: string;
  category?: string;
}

export const companies: Company[] = [
  {
    id: "softwareone",
    name: "SoftwareOne",
    fullName: "SoftwareOne",
    category: "Cloud & Software Services",
  },
  {
    id: "westbridge",
    name: "Westbridge Advisory",
    fullName: "Westbridge Advisory GmbH",
    category: "Real Estate & Energy Advisory",
  },
  {
    id: "krones",
    name: "Krones AG",
    fullName: "Krones AG",
    category: "Process & Packaging Technology",
  },
  {
    id: "symrise",
    name: "Symrise AG",
    fullName: "Symrise AG",
    category: "Taste, Nutrition & Health",
  },
  {
    id: "tiemeyer",
    name: "Tiemeyer Automobile",
    fullName: "Tiemeyer automobile GmbH & Co. KG",
    category: "Automotive Retail & Mobility",
  },
  {
    id: "tscnet",
    name: "TSCNET Services",
    fullName: "TSCNET Services GmbH",
    category: "European Power Grid Services",
  },
  {
    id: "takkt",
    name: "TAKKT Group AG",
    fullName: "TAKKT Group AG",
    category: "B2B Omnichannel Commerce",
  },
  {
    id: "think-cell",
    name: "think-cell",
    fullName: "think-cell GmbH",
    category: "Presentation & Productivity Software",
  },
  {
    id: "idnow",
    name: "ID Now GmbH",
    fullName: "ID Now GmbH",
    category: "Identity Verification & Trust",
  },
  {
    id: "trb-chemedica",
    name: "TRB Chemedica",
    fullName: "TRB Chemedica",
    category: "Pharmaceuticals & Biotechnology",
  },
  {
    id: "icig",
    name: "ICIG Business Services",
    fullName: "ICIG Business Services",
    category: "Industrial Chemical Holdings",
  },
  {
    id: "harrer",
    name: "Harrer Ingenieure",
    fullName: "Harrer Ingenieure GmbH",
    category: "Structural & Civil Engineering",
  },
  {
    id: "amsilk",
    name: "AMSilk GmbH",
    fullName: "AMSilk GmbH",
    category: "Smart Biotech Materials",
  },
  {
    id: "st-engineering",
    name: "ST Engineering",
    fullName: "ST Engineering Applied Solutions",
    category: "Applied Engineering & Defense",
  },
  {
    id: "armedangels",
    name: "ARMEDANGELS",
    fullName: "ARMEDANGELS",
    category: "Sustainable & Circular Fashion",
  },
];
