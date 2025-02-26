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
            <div className="flex flex-col items-center text-center logo">
              <img src={LogoToyhe} width="65px" alt="Logo de la plateforme TOYHE" />
              <h5 className='text-lg font-bold'>Mot de passe oublié</h5>
            </div>

            <div className='mt-3 rounded-xl border border-gray-300 wrapper card'>
              <form action="">

                <div className={`form-group mb-3 relative ${inputIndex === 0 && 'focus'}`}>
                  <span className="flex absolute inset-y-0 left-3 items-center pointer-events-none icon">
                    <MailIcon className="text-gray-500" />
                  </span>
                  <input 
                    type="text" 
                    placeholder="Entrez votre adresse mail" 
                    className="w-full form-control"
                    onFocus={() => focusInput(0)}
                    onBlur={() => setInputIndex(null)}
                  />
                </div>  

                <div className='mt-4 form-group'>
                  <Button 
                    style={{ backgroundColor: '#1c75bc', color: 'white' }}
                    className="w-full boutonSeConnecter"
                  >
                    Envoyer la demande
                  </Button>
                </div>        
              </form>

              <div className="mt-4 text-center">
                <Link to={'/login'} className="lienFormulaire">Retour à la connexion</Link>
              </div>

            </div>
        </div>
      </section>

        
      </>
  );
}
