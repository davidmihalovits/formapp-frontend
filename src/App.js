import "./App.sass";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Form from "./components/form/Form";
import Navbar from "./components/navbar/Navbar";

const App = () => {
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
