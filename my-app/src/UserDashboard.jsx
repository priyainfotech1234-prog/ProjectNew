import React,{useState} from 'react';
import {getUser} from './auth';
import axios from 'axios';
import './Dashboard.css';
import {FaEye,FaEdit,FaTrash} from 'react-icons/fa';

function UserDashboard(){
    const user=getUser();
    const[activeTab,setActiveTab]=useState('profile');
    const[showForm,setShowForm]=useState(false);
    const[showTable,setShowTable]=useState(false);
    const[usersList,setUsersList]=useState([]);
    const[formData,setFormData]=useState({
        name:user?user.name:'',
        email:user?user.email:'',
        role_id:user?user.role_id:'',
    });
    const handleEdit=()=>{
        setShowForm(true);
        setShowTable(false);
        
    };
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };
    const handleUpdate=async(e)=>{
        e.preventDefault();
        console.log("formdata",formData);
        try{
            const response=await axios.put('http://localhost:8000/api/update/',formData,{
                withCredentials: true
            });
            alert("Updated Successfully");
            setShowForm(false);
        }catch(error){
            console.error("Full details",error);
        };
        
    };
    const handleView=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.get(`http://localhost:8000/api/read/${user.id}/`,{
                withCredentials:true
            });
            console.log("User Details",response.data);
            setUsersList(response.data);
        }catch(error){
            console.error("error",error);
        };
        setShowTable(true);
        setShowForm(false);
    };
    const handleDelete=async(id)=>{
        try{
            const response=await axios.delete(`http://localhost:8000/api/delete/${id}/`,{
                withCredentials:true
            });
            setUsersList(usersList.filter((alluser)=>alluser[0]!==id));
        }catch(error){
            console.error("error",error);
        }
    }
    return(
        <>
        <div className="dashboard-wrapper">
            <div className="sidebar">
                <h3>Menu</h3>
                <ul className="list">
                    <li><button type="button" onClick={handleView}>Dashboard</button></li>
                    <li><button>Apply Leave</button></li>
                    <li><button type="submit" onClick={handleEdit}>Profile Settings</button></li>
                </ul>
            </div>
            <div className="center-bar">
                <h2>USER DASHBOARD - Hi {user.name}!!</h2>
                {showForm &&(
                    <div>
                        <label>Name:</label><br/>
                        <input type="text" name="name" value={formData.name} onChange={handleChange}/><br/>
                        <label>Email:</label><br/>
                        <input type="text" name="email" value={formData.email} onChange={handleChange}/><br/>
                        <button type="button" onClick={()=>setShowForm(false)}>Cancel</button>
                        <button type="button" onClick={handleUpdate}>Update</button>
                    </div>
                )}
                {showTable && usersList &&(
                    <div className="table-wrapper">
                        <table className="style-table">
                            <thead>
                                <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>RoleID</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>{usersList[1]}</td>
                                <td>{usersList[2]}</td>
                                <td>{usersList[3]}</td> 
                                <td className="cell"><button className="btn del" type="button" onClick={()=>handleDelete(alluser[0])}><FaTrash/>Delete</button>
                                <button className="btn edit" type="button" onClick={()=>handleDelete(alluser[0])}><FaEdit/>Edit</button>
                                <button className="btn view" type="button" onClick={()=>handleDelete(alluser[0])}><FaEye/>View</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
        </>
    );
}
export default UserDashboard;