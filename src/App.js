import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { GlobalStyle } from "./GlobalStyle";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import SignInInject from "./components/SignInInject";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Route path="/" exact component={Home}></Route>
                <Route path="/signInInject" component={SignInInject}></Route>
            </div>
        </Router>
    );
}

export default App;
