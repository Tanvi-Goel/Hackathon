import { Link, useLocation } from "react-router-dom";

const steps = [
  { id: 1, name: "Upload", path: "/upload" },
  { id: 2, name: "Skills", path: "/skills" },
  { id: 3, name: "Challenge", path: "/challenge" },
  { id: 4, name: "Evaluation", path: "/evaluation" },
  { id: 5, name: "Proof", path: "/proof" },
];

function Stepper() {
  const location = useLocation();

  return (
    <div className="flex justify-between items-center mb-10 overflow-x-auto">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="flex items-center flex-1 min-w-max"
        >
          <Link
            to={step.path}
            className={`flex flex-col items-center ${
              location.pathname === step.path
                ? "text-violet-400"
                : "text-gray-500"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold ${
                location.pathname === step.path
                  ? "border-violet-500 bg-violet-600 text-white"
                  : "border-gray-600"
              }`}
            >
              {step.id}
            </div>

            <span className="mt-2 text-sm">{step.name}</span>
          </Link>

          {index !== steps.length - 1 && (
            <div className="flex-1 h-[2px] bg-gray-700 mx-3"></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Stepper;