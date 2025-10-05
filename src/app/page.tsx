"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [status, setStatus] = useState("Chargement...");

  // useEffect corrigé (dépendances explicites)
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("Bienvenue sur FiableAuto 🚗");
    }, 1000);

    return () => clearTimeout(timer);
  }, []); // <- dépendances vides = pas de warning ESLint

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        FiableAuto – Application SaaS
      </h1>
      <p className="text-gray-600 mb-8">{status}</p>

      <div className="space-x-4">
        <a
          href="/missions"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Voir les missions
        </a>
        <a
          href="/contact"
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          Nous contacter
        </a>
      </div>
    </div>
  );
}


