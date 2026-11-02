import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route,Navigate,Link} from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import {getUser,clearUser} from './auth';

/*import LeaveDashboard from './LeaveDashboard';
import Data from './Data';
import Data1 from './Data1';
import SimpleTracker from './Trial';
import Reducer from './Reducer';
import MasterComponent from './State';
import Try from './Try';*/

function App(){
  {/* const [isLoggedIn,setIsLoggedIn]=useState(True)
  const [isLoggedIn,setIsLoggedIn]=useState(!!localStorage.getItem('userid'));

  const[currentUser,setCurrentUser]= useState({
    name:localStorage.getItem('name')||"Guest",
    role_id:localStorage.getItem('role_id')|| null,
    userid:localStorage.getItem('userid')||null,
    leaveBalances: { annual: 12, sick: 5, casual: 3 }
  });

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
      
  
  const[isLoggedIn,setIsLoggedIn]=useState(!!localStorage.getItem('id'));
  const[currentUser,setCurrentUser]=useState({
    name:localStorage.getItem('name')|| "Guest",
    id:localStorage.getItem('id')||null,
  }); */}
  
  const user=getUser();
  const[isLoggedIn,setIsLoggedIn]=useState(!!user.id);
  const[currentUser,setCurrentUser]=useState(user);
  return(
    <>
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userName={currentUser.name}/>
      {/*{isLoggedIn && <LeaveDashboard/>}
      {isLoggedIn && <Data userList={users}/>}
      {isLoggedIn && <Data1 userList={users}/>}
      {isLoggedIn && <SimpleTracker/>}
      {isLoggedIn && <Reducer/>}
      {isLoggedIn && <MasterComponent/>}
      {isLoggedIn && <Try/>} */}
      <Routes>
        <Route path="/" element={<Hero isLoggedIn={isLoggedIn} /*user={currentUser} balances={currentUser.leaveBalances}*/ />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        {/*<Route path="/dashboard" element={<LeaveDashboard />} /> */}
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
      <Footer/>
    </Router>
    </>
  );
}
export default App;