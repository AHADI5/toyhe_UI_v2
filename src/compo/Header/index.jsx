import { useContext, useState } from 'react';
import LogoToyhe from "./LogoToyhe";
//Pour la bar de navigation
import Button from '@mui/material/Button';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBox from "./SearchBox";
import MessagesIconHeader from "./MessagesIconHeader";
import Commandes from "./Commandes";
import NotificationsIconHeader from "./NotificationsIconHeader";
import ProfilUserButton from "./ProfilUserButton";
import { MyContext } from '../../App';


const Header = (props) => {

  const context = useContext(MyContext);

    return (
      <header className="flex items-center w-full headerAuth">
        <div className="flex flex-row items-center w-full">
          {/* LOGO de la plateforme TOYHE */}
          <div className="flex items-center part1">
            <LogoToyhe />
          </div>


          {
            context.windowWidth > 850 &&

             /**Le menu et bouton de recherche*/
            <div className="flex items-center pl-4 ml-10 space-x-4 res-hide part2">
            <Button
              onClick={ () => context.setIsToggleSidebar(!context.isToggleSidebar)} className="rounded-full"
            >
              {
                context.isToggleSidebar === false ? <MenuOpenIcon /> : <MenuIcon />
              }
            </Button>
            <SearchBox />
          </div>
          }
          
          {/*La partie droite et ses boutons */}
          <div className="flex items-center mr-4 ml-auto space-x-2 part3">
            <MessagesIconHeader />
            <Commandes />
            <NotificationsIconHeader />
            <ProfilUserButton />


            {
            context.windowWidth <= 1000 &&
              <Button className='rounded-full'
                onClick={ () => context.openNav()}
              >
                <MenuIcon />
              </Button>
            }     
          </div>
        </div>
      </header>
    );
}

export default Header;
  