import "./App.sass";
import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";
import Notification from "./components/notification/Notification";
import Submit from "./components/submit/Submit";
import Index from "./components/index/Index";
import Pending from "./components/pending/Pending";
import Approved from "./components/approved/Approved";
import Rejected from "./components/rejected/Rejected";
import Form from "./components/form/Form";

const App = () => {
    const devprodUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8888/.netlify/functions"
            : "https://awesome-minsky-48a20a.netlify.app/.netlify/functions";

    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);

    const getUser = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
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

    return (
        <BrowserRouter>
            <>
                <Navbar user={user} notifications={notifications} />
                <Switch>
                    <Route exact path="/">
                        {localStorage.getItem("token") ? (
                            <Redirect to="/profile" />
                        ) : (
                            <Index />
                        )}
                    </Route>
                    <Route exact path="/profile">
                        {!localStorage.getItem("token") ? (
                            <Redirect to="/" />
                        ) : (
                            <Profile user={user} />
                        )}
                    </Route>
                    <Route exact path="/notification">
                        {!localStorage.getItem("token") ? (
                            <Redirect to="/" />
                        ) : (
                            <Notification
                                user={user}
                                notifications={notifications}
                                getNotifications={getNotifications}
                            />
                        )}
                    </Route>
                    <Route exact path="/submit">
                        {!localStorage.getItem("token") ? (
                            <Redirect to="/" />
                        ) : (
                            <Submit user={user} />
                        )}
                    </Route>
                    <Route exact path="/pending">
                        {!localStorage.getItem("token") ? (
                            <Redirect to="/" />
                        ) : (
                            <Pending />
                        )}
                    </Route>
                    <Route exact path="/pending/:id">
                        {!localStorage.getItem("token") ? (
                            <Redirect to="/" />
                        ) : (
                            <Route
                                exact
                                path="/pending/:id"
                                render={(props) => (
                                    <Form {...props} user={user} />
                                )}
                            />
                        )}
                    </Route>
                    <Route exact path="/approved">
                        {!localStorage.getItem("token") ? (
                            <Redirect to="/" />
                        ) : (
                            <Approved />
                        )}
                    </Route>
                    <Route exact path="/approved/:id">
                        {!localStorage.getItem("token") ? (
                            <Redirect to="/" />
                        ) : (
                            <Route
                                exact
                                path="/approved/:id"
                                render={(props) => (
                                    <Form {...props} user={user} />
                                )}
                            />
                        )}
                    </Route>
                    <Route exact path="/rejected">
                        {!localStorage.getItem("token") ? (
                            <Redirect to="/" />
                        ) : (
                            <Rejected />
                        )}
                    </Route>
                    <Route exact path="/rejected/:id">
                        {!localStorage.getItem("token") ? (
                            <Redirect to="/" />
                        ) : (
                            <Route
                                exact
                                path="/rejected/:id"
                                render={(props) => (
                                    <Form {...props} user={user} />
                                )}
                            />
                        )}
                    </Route>
                </Switch>
            </>
        </BrowserRouter>
    );
};

export default App;
