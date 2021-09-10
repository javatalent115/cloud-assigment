import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { GlobalStyle } from "./GlobalStyle";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import SignInInject from "./components/SignUp";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import SignIn from "./components/SignIn";
import Information from "./components/Information";
import ValidationPage from "./components/ValidationPage";
function App() {
    let accountState = localStorage.getItem("account");
    const [account, setAccount] = useState(JSON.parse(accountState));
    const [avatar, setAvatar] = useState("");
    const handleAvatar = (img) => {
        setAvatar(img);
    };
    useEffect(() => {
        console.log(localStorage.getItem("account"));
        if (localStorage.getItem("account") !== null) {
            localStorage.setItem("account", accountState);
        } else {
            localStorage.setItem("account", false);
        }
    }, [account]);

    const handleSignUp = () => {
        console.log("hello");
    };
    const handleSignIn = () => {
        localStorage.setItem("account", true);
        setAccount(true);
        window.location.reload();
    };
    const handleSignOut = () => {
        localStorage.setItem("account", false);
        setAccount(false);
    };
    console.log(avatar);
    return (
        <Router>
            <div className="App">
                <Navbar account={account} handleSignOut={handleSignOut} avatar={avatar} />
                <Route path="/" exact>
                    <Home></Home>
                </Route>
                <Route path="/home" exact>
                    <Home></Home>
                </Route>
                <Route path="/signUp">
                    <SignUp handleSignUp={handleSignUp}></SignUp>
                </Route>
                <Route path="/signIn">
                    <SignIn
                        handleSignIn={handleSignIn}
                        setAvatar={setAvatar}
                        handleAvatar={handleAvatar}
                    ></SignIn>
                </Route>
                <Route path="/information">
                    <Information></Information>
                </Route>
                <Route path="/validationPage">
                    <ValidationPage></ValidationPage>
                </Route>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
