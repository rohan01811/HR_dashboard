export function perfInfo(score) {

    if (score >= 90) {

        return {

            label: "Excellent",

            color: "#22c55e",

            bg: "rgba(34,197,94,0.10)",

            border: "#22c55e55"

        };

    }

    if (score >= 80) {

        return {

            label: "Very Good",

            color: "#3b82f6",

            bg: "rgba(59,130,246,0.10)",

            border: "#3b82f655"

        };

    }

    if (score >= 70) {

        return {

            label: "Good",

            color: "#f59e0b",

            bg: "rgba(245,158,11,0.10)",

            border: "#f59e0b55"

        };

    }

    if (score >= 60) {

        return {

            label: "Average",

            color: "#fb923c",

            bg: "rgba(251,146,60,0.10)",

            border: "#fb923c55"

        };

    }

    return {

        label: "Needs Improvement",

        color: "#ef4444",

        bg: "rgba(239,68,68,0.10)",

        border: "#ef444455"

    };

}