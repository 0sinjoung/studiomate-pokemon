import { atom } from "recoil";

export const detailState = atom({
  key: `detailState`,
  default: {
    isDetail: false,
    datailNumber: "0",
  },
});
