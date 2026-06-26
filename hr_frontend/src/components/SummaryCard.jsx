const colorMap = {

    purple: {
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        text: "text-purple-400",
    },

    blue: {
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        text: "text-blue-400",
    },

    green: {
        bg: "bg-green-500/10",
        border: "border-green-500/30",
        text: "text-green-400",
    },

    yellow: {
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30",
        text: "text-yellow-400",
    },

    red: {
        bg: "bg-red-500/10",
        border: "border-red-500/30",
        text: "text-red-400",
    }

};

export default function SummaryCard({

    title,
    value,
    color = "blue"

}) {

    const c = colorMap[color];

    return (

        <div
            className={`rounded-xl border ${c.border} ${c.bg} p-3`}
        >

            <div className="text-xs uppercase tracking-widest text-slate-500">

                {title}

            </div>

            <div
                className={`mt-2 text-2xl font-bold ${c.text}`}
            >

                {value}

            </div>

        </div>

    );

}