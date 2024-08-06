import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import styled from 'styled-components'
import HashLoader from '../Dashboard/Loader';
import { assignOrder, onlineUser } from '../Utils/Apis';
const Container = styled.div`

    .table tbody tr {
        --bs-table-bg-type: #F8F3F6 !important;
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

`;

const SubmittedPays = ({ Ids, OrderId, Price, onData }) => {

    const [userOnine, setuserOnine] = useState();
    const [showLoader, setShowLoader] = useState(false);
    const [userId, setuserId] = useState('')

    const fetchData = async () => {
        try {
            setShowLoader(true);
            const orderResponse = await onlineUser(Ids);
            console.log(orderResponse, "Onlin euSers")
            if (orderResponse?.status === 200 && orderResponse?.data)
            setShowLoader(false);
                setuserOnine(orderResponse?.data);
            onData(true);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData()
    }, [Ids])


    const getRole = (employee) => {
        if (employee.is_superadmin) return "Super Admin";
        if (employee.is_admin) return "Admin";
        if (employee.is_creator) return "Sub Admin";
        if (employee.is_agent) return "Peer";
        return "No Role Assigned";
    };

    const getStatus = (isCheckedIn) => {
        if (isCheckedIn) {
            return {
                color: '#22C55D',
                text: 'Active'
            };
        } else {
            return {
                color: '#FC2222',
                text: 'Inactive'
            };
        }
    };


    const Assign = async (id) => {
        const formData = new FormData();
        formData.append("user_id", id);
        formData.append("order_id", OrderId);
        try {
            setShowLoader(true);
            const response = await assignOrder(formData);
            console.log(response, "Asssign")
            if (response?.status === 200) {
                setShowLoader(false);
            }
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.non_field_errors[0])
        }
    };


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
                <div className="row overflow-scroll">
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <td className='font14 lineHeight21'>Name</td>
                                <td className='font14 lineHeight21'>Role</td>
                                <td className='font14 lineHeight21'>UPI ID</td>
                                <td className='font14 lineHeight21'>Status</td>
                                <td className='font14 lineHeight21'>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {userOnine?.length !== 0 ? (
                                userOnine?.map((provider) => {
                                    const role = getRole(provider);
                                    const status = getStatus(provider.is_checked_in);
                                    return (
                                        <tr>
                                            <td className='font12 align-middle lineHeight24'>{provider?.name}</td>
                                            <td className='font12 align-middle lineHeight24 greenText'>{role} </td>
                                            <td className='font12 align-middle lineHeight24'>{provider?.upi_id}</td>
                                            {/* <td className='font12 lineHeight24 align-middle'>
                                                <Icon className='me-2' icon="pepicons-pencil:circle-filled" width="1.4em" height="1.4em" style={{ color: '#22C55D' }} />
                                                <span>Active</span>
                                            </td> */}
                                            <td className='font12 lineHeight24 align-middle'>
                                                <Icon
                                                    className='me-2'
                                                    icon="pepicons-pencil:circle-filled"
                                                    width="1.4em"
                                                    height="1.4em"
                                                    style={{ color: status.color }}
                                                />
                                                <span>{status.text}</span>
                                            </td>
                                            <td className='font12 align-middle lineHeight24 text2Grey borderleft text-center'>
                                                <button onClick={(e) => Assign(provider?.id)} className='btn assignnButton borderRadius32 font20'> Assign</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td style={{ textAlign: "center" }} colSpan={6}>
                                        No data found
                                    </td>
                                </tr>
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Container>
    )
}

export default SubmittedPays