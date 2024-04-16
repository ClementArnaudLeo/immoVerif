import { get } from "firebase/database";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../firebase-config";
import Card from "./Card";

export default function ChercherAvis() {
  const [showLodadingSpinner, setShowLodadingSpinner] = useState(false);
  let res = [];
  const [avisRecupere, setAvisRecupere] = useState([]);
  const [candidatNom, setCandidatNom] = useState("");
  const [candidatPrenom, setCandidatPrenom] = useState("");
  const [agenceRecupere, setAgenceRecupere] = useState([]);
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
    if (auth?.currentUser?.uid == undefined) {
      alert("sign in first");
      return;
    }
    setShowLodadingSpinner(true);

    try {
      const collec = collection(db, "candidat");
      const q = query(
        collec,
        where("nom", "==", candidatNom.toLowerCase()),
        where("prenom", "==", candidatPrenom.toLowerCase())
      );
      const querySnapshot = await getDocs(q);
      res = [];
      querySnapshot.forEach((doc) => {
        res.push(doc.data());
      });
      setCandidatRecupere(res);
      try {
        const collec = collection(db, "avis");
        const q = query(
          collec,
          where("code_candidat", "==", res[0]?.code_candidat)
        );
        const querySnapshot = await getDocs(q);
        res = [];
        querySnapshot.forEach((doc) => {
          res.push(doc.data());
        });
        setAvisRecupere(res);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
    setShowLodadingSpinner(false);
  };

  return (
    <div className="container mt-4 w-50" style={{ minHeight: "67vh" }}>
      <h1 className="mt-4 fw-bold text-center">Chercher un avis</h1>
      <input
        className="form-control my-4"
        placeholder="nom"
        type="text"
        value={candidatNom}
        onChange={(e) => setCandidatNom(e.target.value)}
      />
      <input
        className="form-control my-4"
        placeholder="prenom"
        type="text"
        value={candidatPrenom}
        onChange={(e) => setCandidatPrenom(e.target.value)}
      />
      <button
        className="btn btn-primary mb-4 w-100"
        onClick={() => {
          getAvis();
        }}
      >
        Rechercher
      </button>

      {showLodadingSpinner ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : null}

      <div>
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
    </div>
  );
}
