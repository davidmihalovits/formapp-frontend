import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "./Stats.sass";

const Stats = () => {
    const devprodUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8888/.netlify/functions"
            : "https://awesome-minsky-48a20a.netlify.app/.netlify/functions";

    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(false);

    const getForms = async () => {
        setLoading(true);

        const token = localStorage.getItem("token");

        if (!token) {
            return console.log("No token.");
        }

        await fetch(`${devprodUrl}/getForms`, {
            method: "GET",
            headers: {
                Authorization: token,
            },
        })
            .then((res) => res.json())
            .then((data) => setForms(data));

        setLoading(false);
    };

    useEffect(() => {
        getForms();

        // eslint-disable-next-line
    }, []);

    const pending =
        forms && forms.filter((f) => f.approved.toLowerCase() === "pending");
    const approved =
        forms && forms.filter((f) => f.approved.toLowerCase() === "approved");
    const rejected =
        forms && forms.filter((f) => f.approved.toLowerCase() === "rejected");

    const data = [
        { name: "Pending", value: pending.length, color: "#FFCA28" },
        { name: "Approved", value: approved.length, color: "#28b834" },
        { name: "Rejected", value: rejected.length, color: "#dd1572" },
    ];

    return (
        <div className="statsContainer">
            {loading ? (
                "Loading stats..."
            ) : (
                <div className="statsContainerBox">
                    <div className="statsContainerChart">
                        <ResponsiveContainer width="100%" aspect={1}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    labelLine={false}
                                    outerRadius="100%"
                                    animationBegin={0}
                                    animationDuration={1000}
                                    dataKey="value"
                                >
                                    {data.map((f, key) => (
                                        <Cell key={key} fill={f.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="statsContainerInfo">
                        <div className="statsContainerInfoBox">
                            <div
                                className="statsContainerInfoCircle"
                                style={{ backgroundColor: "#FFCA28" }}
                            ></div>
                            <p className="statsContainerInfoText">
                                Pending: {pending.length}
                            </p>
                        </div>
                        <div className="statsContainerInfoBox">
                            <div
                                className="statsContainerInfoCircle"
                                style={{ backgroundColor: "#28b834" }}
                            ></div>
                            <p className="statsContainerInfoText">
                                Approved: {approved.length}
                            </p>
                        </div>
                        <div className="statsContainerInfoBox">
                            <div
                                className="statsContainerInfoCircle"
                                style={{ backgroundColor: "#dd1572" }}
                            ></div>
                            <p className="statsContainerInfoText">
                                Rejected: {rejected.length}
                            </p>
                        </div>
                        <div className="statsContainerInfoBox">
                            <div
                                className="statsContainerInfoCircle"
                                style={{ backgroundColor: "#272724" }}
                            ></div>
                            <p className="statsContainerInfoText">
                                Total: {forms.length}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Stats;
