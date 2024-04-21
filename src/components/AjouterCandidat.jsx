import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../firebase-config";

export default function Candidat() {
  const [candidat, setCandidat] = useState({
    nom: "",
    prenom: "",
    naissance: "",
    code: "",
  });
  const addCandidat = async () => {
    if (auth?.currentUser?.uid == undefined) {
      alert("sign in first");
      return;
    }
    try {
      await addDoc(collection(db, "candidat"), {
        nom: candidat.nom,
        prenom: candidat.prenom,
        naissance: candidat.naissance,
        code: candidat.code,
      });
      alert("candidat ajouté");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container mt-4 w-50" style={{ minHeight: "67vh" }}>
      <h1 className="mt-4 fw-bold text-center">Ajouter un candidat</h1>
    <div className="form-group">
      <input
        className="form-control my-4"
        type="text"
        placeholder="nom"
        onChange={(e) => setCandidat({ ...candidat, nom: e.target.value })}
      />
      <input
        className="form-control my-4"
        type="text"
        placeholder="prenom"
        onChange={(e) => setCandidat({ ...candidat, prenom: e.target.value })}
      />
      <input
        className="form-control my-4"
        type="date"
        placeholder="naissance"
        onChange={(e) =>
          setCandidat({ ...candidat, naissance: e.target.value })
        }
      />
      <input
        className="form-control my-4"
        type="number"
        placeholder="code"
        onChange={(e) => setCandidat({ ...candidat, code: e.target.value })}
      />
      <button className="btn btn-primary  mb-4 w-100" onClick={() => addCandidat}>
        Creer le candidat
      </button>
    </div>
    </div>
  )
}
