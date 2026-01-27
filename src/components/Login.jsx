import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response?.data?.message || "Something went wronge!!");
    }
  };

  return (
    <div className="flex justify-center items-center mt-32 ">
      <div className="card card-border bg-base-300 w-96 rounded-xl">
        <div className="card-body">
          <h2 className="card-title mx-auto text-2xl">Login</h2>
          <fieldset className="fieldset">
            <label className="fieldset-legend">Email Id </label>
            <input
              type="text"
              className="input"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Type here"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="fieldset-legend">Password</label>
            <input
              type="text"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type here"
            />
          </fieldset>
          <p className="text-red-500 font-semibold">{errorMessage}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary mx-auto px-24 my-4"
              onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
