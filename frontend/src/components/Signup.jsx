// import { get } from 'mongoose';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../HttpHelper';

// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import ReactDOM from 'react-dom';
// import './SignUp.css';

function Signup({updateSignUpText, signUpText, loggedIn, setLoggedIn, signInText, updateSignInText,updateSignInRoute,updateSignUpRoute, signUpRoute, signInRoute, updateUserDetails, toggleUserDetailsModal, showUserDetails  }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [weight, setWeight] = useState('');
    // const [targetWeight, setTargetWeight] = useState('');
    // const [goal, setGoal] = useState('');
    const [lifestyle, setLifestyle] = useState('');
    const [goal, setGoal] = useState('');
    const [height, setHeight] = useState('');
    const [bmi,setBmi] = useState('');
    const [birthday, setBirthday] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const navigate = useNavigate();
    const [typingTimer, setTypingTimer] = useState(null);

    const handleInputChange = async () => {
      // const value = e;
      // setUsername(value);
      clearTimeout(typingTimer);
      setTypingTimer(setTimeout(() => {
        checkUserName();
        // handleInputChange();
      }, 3000));
    };
    useEffect(() => {
      return () => {
        clearTimeout(typingTimer);
      };
    }, [typingTimer]);

    const handleSignUp = async (e) => {
      e.preventDefault();
      // if(checkUserName()==='true'){
      //   alert("Username already exists. Please try another one.");
      //   setUsername('');
      //   return;
      // }
      const userData = {
        username: username,
        email: email,
        password: password
      };
      console.log('User data:', userData); //Saving data
      // console.log(userData.age);
      // console.log(typeof(userData.age));
      try {
        const response = await api.post('/api/userGet', JSON.stringify(userData), {
          headers: {
            'Content-Type': 'application/json' // Ensure the content type is set for JSON
          }
        });
      
        console.log('Response:', response); // Log full response for detailed debugging
      
        if (response.status === 201) {
          console.log('Data submitted successfully');
        } else if (response.status === 409) {
          console.error('Username is already taken');
          alert("Username is already taken.");
          setUsername('');
          document.getElementById('usernameInput').focus(); // Focus on the username input after reset
        } else {
          console.error('Failed to submit data:', response.status, response.statusText);
          alert("An error occurred. Please try again.");
        }
      } catch (error) {
        console.error('Error submitting data:', error);
        alert("Failed to connect to the server. Please check your network connection.");
      }
      updateUserDetails(userData);
      // console.table(userData);
      //comment the below part 
      updateSignUpText(username);
      setLoggedIn(true);
      updateSignInText('Log Out');
      updateSignInRoute('/logOut');
      updateSignUpRoute('#');
      // updateSignUpRoute('/userDetails'); 
      setUsername('');
      setEmail('');
      setPassword('');
 
      localStorage.setItem('userDetail',JSON.stringify(userData));
      localStorage.setItem('isLoggedIn',true);
      const storedUser = JSON.parse(localStorage.getItem('userDetail'));

      console.log(storedUser);
      try{
        const response = await api.post('/api/userGet',JSON.stringify(userData) )
        if (response.ok) {
          console.log('Data submitted successfully');
        } else {
          console.error('Failed to submit data');
        }
      } catch (error) {
        console.error('Error submitting data:', error);
      }
      navigate('/');

      // console.log(signInText);
      // console.log(signUpText);
      
      // const valueForSignUp = document.getElementById('SignUp');
      // const name1 = username;
      // // const name = '${name1}';
      // const linkElement = <Link to="/signup">{name1}</Link>;
      // ReactDOM.render(linkElement, valueForSignUp);
  
  
      // if (username) {
      //   console.log(username);
      //   console.log(document.querySelector('#This-Text').innerHTML);
      //   document.querySelector('#This-Text').innerHTML = username;
      //   document.querySelector('#This-Text').setAttribute('to','/profile-details');
      //   // document.querySelector('#This-Text') = 
      //   // updateSignUpText(username);
      // }
  
      //un comment the below part 
  
      
    };
    // useEffect(() => {
    //   console.log('Username:', username); // Will log the updated value
    //   console.log('SignInText:', signInText); // Assuming signInText is a state or prop
    //   console.log('SignUpText:', signUpText); // Assuming signUpText is a state or prop
    // }, [username, signInText, signUpText]);
  
    const calculateAge = () => {
      const today = new Date();
      const birthDate = new Date(birthday);
      const ageDifference = today - birthDate;
      const calculatedAge = Math.floor(ageDifference / (1000 * 60 * 60 * 24 * 365.25));
      setAge(calculatedAge);
    };
  
    const calculateBmi = () => {
      if (!height || !weight) return;
      const heightInMeters = parseFloat(height) / 100; // Convert height to meters
      const bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
      setBmi(parseFloat(bmiValue.toFixed(2))); // Round BMI value to two decimal places
    };
    
    //To check duplicate username
    const checkUserName = async () => {
      try {
        const uri = '/api/users/' + username;
        console.log('Request URI:', uri);
        const response = await api.get(uri);
        
        if (response.status === 200) {
          console.log("Username exists:", response.data);
          return true;
        } else {
          console.log("Username does not exist or other server error:", response.status);
          return false;
        }
      } catch (error) {
        if (error.response) {
          console.error('Server responded with error status:', error.response.status);
          console.error('Error response data:', error.response.data);
        } else if (error.request) {
          console.error('No response received from the server:', error.request);
        } else {
          console.error('Error setting up the request:', error.message);
        }
      }
    };
   
    return (
      <div className="sign-up-container">
        <h2 className="sign-up-title">Sign Up</h2>
        <form onSubmit={handleSignUp} className="sign-up-form">
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                handleInputChange();
              }}
              placeholder='Enter username'
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter email'
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                // handleInputChange();
              }}
              placeholder='Enter password'
              required
            />
          </div>
       
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }

  export default Signup;