
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../firebase-config";

export default function DonnerAvis() {
  const [avis, setAvis] = useState({
    avis: "",
    note: 5,
    code_candidat: "",
  });


  const addAvis = async (e) => {
    e.preventDefault();
    if (auth?.currentUser?.uid == undefined) {
      alert("sign in first");
      return;
    }
    try {
      await addDoc(collection(db, "avis"), {
        avis: avis.avis,
        note: avis.note,
        code_candidat: avis.code,
        date: new Date().toLocaleDateString(),
        fb_id: auth?.currentUser?.uid,
      });
      alert("avis ajouté");
    } catch (error) {
      console.error(error);
    }
  };
  return(
    <div className="container mt-4 w-50"  style={{minHeight: "67vh"}}>
      <h2 className="mt-4 fw-bold text-center">Donner un avis</h2>
      <form className="mt-4 p-4 text-primary" onSubmit={(e) => fctsignadd(e)}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="code"
            placeholder="Entrez le code candidat"
            onChange={(e) => setAvis({ ...avis, code: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <input
          
          className="form-control mt-4"
            type="number"
            id="note"
            placeholder="Entrez la note"
            min="1"
            max="5"
            onChange={(e) => setAvis({ ...avis, note: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control mt-4"
            id="avis"
            rows="5"
            placeholder="Entrez votre avis"
            onChange={(e) => setAvis({ ...avis, avis: e.target.value })}
            required
          ></textarea>
        </div>
        <button onClick={(e) => addAvis(e)} type="submit" className="btn btn-primary mt-4 w-100">
          Envoyer l'avis
        </button>
      </form>
    </div>
  );
}
