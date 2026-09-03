import React from 'react';

const Data1 = (props) =>{
    return(
        <>
        <h4>UserList</h4>
        <table border="1">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
            </tr>
            {props.userList.map((item) => (
            <tr key={item.id}> 
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
            </tr>
            ))}
        </table>
        </>
    )
}
export default Data1;