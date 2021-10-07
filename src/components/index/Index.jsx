import "./Index.sass";
import { useState } from "react";

const Index = () => {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [credential, setCredential] = useState("");
    const [code, setCode] = useState("");
    const [loginCodeSent, setLoginCodeSent] = useState(false);

    const register = async (e) => {
        e.preventDefault();

        await fetch(
            "https://awesome-minsky-48a20a.netlify.app/.netlify/functions/register",
            //"http://localhost:8888/.netlify/functions/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    role: role,
                }),
            }
        )
            .then((res) => res.json())
            .then((data) => alert(data));
    };

    const loginRequest = async (e) => {
        e.preventDefault();

        await fetch(
            "https://awesome-minsky-48a20a.netlify.app/.netlify/functions/loginRequest",
            //"http://localhost:8888/.netlify/functions/loginRequest",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    credential: credential,
                }),
            }
        )
            .then((res) => res.json())
            .then((data) => alert(data))
            .then(() => setLoginCodeSent(true));
    };

    const login = async (e) => {
        e.preventDefault();

        await fetch(
            "https://awesome-minsky-48a20a.netlify.app/.netlify/functions/login",
            //"http://localhost:8888/.netlify/functions/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: code,
                }),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data === "Wrong login code.") alert(data);
                if (data.token) localStorage.setItem("token", data.token);
                window.location.reload();
            });
    };

    return (
        <div className="indexContainer">
            <div className="index">
                <div className="indexBox">
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
                            onClick={() => setRole("Traveler")}
                        >
                            {role === "Traveler" && (
                                <span className="indexBoxRadioCheckmark"></span>
                            )}
                        </div>
                        <p className="indexBoxText">Traveler</p>
                    </div>
                    <div className="indexBoxRadioText">
                        <div
                            className="indexBoxRadio"
                            onClick={() => setRole("Supervisor")}
                        >
                            {role === "Supervisor" && (
                                <span className="indexBoxRadioCheckmark"></span>
                            )}
                        </div>
                        <p className="indexBoxText">Supervisor</p>
                    </div>
                    <button className="indexBoxButton" onClick={register}>
                        Register
                    </button>
                </div>
                <div className="indexBox">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        className="indexBoxInput"
                        placeholder="Your email address"
                    />
                    <button className="indexBoxButton" onClick={loginRequest}>
                        Request login code
                    </button>
                </div>
                {loginCodeSent && (
                    <div className="indexBox">
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default Index;
