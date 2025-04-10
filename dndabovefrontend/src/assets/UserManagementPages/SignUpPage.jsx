import React, { useState, useEffect } from "react";
import "../Cards.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function SignUpPage()
{
    const [eula, setEula] = useState(false)
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    function SignUp()
    {
        var temp = document.getElementById("username").value
        var temp2 = document.getElementById("email").value
        var temp3 = document.getElementById("password").value

        if (temp == undefined || temp2 == undefined || temp3 == undefined)
        {
            window.alert("Please fill all required fields: Username, E-mail, Password");
            return;
        }

        if (!temp2.includes("@")) {window.alert("The e-mail address is invalid. It must include a '@' character.");return;};
        
        setUserName(temp);
        setEmail(temp2);
        setPassword(temp3);

        /*Post method here I imagine*/ 
        
        //navigate("/home");

    }



    return(
        <>
        <div className="creator-container">
        <div className="selected-single">
        <p><b>Username</b><input type="text" id="username"/></p><br></br>
        <p><b>E-mail</b><input type="email" id="email"/></p><br></br>
        <p><b>Password</b><input type="password" id="pass"/></p>

        <p><input type="checkbox" id="eula" />I accept the terms and conditions of the End-User License Agreement</p>
        
        {eula !== false ?<button className="btn btn-primary" onClick={()=>{SignUp()}}>Sign Up</button>
        :<button className="btn btn-secondary" onClick={()=>{SignUp()}}>Sign Up</button>}
        </div>
        </div>
        
        
        </>
    )
}

export default SignUpPage