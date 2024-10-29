import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { loginUser } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import { decodeToken } from '../helper/helper';
import Logo from '/images/Union.png';
import styles from './Login.module.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation(loginUser, {
        onSuccess: (data) => {
            const token = data.token;  // Assume that data contains the token
            if (token) {
                // Decode the token to extract the username
                const decodedToken = decodeToken(token);
                const username = decodedToken.username;  // Extract the username from the decoded token
    
                if (username) {
                    localStorage.setItem('username', username);
                } else {
                    console.error('Username not found in token');
                }
    
                // Token is already saved in cookies
                navigate('/products');
            } else {
                console.error('Token not found in response');
            }
        },
        onError: (error) => {
            setErrorMsg(error.message);
        },
    });
    
    

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg('');
        mutate({ username: formData.username, password: formData.password });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.loginContainer}>
                <div className={styles.title}>
                    <img src={Logo} alt="logo" />
                    <h2>فرم ورود</h2>
                </div>
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
                                placeholder="رمز عبور"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'صبر کنید...' : 'ورود'}
                        </button>
                        <div className={styles.navigate}>
                            <Link to="/register">ایجاد حساب کاربری!</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
