import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import styled from 'styled-components'
import HashLoader from '../Dashboard/Loader';
import { updateUserbyId } from '../Utils/Apis';

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

const AccountConfirm = ({ Ids, UpdateStatus, onData }) => {

    console.log(UpdateStatus, "update")
    
    const [showLoader, setShowLoader] = useState(false);

    const userUpdate = async () => {
        try {
            setShowLoader(true);
            const response = await updateUserbyId(Ids);
            console.log(response, "user update successfully")
            if (response.status === 200) {
                onData(true);
                setShowLoader(false);
                toast.success("user update successfully"); 
            }
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.username[0]);
        }
    };

    useEffect(() => {
        return () => {
            // Cleanup function to reset showLoader when modal is closed
            setShowLoader(false);
        };
    }, [Ids, UpdateStatus]);


    return (
        <Container>
            {
                showLoader && (
                    <HashLoader />
                )
            }
            <div className="container-fluid p-0">
                <div className='d-flex justify-content-center'>
                    <div className='text text-center mt-3'>
                        <h4>Are you sure?</h4>
                        <p >Are you sure you would like to
                            <br />
                            <b>{UpdateStatus}</b> this account?
                            </p>
                    </div>
                </div>
                <div className="text text-center mt-3">
                    <div className='mb-3'>
                        <button className='col-4 btn btnPublishUser' onClick={userUpdate}> Confirm </button>
                    </div>
                    <div className='mb-3'>
                        <button className='col-4 btn btncancle' onClick={(e) => onData(true)}>Cancle</button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default AccountConfirm
