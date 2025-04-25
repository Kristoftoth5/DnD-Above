import { useEffect, useState, useContext } from 'react';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/Styles.css";
import "./assets/Cards.css";
import { UserIdContext } from "./assets/UserContext";
import { useNavigate } from "react-router-dom";

function SavesListPage() {
  const { UserId } = useContext(UserIdContext);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [userName, setUserName] = useState("");
  const [saves, setSaves] = useState([]);
  const navigate = useNavigate();

  // Fetch user and saves data when the component mounts or UserId changes
  useEffect(() => {
    async function fetchUserData() {
      if (!token) return;
      const apiAddress = "https://localhost:7188/api/Auth/" + UserId;
      const userDataResponse = await fetch(apiAddress, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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

    async function fetchSavesByUserId() {
      if (!token) return;
      const apiAddress = "https://localhost:7188/api/Saves/userid/" + UserId;
      const savesDataResponse = await fetch(apiAddress, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          setSaves(data); // Update the state with the fetched saves
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    fetchUserData();
    fetchSavesByUserId();
  }, [UserId, token]); // Trigger this when UserId or token changes

  function HandleNavigate(id) {
    navigate(`/save-display/${id}`);
  }

  // Handle delete operation and re-fetch the updated saves
  async function HandleDelete(id, sheetName) {
    if (!token) return;
    const apiAddress = "https://localhost:7188/api/Saves/" + id;
    const confirmLeave = window.confirm("Are you sure you want to delete the character sheet: "+sheetName+"?");
    if (!confirmLeave) return;
    else
    {
      try {
        const response = await fetch(apiAddress, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to delete');
        }
    
        // Find and remove the deleted save from the state directly
        setSaves((prevSaves) => prevSaves.filter((save) => save.id !== id));
    
        console.log('Deleted successfully');
      } catch (error) {
        console.error('Error:', error);
      }
    }
    
  }
  

  function SavesDisplay() {
    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Save Name</th>
            </tr>
          </thead>
          <tbody>
            {saves && saves.length > 0 ? (
              saves.map((save, index) => (
                <tr key={index}>
                  <td>{save.name}</td>
                  <td>
                    <button onClick={() => { HandleNavigate(save.id) }} className="btn btn-primary">
                      Open
                    </button>
                  </td>
                  <td>
                    <button onClick={() => { HandleDelete(save.id, save.name) }} className="btn btn-danger">
                      Delete
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
    );
  }

  return (
    <div className="creator-container">
      <br/><br/>
      <h3>Welcome, {userName}</h3>
      <SavesDisplay />
    </div>
  );
}

export default SavesListPage;
