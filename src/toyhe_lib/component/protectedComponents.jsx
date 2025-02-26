import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ authed, role, requiredRole, children }) {
  // If the user is not authenticated, redirect to the login page
  if (!authed) {
    return <Navigate to="/" />;
  }

  // If the user's role does not match the required role, redirect to an unauthorized page or handle accordingly
  if (requiredRole && role !== requiredRole) {
    console.log("Required role from private route:", requiredRole, "and user role is:", role);
    // Redirect to an unauthorized access page or show an error message
    // Replace '/unauthorized' with the path to your unauthorized access page or component
    return <Navigate to="/unauthorized" />;
  }

  console.log("Required role from private route:", requiredRole, "and user role is:", role);

  // Render the children components if the user is authenticated and has the required role
  return children ? children : <Outlet />;
}


