import "./Profile.sass";
import { useState } from "react";

const Profile = (props) => {
    const devprodUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8888/.netlify/functions"
            : "https://awesome-minsky-48a20a.netlify.app/.netlify/functions";

    const [emailNotifications, setEmailNotifications] = useState(false);

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
                <p className="profileText">{props.user && props.user.email}</p>
                {props.user && props.user.supervisorRole ? (
                    <p className="profileText">
                        {props.user.role}
                        <br />
                        {props.user.supervisorRole === "TA" && "Travel Advisor"}
                        {props.user.supervisorRole === "TM" && "Task Monitor"}
                        {props.user.supervisorRole === "PL" &&
                            "Group/Project Lead"}
                        {props.user.supervisorRole === "PM" &&
                            "Program Manager"}
                        {props.user.supervisorRole === "CO" &&
                            "Contracting Officer"}
                    </p>
                ) : (
                    <p className="profileText">
                        {props.user && props.user.role}
                    </p>
                )}
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
                <div className="profileCheckboxText">
                    <p className="profileText">Email Notifications</p>
                    <div
                        className="profileCheckbox"
                        onClick={() =>
                            setEmailNotifications(!emailNotifications)
                        }
                    >
                        {!emailNotifications ? (
                            <div className="profileCheckboxCircleOff"></div>
                        ) : (
                            <div className="profileCheckboxCircleOn"></div>
                        )}
                    </div>
                </div>
                <div className="profileLine"></div>
                {props.user && props.user.role !== "Traveler" && (
                    <>
                        <p className="profileText">Pick a role:</p>
                        <button
                            className="profileButtonRole"
                            style={{
                                background: "#90CAF9",
                                border: "1px solid #90CAF9",
                            }}
                            onClick={() => pickSupervisorRole("TA")}
                        >
                            Travel Advisor
                        </button>
                        <button
                            className="profileButtonRole"
                            style={{
                                background: "#FF8A65",
                                border: "1px solid #FF8A65",
                            }}
                            onClick={() => pickSupervisorRole("TM")}
                        >
                            Task Monitor
                        </button>
                        <button
                            className="profileButtonRole"
                            style={{
                                background: "#2196F3",
                                border: "1px solid #2196F3",
                            }}
                            onClick={() => pickSupervisorRole("PL")}
                        >
                            Group/Project Lead
                        </button>
                        <button
                            className="profileButtonRole"
                            style={{
                                background: "#1565C0",
                                border: "1px solid #1565C0",
                            }}
                            onClick={() => pickSupervisorRole("PM")}
                        >
                            Program Manager
                        </button>
                        <button
                            className="profileButtonRole"
                            style={{
                                background: "#FF5722",
                                border: "1px solid #FF5722",
                            }}
                            onClick={() => pickSupervisorRole("CO")}
                        >
                            Contracting Officer
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
