import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import PokemonListItem from "./PokemonListItem";
import "../App.css";

const PokemonListPage = () => {
  const [pokemonLists, setPokemonLists] = useState([]);
  const [offset, setOffset] = useState(0);
  const LIMIT = 20;
  const [isError, setIsError] = useState(false);

  // Query
  const getPokemonLists = async (offset, limit) => {
    return fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPokemonLists([...pokemonLists, ...data.results]);
      });
  };
  const getPokemonItem = async (text) => {
    setIsError(false);
    return fetch(`https://pokeapi.co/api/v2/pokemon/${text}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemonLists(data.forms);
      })
      .catch(() => {
        setIsError(true);
      });
  };

  // TextFields
  const [value, setValue] = useState("");
  const handleChangeTextField = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };
  const handleClickSearchButton = (e) => {
    e.preventDefault();
    if (value) getPokemonItem(value);
  };
  const handleKeyDownTextField = (e) => {
    if (e.key === "Enter" && value.trim() && !e.nativeEvent.isComposing) {
      getPokemonItem(value.trim());
    }
  };

  // InfiniteScroll
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setOffset(offset + LIMIT);
    }
  };

  // Effects
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
      <div className="text_field_box">
        <input
          type="text"
          name="pokemom_search"
          className="pokemom_search_text_field"
          placeholder="검색하고 싶은 포켓몬 번호를 입력해주세요."
          onKeyDown={handleKeyDownTextField}
          onChange={handleChangeTextField}
          spellCheck="false"
          autoComplete="off"
          value={value}
        />
        <button
          type="button"
          className="pokemon_search_button"
          onMouseDown={handleClickSearchButton}
        >
          검색
        </button>
      </div>
      {pokemonLists === null ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>결과를 찾을 수 없습니다.</p>
      ) : (
        <ul className="pokemon_lists">
          {pokemonLists.map((pokemon) => (
            <PokemonListItem
              key={pokemon.name}
              name={pokemon.name}
              url={pokemon.url}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
export default PokemonListPage;
