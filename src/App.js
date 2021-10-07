import "./App.sass";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Form from "./components/form/Form";
import Index from "./components/index/Index";

const App = () => {
    return (
        <BrowserRouter>
            <>
                <Navbar />
                <Switch>
                    <Route exact path="/">
                        {localStorage.getItem("token") ? (
                            <Redirect to="/form" />
                        ) : (
                            <Index />
                        )}
                    </Route>
                    <Route exact path="/form">
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
