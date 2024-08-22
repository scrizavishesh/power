import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { useMainContext } from '../../Dashboard/DashboardLayout';
import { getDashStatics } from '../../Utils/Apis';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HashLoader from '../../Dashboard/Loader';
import { fetchUsers } from '../../redux/users/usersSlice';

const Container = styled.div`

    .cardBgBlue{
        background-color: var(--profileCardsBg);
    }

    .table tbody tr, .table thead tr {
        border-top: 0.1px solid #fff ;
        border-bottom: 0.1px solid #fff ;
    }

    .table>:not(caption)>*>* {
        padding: 0.4rem !important;
    }

    .tbodyy {
        background-color: var(--profileCardsBg); 
    }

    .tableHeadText{
        color: var(--cardsGreyText);
    }

    .textttBlue{
        color: var(--publishBtn);
    }

    .toggleBars{
        display: none !important;
    }

    @media screen and (max-width: 1000px) {
        .toggleBars{
        display: block !important;
        }
    }

    .blueBggg{
        background-color: var(--blueBggSettings) !important;
    }

    .form-control{
        border: 0.4px solid var(--formControlBorder) !important;
        border-radius: var(--borderRadius12) !important;
    }

    .labelGreyText{
        color: var(--tableTextGrey);
    }

    .orangeWarnText{
        color: var(--orangeWarnText);
    }

    .addNewUserBtn, .addNewUserBtn:active, .addNewUserBtn:focus{
        padding: 1% 2% 1% 2%;
        color: var(--cardsBlueText);
        background-color: var(--addNewUserButton);
    }

    .form-select{
        border: none !important;
        box-shadow: none !important;
        --bs-form-select-bg-img: none !important;
    }

    .dropdown-toggle::after{
        display: none !important;
    }

    .btnPublishUser, .btnPublishUser:active, .btnPublishUser:focus{
        height: 50px;
        color: var(--sidebarBackground);
        background-color: var(--publishBtn);
    }

    .exportBtn, .exportBtn:active, .exportBtn:focus{
        color: #000;
        border: 1px solid #000 !important;
    }

    .greyText3{
        color: var(--greyText3);
    }
    
    .borderBlue{
        border: 1px solid var(--publishBtn);
    }

    .form-check-input:checked {
        background-color: var(--cardsBlueText);
        border-color: var(--cardsBlueText);
    }

    .payInReqBtn, .payInReqBtn:active, .payInReqBtn:focus{
        width: 173px;
        /* height: 46px;  */
        color: var(--sidebarBackground);
        background-color: var(--publishBtn);
    }

`;

