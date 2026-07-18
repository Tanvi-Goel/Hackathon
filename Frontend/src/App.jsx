import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Skills from "./pages/Skills";
import Challenge from "./pages/Challenge";
import Evaluation from "./pages/Evaluation";
import Proof from "./pages/Proof";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/evaluation" element={<Evaluation />} />
        <Route path="/proof" element={<Proof />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
