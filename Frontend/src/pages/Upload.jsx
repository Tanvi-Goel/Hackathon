import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  ShieldCheck,
  CheckCircle,
  Brain,
} from "lucide-react";

import Layout from "../components/Layout";
import api from "../services/api";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("idle");

  const navigate = useNavigate();

  useEffect(() => {
    if (status === "uploaded") {
      const timer = setTimeout(() => {
        navigate("/skills");
      }, 850);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    setLoading(true);
    setStatus("uploading");
    setProgress(8);

    const progressTimer = setInterval(() => {
      setProgress((current) => {
        const next = current + Math.floor(Math.random() * 12) + 6;
        return next >= 95 ? 95 : next;
      });
    }, 180);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post(
        "/upload-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      clearInterval(progressTimer);
      setProgress(100);
      setStatus("uploaded");
      localStorage.setItem("resumeData", JSON.stringify(response.data));
    } catch (err) {
      clearInterval(progressTimer);
      setLoading(false);
      setStatus("idle");
      setProgress(0);
      console.log(err);
      alert("Upload Failed");
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-3">
          Upload Your Resume
        </h1>

        <p className="text-center text-gray-400 mb-8">
          We'll analyze your resume and extract your skills automatically.
        </p>

        <div className="relative bg-slate-950/90 border border-cyan-700/40 rounded-3xl p-8 shadow-[0_40px_120px_-90px_rgba(6,182,212,0.7)]">

          <div className="border-2 border-dashed border-cyan-500/60 rounded-2xl p-10 text-center">

            <Upload
              size={70}
              className="mx-auto text-cyan-400"
            />

            <p className="mt-6 text-lg">
              Drag & Drop your resume
            </p>

            <p className="text-gray-500 mt-2">or</p>

            <input
              type="file"
              className="hidden"
              id="resume"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setStatus("idle");
                setProgress(0);
              }}
              disabled={loading}
            />

            <label
              htmlFor="resume"
              className={`inline-block mt-6 px-8 py-3 rounded-xl transition duration-200 ${
                loading
                  ? "bg-cyan-500/50 text-cyan-200 pointer-events-none"
                  : "bg-cyan-500 hover:bg-cyan-400"
              }`}
            >
              Browse Files
            </label>

            <p className="mt-5 text-gray-500 text-sm">
              PDF, DOCX • Max Size 5 MB
            </p>

          </div>

          {file && status === "idle" && (
            <div className="mt-6 rounded-xl border border-cyan-700/40 bg-slate-900/90 p-4 text-cyan-100">
              <p className="font-semibold">Ready to upload</p>
              <p className="text-gray-400 mt-1">
                {file.name} • {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}

          {status === "uploading" && (
            <div className="mt-6 rounded-xl border border-cyan-700/40 bg-slate-900/95 p-6 text-center">
              <div className="relative mx-auto mb-5 h-24 w-24">
                <motion.div
                  className="absolute inset-0 rounded-full bg-cyan-400/20"
                  animate={{
                    scale: [0.85, 1.12, 0.85],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="relative h-full w-full rounded-full bg-slate-900/95 border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.25)] flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Brain size={40} className="text-cyan-300" />
                </motion.div>
              </div>

              <p className="text-cyan-200 font-semibold text-lg">AI thinking...</p>
              <p className="text-cyan-100 text-4xl font-bold mt-4">{progress}%</p>

              <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-cyan-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="mt-3 text-sm text-gray-400">
                The AI is scanning your resume and preparing your skill profile.
              </p>
            </div>
          )}

          {status === "uploaded" && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: -6 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mt-6 bg-[#1b1b28] rounded-xl p-4 flex justify-between items-center border border-cyan-700/50 shadow-[0_20px_60px_-30px_rgba(6,182,212,0.55)]"
            >
              <div className="flex items-center gap-3">
                <FileText className="text-cyan-400" />
                <div>
                  <p className="font-semibold text-white">{file.name}</p>
                  <p className="text-gray-500 text-sm">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                <CheckCircle />
                <span>Uploaded</span>
              </div>
            </motion.div>
          )}

          <div className="mt-6 bg-slate-900/90 rounded-xl p-5 flex gap-4 border border-cyan-700/20">

            <ShieldCheck className="text-cyan-400" />

            <div>
              <h3 className="font-semibold">
                Your data is secure
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                We only use your resume to generate your personalized coding challenge.
              </p>
            </div>
          </div>

          <button
            onClick={uploadResume}
            disabled={!file || loading}
            className="mt-8 w-full inline-flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-400 rounded-xl py-4 font-bold transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Uploading..." : "Upload Resume"}
          </button>

        </div>

      </div>
    </Layout>
  );
}

export default UploadPage;
