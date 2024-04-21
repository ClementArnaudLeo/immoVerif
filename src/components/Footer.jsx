import React from 'react';
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className=" d-flex justify-content-between text-primary  border-top border-2 border-primary w-100" style={{position: "relative", top: "100px"}}>
      <section style={{margin : "1%"}}>
        <img src="images/nouveaulogobottombar.png" style={{width : "200px"}} alt="logo" />
        <p><Link to="/mentions_legales" >Mentions légales</Link> | <Link to="/cgu" >CGU</Link></p>
        <p className="text-secondary">{new Date().getFullYear()} © ImmoVerif, All rights reserved</p>
      </section>
      <section className="d-flex" style={{margin : "1%"}}>
        <section className="mx-5">
          <p className='mt-1'>Une question ?</p>
          <p>Téléphone :<br/>06 69 72 75 73</p>
        </section>
        <section className="mx-5" >
          <Link to="/contact" className="btn btn-primary mb-2">Contactez-nous</Link>
          <p>Adresse :<br/>35 Bd du Roi Clément, 78000 Versailles</p>
        </section>
      </section>
    </footer>
  )
}