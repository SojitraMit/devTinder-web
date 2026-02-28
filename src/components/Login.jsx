import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

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
      navigate("/");
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response?.data?.message || "Something went wronge!!");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          emailId,
          password,
          firstName,
          lastName,
          age,
          gender,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response?.data?.message || "Something went wronge!!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 pb-16">
      <div className="flex w-[800px]  rounded-xl overflow-hidden shadow-2xl">
        {/* Left Side – Branding */}
        <div className="w-[500px] flex flex-col justify-center items-center text-white p-10 space-y-5">
          <h1 className="text-4xl font-extrabold mb-2">Dev-Tinder</h1>

          <p className="text-center text-blue-200">
            Connect with developers.
            <br />
            Build. Match. Collaborate.
          </p>

          {/* Highlight features */}
          <div className="mt-2  text-blue-100 text-sm max-w-sm">
            <h3 className="text-white font-semibold mb-2">📌 Features</h3>
            <ul className="space-y-1 text-white/80">
              <li>
                🤝{" "}
                <span className="font-medium text-gray-400">
                  Connect with Developers
                </span>{" "}
                – Send & accept requests
              </li>
              <li className="">
                🏠{" "}
                <span className="font-medium text-gray-400">
                  Developer Profiles
                </span>{" "}
                – Create and customize your profile
              </li>

              <li>
                🔒{" "}
                <span className="font-medium text-gray-400">
                  Authentication
                </span>{" "}
                – Secure login & signup using JWT
              </li>

              <li>
                ✏️{" "}
                <span className="font-medium text-gray-400 ">Edit Profile</span>{" "}
                – Update skills, bio & details
              </li>
              <li>
                📩{" "}
                <span className="font-medium text-gray-400">
                  Connection Requests
                </span>{" "}
                – Send & manage invites
              </li>
            </ul>
          </div>

          {/* Short description */}
        </div>

        <div className="card card-border bg-base-300 w-[600px] rounded-xl">
          <div className="card-body">
            <h2 className="card-title mx-auto text-2xl">
              {isLoginForm ? "Login" : "Sign Up"}
            </h2>
            {!isLoginForm && (
              <>
                <div className="flex gap-2 ">
                  <fieldset className="fieldset">
                    <label className="flex gap-0 justify-start fieldset-legend">
                      First Name<div className="text-red-500">*</div>
                    </label>
                    <input
                      type="text"
                      className="input w-[205px]"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Type here"
                    />
                  </fieldset>
                  <fieldset className="fieldset">
                    <label className="flex fieldset-legend justify-start gap-0 ">
                      Last Name<div className="text-red-500">*</div>
                    </label>
                    <input
                      type="text"
                      className="input w-[205px]"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Type here"
                    />
                  </fieldset>
                </div>
              </>
            )}
            {!isLoginForm && (
              <div className="grid grid-cols-3 gap-3">
                {/* Age */}
                <fieldset className="fieldset">
                  <label className="flex fieldset-legend gap-0 justify-start">
                    Age<div className="text-red-500">*</div>
                  </label>
                  <input
                    type="number"
                    className="input w-full"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Age"
                    required
                    min={16}
                  />
                </fieldset>

                {/* Gender */}
                <fieldset className="fieldset">
                  <label className="flex gap-0 fieldset-legend w-min">
                    Gender<span className="text-red-500">*</span>
                  </label>
                  <select
                    className="select "
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </fieldset>

                {/* Role */}
                <fieldset className="fieldset">
                  <label className="fieldset-legend">Role</label>
                  <select className="select w-full">
                    <option value="">Select</option>
                    <option value="Frontend Developer">
                      Frontend Developer
                    </option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Fullstack Developer">
                      Fullstack Developer
                    </option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="Designer">Designer</option>

                    <option value="Other">Other</option>
                  </select>
                </fieldset>
              </div>
            )}

            <fieldset className="fieldset">
              <label className="fieldset-legend flex justify-start gap-0">
                Email Id<span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="text"
                className="input w-full"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset ">
              <label className="fieldset-legend flex justify-start gap-0">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="input w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type here"
              />
            </fieldset>
            <p className="text-red-500 font-semibold">{errorMessage}</p>
            <p className="">
              {isLoginForm ? (
                <>
                  New User?{" "}
                  <span
                    className="text-blue-500 cursor-pointer hover:text-blue-600 underline"
                    onClick={() => setIsLoginForm(!isLoginForm)}>
                    Sign Up Here
                  </span>
                </>
              ) : (
                <>
                  Existing User?{" "}
                  <span
                    className="text-blue-500 cursor-pointer  hover:text-blue-600 underline"
                    onClick={() => setIsLoginForm(!isLoginForm)}>
                    Login Here
                  </span>
                </>
              )}
            </p>

            <div className="card-actions justify-end">
              {isLoginForm ? (
                <button
                  className="btn btn-primary mx-auto px-24 my-4"
                  onClick={handleLogin}>
                  Login
                </button>
              ) : (
                <button
                  className="btn btn-primary mx-auto  px-24 my-4"
                  onClick={handleSignUp}>
                  Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Right Side – Form */}
      </div>
    </div>
  );
};

export default Login;
