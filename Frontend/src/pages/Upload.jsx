import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

import Layout from "../components/Layout";
import api from "../services/api";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await api.post(
        "/upload-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem(
        "resumeData",
        JSON.stringify(response.data)
      );

      setLoading(false);

      navigate("/skills");
    } catch (err) {
      console.log(err);
      setLoading(false);
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

        <div className="bg-[#14141f] border border-violet-700 rounded-3xl p-8">

          <div className="border-2 border-dashed border-violet-600 rounded-2xl p-10 text-center">

            <Upload
              size={70}
              className="mx-auto text-violet-500"
            />

            <p className="mt-6 text-lg">
              Drag & Drop your resume
            </p>

            <p className="text-gray-500 mt-2">or</p>

            <input
              type="file"
              className="hidden"
              id="resume"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <label
              htmlFor="resume"
              className="cursor-pointer inline-block mt-6 bg-violet-600 px-8 py-3 rounded-xl hover:bg-violet-700"
            >
              Browse Files
            </label>

            <p className="mt-5 text-gray-500 text-sm">
              PDF, DOCX • Max Size 5 MB
            </p>

          </div>

          {file && (

            <div className="mt-6 bg-[#1b1b28] rounded-xl p-4 flex justify-between items-center">

              <div className="flex items-center gap-3">

                <FileText className="text-red-400" />

                <div>

                  <p>{file.name}</p>

                  <p className="text-gray-500 text-sm">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                </div>

              </div>

              <CheckCircle className="text-green-400" />

            </div>

          )}

          <div className="mt-6 bg-[#1b1b28] rounded-xl p-5 flex gap-4">

            <ShieldCheck className="text-violet-400" />

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
            disabled={loading}
            className="mt-8 w-full bg-violet-600 hover:bg-violet-700 rounded-xl py-4 font-bold"
          >
            {loading ? "Analyzing Resume..." : "Extract Skills"}
          </button>

        </div>

      </div>
    </Layout>
  );
}

export default UploadPage;