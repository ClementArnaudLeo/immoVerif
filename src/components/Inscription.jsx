import { createUserWithEmailAndPassword } from 'firebase/auth';
import { set } from 'firebase/database';
import { collection, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { auth, db } from '../firebase-config';

const TestComponent = () => {
  const [mailCherche, setMailCherche] = useState('');
  const [mdp, setMdp] = useState('');
  const [mdp2, setMdp2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mdp !== mdp2) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

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
    let randompswd = mdp;
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
      <div className='container w-25 text-primary border border-primary border-3 rounded p-3 ' style={{ marginTop: '22vh' }}>
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
              id='mail'
              onChange={(e) => setMailCherche(e.target.value)}
              required
            />
          </div>


          <div className='mb-3'>
            <label htmlFor='pswd' className='form-label'>
              Mot de passe :
            </label>
            <input
              type='password'
              className='form-control mb-3'
              id='pswd'
              onChange={(e) => setMdp(e.target.value)}
              required
            />
          </div>




          <div className='mb-3'>
            <label htmlFor='pswd2' className='form-label'>
             Confirmer mot de passe :
            </label>
            <input
              type='password'
              className='form-control mb-3'
              id='pswd2'
              onChange={(e) => setMdp2(e.target.value)}
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
