import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { auth, db } from '../firebase-config';
import Card from './Card';

export default function ChercherAvis() {
  const [avisRecupere, setAvisRecupere] = useState([]);
  const [candidatNom, setCandidatNom] = useState('');
  const [candidatPrenom, setCandidatPrenom] = useState('');
  const [candidatRecupere, setCandidatRecupere] = useState([
    {
      nom: '',
      prenom: '',
      naissance: '',
      code_candidat: '',
      avis_suprime: false,
    },
  ]);

  const getAvis = async () => {
    if (auth?.currentUser?.uid == undefined) {
      alert('sign in first');
      return;
    }

    try {
      const collec = collection(db, 'candidat');
      const q = query(
        collec,
        where('nom', '==', candidatNom.toLowerCase()),
        where('prenom', '==', candidatPrenom.toLowerCase())
      );
      const querySnapshot = await getDocs(q);
      const res = [];
      querySnapshot.forEach((doc) => {
        res.push(doc.data());
      });
      setCandidatRecupere(res);
      try {
        const collec = collection(db, 'avis');
        const q = query(
          collec,
          where('code_candidat', '==', candidatRecupere[0]?.code_candidat)
        );
        const querySnapshot = await getDocs(q);
        const res = [];
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
  };

  return (
    <div className='container mt-4 w-50' style={{ minHeight: '67vh' }}>
      <h1 className='mt-4 fw-bold text-center'>Chercher un avis</h1>
      <input
        className='form-control my-4'
        placeholder='nom'
        type='text'
        value={candidatNom}
        onChange={(e) => setCandidatNom(e.target.value)}
      />
      <input
        className='form-control my-4'
        placeholder='prenom'
        type='text'
        value={candidatPrenom}
        onChange={(e) => setCandidatPrenom(e.target.value)}
      />
      <button className='btn btn-primary mb-4 w-100' onClick={getAvis}>
        Rechercher
      </button>
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
          />
        ))}
      </div>
    </div>
  );
}
