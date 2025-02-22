import { login } from "../../../toyhe_lib/actions/auth/auth_actions"
import apiEndPoints from "../end_points";
export const signIn  = async (formData) => {
  
    await login(formData , apiEndPoints.LOGIN);
}