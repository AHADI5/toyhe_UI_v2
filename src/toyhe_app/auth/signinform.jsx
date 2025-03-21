import DynamicForm from "../../toyhe_lib/component/forms/auth";
import { signIn } from "./actions/login";
import { useState } from 'react';
const SignInForm = () => {

  const [isLoading , setIsLoading] = useState(false);

  //Forms for the login for the login page
    const fields = [
        { name: "email", type: "email", label: "Enter your email", placeholder: "example@mail.com" },
        { name: "password", type: "password", label: "Enter your password", placeholder: "••••••••" },

      ];
  
      const onSubmit = (inputs) => {
        setIsLoading (true)
        signIn(inputs);
        setIsLoading(false)
        
      }
    return (
      <div>
        <DynamicForm fields={fields} onSubmit={onSubmit}  isLoding={isLoading}/>
      </div>
    )

}

export default SignInForm;