import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AreaChart from '../../Charts/AreaChart';
import { useMainContext } from '../../Dashboard/DashboardLayout';
import HashLoader from '../../Dashboard/Loader';
import { getDashStatics, graphData } from '../../Utils/Apis';
import Header from '../../Layouts/Header';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, LineElement, ArcElement, PointElement, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, LineElement, ArcElement, PointElement, Filler);


const Container = styled.div`
  .greyText{
    /* color: var(--sidebarGreyText); */
    color: var(--sidebarGreyText);
  }

  .bg-grey{
    background-color: #2d2d2d !important;
  }

  .cardsGreyText{
    color: var(--cardsGreyText);
  }

  .cardBgBlue{
    /* background-color: var(--cardsBgBlueColor); */
    background-color: var(--cardsBgBlueColor);
  }

  .cardBlueText{
    /* color: var(--cardsBlueText) */
    color: var(--cardsBlueText);
  }
  
  .form-control::placeholder{
    color: var(--searchGreyText);
  }

  .borderNone{
    border: none !important;
  }

  .form-select{
    box-shadow: none !important;
    border: none !important;
  }

  .pointer{
    cursor: pointer;
  }

  .bgCarddarkMode{
    background-color: #1e1e1e;
  }

  .toggleBars{
    display: none !important;
  }

  @media screen and (max-width: 1000px) {

    .toggleBars{
      display: block !important;
    }
  }

`;

