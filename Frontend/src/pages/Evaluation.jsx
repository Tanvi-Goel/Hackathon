import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import Layout from "../components/Layout";
import api from "../services/api";

const starterCode = {
  javascript: `// JavaScript

function solution() {

}
`,

  python: `# Python

def solution():
    pass
`,

  java: `public class Solution {

    public static void main(String[] args) {

    }

}
`,

  cpp: `#include <iostream>

using namespace std;

int main() {

    return 0;
}
`,

  csharp: `using System;

class Program
{
    static void Main(string[] args)
    {

    }
}
`,
};

function Evaluation() {
  const navigate = useNavigate();

  const challenge =
    JSON.parse(localStorage.getItem("challengeData")) || {};

  const [language, setLanguage] = useState("javascript");

  const [solution, setSolution] = useState(
    starterCode.javascript
  );

  const [loading, setLoading] = useState(false);

  const [logs, setLogs] = useState(["Ready"]);

  const [seconds, setSeconds] = useState(60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");

    return `${h}:${m}:${s}`;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setSolution(starterCode[lang]);
    setLogs([`Language changed to ${lang}`]);
  };

  const runCode = () => {
    setLogs([
      "Compiling...",
      "Running...",
      "✓ Code compiled successfully.",
      "✓ Execution finished."
    ]);
  };

  const submitSolution = async () => {
    try {
      setLoading(true);

      const challenge = JSON.parse(localStorage.getItem("challengeData"));
      const resumeData = JSON.parse(localStorage.getItem("resumeData")) || {};
      const candidateName =
        resumeData.candidate_name || resumeData.name || resumeData.filename || resumeData.resumeName || "Candidate";

      const response = await api.post("/evaluate-code", {
        challenge: challenge.problem, // or the full challenge if you change the backend
        solution: solution,
        language: language,
        candidate_name: candidateName,
      });

      const evaluationResult = {
        ...response.data,
        candidateName,
      };

      localStorage.setItem(
        "evaluationData",
        JSON.stringify(evaluationResult)
      );

      navigate("/proof");
    } catch {
      alert("Evaluation Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-white">
          Solve the Challenge
        </h1>

        <p className="text-gray-400 mt-2">
          Complete the coding challenge below.
        </p>

        {/* Challenge */}

        <div className="mt-8 bg-slate-950/90 border border-cyan-700 rounded-xl p-6 shadow-[0_24px_80px_-40px_rgba(6,182,212,0.65)]">

          <h2 className="text-2xl font-bold text-cyan-300">
            {challenge.title}
          </h2>

          <p className="text-gray-300 mt-4 leading-7">
            {challenge.problem}
          </p>

          <div className="flex gap-10 mt-6">

            <div>

              <p className="text-gray-500 text-sm">
                Difficulty
              </p>

              <p className="text-white">
                {challenge.difficulty}
              </p>

            </div>

            <div>

              <p className="text-gray-500 text-sm">
                Duration
              </p>

              <p className="text-white">
                {challenge.duration}
              </p>

            </div>

          </div>

        </div>

        {/* Toolbar */}

        <div className="mt-8 flex justify-between items-center">

          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-slate-900 border border-cyan-700 rounded-lg px-4 py-2 text-white"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="csharp">C#</option>
          </select>

          <div className="text-cyan-300 font-semibold">
            ⏱ {formatTime()}
          </div>

        </div>

        {/* Editor */}

        <div className="mt-4 border border-cyan-700 rounded-xl overflow-hidden shadow-[0_20px_80px_-50px_rgba(6,182,212,0.45)]">

          <Editor
            height="550px"
            language={language}
            theme="vs-dark"
            value={solution}
            onChange={(value) => setSolution(value || "")}
            options={{
              fontSize: 15,
              minimap: {
                enabled: false,
              },
              automaticLayout: true,
              scrollBeyondLastLine: false,
            }}
          />

        </div>

        {/* Buttons */}

        <div className="flex gap-4 mt-6">

          <button
            onClick={runCode}
            className="flex-1 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition duration-150"
          >
            ▶ Run Code
          </button>

          <button
            onClick={submitSolution}
            disabled={loading}
            className="flex-1 inline-flex items-center justify-center gap-3 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="inline-block h-4 w-4 rounded-full border-2 border-cyan-200 border-t-transparent animate-spin" />
                Evaluating...
              </>
            ) : (
              "Submit Solution"
            )}
          </button>

        </div>

        {/* Console */}

        <div className="mt-8 bg-slate-950/90 border border-cyan-700 rounded-xl shadow-[0_20px_80px_-50px_rgba(6,182,212,0.5)]">

          <div className="border-b border-cyan-700 px-5 py-3 font-semibold">
            Console
          </div>

          <div className="p-5">

            {logs.map((log, index) => (
              <p
                key={index}
                className="text-green-400 mb-2"
              >
                {log}
              </p>
            ))}

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Evaluation;