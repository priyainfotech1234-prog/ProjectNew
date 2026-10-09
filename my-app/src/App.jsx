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
import Footer from './Footer';
import Login from './Login';
import Try from './Try';


function App(){
  {/* const [isLoggedIn,setIsLoggedIn]=useState(True)*/}
  const [isLoggedIn,setIsLoggedIn]=useState(!!localStorage.getItem('userid'));

  const[currentUser,setCurrentUser]= useState({
    name:localStorage.getItem('name')||"Guest",
    role_id:localStorage.getItem('role_id')|| null,
    userid:localStorage.getItem('userid')||null,
    leaveBalances: { annual: 12, sick: 5, casual: 3 }
  });

  {/*const currentUser={
    name:"Priya",
    role:"Employee",
    leaveBalances:{
      annual:12,
      sick:5,
      casual:3
    }
  };*/}

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
      {isLoggedIn && <SimpleTracker/>}
      {isLoggedIn && <Reducer/>}
      {isLoggedIn && <MasterComponent/>}
      <Try/>
      <Routes>
        <Route path="/" element={<Hero isLoggedIn={isLoggedIn} user={currentUser} balances={currentUser.leaveBalances} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/dashboard" element={<LeaveDashboard />} />
      </Routes>
      <Footer/>
    </Router>
    </>
  );
}
export default App;