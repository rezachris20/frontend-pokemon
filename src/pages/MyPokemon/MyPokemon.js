import React from "react";
import globalVariable from "../../globalVariable";


import DataMyPokemon from "./DataMyPokemon";

const { baseUrlAPI } = globalVariable;

export default function MyPokemon(){
  let userID = localStorage.getItem("id")
    return (
      <div>
        <div className="col-md-12 mt-5">
          <DataMyPokemon userID={userID} />
        </div>
      </div>
    );
}
