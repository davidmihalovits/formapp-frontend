import "./App.sass";
import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Submit from "./components/submit/Submit";
import Index from "./components/index/Index";
import Pending from "./components/pending/Pending";
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

    useEffect(() => {
        getUser();
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
                            <Submit />
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
                            <Form />
                        )}
                    </Route>
                </Switch>
            </>
        </BrowserRouter>
    );
};

export default App;
