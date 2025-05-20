import { Link } from "react-router-dom";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const BoitesDesElements = ({ titre, contenu, filtre, Icon, lien, grow }) => {
  return (
    <Link to={lien} className="boxElements">

      {
        grow === true ?

        <span className="chartBoxElement"> <TrendingUpIcon /> </span>
        :
        <span className="chartBoxElement"> <TrendingDownIcon /> </span>
      }

      <div className="contentLeft">
        <h4 className="titreDuBox">{titre}</h4>
        <p className="contenuDuBoc">{contenu}</p>
        <span className="filtreDuBox">{filtre}</span>
      </div>
      <p className="iconDuBox">
        <Icon />
      </p>
   </Link>
  );
};

export default BoitesDesElements;
