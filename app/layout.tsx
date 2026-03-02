import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navigation from "@/components/layout/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ABA Parent Guidance",
  description: "Evidence-based ABA strategies and tools for parents",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Navigation />

          <main className="min-h-screen">
            {children}
          </main>

          <footer className="bg-warm-surface dark:bg-dark-surface border-t border-warm-border dark:border-dark-border mt-12 no-print transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="bg-warm-subtle dark:bg-dark-card border-l-4 border-primary p-4 rounded transition-colors">
                <p className="text-sm text-textDark dark:text-dark-text-secondary">
                  <strong>Disclaimer:</strong> This app provides general educational guidance based on Applied Behavior Analysis (ABA) principles.
                  It is not a substitute for professional evaluation, diagnosis, or treatment by a Board Certified Behavior Analyst (BCBA)
                  or other licensed professional. Always consult with qualified professionals for your child's specific needs.
                </p>
              </div>
              <p className="text-center text-gray-600 dark:text-dark-text-muted text-sm mt-4">
                © {new Date().getFullYear()} ABA Parent Guidance. All rights reserved.
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
