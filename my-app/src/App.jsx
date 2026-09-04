import React, {useState} from 'react';
import './App.css';
import Navbar from './Navbar';
import Hero from './Hero';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import LeaveDashboard from './LeaveDashboard';
import Data from './Data';
import Data1 from './Data1';
import SimpleTracker from './Trial';
import Reducer from './Reducer';
import MasterComponent from './State';


function App(){
  const [isLoggedIn,setIsLoggedIn]=useState(true);

  const currentUser={
    name:"Priya",
    role:"Employee",
    leaveBalances:{
      annual:12,
      sick:5,
      casual:3
    }
  };

  const users=[
    {id:1,username:"Priya",email:"priya@gmail.com"},
    {id:2,username:"Krish",email:"krish@gmail.com"}
  ];

  return(
    <>
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userName={currentUser.name}/>
      {isLoggedIn && <LeaveDashboard/>}
      {isLoggedIn && <Data userList={users}/>}
      {isLoggedIn && <Data1 userList={users}/>}
      <SimpleTracker/>
      <Reducer/>
      <MasterComponent/>
      <Routes>
        <Route path="/" element={<Hero isLoggedIn={isLoggedIn} user={currentUser} balances={currentUser.leaveBalances} />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </Router>
    </>
  );
}
export default App;