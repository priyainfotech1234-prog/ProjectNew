import React,{useState} from 'react';
import {getUser} from './auth';
import axios from 'axios';
import './dashboard.css';
import {FaEye,FaEdit,FaTrash} from 'react-icons/fa';

function AdminDashboard(){
    const user=getUser();
    const[showTable,setShowTable]=useState(false);
    const[usersList,setUsersList]=useState([]);
    const[activeTab,setActiveTab]=useState('profile');
    const[showForm,setShowForm]=useState(false);
    const[formData,setFormData]=useState({
        name:user?user.name:'',
        email:user?user.email:'',
        role_id:user?user.role_id:'',
    });
    const handleEdit=()=>{
        setShowForm(true);
        setShowTable(false);
        
    };
    const handleUserEdit=(alluser)=>{
        setFormData({
            role_id:alluser[3],
        });
        setShowForm(true);
        setShowTable(false);
    }
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };
    const handleUpdate=async(e)=>{
        e.preventDefault();
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
            const response=await axios.get('http://localhost:8000/api/read/',{
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
                <h2>ADMIN DASHBOARD - Hi {user.name}!!</h2>
                {showForm &&(
                    <div>
                        <label>Name:</label><br/>
                        <input type="text" name="name" value={formData.name} onChange={handleChange}/><br/>
                        <label>Email:</label><br/>
                        <input type="text" name="email" value={formData.email} onChange={handleChange}/><br/>
                        <label>Role ID:</label><br/>
                        <select name="role_id" value={formData.role_id} onChange={handleChange}>
                            <option value="1">Admin</option>
                            <option value="2">Manager</option>
                            <option value="3">Mentor</option>
                            <option value="4">Employee</option>
                        </select><br/><br/>
                        <button type="button" onClick={()=>setShowForm(false)}>Cancel</button>
                        <button type="button" onClick={handleUpdate}>Update</button>
                    </div>
                )}
                {showTable &&(
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
                            {usersList.map((alluser)=>(
                            <tr key={alluser[0]}>
                            <td>{alluser[1]}</td>
                            <td>{alluser[2]}</td>
                            <td onClick={()=>handleEdit(alluser)}><FaEdit/>{alluser[3]}</td> 
                            <td className="cell"><button className="btn del" type="button" onClick={()=>handleDelete(alluser[0])}><FaTrash/>Delete</button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                     </div>
                )}
            </div>
        </div>
        </>
    );
}
export default AdminDashboard;
