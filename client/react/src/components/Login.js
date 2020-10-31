import React, { useState } from "react";
import { setUserSession } from "./utils/Common";
import { postData } from "./utils/HTTPRequests";

export default function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    postData("/users/login", {
      // email: "s@s.com",
      // password: "123456",
      email: username.value,
      password: password.value,
    })
      .then((data) => {
        console.log(data); // JSON data parsed by `data.json()` call
        if (data.error) {
          setLoading(false);
          setError("Something went wrong. Please try again later.");
        }
        setLoading(false);
        setUserSession(data.jwt_token, (data.user = { name: "awesome" }));
        props.history.push("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        // console.log(error);
        // debugger;
        // if (error.response.status === 401)
        //   setError(error.response.data.message);
        // else
        setError("Something went wrong. Please try again later.");
      });

    // axios
    //     .post("http://localhost:4000/users/signin", {
    //       username: username.value,
    //       password: password.value,
    //     })
    //     .then((response) => {
    //       setLoading(false);
    //       setUserSession(response.data.token, response.data.user);
    //       props.history.push("/dashboard");
    //     })
    //     .catch((error) => {
    //       setLoading(false);
    //       if (error.response.status === 401)
    //         setError(error.response.data.message);
    //       else setError("Something went wrong. Please try again later.");
    //     });
  };
  return (
    <div>
      <br />
      <br />
      <div>
        Email
        <br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password
        <br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && (
        <>
          <small style={{ color: "red" }}>{error}</small>
          <br />
        </>
      )}
      <br />
      <input
        type="button"
        value={loading ? "Loading..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />
      <br />
    </div>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};
