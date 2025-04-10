import React, { useState, useEffect } from "react";
import "../Cards.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function ProfilePage()
{
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState();

    


    useEffect(()=>{
        setToken(localStorage.getItem("authToken"));
    },[])


    return (
        <>
        {token ? (
            <div className="creator-container">
            <p>Welcome, {userName}!</p>
            <p>E-mail address for this account: {email}</p>
            {/* Saves would go here if we had them */}
            </div>
            ):null}
        </>
        
    )
}

export default ProfilePage