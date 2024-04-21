import { signOut } from "firebase/auth";
import React from "react";
import { AiFillLock } from "react-icons/ai";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

export default function Navbar() {
  const navigate = useNavigate();
  const hadnelSignOut = async () => {
    try {
      await signOut(auth);
      alert("Deconnecté avec succès");
    } catch (error) {
      alert(" erreur lors de la decconnexion : " + error);
    }
    navigate("/");
  };
  return (
    <nav className="d-flex justify-content-between w-75 mx-auto" id="navbar">
      <Link to="/" className="mt-2">
        <img src="images/nouveaulogo.png" style={{ width: "200px" }} alt="logo" />
      </Link>
      <div>
        <Link className="btn btn-outline-primary border-2 fw-bold " to="/contact">
           <BsFillEnvelopeFill /> Contact
        </Link>
        <span className=" text-primary fs-3" style={{top:"6px", position:"relative"}}>  | </span>
        <Link className="btn btn-primary  border-2" to="personnel">
          <AiFillLock /> Espace personnel
        </Link>
        <button
          className={
            "btn btn-outline-danger ms-2 " + (auth.currentUser ? "" : "d-none")
          }
          onClick={hadnelSignOut}
        >
          <IoIosLogOut /> Deconnexion
        </button>
      </div>
    </nav>
  );
}
