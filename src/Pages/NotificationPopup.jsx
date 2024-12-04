import React from 'react';
import { Link } from 'react-router-dom';

const NotificationPopup = ({ notifications, onClose }) => {
    return (
        <div className="position-relative">
            <div
                className="position-absolute top-100 end-0 mt-2 p-3 bg-white shadow-lg rounded"
                style={{ width: '420px', zIndex: 1050 }}
            >
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">All Notifications</h5>
                    <button className="btn-close" onClick={onClose}></button>
                </div>
                <hr />
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <Link
                           to='/payInOperations'
                            key={index}
                            className="notification-item p-2 mb-2 bg-light rounded"
                        >
                            <strong>{notification.title || 'Notification'}</strong>
                            <p>{notification.message || 'No details available.'}</p>
                        </Link>
                    ))
                ) : (
                    <p className="text-center text-muted">No new notifications.</p>
                )}
            </div>
        </div>
    );
};

export default NotificationPopup;
