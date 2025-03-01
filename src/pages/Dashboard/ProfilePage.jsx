import React, { useState, useEffect } from 'react'
import myaxios from '../../utils/myaxios';
import { successToast, errorToast } from '../../utils/toast';

const ProfilePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        myaxios.get("/user-profile")
            .then((response) => {

                if (response.data.status === "success") {
                    setUser(response.data.data);
                }
                else {
                    console.log(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [id]: value }));
    };

    const handleSave = () => {
        myaxios.post("/user-update", user)
            .then((response) => {
                if (response.data.status === "success") {
                    successToast("Profile updated successfully");

                }
                else {
                    errorToast("Failed to update profile");

                }
            })
            .catch((error) => {
                console.error(error);
            });
    };


    return (
        <div className="container">
            {Object.keys(user).length === 0 ? (
                <div id="loader" className="LoadingOverlay">
                    <div className="Line-Progress">
                        <div className="indeterminate"></div>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        <div className="card animated fadeIn w-100 p-3">
                            <div className="card-body">
                                <h4>User Profile</h4>
                                <hr />
                                <div className="container-fluid m-0 p-0">
                                    <div className="row m-0 p-0">
                                        <div className="col-md-4 p-2">
                                            <label>Email Address</label>
                                            <input
                                                disabled
                                                readOnly
                                                id="email"
                                                placeholder="User Email"
                                                className="form-control"
                                                type="email"
                                                value={user.email}
                                            />
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>First Name</label>
                                            <input
                                                id="firstName"
                                                placeholder="First Name"
                                                className="form-control"
                                                type="text"
                                                value={user.firstName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>Last Name</label>
                                            <input
                                                id="lastName"
                                                placeholder="Last Name"
                                                className="form-control"
                                                type="text"
                                                value={user.lastName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>Mobile Number</label>
                                            <input
                                                id="mobile"
                                                placeholder="Mobile"
                                                className="form-control"
                                                type="mobile"
                                                value={user.mobile}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>Password</label>
                                            <input
                                                id="password"
                                                placeholder="User Password"
                                                className="form-control"
                                                type="password"
                                                value={user.password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row m-0 p-0">
                                        <div className="col-md-4 p-2">
                                            <button
                                                onClick={handleSave}
                                                className="btn mt-3 w-100 bg-gradient-primary"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}

export default ProfilePage