import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AreaChart from '../../Charts/AreaChart';
import { useMainContext } from '../../Dashboard/DashboardLayout';
import HashLoader from '../../Dashboard/Loader';
import { getDashStatics } from '../../Utils/Apis';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/users/usersSlice';

const Container = styled.div`
  .greyText{
    /* color: var(--sidebarGreyText); */
    color: var(--sidebarGreyText);
  }

  .bg-grey{
    background-color: #2d2d2d !important;
  }

  .cardsGreyText{
    color: var(--cardsGreyText);
  }

  .cardBgBlue{
    /* background-color: var(--cardsBgBlueColor); */
    background-color: var(--cardsBgBlueColor);
  }

  .cardBlueText{
    /* color: var(--cardsBlueText) */
    color: var(--cardsBlueText);
  }
  
  .form-control::placeholder{
    color: var(--searchGreyText);
  }

  .borderNone{
    border: none !important;
  }

  .form-select{
    box-shadow: none !important;
    border: none !important;
  }

  .pointer{
    cursor: pointer;
  }

  .bgCarddarkMode{
    background-color: #1e1e1e;
  }

  .toggleBars{
    display: none !important;
  }

  @media screen and (max-width: 1000px) {

    .toggleBars{
      display: block !important;
    }
  }

`;

const AdminDashboard = ({ lightMode }) => {

  const { toggleSidebar } = useMainContext();
  const dispatch = useDispatch();
  const { users, status, error } = useSelector(state => state.users);
  const [profileDetails, setprofileDetails] = useState(users[0]);
  const [year, setYear] = useState(2024);
  const [type, setType] = useState('payin')
  
  const [showLoader, setShowLoader] = useState(false);
  
  const [Statics, setStatics] = useState('');

  const fetchData = async () => {
    try {
      setShowLoader(true)
      const orderResponse = await getDashStatics();
      console.log(orderResponse, "Dash Statics ")
      if (orderResponse?.status === 200) {
        setStatics(orderResponse?.data);
        setTimeout(() => {
          setShowLoader(false);
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
    fetchData();
  }, [dispatch]);

  const handleType = (value) => {
    setType(value)
  }

  const handleyear = (value) => {
    setYear(value)
  }





  return (
    <Container lightMode={lightMode} >
      {
        showLoader && (
          <HashLoader />
        )
      }
      <div className="container-fluid p-lg-5 p-3">
        <Icon className='toggleBars mb-3' icon="fa6-solid:bars" width="1.5em" height="1.5em" style={{ color: '#000' }} onClick={toggleSidebar} />
        <div className="row">
          <div className="col-md-7 col-sm-12 order-md-1 order-sm-2">
            <p className='greyText font14 fontWeight700'>Hi {profileDetails?.username},</p>
            <p className={`font32 fontWeight700`}>Welcome to Dashboard</p>
          </div>
          <div className="col-md-5 col-sm-12 order-md-2 order-sm-1 align-self-center">
            <div className="row">
              <div className="col-2 align-self-center text-center">
                <svg className='pointer' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.5127 26.8077C11.2034 27.577 12.09 27.9997 13.01 27.9997H13.0114C13.9354 27.9997 14.826 27.577 15.518 26.8063C15.8887 26.397 16.5207 26.3637 16.93 26.733C17.3407 27.1023 17.374 27.7357 17.0047 28.145C15.9274 29.341 14.51 29.9997 13.0114 29.9997H13.0087C11.514 29.9983 10.0994 29.3397 9.02604 28.1437C8.6567 27.7343 8.69004 27.101 9.1007 26.733C9.51137 26.3623 10.1434 26.3957 10.5127 26.8077ZM13.0764 1.33301C19.0031 1.33301 22.9844 5.94901 22.9844 10.2597C22.9844 12.477 23.5484 13.417 24.1471 14.4143C24.7391 15.3983 25.4098 16.5157 25.4098 18.6277C24.9444 24.0237 19.3111 24.4637 13.0764 24.4637C6.84177 24.4637 1.20711 24.0237 0.747088 18.713C0.743106 16.5157 1.41377 15.3983 2.00577 14.4143L2.21476 14.0625C2.72934 13.1782 3.16844 12.2161 3.16844 10.2597C3.16844 5.94901 7.14977 1.33301 13.0764 1.33301ZM13.0764 3.33301C8.41644 3.33301 5.16844 6.98368 5.16844 10.2597C5.16844 13.0317 4.39911 14.313 3.71911 15.4437C3.17377 16.3517 2.74311 17.069 2.74311 18.6277C2.96577 21.1423 4.62577 22.4637 13.0764 22.4637C21.4804 22.4637 23.1924 21.0837 23.4138 18.541C23.4098 17.069 22.9791 16.3517 22.4338 15.4437C21.7538 14.313 20.9844 13.0317 20.9844 10.2597C20.9844 6.98368 17.7364 3.33301 13.0764 3.33301Z" fill='#232323' />
                  <circle cx="21.4097" cy="5.33301" r="4.5" fill="#FC2222" stroke="#F2F2F2" />
                </svg>
              </div>
              <div className="col-10">
                <input className={`form-control p-2 ps-3 rounded-5 borderNone font16 bg-white`} type="search" placeholder="🔍  Search" aria-label="Search"></input>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-3 col-lg-6 col-md-3 col-sm-6 p-4">
            <div className={`row p-3 borderRadius8 bg-white`}>
              <div className='d-flex pt-2 pb-3'>
                <span className='flex-grow-1'> <img className='p-2 borderRadius12 cardBgBlue' src="./images/walletSettings.svg" alt="" /> </span>
                <Icon className='pointer' icon="bi:three-dots" width="1.5em" height="1.5em" style={{ color: '#2C6DB5' }} />
              </div>
              <p className='cardsGreyText font14 fontWeight900'>Total PayIn Operations</p>
              <p className='cardBlueText font28 fontWeight900'>{Statics?.payin_stats?.total_payin_operations}</p>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-3 col-sm-6 p-4">
            <div className={`row p-3 borderRadius8 bg-white`}>
              <div className='d-flex pt-2 pb-3'>
                <span className='flex-grow-1'> <img className='p-2 borderRadius12 cardBgBlue' src="./images/walletSettings.svg" alt="" /> </span>
                <Icon className='pointer' icon="bi:three-dots" width="1.5em" height="1.5em" style={{ color: '#2C6DB5' }} />
              </div>
              <p className='cardsGreyText font14 fontWeight900'>Total PayIn</p>
              <p className='cardBlueText font28 fontWeight900'>{Statics?.payin_stats?.total_payin}</p>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-3 col-sm-6 p-4">
            <div className={`row p-3 borderRadius8 bg-white`}>
              <div className='d-flex pt-2 pb-3'>
                <span className='flex-grow-1'> <img className='p-2 borderRadius12 cardBgBlue' src="./images/walletSettings.svg" alt="" /> </span>
                <Icon className='pointer' icon="bi:three-dots" width="1.5em" height="1.5em" style={{ color: '#2C6DB5' }} />
              </div>
              <p className='cardsGreyText font14 fontWeight900'>Total PayOut Operations</p>
              <p className='cardBlueText font28 fontWeight900'>{Statics?.payout_stats?.total_payout_operations}</p>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-3 col-sm-6 p-4">
            <div className={`row p-3 borderRadius8 bg-white`}>
              <div className='d-flex pt-2 pb-3'>
                <span className='flex-grow-1'> <img className='p-2 borderRadius12 cardBgBlue' src="./images/walletSettings.svg" alt="" /> </span>
                <Icon className='pointer' icon="bi:three-dots" width="1.5em" height="1.5em" style={{ color: '#2C6DB5' }} />
              </div>
              <p className='cardsGreyText font14 fontWeight900'>Total PayOut</p>
              <p className='cardBlueText font28 fontWeight900'>{Statics?.payout_stats?.total_payout}</p>
            </div>
          </div>
        </div>
        <div className="row p-3">
          <div className="d-flex pb-3">
            <div className="flex-grow-1">
              <p className='font28 fontWeight700 cardsGreyText'>Analytics</p>
            </div>
            <div className="d-flex align-self-center">
              {/* <Icon icon="lets-icons:date-fill" width="1.5em" height="1.5em"  style={{color: '#2C6DB5'}} /> */}
              <select className={`form-select font12 borderRadius8 cardBlueText me-3 pointer bg-white`} onChange={(e) => handleType(e.target.value)} aria-label="Default select example">
                <option disbaled="true">--Choose--</option>
                <option defaultValue value="payin">PayIn</option>
                <option value="payout">PayOut</option>
              </select>
              {/* <select className={`form-select font12 borderRadius8 cardBlueText me-3 pointer bg-white`} aria-label="Default select example">
                <option disbaled="true">--Choose--</option>
                <option value="Daily">Daily</option>
                <option defaultValue value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
                <option value="Yearly">Yearly</option>
              </select> */}
              <span className='pointer'><Icon icon="bi:three-dots" width="1.5em" height="1.5em" style={{ color: '#2C6DB5' }} /></span>
            </div>
          </div>
          <div className={`${lightMode ? 'bg-white' : 'bgGrey'} p-4 borderRadius8`}>
            <AreaChart year={year} type= {type} lightMode={lightMode} />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default AdminDashboard