export const saveUserData=(data)=>{
    localStorage.setItem('id',data.id);
    localStorage.setItem('name',data.name);
    localStorage.setItem('role_id',data.role_id);
    localStorage.setItem('email',data.email);
};

export const getUser=()=>{
    return{
        id:localStorage.getItem('id'),
        name:localStorage.getItem('name'),
        role_id:localStorage.getItem('role_id'),
        email:localStorage.getItem('email'),
    };
};

export const clearUser=()=>{
    localStorage.clear();
}