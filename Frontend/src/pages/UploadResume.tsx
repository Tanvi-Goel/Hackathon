import { useState } from "react";
import axios from "axios";

function UploadResume() {
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");

  const uploadResume = async () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    const response = await axios.post(
      "http://localhost:8000/upload-resume",
      formData
    );

    setResumeText(response.data.text);
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Upload Resume</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <br />
      <br />

      <button onClick={uploadResume}>Upload Resume</button>

      <hr />

      <h2>Extracted Resume Text</h2>

      <pre>{resumeText}</pre>
    </div>
  );
}

export default UploadResume;