import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Challenge() {
  const [challenge, setChallenge] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("challengeData"));

    if (data) {
      setChallenge(data);
    }
  }, []);

  if (!challenge) {
    return (
      <Layout>
        <div className="text-center py-20 text-gray-400">
          Loading Challenge...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-white">
          Your Personalized Challenge
        </h1>

        <p className="text-center text-gray-400 mt-3 mb-10">
          Based on your skills, we've created a custom coding challenge.
        </p>

        <div className="bg-[#161622] rounded-2xl border border-violet-700 p-8 shadow-lg">

          {/* Title */}
          <h2 className="text-3xl font-bold text-violet-400">
            {challenge.title}
          </h2>

          {/* Problem */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3 text-white">
              Problem Statement
            </h3>

            <p className="text-gray-300 leading-8">
              {challenge.problem}
            </p>
          </div>

          {/* Requirements */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Requirements
            </h3>

            <ul className="space-y-3">
              {challenge.requirements?.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-300"
                >
                  <span className="text-violet-400 mt-1">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Duration & Difficulty */}
          <div className="grid grid-cols-2 gap-6 mt-10">

            <div className="bg-[#1f1f2d] rounded-xl p-5 border border-violet-800">
              <p className="text-gray-400 text-sm">
                Duration
              </p>

              <h3 className="text-2xl font-bold text-white mt-2">
                {challenge.duration}
              </h3>
            </div>

            <div className="bg-[#1f1f2d] rounded-xl p-5 border border-violet-800">
              <p className="text-gray-400 text-sm">
                Difficulty
              </p>

              <h3 className="text-2xl font-bold text-violet-400 mt-2">
                {challenge.difficulty}
              </h3>
            </div>

          </div>

        </div>

        <button
          onClick={() => navigate("/evaluation")}
          className="mt-8 w-full bg-violet-600 hover:bg-violet-700 transition rounded-xl py-4 text-lg font-semibold"
        >
          Start Challenge →
        </button>

      </div>
    </Layout>
  );
}

export default Challenge;