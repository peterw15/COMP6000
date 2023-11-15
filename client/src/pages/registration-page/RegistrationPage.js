import './registrationPageStyleSheet.css';
import {Link} from "react-router-dom";


function RegistationPage() {
    return (
        <>
            <div className="registrationPage">
                <div className="header"> Register </div>
                <div className="form">
                    <h2 className="subHeader"> Username </h2>
                    <input id="username" />
                    <h2 className="subHeader"> Password</h2>
                    <input id="password" type="password" /> <br />
                    <h2 className="subHeader"> First Name </h2>
                    <input id="firstName" />
                    <h2 className="subHeader"> Last Name </h2>
                    <input id="lastName" />
                    <h2 className="subHeader"> Email </h2>
                    <input id="email" /> <br /> <br /> <br />
                    <button id="submit" className="btn"> Submit </button> <br /> <br /> <br />
                    <Link to="/login" >
                        <button id="Login" className="btn"> Login Instead </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default RegistationPage
