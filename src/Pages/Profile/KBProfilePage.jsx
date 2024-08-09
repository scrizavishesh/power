import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { useMainContext } from '../../Dashboard/DashboardLayout';
import { format } from 'date-fns';
import { getPerticualrProfile, updateUserbyId } from '../../Utils/Apis';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import HashLoader from '../../Dashboard/Loader';
import { useDispatch, useSelector } from 'react-redux';

const Container = styled.div`

    .cardBgBlue{
        /* background-color: var(--cardsBgBlueColor); */
        background-color: var(--cardsBgBlueColor);
    }

    .form-select{
        box-shadow: none !important;
        border: none !important;
    }

    .cardBlueText{
        /* color: var(--cardsBlueText) */
        color: var(--cardsBlueText);
    }

    .greyText{
        /* color: var(--sidebarGreyText); */
        color: var(--sidebarGreyText);
    }

    .greyText2{
        color: var(--tableTextGrey);
    }

    .greyText3{
        color: var(--greyText3);
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

    .textBlue{
        color: var(--cardsBlueText) !important;
    }

    .addNewUserBtn, .addNewUserBtn:active, .addNewUserBtn:focus{
        padding: 0.3% 1% 0.3% 1%;
        height: fit-content;
        color: var(--cardsBlueText);
        background-color: var(--addNewUserButton);
    }

    .form-control{
        border: none !important;
        height: 40px !important;
        box-shadow: none !important;
        --bs-form-select-bg-img: none !important;
    }

    .height30{
        height: 40px;
    }

    .form-select{
        border: none !important;
        box-shadow: none !important;
        --bs-form-select-bg-img: none !important;
    }

    .dropdown-toggle::after{
        display: none !important;
    }

    .payInReqBtn, .payInReqBtn:active, .payInReqBtn:focus{
        width: 173px;
        /* height: 46px;  */
        color: var(--sidebarBackground);
        background-color: var(--publishBtn);
    }

    .btnPublishUser, .btnPublishUser:active, .btnPublishUser:focus{
        height: 50px;
        color: var(--sidebarBackground);
        background-color: var(--publishBtn);
    }

    .borderBlue{
        border: 1px solid var(--publishBtn);
    }

    .textttBlue{
        color: var(--publishBtn);
    }

`;

