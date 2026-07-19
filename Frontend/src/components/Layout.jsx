import { useState } from "react";
import Stepper from "./Stepper";

function Layout({ children }) {
  const [glow, setGlow] = useState({
    x: 0,
    y: 0,
    active: false,
  });

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#050816] text-white"
      onPointerMove={(e) =>
        setGlow({
          x: e.clientX,
          y: e.clientY,
          active: true,
        })
      }
      onPointerLeave={() =>
        setGlow((prev) => ({
          ...prev,
          active: false,
        }))
      }
    >
      {/* Animated Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />

        <div
          className="absolute top-1/3 right-0 h-450 w-450 rounded-full bg-sky-500/10 blur-3xl"
          style={{
            animation: "float1 18s ease-in-out infinite",
          }}
        />

        <div
          className="absolute bottom-0 left-1/4 h-400 w-400 rounded-full bg-teal-400/10 blur-3xl"
          style={{
            animation: "float2 22s ease-in-out infinite",
          }}
        />
      </div>

      {/* Animated Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Mouse Glow */}
      <div
        className={`pointer-events-none absolute h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl transition-opacity duration-300 ${
          glow.active ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: glow.x - 112,
          top: glow.y - 112,
        }}
      />

      {/* Floating Dots */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-cyan-300/30"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${(i * 13) % 100}%`,
              top: `${(i * 17) % 100}%`,
              animation: `float${(i % 2) + 1} ${10 + i}s linear infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-8">
        <h1 className="mb-8 text-4xl font-bold text-cyan-300">
          SkillProof
        </h1>

        <Stepper />

        {children}
      </div>

      <style>{`
        @keyframes float1 {
          0% { transform: translate(0,0); }
          25% { transform: translate(-40px,30px); }
          50% { transform: translate(20px,60px); }
          75% { transform: translate(50px,-20px); }
          100% { transform: translate(0,0); }
        }

        @keyframes float2 {
          0% { transform: translate(0,0); }
          25% { transform: translate(50px,-30px); }
          50% { transform: translate(-30px,-50px); }
          75% { transform: translate(20px,40px); }
          100% { transform: translate(0,0); }
        }

      `}</style>
    </div>
  );
}

export default Layout;