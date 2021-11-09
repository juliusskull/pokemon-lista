import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const Avilidades = ({_url}) => {
  //const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");
  const [espaniol, setEspaniol] = useState("");
  const [ingles, setIngles] = useState("");
  const [isIngles, setIsIngles] = useState(false);
  const [enviar, setEnviar] = useState(true);
  const [ver, setVer] = useState(false);
   const handleChange = (e) => {
   // setPokemon(e.target.value.toLowerCase());
  }; 
  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };
  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = _url;
      const res = await axios.get(url);
      toArray.push(res.data);
      console.log('data:'+res.data.flavor_text_entries);
      //setPokemonType(res.data.types[0].type.name);
      setPokemonData(res.data.flavor_text_entries.flavor_text_entries);
      console.log('ingles:'+res.data.flavor_text_entries[13].flavor_text);
      setEspaniol(res.data.flavor_text_entries[13].flavor_text);
      setIngles(res.data.flavor_text_entries[1].flavor_text);
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
  <><div style={{display: isIngles ? 'block' : 'none' }} >{ingles} <span><button onClick={()=>setIsIngles(false)}>Pasar Esp</button></span></div>
  <div style={{display: isIngles ? 'none' : 'block' }}>{espaniol} <span><button onClick={()=>setIsIngles(true)}>Pasar Ingles</button></span></div></>
  );
};

export default Avilidades;
// const toArray = [];
// try {
//   const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
//   const pokeDesc = `https://pokeapi.co/api/v2/ability/${pokemon}`;

//   const resPokemon = await axios.get(url);
//   const resPokemonEtc = await axios.get(pokeDesc);

//   axios.all([resPokemon, resPokemonEtc]).then(
//     axios.spread((...allData) => {
//       console.log(allData);
//     })
//   );
//   // console.log(res);
//   toArray.push(res.data);
//   setPokemonData(toArray);
// } catch (e) {
//   console.log(e);
// }