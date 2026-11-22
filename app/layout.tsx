import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BharatFix AI | Smarter Civic Issue Reporting",
  description: "Report civic issues, group duplicates and prioritize local action with BharatFix AI."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
