
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Divider from '@mui/material/Divider';
import { useState } from 'react';

const Commandes = (props) => {

    const [anchorElSales, setAnchorElSales] = useState(null);
    const openSales = Boolean(anchorElSales);
    const handleClickSales = (event) => {
      setAnchorElSales(event.currentTarget);
    };
    const handleCloseSales = () => {
      setAnchorElSales(null);
    };

  return (
    <>
        <Button
              className="rounded-full"
              onClick={handleClickSales}
        >
            <ShoppingCartOutlinedIcon />
        </Button>

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
            <MenuItem onClick={handleCloseSales}>
            <div className="flex">
              <div>
                <div className="userImg">
                  <span className="rounded-full">
                    <img src="https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=LfXEhYMUdcQQ7kNvgFeSYIk&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AijBnhbHUWDZ-JJjHuPLSmV&oh=00_AYC3bXtVy1K0oUK_Oal1gIDBZw8-l1a-EGf2LAoAZOsNtA&oe=677C980F" alt="Profi de l'utilisateur" className="w-8 h-8 rounded-full" />
                  </span>
                </div>
              </div>

              <div className="dropdownInfo">
                <h4>
                  <span>
                    <b>Héritier AMURI</b>
                    Première classe plus lit
                    <b> Goma - Bukavu</b>
                  </span>
                </h4>
                <p className="mb-0 text-sky">
                  Il y'a trois minutes
                </p>
              </div>
            </div>
            </MenuItem>

            <MenuItem onClick={handleCloseSales}>
            <div className="flex">
              <div>
                <div className="userImg">
                  <span className="rounded-full">
                    <img src="https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=LfXEhYMUdcQQ7kNvgFeSYIk&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AijBnhbHUWDZ-JJjHuPLSmV&oh=00_AYC3bXtVy1K0oUK_Oal1gIDBZw8-l1a-EGf2LAoAZOsNtA&oe=677C980F" alt="Profi de l'utilisateur" className="w-8 h-8 rounded-full" />
                  </span>
                </div>
              </div>

              <div className="dropdownInfo">
                <h4>
                  <span>
                    <b>Héritier AMURI</b>
                    Première classe
                    <b> Bukavu - Goma</b>
                  </span>
                </h4>
                <p className="mb-0 text-sky">
                  Il y'a trois minutes
                </p>
              </div>
            </div>
            </MenuItem>

            <MenuItem onClick={handleCloseSales}>
            <div className="flex">
              <div>
                <div className="userImg">
                  <span className="rounded-full">
                    <img src="https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=SiMnMgzFhHEQ7kNvgHPiq4R&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AkJT6enAesWki3WTAHxqmXe&oh=00_AYCpVsE797bFs07VLXCrbnx_XaNaYOvOaackB8n2U08mig&oe=67697A4F" alt="Profi de l'utilisateur" className="w-8 h-8 rounded-full" />
                  </span>
                </div>
              </div>

              <div className="dropdownInfo">
                <h4>
                  <span>
                    <b>Héritier AMURI</b>
                    Première classe
                    <b> Goma - Bukavu</b>
                  </span>
                </h4>
                <p className="mb-0 text-sky">
                  Il y'a trois minutes
                </p>
              </div>
            </div>
            </MenuItem>

            <MenuItem onClick={handleCloseSales}>
            <div className="flex">
              <div>
                <div className="userImg">
                  <span className="rounded-full">
                    <img src="https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=SiMnMgzFhHEQ7kNvgHPiq4R&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AkJT6enAesWki3WTAHxqmXe&oh=00_AYCpVsE797bFs07VLXCrbnx_XaNaYOvOaackB8n2U08mig&oe=67697A4F" alt="Profi de l'utilisateur" className="w-8 h-8 rounded-full" />
                  </span>
                </div>
              </div>

              <div className="dropdownInfo">
                <h4>
                  <span>
                    <b>Héritier AMURI</b>
                    Première classe
                    <b> Bukavu - Goma</b>
                  </span>
                </h4>
                <p className="mb-0 text-sky">
                  Il y'a trois minutes
                </p>
              </div>
            </div>
            </MenuItem>

            <MenuItem onClick={handleCloseSales}>
            <div className="flex">
              <div>
                <div className="userImg">
                  <span className="rounded-full">
                    <img src="https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=SiMnMgzFhHEQ7kNvgHPiq4R&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AkJT6enAesWki3WTAHxqmXe&oh=00_AYCpVsE797bFs07VLXCrbnx_XaNaYOvOaackB8n2U08mig&oe=67697A4F" alt="Profi de l'utilisateur" className="w-8 h-8 rounded-full" />
                  </span>
                </div>
              </div>

              <div className="dropdownInfo">
                <h4>
                  <span>
                    <b>Héritier AMURI</b>
                    Première classe
                    <b> Robert KULE</b>
                  </span>
                </h4>
                <p className="mb-0 text-sky">
                  Il y'a trois minutes
                </p>
              </div>
            </div>
            </MenuItem>

            <MenuItem onClick={handleCloseSales}>
            <div className="flex">
              <div>
                <div className="userImg">
                  <span className="rounded-full">
                    <img src="https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=SiMnMgzFhHEQ7kNvgHPiq4R&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AkJT6enAesWki3WTAHxqmXe&oh=00_AYCpVsE797bFs07VLXCrbnx_XaNaYOvOaackB8n2U08mig&oe=67697A4F" alt="Profi de l'utilisateur" className="w-8 h-8 rounded-full" />
                  </span>
                </div>
              </div>

              <div className="dropdownInfo">
                <h4>
                  <span>
                    <b>Héritier AMURI</b>
                    Première classe
                    <b> Goma - Bukavu</b>
                  </span>
                </h4>
                <p className="mb-0 text-sky">
                  Il y'a trois minutes
                </p>
              </div>
            </div>
            </MenuItem>

          </div>
        </Menu>
    </>
  );
};

export default Commandes;
