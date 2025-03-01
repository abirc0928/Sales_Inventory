import React from 'react'
import axios from 'axios'
import myaxios from '../utils/myaxios'
import { useNavigate } from 'react-router'

const PasswordReset = () => {
    const navigate = useNavigate()
    const handelSubmit = (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)
        console.log(data)
        myaxios.post('/send-otp', data)
            .then(res => {
                console.log(res)
                localStorage.setItem("email", data.email)
                navigate('/password-reset-otp')
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card animated fadeIn w-90 p-4">
                            <form onSubmit={handelSubmit}>
                                <div className="card-body">
                                    <h4>EMAIL ADDRESS</h4>
                                    <br />
                                    <label htmlFor="email">Your email address</label>
                                    <input
                                        id="email"
                                        placeholder="User Email"
                                        className="form-control"
                                        type="email"
                                        name='email'
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
        </div>
    )
}

export default PasswordReset