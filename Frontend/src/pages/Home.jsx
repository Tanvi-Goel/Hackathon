import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import PrimaryButton from "../components/PrimaryButton";

function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center text-center mt-16">

        <h2 className="text-5xl font-bold">
          Prove What You Know
        </h2>

        <h2 className="text-5xl font-bold mt-2 text-violet-400">
          Not What Your Resume Says
        </h2>

        <p className="mt-6 text-gray-400 max-w-2xl">
          Upload your resume and let AI verify your skills through
          personalized coding challenges.
        </p>

        <div className="mt-10 w-72">
          <PrimaryButton
            text="Start Verification"
            onClick={() => navigate("/upload")}
          />
        </div>

      </div>
    </Layout>
  );
}

export default Home;