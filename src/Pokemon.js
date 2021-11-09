import React, { useState, useEffect } from "react";
import "./App.css";
import Avilidades from './Avilidades';
import axios from "axios";

const Pokemon = ({name}) => {
  //const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");
  const [enviar, setEnviar] = useState(true);
  const [ver, setVer] = useState(true);
  
  
  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      console.log(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(pokemonData);
  useEffect(() => {
    // Actualiza el título del documento usando la Browser API
    if(enviar){
        getPokemon();
        setEnviar(false);
    }
    
    
  },[]);
//flavor_text_entries  <!-- flavor_text -->
  return (
    <div className="App">
  
    
      {pokemonData.map((data) => {
        return (
          <div className="container">
            <img src={data.sprites["front_default"]} />
            <div className="divTable">
              <div className="divTableBody">
              <div className="divTableRow">
                  <div className="divTableCell">nombre</div>
                  <div className="divTableCell">{data.name}</div>
                  
                </div>
                
                <div className="divTableRow" style={{display: ver ? 'block' : 'none' }}>
                  <div className="divTableCell">Type</div>
                  <div className="divTableCell">{pokemonType}</div>
                </div>
               
                <div className="divTableRow">
                  <div className="divTableCell">Height</div>
                  <div className="divTableCell">
                    {" "}
                    {Math.round(data.height * 3.9)}"
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Weight</div>
                  <div className="divTableCell">
                    {" "}
                    {Math.round(data.weight / 4.3)} lbs
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Number of Battles</div>
                  <div className="divTableCell">{data.game_indices.length}</div>
                </div>
                {
                    data.abilities.map((m,index)=>
                    <div key={index} className="divTableRow">
                      <div className="divTableCell">abilitie:<b>{m.ability.name}</b></div>
                      <div  className="divTableCell"> <Avilidades _url={m.ability.url} /></div>
                     
                    </div> 
                    )
                  }
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Pokemon;
