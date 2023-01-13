import React, { useEffect, useState } from "react";
import axios from "axios";
import SkeletonLoader from "../components/SkeletonLoader";
import TableFooter from "../components/Table/TableFooter";
import FunnelSvg from "../components/FunnelSvg";

function Home() {
  const [apiData, setApiData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tabelDataReady, setTabelDataReady] = useState(false);
  const [inputFilter, setInputFilter] = useState("");
  const [filterByColumn, setFilterByColumn] = useState("All Columns");
  const [dataCount, setDataCount] = useState(0);

  const getData = async () => {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`
    );
    setApiData(data.results);
    setDataCount(data.results.length);
  };

  const updateTableData = async (data) => {
    let formattedData = [];
    for (let i = 0; i < data.length; i++) {
      const pokemon = data[i];
      const { data: pokemonData } = await axios.get(pokemon.url);

      formattedData.push({
        id: pokemonData.id,
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

  const updateFilter = (value) => {
    setInputFilter("");
    setFilterByColumn(value);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    updateTableData(apiData);
  }, [apiData]);

  let filteredDataCount = 0;
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-12">
      <div className="flex items-center justify-between pb-4">
        <div>
          <button
            id="dropdownRadioButton"
            data-dropdown-toggle="dropdownRadio"
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            <FunnelSvg />
            <div className="ml-2">{filterByColumn}</div>
            <svg
              className="w-3 h-3 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            id="dropdownRadio"
            className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
            data-popper-reference-hidden
            data-popper-escaped
            data-popper-placement="top"
            style={{
              position: "absolute",
              inset: "auto auto 0px 0px",
              margin: "0px",
              transform: "translate3d(522.5px, 3847.5px, 0px)",
            }}
          >
            <ul
              className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownRadioButton"
            >
              {["All Columns", "Name", "Moves", "Types", "Attributes"].map(
                (elem, i) => {
                  return (
                    <li key={i}>
                      <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <input
                          checked={filterByColumn === elem}
                          onChange={() => updateFilter(elem)}
                          id={`filter-radio-example-${i + 1}`}
                          type="radio"
                          defaultValue
                          name="filter-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={`filter-radio-example-${i + 1}`}
                          className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                        >
                          {elem}
                        </label>
                      </div>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </div>
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
                  let filterCondition;
                  switch (filterByColumn) {
                    case "All Columns":
                      filterCondition =
                        element.name
                          .toLowerCase()
                          .includes(inputFilter.toLowerCase()) ||
                        filterSubArrElems(element.moves, "move") ||
                        filterSubArrElems(element.types, "type") ||
                        filterSubArrElems(element.abilities, "ability");
                      break;
                    case "Name":
                      filterCondition = element.name
                        .toLowerCase()
                        .includes(inputFilter.toLowerCase());
                      break;
                    case "Moves":
                      filterCondition = filterSubArrElems(
                        element.moves,
                        "move"
                      );
                      break;
                    case "Types":
                      filterCondition = filterSubArrElems(
                        element.types,
                        "type"
                      );
                      break;
                    case "Attributes":
                      filterCondition = filterSubArrElems(
                        element.abilities,
                        "ability"
                      );
                      break;

                    default:
                      break;
                  }
                  if (filterCondition) {
                    filteredDataCount++;
                  }
                  return filterCondition;
                }
                filteredDataCount = dataCount;
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
                console.log("data = ", data);
                return (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 text-base text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <a
                        href={`/pokemon/${data.id}`}
                        className="font-medium text-blue-800 dark:text-blue-500 hover:underline px-1"
                      >
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
      <TableFooter
        dataCount={dataCount}
        filteredDataCount={filteredDataCount}
      />
    </div>
  );
}

export default Home;
