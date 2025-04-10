import React, { useState, useEffect, useContext } from "react";
import "../Cards.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserIdContext } from "../UserContext";

function ProfilePage()
{
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState();

    const {UserId} = useContext(UserIdContext)

    setToken(localStorage.getItem("authToken"));


    useEffect(()=>{

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