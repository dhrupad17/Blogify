import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // Move useNavigate hook inside the functional component

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData);
      const newUser = response.data;
      console.log(newUser);
      if(!newUser){
        setError("Couldn't register user. Please try again.");
      }
      navigate('/login');
    } catch (err) {
      // if (err.message === "Network Error" || (err.response && err.response.status === 500)) {
      //   navigate('/login');
      // } else if (err.response) {
      //   setError(err.response.data.message);
      // } else {
      //   setError("An error occurred. Please try again.");
      // }
      setError(err.response.data.message)
    }
  };

  return (
    <section className='register'>
      <div className='container'>
        <h2>Sign Up</h2>
        <form className='form register__form' onSubmit={registerUser}>
          {error && <p className='form__error-message'>{error}</p>}
          <input type="text" placeholder='Full Name' name='name' value={userData.name} onChange={changeInputHandler} autoFocus />
          <input type="email" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler} />
          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandler} />
          <input type="password" placeholder='Confirm password' name='password2' value={userData.password2} onChange={changeInputHandler} />
          <button type="submit" className='btn primary'>Register</button>
          <small>Already have an account? <Link to="/login">Sign in</Link></small>
        </form>
      </div>
    </section>
  );
};

export default Register;
