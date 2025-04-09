
import { BsPersonFillCheck } from "react-icons/bs";; // Pour les agents
import { BsPersonFillLock } from "react-icons/bs"; // Client potentiel
import { BsPersonHeart } from "react-icons/bs"; // Client
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded'; // Partenaire
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'; // Tous les utilisateurs

import BoitesDesElements from "../Dashboard/BoitesDesElements";
import FiltresDeResultats from "../Dashboard/FiltresDeResultats";
import TableauDesELements from "../Dashboard/TableauDesELements";

const Utilisateurs = (props) => {

  return (
    <>

      <div className="mb-3">
        <FiltresDeResultats />
      </div>


      <div className="usersBoxWrapper">
        <BoitesDesElements
          titre="Total des agents"
          contenu="20 K"
          filtre="Pour l'année 2024"
          Icon={BsPersonFillCheck}
          lien="#agents"
          grow={true}
        />
        <BoitesDesElements
          titre="Clients potentiels"
          contenu="10 K"
          filtre="Pour l'année 2024"
          Icon={BsPersonFillLock}
          lien="#clients-potentiels"
          grow={false}
        />
        <BoitesDesElements
          titre="Clients"
          contenu="5 K"
          filtre="Pour l'année 2024"
          Icon={BsPersonHeart}
          lien="#clients"
          grow={true}
        />
        <BoitesDesElements
          titre="Partenaires"
          contenu="100"
          filtre="Pour l'année 2024"
          Icon={HandshakeRoundedIcon}
          lien="#partenaires"
          grow={false}
        />
        <BoitesDesElements
          titre="Tous les utilisateurs"
          contenu="30 K"
          filtre="Pour l'année 2024"
          Icon={GroupsRoundedIcon}
          lien="#tous-utilisateurs"
          grow={true}
        />
      </div>


      <div className="mt-3">
        <TableauDesELements />
      </div>


    </>
  );
};

export default Utilisateurs;
