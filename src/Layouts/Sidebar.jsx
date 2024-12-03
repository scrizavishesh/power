
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router-dom';
import { useMainContext } from '../Dashboard/DashboardLayout';
import 'bootstrap/dist/css/bootstrap.min.css';

const Container = styled.div`
    position: relative;
    background-color:  ${(props) => (props.lightmode ? 'var(--sidebarBackground)' : '#000')};
    width: ${({ sidebaropen }) => (sidebaropen ? '256px' : '92px')};
    transition: width 0.3s ease;
    height: 100vh;
    border-radius: 10px;
    border-top: 1px solid ${(props) => (props.lightmode ? 'var(--sidebarBorderColor)' : '#515050')};
    border-bottom: 1px solid ${(props) => (props.lightmode ? 'var(--sidebarBorderColor)' : '#515050')};
    border-right: 1px solid ${(props) => (props.lightmode ? 'var(--sidebarBorderColor)' : '#515050')};
    
    ul {
        max-height: calc(100vh - 140px);
        overflow: auto;
    }
    
    .borderTOP {
        border-top: 1px solid ${(props) => (props.lightmode ? 'var(--sidebarBorderColor)' : '#504f4f')};
    }

    .borderBottom {
        border-bottom: 1px solid ${(props) => (props.lightmode ? 'var(--sidebarBorderColor)' : '#a4a4a4')};
    }

    .border-left {
        border-left: 2px solid ${(props) => (props.lightmode ? 'var(--sidebarBorderColor)' : '#a4a4a4')};
    }

    .greyText{
        color: ${(props) => (props.lightmode ? 'var(--sidebarGreyText)' : '#a4a4a4')};
    }

    .form-check-input{
        box-shadow: none !important;
    }

    .form-check-input:checked {
        background-color: var(--cardsBlueText);
        border-color: var(--cardsBlueText);
    }

    .menus {
        position: relative;
        padding: 1rem;
        display: flex;
        color: ${(props) => (props.lightmode ? 'var(--sidebarGreyText)' : '#a4a4a4')};
        align-items: center;
        white-space: nowrap;
        text-decoration : none !important;
        justify-content: ${({ sidebaropen }) => (sidebaropen ? 'start' : 'center')};
        transition: background-color 0.3s, color 0.3s,;

        &:hover {
            color: #000;
            background-color:var(--sidebarActiveColor)
             /* ${(props) => (props.lightmode ? 'var(--sidebarActiveColor)' : '#a4a4a4')}; */
        }

        &.active {
            color: #000;
            background-color:var(--sidebarActiveColor)
        }

        .menu-text {
            display: ${({ sidebaropen }) => (sidebaropen ? 'inline' : 'none')};
            margin-left: 1%;
            transition: margin-left 0.3s ease;
        }
    }

    .collapse-menu {
        padding-left: 1.5rem;
    }

    .pointer{
        cursor: pointer;
    }

    .bgGrey{
        background-color: ${(props) => (props.lightmode ? '#FAFAFA' : '#191919')};
        position: absolute;
        bottom: 0;
    }

    .bgDarkGrey{
        background-color: ${(props) => (props.lightmode ? '#F0F0F0' : '#2b2b2b')};
    }

    .greyBorder{
        border: 1px solid ${(props) => (props.lightmode ? '#D9D9D9' : '#a4a4a4')};
    }

    .overflowclasss{
        overflow: scroll;
    }

    .bg-grey{
        background-color: #818181 !important;
    }

    .profileBgg{
        background-image: url(./images/profileBg.svg);
        background-repeat: no-repeat;
        background-size: cover;
    }

`;

const StickyHeader = styled.div`
    position: sticky;
    top: 0;
    /* z-index: 10; */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    @media screen and (max-width: 1000px) {
        justify-content: space-between;

        .sidebarclass{
            position: relative;
        }
    }

`;

const ToggleIcon = styled(Icon)`
    position: absolute;
    padding: 3px !important;
    right: -15px !important;
    margin-top: -2% !important;
    display: block !important;
    /* transition: all 0.3s ease; */
    border-radius: 4px;
    border: 1px solid ${props => (props.lightmode ? 'var(--sidebarBorderColor)' : '#555555')};
    background-color: ${props => (props.lightmode ? 'var(--sidebarBackground)' : '#272727')};
    color: ${props => (props.lightmode ? '#000' : '#b7b4b4')};
`;

