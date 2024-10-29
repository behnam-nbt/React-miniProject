import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { registerUser } from '../api/auth'; // Import API function
import { useNavigate, Link } from 'react-router-dom';

import styles from "./Login.module.css";
import Logo from "/images/Union.png"

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const { mutate, isLoading, isError, error, isSuccess } = useMutation(registerUser, {
        onSuccess: () => {
            navigate('/login'); // Redirect to login on success
        },
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg(''); // Reset error message

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setErrorMsg("Passwords don't match");
            return;
        }

        console.log("Registering user:", formData); // Log the data

        // Submit registration form
        mutate({ username: formData.username, password: formData.password });
    };


    return (
        <div className={styles.mainContainer}>
            <div className={styles.loginContainer}>
                <div className={styles.title}>
                    <img src={Logo} alt="لوگو" />
                    <h2>فرم ثبت نام</h2>
                </div>
                {isError && <p style={{ color: 'red' }}>{error.message}</p>}
                {isSuccess && <p style={{ color: 'green' }}>ثبت نام با موفقیت انجام شد!در حال انتقال...</p>}
                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

                <form onSubmit={handleSubmit}>
                    <div className={styles.inputBox}>
                        <div>
                            <input
                                type="text"
                                name="username"
                                placeholder="نام کاربری"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder='رمز عبور'
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder='تکرار رمز عبور'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'درحال ثبت نام...' : 'ثبت نام'}
                        </button>
                        <div className={styles.navigate}>
                            <Link to="/login">حساب کاربری دارید؟</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
