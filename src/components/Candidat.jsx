import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../firebase-config";
import Card from "./Card";

export default function Candidat() {
  const [showLodadingSpinner, setShowLodadingSpinner] = useState(false);
  const [codeDonne, setCodeDonne] = useState("");
  const [avisRecupere, setAvisRecupere] = useState([]);
  const [candidatRecupere, setCandidatRecupere] = useState([
    {
      nom: "",
      prenom: "",
      naissance: "",
      code_candidat: "",
      avis_suprime: false,
    },
  ]);

  const getAvis = async () => {
    try {
      setShowLodadingSpinner(true);
      const collec = collection(db, "avis");
      const q = query(collec, where("code_candidat", "==", codeDonne));
      const querySnapshot = await getDocs(q);
      const res = [];
      querySnapshot.forEach((doc) => {
        res.push(doc.data());
      });
      setAvisRecupere(res);
      try {
        const collec = collection(db, "candidat");
        const q = query(
          collec,
          where("code_candidat", "==", res[0].code_candidat)
        );
        const querySnapshot = await getDocs(q);
        const res2 = [];
        querySnapshot.forEach((doc) => {
          res2.push(doc.data());
        });
        setCandidatRecupere(res2);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
    setShowLodadingSpinner(false);
  };

  return (
    <div
      className="container text-center text-primary"
      style={{ minHeight: "64vh" }}
    >
      <h1 className=" fw-light" style={{ marginTop: "16vh", fontSize:"50px" }}>
        Retrouvez les avis laissés par vos anciens propriétaires
      </h1>
      <input
        className="form-control mb-2 mt-5 w-25 mx-auto"
        id="code"
        placeholder="code candidat"
        type="text"
        value={codeDonne}

        onChange={(e) => {
          setCodeDonne(e.target.value);
        }}
      />
      <button className="btn btn-primary mb-5 w-25" onClick={getAvis}>
        Rechercher
      </button>

      {showLodadingSpinner ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : null}

      {avisRecupere.map((avis, index) => (
        <Card
          key={index}
          avis={avis.avis}
          note={avis.note}
          date={avis.date}
          nom={candidatRecupere[0].nom}
          prenom={candidatRecupere[0].prenom}
          code={candidatRecupere[0].code_candidat}
          agence_nom={avis.agence_nom || "default name"}
          tel={avis.agence_tel || "default tel"}

        />
      ))}
    </div>
  );
}
