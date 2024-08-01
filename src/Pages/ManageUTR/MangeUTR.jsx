import React from 'react'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useMainContext } from '../../Dashboard/DashboardLayout';
import UpdateUTR from '../../Modals/UpdateUTR';

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

  .nav-pills .nav-link.active{
    color: var(--sidebarBackground);
    background-color: var(--cardsBlueText) !important;
  }

  .nav-pills .nav-link{
    color: var(--greyText2Button);
    background-color: var(--sidebarBackground) !important;
  }

  .pointer{
    cursor: pointer;
  }

`;

const MangeUTR = () => {

    const { toggleSidebar } = useMainContext();

    return (
        <Container>
            <div className="container-fluid p-lg-5 p-3">
                <Icon className='toggleBars mb-3' icon="fa6-solid:bars" width="1.5em" height="1.5em" style={{ color: '#000' }} onClick={toggleSidebar} />
                <div className="row">
                    <div className="col-md-7 col-sm-12 order-md-1 order-sm-2">
                        <p className='greyText font14 fontWeight700'>Hi Shalu,</p>
                        <p className='font32 fontWeight700'>Welcome to Manage UTR</p>
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
                                <input className='form-control p-2 ps-3 rounded-5 borderNone font16 bg-white' type="search" placeholder="🔍  Search" aria-label="Search"></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3 mb-3">
                    <div className="d-flex">
                        <div className="flex-grow-1 align-self-center">
                            <ul class="nav nav-pills gap-3" id="pills-tab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active font14" id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-all" aria-selected="true">All</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link borderRadius10 font14" id="pills-active-tab" data-bs-toggle="pill" data-bs-target="#pills-active" type="button" role="tab" aria-controls="pills-active" aria-selected="false">Active</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link borderRadius10 font14" id="pills-inactive-tab" data-bs-toggle="pill" data-bs-target="#pills-inactive" type="button" role="tab" aria-controls="pills-inactive" aria-selected="false">Inactive</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link borderRadius10 font14" id="pills-blocked-tab" data-bs-toggle="pill" data-bs-target="#pills-blocked" type="button" role="tab" aria-controls="pills-blocked" aria-selected="false">Blocked</button>
                                </li>
                            </ul>
                        </div>
                        <Link className='btn borderRadius10 addNewUserBtn me-3 align-self-center' to='/addmanageUTR'>+ Add</Link>
                    </div>
                </div>
                <div className="row overflow-scroll">
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab" tabindex="0">
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <td className='font16 lineHeight21'>UPI</td>
                                        <td className='font16 lineHeight21'>Catergory</td>
                                        <td className='font16 lineHeight21'>Default Limit</td>
                                        <td className='font16 lineHeight21'>Limit balance</td>
                                        <td className='font16 lineHeight21'>Assignable</td>
                                        <td className='font16 lineHeight21'>Enabled</td>
                                        <td className='font16 lineHeight21'>Created</td>
                                        <td className='font16 lineHeight21'>Restock</td>
                                        <td className='font16 lineHeight21'>Update</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='font14 lineHeight24 align-middle'>7842876992@XXX</td>
                                        <td className='font14 lineHeight24 align-middle textGrey'>1</td>
                                        <td className='font14 lineHeight24 align-middle textGrey'>100000</td>
                                        <td className='font14 lineHeight24 align-middle textGrey'>100000</td>
                                        <td className='font14 lineHeight24 align-middle textGrey'>Yes</td>
                                        <td className='font14 lineHeight24 align-middle textGrey'>Enabled</td>
                                        <td className='font14 lineHeight24 align-middle textGrey'>Fri 07 Jun 2024, 17:30</td>
                                        <td className='font14 lineHeight24 align-middle textGrey'></td>
                                        <td className='font14 lineHeight24 align-middle text-center pointer'>
                                            <Icon icon="iconamoon:edit" width="1.5em" height="1.5em" style={{ color: '#2C6DB5' }}  data-bs-toggle="modal" data-bs-target="#updateModal"/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="tab-pane fade" id="pills-active" role="tabpanel" aria-labelledby="pills-active-tab" tabindex="0">
                            <span className='text-danger font14'>No Data Found !!</span>
                        </div>
                        <div class="tab-pane fade" id="pills-inactive" role="tabpanel" aria-labelledby="pills-inactive-tab" tabindex="0">
                            <span className='text-danger font14'>No Data Found !!</span>
                        </div>
                        <div class="tab-pane fade" id="pills-blocked" role="tabpanel" aria-labelledby="pills-blocked-tab" tabindex="0">
                            <span className='text-danger font14'>No Data Found !!</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Update Modal */}

            <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body p-1">
                            <UpdateUTR />
                        </div>
                    </div>
                </div>
            </div>

        </Container>
    )
}

export default MangeUTR