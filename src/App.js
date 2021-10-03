import "./App.sass";
import { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Form from "./components/form/Form";
import Navbar from "./components/navbar/Navbar";

const App = () => {
    useEffect(() => {
        // https://dreamy-poincare-c504b4.netlify.app/.netlify/functions/db
        fetch("http://localhost:8888/.netlify/functions/db")
            .then((res) => res.json())
            .then((data) => console.log(data));
    }, []);

    return (
        <BrowserRouter>
            <>
                <Navbar />
                <Switch>
                    <Route exact path="/form" component={Form} />
                </Switch>
            </>
        </BrowserRouter>
    );
};

export default App;
