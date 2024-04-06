import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Accueil from './components/Accueil';
import AjouterCandidat from './components/AjouterCandidat';
import Candidat from './components/Candidat';
import Cgu from './components/Cgu';
import ChercherAvis from './components/ChercherAvis';
import Connexion from './components/Connexion';
import Contact from './components/Contact';
import DonnerAvis from './components/DonnerAvis';
import Footer from './components/Footer';
import Inscription from './components/Inscription';
import MentionsLegales from './components/MentionsLegales';
import Navbar from './components/Navbar';
import Page404 from './components/Page404';
import Personnel from './components/Personnel';
import './custom.scss';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/ajouter_candidat' element={<AjouterCandidat />} />
          <Route exact path='/personnel' element={<Personnel />} />
          <Route exact path='/' element={<Accueil />} />
          <Route path='/connexion' element={<Connexion />} />
          <Route path='/inscription' element={<Inscription />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/candidat' element={<Candidat />} />
          <Route path='/chercher_avis' element={<ChercherAvis />} />
          <Route path='/donner_avis' element={<DonnerAvis />} />
          <Route path='/mentions_legales' element={<MentionsLegales />} />
          <Route path='/cgu' element={<Cgu />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
