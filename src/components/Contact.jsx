import emailjs from "emailjs-com";
import React from "react";

function Contact() {
  function envoyerEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.YOUR_SERVICE_ID,
        process.env.YOUR_TEMPLATE_ID,
        e.target,
        process.env.YOUR_USER_ID
      )
      .then(
        (result) => {
         alert("Email envoyé !", result.text);
        },
        (error) => {
          alert("Erreur lors de l'envoi de l'email :", error.text);
        }
      );

    // Réinitialisation du formulaire après envoi
    e.target.reset();
  }

  return (
    <form  className={"container text-primary w-25"} onSubmit={envoyerEmail}>
      <h1 className="text-primary text-center mb-3">Une question ?</h1>

<p className="text-primary text-center m-auto w-10 mb-3">
  Nos équipes supports et commerciales se tiennent à votre disposition
  pour répondre à vos questions. Remplissez le formulaire et nous vous
  contacterons dans les 24H.
</p>
      <div className="mb-3">
        <label className="form-label">
          Nom<span className="text-danger">*</span>:
        </label>
        <input type="text" className="form-control" name="user_name" required />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Prénom<span className="text-danger">*</span>:
        </label>
        <input
          type="text"
          className="form-control"
          name="user_surname"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Email<span className="text-danger">*</span>:
        </label>
        <input
          type="email"
          className="form-control"
          name="user_email"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Téléphone:</label>
        <input type="tel" className="form-control" name="user_phone" />
      </div>
      <div className="mb-3">
        <label className="form-label">Société:</label>
        <input type="text" className="form-control" name="user_company" />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Message<span className="text-danger">*</span>:
        </label>
        <textarea className="form-control" name="message" rows="1" required />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Envoyer
      </button>
    </form>
  );
}

export default Contact;

/*

import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase-config";


export default function Contact() {
  const [societe, setSociete] = useState("");
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!email || !nom || !prenom || !message) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    addDoc(collection(db, "Contact"), {
      societe,
      email,
      nom,
      prenom,
      telephone,
      message,
    })
    .catch((error) => {
      alert(error.message);
    })
    .then(() => {
      setMessage('');
      setSociete('');
      setNom('');
      setPrenom('');
      setTelephone('');
      setEmail('');
    })
    
    
  }
  return (
    <>
      <h1 className="text-primary text-center">Une question ?</h1>

      <p className="text-primary text-center m-auto w-50">
        Nos équipes supports et commerciales se tiennent à votre disposition
        pour répondre à vos questions. Remplissez le formulaire et nous vous
        contacterons dans les 24H.
      </p>
      <main className="container text-primary w-25">
  <form className="my-2 p-3 rounded" onSubmit={handleFormSubmit}>
    <div className="mb-3">
      <label htmlFor="societe" className="form-label">
        Société
      </label>
      <input
        type="text"
        className="form-control"
        id="societe"
        value={societe}
        onChange={(e) => setSociete(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="mail" className="form-label">
        Email*
      </label>
      <input
        type="email"
        className="form-control"
        id="mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="nom" className="form-label">
        Nom*
      </label>
      <input
        type="text"
        className="form-control"
        id="nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="prenom" className="form-label">
        Prénom*
      </label>
      <input
        type="text"
        className="form-control"
        id="prenom"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="tel" className="form-label">
        Téléphone
      </label>
      <input
        type="tel"
        className="form-control"
        id="tel"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="message" className="form-label">
        Message*
      </label>
      <textarea
        className="form-control"
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
    </div>
    <button type="submit" className="btn btn-primary btn-block w-100">
      Envoyer
    </button>
  </form>
</main>

    </>
  );
}

*/
