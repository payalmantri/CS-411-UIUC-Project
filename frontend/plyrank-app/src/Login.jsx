import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from './constants';

const Login = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
    const navigate = useNavigate();
    const users = [
        {
            username: "test",
            password: "test"
        }]
    const handleSubmit = (e) => {
        console.log("Test");
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: username, password_hash: password })
        };
        fetch(`${BASE_URL}/login`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.isAuthenticated == true) {
                    setauthenticated(true)
                    localStorage.setItem("authenticated", true);
                    localStorage.setItem("userId", data.userId)
                    navigate("/Home");
                }
                else {
                    console.error("Could not login");
                }
            });
        // const account = users.find((user) => user.username === username);
        // if (account && account.password === password) {
        //     setauthenticated(true)
        //     localStorage.setItem("authenticated", true);
        //     navigate("/Home");
        // }
    };

    const navigateToRegister = () => {
        navigate("/Register");
    }
    return (
        <div>
            <p>Welcome Back</p>
            <form onSubmit={handleSubmit}>
                Username:
                <input
                    type="text"
                    name="Username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                />
                <input
                    type="password"
                    name="Password"
                    onChange={(e) => setpassword(e.target.value)}
                />
                <input type="submit" value="Submit" />
            </form>
            <button onClick={navigateToRegister}>Don't have an account? Register here</button>
        </div>
    )
};


export default Login;