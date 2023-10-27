import React from "react";
import { useRecoilValue } from "recoil";
import { detailState } from "./state/detailState";
import PokemonListPage from "./components/PokemonListPage";
import PokemonDetailPage from "./components/PokemonDetailPage";

const PageProvider = () => {
  const { isDetail, datailNumber } = useRecoilValue(detailState);

  return (
    <div>
      <h1 className="title">
        {isDetail ? "포켓몬 디테일 페이지" : "포켓몬 리스트 페이지"}
      </h1>
      {isDetail ? <PokemonDetailPage /> : <PokemonListPage />}
    </div>
  );
};
export default PageProvider;
