import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import HashLoader from '../Dashboard/Loader';
import { approvePayout, perticularPayoutOrder } from '../Utils/Apis';

const Container = styled.div`
    .table tbody tr {
        /* --bs-table-bg-type: #F8F3F6 !important; */
        border-top: 6px solid #fff !important;
        border-bottom: 6px solid #fff !important;
    }

    .table thead tr {
        --bs-table-bg-type: #fff !important;
        border-top: 6px solid #fff !important;
        border-bottom: 6px solid #fff !important;
    }

    .table>:not(caption)>*>* {
        padding: 0.38rem !important;
    }

    .borderRadius8top{
        border-top-right-radius: var(--borderRadius8);
        border-top-left-radius: var(--borderRadius8);
    }

    .borderleft{
        border-left: 4px solid white ;
    }

    .greenText{
        color: #17545E;
    }

    .line_middle {
        border-right: 1.67px dashed #EDEDED
    }

    .approveButton, .approveButton:active, .approveButton:focus{
    width: 110px ;
    color: var(--sidebarBackground);
    background-color: var(--publishBtn);
    border-radius: var(--borderRadius32) !important;
  }

`;

const AssignedOrder = ({ OrderId, Price, onData }) => {

    console.log(OrderId)

    const [utr, setutr] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [utrValidError, setutrValidError] = useState(false);
    const [utrIsRequiredError, setutrIsRequiredlError] = useState(false);
    const [remark, setRemark] = useState("");
    const [remarkValidError, setRemarkValidError] = useState(false);
    const [remarkIsRequiredError, setRemarkIsRequiredlError] = useState(false);
    const [OrderDetails, setOrderDetails] = useState('');
    const [image, setImage] = useState();
    const [imageValidError, setImageValidError] = useState(false);
    const [imageIsRequiredError, setImageIsRequiredlError] = useState(false);

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

    const handleImage = (value) => {
        setImage(value);
        console.log(value?.name, "Images")
        const rex = /^[A-Za-z0-9]{10,20}$/;
        if (value === "") {
            setImageValidError(false);
            setImageIsRequiredlError(true);
        } else if (rex.test(value) === false) {
            setImageValidError(true);
            setImageIsRequiredlError(false);
        } else {
            setImageValidError(false);
            setImageIsRequiredlError(false);
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
            formData.append("upload_slip", image);
            formData.append("remark", remark);
            try {
                setShowLoader(true);
                const response = await approvePayout(OrderId, formData);
                console.log(response, "Approved Status")
                console.log(response,)
                if (response?.status === 200) {
                    setShowLoader(false);
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
            setShowLoader(true);
            const orderResponse = await perticularPayoutOrder(OrderId);
            console.log(orderResponse, "Assigned Order by Id")
            if (orderResponse?.status === 200 && orderResponse?.data)
            setShowLoader(false);
                setOrderDetails(orderResponse?.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [OrderId]);






    return (
        <Container>
            {
                showLoader && (
                    <HashLoader />
                )
            }
            <div className="container-fluid">
                <div className="row rowBlue borderRadius8top">
                    <p className='text-end'><Icon icon="mdi:cross-circle-outline" width="1.1em" height="1.1em" style={{ color: '#B5B5B5' }} data-bs-dismiss="modal" aria-label="Close" /></p>
                    <p className='text-center font16'>Amount</p>
                    <p className='text-center font54'>{Price} INR</p>
                </div>
                <div className='row'>
                    <div className='col-6 line_middle'>
                        <div class="overflow-scroll p-3">
                            <table class="table table-responsive m-0 ">
                                <tbody>
                                    <tr>
                                        <td class="font14 align-middle lineHeight24 text2Grey text-start">Oder ID</td>
                                        <td class="font14 align-middle lineHeight24 text-end">{OrderDetails?.order_id}</td>
                                    </tr>
                                    <tr>
                                        <td class="font14 align-middle lineHeight24 text2Grey text-start">Cleint name</td>
                                        <td class="font14 align-middle lineHeight24 text-end">{OrderDetails?.client_name} </td>
                                    </tr>
                                    <tr>
                                        <td class="font14 align-middle lineHeight24 text2Grey text-start">Client UPI</td>
                                        <td class="font14 align-middle lineHeight24 text-end">{OrderDetails?.client_upi}</td>
                                    </tr>
                                    <tr>
                                        <td class="font14 align-middle lineHeight24 text2Grey text-start">Bank Name</td>
                                        <td class="font14 align-middle lineHeight24 text-end">{OrderDetails?.bank_name}</td>
                                    </tr>
                                    <tr>
                                        <td class="font14 align-middle lineHeight24 text2Grey text-start">Account No. </td>
                                        <td class="font14 align-middle lineHeight24 text-end text-blue">{OrderDetails?.account_number}</td>
                                    </tr>
                                    <tr>
                                        <td class="font14 align-middle lineHeight24 text2Grey text-start">IFSC</td>
                                        <td class="font14 align-middle lineHeight24 text-end">{OrderDetails?.ifsc}</td>
                                    </tr>
                                    <tr>
                                        <td class="font14 align-middle lineHeight24 text2Grey text-start">Created on </td>
                                        <td class="font14 align-middle lineHeight24 text-end">{OrderDetails?.created_at} </td>
                                    </tr>
                                    <tr>
                                        <td class="font14 align-middle lineHeight24 text2Grey text-start">Assigned To</td>
                                        <td class="font14 align-middle lineHeight24 text-end">{OrderDetails?.assigned_to}</td>
                                    </tr>
                                    <tr>
                                        <td class="font14 align-middle lineHeight24 text2Grey text-start">Assignee UPI</td>
                                        <td class="font14 align-middle lineHeight24 text-end">{OrderDetails?.assignee_upi}</td>
                                    </tr>
                                    <tr>
                                        <td class="font14 align-middle lineHeight24 text2Grey text-start">Approved By </td>
                                        <td class="font14 align-middle lineHeight24 text-end text-blue">{OrderDetails?.approved_by}</td>
                                    </tr>
                                    <tr>
                                        <td class="font14 align-middle lineHeight24 text2Grey text-start">UTR Code </td>
                                        <td class="font14 align-middle lineHeight24 text-end text-blue">{OrderDetails?.utr_code}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='col-6 p-3 gap-2'>
                        <form action="">
                            <div className='mb-3'>
                                <label class="form-label">Enter UTR:</label>
                                <input style={{ background: "#17545E14" }} type="text" onChange={(e) => handleUTR(e.target.value)} value={utr} className='form-control' placeholder='Enter UTR ' />
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
                            <div className='mb-3'>
                                <label class="form-label">Upload Slip:</label>
                                <input style={{ background: "#17545E14" }} type="file" onChange={(e) => handleImage(e.target.files[0])} className='form-control' placeholder='Enter UTR' />
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
                            <div className='mb-3'>
                                <label class="form-label">Remarks:</label>
                                <input style={{ background: "#17545E14" }} type="text" onChange={(e) => handleRemark(e.target.value)} value={remark} className='form-control font16' placeholder='Add remarks...' />
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
                            <div className='mb-3 d-flex justify-content-center'>
                                <button class="btn approveButton me-3 align-self-center" type="button" onClick={ApprovedOrders}>Approve</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default AssignedOrder