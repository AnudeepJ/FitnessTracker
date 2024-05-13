import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

//CSS
import './styles/Header.css'
import './styles/SignIn.css'
import './styles/SignUp.css'
import './styles/SearchMusic.css'
import './styles/RecommendedMusic.css'
import './styles/App.css'
import './styles/UserDetails.css'
import './styles/WorkoutLog.css'
import './styles/WaterLog.css'
import './styles/FoodLog.css'
import './styles/WorkoutHistory.css'
import './styles/WaterIntake.css'
import './styles/CaloriesBurnt.css'
import './styles/Home.css'
import './styles/About.css'
import './styles/Contact.css'

//Components 
import Signup from './components/Signup.jsx'
import Signin from './components/Signin.jsx'
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import WorkoutLog from './components/WorkoutLog.jsx'

import WaterLog from './components/WaterLog.jsx'
import CaloriesBurnt from './components/CaloriesBurnt.jsx'
import WaterIntake from './components/WaterIntake.jsx'
import UserDetails from './components/UserDetails.jsx'
import LogOut from './components/LogOut.jsx'
import WorkoutHistory from './components/WorkoutHistory.jsx'

function App() {
  const queryClient = new QueryClient();

  //State for user authentication status and username
  const [signUpText, setSignUpText] = useState('Sign Up');
  const [signInText, setSignInText] = useState('Sign In');
  const [loggedIn, setLoggedIn] = useState(false); // we need to use this to verify if the user is logged in or not, especially for Progress and Workout Log
  const [signUpRoute, setSignUpRoute] = useState('/signup');
  const [signInRoute, setSignInRoute] = useState('/signin');
  const [userDetails, setUserDetails] = useState('');
  const [showUserDetails, setShowUserDetails] = useState(false);
  
  //Methods  for handling button clicks and routing
  const toggleUserDetailsModal = () => {
    setShowUserDetails(!showUserDetails);
  };
  const updateUserDetails = (text) => {
    setUserDetails(text);
  }
  const updateSignUpRoute = (text) => {
    setSignUpRoute(text);
  }
  const updateSignInRoute = (text) => {
    setSignInRoute(text);
  }
  const updateSignUpText = (text) => {
    setSignUpText(text);
  };
  const updateSignInText = (text) => {
    setSignInText(text);
  };

  useEffect(() => {
    console.log(userDetails);
    if(localStorage.getItem("isLoggedIn") === 'true'){
      console.log('user has already logged in');
      if(!localStorage.getItem('userDetail')){
        localStorage.setItem("isLoggedIn" , "false");
        alert("Critical Error: Error with localstorage");
        return;
      }
      const storedUser = JSON.parse(localStorage.getItem('userDetail'));
      let username = storedUser.username;
      updateSignUpText(username);
      setLoggedIn(true);
      updateSignInText('Log Out');
      updateSignInRoute('/logOut');
      updateSignUpRoute('#');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
       <Router>
      <div>
        <Header signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} toggleUserDetailsModal={toggleUserDetailsModal} showUserDetails={showUserDetails} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workoutLog" element={<WorkoutLog signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} updateUserDetails={updateUserDetails} showUserDetails={showUserDetails} userDetails={userDetails} />} />
          <Route path="/waterLog" element={<WaterLog signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} />} />
          <Route path="/workoutHistory" element={<WorkoutHistory signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} />} />
          <Route path="/caloriesBurnt" element={<CaloriesBurnt signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} />} />
          <Route path="/waterIntake" element={<WaterIntake signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} />} />
        
          <Route path="/signup" element={<Signup signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} updateUserDetails={updateUserDetails} toggleUserDetailsModal={toggleUserDetailsModal} showUserDetails={showUserDetails} />} />
          <Route path="/signin" element={<Signin signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} updateUserDetails={updateUserDetails} toggleUserDetailsModal={toggleUserDetailsModal} showUserDetails={showUserDetails} />} />
          <Route path="/logOut" element={<LogOut signUpText={signUpText} updateSignUpText={updateSignUpText} loggedIn={loggedIn} setLoggedIn={setLoggedIn} signInText={signInText} updateSignInText={updateSignInText} updateSignInRoute={updateSignInRoute} updateSignUpRoute={updateSignUpRoute} signUpRoute={signUpRoute} signInRoute={signInRoute} updateUserDetails={updateUserDetails} toggleUserDetailsModal={toggleUserDetailsModal} showUserDetails={showUserDetails} />} />
          
        </Routes>
        {showUserDetails && <UserDetails updateUserDetails={updateUserDetails} userDetails={userDetails} toggleUserDetailsModal={toggleUserDetailsModal} showUserDetails={showUserDetails} />}
      </div>
    </Router>
    </QueryClientProvider>
  
  );
}

export default App;
