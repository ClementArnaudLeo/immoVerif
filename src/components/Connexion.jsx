import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';

function Connexion() {
  const navigate = useNavigate();
  const [mail, setmail] = useState('test@mail.com');
  const [password, setPassword] = useState('123456');
  const [passwordre, setPasswordre] = useState('123456');

  const handleSubmit = async (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        
        navigate('/personnel');
      })

      .catch((error) => {
        alert('erreur lors de la connexion : ' + error.message);
      });
  };

  return (
    <div style={{ minHeight: '64vh' }}>
      <div className='container w-25 text-primary border border-primary border-3 rounded p-3 '  style={{ marginTop: '22vh' }}>
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='mail' className='form-label'>
              Adresse mail:
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='agence@fnaim.com'
              id='mail'
              value={mail}
              onChange={(e) => setmail(e.target.value)}
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Mot de passe:
            </label>
            <input
              type='password'
              placeholder='mot de passe'
              className='form-control'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='btn btn-primary btn-lg w-100 mb-2'>
            Confirmer
          </button>
          <Link
            to='/inscription'
            type='submit'
            className=' mb-2 btn btn-primary btn-lg w-100'
          >
            Inscription
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Connexion;
