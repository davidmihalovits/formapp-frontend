import "./App.sass";
import { useEffect } from "react";
import Form from "./components/form/Form";

const App = () => {
    useEffect(() => {
        fetch(
            "https://dreamy-poincare-c504b4.netlify.app/.netlify/functions/db"
        )
            .then((response) => response.json())
            .then((data) => console.log(data));
    }, []);

    return <Form />;
};

export default App;
