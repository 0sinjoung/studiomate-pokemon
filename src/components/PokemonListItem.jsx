import React from "react";
import "../App.css";

const PokemonListItem = ({ name, url }) => {
  return (
    <li className="pokemon_list_item">
      <div className="pokemon_list_container">
        <div className="pokemon_list_image_box">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              url.split("/")[6]
            }.png`}
            alt={name}
          />
        </div>
        <div className="pokemon_list_text_box">
          <p className="pokemon_number">번호: {url.split("/")[6]}</p>
          <p>이름: {name}</p>
        </div>
      </div>
    </li>
  );
};
export default PokemonListItem;
