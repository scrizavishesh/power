import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { format } from 'date-fns';
import { useMainContext } from '../Dashboard/DashboardLayout';
import SubmittedPays from '../Modals/SubmittedPays';
import { getAllAayoutRequests } from '../Utils/Apis';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import AssignedOrder from '../Modals/AssignedOrder';
import { Link } from 'react-router-dom';
import HashLoader from '../Dashboard/Loader';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { useDispatch, useSelector } from 'react-redux';

const Container = styled.div`

  .toggleBars{
    display: none !important;
  }

  @media screen and (max-width: 1000px) {
    .toggleBars{
    display: block !important;
    }
  }

  .text2Grey{
    color: var(--greyText3Color) !important;
  }

  .textBlue{
    color: var(--cardsBlueText) !important;
  }

  .submittedButton, .submittedButton:active, .submittedButton:focus{
    color: var(--createdBtnText);
    background-color: var(--createdBtnBg);
    width: fit-content;
  }

  .rejectedButton, .rejectedButton:active, .rejectedButton:focus{
    color: var(--expiredBtnText);
    background-color: var(--expiredBtnBg);
  }

  .confirmedButton, .confirmedButton:active, .confirmedButton:focus{
    color: var(--confirmedBtnText);
    background-color: var(--confirmedBtnBg);
  }

  .assigneddButton, .assigneddButton:active, .assigneddButton:focus{
    color: var(--assignedBtnText);
    background-color: var(--assignedBtnBg);
  }

  .assignnButton, .assignnButton:active, .assignnButton:focus{
    color: var(--sidebarBackground);
    background-color: var(--assignedBtnText);
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

  .rowBlue{
    background-color: #EBF1F9;
  }

  .heighhtt{
    height: max-content;
  }

`;

