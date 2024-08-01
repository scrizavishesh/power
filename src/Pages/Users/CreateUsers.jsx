import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { useMainContext } from '../../Dashboard/DashboardLayout';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CreateUser } from '../../Utils/Apis';

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

const CreateUsers = () => {

    const { toggleSidebar } = useMainContext();

    const [username, setUsername] = useState(""); // Corrected state variable name
    const [userNameValidError, setUserNameValidError] = useState(false);
    const [userNameIsRequiredError, setUserNameIsRequiredError] = useState(false); // Corrected state variable name

    const [password, setPassword] = useState("");
    const [passwordValidError, setPasswordValidError] = useState(false);
    const [passwordIsRequiredError, setPasswordIsRequiredError] = useState(false); // Corrected state variable name
    const [isShowPassword, setIsShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [emailValidError, setEmailValidError] = useState(false);
    const [emailIsRequiredError, setEmailIsRequiredError] = useState(false); // Corrected state variable name

    const [upi, setUpi] = useState("");
    const [upiValidError, setUpiValidError] = useState(false);
    const [upiIsRequiredError, setUpiIsRequiredError] = useState(false); // Corrected state variable name

    const [selectedRole, setSelectedRole] = useState('admin');
    const [selectedRoleIsRequiredError, setSelectedRoleIsRequiredError] = useState(false);


    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberValidError, setPhoneNumberValidError] = useState(false);
    const [phoneNumberIsRequiredError, setPhoneNumberIsRequiredError] = useState(false);

    const [aadharNumber, setAadharNumber] = useState("");
    const [aadharNumberValidError, setAadharNumberValidError] = useState(false);
    const [aadharNumberIsRequiredError, setAadharNumberIsRequiredError] = useState(false);

    const [bankName, setBankName] = useState("");
    const [bankNameIsRequiredError, setBankNameIsRequiredError] = useState(false);

    const [branchName, setBranchName] = useState("");
    const [branchNameIsRequiredError, setBranchNameIsRequiredError] = useState(false);

    const [bankAccountNumber, setBankAccountNumber] = useState("");
    const [bankAccountNumberIsRequiredError, setBankAccountNumberIsRequiredError] = useState(false);

    const [ifsc, setIfsc] = useState("");
    const [ifscIsRequiredError, setIfscIsRequiredError] = useState(false);

    const [payinLimit, setPayinLimit] = useState("");
    const [payinLimitIsRequiredError, setPayinLimitIsRequiredError] = useState(false);

    const [payoutLimit, setPayoutLimit] = useState("");
    const [payoutLimitIsRequiredError, setPayoutLimitIsRequiredError] = useState(false);

    const [minAmount, setMinAmount] = useState("");
    const [minAmountIsRequiredError, setMinAmountIsRequiredError] = useState(false);

    const [maxAmount, setMaxAmount] = useState("");
    const [maxAmountIsRequiredError, setMaxAmountIsRequiredError] = useState(false);

    const [commission, setCommission] = useState("");
    const [commissionIsRequiredError, setCommissionIsRequiredError] = useState(false);

    const [accountHolderName, setAccountHolderName] = useState("");
    const [accountHolderNameValidError, setAccountHolderNameValidError] = useState(false);
    const [accountHolderNameIsRequiredError, setAccountHolderNameIsRequiredError] = useState(false);

    const [name, setName] = useState("");
    const [nameValidError, setNameValidError] = useState(false);
    const [nameIsRequiredError, setNameIsRequiredError] = useState(false);

    const handleName = (value) => {
        setName(value);
        if (value === "") {
            setNameValidError(false);
            setNameIsRequiredError(true);
        } else if (/^[a-zA-Z\s]+$/.test(value) === false) {
            setNameValidError(true);
            setNameIsRequiredError(false);
        } else {
            setNameValidError(false);
            setNameIsRequiredError(false);
        }
    };



    const handleAccountHolderName = (value) => {
        setAccountHolderName(value);
        if (value === "") {
            setAccountHolderNameValidError(false);
            setAccountHolderNameIsRequiredError(true);
        } else if (/^[a-zA-Z\s]+$/.test(value) === false) {
            setAccountHolderNameValidError(true);
            setAccountHolderNameIsRequiredError(false);
        } else {
            setAccountHolderNameValidError(false);
            setAccountHolderNameIsRequiredError(false);
        }
    };


    const handlePhoneNumber = (value) => {
        setPhoneNumber(value);
        const regex = /^[0-9]{10}$/;
        if (value === "") {
            setPhoneNumberValidError(false);
            setPhoneNumberIsRequiredError(true);
        } else if (!regex.test(value)) {
            setPhoneNumberValidError(true);
            setPhoneNumberIsRequiredError(false);
        } else {
            setPhoneNumberValidError(false);
            setPhoneNumberIsRequiredError(false);
        }
    };

    const handleAadharNumber = (value) => {
        setAadharNumber(value);
        const regex = /^[0-9]{12}$/;
        if (value === "") {
            setAadharNumberValidError(false);
            setAadharNumberIsRequiredError(true);
        } else if (!regex.test(value)) {
            setAadharNumberValidError(true);
            setAadharNumberIsRequiredError(false);
        } else {
            setAadharNumberValidError(false);
            setAadharNumberIsRequiredError(false);
        }
    };

    const handleBankName = (value) => {
        setBankName(value);
        if (value === "") {
            setBankNameIsRequiredError(true);
        } else {
            setBankNameIsRequiredError(false);
        }
    };

    const handleBranchName = (value) => {
        setBranchName(value);
        if (value === "") {
            setBranchNameIsRequiredError(true);
        } else {
            setBranchNameIsRequiredError(false);
        }
    };

    const handleBankAccountNumber = (value) => {
        setBankAccountNumber(value);
        const regex = /^[0-9]{9,18}$/; // Adjust length as needed
        if (value === "") {
            setBankAccountNumberIsRequiredError(true);
        } else if (!regex.test(value)) {
            setBankAccountNumberIsRequiredError(true);
        } else {
            setBankAccountNumberIsRequiredError(false);
        }
    };

    const handleIFSC = (value) => {
        setIfsc(value);
        const regex = /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/;
        if (value === "") {
            setIfscIsRequiredError(true);
        } else if (!regex.test(value)) {
            setIfscIsRequiredError(true);
        } else {
            setIfscIsRequiredError(false);
        }
    };

    const handlePayinLimit = (value) => {
        setPayinLimit(value);
        const regex = /^[0-9]+(\.[0-9]{1,2})?$/; // Allows up to two decimal places
        if (value === "") {
            setPayinLimitIsRequiredError(true);
        } else if (!regex.test(value)) {
            setPayinLimitIsRequiredError(true);
        } else {
            setPayinLimitIsRequiredError(false);
        }
    };

    const handlePayoutLimit = (value) => {
        setPayoutLimit(value);
        const regex = /^[0-9]+(\.[0-9]{1,2})?$/; // Allows up to two decimal places
        if (value === "") {
            setPayoutLimitIsRequiredError(true);
        } else if (!regex.test(value)) {
            setPayoutLimitIsRequiredError(true);
        } else {
            setPayoutLimitIsRequiredError(false);
        }
    };

    const handleMinAmount = (value) => {
        setMinAmount(value);
        const regex = /^[0-9]+(\.[0-9]{1,2})?$/; // Allows up to two decimal places
        if (value === "") {
            setMinAmountIsRequiredError(true);
        } else if (!regex.test(value)) {
            setMinAmountIsRequiredError(true);
        } else {
            setMinAmountIsRequiredError(false);
        }
    };

    const handleMaxAmount = (value) => {
        setMaxAmount(value);
        const regex = /^[0-9]+(\.[0-9]{1,2})?$/; // Allows up to two decimal places
        if (value === "") {
            setMaxAmountIsRequiredError(true);
        } else if (!regex.test(value)) {
            setMaxAmountIsRequiredError(true);
        } else {
            setMaxAmountIsRequiredError(false);
        }
    };

    const handleCommission = (value) => {
        setCommission(value);
        const regex = /^[0-9]+(\.[0-9]{1,2})?$/; // Allows up to two decimal places
        if (value === "") {
            setCommissionIsRequiredError(true);
        } else if (!regex.test(value)) {
            setCommissionIsRequiredError(true);
        } else {
            setCommissionIsRequiredError(false);
        }
    };

    const handleUPI = (value) => {
        setUpi(value); // Corrected state variable name
        const upiRegex = /^\d{10}@[a-zA-Z]{2,}$/;
        if (value === "") {
            setUpiValidError(false);
            setUpiIsRequiredError(true); // Corrected state variable name
        } else if (upiRegex.test(value) === false) {
            setUpiValidError(true);
            setUpiIsRequiredError(false); // Corrected state variable name
        } else {
            setUpiValidError(false);
            setUpiIsRequiredError(false); // Corrected state variable name
        }
    };

    const handleUserName = (value) => {
        setUsername(value); // Corrected state variable name
        const rex = /^[a-zA-Z0-9_-]{3,16}$/;
        if (value === "") {
            setUserNameValidError(false);
            setUserNameIsRequiredError(true); // Corrected state variable name
        } else if (rex.test(value) === false) {
            setUserNameValidError(true);
            setUserNameIsRequiredError(false); // Corrected state variable name
        } else {
            setUserNameValidError(false);
            setUserNameIsRequiredError(false); // Corrected state variable name
        }
    };

    const handleEmail = (value) => {
        setEmail(value); // Corrected state variable name
        const rex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,12}[.]{1}[A-Za-z.]{2,6}$/;
        if (value === "") {
            setEmailValidError(false);
            setEmailIsRequiredError(true); // Corrected state variable name
        } else if (rex.test(value) === false) {
            setEmailValidError(true);
            setEmailIsRequiredError(false); // Corrected state variable name
        } else {
            setEmailValidError(false);
            setEmailIsRequiredError(false); // Corrected state variable name
        }
    };

    const handleNewPass = (value) => {
        setPassword(value);
        const regex =
            /^(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        if (value === "") {
            setPasswordValidError(false);
            setPasswordIsRequiredError(true); // Corrected state variable name
        } else if (regex.test(value) === false) {
            setPasswordValidError(true);
            setPasswordIsRequiredError(false); // Corrected state variable name
        } else {
            setPasswordValidError(false);
            setPasswordIsRequiredError(false); // Corrected state variable name
        }
    };

    const handleShowPassword = (event, type) => {
        event.preventDefault();
        if (type === "show") {
            setIsShowPassword(true);
        } else {
            setIsShowPassword(false);
        }
    };

    const handleRoleChange = (value) => {
        setSelectedRole(value);
    };


    const register = async () => {
        if (email === "" || !email) setEmailIsRequiredError(true);
        if (username === "" || !username) setUserNameIsRequiredError(true);
        if (password === "" || !password) setPasswordIsRequiredError(true);
        if (selectedRole === "" || !selectedRole) setSelectedRoleIsRequiredError(true);
        if (phoneNumber === "" || !phoneNumber) setPhoneNumberIsRequiredError(true);
        if (aadharNumber === "" || !aadharNumber) setAadharNumberIsRequiredError(true);
        if (bankName === "" || !bankName) setBankNameIsRequiredError(true);
        if (branchName === "" || !branchName) setBranchNameIsRequiredError(true);
        if (bankAccountNumber === "" || !bankAccountNumber) setBankAccountNumberIsRequiredError(true);
        if (ifsc === "" || !ifsc) setIfscIsRequiredError(true);
        if (payinLimit === "" || !payinLimit) setPayinLimitIsRequiredError(true);
        if (payoutLimit === "" || !payoutLimit) setPayoutLimitIsRequiredError(true);
        if (minAmount === "" || !minAmount) setMinAmountIsRequiredError(true);
        if (maxAmount === "" || !maxAmount) setMaxAmountIsRequiredError(true);
        if (commission === "" || !commission) setCommissionIsRequiredError(true);

        if (name && email && username && password && selectedRole && phoneNumber && bankName && branchName && bankAccountNumber && ifsc && payinLimit && payoutLimit && minAmount && maxAmount && commission) {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("is_superadmin", false);
            if (selectedRole === 'admin') {
                formData.append('is_admin', true);
                formData.append('is_agent', false);
            } else if (selectedRole === 'agent') {
                formData.append('is_admin', false);
                formData.append('is_agent', true);
            }
            formData.append("phone_number", phoneNumber);
            formData.append("aadhar_number", aadharNumber);
            formData.append("bank_name", bankName);
            formData.append("branch_name", branchName);
            formData.append("bank_account_number", bankAccountNumber);
            formData.append("IFSC", ifsc);
            formData.append("payin_limit", payinLimit);
            formData.append("payout_limit", payoutLimit);
            formData.append("min_amount", minAmount);
            formData.append("max_amount", maxAmount);
            formData.append("commission", commission);
            formData.append("upi_id", upi);

            try {
                const response = await CreateUser(formData);
                console.log(response, "Create User")
                if (response.status === 201) {
                    setEmail("");
                    setUsername("");
                    setPassword("");
                    setUpi("");
                    setPhoneNumber("");
                    setAadharNumber("");
                    setBankName("");
                    setBranchName("");
                    setBankAccountNumber("");
                    setIfsc("");
                    setPayinLimit("");
                    setPayoutLimit("");
                    setMinAmount("");
                    setMaxAmount("");
                    setCommission("");
                    setSelectedRole("");
                    toast.success("User Created Successfully");
                }
            } catch (err) {
                console.log(err);
                toast.error(err?.response?.data?.username[0]);
            }
        }
    };




    return (
        <Container>
            <div className="container-fluid p-lg-5 p-3">
                <Icon className='toggleBars mb-3' icon="fa6-solid:bars" width="1.5em" height="1.5em" style={{ color: '#000' }} onClick={toggleSidebar} />
                <div className="row">
                    <div className="col-md-7 col-sm-12 order-md-1 order-sm-2">
                        <p className='greyText font14 fontWeight700'>Hi Shalu,</p>
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
                    <div className="col-xl-6 col-lg-12 p-4">
                        <div className="row">
                            <p className='font16 fontWeight600'>Personal Details</p>
                            <div className="blueBggg mt-3 p-3 borderRadius24">
                                <form class="row g-3">
                                    <div class="col-md-6">
                                        <label  class="form-label labelGreyText font16">Name</label>
                                        <input type="text" class="form-control font14" value={name}
                                            onChange={(e) => handleName(e.target.value)}
                                            placeholder="Enter Name" />
                                        {nameIsRequiredError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                Name is required
                                            </div>
                                        )}
                                        {nameValidError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                Please enter a valid name
                                            </div>
                                        )}
                                    </div>
                                    <div class="col-md-6">
                                        <label  class="form-label labelGreyText font16">Username</label>
                                        <input onChange={(e) => handleUserName(e.target.value)} value={username} type="text" class="form-control font14" placeholder='Enter your usename' />
                                        {userNameIsRequiredError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                UserName is required
                                            </div>
                                        )}
                                        {userNameValidError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                Please enter valid username
                                            </div>
                                        )}
                                    </div>
                                    <div class="col-md-12">
                                        <label  class="form-label labelGreyText font16">Email ID</label>
                                        <input type="text" class="form-control font14" placeholder='Enter your email' value={email} onChange={(e) => handleEmail(e.target.value)} />
                                        {emailIsRequiredError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                Email is required
                                            </div>
                                        )}
                                        {emailValidError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                Please enter valid email
                                            </div>
                                        )}
                                    </div>
                                    <div class="col-md-12">
                                        <label  class="form-label labelGreyText font16">Password</label>
                                        <input class="form-control font14" placeholder='**********' onChange={(e) => handleNewPass(e.target.value)} value={password} type={!isShowPassword ? "password" : "text"} />
                                        {passwordValidError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }} >
                                                Password at least 8 characters in length.
                                                <br />
                                                Lowercase letters (a-z)
                                                <br />
                                                Uppercase letters (A-Z)
                                                <br />
                                                Numbers (0-9)
                                                <br />
                                                Special characters ($@$!%*?&) <br />
                                            </div>
                                        )}
                                        {passwordIsRequiredError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                Password is required
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="phoneNumber" className="form-label labelGreyText font16">Phone Number *</label>
                                        <input
                                            maxLength="10"
                                            type="text"
                                            id="phoneNumber"
                                            className="form-control font14"
                                            value={phoneNumber}
                                            onChange={(e) => handlePhoneNumber(e.target.value)}
                                            placeholder="Enter Phone Number"
                                            required
                                        />
                                        {phoneNumberIsRequiredError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                Phone number is required
                                            </div>
                                        )}
                                        {phoneNumberValidError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                Please enter a valid phone number
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="role" className="form-label labelGreyText font16">Role & Permission *</label>
                                        <select
                                            id="role"
                                            className="form-select font14"
                                            value={selectedRole}
                                            onChange={(e) => handleRoleChange(e.target.value)}
                                            required
                                        >
                                            <option value='' disabled>-- Choose --</option>
                                            <option value="admin">Admin</option>
                                            <option value="agent">Peer</option>
                                        </select>

                                        {selectedRoleIsRequiredError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                Role selection is required
                                            </div>
                                        )}
                                    </div>

                                </form>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <p className='font16 fontWeight600'>Operations Data</p>
                            <div className="blueBggg mt-3 p-3 borderRadius24">
                                <form class="row g-3">
                                    <div class="col-md-6">
                                        <label  class="form-label labelGreyText font16">Total PayIn Limit</label>
                                        <input type="text" class="form-control font14" value={payinLimit} onChange={(e) => handlePayinLimit(e.target.value)} placeholder="Enter PayIn Limit" />
                                        {payinLimitIsRequiredError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                Payin limit is required
                                            </div>
                                        )}
                                    </div>
                                    <div class="col-md-6">
                                        <label  class="form-label labelGreyText font16">Total PayOut Limit</label>
                                        <input type="text" class="form-control font14" value={payoutLimit}
                                            onChange={(e) => handlePayoutLimit(e.target.value)}
                                            placeholder="Enter Payout Limit"
                                            required />
                                        {payoutLimitIsRequiredError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                Payout limit is required
                                            </div>
                                        )}
                                    </div>
                                    <div class="col-md-6">
                                        <label  class="form-label labelGreyText font16">Min. Amount Limit</label>
                                        <input type="text" class="form-control font14"
                                            value={minAmount}
                                            onChange={(e) => handleMinAmount(e.target.value)}
                                            placeholder="Enter Min Amount"
                                            required />
                                        {minAmountIsRequiredError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                Min amount is required
                                            </div>
                                        )}
                                    </div>
                                    <div class="col-md-6">
                                        <label  class="form-label labelGreyText font16">Max. Amount Limit</label>
                                        <input type="text" class="form-control font14"
                                            value={maxAmount}
                                            onChange={(e) => handleMaxAmount(e.target.value)}
                                            placeholder="Enter Max Amount"
                                            required />
                                        {maxAmountIsRequiredError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                Max amount is required
                                            </div>
                                        )}
                                    </div>
                                    <div class="col-md-12">
                                        <label  class="form-label labelGreyText font16">Comission %</label>
                                        <input type="text" class="form-control font14" value={commission}
                                            onChange={(e) => handleCommission(e.target.value)}
                                            placeholder="Enter Commission"
                                            required
                                        />
                                        {commissionIsRequiredError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                Commission is required
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-12 p-4">
                        <div className="row">
                            <p className='font16 fontWeight600'>Personal Details</p>
                            <div className="blueBggg mt-3 p-3 borderRadius24">
                                <form class="row g-3">
                                    <div class="col-md-12">
                                        <label  class="form-label labelGreyText font16">UPI ID</label>
                                        <input type="text" class="form-control font14"
                                            value={upi}
                                            onChange={(e) => handleUPI(e.target.value)}
                                            placeholder="Enter UPI ID"
                                            required />
                                        {upiIsRequiredError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                UPI ID is required
                                            </div>
                                        )}
                                        {upiValidError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                Please enter a valid UPI ID
                                            </div>
                                        )}
                                    </div>
                                    <div class="col-md-6">
                                        <label  class="form-label labelGreyText font16">Bank Name</label>
                                        {/* <input type="text" class="form-control font14" value='Elena'/> */}
                                        <span className='btn borderRadius10 bg-white d-flex'>
                                            <select value={bankName}
                                                onChange={(e) => handleBankName(e.target.value)}
                                                required
                                                class="form-select font14 p-0 me-3"
                                                aria-label="Default select example">
                                                <option value='' disabled>-- Choose --</option>
                                                <option selected value="HDFC">HDFC Bank LTD.</option>
                                                <option value="UNION">UNION Bank LTD.</option>
                                                <option value="ICICI">ICICI Bank LTD.</option>
                                                <option value="SBI">SBI Bank LTD.</option>
                                            </select>
                                            <span className='borderRadius8 addNewUserBtn p-1'>
                                                <Icon icon="icon-park-outline:down" width="1.5em" height="1.5em" style={{ color: '#2C6DB5' }} />
                                            </span>
                                        </span>
                                    </div>
                                    <div class="col-md-6">
                                        <label  class="form-label labelGreyText font16">Branch Name</label>
                                        <input type="text" class="form-control font14"
                                            value={branchName}
                                            onChange={(e) => handleBranchName(e.target.value)}
                                            placeholder="Enter Branch Name"
                                            required />
                                        {branchNameIsRequiredError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                Branch name is required
                                            </div>
                                        )}
                                    </div>
                                    <div class="col-md-12">
                                        <label  class="form-label labelGreyText font16">Account Number</label>
                                        <input type="text" class="form-control font14"
                                            value={bankAccountNumber}
                                            onChange={(e) => handleBankAccountNumber(e.target.value)}
                                            placeholder="Enter Bank Account Number"
                                            required
                                        />
                                        {bankAccountNumberIsRequiredError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                Bank account number is required
                                            </div>
                                        )}
                                    </div>
                                    <div class="col-md-12">
                                        <label  class="form-label labelGreyText font16">IFSC</label>
                                        <input type="text" class="form-control font14"
                                            value={ifsc}
                                            onChange={(e) => handleIFSC(e.target.value)}
                                            placeholder="Enter IFSC"
                                            required />
                                        {ifscIsRequiredError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                IFSC is required
                                            </div>
                                        )}
                                    </div>
                                    <div class="col-md-12">
                                        <label  class="form-label labelGreyText font16">Account Holder Name</label>
                                        <input type="text" class="form-control font14"
                                            value={accountHolderName}
                                            onChange={(e) => handleAccountHolderName(e.target.value)}
                                            placeholder="Enter Account Holder Name"
                                            required />
                                        {accountHolderNameIsRequiredError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                Account holder name is required
                                            </div>
                                        )}
                                        {accountHolderNameValidError && (
                                            <div className='text-start mt-2' style={{ color: "red", fontSize: "x-small" }}>
                                                Please enter a valid account holder name
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row d-grid gap-2 col-lg-6 col-md-8 col-10 mx-auto m-5">
                    <button class="btn btnPublishUser borderRadius12" onClick={register} type="button">Publish User</button>
                </div>
            </div>
        </Container>
    )
}

export default CreateUsers