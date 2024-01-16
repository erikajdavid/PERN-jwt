import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Register = ({ setAuth }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = {
                email,
                password,
                name
            }; 

            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: { "Content-type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseResponse = await response.json();
            
            console.log(parseResponse);

            //if successful, you'll get an access token. save it in local storage. 

            localStorage.setItem("token", parseResponse.accessToken);

            setAuth(true);
            
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="name"></label>
                <input 
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name:"
                    required
                />

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

                <button>Register for an account</button>
                <Link to="/login">Login</Link>
            </form>
        </>
    );

}

export default Register;