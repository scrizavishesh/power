import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { useMainContext } from '../../Dashboard/DashboardLayout';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder, CreateUser } from '../../Utils/Apis';
import HashLoader from '../../Dashboard/Loader';
import { useDispatch, useSelector } from 'react-redux';

const Container = styled.div`

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

`;

const CreatePayInOrder = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { users, status, error } = useSelector(state => state.users);
    const [profileDetails, setprofileDetails] = useState(users[0]);

    const { toggleSidebar } = useMainContext();
    const [showLoader, setShowLoader] = useState(false);

    const [amount, setAmount] = useState(""); // Corrected state variable name
    const [amountValidError, setAmountValidError] = useState(false);
    const [amountIsRequiredError, setamountIsRequiredError] = useState(false); // Corrected state variable name


    const handleAmount = (value) => {
        setAmount(value);
        const indianCurrencyRegex = /^(\₹)?(\d{1,2})(,\d{2})*(\.\d{1,2})?$/;
        if (value === "") {
            setAmountValidError(false);
            setamountIsRequiredError(true);
        } else if (indianCurrencyRegex.test(value) === false) {
            setAmountValidError(true);
            setamountIsRequiredError(false);
        } else {
            setAmountValidError(false);
            setamountIsRequiredError(false);
        }
    };





    const register = async () => {
        if (amount === "" || !amount) setamountIsRequiredError(true);
        if (amount) {
            const formData = new FormData();
            formData.append("amount", amount);
            try {
                setShowLoader(true)
                const response = await createOrder(formData);
                console.log(response, "Create User")
                if (response.status === 201) {
                    setAmount("");
                    toast.success("Order Created Successfully");
                    setShowLoader(false);
                    navigate('/payInOperations');
                }
            } catch (err) {
                console.log(err);
            }
        }
    };




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
                        <p className='font32 fontWeight700'>Welcome to Create Users</p>
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
                <div className="row bg-white p-3 borderRadius10 m-1 mt-3">
                    <div className="col-xl-12 col-lg-12 p-4">
                        <div className="row">
                            <p className='font16 fontWeight600'>Enter Details to create order</p>
                            <div className="blueBggg mt-3 p-3 borderRadius24">
                                <form class="row g-3">
                                    <div class="col-md-12">
                                        <label class="form-label labelGreyText font16">Amount</label>
                                        <input type="text" class="form-control font14" value={amount}
                                            onChange={(e) => handleAmount(e.target.value)}
                                            placeholder="Enter Amount" />
                                        {amountIsRequiredError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                Amount is required
                                            </div>
                                        )}
                                        {amountValidError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                Please enter a valid Amount
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row d-grid gap-2 col-lg-6 col-md-8 col-10 mx-auto m-5">
                    <button class="btn btnPublishUser borderRadius12" onClick={register} type="button">Create Order</button>
                </div>
            </div>
        </Container>
    )
}

export default CreatePayInOrder