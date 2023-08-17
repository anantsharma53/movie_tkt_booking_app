import React from "react";
import "./SearchPanel.css";
import { useState } from "react";


 function SearchPanel({onNameChange, onLanguageChange, onGenreChange}){
    const [searchName, setSearchName] = useState("");

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setSearchName(newName); // Update the state with the typed name
    onNameChange(newName) // Call the parent's callback function with the new name
  };

    console.log(searchName)

    return (
        <div className="searchPanel">
            <div>
            <p className="header1">
            WELCOME TO BOLETO
            </p>
            <h1 className="header2">
            WHAT ARE  YOU LOOKING FOR
            </h1>
            </div>
            <div className="searchBox">
                <div className="searchWrapper">
                    <input className="searchInput" 
                    placeholder="Search for Movies"
                    type="text" 
                    value={searchName}
                    onInput={handleNameChange}
                    />
                    <svg className="searchIcon bi bi-search" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
                </div>
                <div className="searchOption">
                    <img src="http://pixner.net/boleto/demo/assets/images/ticket/city.png"></img>
                    <label>City</label>
                    
                </div>
                <div className="searchOption">
                    <img src="http://pixner.net/boleto/demo/assets/images/ticket/date.png" alt="" />
                    <label>Date</label>
                    
             
                </div>
                <div className="searchOption">
                    <img src="http://pixner.net/boleto/demo/assets/images/ticket/cinema.png" alt="" />
                    <label>Cinema</label>
                    

             
                </div>
            </div>
        </div>
    );
}
    
export default SearchPanel;