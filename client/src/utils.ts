import Router from "next/router";
import React from "react";
import BackendAPIClient from "./backendAPIClient";
import Loading from "./components/Loading";
import { SignedInContext } from "./components/SignedInProvider";
import { BACKEND_URL } from "./config";

const generateGrid = (nVertCells: number, nHorizCells: number): boolean[][] => {
  return Array(nVertCells)
    .fill([])
    .map((x) => Array(nHorizCells).fill(false));
};

export { generateGrid };
