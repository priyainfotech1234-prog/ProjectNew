import React,{useState} from 'react';

const Data=(props)=>{
    
    const [dataset,setData]=useState(props.userList);
    console.log(dataset[1])
    return(
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
            </tr>
            {dataset.map((index)=> (
                <tr key={index.id}>
                    <td>{index.id}</td>
                    <td>{index.username}</td>
                    <td>{index.email}</td>
                </tr>
            ))}
            <tr>

            </tr>
        </table>
    )
}
export default Data;