import "./Profile.sass";

const Profile = (props) => {
    const devprodUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8888/.netlify/functions"
            : "https://awesome-minsky-48a20a.netlify.app/.netlify/functions";

    const pickSupervisorRole = async (supervisorRole) => {
        const token = localStorage.getItem("token");

        if (!token) {
            return console.log("No token.");
        }

        await fetch(`${devprodUrl}/supervisorRole`, {
            method: "PUT",
            headers: {
                Authorization: token,
            },
            body: JSON.stringify({ supervisorRole: supervisorRole }),
        })
            .then((res) => res.json())
            .then((data) => alert(data));

        return window.location.reload();
    };

    return (
        <div className="profileContainer">
            <div className="profile">
                <p className="profileText">
                    Logged in as{" "}
                    <span style={{ fontWeight: "700" }}>
                        {props.user && props.user.email}
                    </span>
                    {props.user && props.user.supervisorRole ? (
                        <span> as Supervisor/{props.user.supervisorRole}</span>
                    ) : (
                        <span> as Traveler</span>
                    )}
                    .
                </p>
                <button
                    className="profileButton"
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.reload();
                    }}
                >
                    Logout
                </button>
                <div className="profileLine"></div>
                {props.user && props.user.role !== "Traveler" && (
                    <>
                        <p className="profileText">Pick a role:</p>
                        <button
                            className="profileButtonRole"
                            style={{ background: "#90CAF9" }}
                            onClick={() => pickSupervisorRole("TA")}
                        >
                            TA
                        </button>
                        <button
                            className="profileButtonRole"
                            style={{ background: "#FF8A65" }}
                            onClick={() => pickSupervisorRole("TM")}
                        >
                            TM
                        </button>
                        <button
                            className="profileButtonRole"
                            style={{ background: "#2196F3" }}
                            onClick={() => pickSupervisorRole("PL")}
                        >
                            PL
                        </button>
                        <button
                            className="profileButtonRole"
                            style={{ background: "#1565C0" }}
                            onClick={() => pickSupervisorRole("PM")}
                        >
                            PM
                        </button>
                        <button
                            className="profileButtonRole"
                            style={{ background: "#FF5722" }}
                            onClick={() => pickSupervisorRole("CO")}
                        >
                            CO
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
