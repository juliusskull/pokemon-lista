import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Pokemon from './Pokemon';

const PokemonAll = () => {

  const [pokemonData, setPokemonData] = useState([]);
  const [enviar, setEnviar] = useState(true); 
  const [urlSiguiente, setUrlSiguiente] = useState('https://pokeapi.co/api/v2/pokemon?limit=5')
  const [urlVolver, setUrlVolver] = useState(false);
  
 

  const getBackPokemon = async () => {
    const toArray = [];
    try {
      const url = urlVolver;
      console.log('url=>' + url);
      const res = await axios.get(url);
      toArray.push(res.data);
    
      setPokemonData(res.data.results);
      console.log('next=>' + res.data.next + ';' + res.data.previous);
      setUrlSiguiente(res.data.next)
      setUrlVolver(res.data.previous);
      setEnviar(false);
    
    } catch (e) {
      console.log(e);
    }
  };
  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = urlSiguiente;
      console.log('url=>' + url);
      const res = await axios.get(url);
      toArray.push(res.data);
    
      setPokemonData(res.data.results);
      console.log('next=>' + res.data.next + ';' + res.data.previous);
      setUrlSiguiente(res.data.next)
      setUrlVolver(res.data.previous);
      setEnviar(false);
    
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
  <div>
      <h3>Lista de Pokemon</h3> 
      <button style={{display: urlVolver ? 'block' : 'none' }} onClick={()=>{setEnviar(true); getBackPokemon();}}>Volver</button>
      <button onClick={()=>{setEnviar(true); getPokemon();}}>Seguiente</button>
     
      <ul>
          {
            !enviar &&  pokemonData.map((m,index)=>{return (<li key={index}><h3>{m.name}</h3><Pokemon name={m.name} /></li>)})
          }
      </ul>
  </div>
  );
};

export default PokemonAll;
