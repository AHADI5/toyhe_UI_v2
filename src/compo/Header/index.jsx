import { useContext, useState } from 'react';
import LogoToyhe from "./LogoToyhe";
//Pour la bar de navigation
import Button from '@mui/material/Button';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBox from "./SearchBox";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MessagesIconHeader from "./MessagesIconHeader";
import Commandes from "./Commandes";
import NotificationsIconHeader from "./NotificationsIconHeader";
import ProfilUserButton from "./ProfilUserButton";
import { MyContext } from '../../App';


const Header = (props) => {

  const context = useContext(MyContext);

    return (
      <header className="flex items-center w-full headerAuth">
        <div className="flex items-center w-full">
          {/* LOGO de la plateforme TOYHE */}
          <div className="flex items-center">
            <LogoToyhe />
          </div>
  
          {/**Le menu et bouton de recherche*/}
          <div className="flex items-center pl-4 ml-10 space-x-4">
            <Button
              onClick={ () => context.setIsToggleSidebar(!context.isToggleSidebar)} className="rounded-full"
            >
              {
                context.isToggleSidebar === false ? <MenuOpenIcon /> : <MenuIcon />
              }
            </Button>
            <SearchBox />
          </div>
          
          {/*La partie droite et ses boutons */}
          <div className="flex items-center ml-auto mr-4 space-x-2">
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
  