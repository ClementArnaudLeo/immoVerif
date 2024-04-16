import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { auth, db } from '../firebase-config';

const TestComponent = () => {
  const [mailCherche, setMailCherche] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let user_uid;

    //recupere mail dans db fnaim
    const docRef = doc(db, 'mailFNAIM', mailCherche);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      alert("Ce mail n'est associé à aucune agence")
      return;
    } else {
      const data = docSnap.data();
      console.log(data);
    }

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
        return;
      });

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
      return;
    }

    //supprimer le mail dans la table mailFNAIM
    const docRef2 = doc(db, 'mailFNAIM', mailCherche);
    try {
      await deleteDoc(docRef2);
      console.log('deleted');
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div style={{ minHeight: '64vh' }}>
      <div className='container w-25 text-primary border border-primary border-1 rounded p-3 mt-5 '>
        <h1>Créer un compte</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='mail' className='form-label'>
              Veuillez entrer le mail associé a votre compte FNAIM / UNIS / SNP
              / interkab :
            </label>
            <input
              type='text'
              className='form-control mb-3'
              placeholder='agence@fnaim.fr'
              id='mail'
              onChange={(e) => setMailCherche(e.target.value)}
              required
            />
          </div>
          <button
            type='submit'
            onClick={handleSubmit}
            className='btn btn-primary btn-block w-100 mb-3'
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestComponent;
