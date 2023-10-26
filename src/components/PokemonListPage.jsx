import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
// import { getTodos, postTodo } from '../my-api'

const PokemonListPage = () => {
  const getPokemonLists = async () => {
    return fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json())
      .then((data) => data.results);
  };
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const {
    isLoading,
    error,
    data: pokemons,
  } = useQuery("pokemons", getPokemonLists);

  return (
    <div className="pokemon_list_page">
      <h1>포켓몬 리스트 페이지</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {pokemons.map((pokemon) => (
            <li key={pokemon.name}>
              {pokemon.name}
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.url.split("/")[6]
                }.png`}
                alt={pokemon.name}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default PokemonListPage;
