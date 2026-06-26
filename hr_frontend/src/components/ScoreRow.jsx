export default function ScoreRow({
    label,
    value,
    color = "#3b82f6",
}) {

    const score = Number(value || 0);

    return (

        <div className="mb-3">

            <div className="mb-1 flex items-center justify-between">

                <span className="text-sm text-slate-300">
                    {label}
                </span>

                <span
                    className="font-semibold"
                    style={{ color }}
                >
                    {score.toFixed(1)}
                </span>

            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">

                <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                        width: `${Math.min(score, 100)}%`,
                        background: color,
                    }}
                />

            </div>

        </div>

    );

}