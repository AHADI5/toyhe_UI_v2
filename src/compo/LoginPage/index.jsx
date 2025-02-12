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
              <img src={LogoToyhe} width="65px" alt="Logo de la plateforme TOYHE" />
              <h5 className='font-bold text-lg'>Connexion à la plateforme TOYHE </h5>
            </div>

            <div className='wrapper mt-3 card border border-gray-300 rounded-xl'>
              <form action="">

                <div className={`form-group mb-3 relative ${inputIndex === 0 && 'focus'}`}>
                  <span className="icon absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <MailIcon className="text-gray-500" />
                  </span>
                  <input 
                    type="text" 
                    placeholder="Entrez votre adresse mail" 
                    className="form-control w-full"
                    onFocus={() => focusInput(0)}
                    onBlur={ () => setInputIndex(null)}
                  />
                </div>

                <div className={`form-group mb-3 relative ${inputIndex === 1 && 'focus'}`}>
                  <span className="icon absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <LockIcon className="text-gray-500" />
                  </span>
                  <input 
                    type={`${isShowPassword === true ? 'text' : 'password'}`}
                    placeholder="Entrez votre mot de passe" 
                    className="form-control w-full pr-10"
                    onFocus={() => focusInput(1)}
                    onBlur={() => setInputIndex(null)}
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent border-0 cursor-pointer"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? 
                      <VisibilityIcon className="text-gray-500" /> : 
                      <VisibilityOffIcon className="text-gray-500" />
                    }
                  </button>
                </div>   

                <div className='form-group mt-4'>
                  <Button 
                    style={{ backgroundColor: '#1c75bc', color: 'white' }}
                    className="boutonSeConnecter w-full"
                  >
                    Se connecter
                  </Button>
                </div>        
              </form>

              <div className="mt-4 text-center">
                <Link to={'/forgot-password'} className="lienFormulaire">Mot de passe oublié ?</Link>
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm text-gray-900">Vous n'avez pas de compte ? <Link to={'/signup'} className="text-[#1c75bc]">Créer un compte</Link></p>
              </div>

            </div>
        </div>
      </section>
    </>
  )
}