const Sidebar = ({ lightmode, setlightmode }) => {

    const token = localStorage.getItem('power_token')
    const { sidebaropen, toggleSidebar } = useMainContext();




    const role = JSON.parse(localStorage.getItem("role"));
    const assigned = JSON.parse(localStorage.getItem("assigned_data"));


    const location = useLocation();

    const [activeLink, setActiveLink] = useState(() => {
        const currentPath = location.pathname === '/' ? 'dashboard' : location.pathname.slice(1);
        localStorage.setItem('activeLink', currentPath);
        return currentPath;
    });

    useEffect(() => {
        const currentPath = location.pathname === '/' ? 'dashboard' : location.pathname.slice(1);
        setActiveLink(currentPath);
        localStorage.setItem('activeLink', currentPath);
    }, [token, location.pathname]);

    const handleActiveLink = (link) => {
        setActiveLink(link);
        localStorage.setItem('activeLink', link);
    };

    const LogoutSnip = () => {
        localStorage.removeItem('power_token')
        window.location.reload();
    }




    return (
        <Container lightmode={lightmode} setlightmode={setlightmode} sidebaropen={sidebaropen}>
            <div className="container-fluid">
                <StickyHeader className="row borderBottom">
                    <div className={`${sidebaropen ? "p-2" : "p-1 pt-2 pb-2"} text-white`}>
                        <div className="d-flex justify-content-center"><img className={`img-fluid sidebarclass {sidebaropen ? "p-0" : " "}`} src="./images/PowerLogo.svg" alt="sidebarLogo" /></div>
                        <ToggleIcon lightmode={lightmode} className='toggle-icon' icon="ri:expand-left-right-line" width="1.8em" height="1.8em" onClick={toggleSidebar} />
                    </div>
                </StickyHeader>
                <div className="row p-0 ">
                    <div className="-scroll p-0">
                        <ul className={`list-unstyled ${sidebaropen ? 'p-3' : 'p-2'}`}>
                            <li className={`greyText ${sidebaropen ? 'ps-3 pt-3' : "ps-3 pt-3"}`}><h3 className="font14 menu-text mb-0"> MAIN</h3></li>
                            {
                                role === 'super admin' && (
                                    <li className='p-2'>
                                        <Link to="/productpage" className={`menus p-2 rounded-3 ${activeLink === 'productpage' ? 'active' : ''}`} onClick={() => handleActiveLink('productpage')} >
                                            <Icon icon="uil:home-alt" width="1.5em" height="1.2em" />
                                            <h3 className="font14 menu-text mb-0">Product</h3>
                                        </Link>
                                    </li>
                                )}
                            <li className='p-2'>
                                <Link to="/" className={`menus p-2 rounded-3 ${activeLink === 'dashboard' ? 'active' : ''}`} onClick={() => handleActiveLink('dashboard')} >
                                    <Icon icon="uil:home-alt" width="1.5em" height="1.2em" />
                                    <h3 className="font14 menu-text mb-0">Dashboard</h3>
                                </Link>
                            </li>
                            <li className='p-2'>
                                <Link to="/payInOperations" className={`menus p-2 rounded-3 ${activeLink === 'payInOperations' || activeLink === 'payOutOperations' ? 'active' : ''}`} onClick={() => { handleActiveLink('payInOperations'), setOperationShow }} data-bs-toggle="collapse" data-bs-target="#collapseOperations" >
                                    <Icon icon="tabler:chart-bar-popular" width="1.5em" height="1.2em" />
                                    <h3 className="font14 menu-text mb-0">Operations</h3>
                                </Link>
                                <div id="collapseOperations" className="collapse collapse-menu pt-1">
                                    <ul className='list-unstyled border-left'>
                                        <li className='p-1'>
                                            <Link to="/payInOperations" className={`menus p-2 rounded-3 ${activeLink === 'payInOperations' ? 'active' : ''}`} onClick={() => handleActiveLink('payInOperations')} >
                                                {/* <Icon icon="uil:home-alt" width="1.5em" height="1.2em" /> */}
                                                <h3 className="font14 menu-text mb-0">Pay In</h3>
                                            </Link>
                                        </li>
                                        <li className='p-1'>
                                            <Link to="/payOutOperations" className={`menus p-2 rounded-3 ${activeLink === 'payOutOperations' ? 'active' : ''}`} onClick={() => handleActiveLink('payOutOperations')} >
                                                {/* <Icon icon="uil:home-alt" width="1.5em" height="1.2em" /> */}
                                                <h3 className="font14 menu-text mb-0">Pay Out</h3>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            {
                                role !== 'Peer' && (
                                    <li className='p-2'>
                                        <Link to="/users" className={`menus p-2 rounded-3 ${activeLink === 'users' ? 'active' : ''}`} onClick={() => handleActiveLink('users')} >
                                            <Icon icon="iconoir:user" width="1.5em" height="1.2em" />
                                            <h3 className="font14 menu-text mb-0">Accounts</h3>
                                        </Link>
                                    </li>
                                )
                            }

                            <li className='p-2'>
                                <Link to="/saved_reports" className={`menus p-2 rounded-3 ${activeLink === 'saved_reports' ? 'active' : ''}`} onClick={() => handleActiveLink('saved_reports')} >
                                    <Icon icon="iconoir:page" width="1.5em" height="1.2em" />
                                    <h3 className="font14 menu-text mb-0">Statments</h3>
                                </Link>
                            </li>
                            <li className='p-2'>
                                <Link className={`menus p-2 rounded-3 ${activeLink === 'saved_reports' ? 'active' : ''}`} onClick={() => LogoutSnip()} >
                                    <Icon icon="tabler:logout-2" width="1.5em" height="1.2em" />
                                    <h3 className="font14 menu-text mb-0">Log out</h3>
                                </Link>
                            </li>
                            <li className={`profileBgg ${sidebaropen ? 'p-3' : 'p-1 pt-3 pb-3'}`} onClick={() => handleActiveLink('profile')} >
                                <Link to='/profilePage' className={` text-decoration-none ${activeLink === 'profile' ? '' : ''}`}>
                                    <p className='text-center'><img className='img-fluid' src="./images/profileImage.svg" alt="" /></p>
                                    <p className={`font20 p-1 text-white text-center ${sidebaropen ? '' : 'd-none'}`}>{assigned?.name}</p>
                                    <p className='font12 text-white text-center'>{role}</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="bgGrey p-2">
                        {sidebaropen
                            ?
                            <div className="bgDarkGrey p-2 d-flex justify-content-evenly borderRadius8">
                                <div className={`col-6 text-center font12 p-1 ps-3 pe-3 pointer ${lightmode ? ' bg-white borderRadius8 greyBorder' : 'greyText'}`}>Light</div>
                                <div className={`col-6 text-center font12 p-1 ps-3 pe-3 pointer ${lightmode ? 'greyText' : ' text-black bg-grey borderRadius8 greyBorder'}`}>Dark</div>
                            </div>
                            :
                            <div class="form-check form-switch d-flex justify-content-center">
                                <input class="form-check-input p-2" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Sidebar;