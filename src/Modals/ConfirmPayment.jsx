import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import styled from 'styled-components'
import { getOrderById, Orderapproval } from '../Utils/Apis';

const Container = styled.div`

    .table tbody tr {
        --bs-table-bg-type: #fff !important;
    }

    .table>:not(caption)>*>* {
        padding: 0.3rem !important;
    }

    .form-control{
        background-color: #EBF1F9;
        border: none !important;
        color: var(--formControlTextColor);
    }

    .textBlue{
        color: var(--cardsBlueText) !important;
    }

    .confirmedButtonn, .confirmedButtonn:active, .confirmedButtonn:focus{
        color: var(--confirmPaymentBtnText);
        background-color: var(--confirmPaymentBtnBg);
        width: fit-content;
    }

    .confirmedPaymentButton, .confirmedPaymentButton:active, .confirmedPaymentButton:focus{
        color: var(--confirmPaymentBtnText);
        background-color: var(--confirmPaymentBtnBg);
        width: fit-content;
    }

    .line {
        border: 1px dashed #EDEDED
    }

`;

const ConfirmPayment = ({OrdersIds, onData}) => {

    // const OrdersIds = OrdersIds?.OrdersIds

    const [Orders, setOrders] = useState('');
    const [utr, setutr] = useState("");
    const [utrValidError, setutrValidError] = useState(false);
    const [utrIsRequiredError, setutrIsRequiredlError] = useState(false);
    const [remark, setRemark] = useState("");
    const [remarkValidError, setRemarkValidError] = useState(false);
    const [remarkIsRequiredError, setRemarkIsRequiredlError] = useState(false);


    const handleUTR = (value) => {
        setutr(value);
        const rex = /^[A-Za-z0-9]{10,20}$/;
        if (value === "") {
            setutrValidError(false);
            setutrIsRequiredlError(true);
        } else if (rex.test(value) === false) {
            setutrValidError(true);
            setutrIsRequiredlError(false);
        } else {
            setutrValidError(false);
            setutrIsRequiredlError(false);
        }
    }

    const handleRemark = (value) => {
        setRemark(value);
        const rex = /^[a-zA-Z\s]*$/;
        if (value === "") {
            setRemarkValidError(false);
            setRemarkIsRequiredlError(true);
        } else if (rex.test(value) === false) {
            setRemarkValidError(true);
            setRemarkIsRequiredlError(false);
        } else {
            setRemarkValidError(false);
            setRemarkIsRequiredlError(false);
        }
    }

    const ApprovedOrders = async () => {
        if (utr === "" || !utr) {
            setutrIsRequiredlError(true);
        }
        if (remark === "" || !remark) {
            setRemarkIsRequiredlError(true);
        }
        if ((utr !== "", remark !== "")) {
            const formData = new FormData();
            formData.append('utr', utr);
            formData.append("approval_status", "APPROVED");
            formData.append("remark", remark);
            try {
                const response = await Orderapproval(formData, Orders?.agent, Orders?.order_id);
                console.log(response, )
                if (response?.status === 200) {
                    toast.success(response?.data?.message);
                    // setApprovedStatus(response?.data?.approval_status)
                    onData(true);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const fetchData = async () => {
        try {
            const orderResponse = await getOrderById(OrdersIds);
            console.log(orderResponse, "By Id")
            if (orderResponse?.status === 200 && orderResponse?.data)
                setOrders(orderResponse?.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
        setutr();
        setRemark();
    }, [OrdersIds]);




    return (
        <Container>
            <div className="container-fluid">
                <div className="row">
                    <div className="rowBlue borderRadiusTop text-center p-2">
                        <p className='text-end'><Icon icon="mdi:cross-circle-outline" width="1.1em" height="1.1em" style={{ color: '#B5B5B5' }} data-bs-dismiss="modal" aria-label="Close" /></p>
                        <p className='font16'>Amount</p>
                        <p className='font54'>{Orders?.payment_amount}</p>
                        <p className='d-flex justify-content-center'>
                            <button className={`btn ${Orders?.approval_status === 'APPROVED' ? 'confirmedButton' : (Orders?.approval_status === 'PENDING' ? 'pendingButton' : (Orders?.approval_status === 'CREATED' ? 'createdButton' : 'expiredButton'))} borderRadius4 me-3`}>{Orders?.approval_status}</button>
                        </p>
                        {/* <p><button className='btn expiredButton borderRadius4 me-3' type='button'>Expired</button></p> */}
                    </div>
                    <div className="overflow-scroll">
                        <table className="table table-responsive m-0">
                            <tbody>
                                <tr>
                                    <td className='font14 align-middle lineHeight24 text2Grey text-start'>Receipt Number</td>
                                    <td className='font14 align-middle lineHeight24 text-end'>{Orders?.receipt}</td>
                                </tr>
                                <tr>
                                    <td className='font14 align-middle lineHeight24 text2Grey text-start'>Cleint name</td>
                                    <td className='font14 align-middle lineHeight24 text-end'>{Orders?.client_name} </td>
                                </tr>
                                <tr>
                                    <td className='font14 align-middle lineHeight24 text2Grey text-start'>Order ID</td>
                                    <td className='font14 align-middle lineHeight24 text-end'>{Orders?.order_id}</td>
                                </tr>
                                <tr>
                                    <td className='font14 align-middle lineHeight24 text2Grey text-start'>Created On</td>
                                    <td className='font14 align-middle lineHeight24 text-end'>{Orders?.created_at?.slice(0, 10)}</td>
                                </tr>
                                {
                                    Orders?.approval_status === 'APPROVED' && (
                                        <tr>
                                            <td className='font14 align-middle lineHeight24 text2Grey text-start'>UTR</td>
                                            <td className='font14 align-middle lineHeight24 text-end'>{Orders?.utr}</td>
                                        </tr>
                                    )
                                }

                                <tr>
                                    <td className='font14 align-middle lineHeight24 text2Grey text-start'>Assignee UPI</td>
                                    <td className='font14 align-middle lineHeight24 text-end text-blue'>{Orders?.upi}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='line mb-2'>
                </div>
                {
                    Orders?.approval_status !== 'APPROVED' && (
                        <>
                            {/* <label className='ps-2 mb-2'>UTR</label> */}
                            <div className="row ps-3 pe-3 p-0 mb-3">
                                <div className="rowBlue p-0">
                                    <input type="text" onChange={(e) => handleUTR(e.target.value)} value={utr} className='form-control font16' placeholder='Enter UTR ' />
                                    {utrIsRequiredError && (
                                        <div className='text-start p-2' style={{ color: "red", fontSize: "x-small" }}>
                                            UTR Number is required
                                        </div>
                                    )}
                                    {utrValidError && (
                                        <div className='text-start p-2' style={{ color: "red", fontSize: "x-small" }}>
                                            Please enter valid UTR number
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )

                }
                {
                    Orders?.approval_status !== 'APPROVED' ?
                        <div className="row ps-3 pe-3 p-0">
                            <div className="rowBlue p-0">
                                <input type="text" onChange={(e) => handleRemark(e.target.value)} value={remark} className='form-control font16' placeholder='Add remarks...' />
                                {remarkIsRequiredError && (
                                    <div className='text-start p-2' style={{ color: "red", fontSize: "x-small" }}>
                                        Remark Number is required
                                    </div>
                                )}
                                {remarkValidError && (
                                    <div className='text-start p-2' style={{ color: "red", fontSize: "x-small" }}>
                                        Please enter valid Remark
                                    </div>
                                )}
                            </div>
                        </div>
                        :
                        <div className="row ps-3 pe-3 p-0 mb-3">
                            <div className="rowBlue p-0">
                                <input type="text" value={Orders?.remark} className='form-control font16' placeholder='Add remarks...' disabled />
                            </div>
                        </div>
                }

                {
                    Orders?.approval_status !== 'APPROVED' && (
                        <div className="d-flex justify-content-center text-center m-4">
                            <button className='btn confirmedPaymentButton borderRadius32' type='button' onClick={ApprovedOrders}>Confirm Payment</button>
                        </div>
                    )}

                {/* <div className="ps-3 pe-3 pb-3">
                        <div className="rowBlue p-2">
                            <span className='text2Grey font16'>Remarks : </span><span className='font16 formControlTextColor'>Everything good!</span>
                        </div>
                    </div> */}
            </div>
        </Container>
    )
}

export default ConfirmPayment