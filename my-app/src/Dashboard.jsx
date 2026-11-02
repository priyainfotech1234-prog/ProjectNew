import React from 'react';
import {getUser} from './auth';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

function Dashboard(){
    const user=getUser();
    const userrole=user.role_id;
    return(
        <>
        <div>
            {userrole==="1"?(
                <AdminDashboard/>
            ):userrole==="4"?(
                <UserDashboard/>
            ):(
                <p>Role not recognized</p>
            )}
        </div>
        </>
    );
}
export default Dashboard;
