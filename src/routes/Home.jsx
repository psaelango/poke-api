import React, { useEffect, useState } from "react";
import axios from "axios";
import SkeletonLoader from "../components/SkeletonLoader";

function Home() {
  const [apiData, setApiData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tabelDataReady, setTabelDataReady] = useState(false);
  const [inputFilter, setInputFilter] = useState("");

  const getData = async () => {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`
    );
    setApiData(data.results);
  };

  const updateTableData = async (data) => {
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

  const filterSubArrElems = (arr, type) => {
    const filteredArr = arr.filter((elem) =>
      elem[type].name.toLowerCase().includes(inputFilter.toLowerCase())
    );
    return filteredArr.length > 0 ? filteredArr : false;
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    updateTableData(apiData);
  }, [apiData]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-12">
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          value={inputFilter}
          onChange={(e) => setInputFilter(e.target.value)}
          type="text"
          id="table-search"
          className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for items"
        />
      </div>
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
            tableData
              .filter((element) => {
                if (inputFilter) {
                  return (
                    element.name
                      .toLowerCase()
                      .includes(inputFilter.toLowerCase()) ||
                    filterSubArrElems(element.moves, "move") ||
                    filterSubArrElems(element.types, "type") ||
                    filterSubArrElems(element.abilities, "ability")
                  );
                }
                return element;
              })
              .map((data, i) => {
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
                <SkeletonLoader />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
