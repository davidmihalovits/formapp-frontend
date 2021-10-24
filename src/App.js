import "./App.sass";
import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "./components/navbar/Navbar";
import Submit from "./components/submit/Submit";
import Index from "./components/index/Index";
import Pending from "./components/pending/Pending";
import Approved from "./components/approved/Approved";
import Rejected from "./components/rejected/Rejected";
import Form from "./components/form/Form";

const App = () => {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            return console.log("No token.");
        }

        await fetch(
            "https://awesome-minsky-48a20a.netlify.app/.netlify/functions/getUser",
            //"http://localhost:8888/.netlify/functions/getUser",
            {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            }
        )
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
    }, []);

    return (
        <BrowserRouter>
            <>
                <Navbar user={user} />
                <Switch>
                    <Route exact path="/">
                        {localStorage.getItem("token") ? (
                            <Redirect to="/pending" />
                        ) : (
                            <Index />
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
