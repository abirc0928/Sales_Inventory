import React from 'react'
import axios from 'axios'
import myaxios from '../utils/myaxios'
import { useNavigate } from 'react-router'
const RegisterPage = () => {

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault() // page reload houar sthe sthe submit hobe  na

        const FromData = new FormData(e.target)
        const data = Object.fromEntries(FromData)

        // console.log(data)
        if (!data.firstName || !data.lastName || !data.email || !data.mobile || !data.password || !data.confrimPassword) {
            alert("All fields are required!");
            return;
        }

        if (data.password !== data.confrimPassword) {
            alert("Passwords do not match!");
            return;
        }

        myaxios.post('/user-registration', data)
            .then(res => {
                if (res.data.status === 'success') {
                    alert("Registration successful!");
                    navigate('/login');
                } else if (res.data.status === 'failed') {
                    if (res.data.message.includes("Duplicate entry")) {
                        alert("This email already exists!");
                    } else {
                        alert("Registration failed. Please try again.");
                    }
                }
            })
            .catch(err => {
                console.error(err);
                alert("An error occurred. Please check your input or try again later.");
            });
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-10 center-screen">
                        <div className="card animated fadeIn w-100 p-3">
                            <div className="card-body">
                                <h4>Sign Up</h4>
                                <hr />
                                <div className="container-fluid m-0 p-0">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row m-0 p-0">
                                            <div className="col-md-4 p-2">
                                                <label>Email Address</label>
                                                <input id="email" placeholder="User Email" className="form-control" type="email" name="email" />
                                            </div>
                                            <div className="col-md-4 p-2">
                                                <label>First Name</label>
                                                <input id="firstName" placeholder="First Name" className="form-control" type="text" name="firstName" />
                                            </div>
                                            <div className="col-md-4 p-2">
                                                <label>Last Name</label>
                                                <input id="lastName" placeholder="Last Name" className="form-control" type="text" name="lastName" />
                                            </div>
                                            <div className="col-md-4 p-2">
                                                <label>Mobile Number</label>
                                                <input id="mobile" placeholder="Mobile" className="form-control" type="mobile" name="mobile" />
                                            </div>
                                            <div className="col-md-4 p-2">
                                                <label>Password</label>
                                                <input id="password" placeholder="User Password" className="form-control" type="password" name="password" />
                                            </div>
                                            <div className="col-md-4 p-2">
                                                <label>Confrim Password</label>
                                                <input id="password" placeholder="Confrim Password" className="form-control" type="password" name="confrimPassword" />
                                            </div>
                                        </div>
                                        <div className="row m-0 p-0">
                                            <div className="col-md-4 p-2">
                                                <button
                                                    type='submit'
                                                    className="btn mt-3 w-100 bg-gradient-primary"
                                                >
                                                    Complete
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RegisterPage