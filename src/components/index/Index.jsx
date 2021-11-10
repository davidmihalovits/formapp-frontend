import "./Index.sass";
import { useState } from "react";

const Index = () => {
    const devprodUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8888/.netlify/functions"
            : "https://awesome-minsky-48a20a.netlify.app/.netlify/functions";

    const [email, setEmail] = useState("");
    const [travelerRole, setTravelerRole] = useState("");
    const [supervisorRole, setSupervisorRole] = useState("");
    const [credential, setCredential] = useState("");
    const [code, setCode] = useState("");
    const [loginCodeSent, setLoginCodeSent] = useState(false);

    const register = async (e) => {
        e.preventDefault();

        await fetch(`${devprodUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                role: `${travelerRole}${supervisorRole}`,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data === "Choose a role.") {
                    return alert(data);
                } else {
                    alert(data);
                    return window.location.reload();
                }
            });
    };

    const loginRequest = async (e) => {
        e.preventDefault();

        await fetch(`${devprodUrl}/loginRequest`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                credential: credential,
            }),
        })
            .then((res) => res.json())
            .then((data) => alert(data))
            .then(() => setLoginCodeSent(true));
    };

    const login = async (e) => {
        e.preventDefault();

        await fetch(`${devprodUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code: code,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data === "Wrong login code.") return alert(data);
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    return window.location.reload();
                }
            });
    };

    return (
        <div className="indexContainer">
            <div className="index">
                <div className="indexBox">
                    <h1 className="indexBoxTitle">Login</h1>

                    {loginCodeSent ? (
                        <>
                            <input
                                id="code"
                                name="code"
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="indexBoxInput"
                                placeholder="Enter login code"
                            />
                            <button className="indexBoxButton" onClick={login}>
                                Login
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={credential}
                                onChange={(e) => setCredential(e.target.value)}
                                className="indexBoxInput"
                                placeholder="Your email address"
                            />
                            <button
                                className="indexBoxButton"
                                onClick={loginRequest}
                            >
                                Request login code
                            </button>
                        </>
                    )}
                </div>
                <div className="indexBox">
                    <h1 className="indexBoxTitle">Register</h1>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="indexBoxInput"
                        placeholder="Your email address"
                    />
                    <div className="indexBoxRadioText">
                        <div
                            className="indexBoxRadio"
                            onClick={() => {
                                if (travelerRole === "Traveler") {
                                    return setTravelerRole("");
                                }
                                setTravelerRole("Traveler");
                            }}
                        >
                            {travelerRole && (
                                <span className="indexBoxRadioCheckmark"></span>
                            )}
                        </div>
                        <p className="indexBoxText">Traveler</p>
                    </div>
                    <div className="indexBoxRadioText">
                        <div
                            className="indexBoxRadio"
                            onClick={() => {
                                if (supervisorRole === "Supervisor") {
                                    return setSupervisorRole("");
                                }
                                setSupervisorRole("Supervisor");
                            }}
                        >
                            {supervisorRole && (
                                <span className="indexBoxRadioCheckmark"></span>
                            )}
                        </div>
                        <p className="indexBoxText">Supervisor</p>
                    </div>
                    <button className="indexBoxButton" onClick={register}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Index;
