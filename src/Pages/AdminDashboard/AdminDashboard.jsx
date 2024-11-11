import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AreaChart from '../../Charts/AreaChart';
import { useMainContext } from '../../Dashboard/DashboardLayout';
import HashLoader from '../../Dashboard/Loader';
import { getDashStatics } from '../../Utils/Apis';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/users/usersSlice';
import Header from '../../Layouts/Header';

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
        <Header />
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
            <AreaChart year={year} type={type} lightMode={lightMode} />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default AdminDashboard