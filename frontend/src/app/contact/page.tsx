import { Metadata } from "next";
import { ContactPageClient } from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us | Scaliify",
  description: "Get in touch with Scaliify's HR tech and People Ops advisory experts. Schedule a demo or request custom stack guidance.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
