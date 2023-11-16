import './loginPageStyleSheet.css';
import {Link} from "react-router-dom";
import {Navigate} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import Axios from 'axios';



function LoginPage() {

    const navigate = useNavigate();

    const handleClick = () => {
        Axios.post('http://localhost:3001/login', {
            username : document.getElementById("username").value,
            password : document.getElementById("password").value
        }).then(res => res.data.isAuthenticated ? navigate("/home", {state : {isAuthenticated : true, userID : res.data.UserID}}) : console.log(res)).catch(error => console.log(error));
    }

    const isAuthenticated = (authenticated) => authenticated ? navigate("/home")  : console.log("NOT VALIDATED");
 
    return (
        <>
            <div className="loginPage">
                <div className="header"> Login </div>
                    <div className="form">
                            <h2 className="subHeader"> Username </h2>
                            <input id="username" />
                            <h2 className="subHeader"> Password</h2>
                            <input id="password" /> <br />
                            <button id="submit" className="btn" onClick={handleClick}> Submit </button> <br /> <br /> <br />
                            <button id="forgotPassword" className="btn"> Forgot Login </button>
                            <Link to="/register" >
                                <button id="createAccount" className="btn"> Create Account </button>
                            </Link>
                    </div>
            </div>
        </>
    );
}

export default LoginPage
