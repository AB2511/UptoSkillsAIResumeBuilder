import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home.jsx";
import Firstpage from "./components/Firstpage.jsx";
import TemplateNo from "./components/TemplateNo.jsx";
import ResumeEditor from "./components/ResumeEditor.jsx";

function App() {
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(() => {
    return JSON.parse(localStorage.getItem("resumeData")) || null;
  });

  useEffect(() => {
    console.log("resumeData updated:", resumeData);
    if (resumeData) {
      localStorage.setItem("resumeData", JSON.stringify(resumeData));
    }
  }, [resumeData]);

  useEffect(() => {
    if (!resumeData) {
      console.warn("⚠️ resumeData is missing! Redirecting to /upload...");
      navigate("/upload");
    }
  }, [resumeData, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/firstpage" element={<Firstpage />} />
        <Route path="/templateno" element={<TemplateNo />} />
        <Route path="/ResumeEditor" element={<ResumeEditor resumeData={resumeData} />} />
      </Routes>
    </div>
  );
}

export default App;
