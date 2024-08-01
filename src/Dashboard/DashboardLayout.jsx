import React, { createContext, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../Layouts/Navbar';
import Sidebar from '../Layouts/Sidebar';
import Main from '../Main/Main';
import { useDispatch, useSelector } from 'react-redux';

const Container = styled.div`
    display: flex;
    width: 100%;
    /* position: fixed; */
    background-color:  ${(props) => (props.lightmode ? 'var(--sidebarBackground)' : '#000')};
    .hideScrollBar::-webkit-scrollbar {
        display: none !important;
    }
`;

const FirstColumn = styled.div`
    flex-shrink: 0;
    width: ${(props) => (props.sidebaropen ? '256px' : '92px')};
    transition: width 0.3s ease, transform 0.3s ease;
    /* z-index: 2; */
    /* transition: all 0.3s ease; */

    @media screen and (max-width: 1000px) {
        transform: translateX(${(props) => (props.sidebaropen ? '0' : '-100%')});
        position: absolute;
        /* z-index: 999; */
        top: 0;
        bottom: 0;
        left: 0;
        width: 200px;
    }
`;

const SecondColumn = styled.div`
    width: ${(props) => (props.sidebaropen ? '85%' : '96%')};
    transition: all width 0.6s ease; 
    height: 100vh;
    background-color: ${(props) => (props.lightmode ? 'var(--dashboardBg)' : '#000')};
    overflow : scroll;

    @media screen and (max-width: 1000px) {
        width: 100% !important;
    }
`;

const MainContext = createContext();
export const useMainContext = () => useContext(MainContext);

const DashboardLayout = () => {

    const [lightmode, setlightmode] = useState(true);
    const [sidebaropen, setsidebaropen] = useState(() => window.innerWidth > 1000);

    useEffect(() => {
        const handleResize = () => {
            setsidebaropen(window.innerWidth > 1000);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setsidebaropen(!sidebaropen);
    };

    return (
        <MainContext.Provider value={{ sidebaropen, toggleSidebar }}>
            <Container lightmode={lightmode} setlightmode={setlightmode}>
                <FirstColumn sidebaropen={sidebaropen} className='hideScrollBar'>
                    <Sidebar lightmode={lightmode} setlightmode={setlightmode} className='h-100' />
                </FirstColumn>
                <SecondColumn lightmode={lightmode} setlightmode={setlightmode} sidebaropen={sidebaropen} className='hideScrollBar'>
                    <div className="container-fluid">
                        <div className="row overflow-scroll">
                            <Main lightmode={lightmode} setlightmode={setlightmode} />
                        </div>
                    </div>
                </SecondColumn>
            </Container>
        </MainContext.Provider>
    );
};

export default DashboardLayout;
