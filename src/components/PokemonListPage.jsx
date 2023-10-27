import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import PokemonListItem from "./PokemonListItem";

const PokemonListPage = () => {
  const [pokemonLists, setPokemonLists] = useState([]);
  const [offset, setOffset] = useState(0);
  const LIMIT = 20;

  const getPokemonLists = async (offset, limit) => {
    return fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPokemonLists([...pokemonLists, ...data.results]);
      });
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setOffset(offset + LIMIT);
    }
  };

  useEffect(() => {
    getPokemonLists(offset, LIMIT);
  }, [offset]);

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className="pokemon_list_page" to="target">
      <h1>포켓몬 리스트 페이지</h1>
      {pokemonLists === null ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {pokemonLists.map((pokemon) => (
            <PokemonListItem
              key={pokemon.name}
              name={pokemon.name}
              url={pokemon.url}
            />
          ))}
        </ul>
      )}
      <button onClick={() => setOffset(offset + LIMIT)}>more</button>
    </div>
  );
};
export default PokemonListPage;
