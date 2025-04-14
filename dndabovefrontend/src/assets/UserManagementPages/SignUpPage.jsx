import React, { useState, useEffect } from "react";
import "../Cards.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


function SignUpPage()
{
    const [eula, setEula] = useState(false)

    const navigate = useNavigate();

    function downloadEula()
    {
      // Create an invisible link
      const link = document.createElement('a');
      link.href = '/ABOVE_EULA.pdf'; 
      link.download = 'ABOVE_EULA.pdf'; 
      link.click(); 
    }

    function SignUp()
    {
        var temp = document.getElementById("username").value
        var temp2 = document.getElementById("email").value
        var temp3 = document.getElementById("pass").value
        var errorText = "";

        if (temp == null || temp2 == null || temp3 == null)
        {
            window.alert("Please fill all required fields: Username, E-mail, Password");
            return;
        }

        console.log(temp+"  "+temp2+"  "+temp3 )

        if (!temp2.includes("@")) {window.alert("The e-mail address is invalid. It must include a '@' character.");return;};


        const sendSignUp = async () => {
            const url = "https://localhost:7188/api/Auth/register";  
            const data = {
              "userName": temp,
              "email": temp2,
              "password": temp3
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
                errorText = await response.text();
                navigate("/sign-up")
                throw new Error("Network response was not ok");
                
              }
          
              const responseData = await response.json();
              console.log("Response Data:", responseData);
              navigate("/sign-in")
            } 
            catch (error) {
              if(errorText=== "User already exists.")
              {
                console.log(errorText)
                window.alert("A user with this e-mail address already exists.")
                navigate("/sign-up")
              }
              else
              {
                console.error("Error:", error);
                navigate("/sign-up")
              }
              
            }
          };
          
        sendSignUp();

    }



    return(
        <>
        <div className="creator-container">
        <div className="selected-single">
        <p><b>Username</b><input type="text" id="username"/></p><br></br>
        <p><b>E-mail</b><input type="email" id="email"/></p><br></br>
        <p><b>Password</b><input type="password" id="pass"/></p>

        <p><input type="checkbox" id="eula" onClick={()=>{setEula(!eula)}}/>I accept the terms and conditions of the End-User License Agreement <button onClick={()=>{downloadEula()}} className="btn btn-warning">EULA</button></p>
        
        {eula !== false ?<button className="btn btn-primary" onClick={()=>{SignUp()}}>Sign Up</button>
        :<button className="btn btn-secondary" onClick={()=>{SignUp()}}>Sign Up</button>}
        </div>
        </div>
        
        
        </>
    )
}

export default SignUpPage