import React from "react";
import { useSetRecoilState } from "recoil";
import { detailState } from "../state/detailState";
import "../App.css";

const PokemonListItem = ({ name, url }) => {
  const POKEMON_NUMBER = url.split("/")[6];

  const setDetailState = useSetRecoilState(detailState);

  const handleClickItem = (pokemon_number) => {
    console.log("click:::", pokemon_number);
    setDetailState({
      isDetail: true,
      datailNumber: pokemon_number,
    });
  };

  return (
    <li
      className="pokemon_list_item"
      onClick={() => handleClickItem(POKEMON_NUMBER)}
    >
      <div className="pokemon_list_container">
        <div className="pokemon_list_image_box">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${POKEMON_NUMBER}.png`}
            alt={name}
          />
        </div>
        <div className="pokemon_list_text_box">
          <p className="pokemon_number">번호: {POKEMON_NUMBER}</p>
          <p>이름: {name}</p>
        </div>
      </div>
    </li>
  );
};
export default PokemonListItem;
