import React from 'react'
import axios from 'axios'
import myaxios from '../utils/myaxios'
import { useNavigate } from 'react-router'

const PasswordResetOtp = () => {
    const navigate = useNavigate()
    const handelSubmit = (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)
        const email = localStorage.getItem("email")
        data.email = email
        console.log(data)
        myaxios.post('/verify-otp', data)
            .then(res => {
                if (res.data.status === 'success') {
                    localStorage.setItem("token", res.data.token)
                    navigate('/new-password-set')
                } else {
                    alert(res.data.message)
                }

            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6 center-screen">
                    <div className="card animated fadeIn w-90 p-4">
                        <form onSubmit={handelSubmit}>
                            <div className="card-body">
                                <h4>Submit OTP</h4>
                                <br />
                                <label htmlFor="otp">Your OTP</label>
                                <input
                                    id=""
                                    placeholder="OTP"
                                    className="form-control"
                                    type="text"
                                    name='otp'
                                />
                                <br />
                                <button
                                    type='submit'
                                    className="btn w-100 float-end bg-gradient-primary"
                                >
                                    Next
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PasswordResetOtp