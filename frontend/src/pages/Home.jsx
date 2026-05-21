import { useState } from "react";
import Navbar from "../components/Navbar";
import UrlForm from "../components/UrlForm";
import ResultCard from "../components/ResultCard";

export default function Home() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-16 flex flex-col items-center">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-blue-600 mb-6 py-2">
            AI Phishing Detector
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Protect yourself from malicious actors. Enter a URL below to analyze its semantic structure, similarity to known threats, and overall risk.
          </p>
        </div>

        <div className="w-full max-w-2xl">
          <UrlForm setResult={setResult} />
          <ResultCard result={result} />
        </div>
      </main>
    </div>
  );
}