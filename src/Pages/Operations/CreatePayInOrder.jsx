import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { useMainContext } from '../../Dashboard/DashboardLayout';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { createOrder } from '../../Utils/Apis';
import HashLoader from '../../Dashboard/Loader';
import Header from '../../Layouts/Header';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    const token = localStorage.getItem('power_token')

    const [orderId, setOrderId] = useState('');
    console.log(orderId, "Create page")

    const { toggleSidebar } = useMainContext();
    const [showLoader, setShowLoader] = useState(false);

    const [amount, setAmount] = useState(""); // Corrected state variable name
    const [amountValidError, setAmountValidError] = useState(false);
    const [amountIsRequiredError, setamountIsRequiredError] = useState(false); // Corrected state variable name


    const handleAmount = (value) => {
        setAmount(value);
        const indianCurrencyRegex = /^(?=.*[0-9])(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d{1,2})?$/;

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



    const secretKey = "django-insecure-t4c5!_l0l$#@@o0+#=crk84#2662ev(f6ir@#)y%pzz2r&h&k%";


    const CreatePayemnt = async () => {
        if (amount === "" || !amount) setamountIsRequiredError(true);
        if (amount) {
            const data = {
                amount: parseFloat(amount)
            };
            const hmac = CryptoJS.HmacSHA256(JSON.stringify(data), secretKey).toString();
            try {
                setShowLoader(true)
                const response = await createOrder(data, hmac);
                console.log(response, "Create Order details")
                if (response.status === 201) {
                    setOrderId(response?.data?.order_id)
                    setAmount("");
                    toast.success("Order Created Successfully");
                    setShowLoader(false);
                    navigate('/payInOperations')
                }
            } catch (err) {
                console.log(err);
                toast.error(err?.response?.data[0]);
                setShowLoader(false)
            }
        }
    };

    useEffect(() => {
        const socket = new WebSocket(`ws://auth2.upicollect.com/ws/order_status/${orderId}/?token=${token}`);
        const onSocketMessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data, "WebSocket Data");
        
        };
        socket.addEventListener("message", onSocketMessage);
        socket.onopen = () => {
            console.log("WebSocket connection established");
        };
        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };
        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
        return () => {
            socket.removeEventListener("message", onSocketMessage);
            socket.close();
        };
    }, [orderId]);




    return (
        <Container>
            {
                showLoader && (
                    <HashLoader />
                )
            }
            <div className="container-fluid p-lg-5 p-3">
                <Icon className='toggleBars mb-3' icon="fa6-solid:bars" width="1.5em" height="1.5em" style={{ color: '#000' }} onClick={toggleSidebar} />
                <Header orderId={orderId} />
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
                    <button class="btn btnPublishUser borderRadius12" onClick={CreatePayemnt} type="button">Create Order</button>
                </div>
            </div>
        </Container>
    )
}

export default CreatePayInOrder