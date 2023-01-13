import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SkeletonLoader from "../components/SkeletonLoader";

function PokemonInfo() {
  const { id } = useParams();
  const [apiData, setApiData] = useState({});
  const [dataReady, setDataReady] = useState(false);

  const getData = async () => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (data) {
      setDataReady(true);
    }
    setApiData(data);
  };

  useEffect(() => {
    getData();
  }, []);
  if (!dataReady) {
    return <SkeletonLoader />;
  }
  const {
    base_experience,
    height,
    weight,
    order,
    sprites,
    stats,
    game_indices,
  } = apiData;
  return (
    <div className="w-full bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select tab
        </label>
        <select
          id="tabs"
          className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>General Info</option>
          <option>Statistics</option>
        </select>
      </div>
      <ul
        className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400"
        id="fullWidthTab"
        data-tabs-toggle="#fullWidthTabContent"
        role="tablist"
      >
        <li className="w-full">
          <button
            id="stats-tab"
            data-tabs-target="#stats"
            type="button"
            role="tab"
            aria-controls="stats"
            aria-selected="true"
            className="inline-block w-full p-4 rounded-tl-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            General Info
          </button>
        </li>
        <li className="w-full">
          <button
            id="about-tab"
            data-tabs-target="#about"
            type="button"
            role="tab"
            aria-controls="about"
            aria-selected="false"
            className="inline-block w-full p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Statistics
          </button>
        </li>
      </ul>
      <div
        id="fullWidthTabContent"
        className="border-t border-gray-200 dark:border-gray-600"
      >
        <div
          className="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
          id="stats"
          role="tabpanel"
          aria-labelledby="stats-tab"
        >
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={sprites?.other?.dream_world?.front_default}
            alt=""
          />
          <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold">{order}</dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Order
              </dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold">
                {base_experience}
              </dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Base Experience
              </dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold">{height}</dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Height
              </dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold">{weight}</dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
                Weight
              </dd>
            </div>
          </dl>
        </div>
        <div
          className="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
          id="about"
          role="tabpanel"
          aria-labelledby="about-tab"
        >
          <div className="grid grid-cols-2 gap-12 justify-items-end bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 ">
            <div>
              <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Stats Names
              </h2>
              <ul
                role="list"
                className="space-y-4 text-gray-500 dark:text-gray-400"
              >
                {stats.map((stat, i) => {
                  return (
                    <span
                      key={i}
                      id="badge-dismiss-dark"
                      class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
                    >
                      {stat.stat.name}
                    </span>
                  );
                })}
              </ul>
            </div>
            <div>
              <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Indices Names
              </h2>
              <ul
                role="list"
                className="space-y-4 text-gray-500 dark:text-gray-400"
              >
                {game_indices.map((game_index, i) => {
                  console.log("game_index = ", game_index);
                  return (
                    <span
                      key={i}
                      id="badge-dismiss-dark"
                      class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
                    >
                      {game_index.version.name}
                    </span>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonInfo;
