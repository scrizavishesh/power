

import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useMainContext } from '../../Dashboard/DashboardLayout';
import { DownloadOrders, getAgents, updateUserbyId } from '../../Utils/Apis';
import { toast } from 'react-hot-toast';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import HashLoader from '../../Dashboard/Loader';
import { useDispatch, useSelector } from 'react-redux';
import DownloadReports from '../../Modals/DownloadReports';

const Container = styled.div`

.toggleBars{
    display: none !important;
  }

  @media screen and (max-width: 1000px) {
    .toggleBars{
    display: block !important;
    }
  }

  .table tbody tr {
    --bs-table-bg-type: var(--tableAlternateBg) !important;
    border-top: 10px solid #fff !important;
    border-bottom: 10px solid #fff !important;
  }

  .table>:not(caption)>*>* {
    padding: 1rem !important;
  }

  .textGrey{
    color: var(--tableTextGrey) !important;
  }

  .textInactive{
    color: var(--textInactive) !important;
  }

  .textActive{
    color: var(--textActive) !important;
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

/* Peer Button css

  .dropButtonDiv{
    border: 2px solid var(--addNewUserButton);
    width: 100%;
    display: block !important;
    transition: 0.3s ease-out;
    margin-top: 8% !important;
  }

  .hovercolor:hover{
    border-radius: var(--borderRadius8) !important;
    color: var(--cardsBlueText);
    background-color: var(--addNewUserButton);
  } */

  .nav-pills .nav-link.active{
    color: var(--sidebarBackground);
    background-color: var(--cardsBlueText) !important;
  }

  .nav-pills .nav-link{
    color: var(--greyText2Button);
    background-color: var(--sidebarBackground) !important;
  }

`;

const Index = () => {

    const dispatch = useDispatch();
    const { users, status, error } = useSelector(state => state.users);
    const [profileDetail, setprofileDetail] = useState(users[0]);

    const navigate = useNavigate();
    const { toggleSidebar } = useMainContext();
    const [showLoader, setShowLoader] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [Employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [role, setRole] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    const [statu, setStatus] = useState('')


    // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    // tooltipTriggerList.forEach((tooltipTriggerEl) => {
    //     new window.bootstrap.Tooltip(tooltipTriggerEl);
    // });

    useEffect(() => {
        getEmployess();
    }, [currentPage, searchTerm, role, statu]);

    // Handle input change
    const handleInputChange = (value) => {
        setSearchTerm(value);
    };

    const changeRole = (value) => {
        setRole(value)
    }

    const getEmployess = async (id) => {
        setShowLoader(true);
        const response = await DownloadOrders(startDate, endDate, id);
        console.log(response, "Users Reports")
        try {
            if (response?.status === 200) {
                setShowLoader(false);
                const rows = response?.data?.split('\n').map(row => row.split(','));
                // setCsvData(rows);
                setEmployees(rows.slice(1));
                toast.success("Report Get Successfully");
            } else {
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };


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

    const handleStatus = (value) => {
        setStatus(value);
    };



    const handleNavigate = () => {
        new bootstrap.Modal(document.getElementById('confirmedModal')).show();
    };

    const handleData = () => {
        bootstrap.Modal.getInstance(document.getElementById('confirmedModal')).hide();
    };





    // const [dropVisible, setDropVisible] = useState(false);

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
                        <p className='greyText font14 fontWeight700'>Hi {profileDetail?.username},</p>
                        <p className='font32 fontWeight700'>Welcome to Users</p>
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
                                <input value={searchTerm} onChange={(e) => handleInputChange(e.target.value)} className='form-control p-2 ps-3 rounded-5 borderNone font16 bg-white' type="search" placeholder="🔍  Search" aria-label="Search"></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3 mb-3">
                    <div className="d-flex">
                        <div className="flex-grow-1 align-self-center">

                        </div>
                        <Link className='btn borderRadius10 addNewUserBtn me-3 align-self-center' to='/report'>+ Saved Reports</Link>
                        <Link className='btn borderRadius10 addNewUserBtn me-3 align-self-center' onClick={handleNavigate}>+ Generate Report</Link>
                        {/* <span className='btn borderRadius10 bg-white d-flex'>
                            <select onChange={(e) => changeRole(e.target.value)} class="form-select p-0 font14 me-3" aria-label="Default select example">
                                <option value=''>-- Choose --</option>
                                <option value="superadmin">Super Admin</option>
                                <option value="admin">Admin</option>
                                <option value="subadmin">Sub Admin</option>
                                <option value="agent">Peer</option>
                            </select>
                            <span className='borderRadius8 addNewUserBtn p-1'>
                                <Icon icon="icon-park-outline:down" width="1.5em" height="1.5em" style={{ color: '#2C6DB5' }} />
                            </span>
                        </span> */}
                    </div>
                </div>
                <div className="row overflow-scroll">
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab" tabindex="0">
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Client Name</th>
                                        <th>UTR</th>
                                        <th>Approval Status</th>
                                        <th>Agent Username</th>
                                        <th>Payment Amount</th>
                                        <th>Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Employees.length !== 0 ? (
                                        Employees.map((row, index) => (
                                            <tr key={index}>
                                                {row.map((cell, cellIndex) => (
                                                    <td key={cellIndex} className="ps-1">
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td style={{ textAlign: "center" }} colSpan={6}>
                                                No data found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <ResponsivePagination
                                current={currentPage}
                                total={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                        <div class="tab-pane fade" id="pills-blocked" role="tabpanel" aria-labelledby="pills-blocked-tab" tabindex="0">
                            <span className='text-danger font14'>No Data Found !!</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="confirmedModal" tabIndex="-1" aria-labelledby="confirmedModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body p-1">
                            <DownloadReports onData={handleData} />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Index