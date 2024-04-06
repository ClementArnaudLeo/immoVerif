import { useState } from "react";
import { Link } from "react-router-dom";


function addDB (param){
    console.log("addDb" + param);}

function deleteDB (param){
    console.log("deleteDB" + param);}

function updateDB (param){
    console.log("updateDB" + param);}

function getDB (param){
    console.log("getDB" + param);}

function payWithStripe (param){
    console.log("payWithStripe" + param);}


//REGISTER
function Register (){
    const [nom, setNom] = useState("");
    const [siret, setSiret] = useState("");
    const [email, setEmail] = useState("");
    const [adresse, setAdresse] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [modalvisible, setModalVisible] = useState(false);




    function createTicket(){
        addDB([nom, siret, email, adresse]);
        setModalVisible(true);
    }
    return(
       <>
       <input type="text" placeholder="nom" onChange={(e) => setNom(e.target.value)} />
       <input type="text" placeholder="siret" onChange={(e) => setSiret(e.target.value)} />
       <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
       <input type="text" placeholder="adresse" onChange={(e) => setAdresse(e.target.value)} />
       {modalvisible && <div>
        <input type="text" placeholder="card number" onChange={(e) => setCardNumber(e.target.value)} />
        <input type="text" placeholder="expiration date" onChange={(e) => setExpirationDate(e.target.value)} />
        <input type="text" placeholder="cvv" onChange={(e) => setCvv(e.target.value)} />
        <input type="submit" value="submit" onClick={()=>payWithStripe({cardNumber, expirationDate, cvv, siret})} />
       </div>}
       <input type="submit" value="submit" onClick={createTicket} />
       </>
    )

}

/*
employé immoCertif : 
ouvre la db des tickets / depuis espace admin get le dernier ticket : getDB(collec("tickets"))
regarde si le paiment stripe avec le meme siret a ete effectué 
creer le compte : createAccountWithEmailAndPassword(email, 123456789)
passe le ticket en "validé" : updateDB(collec("tickets").where(siret, "==", siret).update(status, "validé")
envoi le courrier
*/

//LOGIN
function Login (){
    const [nom, setNom] = useState("");
    const [mdp, setmdp] = useState("");

    function loginfct(){
        console.log(nom, mdp);
    }

    return(
       <>
       <input type="text" placeholder="nom" onChange={(e) => setNom(e.target.value)} />
       <input type="password" placeholder="mdp" onChange={(e) => setmdp(e.target.value)} />
       <input type="submit" value="submit" onClick={loginfct} />
       </>
    )

}


//NAVBAR
function Navbar (){
    function logoutfct(){
        console.log("logout function");
    }
    return(
        <nav>
            <Link to="/" >Home</Link>
            <Link to="/login" >Login</Link>
            <Link to="/register" >Register</Link>
            <button onClick={logoutfct} >Logout</button>
        </nav>
    )

}