import { useState, useEffect, useCallback } from “react”;

// ─── STORAGE KEYS ────────────────────────────────────────────
const STORAGE_KEY = “grupos-mae-estreia”;

// ─── DEFAULT GROUPS ──────────────────────────────────────────
const DEFAULT_GROUPS = [
{
id: 1,
name: “Grupo 01 – Ofertas Bebê”,
link: “https://chat.whatsapp.com/SEU_CODIGO_01”,
active: true,
members: 0,
createdAt: new Date().toISOString(),
},
];

// ─── ICONS ───────────────────────────────────────────────────
const WaIcon = () => (
<svg viewBox=“0 0 32 32” fill=“currentColor” style={{ width: 18, height: 18 }}>
<path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.502L4 29l7.697-1.805A11.94 11.94 0 0 0 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm-3.09 7c-.21 0-.553.079-.843.394-.29.315-1.107 1.08-1.107 2.633s1.133 3.055 1.29 3.266c.158.21 2.194 3.348 5.395 4.563.754.326 1.342.52 1.8.667.757.24 1.446.207 1.99.126.607-.09 1.87-.764 2.133-1.502.263-.738.263-1.37.184-1.502-.079-.132-.29-.21-.605-.368-.315-.158-1.869-.922-2.159-1.027-.29-.105-.5-.158-.71.158-.21.315-.812 1.027-.996 1.237-.184.21-.368.236-.683.079-.315-.158-1.33-.49-2.535-1.563-.937-.835-1.57-1.867-1.754-2.182-.184-.315-.02-.486.138-.643.143-.142.315-.368.473-.552.158-.184.21-.315.315-.526.105-.21.052-.394-.026-.552-.08-.158-.71-1.71-.974-2.34-.254-.607-.514-.52-.71-.527-.184-.007-.394-.01-.605-.01z" />
</svg>
);

