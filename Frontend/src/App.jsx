import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Skills from "./pages/Skills";
import Challenge from "./pages/Challenge";
import Evaluation from "./pages/Evaluation";
import Proof from "./pages/Proof";
import PageTransition from "./components/PageTransition";

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/upload"
          element={
            <PageTransition>
              <Upload />
            </PageTransition>
          }
        />
        <Route
          path="/skills"
          element={
            <PageTransition>
              <Skills />
            </PageTransition>
          }
        />
        <Route
          path="/challenge"
          element={
            <PageTransition>
              <Challenge />
            </PageTransition>
          }
        />
        <Route
          path="/evaluation"
          element={
            <PageTransition>
              <Evaluation />
            </PageTransition>
          }
        />
        <Route
          path="/proof"
          element={
            <PageTransition>
              <Proof />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
