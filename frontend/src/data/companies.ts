export interface Company {
  id: string;
  name: string;
  logoUrl: string;
  fullName?: string;
  category?: string;
}

export const companies: Company[] = [
  {
    id: "1",
    name: "SoftwareONE",
    logoUrl: "/companies/logo-1.png",
  },
  {
    id: "2",
    name: "KRONES",
    logoUrl: "/companies/logo-2.png",
  },
  {
    id: "3",
    name: "Westbridge",
    logoUrl: "/companies/logo-3.png",
  },
  {
    id: "4",
    name: "Symrise",
    logoUrl: "/companies/logo-4.png",
  },
  {
    id: "6",
    name: "TSCNET Services",
    logoUrl: "/companies/logo-6.png",
  },
  {
    id: "7",
    name: "think-cell",
    logoUrl: "/companies/logo-7.png",
  },
  {
    id: "8",
    name: "TRB",
    logoUrl: "/companies/logo-8.png",
  },
  {
    id: "10",
    name: "Harrer Ingenieure",
    logoUrl: "/companies/logo-10.png",
  },
  {
    id: "13",
    name: "ARMEDANGELS",
    logoUrl: "/companies/logo-13.png",
  },
  {
    id: "14",
    name: "IDnow",
    logoUrl: "/companies/logo-14.png",
  },
];
