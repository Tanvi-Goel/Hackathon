import { useState } from "react";
import Stepper from "./Stepper";

function Layout({ children }) {
  const [glow, setGlow] = useState({ x: 0, y: 0, active: false });
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-linear-to-b from-slate-950 via-slate-900 to-[#020617] text-white"
      onPointerMove={(event) =>
        setGlow({ x: event.clientX, y: event.clientY, active: true })
      }
      onPointerLeave={() => setGlow((current) => ({ ...current, active: false }))}
    >
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute left-[-10%] top-16 h-72 w-72 rounded-full bg-cyan-500/8 blur-3xl animate-slow-blob" />
        <div className="absolute right-[-8%] top-1/4 h-80 w-80 rounded-full bg-emerald-400/8 blur-3xl animate-slow-wave" />
        <div
          className="absolute left-1/2 top-[60%] h-72 w-72 -translate-x-1/2 rounded-full bg-sky-400/8 blur-3xl animate-slow-blob"
          style={{ animationDelay: "8s" }}
        />
      </div>

      <div
        className={`pointer-events-none absolute z-10 rounded-full blur-3xl bg-cyan-400/10 shadow-[0_0_80px_rgba(34,211,238,0.12)] transition-opacity duration-300 ${
          glow.active ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: 96,
          height: 96,
          transform: `translate(${glow.x - 48}px, ${glow.y - 48}px)`,
          mixBlendMode: "screen",
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-8">

        <h1 className="text-4xl font-bold tracking-tight text-cyan-300 mb-8">
          SkillProof
        </h1>

        <Stepper />

        {children}

      </div>
    </div>
  );
}

export default Layout;