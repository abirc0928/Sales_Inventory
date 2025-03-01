import React from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import myaxios from '../utils/myaxios'
const LoginPage = () => {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault() // page reload houar sthe sthe submit hobe  na

        const FromData = new FormData(e.target)
        const data = Object.fromEntries(FromData)
        console.log(data.email, data.password)

        myaxios.post('/user-login', data)
            .then(res => {
                if (res.data.status === 'success') {
                    localStorage.setItem("token", res.data.token)
                    navigate('/dashboard/index')
                } else {
                    alert(res.data.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 animated fadeIn col-lg-6 center-screen">
                        <div className="card w-90 p-4">
                            <div className="card-body">
                                <h4>SIGN IN</h4>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <input id="email" placeholder="User Email" className="form-control" type="email" name="email" />
                                    <br />
                                    <input id="password" placeholder="User Password" className="form-control" type="password" name='password' />
                                    <br />
                                    <button type='submit' className="btn w-100 bg-gradient-primary">Next</button>
                                    <hr />
                                    <div className="float-end mt-3">
                                        <span>
                                            <Link className="text-center ms-3 h6" to="/register">Sign Up</Link>
                                            <span className="ms-1">|</span>
                                            <Link className="text-center ms-3 h6" to="/password-reset">Forget Password</Link>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LoginPage