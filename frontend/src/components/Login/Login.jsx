/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import logo from '../Images/logo.png';
import StudentDashboard from '../Student/DashBoard/Studentdashboard.jsx';
import StuReg from '../Student/Registration/RegistrationForm.jsx';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ handleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [redirect, setRedirect] = useState(null);
    const [token, setToken] =useState("")
    const navigate = useNavigate();

    const handleLogout = () => {
        window.localStorage.clear();
        setToken("");
        window.location.href = '/'; // Navigate to the root URL in the current tab/window
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`https://api.tpo.getflytechnologies.com/login/logedin`, {
                email,
                password
            });

            if (response.data.message) {
                setMessage(response.data.message);
                console.log(response.data);
                handleLogin(response.data.token, response.data.uid, response.data.email_id, response.data.status, response.data.user_type);

                localStorage.setItem("uid", response.data.uid);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("status", response.data.status);
                localStorage.setItem("user_type", response.data.user_type);
                localStorage.setItem("email", email);
                // localStorage.setItem("name", response.data.name);

                console.log("handle submit wlaa uid: ", response.data.uid, "Email: ", email, "Status: ", response.data.status, "User type ye hai:", response.data.user_type);

                if (response.data.user_type === 1) {

                } else if (response.data.user_type === 2) {
                } else if (response.data.user_type === 3) {
                    if (response.data.status === 0) {
                        // navigate('/stu_reg/registration');
                        setRedirect('registration');
                    } else if (response.data.status === 1) {
                        // navigate('/dashboard/studentdashboard');
                        setRedirect('studentdashboard');
                    } else {
                        window.location.href = 'http://localhost:3008';
                    }
                }
            } else {
                setMessage('Invalid credentials');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setMessage('Invalid Email or Password');
        }
    };

    if (redirect === 'registration') {
        // return <StuReg email={email} />;
        // return <StuReg handleLogout={(handleLogout)}/>;
        navigate('/profile');
    } else if (redirect === 'studentdashboard') {
        // const studentId = window.localStorage.getItem('uid');
        // return <StudentDashboard handleLogout={(handleLogout)}/>;
        navigate('/');
    }

    const handleRegister=()=>{
        console.log("clicked")
        // window.location.href='/registration';
        // navigate('/registration');
        navigate('/sign-up');
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="flex flex-col md:flex-row w-full max-w-screen-xl bg-white shadow-lg rounded-2xl overflow-hidden">
                {/* Left Section with Logo and College Name */}
                <div className="md:w-1/2 p-4 flex flex-col items-center justify-center">
                    <img src={logo} alt="TPO Logo" className="max-w-full h-auto mb-4" />
                    <p className='font-bold text-3xl text-center'>Vasantdada Patil Pratishthan's College of Engineering And Visual Arts</p>
                </div>

                {/* Vertical Line (Separator) */}
                <div className="border-l border-gray-200 hidden md:block"></div>

                {/* Right Section with Login Form */}
                <div className="md:w-1/2 p-8 flex flex-col items-center justify-center">
                    <h2 className="text-4xl font-bold mb-6">Login</h2>
                    <p className="text-xl text-center mb-8">Welcome to Getfly Technologies. Please login to your account.</p>
                    
                    <form className="w-full md:w-3/4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Id</label>
                            <input 
                                type="text" 
                                id="email" 
                                name="email" 
                                className="mt-1 border border-gray-300 rounded-md w-full flex-1 p-3 shadow-lg rounded-md"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                className="mt-1 border border-gray-300 rounded-md w-full flex-1 p-3 shadow-lg rounded-md"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-center w-full">
                            <button type="submit" className=" px-4 py-2 hover:bg-blue-700 bg-blue-500 text-white  rounded-md w-auto  ">Login</button>

                            {/* <button class="focus:outline focus:outline-blue-500">Click me</button> */}

                        </div>
                    </form>

                    {/* Display message */}
                    {message && <p className="text-red-500 mt-4">{message}</p>}
                    <p onClick={handleRegister}>Register Here!!</p>
                </div>
            </div>
        </div>
    );
}
