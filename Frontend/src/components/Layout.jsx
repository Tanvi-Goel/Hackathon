import Stepper from "./Stepper";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#09090f] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        <h1 className="text-4xl font-bold text-violet-500 mb-8">
          SkillProof
        </h1>

        <Stepper />

        {children}

      </div>
    </div>
  );
}

export default Layout;