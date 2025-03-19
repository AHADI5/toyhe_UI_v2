import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import EmailIcon from '@mui/icons-material/Email';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import clsx from 'clsx';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import Button from '@mui/material/Button';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import { MyContext } from '../../App';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

const NotificationBadge = ({ count }) => (
  <div className="absolute flex items-center justify-center w-5 h-5 text-xs text-white rounded-full -top-2 -right-2 bg-[#e93e3a]">
    {count > 99 ? '99+' : count}
  </div>
);

const Header = ({ toggleNavbar, isNavbarOpen }) => {

  const context = useContext(MyContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const user = {
    name: 'AMURI TCHALUMBA Héritier',
    email: 'heritieramuritcha@gmail.com',
    avatar: 'https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=IvjqSNH03KwQ7kNvgE6KvEe&_nc_oc=AdhHqmqG8UhLC2O9k3NQwc1OkPtGhqGUc8UZSAZ4yXTQSnSRCC7XFDqVMjyc3tCALTk&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=PONsqZEp_7uQboNkq1dLGg&oh=00_AYGiknOI-NhB5r8UGmRNOPv7Blbk9rYE8s_TLK057-troA&oe=67DF080F'
  };

  const notifications = {
    messages: 120,
    orders: 45,
    alerts: 99
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const menuItemsMessages = [
    {
      img: "https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=LfXEhYMUdcQQ7kNvgFeSYIk&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AijBnhbHUWDZ-JJjHuPLSmV&oh=00_AYC3bXtVy1K0oUK_Oal1gIDBZw8-l1a-EGf2LAoAZOsNtA&oe=677C980F",
      name: "Héritier AMURI",
      expediteur: "Robert KULE",
      time: "Il y'a trois minutes",
    },
    {
      img: "https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=LfXEhYMUdcQQ7kNvgFeSYIk&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AijBnhbHUWDZ-JJjHuPLSmV&oh=00_AYC3bXtVy1K0oUK_Oal1gIDBZw8-l1a-EGf2LAoAZOsNtA&oe=677C980F",
      name: "Robert KULE",
      expediteur: "Heritier AMURI",
      time: "Il y'a trois minutes",
    },
    {
      img: "https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=LfXEhYMUdcQQ7kNvgFeSYIk&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AijBnhbHUWDZ-JJjHuPLSmV&oh=00_AYC3bXtVy1K0oUK_Oal1gIDBZw8-l1a-EGf2LAoAZOsNtA&oe=677C980F",
      name: "Jean-Luc",
      expediteur: "Maitre KABEZO",
      time: "Il y'a trois minutes",
    },
    {
      img: "https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=LfXEhYMUdcQQ7kNvgFeSYIk&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AijBnhbHUWDZ-JJjHuPLSmV&oh=00_AYC3bXtVy1K0oUK_Oal1gIDBZw8-l1a-EGf2LAoAZOsNtA&oe=677C980F",
      name: "Maitre KABEZO",
      expediteur: "Jean-Luc AMURI",
      time: "Il y'a trois minutes",
    }
  ];

  const [anchorElMessages, setAnchorElMessages] = useState(null);
  const openMessages = Boolean(anchorElMessages);
  const handleClickMessages = (event) => {
    setAnchorElMessages(event.currentTarget);
  };
  const handleCloseMessages = () => {
    setAnchorElMessages(null);
  };

  const menuItemsCommandes = [
    {
      img: "https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=LfXEhYMUdcQQ7kNvgFeSYIk&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AijBnhbHUWDZ-JJjHuPLSmV&oh=00_AYC3bXtVy1K0oUK_Oal1gIDBZw8-l1a-EGf2LAoAZOsNtA&oe=677C980F",
      name: "Héritier AMURI",
      class: "Première classe plus lit",
      trajet: "Goma - Bukavu",
      time: "Il y'a trois minutes",
    },
    {
      img: "https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=LfXEhYMUdcQQ7kNvgFeSYIk&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AijBnhbHUWDZ-JJjHuPLSmV&oh=00_AYC3bXtVy1K0oUK_Oal1gIDBZw8-l1a-EGf2LAoAZOsNtA&oe=677C980F",
      name: "Robert KULE",
      class: "Première classe plus lit",
      trajet: "Goma - Bukavu",
      time: "Il y'a trois minutes",
    },
    {
      img: "https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=LfXEhYMUdcQQ7kNvgFeSYIk&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AijBnhbHUWDZ-JJjHuPLSmV&oh=00_AYC3bXtVy1K0oUK_Oal1gIDBZw8-l1a-EGf2LAoAZOsNtA&oe=677C980F",
      name: "Maitre KABEZO",
      class: "Première classe plus lit",
      trajet: "Goma - Bukavu",
      time: "Il y'a trois minutes",
    },
    {
      img: "https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=LfXEhYMUdcQQ7kNvgFeSYIk&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AijBnhbHUWDZ-JJjHuPLSmV&oh=00_AYC3bXtVy1K0oUK_Oal1gIDBZw8-l1a-EGf2LAoAZOsNtA&oe=677C980F",
      name: "Jean-Luc AMURI",
      class: "Première classe plus lit",
      trajet: "Goma - Bukavu",
      time: "Il y'a trois minutes",
    },
  ];

  const [anchorElSales, setAnchorElSales] = useState(null);
  const openSales = Boolean(anchorElSales);
  const handleClickSales = (event) => {
    setAnchorElSales(event.currentTarget);
  };
  const handleCloseSales = () => {
    setAnchorElSales(null);
  };

  const menuItemsNotifications = [
    {
      img: "https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=LfXEhYMUdcQQ7kNvgFeSYIk&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AijBnhbHUWDZ-JJjHuPLSmV&oh=00_AYC3bXtVy1K0oUK_Oal1gIDBZw8-l1a-EGf2LAoAZOsNtA&oe=677C980F",
      name: "Héritier AMURI",
      context: "Vous avez effectuer une reservations pour goma ",
      expediteur: "Rober KULE",
      time: "Il y'a trois minutes",
    },
    {
      img: "https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=LfXEhYMUdcQQ7kNvgFeSYIk&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AijBnhbHUWDZ-JJjHuPLSmV&oh=00_AYC3bXtVy1K0oUK_Oal1gIDBZw8-l1a-EGf2LAoAZOsNtA&oe=677C980F",
      name: "Rober KULE",
      context: "Vous avez recu un nouveau messages provenant de ",
      expediteur: "Héritier AMURI",
      time: "Il y'a trois minutes",
    },
    {
      img: "https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=LfXEhYMUdcQQ7kNvgFeSYIk&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AijBnhbHUWDZ-JJjHuPLSmV&oh=00_AYC3bXtVy1K0oUK_Oal1gIDBZw8-l1a-EGf2LAoAZOsNtA&oe=677C980F",
      name: "Maitre KABEZO",
      context: "Vous avez recu un nouveau messages provenant de ",
      expediteur: "Jean-Luc AMURI",
      time: "Il y'a trois minutes",
    },
    {
      img: "https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=LfXEhYMUdcQQ7kNvgFeSYIk&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AijBnhbHUWDZ-JJjHuPLSmV&oh=00_AYC3bXtVy1K0oUK_Oal1gIDBZw8-l1a-EGf2LAoAZOsNtA&oe=677C980F",
      name: "Jean-Luc AMURI",
      context: "Vous avez recu un nouveau messages provenant de ",
      expediteur: "Maitre KABEZO",
      time: "Il y'a trois minutes",
    },
  ];

  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const openNotifications = Boolean(anchorElNotifications);
  const handleClickNotifications = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };
  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
  };

  const [anchorElMyAccDrop, setAnchorElMyAccDrop] = useState(null);
  const openMyAccDrop = Boolean(anchorElMyAccDrop);
  const handleClickMyAccDrop = (event) => {
    setAnchorElMyAccDrop(event.currentTarget);
  };
  const handleCloseMyAccDrop = () => {
    setAnchorElMyAccDrop(null);
  };

  return (
    <header className="h-[65px] w-full bg-white fixed top-0 left-0 z-header">
      <div className="flex items-center justify-between h-full px-4">
        {/* Logo et Menu */}
        <div className="flex items-center gap-4">
          {
            context.windowWidth > 1000 &&
            
            <Button
              onClick={ () => context.setIsToggleSidebar(!context.isToggleSidebar)}
              className="relative p-2 rounded-full bg-[#f5f5ff] hover:bg-[#dce4f7] transition-colors duration-200"
              >
              {
                context.isToggleSidebar === false ? <MenuOpenIcon className="text-[#1c75bc]" /> : <MenuIcon className="text-[#1c75bc]" />
              }
            </Button>
          }

          {
            context.windowWidth <= 1000 &&
              <Button className='rounded-full'
                onClick={ () => context.openNav()}
              >
                <MenuIcon />
              </Button>
          }

          <div className="flex items-center gap-0">
            <img 
              src="/logo_toyhe_100x100px.png" 
              alt="TOYHE" 
              className="w-10 h-10 -mt-2"
            />
            <span className="text-[#2b3990] font-bold text-4xl mt-0 tracking-tighter not-italic hidden sm:block">TOYHE</span>
          </div>
        </div>

        {/* Barre de recherche */}
        <div className={clsx(
          'absolute left-0 right-0 top-0 bg-white md:bg-transparent',
          'md:relative md:flex-1 md:max-w-2xl md:mx-4',
          'transition-all duration-300 transform',
          isSearchOpen
            ? 'h-full flex items-center justify-start px-4 translate-y-0 opacity-100'
            : 'md:translate-y-0 md:opacity-100 md:flex md:items-center translate-y-[-100%] opacity-0'
        )}>
          <div className="relative w-full max-w-[50%] md:max-w-[60%] z-10">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg bg-[#f5f5ff] focus:outline-none focus:ring-2 focus:ring-[#1c75bc]"
            />
            <SearchIcon className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={20} />
            {isSearchOpen && (
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute -translate-y-1/2 right-3 top-1/2 md:hidden"
              >
                <CloseIcon size={20} className="text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Bouton recherche mobile */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden  relative p-2 rounded-full bg-[#f5f5ff] hover:bg-[#dce4f7] transition-colors duration-200"
          >
            <SearchIcon size={24} className="text-[#1c75bc]" />
          </button>

          {/* Messages */}
          <button className="relative p-2 rounded-full bg-[#f5f5ff] hover:bg-[#dce4f7] transition-colors duration-200"
            onClick={handleClickMessages}
          >
            {notifications.messages > 0 ? (
              <EmailIcon size={24} className="text-[#1c75bc]" />
            ) : (
              <EmailOutlinedIcon size={24} className="text-[#1c75bc]" />
            )}
            {notifications.messages > 0 && <NotificationBadge count={notifications.messages} />}
          </button>

          {/* Commandes */}
          <button className="relative p-2 rounded-full bg-[#f5f5ff] hover:bg-[#dce4f7] transition-colors duration-200"
            onClick={handleClickSales}
          >
            {notifications.orders > 0 ? <ShoppingCartIcon size={24} className="text-[#1c75bc]" /> : <ShoppingCartOutlinedIcon size={24} className="text-[#1c75bc]" />}
            {notifications.orders > 0 && <NotificationBadge count={notifications.orders} />}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-full bg-[#f5f5ff] hover:bg-[#dce4f7] transition-colors duration-200"
            onClick={handleClickNotifications}
          >
            {notifications.alerts > 0 ? <NotificationsIcon size={24} className="text-[#1c75bc]" /> : <NotificationsOutlined size={24} className="text-[#1c75bc]" />}
            {notifications.alerts > 0 && <NotificationBadge count={notifications.alerts} />}
          </button>

          {/* Profil */}
          <div className="relative">
            <Button className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#f5f5ff]"
              onClick={handleClickMyAccDrop}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="object-cover w-8 h-8 rounded-full"
                onClick={handleClickMyAccDrop}
              />
              <div className="hidden text-left md:block">
                <p className="text-sm font-medium text-gray-800 truncate max-w-[14ch]">
                  {truncateText(user.name, 14)}
                </p>
                <p className="text-xs text-gray-500 truncate max-w-[16ch]">
                  {truncateText(user.email, 16)}
                </p>
              </div>
            </Button>
          </div>

        {/*Menu pour les messages */}
        <Menu
          anchorEl={anchorElMessages}
          className="dropdown_list"
          id="messages-menu"
          open={openMessages}
          onClose={handleCloseMessages}
          onClick={handleCloseMessages}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 2.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'center', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        >
          <div className="pb-0 mx-3 head">
            <h4>Messages (+99)</h4>
          </div>
          <Divider className="mb-1" />
          <div className="w-full px-3 pb-1">
            <Button className="w-full text-white bg-blue-500">Tous les messages</Button>
          </div>
          <div className="scroll">
            {menuItemsMessages.map(item => (
              <MenuItem onClick={handleCloseMessages}>
                <div className="flex">
                  <div>
                    <div className="userImg">
                      <span className="rounded-full">
                        <img src={item.img} className="w-8 h-8 rounded-full" />
                      </span>
                    </div>
                  </div>
                  <div className="dropdownInfo">
                    <h4>
                      <span>
                        <b>{item.name}</b>
                        Vous avez recu un message provenant de
                        <b> {item.expediteur}</b>
                      </span>
                    </h4>
                    <p className="mb-0 text-sky">
                      {item.time}
                    </p>
                  </div>
                </div>
              </MenuItem>
            ))}
          </div>
        </Menu>

        {/*Menu pour les commandes */}
        <Menu
            anchorEl={anchorElSales}
            className="dropdown_list"
            id="sales-menu"
            open={openSales}
            onClose={handleCloseSales}
            onClick={handleCloseSales}
            slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 2.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      left: '50%',
                      transform: 'translate(-50%, -50%) rotate(45deg)',
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      zIndex: 0,
                        },
                    },
                },
            }}
            transformOrigin={{ horizontal: 'center', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        >
          <div className="pb-0 mx-3 head">
            <h4>Ventes et réservations (+99)</h4>
          </div>
          <Divider className="mb-1" />
          <div className="w-full px-3 pb-1">
            <Button className="w-full text-white bg-blue-500">Toutes les ventes et réservations</Button>
          </div>
          <div className="scroll">
            {menuItemsCommandes.map(item => (
              <MenuItem onClick={handleCloseSales}>
                <div className="flex">
                  <div>
                    <div className="userImg">
                      <span className="rounded-full">
                        <img src={item.img} className="w-8 h-8 rounded-full" />
                      </span>
                    </div>
                  </div>

                  <div className="dropdownInfo">
                    <h4>
                      <span>
                        <b>{item.name}</b>
                        {item.class}
                        <b> {item.trajet}</b>
                      </span>
                    </h4>
                    <p className="mb-0 text-sky">
                      {item.time}
                    </p>
                  </div>
                </div>
              </MenuItem>
            ))}
          </div>
        </Menu>

        {/*Menu pour pour notification */}
        <Menu
          anchorEl={anchorElNotifications}
          className="dropdown_list"
          id="notifications"
          open={openNotifications}
          onClose={handleCloseNotifications}
          onClick={handleCloseNotifications}
          slotProps={{
            paper: {
            elevation: 0,
            sx: {
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 2.5,
              '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%) translateY(-50%) rotate(45deg)',
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              zIndex: 0,
              },
              },
            },
          }}
          transformOrigin={{
            horizontal: 'center',
            vertical: 'top',
          }}
          anchorOrigin={{
            horizontal: 'center',
            vertical: 'bottom',
          }}
        >
          <div className="pb-0 mx-3 head ">
            <h4>Notifications (+99) </h4>
          </div>
          <Divider className="mb-1" />
          <div className="w-full px-3 pb-1">
            <Button className="w-full text-white bg-blue-500">Toutes les notifications</Button>
          </div>
          <div className="scroll">
            {menuItemsNotifications.map(item => (
              <MenuItem onClick={handleCloseNotifications}>
                <div className="flex">
                  <div>
                    <div className="userImg">
                      <span className="rounded-full">
                        <img src={item.img} alt="Profi de l'utilisateur" />
                      </span>
                    </div>
                  </div>
                  <div className="dropdownInfo">
                    <h4>
                      <span>
                        <b> {item.name}</b>
                        {item.context}
                        <b> {item.expediteur} </b>
                      </span>
                    </h4>
                    <p className="mb-0 text-sky">
                      {item.time}
                    </p>
                  </div>
                </div>
              </MenuItem>
            ))}
          </div>
        </Menu>

        {/*Menu pour le profil */}
        <Menu
          anchorEl={anchorElMyAccDrop}
          id="account-menu"
          open={openMyAccDrop}
          onClose={handleCloseMyAccDrop}
          onClick={handleCloseMyAccDrop}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 2.5,
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Link to="/user/compte" className="no-underline">
            <MenuItem onClick={handleCloseMyAccDrop} className="flex items-center space-x-3">
              <ListItemIcon>
                <PersonIcon className="text-gray-500" />
              </ListItemIcon>
              <span>Mon compte</span>
            </MenuItem>
          </Link>

          <Link to="/user/parametres" className="no-underline">
            <MenuItem onClick={handleCloseMyAccDrop} className="flex items-center space-x-3">
              <ListItemIcon>
                <GppMaybeOutlinedIcon className="text-gray-500" />
              </ListItemIcon>
              <span>Modifier mot de passe</span>
            </MenuItem>
          </Link>

          <Link to="/" className="no-underline">
            <MenuItem onClick={handleCloseMyAccDrop} className="flex items-center space-x-3">
              <ListItemIcon>
                <LogoutIcon className="text-gray-500" />
              </ListItemIcon>
              <span>Se déconnecter</span>
            </MenuItem>
          </Link>
        </Menu>

        </div>
      </div>
    </header>
  );
};

export default Header;