import { useAuthenticator } from '@aws-amplify/ui-react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ViewProducts = () => {
    const { signOut } = useAuthenticator((context) => [context.user]);
    const navigate = useNavigate(); 
    const getproducts = () =>{
        
    }
    const logout = () =>{
        signOut({ global: true });
        navigate("/")
    }
    return (
        <div>
            welcome
            <button onClick={logout}>logout</button>
        </div>
    )
}

export default ViewProducts