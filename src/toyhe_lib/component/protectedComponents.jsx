import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ authed, role , model, minimumRequirement , accessRights , children }) {
  // If the user is not authenticated, redirect to the login page
  if (!authed) {
    return <Navigate to="/" />;
  }

  //checking wether the user has required access rights for the model 
  

  // If the user's role does not match the required role, redirect to an unauthorized page or handle accordingly
  if (checkingMinimumRequirement(minimumRequirement , model, accessRights) === false) {
    console.log("No access Rights for the", model, "and user role is:", role);
    // Redirect to an unauthorized access page or show an error message
    // Replace '/unauthorized' with the path to your unauthorized access page or component
    return <Navigate to="/unauthorized" />;
  }



  // Render the children components if the user is authenticated and has the required role
  return children ? children : <Outlet />;
}

//  const checkingAccessRights = (accessRights, model, permission) => {
//   return accessRights.some((accessRight) => {
//     return accessRight.model === model && accessRight[permission];
//   });
// }

const checkingMinimumRequirement = (minimumRequirement , model, accessRights) => {
  const  models = accessRights.map ((accessRight) => {
    return accessRight.model;
  })

  //checking if the model is in the access rights array
  if (models.includes(model)) {
    const modelAccessRight  = accessRights.find((accessRight) => {
      return accessRight.model === model;
    });

    if (modelAccessRight[minimumRequirement] && modelAccessRight[minimumRequirement].read === 1) {
      return true;
    }

    
  } else {
    return false;
  }


  return ;

}

