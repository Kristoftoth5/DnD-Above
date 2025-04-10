import React, { useState, useEffect } from "react";
import "../Cards.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function SignInPage()
{
    const [eula, setEula] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [token, setToken] = useState();
    const [tokenPath, setTokenPath] = useState("");

    const navigate = useNavigate();

    function SignIn()
    {
        var temp = document.getElementById("email").value
        var temp2 = document.getElementById("password").value

        if (temp == undefined || temp2 == undefined)
        {
            window.alert("Please fill all required fields: E-mail, Password");
            return;
        }
        

        //navigate("/home");

        const sendPostRequest = async () => {
            const url = "https://localhost:7188/api/Auth/login";  // Your API URL
            const data = {
              email: email,
              password: password
            };
          
            try {
              const response = await fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
              });
          
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
          
              const responseData = await response.json();
              console.log("Response Data:", responseData);
            } catch (error) {
              console.error("Error:", error);
            }
          };
          
          sendPostRequest();


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