const ProfilePage = () => {

    

    const { toggleSidebar } = useMainContext();
    const dispatch = useDispatch();
    const { users, status, error } = useSelector(state => state.users);
    const [showLoader, setShowLoader] = useState(false);

    const [profileDetails, setprofileDetails] = useState(users[0]);
    const [Statics, setStatics] = useState('');


    const fetchData = async () => {
        try {
            setShowLoader(true);
            const orderResponse = await getDashStatics();
            console.log(orderResponse, "Dash Statics ")
            if (orderResponse?.status === 200) {
                setShowLoader(false);
                setStatics(orderResponse?.data)
            }
        } catch (err) {
            console.log(err);
        }
    };

    const totalOperation = Statics?.payin_stats?.total_payin_operations + Statics?.payout_stats?.total_payout_operations


    useEffect(() => {
        dispatch(fetchUsers());
        fetchData();
    }, [dispatch]);







    return (
        <Container>
            {status === 'loading' && (
                <HashLoader />
            )}
            <div className="container-fluid p-lg-5 p-3">
                <Icon className='toggleBars mb-3' icon="fa6-solid:bars" width="1.5em" height="1.5em" style={{ color: '#000' }} onClick={toggleSidebar} />
                <div className="row">
                    <div className="col-md-2 col-sm-6">
                        <p className='greyText font14 fontWeight700'>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb mb-1">
                                    <li class="breadcrumb-item "><a className='textttBlue text-decoration-none' href="#">Pages</a></li>
                                    <li class="breadcrumb-item active text-black" aria-current="page">Profile</li>
                                </ol>
                            </nav></p>
                        <p className='font32 Bold'>Profile</p>
                    </div>
                    <div className="col-md-4 col-sm-6  align-self-center">
                        <input className='form-control p-2 ps-3 borderNone font16 bg-white borderRadius8' type="search" placeholder="🔍  Search" aria-label="Search" />
                    </div>
                    <div className="col-md-6 col-sm-12 align-self-center text-end">
                        <button className="btn exportBtn align-self-center">
                            <Icon className='me-2' icon="ph:export-bold" width="1.2em" height="1.2em" style={{ color: '#000' }} />
                            Export
                        </button>
                    </div>
                </div>
                <div className="row p-2">
                    <p className='p-1 font14 fw-normal greyText3'>{profileDetails?.username} Profile </p>
                </div>
                <div className="row">
                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-xl-4 col-lg-6 col-md-3 col-sm-6 p-4">
                                <div className={`row p-1 borderRadius8 cardBgBlue`}>
                                    <div className='d-flex p-1'>
                                        <div className='col-8 align-self-center p-2'>
                                            <p className='cardsGreyText font12 fontWeight900'>Total Operations</p>
                                            <p className='cardBlueText font24 fontWeight900'>{totalOperation}</p>
                                        </div>
                                        <span className='col-4'> <img className='p-2 borderRadius12' src="./images/blueBg.svg" alt="" /> </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-3 col-sm-6 p-4">
                                <div className={`row p-1 borderRadius8 cardBgBlue`}>
                                    <div className='d-flex p-1'>
                                        <div className='col-8 align-self-center p-2'>
                                            <p className='cardsGreyText font12 fontWeight900'>Total PayIn</p>
                                            <p className='cardBlueText font24 fontWeight900'>{Statics?.payin_stats?.total_payin}</p>
                                        </div>
                                        <span className='col-4'> <img className='p-2 borderRadius12' src="./images/blueBg.svg" alt="" /> </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-3 col-sm-6 p-4">
                                <div className={`row p-1 borderRadius8 cardBgBlue`}>
                                    <div className='d-flex p-1'>
                                        <div className='col-8 align-self-center p-2'>
                                            <p className='cardsGreyText font12 fontWeight900'>Total PayOut</p>
                                            <p className='cardBlueText font24 fontWeight900'>{Statics?.payout_stats?.total_payout_operations}</p>
                                        </div>
                                        <span className='col-4'> <img className='p-2 borderRadius12' src="./images/blueBg.svg" alt="" /> </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row p-2">
                            <div className="overflow-scroll bg-white borderRadius12">
                                <table class="table m-0 m-1">
                                    <thead>
                                        <tr className='p-2'>
                                            <th className='tableHeadText fw-lighter font14'>UPI</th>
                                            <th className='tableHeadText fw-lighter font14'>Pay In</th>
                                            <th className='tableHeadText fw-lighter font14'>Pay Out</th>
                                            <th className='tableHeadText fw-lighter font14'>Pay In Limit</th>
                                            <th className='tableHeadText fw-lighter font14'>Pay Out Limit</th>
                                        </tr>
                                    </thead>
                                    <tbody className='tbodyy'>
                                        <tr className='cardBgBlue p-2'>
                                            <td className='fw-lighter font14'>{profileDetails?.upi_id} </td>
                                            <td className='fw-lighter font14'>Yes</td>
                                            <td className='fw-lighter font14'>No</td>
                                            <td className='fw-lighter font14'>{profileDetails?.payin_limit}</td>
                                            <td className='fw-lighter font14'>{profileDetails?.payout_limit}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 p-4">
                        <div className="row cardBgBlue borderRadius8">
                            <p className='p-2 textGrey2 labelGreyText'>Schedule</p>
                            <p className='ps-3 pe-3 pb-3'>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </p>
                            <p className='text-center mb-3'><Link to='/payInOperations' class="btn payInReqBtn borderRadius32" type="button">PayIn Request</Link></p>
                            <p className='text-center mb-3'><Link to='/payOutOperations' class="btn payInReqBtn borderRadius32 ms-2" type="button">PayOut Request</Link></p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className='d-flex'>
                        <span className='flex-grow-1 font16 fw-bold align-self-center'>
                            Bank Details
                        </span>
                        <span className='borderBlue borderRadius32 p-2 ps-4 pe-4 textttBlue'>
                            <Icon className='me-2' icon="iconamoon:edit" width="1.5em" height="1.5em" style={{ color: '#4F7BD1' }} />
                            Update
                        </span>
                    </div>
                    <div className="overflow-scroll bg-white borderRadius12 mt-3">
                        <table class="table m-0 m-1">
                            <thead>
                                <tr>
                                    <th className='tableHeadText fw-lighter font14'>Name</th>
                                    <th className='tableHeadText fw-lighter font14'>User Name</th>
                                    <th className='tableHeadText fw-lighter font14'>Email Id</th>
                                    <th className='tableHeadText fw-lighter font14'>Phone Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='fw-lighter font14'>{profileDetails?.name}</td>
                                    <td className='fw-lighter font14'>{profileDetails?.username}</td>
                                    <td className='fw-lighter font14'>{profileDetails?.email}</td>
                                    <td className='fw-lighter font14'>{profileDetails?.bank_account_number}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className='d-flex'>
                        <span className='flex-grow-1 font16 fw-bold align-self-center'>
                            Operations Data
                        </span>
                        <div class="form-check form-switch align-self-center">
                            <input class="form-check-input p-2" type="checkbox" value="" id="flexCheckChecked" checked />
                            <label class="form-check-label" for="flexCheckChecked">
                                <span className='align-self-center me-2 font14'>Enable Offline Selection</span>
                            </label>
                        </div>

                        <span className='borderBlue borderRadius32 p-2 ps-4 pe-4 textttBlue'>
                            <Icon className='me-2' icon="iconamoon:edit" width="1.5em" height="1.5em" style={{ color: '#4F7BD1' }} />
                            Update
                        </span>
                    </div>

                    <div className="overflow-scroll bg-white borderRadius12 mt-3">
                        <table class="table m-0 m-1">
                            <thead>
                                <tr>
                                    <th className='tableHeadText fw-lighter font14'>UPI</th>
                                    <th className='tableHeadText fw-lighter font14'>Pay In</th>
                                    <th className='tableHeadText fw-lighter font14'>Pay Out</th>
                                    <th className='tableHeadText fw-lighter font14'>Pay In Limit</th>
                                    <th className='tableHeadText fw-lighter font14'>Pay Out Limit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='fw-lighter font14'>{profileDetails?.upi_id}</td>
                                    <td className='fw-lighter font14'>Yes</td>
                                    <td className='fw-lighter font14'>No</td>
                                    <td className='fw-lighter font14'>{profileDetails?.payin_limit}</td>
                                    <td className='fw-lighter font14'>{profileDetails?.payout_limit}</td>
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th className='tableHeadText fw-lighter font14'>Opening Balance</th>
                                    <th className='tableHeadText fw-lighter font14'>PayIn Commission Percent</th>
                                    <th className='tableHeadText fw-lighter font14'>PayOut Commission Percent</th>
                                    <th className='tableHeadText fw-lighter font14'>Amount Limit Min</th>
                                    <th className='tableHeadText fw-lighter font14'>Amount Limit Max</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='fw-lighter font14'>0</td>
                                    <td className='fw-lighter font14'>0</td>
                                    <td className='fw-lighter font14'>0</td>
                                    <td className='fw-lighter font14'>8539448.4</td>
                                    <td className='fw-lighter font14'>8539448.4</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ProfilePage