
import LogoToyhe from '../../assets/TOYHE_LOGO_250x250.png';
import patern from '../../assets/ArrierePlan.jpg';
import { useState } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';

export default function ForgotPasswordPage() {

    const [inputIndex, setInputIndex] = useState(null);

    const focusInput = (index) => {
      setInputIndex(index);
    }

  return (
      <>

        <img src={patern} className='loginPatern' alt="Arriere plan de la plateforme TOYHE" />


        <section className="loginSectionPage">
        <div className="loginBox forgotPasswordSectionPage">
            <div className="logo text-center flex flex-col items-center">
              <img src={LogoToyhe} width="60px" alt="Logo de la plateforme TOYHE" />
              <h5 className='font-bold'>Connexion à la plateforme TOYHE </h5>
            </div>

            <div className='wrapper mt-3 card border border-gray-300 rounded-xl'>
              <form action="">

                <div className={`form-group mb-3 relative ${inputIndex === 0 && 'focus'}`}>
                  <span className="icon absolute inset-y-0 left-3 flex items-center">
                    <MailIcon className="text-gray-500" />
                  </span>
                  <input 
                    type="text" 
                    placeholder="Entrez votre adresse mail" 
                    className="form-control appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-950 leading-tight focus:outline-none focus:shadow-outline"
                    onFocus={() => focusInput(0)}
                    onBlur={ () => setInputIndex(null)}
                  />
                </div>  

                <div className='form-group'>
                  <Button class="boutonSeConnecter bg-[#1c75bc] text-white py-2 px-4 rounded-lg text-lg w-full">
                    Envoyer la demande
                  </Button>
                </div>        
              </form>

              <div className="mt-2 text-center">
                <Link to={'/login'} className="text-blue-500">Retour à la connexion</Link>
              </div>


            </div>
        </div>
      </section>

        
      </>
  );
}
