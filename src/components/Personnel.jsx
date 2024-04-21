import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaFileCirclePlus, FaMagnifyingGlass } from "react-icons/fa6";
import { IoCloudDownloadOutline, IoPersonAddSharp } from "react-icons/io5";
import { Link, redirect, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";


export default function Personnel() {
  const [nbAleatoire, setNbAleatoire] = useState('');
  const navigate = useNavigate();
  const [siret, setSiret] = useState("");
  const [adresse, setAdresse] = useState("");
  const [tel, setTel] = useState("");
  const [nom, setNom] = useState("");
  const [candidats, setCandidats] = React.useState([
    {
      nom: "",
      siret: "",
      adresse: "",
      mail: "",
    },
  ]);
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(false);
  };

  const openModal = () => {
    setModal(true);
  };

  const genereNombreAleatoire = () => {
    const min = 100000;
    const max = 999999;
    setNbAleatoire(Math.floor(Math.random() * (max - min + 1)) + min);
  };



  const fetchData = async () => {
    if (!auth?.currentUser?.uid) {
      navigate("/connexion");
      return;
    }
    try {
      const collec = collection(db, "agence");
      const q = query(collec, where("fb_id", "==", auth?.currentUser?.uid));
      const querySnapshot = await getDocs(q);
      const res = [];
      querySnapshot.forEach((doc) => {
        res.push(doc.data());
      });
      setCandidats(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateSiret = async () => {
    if (auth?.currentUser?.uid == undefined) {
      alert("sign in first");
      return;
    }

    const docRef = doc(db, "agence", auth.currentUser.uid);
    await updateDoc(docRef, {
      siret: siret,
    });
    fetchData();
  };

  const updateAdresse = async () => {
    if (auth?.currentUser?.uid == undefined) {
      alert("sign in first");
      return;
    }

    const docRef = doc(db, "agence", auth.currentUser.uid);
    await updateDoc(docRef, {
      adresse: adresse,
    });
    fetchData();
  };

  const updateNom = async () => {
    if (auth?.currentUser?.uid == undefined) {
      alert("sign in first");
      return;
    }

    const docRef = doc(db, "agence", auth.currentUser.uid);
    await updateDoc(docRef, {
      nom: nom,
    });
    fetchData();
  };

  const updateTel = async () => {
    if (auth?.currentUser?.uid == undefined) {
      alert("sign in first");
      return;
    }

    const docRef = doc(db, "agence", auth.currentUser.uid);
    await updateDoc(docRef, {
      tel: tel,
    });
    fetchData();
  };

  return (
    <div className="container mt-5" style={{ marginBottom: "12vh" }}>
      <h1 className="mt-4 fw-bold text-center text-primary" >
        Espace Personnel
      </h1>
      <div className="w-50 m-auto mt-5">
        <h2 className="text-primary fw-bold" style={{ marginBottom: "6vh" }}>Informations personnelles</h2>
        
        {candidats.map((candidat, index) => (
          <div key={index}>
            <p>
              <span className="text-primary"> Dénomination</span> :{" "}
              {candidat.nom}
              <FaEdit
                onClick={openModal}
                className="text-primary mx-3"
                style={{ fontSize: "150%" }}
              />
            </p>
            <p>
              <span className="text-primary"> Siret</span> : {candidat.siret}
              <FaEdit
                onClick={openModal}
                className="text-primary mx-3"
                style={{ fontSize: "150%" }}
              />
            </p>
            <p>
              <span className="text-primary"> Adresse</span> :{" "}
              {candidat.adresse}
              <FaEdit
                onClick={openModal}
                className="text-primary mx-3"
                style={{ fontSize: "150%" }}
              />
            </p>
            <p>
              <span className="text-primary"> Telephone</span> : {candidat.tel}
              <FaEdit
                className="text-primary mx-3"
                style={{ fontSize: "150%" }}
                onClick={openModal}
              />
            </p>
            
            <button onClick={genereNombreAleatoire} className="btn btn-sm btn-outline-primary">
              Generer un code candidat 
            </button>{" "}
            {nbAleatoire}
          </div>
        ))}
      </div>
      <div className="text-center mt-5">
        <Link
          to="/chercher_avis"
          className="btn btn-outline-primary btn-lg mt-5 px-5  m-3"
          style={{ width: " 15%" }}
        >
          <FaMagnifyingGlass style={{ fontSize: "500%" }} className="my-3" />
          Verifier les avis d'un candidat
        </Link>
        <Link
          to="/donner_avis"
          className="btn btn-outline-primary btn-lg mt-5 px-5 m-3"
          style={{ width: " 15%" }}
        >
          <FaFileCirclePlus style={{ fontSize: "500%" }} className="my-3" />
          Ajouter un avis sur un candidat
        </Link>
        <Link
          to="/ajouter_candidat"
          className="btn btn-outline-primary btn-lg mt-5 px-5 m-3"
          style={{ width: " 15%" }}
        >
          <IoPersonAddSharp style={{ fontSize: "500%" }} className="my-3" />
          Ajouter un candidat a la liste
        </Link>
      </div>
      {modal && (
        <div className="position-absolute top-50 start-50 translate-middle bg-light p-5 rounded-3 shadow-lg w-50 h-50 d-flex flex-column justify-content-space-between">
          <button
            onClick={closeModal}
            className="btn btn-danger btn-sm position-absolute top-0 end-0 mb-0"
          >
            X
          </button>
          <h1 className="text-center text-primary fw-bold mb-3 mt-0">
            Modifier les informations personnelles
          </h1>
          <input
            type="text"
            placeholder="nom"
            onChange={(e) => setNom(e.target.value)}
          />
          <button
            onClick={updateNom}
            className="btn btn-primary btn-sm mb-3 w-25"
          >
            Modifier nom
          </button>
          <input
            type="text"
            placeholder="siret"
            onChange={(e) => setSiret(e.target.value)}
          />
          <button
            onClick={updateSiret}
            className="btn btn-primary btn-sm mb-3 w-25"
          >
            Modifier siret
          </button>
          <input
            type="text"
            placeholder="adresse"
            onChange={(e) => setAdresse(e.target.value)}
          />
          <button
            onClick={updateAdresse}
            className="btn btn-primary btn-sm mb-3 w-25"
          >
            Modifier adresse
          </button>
          <input
            type="text"
            placeholder="tel"
            onChange={(e) => setTel(e.target.value)}
          />
          <button
            onClick={updateTel}
            className="btn btn-primary btn-sm mb-3 w-25"
          >
            Modifier telephone
          </button>
        </div>
      )}
    </div>
  );
}

/*

export default function idk() {


  return (
    <>
    <p>nom : </p>
    <p>siret : </p>
    <p>adresse : </p>
    <p>tel : </p>

 
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>

  
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modifier les informations personnelles</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <input type="text" placeholder="nom" /> <button onClick={updateNom}>update</button>
      <input type="text" placeholder="siret" /> <button onClick={updateSiret}>update</button>
      <input type="text" placeholder="adresse" /> <button onClick={updateAdresse}>update</button>
      <input type="text" placeholder="tel" /> <button onClick={updateTel}>update</button>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

    
    
    </>
  )
}



*/
