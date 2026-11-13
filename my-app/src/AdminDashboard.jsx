import React,{useState} from 'react';
import axios from 'axios';
//import './dashboard.css';
import './Dashboard.css';
{/*import {getUser} from './auth';
import {saveUserData} from './auth';*/}
import {FaEye,FaEdit,FaTrash} from 'react-icons/fa';

function AdminDashboard(){
    {/*const user=getUser();*/}
    {/*console.log("user",user);*/}
       const[showTable,setShowTable]=useState(false);
       const[usersList,setUsersList]=useState([]);
       const[showForm,setShowForm]=useState(false);
       {/*const[currentUser,setCurrentUser]=useState({
        id:usersList?usersList.id:'',
        name:usersList?usersList.name:'',
        email:usersList?usersList.email:'',
        role_id:usersList?usersList.role_id:'',
    }); */}
    
       const[formData,setFormData]=useState({
            id:'',
            name:'',
            email:'',
            role_id:'',
       });
    
    const handleEdit=(data)=>{
        console.log("clicked");
        console.log("data",data);
        setShowForm(true);
        setFormData({
            id:data[0],
            name:data[1],
            email:data[2],
            role_id:data[3],
        });
        
        setShowTable(false);
        
        
        
    };
   {/* const handleUserEdit=(alluser)=>{
        setFormData({
            role_id:alluser[3],
        });
        setShowForm(true);
        setShowTable(false);
    }
*/}
    const handleChange=(e)=>{
        setFormData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }));
    };
 /*const handleChange = (event) => {
  const { name, value } = event.target;

  // Convert to integer if it's the role_id field, otherwise keep as is
  const updatedValue = name === 'role_id' ? parseInt(value, 10) : value;

  setFormData((prevData) => ({
    ...prevData,
    [name]: updatedValue
  }));
};*/

   const handleUpdate=async(e)=>{
        e.preventDefault();
        console.log("clicked");
        try{
            const response=await axios.put(`https://projectnew-14ho.onrender.com/api/update/${formData.id}/`,formData,{
                withCredentials: true
            });
            alert("Updated Successfully");
            handleView();
            setShowTable(true);
            setShowForm(false);
            
            
        }catch(error){
            console.error("Full details",error);
        };
        
    }
   
    const handleView=async(e)=>{
        console.log("view button clicked");
        if(e){
            e.preventDefault();}
        try{
            const response=await axios.get('https://projectnew-14ho.onrender.com/api/read/',{
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
    {/*const handleDelete=async(id)=>{
        try{
            const response=await axios.delete(`https://projectnew-14ho.onrender.com/api/delete/${id}/`,{
                withCredentials:true
            });
            setUsersList(usersList.filter((alluser)=>alluser[0]!==id));
        }catch(error){
            console.error("error",error);
        }
    }*/}
    return(
        <>
        <div className="dashboard-wrapper">
             <div className="sidebar">
                <h3>Menu</h3>
                <ul className="list">
                    <li><button type="button" onClick={handleView}>Dashboard</button></li>
                    {/*<li><button>Apply Leave</button></li>
                    <li><button type="submit" onClick={handleEdit}>Profile Settings</button></li>*/}
                </ul>
            </div>
           <div className="center-bar">
                {/*<h2>ADMIN DASHBOARD - Hi {user.name}!!</h2>*/}
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
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>RoleID</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.map((data)=>(
                            <tr key={data[0]}>
                            <td>{data[0]}</td>
                            <td>{data[1]}</td>
                            <td>{data[2]}</td>
                            <td onClick={()=>handleEdit(data)}><FaEdit/>{data[3]}</td> 
                            {/*<td className="cell"><button className="btn del" type="button" onClick={()=>handleDelete(data[0])}><FaTrash/>Delete</button>
                            </td>*/}
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
