import React, { useState, useEffect, useContext } from "react";
import "../Cards.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserIdContext } from "../UserContext";

function SignInPage()
{
    const [token, setToken] = useState();
    const [tokenPath, setTokenPath] = useState("");

    const navigate = useNavigate();

    const { setUserId } = useContext(UserIdContext)

    function SignIn()
    {
        var temp = document.getElementById("email").value
        var temp2 = document.getElementById("pass").value

        if (temp == undefined || temp2 == undefined)
        {
            window.alert("Please fill all required fields: E-mail, Password");
            return;
        }
        

        //navigate("/home");

        const sendSignIn = async () => 
          {
            const url = "https://localhost:7188/api/Auth/login";  
            const data = 
            {
              "email": temp,
              "password": temp2
            };
          
            try {
              const response = await fetch(url, 
              {
                method: "POST",
                headers: 
                {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
              });
          
              if (!response.ok) 
              {
                window.alert("Invalid e-mail address or password.");
                navigate("/sign-in");
                throw new Error("Network response was not ok");
              }
          
              const responseData = await response.json();
              console.log("Response Data:", responseData);

              if (responseData.token) 
              {
                localStorage.setItem("authToken", responseData.token);
                setToken(responseData.token);
                setUserId(responseData. userId);
                navigate("/"); // Navigate to home after successful sign-in
              } else 
              {
                window.alert("Failed to retrieve token.");
                navigate("/sign-in")
                return;
              }


              
            } 
            catch (error) 
            {
              console.error("Error:", error);
            }
          };
          
          sendSignIn();

          

    }
    return(
        <>
        <div className="creator-container">
        <div className="selected-single">
        <p><b>E-mail</b><input type="email" id="email"/></p><br></br>
        <p><b>Password</b><input type="password" id="pass"/></p>

        <button className="btn btn-primary" onClick={()=>{SignIn()}}>Sign In</button>

        </div>
        </div>
        </>
    )
}

export default SignInPage