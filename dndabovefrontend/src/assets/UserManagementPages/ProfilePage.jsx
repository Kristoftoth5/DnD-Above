import React, { useState, useEffect, useContext } from "react";
import "../Cards.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserIdContext } from "../UserContext";
import fetchEverything from "../CommonFunctions/fetchEverything";

function ProfilePage()
{
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState();

    const {UserId} = useContext(UserIdContext)

    


    useEffect(()=>{
        var temp = "";
        var temp2 = "";
        setToken(localStorage.getItem("authToken"));
        async function fetchuserdata()
        {
            if(UserId !== 0)
                {
                    const userdataresponse = await fetch('https://localhost:7188/api/Auth/3', {
                        method: 'GET',
                        headers: {
                          'Authorization': `Bearer ${token}`,
                          'Content-Type': 'application/json',
                        },
                      })
                      .then(response => response.json())
                      .then(data => {
                        console.log('Protected data:', data);
                        temp = data.email;
                        temp2 = data.userName;
                      })
                      .catch(error => {
                        console.error('Error:', error);
                      });
                    
                    setEmail(temp);
                    setUserName(temp2);
                }
        }
        fetchuserdata();
        
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