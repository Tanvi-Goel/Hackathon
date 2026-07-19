import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { ShieldCheck, Download } from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

function Proof() {
  const [proof, setProof] = useState(null);

  const certificateRef = useRef(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("evaluationData"));
    if (data) setProof(data);
  }, []);

  if (!proof) {
    return (
      <Layout>
        <div className="text-center mt-20 text-xl">Loading...</div>
      </Layout>
    );
  }

  const resumeData = JSON.parse(localStorage.getItem("resumeData")) || {};
  const candidateName =
    resumeData.candidate_name ||
    proof.candidateName ||
    proof.name ||
    proof.resumeName ||
    resumeData.name ||
    resumeData.filename ||
    resumeData.resumeName ||
    "Candidate";

  const today = new Date().toLocaleDateString("en-GB");

  const certificateId = "SP-" + Math.floor(Math.random() * 1000000);

  const downloadCertificate = async () => {
    const node = certificateRef.current;

    if (!node) return;

    try {
      const dataUrl = await toPng(node, {
        pixelRatio: 3,
        cacheBust: true,
      });

      const pdf = new jsPDF("landscape", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();

      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(dataUrl, "PNG", 0, 0, pageWidth, pageHeight);

      pdf.save("SkillProof-Certificate.pdf");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center">Skill Proof</h1>

        <p className="text-center text-gray-400 mt-2">
          Congratulations! Your coding assessment has been verified.
        </p>

        {/* ================= CERTIFICATE ================= */}

        <div
          ref={certificateRef}
          className="bg-white text-black rounded-3xl p-14 mt-10 border-12 border-violet-700"
        >
          <div className="flex justify-center">
            <ShieldCheck size={70} className="text-violet-700" />
          </div>

          <h1 className="text-center text-5xl font-bold mt-5 text-violet-700">
            SKILLPROOF
          </h1>

          <p className="text-center text-xl mt-3">
            AI VERIFIED SKILL CERTIFICATE
          </p>

          <div className="border-t border-b py-8 my-8">
            <p className="text-center text-xl">This certifies that</p>

            <h2 className="text-center text-5xl font-bold mt-5">
              {candidateName}
            </h2>

            <p className="text-center mt-6 text-xl">
              has successfully completed the
            </p>

            <h3 className="text-center text-2xl font-semibold mt-2">
              AI Coding Challenge Assessment
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-10 mt-8">
            <div className="text-center">
              <p className="text-gray-500">Final Score</p>

              <h2 className="text-6xl font-bold text-green-600">
                {proof.score}/100
              </h2>
            </div>

            <div className="text-center">
              <p className="text-gray-500">Skill Level</p>

              <h2 className="text-5xl font-bold text-violet-700">
                {proof.level}
              </h2>
            </div>
          </div>

          <div className="flex justify-between mt-16">
            <div>
              <p className="font-semibold">Certificate ID</p>

              <p>{certificateId}</p>
            </div>

            <div>
              <p className="font-semibold">Date</p>

              <p>{today}</p>
            </div>

            <div className="text-right">
              <p className="font-semibold">Verification</p>

              <p className="text-green-700 font-bold">✓ AI VERIFIED</p>
            </div>
          </div>
        </div>

        {/* ================= DETAILS ================= */}

        <div className="bg-[#161622] rounded-3xl p-8 mt-10 border border-violet-700">
          <h2 className="text-2xl font-bold">AI Feedback</h2>

          <p className="mt-4 text-gray-300">{proof.feedback}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-[#161622] rounded-3xl p-8 border border-violet-700">
            <h2 className="text-xl font-bold mb-5">Strengths</h2>

            <ul className="list-disc ml-5 space-y-2">
              {proof.strengths?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-[#161622] rounded-3xl p-8 border border-violet-700">
            <h2 className="text-xl font-bold mb-5">Improvements</h2>

            <ul className="list-disc ml-5 space-y-2">
              {proof.improvements?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <button
          onClick={downloadCertificate}
          className="mt-10 w-full bg-violet-600 hover:bg-violet-700 py-4 rounded-xl flex justify-center items-center gap-3"
        >
          <Download size={20} />
          Download Certificate
        </button>
      </div>
    </Layout>
  );
}

export default Proof;
