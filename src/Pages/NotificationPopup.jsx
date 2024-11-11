import React from 'react';

const NotificationPopup = () => {
    
    return (
        <div className="position-relative">

            <div className="position-absolute top-100 end-0 mt-2 p-3 bg-white shadow-lg rounded" style={{ width: '300px' }}>
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">All Notifications</h5>
                    <button className="btn-close"></button>
                </div>
                <hr />
                <div className="notification-item p-2 mb-2 bg-light rounded">
                    <strong>Payment Approval Required!</strong>
                    <p>INR 5000 payment is pending approval. Please review and approve.</p>
                </div>
                <div className="notification-item p-2 mb-2 bg-light rounded">
                    <strong>Payment Declined!</strong>
                    <p>INR 1000 payment is declined by agent RB Payout.</p>
                </div>
                <div className="notification-item p-2 bg-light rounded">
                    <strong>Payment Approval Required!</strong>
                    <p>INR 10,000 payment is pending approval. Please review and approve.</p>
                </div>
            </div>
        </div>
    );
};

export default NotificationPopup;
