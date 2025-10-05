"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Inspection = {
  id: string;
  user_id: string | null;
  contractor_name: string;
  date: string | null;
  time: string | null;
  departure_location: string | null;
  arrival_location: string | null;
  client: string | null;
  signature: string | null;
  status: "draft" | "completed" | "sent";
  created_at: string | null;
  updated_at: string | null;
  mission_id: string | null;
  invite_code: string | null;
};

export default function HomePage() {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [loading, setLoading] = useState(true);

  // petit état pour le formulaire
  const [contractor, setContractor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [invite, setInvite] = useState("DEMO123");

  async function fetchInspections() {
    setLoading(true);
    const { data, error } = await supabase
      .from("inspections")
      .select("*")
      .eq("invite_code", invite)       // ==> filtre sur le code
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erreur Supabase:", error.message);
      setInspections([]);
    } else {
      setInspections(data || []);
    }
    setLoading(false);
  }

  useEffect(() => { fetchInspections(); /* au premier rendu */ }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      contractor_name: contractor || "Sans nom",
      date: date || null,
      time: time || null,
      invite_code: invite || "DEMO123",
      status: "draft" as const,
    };

    const { error } = await supabase.from("inspections").insert([payload]);
    if (error) {
      alert("Erreur à l'ajout: " + error.message);
      return;
    }
    // reset + refresh
    setContractor(""); setDate(""); setTime("");
    await fetchInspections();
  }

  return (
    <div style={{display:"grid", gap:18}}>
      {/* Bloc Filtres + Formulaire ajout */}
      <section className="card">
        <div className="card-header">
          <div>
            <div style={{fontWeight:800, letterSpacing:.3}}>Créer une inspection</div>
            <div className="kbd">Saisie rapide</div>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={handleCreate} style={{display:"grid", gap:12}}>
            <div className="row-3">
              <div>
                <label className="kbd">Nom du prestataire</label>
                <input className="input" value={contractor} onChange={e=>setContractor(e.target.value)} placeholder="ex: ESC / TEST" />
              </div>
              <div>
                <label className="kbd">Date</label>
                <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} />
              </div>
              <div>
                <label className="kbd">Heure</label>
                <input className="input" type="time" value={time} onChange={e=>setTime(e.target.value)} />
              </div>
            </div>

            <div className="row">
              <div>
                <label className="kbd">Code d’invitation (filtre)</label>
                <input className="input" value={invite} onChange={e=>setInvite(e.target.value)} placeholder="DEMO123" />
              </div>
              <div style={{display:"flex", alignItems:"end", gap:8}}>
                <button type="button" className="btn secondary" onClick={fetchInspections}>Actualiser la liste</button>
                <button className="btn">Créer l’inspection</button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Bloc Liste */}
      <section className="card">
        <div className="card-header">
          <div style={{fontWeight:800, letterSpacing:.3}}>Liste des inspections</div>
          <div className="kbd">{loading ? "Chargement..." : `${inspections.length} élément(s)`}</div>
        </div>

        <div className="card-body" style={{padding:0}}>
          <table className="table">
            <thead>
              <tr>
                <th style={{width:210}}>ID</th>
                <th>Nom du prestataire</th>
                <th>Date</th>
                <th>Heure</th>
                <th>Code</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {!loading && inspections.length === 0 && (
                <tr><td colSpan={6} style={{padding:20, color:"var(--muted)"}}>Aucune inspection trouvée pour ce code.</td></tr>
              )}

              {inspections.map((item)=>(
                <tr key={item.id}>
                  <td><span className="kbd">{item.id.slice(0,8)}…</span></td>
                  <td style={{textTransform:"none"}}>{item.contractor_name}</td>
                  <td>{item.date ?? "-"}</td>
                  <td>{item.time ?? "-"}</td>
                  <td><span className="kbd">{item.invite_code ?? "-"}</span></td>
                  <td>
                    <span className="kbd" style={{color: item.status === "completed" ? "var(--success)" : item.status === "sent" ? "var(--brand)" : "var(--muted)"}}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}


