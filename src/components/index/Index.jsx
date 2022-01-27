import "./Index.sass";
import { useState } from "react";

const Index = () => {
    const devprodUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8888/.netlify/functions"
            : "https://awesome-minsky-48a20a.netlify.app/.netlify/functions";

    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const [loading, setLoading] = useState(false);
    const [errorMessageLogin, setErrorMessageLogin] = useState("");
    const [errorMessageRegister, setErrorMessageRegister] = useState("");
    const [credential, setCredential] = useState("");
    const [code, setCode] = useState("");
    const [loginCodeSent, setLoginCodeSent] = useState(false);

    const register = async (e) => {
        e.preventDefault();

        setErrorMessageRegister("");
        setLoading(true);

        await fetch(`${devprodUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                role: role,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data === "User already registered.") {
                    setLoading(false);
                    return setErrorMessageRegister("User already registered.");
                } else {
                    setLoading(false);
                    alert(data);
                    return window.location.reload();
                }
            });
    };

    const loginRequest = async (e) => {
        e.preventDefault();

        setErrorMessageLogin("");
        setLoading(true);

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
            .then((data) => {
                console.log(data);
                if (data === "User not found.") {
                    setLoading(false);
                    return setErrorMessageLogin(data);
                }
                if (data.includes("Login code sent to")) {
                    setLoading(false);
                    return setLoginCodeSent(true);
                }
            });
    };

    const login = async (e) => {
        e.preventDefault();

        setErrorMessageLogin("");
        setLoading(true);

        await fetch(`${devprodUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code: code,
                credential: credential,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data === "Wrong login code.") {
                    setLoading(false);
                    return setErrorMessageLogin(data);
                }
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    setLoading(false);
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
                                placeholder="Login code"
                            />
                            <button
                                className="indexBoxButton"
                                onClick={login}
                                disabled={loading || !code}
                            >
                                {loading && code ? "Loading..." : "Login"}
                            </button>
                            <p className="indexBoxVerbage">
                                Please check your email for the login code.
                            </p>
                            {errorMessageLogin && (
                                <p className="indexBoxError">
                                    {errorMessageLogin}
                                </p>
                            )}
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
                                placeholder="Email address"
                            />
                            <button
                                className="indexBoxButton"
                                onClick={loginRequest}
                                disabled={loading || !credential}
                            >
                                {loading && credential
                                    ? "Loading..."
                                    : "Request login code"}
                            </button>
                            {errorMessageLogin && (
                                <p className="indexBoxError">
                                    {errorMessageLogin}
                                </p>
                            )}
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
                        placeholder="Email address"
                    />
                    <div className="indexBoxRadioText">
                        <div
                            className="indexBoxRadio"
                            onClick={() => {
                                if (role === "Supervisor") {
                                    return setRole("TravelerSupervisor");
                                }
                                if (role === "Traveler") {
                                    return setRole("");
                                }
                                if (role === "TravelerSupervisor") {
                                    return setRole("Supervisor");
                                }
                                return setRole("Traveler");
                            }}
                        >
                            {(role === "Traveler" ||
                                role === "TravelerSupervisor") && (
                                <span className="indexBoxRadioCheckmark"></span>
                            )}
                        </div>
                        <p className="indexBoxText">Traveler</p>
                    </div>
                    <div className="indexBoxRadioText">
                        <div
                            className="indexBoxRadio"
                            onClick={() => {
                                if (role === "Traveler") {
                                    return setRole("TravelerSupervisor");
                                }
                                if (role === "Supervisor") {
                                    return setRole("");
                                }
                                if (role === "TravelerSupervisor") {
                                    return setRole("Traveler");
                                }
                                return setRole("Supervisor");
                            }}
                        >
                            {(role === "Supervisor" ||
                                role === "TravelerSupervisor") && (
                                <span className="indexBoxRadioCheckmark"></span>
                            )}
                        </div>
                        <p className="indexBoxText">Supervisor</p>
                    </div>
                    <button
                        className="indexBoxButton"
                        onClick={register}
                        disabled={loading || !email || !role}
                    >
                        {loading && email && role ? "Loading..." : "Register"}
                    </button>
                    {errorMessageRegister && (
                        <p className="indexBoxError">{errorMessageRegister}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Index;
