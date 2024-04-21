function Card({ note, date, prenom, nom, code, avis, tel, agence_nom }) {
  let couleurBordure = "";
  let smiley = "";
  note = Math.floor(note);

  if (note <= 5 && note >= 4) {
    couleurBordure = "green";
    smiley = "😊";
  } else if (note <= 3 && note >= 2) {
    couleurBordure = "orange";
    smiley = "😐";
  } else {
    couleurBordure = "red";
    smiley = "☹️";
  }

  return (
    <>
      <h1 className="mb-2 text-black text-start">Avis donné le {date}</h1>
      <section
        className="container text-black text-start rounded mb-4 fs-4  p-2"
        style={{ border: "2px solid ", borderColor: couleurBordure }}
      >
        <div className="w-50 d-inline-block">
          <p className="mb-1">
            <span className="fw-bold text-primary">Agence</span> : {
              agence_nom
            }
          </p>
          <p className="mb-1">
            <span className="fw-bold text-primary">Tel</span> : {tel}
          </p>
        </div>
        <div className="w-50 d-inline-block">
          <p className="mb-1">
            <span className="fw-bold text-primary">code candidat </span> : {code}
          </p>
          <p className="mb-1">
            <span className="fw-bold text-primary">Locataire</span> : {nom}{" "}
            {prenom}
          </p>
        </div>

        <hr className="my-2 border border-black border-2" />
        <p>
          {note}/5 {smiley} {avis}
        </p>
      </section>
    </>
  );
}

export default Card;
