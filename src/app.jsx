import React from "react";
import ReactDOM from "react-dom";
import { Pokedex } from "./components/pokedex";
import './styles/styles.css';

const App = () => {
    return (
        <div id="main-container">
            <Pokedex />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));