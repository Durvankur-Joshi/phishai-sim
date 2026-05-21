import { useState } from "react";
import API from "../services/api";

export default function UrlForm({ setResult }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeUrl = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setResult(null); // Clear previous results while loading

    try {
      const response = await API.post("/analyze", { url });
      setResult(response.data);
    } catch (error) {
      console.error(error);
      // Optional: Handle error state here
    }

    setLoading(false);
  };

  return (
    <div className="w-full bg-white p-2 rounded-2xl shadow-sm border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
      <form onSubmit={analyzeUrl} className="flex flex-col sm:flex-row gap-2">
        <input
          type="url"
          placeholder="https://example.com"
          required
          className="flex-1 bg-transparent px-4 py-3 outline-none text-slate-700 placeholder:text-slate-400"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-8 py-3 rounded-xl transition-colors flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing
            </>
          ) : (
            "Analyze"
          )}
        </button>
      </form>
    </div>
  );
}