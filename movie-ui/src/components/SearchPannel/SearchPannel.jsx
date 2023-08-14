import React from "react";
import './SearchPannel.css'
import { useState } from "react";

// import { classNames } from 'primereact/utils';
 function SearchPanel(){

    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    return (
        <div className="searchPanel">
            <div>
            <p className="searchPanelheader1">
            WELCOME TO BOLETO
            </p>
            <h1 className="searchPanelheader2">
            WHAT ARE  YOU LOOKING FOR
            </h1>
            </div>
            <div className="searchBox">
                <div className="searchWrapper">
                    <input className="searchInput" 
                    placeholder="Search for Movies"
                    type="text" />
                    <svg className="searchIcon + ' bi bi-search'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
                </div>
                <div className="searchOption">
                <img src="http://pixner.net/boleto/demo/assets/images/ticket/city.png"></img>
                    <label class="panelheader">City</label>
                    {/* <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                editable placeholder="Select a City" className="w-full md:w-7rem" /> */}
                </div>
                <div className="searchOption">
                    <img src="http://pixner.net/boleto/demo/assets/images/ticket/date.png" alt="" />
                    <label class="panelheader">Date</label>
                    {/* <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                editable placeholder="Select a City" className="w-full md:w-7rem" /> */}
             
                </div>
                <div className="searchOption">
                    <img src="http://pixner.net/boleto/demo/assets/images/ticket/cinema.png" alt="" />
                    <label class="panelheader">Cinema</label>
                    {/* <Dropdown 
                    className="pdropdown"
                    value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                editable placeholder="Select a City" /> */}
             
                </div>
            </div>
        </div>
    );
    }
export default SearchPanel;