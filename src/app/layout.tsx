/* eslint-disable @next/next/no-html-link-for-pages */
// src/app/layout.tsx

import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "FiableAuto – Tableau de bord",
  description: "SaaS FiableAuto (démo)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <header className="container mx-auto py-4">
          <nav className="flex justify-between items-center">
            <div className="text-xl font-bold text-blue-700">
              FiableAuto
            </div>
            <div className="space-x-4">
              {/* Liens internes convertis en Link */}
              <Link href="/">Accueil</Link>
              <Link href="/missions">Missions</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </nav>
        </header>

        <main className="container mx-auto p-6">{children}</main>

        <footer className="text-center text-gray-500 text-sm py-4">
          © {new Date().getFullYear()} FiableAuto. Tous droits réservés.
        </footer>
      </body>
    </html>
  );
}
