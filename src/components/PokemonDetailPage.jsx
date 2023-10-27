import React, { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { detailState } from "../state/detailState";
import "../App.css";

const PokemonDetailPage = () => {
  const { isDetail, datailNumber } = useRecoilValue(detailState);
  const [detail, setDetail] = useState({});
  const evolutionChain = useRef({});
  const [evolutions, setEvolutions] = useState([]);
  const getPokemonItem = async (datailNumber) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${datailNumber}`)
      .then((res) => res.json())
      .then((data) => {
        setDetail(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const getPokemonEvolution = async (datailNumber) => {
    return fetch(`https://pokeapi.co/api/v2/evolution-chain/${datailNumber}`)
      .then((res) => res.json())
      .then((data) => {
        evolutionChain.current = data.chain;
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    getPokemonItem(datailNumber);
    getPokemonEvolution(datailNumber);
    // do {
    //   let evolutionDatail = evolutionChain.current["evolves_to"];

    //   setEvolutions([...evolutions, evolutionDatail[0].species.name]);

    //   evolutionChain.current = evolutionDatail[0];
    // } while (
    //   !!evolutionChain &&
    //   evolutionChain.current.hasOwnProperty("evolves_to")
    // );
  }, [datailNumber]);

  return (
    <div className="pokemon_detail_page">
      <div>
        <div className="pokemon_image_box">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${datailNumber}.png`}
            alt={detail.name}
          />
        </div>
        <h2>{detail.name}</h2>
        <p>번호: {detail.order}</p>
        <p>키: {detail.height}</p>
        <p>무게: {detail.weight}</p>
        <h3>진화 과정</h3>
        {/* {evolutions.map((item) => {
          return <div className="evolution_item">item.name</div>;
        })} */}
      </div>
    </div>
  );
};
export default PokemonDetailPage;
