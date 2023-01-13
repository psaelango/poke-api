import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [apiData, setApiData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tabelDataReady, setTabelDataReady] = useState(false);

  const getData = async () => {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`
    );
    setApiData(data.results);
  };

  const updateTableData = async (data) => {
    console.log("data = ", data);
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
    setTabelDataReady(true);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    updateTableData(apiData);
  }, [apiData]);

  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
        <tr>
          {["Pokemon Name", "Sprite", "Moves", "Types", "Attributes"].map(
            (elem, i) => {
              return (
                <th key={i} scope="col" className="px-6 py-3">
                  {elem}
                </th>
              );
            }
          )}
        </tr>
      </thead>
      <tbody>
        {tabelDataReady ? (
          tableData.map((data, i) => {
            const renderArrValues = (arr, type) =>
              arr.map((elem, i) => {
                return (
                  <a
                    key={i}
                    href={elem[type].url}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-1"
                    target="_blank"
                  >
                    {elem[type].name}
                  </a>
                );
              });
            return (
              <tr
                key={i}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 text-base text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <a className="font-medium text-blue-800 dark:text-blue-500 hover:underline px-1">
                    {data.name}
                  </a>
                </th>
                <td className="px-6 py-4">
                  <img src={data.sprite} />
                </td>
                <td className="px-6 py-4">
                  {renderArrValues(data.moves, "move")}
                </td>
                <td className="px-6 py-4">
                  {renderArrValues(data.types, "type")}
                </td>
                <td className="px-6 py-4">
                  {renderArrValues(data.abilities, "ability")}
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={5}>
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>
                <div className="h-4 bg-gray-300 mb-6 rounded"></div>
                <div className="h-4 bg-gray-200 mb-6 rounded"></div>
                <div className="h-4 bg-gray-300 mb-6 rounded"></div>
                <div className="h-4 bg-gray-200 mb-6 rounded"></div>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Home;
