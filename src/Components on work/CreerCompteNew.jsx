import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  addDoc,
  collection,
  collection,
  doc,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default async function CreerCompteNew() {
  const [email, setEmail] = React.useState("");

  //recupere le mail s'il existe
  const mailFNAIM = collection(db, "mailFNAIM");
  const q = query(mailFNAIM, where("mail", "==", email));

  //affiche le mail dans la console
  let mail = "";
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    if (doc.data() == []) {
      //arret de la focntion et message comme quoi le mail n existe pas
      return;
    } else {
      //affiche le mail dans la console
      doc.id, " => ", doc.data();
      mail = doc.data().mail;
    }
  });

  //genere un mot de passe aleatoire et unique
  const mdp = uuidv4();

  //creer le compte pour l agence
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, mail, mdp);

  //enregiste le mail et mdp dans la table "a envoyer par courrier"
  const ref = doc(db, "aEnvoyerParCourrier");
  await addDoc(ref, {
    mail: mail,
    mdp: mdp,
  });

  //creer la table agence dans firestore
  const reff = collection(db, "agence");
  await addDoc(reff, {
    fb_id: "", //recuperer lors de la creation du compte
    adresse: "adresse",
    mail: "mail",
    nom: "nom",
    siret: "siret",
    tel: "tel",
  });

  return (
    <>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      ;
    </>
  );
}
