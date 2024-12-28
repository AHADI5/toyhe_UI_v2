import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Divider from '@mui/material/Divider';
import { useState } from 'react';

const NotificationsIconHeader = (props) => {

    const [anchorElNotifications, setAnchorElNotifications] = useState(null);
    const openNotifications = Boolean(anchorElNotifications);
    const handleClickNotifications = (event) => {
      setAnchorElNotifications(event.currentTarget);
    };
    const handleCloseNotifications = () => {
      setAnchorElNotifications(null);
    };

  return (
    <>



        <Button
              className="rounded-full"
              onClick={handleClickNotifications}
            >
              <NotificationsOutlinedIcon />
        </Button>

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
              <div className="pb-0 head mx-3 ">
                <h4>Notifications (+99) </h4>
              </div>

              <Divider className="mb-1" />

              <div className="pb-1 px-3 w-full">
                <Button className="bg-blue-500 text-white w-full">Toutes les notifications</Button>
              </div>

              <div className="scroll">
                <MenuItem onClick={handleCloseNotifications}>
                  <div className="flex">
                    <div>
                      <div className="userImg">
                        <span className="rounded-full">
                          <img src="https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=SiMnMgzFhHEQ7kNvgHPiq4R&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AkJT6enAesWki3WTAHxqmXe&oh=00_AYCpVsE797bFs07VLXCrbnx_XaNaYOvOaackB8n2U08mig&oe=67697A4F" alt="Profi de l'utilisateur" />
                        </span>
                      </div>
                    </div>

                    <div className="dropdownInfo">
                      <h4>
                        <span>
                          <b> Heritier AMURI</b>
                          Vous avez recu un message provenant de
                          <b> Robert KULE </b>
                        </span>
                      </h4>
                      <p className="mb-0 text-sky">
                        Il y'a trois minutes
                      </p>
                    </div>
                  </div>
                </MenuItem>

                <MenuItem onClick={handleCloseNotifications}>
                  <div className="flex">
                    <div>
                      <div className="userImg">
                        <span className="rounded-full">
                          <img src="https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=SiMnMgzFhHEQ7kNvgHPiq4R&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AkJT6enAesWki3WTAHxqmXe&oh=00_AYCpVsE797bFs07VLXCrbnx_XaNaYOvOaackB8n2U08mig&oe=67697A4F" alt="Profi de l'utilisateur" />
                        </span>
                      </div>
                    </div>

                    <div className="dropdownInfo">
                      <h4>
                        <span>
                          <b> Heritier AMURI</b>
                          Vous avez recu un message provenant de
                          <b> Robert KULE </b>
                        </span>
                      </h4>
                      <p className="mb-0 text-sky">
                        Il y'a trois minutes
                      </p>
                    </div>
                  </div>
                </MenuItem>

                <MenuItem onClick={handleCloseNotifications}>
                  <div className="flex">
                    <div>
                      <div className="userImg">
                        <span className="rounded-full">
                          <img src="https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=SiMnMgzFhHEQ7kNvgHPiq4R&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AkJT6enAesWki3WTAHxqmXe&oh=00_AYCpVsE797bFs07VLXCrbnx_XaNaYOvOaackB8n2U08mig&oe=67697A4F" alt="Profi de l'utilisateur" />
                        </span>
                      </div>
                    </div>

                    <div className="dropdownInfo">
                      <h4>
                        <span>
                          <b> Heritier AMURI</b>
                          Vous avez recu un message provenant de
                          <b> Robert KULE </b>
                        </span>
                      </h4>
                      <p className="mb-0 text-sky">
                        Il y'a trois minutes
                      </p>
                    </div>
                  </div>
                </MenuItem>

                <MenuItem onClick={handleCloseNotifications}>
                  <div className="flex">
                    <div>
                      <div className="userImg">
                        <span className="rounded-full">
                          <img src="https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=SiMnMgzFhHEQ7kNvgHPiq4R&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AkJT6enAesWki3WTAHxqmXe&oh=00_AYCpVsE797bFs07VLXCrbnx_XaNaYOvOaackB8n2U08mig&oe=67697A4F" alt="Profi de l'utilisateur" />
                        </span>
                      </div>
                    </div>

                    <div className="dropdownInfo">
                      <h4>
                        <span>
                          <b> Heritier AMURI</b>
                          Vous avez recu un message provenant de
                          <b> Robert KULE </b>
                        </span>
                      </h4>
                      <p className="mb-0 text-sky">
                        Il y'a trois minutes
                      </p>
                    </div>
                  </div>
                </MenuItem>

                <MenuItem onClick={handleCloseNotifications}>
                  <div className="flex">
                    <div>
                      <div className="userImg">
                        <span className="rounded-full">
                          <img src="https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=SiMnMgzFhHEQ7kNvgHPiq4R&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AkJT6enAesWki3WTAHxqmXe&oh=00_AYCpVsE797bFs07VLXCrbnx_XaNaYOvOaackB8n2U08mig&oe=67697A4F" alt="Profi de l'utilisateur" />
                        </span>
                      </div>
                    </div>

                    <div className="dropdownInfo">
                      <h4>
                        <span>
                          <b> Heritier AMURI</b>
                          Vous avez recu un message provenant de
                          <b> Robert KULE </b>
                        </span>
                      </h4>
                      <p className="mb-0 text-sky">
                        Il y'a trois minutes
                      </p>
                    </div>
                  </div>
                </MenuItem>

                <MenuItem onClick={handleCloseNotifications}>
                  <div className="flex">
                    <div>
                      <div className="userImg">
                        <span className="rounded-full">
                          <img src="https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-1/418805976_1609226313159384_2385096231440398921_n.jpg?stp=c0.0.534.534a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeELeIuaCe4VE_YQRPvCZnt4bYlPxk5tFaVtiU_GTm0VpQRMfdo71lEtPyiB9HtDvezsDICIbjYwc4G3I-Jld-f9&_nc_ohc=SiMnMgzFhHEQ7kNvgHPiq4R&_nc_zt=24&_nc_ht=scontent.fgom1-1.fna&_nc_gid=AkJT6enAesWki3WTAHxqmXe&oh=00_AYCpVsE797bFs07VLXCrbnx_XaNaYOvOaackB8n2U08mig&oe=67697A4F" alt="Profi de l'utilisateur" />
                        </span>
                      </div>
                    </div>

                    <div className="dropdownInfo">
                      <h4>
                        <span>
                          <b> Heritier AMURI</b>
                          Vous avez recu un message provenant de
                          <b> Robert KULE </b>
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

export default NotificationsIconHeader;
