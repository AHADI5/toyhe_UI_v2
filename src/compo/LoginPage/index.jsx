
import LogoToyhe from '../../assets/TOYHE_LOGO_250x250.png';
import patern from '../../assets/ArrierePlan.jpg';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function LoginPage() {

  const [inputIndex, setInputIndex] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const focusInput = (index) => {
    setInputIndex(index);
  }

  return (
    <>
      <img src={patern} className='loginPatern' alt="Arriere plan de la plateforme TOYHE" />
      <section className="loginSectionPage">
        <div className="loginBox forgetPassword">
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

                <div className={`form-group mb-3 relative ${inputIndex === 1 && 'focus'}`}>
                  <span className="icon absolute inset-y-0 left-3 flex items-center">
                    <LockIcon className="text-gray-500" />
                  </span>
                  <input 
                    type={`${isShowPassword === true ? 'text' : 'password'}`}
                    placeholder="Entrez votre mot de passe" 
                    className="form-control appearance-none border rounded w-full py-2 pl-10 pr-10 text-gray-950 leading-tight focus:outline-none focus:shadow-outline"
                    onFocus={() => focusInput(1)}
                    onBlur={() => setInputIndex(null)}
                  />
                  <span className="toggleShowPassword absolute inset-y-0 right-3 flex items-center"
                    onClick={ () => setIsShowPassword(!isShowPassword)}
                  >
                    {
                      isShowPassword === true ? <VisibilityIcon className="text-gray-500" /> : <VisibilityOffIcon className="text-gray-500" />
                    }
                  </span>
                </div>   

                <div className='form-group'>
                  <Button class="boutonSeConnecter bg-[#1c75bc] text-white py-2 px-4 rounded-lg text-lg w-full">
                    Se connecter
                  </Button>
                </div>        
              </form>


              <div className="mt-4 text-center">
                <Link to={'/forgot-password'} className="lienFormulaire text-sm">Mot de passe oublié ?</Link>
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm text-gray-900">Vous n'avez pas de compte ? <Link to={'/signup'} className="text-blue-500">Créer un compte</Link></p>
              </div>


            </div>
        </div>
      </section>
    </>
  )
}
