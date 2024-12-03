import React, { useState, useEffect } from "react";
import HashLoader from "../../Dashboard/Loader";
import { clientDetails, graphData } from "../../Utils/Apis";




const ProductPage = () => {

  const [clientDetail, setclientDetail] = useState([])

  const Details = async () => {
    try {
      const response = await clientDetails();
      console.log(response, "Details");
      if (response?.status === 200) {
        setclientDetail(response?.data);
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.error || 'Error creating payment');
    }
  };

  const [graphDat, setGraphData] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [year, setYear] = useState(2024);
  const [type, setType] = useState('');
  const [Statics, setStatics] = useState('');
  const [adminDetails, setAdminDetails] = useState([]);

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
    Details();
  }, [year, type]);

  return (

    <>
      {
        showLoader && (
          <HashLoader />
        )
      }
      <div className="container mt-4">
        {/* Header */}
        <div className="mb-3">
          <h4>Welcome to Products</h4>
        </div>

        {/* Top Statistics */}
        <div className="row g-3">
          <div className="col-md-6">
            <div className="card p-3 shadow-sm">
              <h5>
                Total Revenue: <span className="text-primary">INR {Statics?.wallet}</span>
              </h5>
              <p>Total PayIn: INR {Statics?.total_payin_amount}</p>
              <p>Total PayOut: INR {Statics?.total_payout_amount}</p>
              <p>Total Profit: INR 21,00,000</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3 shadow-sm">
              <h6>Pending Operations</h6>
              <p>Pending PayIn: 20</p>
              <p>Pending PayOut: 300</p>
              <button className="btn btn-primary btn-sm">View Report</button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            style={{ borderRadius: "8px" }}
          />
          <button className="btn btn-outline-secondary ms-2">
            <i className="bi bi-bell"></i>
          </button>
        </div>

        {/* Project Cards */}
        <div className="row g-3 mt-4">
          {clientDetail.map((project, index) => (
            <div className="col-md-4" key={index}>
              <div className="card p-3 shadow-sm">
                <h6 className="card-title">{project.name}</h6>
                <p>Total PayIn: {project?.total_payin}</p>
                <p>Total PayOut: {project?.total_payout}</p>
                <p className="fw-bold">Total Admin: {project.admin_count}</p>
                <p className="fw-bold">Total Sub Admin: {project.sub_admin_count}</p>
                <p className="fw-bold">Total Peer: {project.peer_count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <button className="page-link">Previous</button>
            </li>
            <li className="page-item">
              <button className="page-link">1</button>
            </li>
            <li className="page-item">
              <button className="page-link">2</button>
            </li>
            <li className="page-item">
              <button className="page-link">3</button>
            </li>
            <li className="page-item">
              <button className="page-link">Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ProductPage;

