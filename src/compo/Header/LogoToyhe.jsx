import { Link } from "react-router-dom";
import { MyContext } from '../../App';
import { useContext } from "react";

export default function LogoToyhe() {

  const context = useContext(MyContext);

  return (
    <div className="sm:col-span-2 part1">
        <Link to={'/user'} className="flex items-center logo">
            <img src="/logo_toyhe_100x100px.png" alt="Logo de la plateforme TOYHE" />

            {
              context.windowWidth > 370 &&
              <span className="text-[#2b3990] font-bold text-4xl mt-0 tracking-tighter not-italic">
                TOYHE
              </span>
            }
        </Link>
    </div>
  )
}
