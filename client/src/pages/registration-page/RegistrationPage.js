import './registrationPageStyleSheet.css';

function RegistrationPage() {
    const registerUser = async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const firstName = document.getElementById('firstName').value; 
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;

        try {
            // send request to server
            const response = await fetch('http://localhost:3002/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, firstName, lastName, email }),
            });

            if (response.ok) {
                console.log('User registered successfully'); // successful msg
            } else {
                console.error('Error registering user'); // error msg
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

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
                    <button id="submit" className="btn" onClick={registerUser}> Submit </button> <br /> <br /> <br />
                </div>
            </div>
        </>
    );
}

export default RegistrationPage;
