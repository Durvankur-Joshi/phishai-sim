export default function ResultCard({ result }) {
    if (!result) return null;

    // Assuming higher score = higher risk. Adjust logic as needed.
    const isHighRisk = result.final_score > 50 || String(result.prediction).toLowerCase().includes("phish");
    const headerColors = isHighRisk
        ? "bg-red-50 text-red-900 border-red-200"
        : "bg-emerald-50 text-emerald-900 border-emerald-200";
    const badgeColors = isHighRisk
        ? "bg-red-200 text-red-900"
        : "bg-emerald-200 text-emerald-900";

    return (
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header Banner */}
            <div className={`p-5 border-b flex items-center justify-between ${headerColors}`}>
                <h2 className="text-xl font-bold flex items-center gap-2">
                    {isHighRisk ? "⚠️ Threat Detected" : "✅ Safe URL"}
                </h2>
                <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${badgeColors}`}>
                    {result.prediction}
                </span>
            </div>

            {/* Body Section */}
            <div className="p-6">

                {/* Metric Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <ScoreBox label="Final Score" value={result.final_score} highlight />
                    <ScoreBox label="URL Score" value={result.url_score} />
                    <ScoreBox label="Semantic" value={result.semantic_score} />
                    <ScoreBox label="Similarity" value={result.similarity_score} />
                    <p>
                        <strong>Structural Score:</strong>{" "}
                        {result.structural_score}
                    </p>
                </div>

                {/* Reasons Section */}
                {result.reasons && result.reasons.length > 0 && (
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                        <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">
                            Detection Factors
                        </h3>
                        <ul className="space-y-3">
                            {result.reasons.map((reason, index) => (
                                <li key={index} className="flex items-start gap-3 text-slate-600 text-sm">
                                    <svg className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    {reason}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

// Small helper component to keep the grid code clean
function ScoreBox({ label, value, highlight }) {
    return (
        <div className={`p-4 rounded-xl border ${highlight ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
            <p className={`text-xs uppercase tracking-wider mb-1 font-semibold ${highlight ? 'text-slate-300' : 'text-slate-500'}`}>
                {label}
            </p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}