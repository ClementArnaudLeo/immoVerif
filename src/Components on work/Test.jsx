import React from 'react';
import { db, auth } from '../firebase-config';
import { collection, updateDoc } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

const CreerCompteUtilisateur = () => {
  const [mailCherche, setMailCherche] = useState('');
  let user_uid;

  const etape1 = async () => {
    //recupere mail dans db fnaim
    const docRef = doc(db, 'mailFNAIM', mailCherche);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      console.log('nothing');
      return;
    } else {
      const data = docSnap.data();
      console.log(data);
    }
  };

  const etape2 = async () => {
    //creer le compte avec le mail de fnaim
    let randompswd =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    createUserWithEmailAndPassword(auth, mailCherche, randompswd)
      .then((userCredential) => {
        user_uid = userCredential.user.uid;
        console.log(user_uid);
        console.log('codes : ' + mailCherche + ' ' + randompswd);
        alert('codes : ' + mailCherche + ' ' + randompswd);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const etape3 = async () => {
    //creer la table agence avec seulement le fb_id de rempli
    const Ref = collection(db, 'agence');
    try {
      await setDoc(doc(Ref, user_uid), {
        fb_id: user_uid,
        adresse: '',
        siret: '',
        tel: '',
        nom: '',
      });
      console.log('created');
    } catch (error) {
      console.log(error);
    }
  };

  const etape4 = async () => {
    //supprimer le mail dans la table mailFNAIM
    const docRef = doc(db, 'mailFNAIM', mailCherche);
    try {
      await deleteDoc(docRef);
      console.log('deleted');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input
        type='text'
        placeholder='mail'
        onChange={(e) => {
          setMailCherche(e.target.value);
        }}
      />
      <button onClick={etape1}>chercher mail</button>
      <button onClick={etape2}>creer compte</button>
      <button onClick={etape3}>creer agence vide</button>
      <button onClick={etape4}>supprimer mail</button>
    </>
  );
};

export default function Test() {
  const [siret, setSiret] = useState('');
  const [adresse, setAdresse] = useState('');
  const [tel, setTel] = useState('');
  const [nom, setNom] = useState('');

  const updateSiret = async () => {
    if (auth?.currentUser?.uid == undefined) {
      alert('sign in first');
      return;
    }

    const docRef = doc(db, 'agence', auth.currentUser.uid);
    await updateDoc(docRef, {
      siret: siret,
    });
  };

  const updateAdresse = async () => {
    if (auth?.currentUser?.uid == undefined) {
      alert('sign in first');
      return;
    }

    const docRef = doc(db, 'agence', auth.currentUser.uid);
    await updateDoc(docRef, {
      adresse: adresse,
    });
  };

  const updateNom = async () => {
    if (auth?.currentUser?.uid == undefined) {
      alert('sign in first');
      return;
    }

    const docRef = doc(db, 'agence', auth.currentUser.uid);
    await updateDoc(docRef, {
      nom: nom,
    });
  };

  const updateTel = async () => {
    if (auth?.currentUser?.uid == undefined) {
      alert('sign in first');
      return;
    }

    const docRef = doc(db, 'agence', auth.currentUser.uid);
    await updateDoc(docRef, {
      tel: tel,
    });
  };

  return (
    <>
      <input
        type='text'
        placeholder='siret'
        onChange={(e) => {
          setSiret(e.target.value);
        }}
      />
      <p> siret :{siret} </p>
      <button onClick={updateSiret}>update</button>
      <input
        type='text'
        placeholder='adresse'
        onChange={(e) => {
          setAdresse(e.target.value);
        }}
      />
      <p> adrr :{adresse} </p>
      <button onClick={updateAdresse}>update</button>
      <input
        type='text'
        placeholder='tel'
        onChange={(e) => setTel(e.target.value)}
      />
      <p>tel :{tel}</p>
      <button onClick={updateTel}>update</button>
      <input
        type='text'
        placeholder='nom'
        onChange={(e) => setNom(e.target.value)}
      />
      <p>nom : {nom} </p>
      <button onClick={updateNom}>update</button>
    </>
  );
}
