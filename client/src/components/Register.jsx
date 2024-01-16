import React, { useState } from "react";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <h1>Register</h1>
            <form>
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
                <button>Register for an account.</button>
            </form>
        </>
    );

}

export default Register;