function Card({ note, date, prenom, nom, code, avis }) {
  let couleurBordure = "";
  let smiley = "";

    if (note == 5 || note == 4) {
      couleurBordure = "green";
      smiley =  "😊";
    } else if (note == 3 || note == 2) {
      couleurBordure = "orange";
      smiley = "😐";
    } else {
      couleurBordure = "red";
      smiley ="☹️";
    }
  

  return (
    <section
      className="container text-black text-start rounded mb-4"
      style={{ border: "2px solid ", borderColor: couleurBordure }}
    >
      <h1 className="mb-2">Avis donné le {date}</h1>
      <p className="mb-1">
        <span className="fw-bold text-primary">Prenom</span> : {prenom}
      </p>
      <p className="mb-1">
        <span className="fw-bold text-primary">Nom</span> : {nom}
      </p>
      <p className="mb-1">
        <span className="fw-bold text-primary">Code candidat</span> : {code}
      </p>
      <hr className="my-2" />
      <p>
        {note}/5 {smiley} {avis}
      </p>
    </section>
  );
}

export default Card;