const AdminDashboard = ({ lightMode }) => {

  const role = JSON.parse(localStorage.getItem("role"));

  const { toggleSidebar } = useMainContext();
  const [year, setYear] = useState(2024);
  const [type, setType] = useState('payin')

  const [Statics, setStatics] = useState('');
  const [adminDetails, setAdminDetails] = useState([])

  useEffect(() => {
    fetchData()
  }, [])




  const handleType = (value) => {
    setType(value)
  }

  const handleyear = (value) => {
    setYear(value)
  }


  const [graphDat, setGraphData] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const fetchData = async () => {
    try {
      setShowLoader(true);
      const orderResponse = await graphData(year, type);
      console.log(orderResponse, "OrderGraphData")
      if (orderResponse?.status === 200)
        setShowLoader(false);
      setGraphData(orderResponse?.data?.graph_data);
      setStatics(orderResponse?.data);
      setAdminDetails(orderResponse?.data?.Hierarchy)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [year, type]);

  const labels = Object.keys(graphDat);
  const payinData = labels.map(month => graphDat[month].payin.Created);
  const payoutData = labels.map(month => graphDat[month].payout.Submitted);



  const data = {
    labels,
    datasets: [
      {
        label: 'Payin Created',
        data: payinData,
        fill: true,
        backgroundColor: 'rgba(34, 197, 93, 0.1)',
        borderColor: '#22C55D',
        pointRadius: 0,
        tension: 0.4
      },
      {
        label: 'Payout Submitted',
        data: payoutData,
        fill: true,
        backgroundColor: 'rgba(34, 197, 193, 0.1)',
        borderColor: '#22C5DD',
        pointRadius: 0,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: function (tooltipItems) {
            const item = tooltipItems[0];
            return data.labels[item.dataIndex];
          },
          label: function (tooltipItem) {
            return `Details: ${tooltipItem.raw}`;
          }
        },
        backgroundColor: '#ffffff',
        titleColor: '#000000',
        bodyColor: '#000000',
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: lightMode ? 'var(--searchGreyText)' : '#999999',
        },
        border: {
          color: lightMode ? '#008479' : '#999999'
        }
      },
      y: {
        grid: {
          display: false
        },
        beginAtZero: true,
        border: {
          color: lightMode ? '#008479' : '#999999'
        },
        ticks: {
          color: lightMode ? 'var(--searchGreyText)' : '#999999',
          callback: function (value) {
            return value + 'k';
          }
        }
      }
    }
  };





  return (
    <Container lightMode={lightMode} >
      {
        showLoader && (
          <HashLoader />
        )
      }
      <div className="container-fluid p-lg-5 p-3">
        <Icon className='toggleBars mb-3' icon="fa6-solid:bars" width="1.5em" height="1.5em" style={{ color: '#000' }} onClick={toggleSidebar} />
        <Header />
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 p-3">
                <div className={`row p-3 borderRadius8 bg-white`}>
                  <div className='d-flex justify-content-between pt-2 pb-3'>
                    <div>
                      <span className='flex-grow-1'>
                        <img className='p-2 borderRadius12 cardBgBlue' src="./images/walletSettings.svg" alt="" />
                      </span>
                    </div>
                    <div>
                      <div>
                        <p className='dashboardfont'>PayIn Amount</p>
                      </div>
                      <div className='mt-2'>
                        <p className='dashboardprice'>{Statics?.total_payin_amount}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className='dashboardshort'>Available PayIn Limit : {Statics?.payin_limit}</p>
                  </div>

                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 p-3">
                <div className={`row p-3 borderRadius8 bg-white`}>
                  <div className='d-flex justify-content-between pt-2 pb-3'>
                    <div>
                      <span className='flex-grow-1'>
                        <img className='p-2 borderRadius12 cardBgBlue' src="./images/walletSettings.svg" alt="" />
                      </span>
                    </div>
                    <div>
                      <div>
                        <p className='dashboardfont'>PayOut Amount</p>
                      </div>
                      <div className='mt-2'>
                        <p className='dashboardprice'>{Statics?.total_payout_amount}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className='dashboardshort'>Available PayOut Limit : {Statics?.payout_limit}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-8 col-sm-6 p-3">
                <div className={`row p-3 borderRadius8 bg-white`}>
                  <div className='d-flex justify-content-between pt-2'>
                    <p className='dashboardfont'>Total PayIn</p>
                    <p className='dashboardprice'>{Statics?.total_payin_count}</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-8 col-sm-6 p-3">
                <div className={`row p-3 borderRadius8 bg-white`}>
                  <div className='d-flex justify-content-between pt-2'>
                    <p className='dashboardfont'>Total PayOut</p>
                    <p className='dashboardprice'>{Statics?.total_payout_count}</p>
                  </div>
                </div>
              </div>
            </div>
            {role === "peer" &&
              (
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-3">
                    <div className={`p-3 borderRadius8 bg-white`}>
                      <div className='mb-3'>
                        <h6 className='dashboardfont'>Total Bank Acoounts</h6>
                      </div>
                      <div className={`borderRadius8 mt-2`} style={{ backgroundColor: '#4F7BD11F' }}>
                        <div className={`p-2 d-flex justify-content-between`} style={{ backgroundColor: '#F5F8FC', borderRadius: "10px 10px 0px 0px" }}>
                          <div>
                            <h6 className='dashboardfont'> Bank Account 1</h6>
                          </div>
                          <div>
                            <Icon
                              className='me-2'
                              icon="icomoon-free:radio-unchecked"
                              width="1em"
                              height="1em"
                              style={{ color: '#22C55D' }}
                            />
                            <span className='dashboardfont'>
                              Active
                            </span>
                          </div>
                        </div>
                        <div className='mt-3 p-2'>
                          <div className='d-flex justify-content-between'>
                            <h6 className='font14'>Account Holder Number:</h6>
                            <h6 className='font14'>Elena Khan </h6>
                          </div>
                          <div className='d-flex justify-content-between'>
                            <h6 className='font14'>Account Holder Number:</h6>
                            <h6 className='font14'>Elena Khan </h6>
                          </div>
                          <div className='d-flex justify-content-between'>
                            <h6 className='font14'>Account Holder Number:</h6>
                            <h6 className='font14'>Elena Khan </h6>
                          </div>
                        </div>
                      </div>
                      <div className={`borderRadius8 mt-2`} style={{ backgroundColor: '#4F7BD11F' }}>
                        <div className={`p-2 d-flex justify-content-between`} style={{ backgroundColor: '#F5F8FC', borderRadius: "10px 10px 0px 0px" }}>
                          <div>
                            <h6 className='dashboardfont'> Bank Account 1</h6>
                          </div>
                          <div>
                            <Icon
                              className='me-2'
                              icon="icomoon-free:radio-unchecked"
                              width="1em"
                              height="1em"
                              style={{ color: '#22C55D' }}
                            />
                            <span className='dashboardfont'>
                              Active
                            </span>
                          </div>
                        </div>
                        <div className='mt-3 p-2'>
                          <div className='d-flex justify-content-between'>
                            <h6 className='font14'>Account Holder Number:</h6>
                            <h6 className='font14'>Elena Khan </h6>
                          </div>
                          <div className='d-flex justify-content-between'>
                            <h6 className='font14'>Account Holder Number:</h6>
                            <h6 className='font14'>Elena Khan </h6>
                          </div>
                          <div className='d-flex justify-content-between'>
                            <h6 className='font14'>Account Holder Number:</h6>
                            <h6 className='font14'>Elena Khan </h6>
                          </div>
                        </div>
                      </div>
                      <div className={`borderRadius8 mt-2`} style={{ backgroundColor: '#4F7BD11F' }}>
                        <div className={`p-2 d-flex justify-content-between`} style={{ backgroundColor: '#F5F8FC', borderRadius: "10px 10px 0px 0px" }}>
                          <div>
                            <h6 className='dashboardfont'> Bank Account 1</h6>
                          </div>
                          <div>
                            <Icon
                              className='me-2'
                              icon="icomoon-free:radio-unchecked"
                              width="1em"
                              height="1em"
                              style={{ color: '#22C55D' }}
                            />
                            <span className='dashboardfont'>
                              Active
                            </span>
                          </div>
                        </div>
                        <div className='mt-3 p-2'>
                          <div className='d-flex justify-content-between'>
                            <h6 className='font14'>Account Holder Number:</h6>
                            <h6 className='font14'>Elena Khan </h6>
                          </div>
                          <div className='d-flex justify-content-between'>
                            <h6 className='font14'>Account Holder Number:</h6>
                            <h6 className='font14'>Elena Khan </h6>
                          </div>
                          <div className='d-flex justify-content-between'>
                            <h6 className='font14'>Account Holder Number:</h6>
                            <h6 className='font14'>Elena Khan </h6>
                          </div>
                        </div>
                      </div>
                      <div className='d-flex justify-content-center mt-3 text text-center'>
                        <button type="button" class="btn btn-primary btn-lg dashboardbutton" style={{ backgroundColor: "#2C6DB5" }}>Add Bank Account</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            {role === "super admin" &&
              (
                <>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-3">
                      <div className={`p-3 borderRadius8 bg-white`}>
                        <div className="row">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-3">
                            <div>
                              <h6 className='dashboardfont'>Total Admin </h6>
                            </div>
                            <div className={`row p-3 borderRadius8 gap-3`} style={{ background: "#2C6DB50F " }}>
                              <span className='btn borderRadius10 bg-white d-flex'>
                                <select className='dashboardfont'
                                  required
                                  class="form-select font14 p-0 me-3"
                                  aria-label="Default select example">
                                  <option value='' disabled>-- Choose --</option>
                                  <option selected value="HDFC">Admin 1</option>
                                  <option value="UNION">UNION Bank LTD.</option>
                                  <option value="ICICI">ICICI Bank LTD.</option>
                                  <option value="SBI">SBI Bank LTD.</option>
                                </select>
                              </span>
                              <span className='btn borderRadius10 bg-white d-flex'>
                                <select className='dashboardfont'
                                  required
                                  class="form-select font14 p-0 me-3"
                                  aria-label="Default select example">
                                  <option value='' disabled>-- Choose --</option>
                                  <option selected value="HDFC">Admin 2</option>
                                  <option value="UNION">UNION Bank LTD.</option>
                                  <option value="ICICI">ICICI Bank LTD.</option>
                                  <option value="SBI">SBI Bank LTD.</option>
                                </select>
                              </span>
                            </div>
                            <div className='d-flex justify-content-center mt-3 text text-center'>
                              <button type="button" class="btn btn-primary btn-lg dashboardbutton" style={{ backgroundColor: "#2C6DB5" }}>Create User</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-3">
                      <div className={`p-3 borderRadius8 bg-white`}>
                        <div className="row">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-3">
                            <div>
                              <h6 className='dashboardfont'>Stats of Admins </h6>
                            </div>
                            <div className='d-flex gap-5'>
                              <div className={`row p-3 borderRadius8 gap-3`} style={{ background: "#2C6DB50F " }}>
                                <div>
                                  <h2 className='dashboardfont'>Admin 1</h2>
                                </div>
                                <div>
                                  <div>
                                    <h6 className='dashboardshort'>Total PayIn</h6>
                                  </div>
                                  <div className='borderRadius8 bg-white text text-center p-2'>
                                    <p className='dashboardprice'>{Statics?.payin_stats?.total_payin_operations}</p>
                                  </div>
                                </div>
                                <div>
                                  <div>
                                    <h6 className='dashboardshort'>Total PayOut</h6>
                                  </div>
                                  <div className='borderRadius8 bg-white text text-center p-2'>
                                    <p className='dashboardprice'>{Statics?.payin_stats?.total_payin_operations}</p>
                                  </div>
                                </div>
                                <div className='d-flex justify-content-center text text-center'>
                                  <button type="button" class="btn btn-primary btn-lg dashboardbutton" style={{ backgroundColor: "#2C6DB5" }}>See Details</button>
                                </div>
                              </div>
                              <div className={`row p-3 borderRadius8 gap-3`} style={{ background: "#2C6DB50F " }}>
                                <div>
                                  <h2 className='dashboardfont'>Admin 2</h2>
                                </div>
                                <div>
                                  <div>
                                    <h6 className='dashboardshort'>Total PayIn</h6>
                                  </div>
                                  <div className='borderRadius8 bg-white text text-center p-2'>
                                    <p className='dashboardprice'>{Statics?.payin_stats?.total_payin_operations}</p>
                                  </div>
                                </div>
                                <div>
                                  <div>
                                    <h6 className='dashboardshort'>Total PayOut</h6>
                                  </div>
                                  <div className='borderRadius8 bg-white text text-center p-2'>
                                    <p className='dashboardprice'>{Statics?.payin_stats?.total_payin_operations}</p>
                                  </div>
                                </div>
                                <div className='d-flex justify-content-center text text-center'>
                                  <button type="button" class="btn btn-primary btn-lg dashboardbutton" style={{ backgroundColor: "#2C6DB5" }}>See Details</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            }
            {role === "sub-admin" &&
              (
                <>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-3">
                      <div className={`p-3 borderRadius8 bg-white`}>
                        <div className="row">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-3">
                            <div>
                              <h6 className='dashboardfont'>Total Peer</h6>
                            </div>
                            <div className={`row p-3 borderRadius8 gap-3`} style={{ background: "#2C6DB50F " }}>
                              <div className={`p-2 borderRadius8 `} style={{ background: "#2C6DB50F " }}>
                                <div className='' >
                                  <p className='dashboardfont'>Peer 1</p>
                                </div>
                              </div>
                              <div className={`p-2 borderRadius8 `} style={{ background: "#2C6DB50F " }}>
                                <div className='' >
                                  <p className='dashboardfont'>Peer 1</p>
                                </div>
                              </div>
                            </div>
                            <div className='d-flex justify-content-center mt-3 text text-center'>
                              <button type="button" class="btn btn-primary btn-lg dashboardbutton" style={{ backgroundColor: "#2C6DB5" }}>Create User</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            }
            {role === "admin" &&
              (
                <>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-3">
                      <div className={`p-3 borderRadius8 bg-white`}>
                        <div className="row">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-3">
                            <div>
                              <h6 className='dashboardfont'>Total Sub Admin </h6>
                            </div>
                            
                            {adminDetails.map((subAdmin) => (
                              <div key={subAdmin.id} className="col-12 mb-3">
                                <div className="dropdown">
                                  <div
                                    className={`row p-3 borderRadius8 gap-3`}
                                    style={{ background: "#2C6DB50F" }}
                                    type="button"
                                    id={`dropdown-${subAdmin.id}`}
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    {subAdmin.username}
                                  </div>
                                  <ul
                                    className="dropdown-menu"
                                    aria-labelledby={`dropdown-${subAdmin.id}`}
                                  >
                                    {subAdmin.agents.map((agent) => (
                                      <li key={agent.id}>
                                        <a className="dropdown-item" href="#">
                                          {agent.username}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ))}
                            <div className='d-flex justify-content-center mt-3 text text-center'>
                              <button type="button" class="btn btn-primary btn-lg dashboardbutton" style={{ backgroundColor: "#2C6DB5" }}>Create User</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            }
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-3">
                <div className={`p-3 borderRadius8 bg-white`}>
                  <div className='mb-3'>
                    <div>
                      <h6 className='dashboardfont'>Commission Percentage</h6>
                    </div>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-8 col-sm-6 p-3">
                        <div className={`row p-3 borderRadius8 `} style={{ backgroundColor: "#F5F8FC" }}>
                          <div className='d-flex justify-content-between pt-2'>
                            <p className='dashboardfont'>PayIn Commission</p>
                            <p className='dashboardprice'>{Statics?.pay_incommission}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-8 col-sm-6 p-3">
                        <div className={`row p-3 borderRadius8`} style={{ backgroundColor: "#F5F8FC" }}>
                          <div className='d-flex justify-content-between pt-2'>
                            <p className='dashboardfont'>Payout Commission</p>
                            <p className='dashboardprice'>{Statics?.pay_outcommission}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-3">
                        <div className={`row p-3 borderRadius8 `} style={{ backgroundColor: "#F5F8FC" }}>
                          <div className='d-flex justify-content-between pt-2'>
                            <p className='dashboardfont'>Wallet Balance</p>
                            <p className='dashboardprice'>{Statics?.wallet}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='d-flex justify-content-center mt-3 text text-center'>
                      <button type="button" class="btn btn-primary btn-lg dashboardbutton" style={{ backgroundColor: "#2C6DB5" }}>Transfer to PayIn Wallet</button>
                    </div>
                    <div className="d-flex pb-3 mt-3">
                      <div className="flex-grow-1">
                        <p className='dashboardfont'>Analytics</p>
                      </div>
                      <div className="d-flex align-self-center">
                        {/* <Icon icon="lets-icons:date-fill" width="1.5em" height="1.5em"  style={{color: '#2C6DB5'}} /> */}
                        <select className={`form-select font12 borderRadius8 cardBlueText me-3 pointer bg-white`} onChange={(e) => handleType(e.target.value)} aria-label="Default select example">
                          <option disbaled="true">--Choose--</option>
                          <option defaultValue value="payin">PayIn</option>
                          <option value="payout">PayOut</option>
                        </select>
                        <span className='pointer'>
                          <Icon icon="bi:three-dots" width="1.5em" height="1.5em" style={{ color: '#2C6DB5' }} />
                        </span>
                      </div>
                    </div>
                    <div className={`${lightMode ? 'bg-white' : 'bgGrey'} p-4 borderRadius8`} style={{ backgroundColor: "#F5F8FC" }}>
                      <div className="chart-container" style={{ height: '80vh' }}>
                        <Line data={data} options={options}></Line>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Container>
  )
}

export default AdminDashboard