import React, { useState, useEffect } from "react";

const Dashboard = () => {

    const [name, setName] = useState("");

    const getName = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token } 
            });

            const parseResponse = await response.json();

            //console.log(parseResponse);
            
            setName(parseResponse.user_name);

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getName()
    }, [])

    return (
        <>
            <h1>Dashboard</h1>
            <p>Welcome, {name}!</p>
        </>
    );

}

export default Dashboard;