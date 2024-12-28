import { useState } from 'react';
import LogoToyhe from "./LogoToyhe";
//Pour la bar de navigation
import Button from '@mui/material/Button';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SearchBox from "./SearchBox";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MessagesIconHeader from "./MessagesIconHeader";
import Commandes from "./Commandes";
import NotificationsIconHeader from "./NotificationsIconHeader";
import ProfilUserButton from "./ProfilUserButton";


const Header = (props) => {
    return (
      <header className="headerAuth flex items-center w-full">
        <div className="flex items-center w-full">
          {/* LOGO de la plateforme TOYHE */}
          <div className="flex items-center">
            <LogoToyhe />
          </div>
  
          {/**Le menu et bouton de recherche*/}
          <div className="flex items-center pl-4 ml-10 space-x-4">
            <Button className="rounded-full"> <MenuOpenIcon /> </Button>
            <SearchBox />
          </div>
          
          {/*La partie droite et ses boutons */}
          <div className="ml-auto flex items-center mr-4 space-x-2">
            {/* Ajouter ici vos icônes de navigation */}
            <Button className="rounded-full"> <LightModeOutlinedIcon /> </Button>
            <MessagesIconHeader />
            <Commandes />
            <NotificationsIconHeader />
            <ProfilUserButton />
          </div>
        </div>
      </header>
    );
}

export default Header;
  