import Stepper from "./Stepper";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-[#020617] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

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