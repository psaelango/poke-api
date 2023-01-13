import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [apiData, setApiData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`
    );
    setApiData(data.results);
  };

  const updateTableData = async (data) => {
    console.log('data = ', data);
    let formattedData = [];
    for (let i = 0; i < data.length; i++) {
      const pokemon = data[i];
      const { data: pokemonData } = await axios.get(pokemon.url);

      formattedData.push({
        name: pokemonData.name,
        sprite: pokemonData.sprites.front_default,
        moves: pokemonData.moves,
        types: pokemonData.types,
        abilities: pokemonData.abilities,
      });
    }
    setTableData(formattedData);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    updateTableData(apiData);
  }, [apiData]);

  return (
    <div className="grid grid-cols-2">
      <pre>{JSON.stringify(apiData, null, 2)}</pre>
      <pre>{JSON.stringify(tableData, null, 2)}</pre>
    </div>
  );
}

export default Home;
