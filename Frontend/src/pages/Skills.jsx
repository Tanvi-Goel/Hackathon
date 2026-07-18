import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../services/api";
import { Brain } from "lucide-react";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("resumeData");
    const data = stored ? JSON.parse(stored) : null;
    const rawSkills = data?.skills ?? data?.result?.skills ?? [];

    const normalizedSkills = rawSkills
      .map((skill) => (typeof skill === "string" ? skill : skill?.name || ""))
      .filter(Boolean);

    setSkills(normalizedSkills);
  }, []);

  const generateChallenge = async () => {
    try {
      setLoading(true);

      const payload = {
        skills: skills.map((skill) => ({
          name: skill,
          category: "Technical",
          confidence: 95,
        })),
      };

      const response = await api.post(
        "/generate-challenge",
        payload
      );

      localStorage.setItem(
        "challengeData",
        JSON.stringify(response.data)
      );

      setLoading(false);

      navigate("/challenge");

    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Failed to generate challenge");
    }
  };

  return (
    <Layout>

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-center">
          Extracted Skills
        </h1>

        <p className="text-center text-gray-400 mt-3">
          AI has analyzed your resume.
        </p>

        {/* AI Circle */}

        <div className="flex justify-center mt-10">

          <div className="w-56 h-56 rounded-full border-4 border-violet-600 flex flex-col justify-center items-center">

            <Brain
              size={55}
              className="text-violet-400"
            />

            <h2 className="mt-4 text-xl font-bold">
              AI Analysis
            </h2>

            <p className="text-violet-400">
              Complete
            </p>

          </div>

        </div>

        {/* Skills */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">

          {skills.map((skill, index) => (

            <div
              key={index}
              className="bg-[#161622] border border-violet-700 rounded-xl p-5 text-center hover:scale-105 duration-300"
            >
              {skill}
            </div>

          ))}

        </div>

        <button
          onClick={generateChallenge}
          disabled={loading}
          className="mt-12 w-full bg-violet-600 hover:bg-violet-700 rounded-xl py-4 font-bold"
        >
          {loading
            ? "Generating Challenge..."
            : "Generate Challenge"}
        </button>

      </div>

    </Layout>
  );
}

export default Skills;