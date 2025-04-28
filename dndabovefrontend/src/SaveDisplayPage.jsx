import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchEverything from "./assets/CommonFunctions/fetchEverything";


function SaveDisplayPage()
    {
    const { id } = useParams();
    var [sheet, setSheet] = useState(undefined);
    var [spellSheet, setSpellSheet] = useState(undefined);;
    const token = localStorage.getItem('authToken');

        const fetchsavedata = async () => 
            {
              const url = "https://localhost:5001/api/Saves/"+id;  
            
              try {
                const response = await fetch(url, 
                {
                  method: "GET",
                  headers: 
                  {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                  },
                });
            
            
                const responseData = await response.json();
                console.log("Response Data:", responseData);
  
                if (responseData.sheet && responseData.spellSheet) 
                {
                    setSheet(responseData.sheet);
                    setSpellSheet(responseData.spellSheet);
                }
              } 
              catch (error) 
              {
                console.error("Error:", error);
              }
            };
    
    useEffect(()=>{
        fetchsavedata();
    },[id]);

    function Sheet()
    {
        return(
            <>
            <div dangerouslySetInnerHTML={{ __html: sheet }} />
            <div dangerouslySetInnerHTML={{ __html: spellSheet }} />
            </>
        )
        
    }
    
    return(
        <>
        <br/>
        <br/>
        {sheet!==undefined && spellSheet!==undefined ?(<Sheet/>):null}

        </>
    )
    }

export default SaveDisplayPage