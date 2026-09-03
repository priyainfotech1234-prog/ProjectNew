import React from 'react';
import './Hero.css';

function Hero({isLoggedIn,user,balances}){
    if(!isLoggedIn){
        return(
        <>
        <section className="hero">
            <div className="hero-content">
                <h1>Welcome to LMS Portal</h1>
                <p>Your all-in-one space to plan your time off, track balances, and manage team attendance.</p>
                <div className="hero-buttons">
                    <button className="btn-primary">Login</button>
                    <button className="btn-secondary">SignUp</button>
                </div>
            </div>
            <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600" 
            alt="Office dashboard workspace" 
          />
        </div>
        </section>
        </>
        )
    }
    return(
        <section className="hero">
          <div className="hero-content"></div>
          <h1>Welcome back, {user?.name}!! </h1>
          <p>Role:<strong>{user?.role}</strong></p>
          <div className="balance-cards">
            <div className="card">
                <h4>Annual Leave</h4>
                <p><strong>{balances?.annual}</strong>days remaining</p>
            </div>
            <div className="card">
                <h4>Sick Leave</h4>
                <p><strong>{balances?.sick}</strong>days remaining</p>
            </div>
            <div className="card">
                <h4>Casual Leave</h4>
                <p><strong>{balances?.casual}</strong>days remaining</p>
            </div>
          </div>
          <div className="hero-buttons">
            <button className="btn-primary">Apply for Leave</button>
          </div>
          </section>
    );
}
export default Hero;