import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useMainContext } from '../../Dashboard/DashboardLayout';
import { getAgents, updateUserbyId } from '../../Utils/Apis';
import { toast } from 'react-hot-toast';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import HashLoader from '../../Dashboard/Loader';
import { useDispatch, useSelector } from 'react-redux';
import AccountConfirm from '../../Modals/AccountConfirm'

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

const Users = () => {

  const dispatch = useDispatch();
  const { users, status, error } = useSelector(state => state.users);
  const [profileDetail, setprofileDetail] = useState(users[0]);

  const navigate = useNavigate();
  const { toggleSidebar } = useMainContext();
  const [showLoader, setShowLoader] = useState(false);

  const [Employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [role, setRole] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const [statu, setStatus] = useState('');
  const [Ids, setIds] = useState('');
  const [UpdateStatus, setUpdateStatus] = useState('');
  const [updateData, setupdateData] = useState(false);
  console.log(updateData, "update data")


  // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  // tooltipTriggerList.forEach((tooltipTriggerEl) => {
  //     new window.bootstrap.Tooltip(tooltipTriggerEl);
  // });

  useEffect(() => {
    getEmployess();
  }, [currentPage, searchTerm, role, statu, updateData]);

  // Handle input change
  const handleInputChange = (value) => {
    setSearchTerm(value);
  };

  const changeRole = (value) => {
    setRole(value)
  }

  const getEmployess = async (e) => {
    setShowLoader(true);
    const response = await getAgents(currentPage, searchTerm, role, statu);
    console.log(response, "Users")
    try {
      if (response?.status === 200) {
        setShowLoader(false);
        setEmployees(response?.data?.results);
        setTotalPages(Math.ceil(response.data.count / itemsPerPage));
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


  const timeAgo = (timestamp) => {
    const currentTime = new Date();
    const lastActiveTime = new Date(timestamp);

    const diff = currentTime - lastActiveTime;
    const diffInMinutes = Math.floor(diff / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInMinutes < 60) {
      return `Last active ${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      const minutes = diffInMinutes % 60;
      return `Last active ${diffInHours}h ${minutes}m ago`;
    } else {
      const days = Math.floor(diffInHours / 24);
      const hours = diffInHours % 24;
      return `Last active ${days}d ${hours}h ago`;
    }
  };

  const getStatus = (isCheckedIn, last_check_in) => {
    if (isCheckedIn) {
      return {
        color: '#22C55D',
        text: 'Active'
      };
    } else {
      return {
        color: '#FC2222',
        text: timeAgo(last_check_in)
      };
    }
  };





  const handleNavigate = (id, update) => {
    if (update) {
      setIds(id);
      setUpdateStatus(update)
      new bootstrap.Modal(document.getElementById('confirmedModal')).show();
      setupdateData(false);
    } else {
      navigate(`/kBProfilePage/${id}`);
    }
  };


  const userUpdate = async (id, update) => {
    const formData = new FormData();
    formData.append("is_checked_in", update);
    try {
      setShowLoader(true);
      const response = await updateUserbyId(id, formData);
      console.log(response, "user update successfully")
      if (response.status === 200) {
        setShowLoader(false);
        toast.success("user update successfully");
        getEmployess();
        setchangeState(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.username[0]);
    }
  };


  const handleStatus = (value) => {
    setStatus(value);
  };

  const handleData = (data) => {
    setupdateData(data);  // Update the main state
    setIds(null);  // Reset Ids
    setUpdateStatus('');  // Reset UpdateStatus
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
              <ul class="nav nav-pills gap-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button onClick={() => handleStatus("")} className={`nav-link ${statu === "" ? "active" : ""} font14`} >All</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button onClick={() => handleStatus("active")} className={`nav-link ${statu === "active" ? "active" : ""} font14`} >Active</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button onClick={() => handleStatus("inactive")} className={`nav-link ${statu === "inactive" ? "active" : ""} font14`} >Inactive</button>
                </li>
                <li class="nav-item" role="presentation">
                  {/* <button onClick={() => handleStatus("block")} className={`nav-link ${status === "block" ? "active" : "Data not Found"} font14`} >Blocked</button> */}
                </li>
              </ul>
            </div>
            <Link className='btn borderRadius10 addNewUserBtn me-3 align-self-center' to='/createUser'>+ Add New Account</Link>
            <span className='btn borderRadius10 bg-white d-flex'>
              <select onChange={(e) => changeRole(e.target.value)} class="form-select p-0 font14 me-3" aria-label="Default select example">
                <option value=''>-- Choose --</option>
                <option value="superadmin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="creator">Sub Admin</option>
                <option value="agent">Peer</option>
              </select>
              <span className='borderRadius8 addNewUserBtn p-1'>
                <Icon icon="icon-park-outline:down" width="1.5em" height="1.5em" style={{ color: '#2C6DB5' }} />
              </span>
            </span>
          </div>
        </div>
        <div className="row overflow-scroll">
          <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab" tabindex="0">
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <td className='font16 lineHeight21'>Name</td>
                    <td className='font16 lineHeight21'>Role</td>
                    <td className='font16 lineHeight21'>User UPI ID</td>
                    <td className='font16 lineHeight21'>Status</td>
                    <td className='font16 lineHeight21'>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {Employees?.length !== 0 ? (
                    Employees?.map((employ) => {
                      const role = getRole(employ?.personal_details);
                      return (
                        <tr onClick={(e) => handleNavigate(employ?.personal_details?.id)}>
                          <td className='font14 lineHeight24 align-middle'>{employ?.personal_details?.username}</td>
                          <td className='font14 lineHeight24 align-middle'>{role}</td>
                          <td className='font14 lineHeight24 align-middle'>{employ?.payment_details?.upi_id}</td>
                          <td className="font14 lineHeight24 align-middle">
                            <Icon
                              className="me-2"
                              icon="pepicons-pencil:circle-filled"
                              width="1.4em"
                              height="1.4em"
                              style={{
                                color: employ?.payment_details?.is_blocked ? '#FC2222' : '#22C55D',
                              }}
                            />
                            <span>{employ?.payment_details?.is_blocked ? 'Block' : 'UnBlock'}</span>
                          </td>
                          <td className="font14 lineHeight24 align-middle d-flex">
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                const isBlocked = employ?.payment_details?.is_blocked;
                                handleNavigate(employ?.personal_details?.id, !isBlocked);
                              }}
                              type="button"
                              className="flex-grow-1 cursor-pointer"
                            >
                              <Icon
                                className="me-2"
                                icon="icomoon-free:radio-unchecked"
                                width="1em"
                                height="1em"
                                style={{
                                  color: employ?.payment_details?.is_blocked ? '#22C55D' : '#FC2222',
                                }}
                              />
                              <span
                                className={
                                  employ?.payment_details?.is_blocked ? 'textActive' : 'textInactive'
                                }
                              >
                                Mark {employ?.payment_details?.is_blocked ? 'UnBlock' : 'Block'}
                              </span>
                            </div>
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
              {
                Ids && (
                  <AccountConfirm Ids={Ids} UpdateStatus={UpdateStatus} onData={handleData} />
                )
              }
            </div>
          </div>
        </div>
      </div>


    </Container>
  )
}

export default Users