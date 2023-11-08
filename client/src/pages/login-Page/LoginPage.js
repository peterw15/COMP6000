import './loginPageStyleSheet.css';
import {Link} from "react-router-dom";

function LoginPage() {
    return (
        <>
            <div className="loginPage">
                <div className="header"> Login </div>
                <div className="form">
                    <h2 className="subHeader"> Username </h2>
                    <input id="username" />
                    <h2 className="subHeader"> Password</h2>
                    <input id="password" /> <br />
                    <button id="submit" className="btn"> Submit </button> <br /> <br /> <br />
                    <button id="forgotPassword" className="btn"> Forgot Login </button>
                    <Link to="/register">
                        <button id="createAccount" className="btn"> Create Account </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default LoginPage
