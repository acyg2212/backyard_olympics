import React, { useContext } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import UserContext from "../../UserContext"

const ProtectedRoute = ({ component: Component, path, exact }) => {
    const { currentUserId } = useContext(UserContext)
    let navigate = useNavigate()
    // console.log("protected", currentUserId)
    return (
        currentUserId ? <Outlet /> : <Navigate to="/login" />

    )
}
//     const { isLoggedIn } = props;
//     if (token.length() < 112) {
//         return <Redirect to="/login" />;
//     }
//     return <Route {...props} />;
// }


export default ProtectedRoute