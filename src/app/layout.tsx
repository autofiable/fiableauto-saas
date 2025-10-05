// src/app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "FiableAuto — Dashboard",
  description: "SaaS FiableAuto (démo)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <header className="container">
          <nav className="nav">
            {/* Utiliser Link pour toute navigation interne */}
            <Link href="/" className="brand">
              FiableAuto
            </Link>
            <div className="nav-right">
              <Link href="/" className="nav-link">Tableau de bord</Link>
              {/* Ajoute d’autres liens internes ici avec <Link href="/chemin"> */}
            </div>
          </nav>
        </header>

        <main className="container">{children}</main>
      </body>
    </html>
  );
}
