import { use, useEffect, useState } from 'react';
import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/Styles.css";
import "./assets/Cards.css";
import { UserIdContext } from "./assets/UserContext";

function SavesListPage()
{
    const {UserId} = useContext(UserIdContext);
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [userName, setUserName] = useState("");
    const [saves, setSaves] = useState();
    console.log(typeof(UserId));

    

    useEffect(()=>{
        console.log("UserID: ", UserId)
        async function fetchUserData()
        {
            if (!token) return;
            var apiAddress="https://localhost:7188/api/Auth/"+UserId;
            const userDataResponse = await fetch(apiAddress, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`, // This is where the token is added
                },
              })
                .then(response => response.json())
                .then(data => {
                  setUserName(data.userName);
                })
                .catch(error => {
                  console.error('Error:', error);
                });
        }
        async function fetchSavesByUserId()
        {
            if (!token) return;
            var apiAddress="https://localhost:7188/api/Saves/userid/"+UserId;
            const savesDataResponse = await fetch(apiAddress, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`, // This is where the token is added
                },
              })
                .then(response => response.json())
                .then(data => {
                  setSaves(data);
                })
                .catch(error => {
                  console.error('Error:', error);
                });
        }

        fetchUserData();
        fetchSavesByUserId();
    },[UserId]);

    function HandleNavigate(id)
    {
      navigate(`/save/${id}`);
    }

    
    function SavesDisplay()
    {
        console.log(saves);
        return(
            <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Save Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {saves && saves.length > 0 ? (
                  saves.map((save, index) => (
                    <tr key={index}>
                      <td>{save.name}</td>
                      <td>
                        <button onClick={()=>{HandleNavigate(save.id)}}  className="btn btn-primary">
                          Open
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center">
                      No saves available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )
    }
        
   


    return(
        <>
        <div className="creator-container">
        <h3>Welcome, {userName}</h3>
        <SavesDisplay/>


        </div>
        </>
    )
}

export default SavesListPage