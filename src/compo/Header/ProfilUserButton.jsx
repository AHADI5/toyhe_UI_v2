
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import { useState } from 'react';

const ProfilUserButton = (props) => {
  const [anchorElMyAccDrop, setAnchorElMyAccDrop] = useState(null);
  const openMyAccDrop = Boolean(anchorElMyAccDrop);
  const handleClickMyAccDrop = (event) => {
    setAnchorElMyAccDrop(event.currentTarget);
  };
  const handleCloseMyAccDrop = () => {
    setAnchorElMyAccDrop(null);
  };

  return (
    <>
      <div className="relative myAccWrapper">
        <Button
          className="flex items-center space-x-3 myAcc"
          onClick={handleClickMyAccDrop}
        >
          <div className="w-10 h-10 overflow-hidden rounded-full userImg">
            <span className='rounded-full'>
                <img
                    src="https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=LfXEhYMUdcQQ7kNvgFeSYIk&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AijBnhbHUWDZ-JJjHuPLSmV&oh=00_AYC3bXtVy1K0oUK_Oal1gIDBZw8-l1a-EGf2LAoAZOsNtA&oe=677C980F"
                    alt="Profil de l'utilisateur"
                    className="object-cover w-full h-full"
                />
            </span>
          </div>

          <div className='userInfo'>
            <h4 className="text-lg font-semibold">Héritier AMURI</h4>
            <p className="text-sm text-gray-500 truncate">heritieramuritcha...</p>
          </div>
        </Button>

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
          <MenuItem onClick={handleCloseMyAccDrop} className="flex items-center space-x-3">
            <ListItemIcon>
              <PersonIcon className="text-gray-500" />
            </ListItemIcon>
            <span>Mon compte</span>
          </MenuItem>
          <MenuItem onClick={handleCloseMyAccDrop} className="flex items-center space-x-3">
            <ListItemIcon>
              <GppMaybeOutlinedIcon className="text-gray-500" />
            </ListItemIcon>
            <span>Modifier mot de passe</span>
          </MenuItem>
          <MenuItem onClick={handleCloseMyAccDrop} className="flex items-center space-x-3">
            <ListItemIcon>
              <LogoutIcon className="text-gray-500" />
            </ListItemIcon>
            <span>Se déconnecter</span>
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default ProfilUserButton;
