import { useNavigate } from 'react-router';
import myaxios from '../utils/myaxios';

const NewPasswordSet = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        const data = Object.fromEntries(formdata);
        console.log(data);

        if (data.password1 !== data.password2) {
            alert("Passwords do not match!");
            return;
        }

        const newpassword = { "password": data.password1 };
        console.log(newpassword);

        const token = localStorage.getItem("token");


        myaxios.post('/reset-password',
            newpassword
        )
            .then(res => {
                if (res.data.status === 'success') {
                    navigate('/dashbord')
                } else {
                    alert(res.data.message)
                }
            })
            .catch(err => {
                console.log(err);
            })

    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6 center-screen">
                    <div className="card animated fadeIn w-90 p-4">
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <h4>Set New Password</h4>
                                <br />
                                <label htmlFor="password1">New Password</label>
                                <input
                                    id="password1"
                                    placeholder="New Password"
                                    className="form-control"
                                    type="password"
                                    name='password1'
                                />
                                <br />
                                <label htmlFor="password2">Confirm Password</label>
                                <input
                                    id="password2"
                                    placeholder="Confirm Password"
                                    className="form-control"
                                    type="password"
                                    name='password2'
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
    );
};

export default NewPasswordSet;
