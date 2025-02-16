
import { useState } from 'react';
import '../Messages.css';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const Messages = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='chat-content'>
            <div className="content-sidebar">
                <div className="content-sidebar-title">Messages</div>
                <form action="" className='content-sidebar-form'>
                    <input type="search" className='content-sidebar-input' placeholder='Recherchez...' />
                    <button type='submit' className='content-sidebar-submit'> <SearchIcon /> </button>
                </form>

                <div className="content-messages">
                    <ul className="content-messages-list">
                        <li className="content-message-title"><span>Recents</span></li>
                        <li className='active'>
                            <a href="#">
                                <img className='content-message-image' src="https://media.istockphoto.com/id/1386479313/fr/photo/heureuse-femme-daffaires-afro-am%C3%A9ricaine-mill%C3%A9naire-posant-isol%C3%A9e-sur-du-blanc.jpg?b=1&s=612x612&w=0&k=20&c=jU-e6xok-ijV-H4y-zuwCh_SLjrWawAHcz8ZXg2fV7c=" alt="Utilisateur" />
                                <span className='content-message-info'>
                                    <span className="content-messages-name">AMURI TCHALUMBA Héritier</span>
                                    <span className="content-messages-text">Lorem ipsum dolor sit amet consectetur.</span>
                                </span>
                                <span className='content-message-more'>
                                    <span className="content-message-unred">5</span>
                                    <span className="content-message-time">12:30</span>
                                </span>
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <img className='content-message-image' src="https://media.istockphoto.com/id/1386479313/fr/photo/heureuse-femme-daffaires-afro-am%C3%A9ricaine-mill%C3%A9naire-posant-isol%C3%A9e-sur-du-blanc.jpg?b=1&s=612x612&w=0&k=20&c=jU-e6xok-ijV-H4y-zuwCh_SLjrWawAHcz8ZXg2fV7c=" alt="Utilisateur" />
                                <span className='content-message-info'>
                                    <span className="content-messages-name">AMURI TCHALUMBA Héritier</span>
                                    <span className="content-messages-text">Lorem ipsum dolor sit amet consectetur.</span>
                                </span>
                                <span className='content-message-more'>
                                    <span className="content-message-unred">5</span>
                                    <span className="content-message-time">12:30</span>
                                </span>
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <img className='content-message-image' src="https://media.istockphoto.com/id/1386479313/fr/photo/heureuse-femme-daffaires-afro-am%C3%A9ricaine-mill%C3%A9naire-posant-isol%C3%A9e-sur-du-blanc.jpg?b=1&s=612x612&w=0&k=20&c=jU-e6xok-ijV-H4y-zuwCh_SLjrWawAHcz8ZXg2fV7c=" alt="Utilisateur" />
                                <span className='content-message-info'>
                                    <span className="content-messages-name">AMURI TCHALUMBA Héritier</span>
                                    <span className="content-messages-text">Lorem ipsum dolor sit amet consectetur.</span>
                                </span>
                                <span className='content-message-more'>
                                    <span className="content-message-unred">5</span>
                                    <span className="content-message-time">12:30</span>
                                </span>
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <img className='content-message-image' src="https://media.istockphoto.com/id/1386479313/fr/photo/heureuse-femme-daffaires-afro-am%C3%A9ricaine-mill%C3%A9naire-posant-isol%C3%A9e-sur-du-blanc.jpg?b=1&s=612x612&w=0&k=20&c=jU-e6xok-ijV-H4y-zuwCh_SLjrWawAHcz8ZXg2fV7c=" alt="Utilisateur" />
                                <span className='content-message-info'>
                                    <span className="content-messages-name">AMURI TCHALUMBA Héritier</span>
                                    <span className="content-messages-text">Lorem ipsum dolor sit amet consectetur.</span>
                                </span>
                                <span className='content-message-more'>
                                    <span className="content-message-unred">5</span>
                                    <span className="content-message-time">12:30</span>
                                </span>
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <img className='content-message-image' src="https://media.istockphoto.com/id/1386479313/fr/photo/heureuse-femme-daffaires-afro-am%C3%A9ricaine-mill%C3%A9naire-posant-isol%C3%A9e-sur-du-blanc.jpg?b=1&s=612x612&w=0&k=20&c=jU-e6xok-ijV-H4y-zuwCh_SLjrWawAHcz8ZXg2fV7c=" alt="Utilisateur" />
                                <span className='content-message-info'>
                                    <span className="content-messages-name">AMURI TCHALUMBA Héritier</span>
                                    <span className="content-messages-text">Lorem ipsum dolor sit amet consectetur.</span>
                                </span>
                                <span className='content-message-more'>
                                    <span className="content-message-unred">5</span>
                                    <span className="content-message-time">12:30</span>
                                </span>
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <img className='content-message-image' src="https://media.istockphoto.com/id/1386479313/fr/photo/heureuse-femme-daffaires-afro-am%C3%A9ricaine-mill%C3%A9naire-posant-isol%C3%A9e-sur-du-blanc.jpg?b=1&s=612x612&w=0&k=20&c=jU-e6xok-ijV-H4y-zuwCh_SLjrWawAHcz8ZXg2fV7c=" alt="Utilisateur" />
                                <span className='content-message-info'>
                                    <span className="content-messages-name">AMURI TCHALUMBA Héritier</span>
                                    <span className="content-messages-text">Lorem ipsum dolor sit amet consectetur.</span>
                                </span>
                                <span className='content-message-more'>
                                    <span className="content-message-unred">5</span>
                                    <span className="content-message-time">12:30</span>
                                </span>
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <img className='content-message-image' src="https://media.istockphoto.com/id/1386479313/fr/photo/heureuse-femme-daffaires-afro-am%C3%A9ricaine-mill%C3%A9naire-posant-isol%C3%A9e-sur-du-blanc.jpg?b=1&s=612x612&w=0&k=20&c=jU-e6xok-ijV-H4y-zuwCh_SLjrWawAHcz8ZXg2fV7c=" alt="Utilisateur" />
                                <span className='content-message-info'>
                                    <span className="content-messages-name">AMURI TCHALUMBA Héritier</span>
                                    <span className="content-messages-text">Lorem ipsum dolor sit amet consectetur.</span>
                                </span>
                                <span className='content-message-more'>
                                    <span className="content-message-unred">5</span>
                                    <span className="content-message-time">12:30</span>
                                </span>
                            </a>
                        </li>


                    </ul>
                </div>

            </div>


            <div className='conversation'>
                <div className="conversation-top">
                    <button type='button' className='conversation-back'> <ArrowBackIcon /> </button>
                    <div className="conversation-user">
                       <img className='conversation-user-image' src="https://media.istockphoto.com/id/1386479313/fr/photo/heureuse-femme-daffaires-afro-am%C3%A9ricaine-mill%C3%A9naire-posant-isol%C3%A9e-sur-du-blanc.jpg?b=1&s=612x612&w=0&k=20&c=jU-e6xok-ijV-H4y-zuwCh_SLjrWawAHcz8ZXg2fV7c=" alt="Utilisateur" />
                       <div>
                            <div className="conversation-user-name">AMURI TCHALUMBA Heritier</div>
                            <div className="conversation-user-status online">On line</div>
                       </div>
                    </div>
                    <div className="conversation-role-persone">Agent Marketing</div>
                </div>


                <div className="conversation-main">
                    <ul className="conversation-wrapper">
                        <li className="conversation-item me">
                            <div className="conversation-item-side">
                                <img className='content-item-image' src="https://media.istockphoto.com/id/1386479313/fr/photo/heureuse-femme-daffaires-afro-am%C3%A9ricaine-mill%C3%A9naire-posant-isol%C3%A9e-sur-du-blanc.jpg?b=1&s=612x612&w=0&k=20&c=jU-e6xok-ijV-H4y-zuwCh_SLjrWawAHcz8ZXg2fV7c=" alt="Utilisateur" />
                            </div>
                            <div className="conversation-item-content">
                                <div className="conversation-item-wrapper">
                                    <div className="conversation-item-box">
                                        <div className="conversation-item-text">
                                            <p>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores velit ut quia iusto voluptates tempora? Ipsam sed beatae sunt architecto repellendus sequi amet expedita. Numquam consequuntur obcaecati autem magni laborum.
                                            </p>
                                            <div className="conversation-item-time">12:40</div>
                                        </div>
                                        <div className="conversation-item-dropdown">
                                            <button type='button' className='conversation-item-dropdown-toggle'> <MoreVertIcon /> </button>
                                            <ul className='conversation-item-dropdown-list'>
                                                <li> <a href="#"> <EditOutlinedIcon />Modifiez</a></li>
                                                <li> <a href="#"> <DeleteOutlineOutlinedIcon />Supprimez</a> </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>

                                <div className="conversation-item-wrapper">
                                    <div className="conversation-item-box">
                                        <div className="conversation-item-text">
                                            <p>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores velit ut quia iusto voluptates tempora? Ipsam sed beatae sunt architecto repellendus sequi amet expedita. Numquam consequuntur obcaecati autem magni laborum.
                                            </p>
                                            <div className="conversation-item-time">12:40</div>
                                        </div>
                                        <div className="conversation-item-dropdown">
                                            <button type='button' className='conversation-item-dropdown-toggle'> <MoreVertIcon /> </button>
                                            <ul className='conversation-item-dropdown-list'>
                                                <li> <a href="#"> <EditOutlinedIcon />Modifiez</a></li>
                                                <li> <a href="#"> <DeleteOutlineOutlinedIcon />Supprimez</a> </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>

                                <div className="conversation-item-wrapper">
                                    <div className="conversation-item-box">
                                        <div className="conversation-item-text">
                                            <p>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores velit ut quia iusto voluptates tempora? Ipsam sed beatae sunt architecto repellendus sequi amet expedita. Numquam consequuntur obcaecati autem magni laborum.
                                            </p>
                                            <div className="conversation-item-time">12:40</div>
                                        </div>
                                        <div className="conversation-item-dropdown">
                                            <button type='button' className='conversation-item-dropdown-toggle' onClick={() => setIsOpen(!isOpen)}> <MoreVertIcon /> </button>
                                            <ul className={`conversation-item-dropdown-list ${isOpen ? 'active' : ''}`}>
                                                <li><a href="#"><EditOutlinedIcon /> Modifier</a></li>
                                                <li><a href="#"><DeleteOutlineOutlinedIcon /> Supprimer</a></li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>



                            </div>
                        </li>

                        <li className="conversation-item">
                            <div className="conversation-item-side">
                                <img className='content-item-image' src="https://media.istockphoto.com/id/1386479313/fr/photo/heureuse-femme-daffaires-afro-am%C3%A9ricaine-mill%C3%A9naire-posant-isol%C3%A9e-sur-du-blanc.jpg?b=1&s=612x612&w=0&k=20&c=jU-e6xok-ijV-H4y-zuwCh_SLjrWawAHcz8ZXg2fV7c=" alt="Utilisateur" />
                            </div>
                            <div className="conversation-item-content">
                                <div className="conversation-item-wrapper">
                                    <div className="conversation-item-box">
                                        <div className="conversation-item-text">
                                            <p>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores velit ut quia iusto voluptates tempora? Ipsam sed beatae sunt architecto repellendus sequi amet expedita. Numquam consequuntur obcaecati autem magni laborum.
                                            </p>
                                            <div className="conversation-item-time">12:40</div>
                                        </div>
                                        <div className="conversation-item-dropdown">
                                            <button type='button' className='conversation-item-dropdown-toggle'> <MoreVertIcon /> </button>
                                            <ul className='conversation-item-dropdown-list'>
                                                <li> <a href="#"> <EditOutlinedIcon />Modifiez</a></li>
                                                <li> <a href="#"> <DeleteOutlineOutlinedIcon />Supprimez</a> </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>

                                <div className="conversation-item-wrapper">
                                    <div className="conversation-item-box">
                                        <div className="conversation-item-text">
                                            <p>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores velit ut quia iusto voluptates tempora? Ipsam sed beatae sunt architecto repellendus sequi amet expedita. Numquam consequuntur obcaecati autem magni laborum.
                                            </p>
                                            <div className="conversation-item-time">12:40</div>
                                        </div>
                                        <div className="conversation-item-dropdown">
                                            <button type='button' className='conversation-item-dropdown-toggle'> <MoreVertIcon /> </button>
                                            <ul className='conversation-item-dropdown-list'>
                                                <li> <a href="#"> <EditOutlinedIcon />Modifiez</a></li>
                                                <li> <a href="#"> <DeleteOutlineOutlinedIcon />Supprimez</a> </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>

                                <div className="conversation-item-wrapper">
                                    <div className="conversation-item-box">
                                        <div className="conversation-item-text">
                                            <p>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores velit ut quia iusto voluptates tempora? Ipsam sed beatae sunt architecto repellendus sequi amet expedita. Numquam consequuntur obcaecati autem magni laborum.
                                            </p>
                                            <div className="conversation-item-time">12:40</div>
                                        </div>
                                        <div className="conversation-item-dropdown">
                                            <button type='button' className='conversation-item-dropdown-toggle' onClick={() => setIsOpen(!isOpen)}> <MoreVertIcon /> </button>
                                            <ul className={`conversation-item-dropdown-list ${isOpen ? 'active' : ''}`}>
                                                <li><a href="#"><EditOutlinedIcon /> Modifier</a></li>
                                                <li><a href="#"><DeleteOutlineOutlinedIcon /> Supprimer</a></li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </li>

                    </ul>
                </div>


            </div>



        </div>
    );
};

export default Messages;