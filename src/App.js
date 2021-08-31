import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { GlobalStyle } from "./GlobalStyle";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import SignInInject from "./components/SignInInject";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignUp from "./components/SignIn";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
function App() {
    let accountState = localStorage.getItem("account");
    const [account, setAccount] = useState(JSON.parse(accountState));

    useEffect(() => {
        console.log(localStorage.getItem("account"));
        if (localStorage.getItem("account") !== null) {
            localStorage.setItem("account", accountState);
        } else {
            localStorage.setItem("account", false);
        }
    }, [account]);

    const handleSignIn = () => {
        setAccount(true);
    };
    const handleSignOut = () => {
        localStorage.setItem("account", false);
        setAccount(false);
    };
    return (
        <Router>
            <div className="App">
                <Navbar account={account} handleSignOut={handleSignOut} />
                <Route path="/" exact>
                    <Home></Home>
                </Route>
                <Route path="/signInInject">
                    <SignInInject handleSignIn={handleSignIn}></SignInInject>
                </Route>
                <Route path="/signUp" component={SignUp}></Route>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
