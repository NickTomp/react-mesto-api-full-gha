import React from "react";
import { Navigate } from "react-router-dom";
import { loggedInContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ element: Component, ...props  }) => {
  const isLoggedIn = React.useContext(loggedInContext);
  return (
    isLoggedIn ? <Component.type {...props} /> : <Navigate to="/sign-in" replace/>
  );
}
export default ProtectedRoute;