// ─── REDIRECT PAGE ────────────────────────────────────────────
function RedirectPage({ groups, onBack }) {
const [count, setCount] = useState(4);
const [redirected, setRedirected] = useState(false);

const activeGroups = groups.filter((g) => g.active);

const getTarget = useCallback(() => {
if (activeGroups.length === 0) return null;
// Round-robin: pick based on timestamp mod
const idx = Math.floor(Date.now() / 1000) % activeGroups.length;
return activeGroups[idx];
}, [activeGroups]);

const doRedirect = useCallback(() => {
const target = getTarget();
if (target) {
setRedirected(true);
setTimeout(() => {
window.open(target.link, “_blank”);
}, 300);
}
}, [getTarget]);

useEffect(() => {
if (activeGroups.length === 0) return;
const timer = setInterval(() => {
setCount((c) => {
if (c <= 1) {
clearInterval(timer);
doRedirect();
return 0;
}
return c - 1;
});
}, 1000);
return () => clearInterval(timer);
}, [doRedirect, activeGroups.length]);

const target = getTarget();

return (
<div style={{
minHeight: “100vh”, display: “flex”, alignItems: “center”, justifyContent: “center”,
background: “linear-gradient(135deg, #FFF5EE 0%, #FFE8D6 100%)”,
fontFamily: “‘DM Sans’, sans-serif”, position: “relative”, overflow: “hidden”,
padding: “20px”,
}}>
{/* Blobs */}
<div style={{ position: “fixed”, width: 400, height: 400, borderRadius: “50%”, background: “#E8714A”, opacity: 0.12, filter: “blur(80px)”, top: -150, right: -100, pointerEvents: “none” }} />
<div style={{ position: “fixed”, width: 300, height: 300, borderRadius: “50%”, background: “#f7c59f”, opacity: 0.18, filter: “blur(70px)”, bottom: -80, left: -60, pointerEvents: “none” }} />

```
  <div style={{
    background: "#FFFAF6", borderRadius: 28, padding: "40px 32px 32px",
    width: "min(420px, 100%)", textAlign: "center",
    boxShadow: "0 20px 60px rgba(92,42,14,0.13), 0 0 0 1.5px rgba(232,113,74,0.18)",
    position: "relative",
  }}>
    {/* Admin back button */}
    <button onClick={onBack} style={{
      position: "absolute", top: 14, right: 14,
      background: "rgba(92,42,14,0.07)", border: "none", borderRadius: 8,
      padding: "4px 10px", fontSize: 11, color: "#9E7060", cursor: "pointer", fontWeight: 600,
    }}>⚙️ Admin</button>

    {/* Logo placeholder */}
    <div style={{
      width: 90, height: 90, borderRadius: "50%", margin: "0 auto 18px",
      background: "linear-gradient(135deg, #C8552F, #F5956E)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 38, boxShadow: "0 6px 24px rgba(232,113,74,0.4)",
      animation: "float 3s ease-in-out infinite",
    }}>🍼</div>

    <h1 style={{ fontFamily: "Nunito, sans-serif", fontSize: "1.45rem", fontWeight: 900, color: "#5C2A0E", marginBottom: 6 }}>
      Mãe em Estreia <span style={{ color: "#E8714A" }}>Ofertinhas</span> 🍼
    </h1>
    <p style={{ fontSize: "0.88rem", color: "#9E7060", marginBottom: 18, fontWeight: 500 }}>
      Grupo exclusivo de ofertas para mamães
    </p>

    <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(232,113,74,0.25), transparent)", marginBottom: 18 }} />

    <div style={{
      background: "rgba(232,113,74,0.06)", border: "1px solid rgba(232,113,74,0.14)",
      borderRadius: 14, padding: "14px 16px", marginBottom: 20,
      fontSize: "0.87rem", lineHeight: 1.65, color: "#3D1F0A", textAlign: "left",
    }}>
      <p>💛 O grupo <strong>Mãe em Estreia Ofertinhas</strong> reúne as melhores promoções para grávidas e mamães de primeira viagem!</p>
      <p style={{ marginTop: 6 }}>🛍️ Ofertas diárias de <strong>enxoval, brinquedos e acessórios</strong> de bebê.</p>
    </div>

    {/* Marketplace badges */}
    <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#9E7060", marginBottom: 10, fontWeight: 600 }}>Ofertas de</div>
    <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
      {["Magalu", "Mercado Livre", "Shopee", "Amazon"].map((m) => (
        <span key={m} style={{
          background: "#FFFAF6", border: "1.5px solid rgba(92,42,14,0.1)", borderRadius: 10,
          padding: "6px 10px", fontSize: "0.73rem", fontWeight: 600, color: "#5C2A0E",
          boxShadow: "0 2px 8px rgba(92,42,14,0.06)",
        }}>{m}</span>
      ))}
    </div>

    {activeGroups.length === 0 ? (
      <div style={{ padding: "20px", background: "rgba(232,113,74,0.08)", borderRadius: 12, color: "#C8552F", fontSize: "0.9rem", fontWeight: 600 }}>
        😕 Nenhum grupo ativo no momento.<br />
        <span style={{ fontSize: "0.8rem", fontWeight: 400, color: "#9E7060" }}>Volte mais tarde!</span>
      </div>
    ) : (
      <>
        {/* Countdown */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#9E7060", marginBottom: 8, fontWeight: 600 }}>
            Entrando automaticamente em
          </div>
          <div style={{ height: 5, background: "rgba(92,42,14,0.08)", borderRadius: 99, overflow: "hidden", marginBottom: 8 }}>
            <div style={{
              height: "100%", background: "linear-gradient(90deg, #C8552F, #F5956E)",
              borderRadius: 99, transformOrigin: "left",
              animation: "drain 4s linear forwards",
            }} />
          </div>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "1.9rem", fontWeight: 900, color: "#E8714A" }}>
            {count > 0 ? count : "✓"}
          </div>
        </div>

        <button
          onClick={doRedirect}
          style={{
            width: "100%", padding: "16px 24px",
            background: "linear-gradient(135deg, #128C7E, #25D366)",
            color: "#fff", border: "none", borderRadius: 16, cursor: "pointer",
            fontSize: "1rem", fontWeight: 700, display: "flex", alignItems: "center",
            justifyContent: "center", gap: 10,
            boxShadow: "0 6px 24px rgba(37,211,102,0.35)",
            transition: "transform 0.15s, filter 0.15s",
            fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseOver={(e) => { e.currentTarget.style.filter = "brightness(1.07)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseOut={(e) => { e.currentTarget.style.filter = "brightness(1)"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <WaIcon /> Quero entrar no grupo! 🍼
        </button>

        {redirected && (
          <p style={{ marginTop: 12, fontSize: "0.83rem", color: "#128C7E", fontWeight: 600 }}>
            ✅ Abrindo o WhatsApp... Confirme sua entrada!
          </p>
        )}
      </>
    )}

    <div style={{ marginTop: 16, fontSize: "0.72rem", color: "#9E7060", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%", background: "#25D366",
        display: "inline-block", animation: "pulse 1.5s ease-in-out infinite",
      }} />
      Link seguro e verificado
    </div>
  </div>

  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
    @keyframes drain { from{transform:scaleX(1)} to{transform:scaleX(0)} }
    @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.4)} 50%{box-shadow:0 0 0 5px rgba(37,211,102,0)} }
  `}</style>
</div>
```

);
}

// ─── ADMIN PANEL ──────────────────────────────────────────────
function AdminPanel({ groups, setGroups, onPreview }) {
const [showForm, setShowForm] = useState(false);
const [editId, setEditId] = useState(null);
const [form, setForm] = useState({ name: “”, link: “” });
const [saving, setSaving] = useState(false);
const [toast, setToast] = useState(null);

const showToast = (msg, type = “success”) => {
setToast({ msg, type });
setTimeout(() => setToast(null), 2500);
};

const saveGroups = async (updated) => {
setSaving(true);
try {
await window.storage.set(STORAGE_KEY, JSON.stringify(updated), false);
} catch (e) {
console.error(e);
}
setSaving(false);
};

const toggleActive = (id) => {
const updated = groups.map((g) => g.id === id ? { …g, active: !g.active } : g);
setGroups(updated);
saveGroups(updated);
const g = updated.find((g) => g.id === id);
showToast(g.active ? `✅ "${g.name}" ativado!` : `⏸️ "${g.name}" pausado!`);
};

const deleteGroup = (id) => {
const g = groups.find((g) => g.id === id);
if (!confirm(`Remover "${g.name}"?`)) return;
const updated = groups.filter((g) => g.id !== id);
setGroups(updated);
saveGroups(updated);
showToast(`🗑️ "${g.name}" removido!`, “error”);
};

const openForm = (group = null) => {
if (group) {
setEditId(group.id);
setForm({ name: group.name, link: group.link });
} else {
setEditId(null);
setForm({ name: “”, link: “” });
}
setShowForm(true);
};

const saveForm = () => {
if (!form.name.trim() || !form.link.trim()) {
showToast(“⚠️ Preencha nome e link!”, “error”);
return;
}
let updated;
if (editId) {
updated = groups.map((g) => g.id === editId ? { …g, name: form.name, link: form.link } : g);
showToast(“✏️ Grupo atualizado!”);
} else {
const newGroup = {
id: Date.now(),
name: form.name,
link: form.link,
active: true,
members: 0,
createdAt: new Date().toISOString(),
};
updated = […groups, newGroup];
showToast(“🎉 Grupo adicionado!”);
}
setGroups(updated);
saveGroups(updated);
setShowForm(false);
};

const activeCount = groups.filter((g) => g.active).length;

return (
<div style={{
minHeight: “100vh”, background: “#0F0A07”,
fontFamily: “‘DM Sans’, sans-serif”, color: “#F5E6D8”, padding: “0 0 40px”,
}}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap'); * { box-sizing: border-box; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #5C2A0E; border-radius: 4px; } input { outline: none; } input:focus { border-color: #E8714A !important; }`}</style>

```
  {/* Header */}
  <div style={{
    background: "linear-gradient(135deg, #1A0C05, #2D1408)",
    padding: "20px 24px", borderBottom: "1px solid rgba(232,113,74,0.2)",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    position: "sticky", top: 0, zIndex: 10,
  }}>
    <div>
      <h1 style={{ fontFamily: "Nunito, sans-serif", fontSize: "1.3rem", fontWeight: 900, margin: 0, color: "#F5E6D8" }}>
        🍼 Mãe em Estreia
      </h1>
      <p style={{ margin: 0, fontSize: "0.75rem", color: "#9E7060" }}>Painel de Grupos</p>
    </div>
    <button
      onClick={onPreview}
      style={{
        background: "linear-gradient(135deg, #128C7E, #25D366)",
        border: "none", borderRadius: 10, padding: "8px 16px",
        color: "#fff", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 6,
      }}
    >
      <WaIcon /> Ver Página
    </button>
  </div>

  <div style={{ maxWidth: 600, margin: "0 auto", padding: "24px 16px 0" }}>

    {/* Stats bar */}
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24,
    }}>
      {[
        { label: "Total", value: groups.length, color: "#E8714A" },
        { label: "Ativos", value: activeCount, color: "#25D366" },
        { label: "Pausados", value: groups.length - activeCount, color: "#9E7060" },
      ].map((s) => (
        <div key={s.label} style={{
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(232,113,74,0.12)",
          borderRadius: 14, padding: "14px 16px", textAlign: "center",
        }}>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "1.8rem", fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</div>
          <div style={{ fontSize: "0.72rem", color: "#9E7060", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>{s.label}</div>
        </div>
      ))}
    </div>

    {/* Active groups alert */}
    <div style={{
      background: activeCount > 0 ? "rgba(37,211,102,0.08)" : "rgba(232,113,74,0.1)",
      border: `1px solid ${activeCount > 0 ? "rgba(37,211,102,0.2)" : "rgba(232,113,74,0.25)"}`,
      borderRadius: 12, padding: "12px 16px", marginBottom: 20,
      fontSize: "0.83rem", display: "flex", alignItems: "center", gap: 8,
    }}>
      <span style={{ fontSize: "1rem" }}>{activeCount > 0 ? "✅" : "⚠️"}</span>
      <span style={{ color: activeCount > 0 ? "#4ade80" : "#F5956E" }}>
        {activeCount > 0
          ? `${activeCount} grupo${activeCount > 1 ? "s" : ""} ativo${activeCount > 1 ? "s" : ""} — visitantes serão distribuídos entre eles`
          : "Nenhum grupo ativo — visitantes verão mensagem de indisponibilidade"}
      </span>
    </div>

    {/* Add button */}
    <button
      onClick={() => openForm()}
      style={{
        width: "100%", padding: "14px", marginBottom: 20,
        background: "linear-gradient(135deg, #C8552F, #E8714A)",
        border: "none", borderRadius: 14, color: "#fff",
        fontSize: "0.95rem", fontWeight: 700, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        boxShadow: "0 4px 20px rgba(232,113,74,0.3)",
        transition: "filter 0.15s, transform 0.15s",
      }}
      onMouseOver={(e) => { e.currentTarget.style.filter = "brightness(1.1)"; }}
      onMouseOut={(e) => { e.currentTarget.style.filter = "brightness(1)"; }}
    >
      ＋ Adicionar novo grupo
    </button>

    {/* Groups list */}
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {groups.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "#9E7060", fontSize: "0.9rem" }}>
          Nenhum grupo cadastrado ainda.<br />
          <span style={{ fontSize: "0.8rem" }}>Clique em "Adicionar" para começar!</span>
        </div>
      )}
      {groups.map((g, i) => (
        <div key={g.id} style={{
          background: g.active ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
          border: `1px solid ${g.active ? "rgba(37,211,102,0.2)" : "rgba(255,255,255,0.07)"}`,
          borderRadius: 16, padding: "16px 18px",
          transition: "border-color 0.2s, background 0.2s",
          animation: `fadeUp 0.35s ${i * 0.05}s both`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Number badge */}
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: g.active ? "rgba(37,211,102,0.15)" : "rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "1rem",
              color: g.active ? "#4ade80" : "#9E7060",
            }}>
              {String(i + 1).padStart(2, "0")}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "#F5E6D8", marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {g.name}
              </div>
              <div style={{ fontSize: "0.72rem", color: "#9E7060", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {g.link}
              </div>
            </div>

            {/* Status pill */}
            <span style={{
              padding: "4px 10px", borderRadius: 99, fontSize: "0.68rem", fontWeight: 700,
              background: g.active ? "rgba(37,211,102,0.15)" : "rgba(255,255,255,0.07)",
              color: g.active ? "#4ade80" : "#9E7060",
              letterSpacing: "0.05em", textTransform: "uppercase", flexShrink: 0,
            }}>
              {g.active ? "Ativo" : "Pausado"}
            </span>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button
              onClick={() => toggleActive(g.id)}
              style={{
                flex: 1, padding: "8px 0",
                background: g.active ? "rgba(232,113,74,0.12)" : "rgba(37,211,102,0.12)",
                border: `1px solid ${g.active ? "rgba(232,113,74,0.2)" : "rgba(37,211,102,0.2)"}`,
                borderRadius: 10, color: g.active ? "#F5956E" : "#4ade80",
                fontSize: "0.78rem", fontWeight: 700, cursor: "pointer",
                transition: "background 0.15s",
              }}
            >
              {g.active ? "⏸ Pausar" : "▶ Ativar"}
            </button>
            <button
              onClick={() => openForm(g)}
              style={{
                flex: 1, padding: "8px 0",
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, color: "#F5E6D8",
                fontSize: "0.78rem", fontWeight: 700, cursor: "pointer",
              }}
            >
              ✏️ Editar
            </button>
            <button
              onClick={() => deleteGroup(g.id)}
              style={{
                width: 38, padding: "8px 0",
                background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)",
                borderRadius: 10, color: "#f87171",
                fontSize: "0.85rem", cursor: "pointer",
              }}
            >
              🗑
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Modal Form */}
  {showForm && (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 100, padding: 16,
    }} onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
      <div style={{
        background: "#1A0C05", borderRadius: 20, padding: "28px 24px",
        width: "min(420px, 100%)", border: "1px solid rgba(232,113,74,0.2)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
      }}>
        <h2 style={{ fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "1.2rem", color: "#F5E6D8", marginBottom: 20 }}>
          {editId ? "✏️ Editar Grupo" : "➕ Novo Grupo"}
        </h2>

        <label style={{ display: "block", fontSize: "0.78rem", color: "#9E7060", fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Nome do grupo
        </label>
        <input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Ex: Grupo 02 – Enxoval Bebê"
          style={{
            width: "100%", padding: "12px 14px", borderRadius: 12,
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#F5E6D8", fontSize: "0.9rem", marginBottom: 16,
            fontFamily: "'DM Sans', sans-serif",
          }}
        />

        <label style={{ display: "block", fontSize: "0.78rem", color: "#9E7060", fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Link do grupo WhatsApp
        </label>
        <input
          value={form.link}
          onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
          placeholder="https://chat.whatsapp.com/..."
          style={{
            width: "100%", padding: "12px 14px", borderRadius: 12,
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#F5E6D8", fontSize: "0.85rem", marginBottom: 24,
            fontFamily: "'DM Sans', sans-serif",
          }}
        />

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setShowForm(false)} style={{
            flex: 1, padding: "12px", background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
            color: "#9E7060", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem",
          }}>Cancelar</button>
          <button onClick={saveForm} style={{
            flex: 2, padding: "12px",
            background: "linear-gradient(135deg, #C8552F, #E8714A)",
            border: "none", borderRadius: 12,
            color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem",
            boxShadow: "0 4px 16px rgba(232,113,74,0.3)",
          }}>
            {editId ? "Salvar alterações" : "Adicionar grupo"}
          </button>
        </div>
      </div>
    </div>
  )}

  {/* Toast */}
  {toast && (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
      background: toast.type === "error" ? "#7f1d1d" : "#14532d",
      border: `1px solid ${toast.type === "error" ? "rgba(239,68,68,0.3)" : "rgba(74,222,128,0.3)"}`,
      color: "#fff", borderRadius: 12, padding: "12px 20px",
      fontSize: "0.85rem", fontWeight: 600, zIndex: 200,
      boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      animation: "slideUp 0.3s ease both",
      whiteSpace: "nowrap",
    }}>
      {toast.msg}
    </div>
  )}

  <style>{`
    @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
    @keyframes slideUp { from{opacity:0;transform:translate(-50%,10px)} to{opacity:1;transform:translate(-50%,0)} }
  `}</style>
</div>
```

);
}

// ─── APP ROOT ─────────────────────────────────────────────────
export default function App() {
const [groups, setGroups] = useState([]);
const [view, setView] = useState(“redirect”); // “redirect” | “admin”
const [loaded, setLoaded] = useState(false);
const [clickCount, setClickCount] = useState(0);

// Load from storage
useEffect(() => {
(async () => {
try {
const result = await window.storage.get(STORAGE_KEY);
if (result && result.value) {
setGroups(JSON.parse(result.value));
} else {
setGroups(DEFAULT_GROUPS);
}
} catch {
setGroups(DEFAULT_GROUPS);
}
setLoaded(true);
})();
}, []);

// Triple-tap logo to access admin
const handleLogoTap = () => {
setClickCount((c) => {
const next = c + 1;
if (next >= 3) { setView(“admin”); return 0; }
setTimeout(() => setClickCount(0), 1000);
return next;
});
};

if (!loaded) return (
<div style={{ minHeight: “100vh”, display: “flex”, alignItems: “center”, justifyContent: “center”, background: “#FFF5EE” }}>
<div style={{ fontSize: “2rem”, animation: “spin 1s linear infinite” }}>🍼</div>
<style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
</div>
);

if (view === “admin”) {
return <AdminPanel groups={groups} setGroups={setGroups} onPreview={() => setView(“redirect”)} />;
}

return (
<div onClick={handleLogoTap}>
<RedirectPage groups={groups} onBack={() => setView(“admin”)} />
</div>
);
}
