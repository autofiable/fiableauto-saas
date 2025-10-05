export const metadata = {
  title: "FiableAuto — Dashboard",
  description: "Gestion des inspections (Prototype SaaS by Sylvain)",
};

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <header className="appbar">
          <div className="appbar-inner container">
            <a className="brand" href="/">
              <div className="logo" />
              <div>
                <div className="title">FiableAuto</div>
                <div className="kbd">Dashboard</div>
              </div>
            </a>

            <div style={{display:"flex", gap:8}}>
              <a className="btn ghost" href="/">Tableau de bord</a>
              {/* plus tard: /inspections, /missions, /parametres */}
            </div>
          </div>
        </header>

        <main className="container" style={{paddingTop:20}}>
          {children}
        </main>
      </body>
    </html>
  );
}
