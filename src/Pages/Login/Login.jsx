import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom'
import { LoginSuccess, Loginuse } from '../../Utils/Apis';
import toast from 'react-hot-toast';
import { encryptData } from '../../Utils/Encrypt_data';
import HashLoader from '../../Dashboard/Loader';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(./images/LoginBg.svg);
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100%;

    .loginText {
        color: var(--cardsBlueText);
    }

    .helpMsg {
        color: var(--loginGreyTextColor);
    }

    .form-check-input:checked {
        background-color: var(--cardsBlueText);
        border-color: var(--cardsBlueText);
    }

    .form-control::placeholder {
        color: var(--formControlLoginTextColor) !important;
    }

    .form-control {
        height: 50px;
        box-shadow: none !important;
        border: none !important;
        background-color: var(--blueBggSettings) !important;
       color: #000 !important;
    }

    .btnLogin, .btnLogin:active, .btnLogin:focus {
        color: var(--sidebarBackground);
        background-color: var(--cardsBlueText);
    }

    .mainDiv {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0 20px; /* Add padding for smaller screens */
    }

    .width500px {
        width: 100%;
        max-width: 500px; /* Set a max-width for larger screens */
        background-color: white;
        padding: 40px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

        @media (max-width: 768px) {
            padding: 35px; /* Adjust padding for smaller screens */
        }

        @media (max-width: 480px) {
            padding: 20px; /* Adjust padding for mobile screens */
        }
    }
`;

const Login = () => {

    const navigate = useNavigate()

    const [tokenData, settokenData] = useState("");
    const [SuccessLogin, setSuccessLogin] = useState("")
    // console.log(tokenData, "data"); 

    const [username, setUsernamer] = useState("");
    const [userNameValidError, setUserNameValidError] = useState(false);
    const [userNameIsRequiredError, setUserNameIsRequiredlError] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordValidError, setPasswordValidError] = useState(false);
    const [passwordIsRequiredError, setPasswordIsRequiredlError] = useState(false);



    const handleUserName = (value) => {
        setUsernamer(value);
        const rex = /^[a-zA-Z0-9_-]{3,16}$/;;
        if (value === "") {
            setUserNameValidError(false);
            setUserNameIsRequiredlError(true);
        } else if (rex.test(value) === false) {
            setUserNameValidError(true);
            setUserNameIsRequiredlError(false);
        } else {
            setUserNameValidError(false);
            setUserNameIsRequiredlError(false);
        }
    };


    const handlePassword = (value) => {
        setPassword(value);
        const rex = /^[6-9]\d{9}$/;
        if (value === "") {
            setPasswordValidError(false);
            setPasswordIsRequiredlError(true);
        } else if (rex.test(value) === false) {
            setPasswordValidError(true);
            setPasswordIsRequiredlError(false);
        } else {
            setPasswordValidError(false);
            setPasswordIsRequiredlError(false);
        }
    };

    useEffect(() => {
        userSuccess(tokenData);
    }, [tokenData])



    const userSuccess = async (tokenData) => {
        try {
            const response = await LoginSuccess(tokenData)
            console.log(response, "Login Success response");
            if (response?.status === 200) {
                setSuccessLogin(response?.data?.users);
                const encryptedUserData = encryptData(response?.data?.users);
                localStorage.setItem(
                    `data`, encryptedUserData
                );
                localStorage.setItem(
                    `role`, JSON.stringify(response?.data?.role)
                );
                navigate("/")
                window.location.reload();
            }
        } catch (err) {
            console.log(err)
        }

    };


    const loginuser = async (e) => {
        e.preventDefault();
        if (username === "" || !username) {
            setUserNameIsRequiredlError(true);
        }
        if (password === "" || !password) {
            setPasswordIsRequiredlError(true);
        }

        if ((username !== "", password !== "")) {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);
            try {
                const response = await Loginuse(formData);
                if (response?.status === 200) {
                    settokenData(response?.data?.token);
                    localStorage.setItem(
                        `token`, response?.data?.token
                    );
                }
            } catch (err) {
                console.log(err);
                toast.error(err?.response?.data?.non_field_errors[0])
            }
        }

    };


    return (
        <Container>
            <div className="mainDiv">
                <div className="width500px">
                    <p className='font32 mb-3 loginText'>Login</p>
                    <p className='font20 mb-3 helpMsg'>Enter your email and password to sign in</p>
                    <input type="email" onChange={(e) => handleUserName(e.target.value)} maxLength="30" className="form-control borderRadius12 font14 mb-3" placeholder='Username' />
                    {userNameIsRequiredError && (
                        <div className='text-start p-2' style={{ color: "red", fontSize: "x-small" }}>
                            Username is required
                        </div>
                    )}
                    {userNameValidError && (
                        <div className='text-start p-2' style={{ color: "red", fontSize: "x-small" }}>
                            Please enter valid Username
                        </div>
                    )}
                    <input type="password" onChange={(e) => handlePassword(e.target.value)} className="form-control borderRadius12 font14 mb-3" id="validationDefaul" placeholder='Password' />
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                        <label className="form-check-label ms-1" htmlFor="flexCheckChecked">
                            Remember me
                        </label>
                    </div>
                    <div className="row d-grid gap-2 col-lg-11 col-md-11 col-12 mx-auto mt-4">
                        <Link className="btn btnLogin p-3 borderRadius12" type="button" onClick={loginuser}>Login</Link>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Login;
