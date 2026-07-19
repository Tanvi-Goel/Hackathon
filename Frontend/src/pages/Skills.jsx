import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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

          <div className="w-56 h-56 rounded-full border-4 border-cyan-500/70 flex flex-col justify-center items-center bg-slate-950/70 shadow-[0_24px_60px_-30px_rgba(6,182,212,0.9)]">

            <Brain
              size={55}
              className="text-cyan-300"
            />

            <h2 className="mt-4 text-xl font-bold">
              AI Analysis
            </h2>

            <p className="text-cyan-300">
              Complete
            </p>

          </div>

        </div>

        {/* Skills */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">

          {skills.map((skill, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
              className="bg-slate-900/90 border border-cyan-700 rounded-xl p-5 text-center hover:scale-105 duration-300"
            >
              {skill}
            </motion.div>

          ))}

        </div>

        <button
          onClick={generateChallenge}
          disabled={loading}
          className="mt-12 w-full inline-flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-400 rounded-xl py-4 font-bold transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="inline-block h-4 w-4 rounded-full border-2 border-cyan-200 border-t-transparent animate-spin" />
              Generating Challenge...
            </>
          ) : (
            "Generate Challenge"
          )}
        </button>

      </div>

    </Layout>
  );
}

export default Skills;