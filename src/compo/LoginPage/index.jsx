import { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext.js";
import LogoToyhe from "../../assets/TOYHE_LOGO_250x250.png";
import patern from "../../assets/ArrierePlan.jpg";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputIndex, setInputIndex] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      // La redirection se fait dans AuthContext via navigate("/user")
    } catch (err) {
      setError("Échec de connexion. Vérifiez vos identifiants.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <img src={patern} className="loginPatern" alt="Arrière plan de la plateforme TOYHE" />
      <section className="loginSectionPage">
        <div className="loginBox forgetPassword">
          <div className="flex flex-col items-center text-center logo">
            <img src={LogoToyhe} width="65px" alt="Logo de la plateforme TOYHE" />
            <h5 className="text-lg font-bold">Connexion à la plateforme TOYHE</h5>
          </div>

          <div className="p-4 mt-3 border border-gray-300 wrapper card rounded-xl">
            {/* Message d'erreur affiché au-dessus des inputs */}
            {error && <p className="mb-4 text-center text-red-600">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className={`form-group mb-3 relative ${inputIndex === 0 ? "focus" : ""}`}>
                <span className="absolute inset-y-0 flex items-center pointer-events-none icon left-3">
                  <MailIcon className="text-gray-500" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Entrez votre adresse mail"
                  className="w-full pl-10 form-control"
                  onFocus={() => setInputIndex(0)}
                  onBlur={() => setInputIndex(null)}
                  required
                />
              </div>

              <div className={`form-group mb-3 relative ${inputIndex === 1 ? "focus" : ""}`}>
                <span className="absolute inset-y-0 flex items-center pointer-events-none icon left-3">
                  <LockIcon className="text-gray-500" />
                </span>
                <input
                  type={isShowPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe"
                  className="w-full pl-10 pr-10 form-control"
                  onFocus={() => setInputIndex(1)}
                  onBlur={() => setInputIndex(null)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent border-0 cursor-pointer"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? (
                    <VisibilityIcon className="text-gray-500" />
                  ) : (
                    <VisibilityOffIcon className="text-gray-500" />
                  )}
                </button>
              </div>

              <div className="mt-4 form-group">
                <Button
                  type="submit"
                  style={{ backgroundColor: "#1c75bc", color: "white" }}
                  className="w-full boutonSeConnecter"
                  disabled={loading}
                >
                  {loading ? "Connexion..." : "Se connecter"}
                </Button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="lienFormulaire">
                Mot de passe oublié ?
              </Link>
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm text-gray-900">
                Vous n'avez pas de compte ?{" "}
                <Link to="/signup" className="text-[#1c75bc]">
                  Créer un compte
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