const KBProfilePage = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { users, status, error } = useSelector(state => state.users);
    const [profileDetail, setprofileDetail] = useState(users[0]);

    const { toggleSidebar } = useMainContext();
    const [showLoader, setShowLoader] = useState(false);

    const todayDate = format(new Date(), 'dd/MM/yyyy');

    const [profileDetails, setprofileDetails] = useState('');
    const [changeState, setchangeState] = useState(false);

    // update useStates 

    const [username, setUsername] = useState("");
    const [userNameValidError, setUserNameValidError] = useState(false);
    const [userNameIsRequiredError, setUserNameIsRequiredError] = useState(false);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [statu, setStatus] = useState("");
    const [upi, setUpi] = useState("");
    const [upiError, setUpiError] = useState(false);
    const [ifsc, setIfsc] = useState("");
    const [ifscError, setIfscError] = useState(false);
    const [bankName, setBankName] = useState("");
    const [bankNameError, setBankNameError] = useState(false);
    const [payIn, setPayIn] = useState("");
    const [payInError, setPayInError] = useState(false);
    const [bankAccountNumber, setBankAccountNumber] = useState("");
    const [bankAccountNumberError, setBankAccountNumberError] = useState(false);
    const [payInLimit, setPayInLimit] = useState("");
    const [payInLimitError, setPayInLimitError] = useState(false);
    const [payOut, setPayOut] = useState("");
    const [payOutError, setPayOutError] = useState(false);
    const [payOutLimit, setPayOutLimit] = useState("");
    const [payOutLimitError, setPayOutLimitError] = useState(false);


    // update handles 
    const handleUserName = (value) => {
        setUsername(value);
        const rex = /^[a-zA-Z0-9_-]{3,16}$/;
        if (value === "") {
            setUserNameValidError(false);
            setUserNameIsRequiredError(true);
        } else if (!rex.test(value)) {
            setUserNameValidError(true);
            setUserNameIsRequiredError(false);
        } else {
            setUserNameValidError(false);
            setUserNameIsRequiredError(false);
        }
    };

    const handleName = (value) => {
        setName(value);
        if (value === "") {
            setNameError(true);
        } else {
            setNameError(false);
        }
    };

    const handleEmail = (value) => {
        setEmail(value);
        const rex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!rex.test(value)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };

    const handlePhoneNumber = (value) => {
        setPhoneNumber(value);
        const rex = /^[0-9]{10}$/;
        if (!rex.test(value)) {
            setPhoneNumberError(true);
        } else {
            setPhoneNumberError(false);
        }
    };

    const handleStatus = (value) => {
        setStatus(value);
        // Add validation if needed
    };

    const handleUpi = (value) => {
        setUpi(value);
        const rex = /^[\w.-]+@[\w.-]+$/;
        if (!rex.test(value)) {
            setUpiError(true);
        } else {
            setUpiError(false);
        }
    };

    const handleIfsc = (value) => {
        setIfsc(value);
        const rex = /^[A-Za-z]{4}\d{7}$/;
        if (!rex.test(value)) {
            setIfscError(true);
        } else {
            setIfscError(false);
        }
    };

    const handleBankName = (value) => {
        setBankName(value);
        if (value === "") {
            setBankNameError(true);
        } else {
            setBankNameError(false);
        }
    };

    const handlePayIn = (value) => {
        setPayIn(value);
        const rex = /^[+]?\d+([.]\d+)?$/;
        if (!rex.test(value)) {
            setPayInError(true);
        } else {
            setPayInError(false);
        }
    };

    const handleBankAccountNumber = (value) => {
        setBankAccountNumber(value);
        if (value === "") {
            setBankAccountNumberError(true);
        } else {
            setBankAccountNumberError(false);
        }
    };

    const handlePayInLimit = (value) => {
        setPayInLimit(value);
        const rex = /^[+]?\d+([.]\d+)?$/;
        if (!rex.test(value)) {
            setPayInLimitError(true);
        } else {
            setPayInLimitError(false);
        }
    };

    const handlePayOut = (value) => {
        setPayOut(value);
        const rex = /^[+]?\d+([.]\d+)?$/;
        if (!rex.test(value)) {
            setPayOutError(true);
        } else {
            setPayOutError(false);
        }
    };

    const handlePayOutLimit = (value) => {
        setPayOutLimit(value);
        const rex = /^[+]?\d+([.]\d+)?$/;
        if (!rex.test(value)) {
            setPayOutLimitError(true);
        } else {
            setPayOutLimitError(false);
        }
    };


    const register = async () => {
        let isValid = true;

        if (username === "") {
            setUserNameIsRequiredError(true);
            isValid = false;
        }
        if (name === "") {
            setNameError(true);
            isValid = false;
        }
        if (email === "") {
            setEmailError(true);
            isValid = false;
        }
        if (phoneNumber === "") {
            setPhoneNumberError(true);
            isValid = false;
        }
        if (bankName === "") {
            setBankNameError(true);
            isValid = false;
        }
        if (bankAccountNumber === "") {
            setBankAccountNumberError(true);
            isValid = false;
        }
        if (!isValid) {
            return;
        }

        const formData = new FormData();
        formData.append("username", username);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone_number", phoneNumber);
        formData.append("is_checked_in", statu);
        formData.append("upi_id", upi);
        formData.append("IFSC", ifsc);
        formData.append("bank_name", bankName);
        formData.append("bank_account_number", bankAccountNumber);
        formData.append("payin_limit", payInLimit);
        formData.append("payout_limit", payOutLimit);

        try {
            setShowLoader(true);
            const response = await updateUserbyId(id, formData);
            console.log(response, "user update successfully")
            if (response.status === 200) {
                setShowLoader(false);
                toast.success("user update successfully");
                userSuccess();
                setchangeState(false);
            }
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.username[0]);
        }
    };



    const userSuccess = async () => {
        try {
            setShowLoader(true);
            const response = await getPerticualrProfile(id)
            console.log(response, "Perticular user");
            if (response?.status === 200) {
                setShowLoader(false);
                setprofileDetails(response?.data)
                setName(response?.data?.name);
                setUsername(response?.data?.username);
                setEmail(response?.data?.email);
                setStatus(response?.data?.is_checked_in)
                setPhoneNumber(response?.data?.phone_number);
                setUpi(response?.data?.upi_id);
                setBankName(response?.data?.bank_name);
                setBankAccountNumber(response?.data?.bank_account_number);
                setPayInLimit(response?.data?.payin_limit);
                setPayOutLimit(response?.data?.payout_limit);
                setIfsc(response?.data?.ifsc)
                setPayIn(response?.data)
                setPayOut(response?.data)
            }
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        userSuccess()
    }, [])



    return (
        <Container>
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
                        <p className='font32 fontWeight700'>Welcome to KB Payout’s Profile</p>
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
                                <input className='form-control p-2 ps-3 rounded-5 borderNone font16 bg-white' type="search" placeholder="🔍  Search" aria-label="Search" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-3 col-lg-6 col-md-3 col-sm-6 p-4">
                        <div className={`row p-2 borderRadius8 bg-white`}>
                            <div className='d-flex pt-2 pb-3'>
                                <span className='flex-grow-1'> <img className='p-2 borderRadius12 cardBgBlue' src="./images/walletSettings.svg" alt="" /> </span>
                                <div>
                                    <p className='cardsGreyText font12 fontWeight900'>Total PayIn Operations</p>
                                    <p className='cardBlueText font28 fontWeight900'>74,349 INR</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-3 col-sm-6 p-4">
                        <div className={`row p-2 borderRadius8 bg-white`}>
                            <div className='d-flex pt-2 pb-3'>
                                <span className='flex-grow-1'> <img className='p-2 borderRadius12 cardBgBlue' src="./images/walletSettings.svg" alt="" /> </span>
                                <div>
                                    <p className='cardsGreyText font12 fontWeight900'>Total PayIn</p>
                                    <p className='cardBlueText font28 fontWeight900'>74,349 INR</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-3 col-sm-6 p-4">
                        <div className={`row p-2 borderRadius8 bg-white`}>
                            <div className='d-flex pt-2 pb-3'>
                                <span className='flex-grow-1'> <img className='p-2 borderRadius12 cardBgBlue' src="./images/walletSettings.svg" alt="" /> </span>
                                <div>
                                    <p className='cardsGreyText font12 fontWeight900'>Total PayOut Operations</p>
                                    <p className='cardBlueText font28 fontWeight900'>74,349 INR</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-3 col-sm-6 p-4">
                        <div className={`row p-2 borderRadius8 bg-white`}>
                            <div className='d-flex pt-2 pb-3'>
                                <span className='flex-grow-1'> <img className='p-2 borderRadius12 cardBgBlue' src="./images/walletSettings.svg" alt="" /> </span>
                                <div>
                                    <p className='cardsGreyText font12 fontWeight900'>Total PayOut</p>
                                    <p className='cardBlueText font28 fontWeight900'>74,349 INR</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="d-flex">
                        <div className="flex-grow-1">
                            <p className='p-1 font18 fw-bolder'>KB Payout</p>
                            <p className='p-1 font16 fw-normal greyText3'>Peer</p>
                            <p className='p-1 font14 fw-lighter greyText2'>Last Login Never</p>
                        </div>
                        <div className="">
                            <div className="d-flex justify-content-end">
                                <span className='bg-white align-self-center p-2 borderRadius10 me-2'>
                                    <Icon icon="ion:filter" width="1.4em" height="1.4em" style={{ color: '#2C6DB5' }} />
                                </span>
                                <select className={`form-select font12 borderRadius8 cardBlueText me-2 pointer bg-white`} aria-label="Default select example">
                                    <option disbaled="true">--Choose--</option>
                                    <option defaultValue value="PayIn">PayIn</option>
                                    <option value="PayOut">PayOut</option>
                                </select>
                                <span className='bg-white align-self-center borderRadius10 textBlue font16 d-flex p-2'>
                                    {todayDate}
                                    <Icon className='ms-2' icon="uiw:date" width="1.1em" height="1.1em" style={{ color: '#2C6DB5' }} />
                                </span>
                            </div>
                            <div className="d-flex mt-3 mb-3">
                                <Link to={`/payInOperation/${id}`} class="btn payInReqBtn borderRadius32" type="button">PayIn Request</Link>
                                <Link to={`/payOutOperation/${id}`} class="btn payInReqBtn borderRadius32 ms-2" type="button">PayOut Request</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row bg-white p-3 borderRadius10 m-1">
                    <div className="col-xl-12 col-lg-12 p-4">
                        <div className="row">
                            <div className='d-flex'>
                                <span className='flex-grow-1 font16 fw-bold'>
                                    Bank Details
                                </span>
                                {
                                    !changeState
                                        ?
                                        <span type='button' onClick={() => setchangeState(true)} className='borderBlue borderRadius32 p-2 ps-4 pe-4 textttBlue'>
                                            <Icon className='me-2' icon="iconamoon:edit" width="1.5em" height="1.5em" style={{ color: '#4F7BD1' }} />
                                            Update
                                        </span>
                                        :
                                        <div>
                                            <span type='button' onClick={register} className='borderBlue borderRadius32 p-2 ps-4 pe-4 textttBlue'>
                                                Submit
                                            </span>
                                            <span onClick={() => setchangeState(false)} type='button' className='borderBlue borderRadius32 p-2 ps-4 pe-4 textttBlue ms-2'>
                                                cancle
                                            </span>
                                        </div>
                                }

                            </div>
                            <div className="blueBggg mt-3 p-3 borderRadius24">
                                <form class="row g-3">
                                    <div class="col-md-6">
                                        <label for="validationDefault01" class="form-label labelGreyText font14 fw-lighter">Name</label>
                                        <input type="text" class="form-control font12" id="validationDefault01" onChange={(e) => handleName(e.target.value)} value={name} disabled={!changeState ? true : false} />
                                        {nameError && (
                                            <div className="text-start mt-2" style={{ color: "red", fontSize: "x-small" }}>
                                                Name is required
                                            </div>
                                        )}
                                    </div>
                                    <div class="col-md-6">
                                        <label for="validationDefault01" class="form-label labelGreyText font14 fw-lighter">Username</label>
                                        <input type="text" class="form-control font12" id="validationDefault01" onChange={(e) => handleUserName(e.target.value)} value={username} disabled={!changeState ? true : false} />
                                        {userNameIsRequiredError && (
                                            <div className="text-start mt-2" style={{ color: "red", fontSize: "x-small" }}>
                                                Username is required
                                            </div>
                                        )}
                                        {userNameValidError && (
                                            <div className="text-start mt-2" style={{ color: "red", fontSize: "x-small" }}>
                                                Please enter a valid username
                                            </div>
                                        )}
                                    </div>
                                    <div class="col-md-6">
                                        <label for="validationDefault01" class="form-label labelGreyText font14 fw-lighter">Email ID</label>
                                        <input type="text" class="form-control font12" id="validationDefault01" onChange={(e) => handleEmail(e.target.value)} value={email} disabled={!changeState ? true : false} />
                                        {emailError && (
                                            <div className="text-start mt-2" style={{ color: "red", fontSize: "x-small" }}>
                                                Please enter a valid email
                                            </div>
                                        )}
                                    </div>
                                    <div class="col-md-6">
                                        <label for="validationDefault01" class="form-label labelGreyText font14 fw-lighter">Phone Number</label>
                                        <input type="text" class="form-control font12" id="validationDefault01" onChange={(e) => handlePhoneNumber(e.target.value)} value={phoneNumber} disabled={!changeState ? true : false} />
                                        {phoneNumberError && (
                                            <div className="text-start mt-2" style={{ color: "red", fontSize: "x-small" }}>
                                                Please enter a valid phone number
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="statusSelect" className="form-label labelGreyText font14 fw-lighter">Select Role</label>
                                        <select id="statusSelect" className="form-control font12" value={statu} onChange={handleStatus} disabled={!changeState ? true : false}>
                                            <option value='' disabled>-- Choose --</option>
                                            <option value={true}>Active</option>
                                            <option value={false}>Inactive</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 p-4">
                        <div className="row">
                            <div className='d-flex'>
                                <span className='flex-grow-1 font16 fw-bold'>
                                    Operations Data
                                </span>
                                {
                                    !changeState
                                        ?
                                        <span type='button' onClick={() => setchangeState(true)} className='borderBlue borderRadius32 p-2 ps-4 pe-4 textttBlue'>
                                            <Icon className='me-2' icon="iconamoon:edit" width="1.5em" height="1.5em" style={{ color: '#4F7BD1' }} />
                                            Update
                                        </span>
                                        :
                                        <>
                                            <div>
                                                <span type='button' onClick={register} className='borderBlue borderRadius32 p-2 ps-4 pe-4 textttBlue'>
                                                    Submit
                                                </span>
                                                <span onClick={() => setchangeState(false)} type='button' className='borderBlue borderRadius32 p-2 ps-4 pe-4 textttBlue ms-2'>
                                                    cancle
                                                </span>
                                            </div>
                                        </>
                                }
                            </div>
                            <div className="blueBggg mt-3 p-3 borderRadius24">
                                <form class="row g-3">
                                    <div class="col-md-6">
                                        <label for="validationDefault01" class="form-label labelGreyText font14 fw-lighter">UPI</label>
                                        <input type="text" class="form-control font12" id="validationDefault01" onChange={(e) => handleUpi(e.target.value)} value={upi} disabled={!changeState ? true : false} />
                                        {upiError && (
                                            <div className="text-start mt-2" style={{ color: "red", fontSize: "x-small" }}>
                                                Please enter a valid UPI
                                            </div>
                                        )}
                                    </div>
                                    <div class="col-md-6">
                                        <label for="validationDefault01" class="form-label labelGreyText font14 fw-lighter">Bank IFSC</label>
                                        <input type="text" class="form-control font12" id="validationDefault01" onChange={(e) => handleIfsc(e.target.value)} value={ifsc} disabled={!changeState ? true : false} />
                                        {ifscError && (
                                            <div className="text-start mt-2" style={{ color: "red", fontSize: "x-small" }}>
                                                Please enter a valid IFSC code
                                            </div>
                                        )}
                                    </div>
                                    <div class="col-md-6">
                                        <label for="validationDefault01" class="form-label labelGreyText font14 fw-lighter">Bank Name</label>
                                        <input type="text" class="form-control font12" id="validationDefault01" onChange={(e) => handleBankName(e.target.value)} value={bankName} disabled={!changeState ? true : false} />
                                        {bankNameError && (
                                            <div className="text-start mt-2" style={{ color: "red", fontSize: "x-small" }}>
                                                Bank name is required
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="payInSelect" className="form-label labelGreyText font14 fw-lighter">Pay In</label>
                                        <select id="payInSelect" className="form-control font12" value={payIn} onChange={handlePayIn} disabled={!changeState ? true : false}>
                                            <option value='' disabled>-- Choose --</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="validationDefault01" class="form-label labelGreyText font14 fw-lighter">Bank Account Number</label>
                                        <input type="text" class="form-control font12" id="validationDefault01" onChange={(e) => handleBankAccountNumber(e.target.value)} value={bankAccountNumber} disabled={!changeState ? true : false} />
                                        {bankAccountNumberError && (
                                            <div className="text-start mt-2" style={{ color: "red", fontSize: "x-small" }}>
                                                Bank account number is required
                                            </div>
                                        )}
                                    </div>
                                    <div class="col-md-6">
                                        <label for="validationDefault01" class="form-label labelGreyText font14 fw-lighter">Pay In Limit</label>
                                        <input type="text" class="form-control font12" id="validationDefault01" onChange={(e) => handlePayInLimit(e.target.value)} value={payInLimit} disabled={!changeState ? true : false} />
                                        {payInLimitError && (
                                            <div className="text-start mt-2" style={{ color: "red", fontSize: "x-small" }}>
                                                Please enter a valid amount
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="payOutSelect" className="form-label labelGreyText font14 fw-lighter">Pay Out</label>
                                        <select id="payOutSelect" className="form-control font12" value={payOut} onChange={handlePayOut} disabled={!changeState ? true : false}>
                                            <option value='' disabled>-- Choose --</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="validationDefault01" class="form-label labelGreyText font14 fw-lighter">Pay Out Limit</label>
                                        <input type="text" class="form-control font12" id="validationDefault01" onChange={(e) => handlePayOutLimit(e.target.value)} value={payOutLimit} disabled={!changeState ? true : false} />
                                        {payOutLimitError && (
                                            <div className="text-start mt-2" style={{ color: "red", fontSize: "x-small" }}>
                                                Please enter a valid amount
                                            </div>
                                        )}
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default KBProfilePage