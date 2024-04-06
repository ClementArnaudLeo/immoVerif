import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { auth } from "../firebase-config";
import { db } from "./firebase";

export default function InfosPeros() {
  const [infos, setInfos] = useState({
    adresse: "",
    mail: "",
    nom: "",
    siret: "",
    tel: "",
  });

  const [infosRecup, setInfosRecup] = useState({
    fb_id: "",
    adresse: "",
    mail: "",
    nom: "",
    siret: "",
    tel: "",
  });

  useEffect(() => {
    getInfos();
  }, []);

  const getInfos = async () => {
    if (auth.currentUser.uid == undefined) {
      alert("sign in first");
      return;
    }

    try {
      let res = [];
      const collec = collection(db, "agence");
      const q = query(collec, where("fb_id", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        res.push(doc.data());
      });
      setInfosRecup(res[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const modifiertel = async () => {
    const collec = collection(db, "agence");
    const q = query(collec, where("fb_id", "==", auth.currentUser.uid));
    try {
      updateDoc(q, {
        tel: infos.tel,
      });
    } catch (error) {
      console.error(error);
    }
    getInfos();
  };

  return (
    <>
      <p>tel : {infosRecup.tel}</p>
      <input
        type="text"
        placeholder="tel"
        onChange={(e) => setInfos({ ...infos, tel: e.target.value })}
      />
      <button onClick={modifiertel}> modifier tel</button>
    </>
  );
}
