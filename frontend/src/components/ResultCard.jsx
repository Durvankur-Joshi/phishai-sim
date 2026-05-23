export default function ResultCard({ result }) {
    if (!result) return null;

    // Assuming higher score = higher risk. Adjust logic as needed.
    const isHighRisk = result.final_score > 50 || String(result.prediction).toLowerCase().includes("phish");
    const headerColors = isHighRisk
        ? "bg-gradient-to-r from-red-500 to-red-600 text-white border-red-700"
        : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-700";
    const badgeColors = isHighRisk
        ? "bg-red-100 text-red-700"
        : "bg-emerald-100 text-emerald-700";

    // Format score with proper styling
    const getScoreColor = (score) => {
        if (score > 75) return "text-red-600";
        if (score > 50) return "text-orange-500";
        if (score > 25) return "text-yellow-600";
        return "text-emerald-600";
    };

    return (
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Banner */}
            <div className={`p-5 border-b ${headerColors}`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        {isHighRisk ? "⚠️ Threat Detected" : "✅ Safe URL"}
                    </h2>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-sm ${badgeColors}`}>
                        {result.prediction}
                    </span>
                </div>
            </div>

            {/* Body Section */}
            <div className="p-6">
                {/* Metric Grid */}
                <div className="mb-8">
                    <ScoreBox 
                        label="Final Score" 
                        value={result.final_score} 
                        highlight={isHighRisk}
                        scoreColor={getScoreColor(result.final_score)}
                    />
                </div>

                {/* Additional Metrics (if available) */}
                {(result.confidence || result.risk_level) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {result.confidence && (
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                                <p className="text-xs uppercase tracking-wider mb-1 font-semibold text-slate-500">
                                    Confidence
                                </p>
                                <p className="text-2xl font-bold text-slate-800">
                                    {(result.confidence * 100).toFixed(1)}%
                                </p>
                            </div>
                        )}
                        {result.risk_level && (
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                                <p className="text-xs uppercase tracking-wider mb-1 font-semibold text-slate-500">
                                    Risk Level
                                </p>
                                <p className={`text-2xl font-bold ${getScoreColor(
                                    result.risk_level === 'high' ? 80 : 
                                    result.risk_level === 'medium' ? 50 : 20
                                )}`}>
                                    {result.risk_level.toUpperCase()}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Reasons Section */}
                {result.reasons && result.reasons.length > 0 && (
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-5 rounded-xl border border-slate-200">
                        <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                            <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Detection Factors
                        </h3>
                        <ul className="space-y-3">
                            {result.reasons.map((reason, index) => (
                                <li key={index} className="flex items-start gap-3 text-slate-700 text-sm group hover:bg-white p-2 rounded-lg transition-colors duration-150">
                                    <svg className={`w-5 h-5 shrink-0 mt-0.5 ${isHighRisk ? 'text-red-500' : 'text-emerald-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="leading-relaxed">{reason}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* No reasons fallback */}
                {(!result.reasons || result.reasons.length === 0) && (
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-center">
                        <p className="text-slate-600 text-sm">No additional detection factors available.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Enhanced helper component
function ScoreBox({ label, value, highlight, scoreColor }) {
    // Ensure value is a number
    const numericValue = typeof value === 'number' ? value : parseFloat(value);
    const displayValue = !isNaN(numericValue) ? numericValue : value;
    
    return (
        <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
            highlight 
                ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-lg' 
                : 'bg-white border-slate-200 shadow-md hover:shadow-lg'
        }`}>
            <p className={`text-xs uppercase tracking-wider mb-2 font-semibold ${
                highlight ? 'text-slate-300' : 'text-slate-500'
            }`}>
                {label}
            </p>
            <p className={`text-4xl font-bold ${highlight ? 'text-white' : scoreColor || 'text-slate-800'}`}>
                {typeof displayValue === 'number' ? `${displayValue}%` : displayValue}
            </p>
            {highlight && (
                <div className="mt-3 h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                            numericValue > 75 ? 'bg-red-500' : 
                            numericValue > 50 ? 'bg-orange-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${Math.min(100, Math.max(0, numericValue))}%` }}
                    />
                </div>
            )}
        </div>
    );
}