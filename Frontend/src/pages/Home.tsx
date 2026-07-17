function Home() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "Arial",
      }}
    >
      <h1>🚀 SkillProof</h1>

      <h2>Prove What You Know, Not What Your Resume Says</h2>

      <p>
        Upload your Resume or GitHub Repository and get an AI-generated coding
        challenge.
      </p>

      <button>Get Started</button>
    </div>
  );
}

export default Home;