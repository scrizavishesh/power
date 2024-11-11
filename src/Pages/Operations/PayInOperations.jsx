import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { format } from 'date-fns';
import ConfirmPayment from '../../Modals/ConfirmPayment';
import { useMainContext } from '../../Dashboard/DashboardLayout';
import React, { useState, useEffect } from 'react';
import { DownloadOrders, getAgents, getAllOrders } from '../../Utils/Apis';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import { Link } from 'react-router-dom';
import HashLoader from '../../Dashboard/Loader';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { useDispatch, useSelector } from 'react-redux';
// import { Icon } from '@iconify/react';


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
    --bs-table-bg-type: var(--tableAlternateBg);
    border-top: 10px solid #fff ;
    border-bottom: 10px solid #fff ;
  }

  .table>:not(caption)>*>* {
    padding: 1rem 0.6rem 1rem 0.6rem;
  }

  .textGrey{
    color: var(--tableTextGrey) !important;
  }

  .text2Grey{
    color: var(--greyText3Color) !important;
  }

  .textBlue{
    color: var(--cardsBlueText) !important;
  }

  .confirmedButton, .confirmedButton:active, .confirmedButton:focus{
    color: var(--confirmedBtnText);
    background-color: var(--confirmedBtnBg);
  }

  .unconfirmedButton, .unconfirmedButton:active, .unconfirmedButton:focus{
    color: var(--unconfirmedBtnText);
    background-color: var(--unconfirmedBtnBg);
  }

  .expiredButton, .expiredButton:active, .expiredButton:focus{
    color: var(--expiredBtnText);
    background-color: var(--expiredBtnBg);
  }

  .pendingButton, .pendingButton:active, .pendingButton:focus{
    color: var(--pendingBtnText);
    background-color: var(--pendingBtnBg);
  }

  .createdButton, .createdButton:active, .createdButton:focus{
    color: var(--createdBtnText);
    background-color: var(--createdBtnBg);
  }

  .approveButton, .approveButton:active, .approveButton:focus{
    width: 110px ;
    color: var(--sidebarBackground);
    background-color: var(--publishBtn);
    border-radius: var(--borderRadius32) !important;
  }

  .approveButton2, .approveButton2:active, .approveButton2:focus{
    width: 110px ;
    color: var(--approved2BtnText);
    background-color: var(--approved2BtnBg);
    border-radius: var(--borderRadius32) !important;
  }


  .addNewUserBtn, .addNewUserBtn:active, .addNewUserBtn:focus{
    padding: 1% 2% 1% 2%;
    color: var(--cardsBlueText);
    background-color: var(--addNewUserButton);
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

  .borderRadiusTop{
    border-radius: 8px 8px 0px 0px !important;
  } 

`;

const PayInOperations = () => {

  const { toggleSidebar } = useMainContext();

  const dispatch = useDispatch();
  const { users, status, error } = useSelector(state => state.users);
  const [profileDetails, setprofileDetails] = useState(users[0]);

  const todayDate = format(new Date(), 'yyyy-MM-dd');
  const [updateData, setupdateData] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const [orderCreate, setCreateOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const [agent, setAgent] = useState('');
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateRange, setDateRange] = useState([todayDate, todayDate]);
  const [OrdersIds, setOrdersIds] = useState()
  const [activeButton, setActiveButton] = useState("");
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handleDateChange = (selectedDates) => {
    setDateRange(selectedDates);
    setStartDate(formatDate(selectedDates[0]));
    setEndDate(formatDate(selectedDates[1]));
    setActiveButton("custom");
  };

  const formatDate = (date) => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is 0-indexed
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  };



  // const Download_Slip = async () => {
  //   if (agent) {
  //     try {
  //       const response = await DownloadOrders(startDate, endDate, agent);
  //       console.log(response, "download slip");
  //       if (response?.status === 200) {
  //         const rows = response?.data?.split('\n').map(row => row.split(','));
  //         setCsvData(rows);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };


  const fetchData = async () => {
    try {
      setShowLoader(true);
      const orderResponse = await getAllOrders(searchTerm, currentPage, activeButton, startDate, endDate, agent);
      console.log(orderResponse)
      if (orderResponse?.status === 200 && orderResponse?.data?.results)
        setShowLoader(false);
      setCreateOrder(orderResponse?.data.results);
      setTotalPages(Math.ceil(orderResponse.data.count / itemsPerPage));
    } catch (err) {
      console.log(err);
    }

    // try {
    //   const agentsResponse = await getAgents(currentpage);
    //   if (agentsResponse?.status === 200) setShowAgents(agentsResponse?.data?.results);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, currentPage, agent, activeButton, startDate, endDate, updateData]);


  // Handle input change
  const handleInputChange = (value) => {
    setSearchTerm(value);
  };

  const handleOrder = (id) => {
    setOrdersIds(id);
    new bootstrap.Modal(document.getElementById('confirmedModal')).show();
  }

  const handleData = (data) => {
    setupdateData(data)
    bootstrap.Modal.getInstance(document.getElementById('confirmedModal')).hide();
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
            <p className='font32 fontWeight700'>Welcome to PayIn Operations</p>
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
                  <button onClick={() => handleInputChange("PENDING")} className={`nav-link ${searchTerm === "PENDING" ? "active" : ""} font14`} type="button">Pending</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button onClick={() => handleInputChange("APPROVED")} className={`nav-link ${searchTerm === "APPROVED" ? "active" : ""} font14`} type="button">Approved</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button onClick={() => handleInputChange("EXPIRED")} className={`nav-link ${searchTerm === "EXPIRED" ? "active" : ""} font14`} type="button" >Expired</button>
                </li>
              </ul>
            </div>
            <Link className='btn borderRadius10 addNewUserBtn me-3 align-self-center' to='/createPayInOrder'>+ Create Order</Link>
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

            {/* <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <span class="input-group-text" id="basic-addon2">@example.com</span>
            </div> */}
            <div className="date-picker-container">
              <Flatpickr
                class="form-control form-control-lg"
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
            {/* <span type="button" onChange={handleDateChange} className='bg-white align-self-center p-2 borderRadius10 textBlue font16'>
              {todayDate}
              <Icon className='ms-2' icon="uiw:date" width="1.1em" height="1.1em" style={{ color: '#2C6DB5' }} />
            </span> */}





          </div>
        </div>
        <div className="container-fluid">
          <div className="row overflow-auto">
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab" tabIndex="0">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <td className='font16 lineHeight21'>Reciept Number</td>
                        <td className='font16 lineHeight21'>Client Name</td>
                        <td className='font16 lineHeight21'>Order ID</td>
                        <td className='font16 lineHeight21'>Created on</td>
                        <td className='font16 lineHeight21'>UTR Number</td>
                        <td className='font16 lineHeight21'>UTR Slip</td>
                        <td className='font16 lineHeight21'>Assignee UPI</td>
                        <td className='font16 lineHeight21'>Amount</td>
                        <td className='font16 lineHeight21'>Action</td>
                      </tr>
                    </thead>
                    <tbody>
                      {orderCreate?.length !== 0 ? (
                        orderCreate?.map((provider) => {
                          return (
                            <tr key={provider?.id}>
                              <td className='font14 align-middle lineHeight24'>{provider?.receipt}</td>
                              <td className='font14 align-middle lineHeight24'>{provider?.client_name}</td>
                              <td className='font14 align-middle lineHeight24 text2Grey'>{provider?.order_id}</td>
                              <td className='font14 align-middle lineHeight24 text2Grey'>{provider?.created_at?.slice(0, 10)}</td>
                              <td className='font14 align-middle lineHeight24 text2Grey'>{provider?.utr}</td>
                              <td className='font14 align-middle lineHeight24'>
                                <Icon icon="pepicons-pencil:file" width="1.5em" height="1.5em" style={{ color: '#2C6DB5' }} />
                              </td>
                              <td className='font14 align-middle lineHeight24 textBlue'>{provider?.upi}</td>
                              <td className='font14 align-middle lineHeight24 text text-center'>
                                <button className={`btn ${provider?.approval_status === 'APPROVED' ? 'confirmedButton' : (provider?.approval_status === 'PENDING' ? 'pendingButton' : (provider?.approval_status === 'CREATED' ? 'createdButton' : 'expiredButton'))} borderRadius4 me-3`}>{provider?.approval_status}</button>
                                <p className=' font18 fontWeight700 mt-1'>{provider?.payment_amount}</p>
                              </td>
                              <td className='font14 align-middle lineHeight24'>
                                <div className="d-flex">
                                  {
                                    provider?.approval_status !== 'APPROVED'  && (
                                      <button onClick={() => handleOrder(provider?.id)} className='btn approveButton me-3 align-self-center' type='button'>Approve</button>
                                    )
                                  }
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td style={{ textAlign: "center" }} colSpan={9}>
                            No data found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                </div>
                <ResponsivePagination
                  current={currentPage}
                  total={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
              <div className="tab-pane fade" id="pills-pending" role="tabpanel" aria-labelledby="pills-pending-tab" tabIndex="0">
              </div>
              <div className="tab-pane fade" id="pills-approved" role="tabpanel" aria-labelledby="pills-approved-tab" tabIndex="0">
              </div>
              <div className="tab-pane fade" id="pills-expired" role="tabpanel" aria-labelledby="pills-expired-tab" tabIndex="0">
              </div>
              <div className="tab-pane fade" id="pills-confirmed" role="tabpanel" aria-labelledby="pills-confirmed-tab" tabIndex="0">
              </div>
              <div className="tab-pane fade" id="pills-unconfirmed" role="tabpanel" aria-labelledby="pills-unconfirmed-tab" tabIndex="0">
              </div>
              <div className="tab-pane fade" id="pills-declined" role="tabpanel" aria-labelledby="pills-declined-tab" tabIndex="0">
                <span className='text-danger font14'>No Data Found !!</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Confirm Modal */}


      <div className="modal fade" id="confirmedModal" tabIndex="-1" aria-labelledby="confirmedModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body p-1">
              {
                OrdersIds && (
                  <ConfirmPayment OrdersIds={OrdersIds} onData={handleData} />
                )
              }
            </div>
          </div>
        </div>
      </div>



    </Container>
  )
}

export default PayInOperations