import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-md no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-xl font-bold text-primary">
                ABA Parent Guidance
              </Link>
              <div className="flex gap-4 sm:gap-6">
                <Link href="/assessment" className="text-textDark hover:text-primary transition-colors font-medium">
                  Assessment
                </Link>
                <Link href="/goals" className="text-textDark hover:text-primary transition-colors font-medium">
                  Goals
                </Link>
                <Link href="/prompts" className="text-textDark hover:text-primary transition-colors font-medium">
                  Prompts
                </Link>
                <Link href="/bip" className="text-textDark hover:text-primary transition-colors font-medium">
                  BIP
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="bg-white border-t border-gray-200 mt-12 no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-blue-50 border-l-4 border-primary p-4 rounded">
              <p className="text-sm text-textDark">
                <strong>Disclaimer:</strong> This app provides general educational guidance based on Applied Behavior Analysis (ABA) principles.
                It is not a substitute for professional evaluation, diagnosis, or treatment by a Board Certified Behavior Analyst (BCBA)
                or other licensed professional. Always consult with qualified professionals for your child's specific needs.
              </p>
            </div>
            <p className="text-center text-gray-600 text-sm mt-4">
              © {new Date().getFullYear()} ABA Parent Guidance. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
