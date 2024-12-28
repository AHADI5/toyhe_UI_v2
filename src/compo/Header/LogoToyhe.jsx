import { Link } from "react-router-dom";

export default function LogoToyhe() {
  return (
    <div className="sm:col-span-2 part1">
        <Link to={'/'} className="flex items-center logo">
            <img src="/logo_toyhe_100x100px.png" alt="Logo de la plateforme TOYHE" />
            <span className="ml-0">TOYHE</span>
        </Link>
    </div>
  )
}
