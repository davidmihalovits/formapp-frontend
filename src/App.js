import "./App.sass";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";
import Notification from "./components/notification/Notification";
import Stats from "./components/stats/Stats";
import Submit from "./components/submit/Submit";
import SubmitFormTravel from "./components/submitFormTravel/SubmitFormTravel";
import SubmitFormWork from "./components/submitFormWork/SubmitFormWork";
import Index from "./components/index/Index";
import Form from "./components/form/Form";
import Forms from "./components/forms/Forms";

const App = () => {
    const token = localStorage.getItem("token");

    const devprodUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8888/.netlify/functions"
            : "https://awesome-minsky-48a20a.netlify.app/.netlify/functions";

    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUser = async () => {
        setLoading(true);

        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return console.log("No token.");
        }

        await fetch(`${devprodUrl}/getUser`, {
            method: "GET",
            headers: {
                Authorization: token,
            },
        })
            .then((res) => res.json())
            .then((data) => setUser(data));

        setLoading(false);
    };

    const logoutTokenExpired = async () => {
        var token = localStorage.getItem("token");
        var decoded = jwt_decode(token);

        const tokenExpired = new Date(decoded.exp * 1000);
        const timeNow = new Date();

        if (tokenExpired < timeNow) {
            localStorage.removeItem("token");
            window.location.reload();
        }
    };

    useEffect(() => {
        getUser();

        var token = localStorage.getItem("token");
        if (token) logoutTokenExpired();

        // eslint-disable-next-line
    }, []);

    const getNotifications = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            return console.log("No token.");
        }

        await fetch(`${devprodUrl}/getNotifications`, {
            method: "GET",
            headers: {
                Authorization: token,
            },
        })
            .then((res) => res.json())
            .then((data) => setNotifications(data));
    };

    useEffect(() => {
        getNotifications();

        // eslint-disable-next-line
    }, []);

    if (loading) {
        return (
            <div
                style={{
                    height: "100vh",
                    display: "grid",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "26px",
                }}
            >
                Loading app...
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Navbar user={user} notifications={notifications} />

            <Routes>
                <Route
                    exact
                    path="/"
                    element={!token ? <Index /> : <Navigate to="/forms" />}
                />

                <Route exact path="/forms" element={<ProtectedRoute />}>
                    <Route
                        exact
                        path="/forms"
                        element={<Forms user={user} />}
                    />
                </Route>

                <Route exact path="/profile" element={<ProtectedRoute />}>
                    <Route
                        exact
                        path="/profile"
                        element={<Profile user={user} />}
                    />
                </Route>

                <Route exact path="/notification" element={<ProtectedRoute />}>
                    <Route
                        exact
                        path="/notification"
                        element={
                            <Notification
                                user={user}
                                notifications={notifications}
                                getNotifications={getNotifications}
                            />
                        }
                    />
                </Route>

                <Route exact path="/stats" element={<ProtectedRoute />}>
                    <Route exact path="/stats" element={<Stats />} />
                </Route>

                <Route exact path="/submit" element={<ProtectedRoute />}>
                    <Route exact path="/submit" element={<Submit />} />
                </Route>

                <Route exact path="/submit/travel" element={<ProtectedRoute />}>
                    <Route
                        exact
                        path="/submit/travel"
                        element={<SubmitFormTravel user={user} />}
                    />
                </Route>

                <Route exact path="/submit/work" element={<ProtectedRoute />}>
                    <Route
                        exact
                        path="/submit/work"
                        element={<SubmitFormWork user={user} />}
                    />
                </Route>

                <Route exact path="/form/:id" element={<ProtectedRoute />}>
                    <Route
                        exact
                        path="/form/:id"
                        element={<Form user={user} />}
                    />
                </Route>

                <Route path="*" element={<Index />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
