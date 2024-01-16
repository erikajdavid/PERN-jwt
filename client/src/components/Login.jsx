import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Login = ({ setAuth }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = {
                email,
                password
            }

            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseResponse = await response.json();

            console.log(parseResponse);

            localStorage.setItem("token", parseResponse.accessToken);

            setAuth(true);
            
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={onSubmitForm}>

                <label htmlFor="email"></label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email:"
                    required
                />

                <label htmlFor="password"></label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password:"
                    required
                />

                <button>Log in</button>
                <Link to="/register">Register</Link>
            </form>
        </>
    );

}

export default Login;