const PayOutOperations = () => {

  const { toggleSidebar } = useMainContext();

  const todayDate = format(new Date(), 'dd/MM/yyyy');

  const dispatch = useDispatch();
  const { users, status, error } = useSelector(state => state.users);
  const [profileDetails, setprofileDetails] = useState(users[0]);

  const [updateData, setupdateData] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const [orderCreate, setCreateOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAgents, setShowAgents] = useState([]);
  const [currentpage, setcurrentpage] = useState('');
  const [csvData, setCsvData] = useState([]);
  const [agent, setAgent] = useState('');
  const [startDate, setStartDate] = useState("");
  const [dateRange, setDateRange] = useState([todayDate, todayDate]);
  const [endDate, setEndDate] = useState("");
  const [Ids, setIds] = useState();
  const [OrderId, setOrderId] = useState();
  const [Price, setPrice] = useState();
  const [activeButton, setActiveButton] = useState("");
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const formatDate = (date) => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is 0-indexed
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (selectedDates) => {
    setDateRange(selectedDates);
    setStartDate(formatDate(selectedDates[0]));
    setEndDate(formatDate(selectedDates[1]));
    setActiveButton("custom");
  };

  const fetchData = async () => {
    try {
      setShowLoader(true);
      const orderResponse = await getAllAayoutRequests(searchTerm, currentPage, activeButton, startDate, endDate, agent);
      console.log(orderResponse, "Payout ")
      if (orderResponse?.status === 200 && orderResponse?.data?.results)
        setShowLoader(false);
      setCreateOrder(orderResponse?.data.results);
      setTotalPages(Math.ceil(orderResponse.data.count / itemsPerPage));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, currentPage, agent, activeButton, startDate, endDate, updateData]);


  // Handle input change
  const handleInputChange = (value) => {
    setSearchTerm(value);
  };

  const handleOrder = (id, orderId, price) => {
    setIds(id);
    setOrderId(orderId);
    setPrice(price)
    new bootstrap.Modal(document.getElementById('submittedModal')).show();
  }

  const handleData = (data) => {
    setupdateData(data)
    bootstrap.Modal.getInstance(document.getElementById('submittedModal')).hide();
  };

  const handleAssignedOrder = (orderId, price) => {
    setOrderId(orderId);
    setPrice(price)
    new bootstrap.Modal(document.getElementById('exampleModalLg')).show();
  }

  const handleAssignedData = (data) => {
    setupdateData(data)
    bootstrap.Modal.getInstance(document.getElementById('exampleModalLg')).hide();
  };

  return (
    <Container>
      {
        showLoader && (
          <HashLoader />
        )
      }
      <div className="container-fluid p-lg-5 p-3">
        <Icon className='toggleBars mb-3' icon="fa6-solid:bars" width="1.5em" height="1.5em" style={{ color: '#000' }} onClick={toggleSidebar} />
        <div className="row sticky-top">
          <div className="col-md-7 col-sm-12 order-md-1 order-sm-2">
            <p className='greyText font14 fontWeight700'>Hi {profileDetails?.username},</p>
            <p className='font32 fontWeight700'>Welcome to PayOut Operations</p>
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
              <ul className="nav nav-pills gap-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button onClick={() => handleInputChange("")} className={`nav-link ${searchTerm === "" ? "active" : ""} font14`} type="button" >All</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button onClick={() => handleInputChange("CREATED")} className={`nav-link ${searchTerm === "CREATED" ? "active" : ""} font14`} type="button" >New Unassigned</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button onClick={() => handleInputChange("SUBMITTED")} className={`nav-link ${searchTerm === "SUBMITTED" ? "active" : ""} font14`} type="button">Approved</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button onClick={() => handleInputChange("ASSIGNED")} className={`nav-link ${searchTerm === "ASSIGNED" ? "active" : ""} font14`} type="button">Assigned</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button onClick={() => handleInputChange("REJECTED")} className={`nav-link ${searchTerm === "REJECTED" ? "active" : ""} font14`} type="button">Rejected</button>
                </li>
              </ul>
            </div>
            <Link className='btn borderRadius10 addNewUserBtn me-3 align-self-center' to='/createPayOutOrder'>+ Create Order</Link>
            <div className="dropdown">
              <button style={{ borderColor: "#0000" }} type="button" data-bs-toggle="dropdown" aria-expanded="false" className='bg-white align-self-center p-2 borderRadius10 me-2 dropdown-toggle'>
                <Icon icon="ion:filter" width="1.4em" height="1.4em" style={{ color: '#2C6DB5' }} />
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" onClick={() => handleButtonClick("")}>All</a></li>
                <li><a className="dropdown-item" onClick={() => handleButtonClick("today")}>Today</a></li>
                <li><a className="dropdown-item" onClick={() => handleButtonClick("yesterday")}>Yesterday</a></li>
              </ul>
            </div>
            <div className="date-picker-container">
              <Flatpickr
                class="form-control"
                style={
                  activeButton === "custom"
                    ? {
                      background: "#1961A3",
                      border: "1px solid #DDDDEB",
                      color: "#fff",
                    }
                    : {}
                }
                placeholder=''
                value={dateRange}
                options={{
                  mode: 'range',
                  dateFormat: 'Y-n-j',
                }}
                onClick={() => handleButtonClick("custom")}
                onChange={handleDateChange}
                render={({ defaultValue, ...props }, ref) => (
                  <div className="input-group">
                    <input {...props} ref={ref} defaultValue={defaultValue} />
                    <span className="input-group-text">
                      <Icon icon="uiw:date" width="1.1em" height="1.1em" style={{ color: '#2C6DB5' }} />
                    </span>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
        <div className="row overflow-scroll">
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab" tabIndex="0">
              {orderCreate?.length !== 0 ? (
                orderCreate?.map((provider) => {
                  return (
                    <div className="row mb-3 rowBlue">

                      <div className="col-sm-10 col-12 ">
                        <div className="row p-3">
                          <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-12 p-0">
                            <div className='d-flex mb-2'><span className='col-4 font14 p-0'>Order ID:</span><span className='col-8 font14 text2Grey'>{provider?.order_id}</span></div>
                            <div className='d-flex mb-2'><span className='col-4 font14 p-0'>Client Name:</span><span className='col-8 font14 text2Grey'>{provider?.client_name}</span></div>
                            <div className='d-flex mb-2'><span className='col-4 font14 p-0'>Client UPI:</span><span className='col-8 font14 text2Grey'>{provider?.client_upi}</span></div>
                            <div className='d-flex mb-2'><span className='col-4 font14 p-0'>Bank name:</span><span className='col-8 font14 text2Grey'>{provider?.bank_name}</span></div>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-12 p-0">
                            <div className='d-flex mb-2'><span className='col-4 font14 p-0'>Account no.:</span><span className='col-8 font14 text2Grey'>{provider?.account_number}</span></div>
                            <div className='d-flex mb-2'><span className='col-4 font14 p-0'>IFCS:</span><span className='col-8 font14 text2Grey'>{provider?.ifsc}</span></div>
                            <div className='d-flex mb-2'><span className='col-4 font14 p-0'>Created on:</span><span className='col-8 font14 text2Grey'>{provider?.created_at.slice(0, 10)}</span></div>
                            <div className='d-flex mb-2'><span className='col-4 font14 p-0'>Assigned to:</span><span className='col-8 font14 text2Grey'>{provider?.assigned_to}</span></div>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-12 p-0">
                            <div className='d-flex mb-2'><span className='col-4 font14 p-0'>Assignee UPI:</span><span className='col-8 font14 text2Grey'>{provider?.assignee_upi}</span></div>
                            <div className='d-flex mb-2'><span className='col-4 font14 p-0'>Approved by:</span><span className='col-8 font14 text2Grey'>{provider?.approved_by}</span></div>
                            <div className='d-flex mb-2'><span className='col-4 font14 p-0'>UTR Code:</span><span className='col-8 font14 text2Grey'>{provider?.utr_code}</span></div>
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-2 col-12 d-flex p-0">
                        <div className="col-sm-10 col-11 p-sm-0 p-3 bg-white text text-center d-flex justify-content-center">
                          <div className='align-self-center'>
                            <p className='font16 text-center mb-2'>
                              <button
                                type="button"
                                className={`btn ${provider?.approval_status === "SUBMITTED" ? 'confirmedButton' :
                                  provider?.approval_status === 'ASSIGNED' ? 'assigneddButton' :
                                    provider?.approval_status === 'CREATED' ? 'submittedButton' :
                                      'rejectedButton'
                                  } borderRadius4 font12 text-center`}
                                onClick={() => provider?.approval_status === 'ASSIGNED' ? handleAssignedOrder(provider?.order_id, provider?.payment_amount) : null}
                              >
                                {provider?.approval_status}
                              </button>
                            </p>
                            <p className='font18 text-center'>{provider?.payment_amount}</p>
                            {
                              provider?.approval_status === 'CREATED' && (
                                <button onClick={() => handleOrder(provider?.id, provider?.order_id, provider?.payment_amount)} className='btn assignnButton borderRadius32 font20 mt-2'>Assign</button>
                              )
                            }
                          </div>
                        </div>
                      </div>
                    </div>
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
            </div>
            <ResponsivePagination
              current={currentPage}
              total={totalPages}
              onPageChange={setCurrentPage}
            />
            <div className="tab-pane fade" id="pills-newUnassigned" role="tabpanel" aria-labelledby="pills-newUnassigned-tab" tabIndex="0">
            </div>
            <div className="tab-pane fade" id="pills-pending" role="tabpanel" aria-labelledby="pills-pending-tab" tabIndex="0">
            </div>
            <div className="tab-pane fade" id="pills-approved" role="tabpanel" aria-labelledby="pills-approved-tab" tabIndex="0">
            </div>
            <div className="tab-pane fade" id="pills-declined" role="tabpanel" aria-labelledby="pills-declined-tab" tabIndex="0">
              <span className='text-danger font14'>No Data Found !!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submitted Modal */}

      <div class="modal fade" id="exampleModalLg" tabindex="-1" aria-labelledby="exampleModalLgLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-body">
              <AssignedOrder OrderId={OrderId} Price={Price} onData={handleData} />
            </div>
          </div>
        </div>
      </div>


      <div className="modal fade" id="submittedModal" tabIndex="-1" aria-labelledby="submittedModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body p-2">
              <SubmittedPays Ids={Ids} OrderId={OrderId} Price={Price} onData={handleData} />
            </div>
          </div>
        </div>
      </div>





    </Container >
  )
}

export default PayOutOperations