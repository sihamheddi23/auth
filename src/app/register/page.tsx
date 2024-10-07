import { signUp } from "@/lib/actions/auth.actions";
import React from "react";

const Register = () => {
  const onSubmit = async (formData: FormData) => {
    "use server";
    const { name, email, password } = Object.fromEntries(formData);
    const result = await signUp(
      name as string,
      email as string,
      password as string
    );

    console.log(result);

    if (result?.error) {
      console.error(result.error);
      return;
    }
  };
  return (
    <div>
      <p>Register:</p>
      <form action={onSubmit}>
        <input name="name" type="text" placeholder="name" />
        <input name="email" type="email" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Register;
