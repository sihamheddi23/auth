import { login } from "@/lib/actions/auth.actions";
import React from "react";

const Login = () => {
  const onSubmit = async (formData: FormData) => {
    "use server";
    const { email, password } = Object.fromEntries(formData);
    const result = await login(email as string, password as string);

    console.log(result);

    if (result?.error) {
      console.error("result.error");
      return;
    }
  };
  return (
    <div>
      <p>login:</p>
      <form action={onSubmit}>
        <input name="email" type="email" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Login;
