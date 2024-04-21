// Accueil.js
import React from "react";
import { Link } from "react-router-dom";

function Accueil() {
  return (
    <div className="container text-center"  style={{minHeight: "64vh", width : "60%" }}>
      <h1 className=" fw-bold " style={{ fontSize : "4rem", marginTop : "13rem"}}>
        Verifiez les <span className="text-primary">antécedants</span> de vos
        <span className="text-primary"> candidats locataires</span>.
      </h1>
      <h4 className="fs-4 mt-4 mx-auto w-50" >
        Louez en toute confiance et accedez aux antécedants de vos candidats en
        un clic.
      </h4>
      <div className="mt-4">
        <Link
          to="/connexion"
          className="btn btn-lg btn-primary d-block mb-2 w-25  mx-auto  fw-bold"
        >
          Commencer
        </Link>
        <Link
          to="/candidat"
          className=" d-block text-underline fs-4   w-25 mx-auto mt-3  fw-bold"
          style={{ color : ' rgb(82, 79, 79)'}}
        >
          Candidat ?
        </Link>
      </div>
    </div>
  );
}

export default Accueil;
