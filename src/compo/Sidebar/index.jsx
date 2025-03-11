import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BusinessIcon from '@mui/icons-material/Business';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MessageIcon from '@mui/icons-material/Message';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import SailingIcon from '@mui/icons-material/Sailing';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Divider from '@mui/material/Divider';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import SummarizeIcon from '@mui/icons-material/Summarize';



import { useContext, useState } from 'react';
import { MyContext } from '../../App';

const Sidebar = (props) => {

    const context = useContext(MyContext)
    
    const { activeTab, setActiveTab } = useContext(MyContext);
    const navigate = useNavigate();
  
    const handleTabClick = (index, path) => {
      setActiveTab(index);
      navigate(path);
    };

    const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);

    const isOpenSubmenu = (index) => {
        setActiveTab(index);
        setIsToggleSubmenu(!isToggleSubmenu);
    }

    return (
        <div className="flex flex-col justify-between sidebar">
            <ul>
                <li>
                    <Link to={'/user/accueil'}>
                    <Button
                        className={`w-full flex justify-between items-center ${activeTab === 0 ? 'active' : ''}`}
                        onClick={() => isOpenSubmenu(0)}
                    >
                            <span className='icon'>
                                <HomeIcon />
                            </span>
                            Accueil
                        </Button>
                    </Link>
                </li>

                {/* *Pour un administrateur, il aura a voir directement les informations ces trois bouttons qu'un seimole client */}
                <li>
                    <Button
                        className={`w-full flex justify-between items-center ${activeTab === 1 && isToggleSubmenu === true ? 'active' : ''}`}
                        onClick={() => isOpenSubmenu(1)}
                    >
                        <span className='flex items-center icon'>
                            <DashboardIcon />
                        </span>
                        Tableau de bord
                        <span className='ml-auto arrow'>
                               <ChevronRightIcon/>
                          </span>
                       </Button>
                        <div className={`submenuWrapper ${activeTab === 1 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li> <Link to={'/user/commandes'}>Commandes</Link> </li>
                                <li> <Link to={'/user/commandes-par-vente'}>Ventes</Link> </li>
                                <li> <Link to={'/user/commandes-en-ligne'}>Réservations</Link> </li>
                            </ul>
                        </div>
                </li>
                <li>
                    <Button
                        className={`w-full flex justify-between items-center ${activeTab === 2 && isToggleSubmenu === true ? 'active' : ''}`}
                        onClick={() => isOpenSubmenu(2)}
                    >
                        <span className='flex items-center icon'>
                            <BusinessIcon />
                        </span>
                        Agences
                        <span className='ml-auto arrow'>
                            <ChevronRightIcon/>
                        </span>
                    </Button>
                    <div className={`submenuWrapper ${activeTab === 2 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                        <ul className='submenu'>
                            <li> <Link to={'/user/bateaux'}>Bateau</Link> </li>
                            <li> <Link to={'/user/prix'}>Prix</Link> </li>
                            <li> <Link to={'/user/horaire'}>Horaire</Link> </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <Link to={'/user/utilisateurs'}>
                        <Button
                            className={`w-full flex justify-between items-center ${activeTab === 3 ? 'active' : ''}`}
                            onClick={() => isOpenSubmenu(3)}
                        >
                            <span className='icon'>
                                <GroupAddIcon />
                            </span>
                            Utilisateurs
                        </Button>
                    </Link>
                </li>

                <li>
                    <Link to={'/user/reservation'}>
                        <Button
                            className={`w-full flex justify-between items-center ${activeTab === 4 ? 'active' : ''}`}
                            onClick={() => isOpenSubmenu(4)}
                        >
                            <span className='icon'>
                                <ConfirmationNumberIcon />
                            </span>
                            Réservation
                        </Button>
                    </Link>
                </li>

                <li>
                    <Link to={'/user/performances'}>
                        <Button
                            className={`w-full flex justify-between items-center ${activeTab === 5 ? 'active' : ''}`}
                            onClick={() => isOpenSubmenu(5)}
                        >
                            <span className='icon'>
                                <AutoGraphIcon />
                            </span>
                            Performances
                        </Button>
                    </Link>
                </li>                

                <li>
                    <Link to={'/user/messages'}>
                        <Button
                            className={`w-full flex justify-between items-center ${activeTab === 6 ? 'active' : ''}`}
                            onClick={() => isOpenSubmenu(6)}
                        >
                            <span className='icon'>
                                <MessageIcon />
                            </span>
                            Messages
                        </Button>
                    </Link>
                </li>

                <li>
                    <Link to={'/user/fonds'}>
                        <Button
                            className={`w-full flex justify-between items-center ${activeTab === 7 ? 'active' : ''}`}
                            onClick={() => isOpenSubmenu(7)}
                        >
                            <span className='icon'>
                                <RequestQuoteIcon />
                            </span>
                            Fonds
                        </Button>
                    </Link>
                </li>

                {/* <li>
                    <Link to={'/user/rapports'}>
                        <Button
                            className={`w-full flex justify-between items-center ${activeTab === 8 ? 'active' : ''}`}
                            onClick={() => isOpenSubmenu(8)}
                        >
                            <span className='icon'>
                                <SummarizeIcon />
                            </span>
                            Rapports
                        </Button>
                    </Link>
                </li> */}

                <li>
                    <Link to={'/user/reclamation'}>
                        <Button
                            className={`w-full flex justify-between items-center ${activeTab === 9 ? 'active' : ''}`}
                            onClick={() => isOpenSubmenu(9)}
                        >
                            <span className='icon'>
                                <ReportProblemIcon />
                            </span>
                            Réclamation
                        </Button>
                    </Link>
                </li>

            </ul>

            <div className='liensEnBasDuSidebar'>

            <Divider className="w-[85%] bg-[#575454] !ml-2" />

                <ul>
                    <li>
                        <Link to={'/user/parametres'}>
                            <Button
                            className={`w-full flex justify-between items-center ${activeTab === 20 ? 'active' : ''}`}
                            onClick={() => isOpenSubmenu(20)}
                            >
                                <span className='icon'>
                                    <SettingsIcon />
                                </span>
                                Paramètres
                            </Button>
                        </Link>
                    </li>

                    <li>
                        <Link to={'/user/aide-et-supports'}>
                            <Button
                                className={`w-full flex justify-between items-center ${activeTab === 21 ? 'active' : ''}`}
                                onClick={() => isOpenSubmenu(21)}
                            >
                                <span className='icon'>
                                    <HelpIcon />
                                </span>
                                Aide et supports
                            </Button>
                        </Link>
                    </li>

                    <li>
                        <Link to={'/signout'}>
                            <Button
                                className={`w-full flex justify-between items-center ${activeTab === 22 ? 'active' : ''}`}
                                onClick={() => isOpenSubmenu(22)}
                            >
                                <span className='icon logoutSidebar'>
                                    <LogoutIcon />
                                </span>
                                <span className='logoutSidebar'>Se deconnecter</span>
                            </Button>
                        </Link>
                    </li>
                </ul>

            </div>
            
        </div>
    );
}

export default Sidebar;
  