
import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import styled from 'styled-components'
import { generateRepot, listOfPay } from "../Utils/Apis";

const Container = styled.div`

    .table tbody tr {
        --bs-table-bg-type: #fff !important;
    }

    .table>:not(caption)>*>* {
        padding: 0.3rem !important;
    }

    .blueBggg{
        background-color: var(--blueBggSettings) !important;
    }

    .form-control{
        background-color: #fff;
        border: 0.4 solid #C4C4C4 !important;
        color: var(--formControlTextColor);
        box-shadow: none !important
    }

    .textBlue{
        color: var(--cardsBlueText) !important;
    }

    .btnPublishUser, .btnPublishUser:active, .btnPublishUser:focus{
        color: var(--sidebarBackground);
        background-color: var(--publishBtn);
    }

    .btncancle, .btncancle:active, .btncancle:focus{
        color: var(--sidebarBackground);
        background-color: #929292;
    }

    .text2Grey{
        color: var(--greyText3Color) !important;
    }

    .form-check-input:checked {
        background-color: var(--cardsBlueText);
        border-color: var(--cardsBlueText);
    }

`;

const DownloadReports = ({ onData }) => {
    const [reportName, setReportName] = useState("Test Report");
    const [type, setType] = useState("all");
    const [amount, setAmount] = useState("");
    const [accounts, setAccounts] = useState("all");
    const [users, setUsers] = useState([]);
    const [startDate, setStartDate] = useState("2024-01-01");
    const [endDate, setEndDate] = useState("2024-11-30");
    const [clientId, setClientId] = useState(""); // Only required for super admin

    const [amountValidError, setAmountValidError] = useState(false);
    const [amountIsRequiredError, setAmountIsRequiredError] = useState(false);

    const handleAmount = (value) => {
        setAmount(value);
        const indianCurrencyRegex = /^(?=.*[0-9])(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d{1,2})?$/;

        if (value === "") {
            setAmountValidError(false);
            setAmountIsRequiredError(true);
        } else if (indianCurrencyRegex.test(value) === false) {
            setAmountValidError(true);
            setAmountIsRequiredError(false);
        } else {
            setAmountValidError(false);
            setAmountIsRequiredError(false);
        }
    };

    const CreatePayment = async () => {
        if (amount === "" || !amount) setAmountIsRequiredError(true);
        if (amount && !amountValidError) {
            const data = {
                report_name: reportName,
                type: type,
                amount: amount,
                accounts: accounts,
                start_date: startDate,
                end_date: endDate,
            };
            try {
                const response = await generateRepot(data);
                console.log(response, "generate")
                if (response?.status === 201) {
                    toast.success("Report Created Successfully");
                    setAmount("");
                    onData(true);
                }
            } catch (err) {
                console.log(err);
                toast.error(err?.response?.data[0]);
                setShowLoader(false)
            }

        }
    };

    // const fetchData = async () => {
    //     try {
    //         setShowLoader(true);
    //         const orderResponse = await listOfPay();
    //         console.log(orderResponse, "Heloo")
    //         if (orderResponse?.status === 200)
    //             setShowLoader(false);
    //         setUsers(orderResponse?.data?.users)
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);



    return (
        <Container>
            <div className="rowBlue borderRadiusTop text-center p-2">
                <p className='text-end'>
                    <Icon icon="mdi:cross-circle-outline" width="1.1em" height="1.1em" style={{ color: '#B5B5B5' }} data-bs-dismiss="modal" aria-label="Close" /></p>
                <p className='font16'>Generate Report</p>
                {/* <p><button className='btn expiredButton borderRadius4 me-3' type='button'>Expired</button></p> */}
            </div>
            <div className="p-4">
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label labelGreyText font16">Report Name</label>
                        <input
                            type="text"
                            className="form-control font14"
                            value={reportName}
                            onChange={(e) => setReportName(e.target.value)}
                            placeholder="Enter Report Name"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label labelGreyText font16">Type</label>
                        <select
                            className="form-control font14"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="payin">Payin</option>
                            <option value="payout">Payout</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label labelGreyText font16">Amount</label>
                        <input
                            type="text"
                            className="form-control font14"
                            value={amount}
                            onChange={(e) => handleAmount(e.target.value)}
                            placeholder="Enter Amount"
                        />
                        {amountIsRequiredError && (
                            <div className="text-start mt-2" style={{ color: "red", fontSize: "x-small" }}>
                                Amount is required
                            </div>
                        )}
                        {amountValidError && (
                            <div className="text-start mt-2" style={{ color: "red", fontSize: "x-small" }}>
                                Please enter a valid Amount
                            </div>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label labelGreyText font16">Accounts</label>
                        <select
                            className="form-control font14"
                            value={accounts}
                            onChange={(e) => setAccounts(e.target.value)}
                        >
                            <option value="">Select Account</option>
                            {users?.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label labelGreyText font16">Start Date</label>
                        <input
                            type="date"
                            className="form-control font14"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label labelGreyText font16">End Date</label>
                        <input
                            type="date"
                            className="form-control font14"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    {/* <div className="col-md-6">
                        <label className="form-label labelGreyText font16">Client ID</label>
                        <input
                            type="text"
                            className="form-control font14"
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                            placeholder="Enter Client ID (For Super Admin Only)"
                        />
                    </div> */}

                    <div className="text text-center mt-3">
                        <div className='mb-3'>
                            <button className='col-6 btn btnPublishUser' onClick={(e) => {
                                e.preventDefault();
                                CreatePayment();
                            }}> Generate </button>
                        </div>
                        <div className='mb-3'>
                            <button className='col-4 btn btncancle' onClick={(e) => onData(true)}>Cancle</button>
                        </div>
                    </div>
                </form>
            </div>
        </Container>

    );
};

export default DownloadReports;


