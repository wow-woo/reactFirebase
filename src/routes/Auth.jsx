import React, { useState } from "react";
import { fb, fb_auth } from "server/firebaseAPI";
let user;

export default function Auth() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const changeHandler = (e) => {
    const { name, value } = e.currentTarget;

    setForm({ ...form, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (newAccount) {
        console.log("new account");
        user = await fb_auth.createUserWithEmailAndPassword(
          form.email,
          form.password
        );
      } else {
        user = fb_auth.signInWithEmailAndPassword(form.email, form.password);
      }
      console.log(user, "user");
    } catch (error) {
      setError(error.message);
    }
  };

  const onSocial = async (e) => {
    const {
      target: { name },
    } = e;

    let provider;
    name === "google" && (provider = new fb.auth.GoogleAuthProvider());
    name === "github" && (provider = new fb.auth.GithubAuthProvider());

    const data = await fb_auth.signInWithPopup(provider);
    console.log(data);
  };

  const toggleAccount = () => setNewAccount((pre) => !pre);

  return (
    <div>
      <div>
        <form onSubmit={submitHandler}>
          <input
            type='text'
            name='email'
            placeholder='email'
            required
            onChange={changeHandler}
            value={form.email}
          />
          <input
            type='password'
            name='password'
            placeholder='password'
            required
            onChange={changeHandler}
            value={form.password}
          />
          <input
            type='submit'
            value={newAccount ? "Create account" : "Log in"}
          />
        </form>

        <button onClick={toggleAccount}>toggle</button>
        {error}
      </div>
      <div>
        <button name='google' onClick={onSocial}>
          Continue with Google
        </button>
        <button name='github' onClick={onSocial}>
          Continue with Github
        </button>
      </div>
    </div>
  );
}
