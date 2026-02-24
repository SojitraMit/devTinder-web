/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import UserCard from "./UserCard";
import InfoCard from "./InfoCard";

const EditProfile = ({ user }) => {
  // const { firstName, lastName, photoUrl, skills, about, age, gender } = user;
  const _id = user._id;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [emailId, setEmailId] = useState(user.emailId);
  const [gitHubUrl, setGithubUrl] = useState(
    user.github || "https://github.com/",
  );
  const [linkedInUrl, setLinkedInUrl] = useState(
    user.linkedin || "https://www.linkedin.com/",
  );
  const [skills, setSkills] = useState(user.skills || []);
  const [errorMessage, setErrorMessage] = useState();
  const infoShow = useSelector((store) => store.info.show);
  const infoData = useSelector((store) => store.info.data);
  const [save, setSave] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveProfile = async () => {
    try {
      setErrorMessage("");
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          emailId,
          skills,
          photoUrl,
          about,
          gitHubUrl,
          linkedInUrl,
        },
        { withCredentials: true },
      );
      setSave(true);
      setTimeout(() => {
        setSave(false);
      }, 3000);
      dispatch(addUser(res?.data?.data));

      // alert("Profile updated successfully!");
    } catch (err) {
      console.log(err.response.data);
      setErrorMessage(err.response.data);
    }
  };

  return (
    <>
      {save && (
        <div role="alert" className="alert alert-success w-96 z-10 absolute ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Profile updated successfully!!</span>
        </div>
      )}

      {infoShow && (
        <div
          className="fixed inset-0  backdrop-blur-xs 
           flex justify-center items-center z-50 transition-opacity">
          {!infoData ? (
            <span className="loading loading-bars loading-xl"></span>
          ) : (
            <InfoCard />
          )}
        </div>
      )}

      <div className="flex justify-center gap-10 items-center ">
        <div className=" w-[616px] flex justify-center items-start pt-3  text-blue-200">
          <div className="card w-full max-w-lg bg-base-300  rounded-xl shadow-2xl shadow-slate-800/80">
            <div className="card-body space-y-0">
              <h2 className="text-lg font-bold text-center text-white">
                Edit Profile
              </h2>

              {/* Avatar */}
              <div className="flex justify-center">
                <div className="avatar">
                  <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={photoUrl} alt="Profile" />
                  </div>
                </div>
              </div>

              {/* Photo URL + Email */}
              <div className="grid grid-cols-2 gap-2">
                <fieldset className="fieldset">
                  <label className="fieldset-legend">Photo URL</label>
                  <input
                    className="input input-sm input-bordered w-full"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <label className="fieldset-legend">Email</label>
                  <input
                    type="email"
                    className="input input-sm input-bordered w-full"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                </fieldset>
              </div>

              {/* Name */}
              <div className="grid grid-cols-2 gap-2">
                <fieldset className="fieldset">
                  <label className="fieldset-legend">First Name</label>
                  <input
                    className="input input-sm input-bordered w-full"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <label className="fieldset-legend">Last Name</label>
                  <input
                    className="input input-sm input-bordered w-full"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>

              {/* Age + Gender */}
              <div className="grid grid-cols-4 gap-2">
                <fieldset className="fieldset">
                  <label className="fieldset-legend">Age</label>
                  <input
                    type="number"
                    className="input input-sm input-bordered w-full"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <label className="fieldset-legend">Gender</label>
                  <select
                    className="select select-sm select-bordered w-full"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </fieldset>
                <fieldset className="fieldset">
                  <label className="fieldset-legend">GitHub</label>
                  <input
                    type="text"
                    className="input input-sm input-bordered w-full"
                    value={gitHubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <label className="fieldset-legend">LinkedIn</label>
                  <input
                    type="text"
                    className="input input-sm input-bordered w-full"
                    value={linkedInUrl}
                    onChange={(e) => setLinkedInUrl(e.target.value)}
                  />
                </fieldset>
              </div>

              {/* Skills */}
              <fieldset className="fieldset">
                <div className="flex">
                  <label className="fieldset-legend">Skills : </label>
                  <div className="mt-1">
                    <span className="badge badge-outline badge-primary ml-3 mr-1">
                      React
                    </span>
                    <span className="badge badge-outline badge-primary mx-1">
                      Node
                    </span>
                    <span className="badge badge-outline badge-primary mx-1">
                      MongoDB
                    </span>
                  </div>
                  <p className="mt-2 ml-2 text-xs text-gray-500">
                    ( use "," to separate skills )
                  </p>
                </div>

                <input
                  className="input input-sm input-bordered w-full"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value.split(","))}
                />
              </fieldset>

              {/* About (smaller) */}
              <fieldset className="fieldset">
                <label className="fieldset-legend">About</label>
                <textarea
                  className=" textarea-bordered textarea  textarea-xs w-full"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>

              {/* Error */}
              <p className="text-red-500 text-xs text-center font-medium">
                {errorMessage}
                {/* errorMessage */}
              </p>

              {/* Actions */}
              <div className="flex gap-2 ">
                <button
                  className="btn btn-outline btn-sm w-1/2 text-white"
                  onClick={() => navigate("/")}>
                  Cancel
                </button>
                <button
                  className="btn btn-primary btn-sm w-1/2 "
                  onClick={saveProfile}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="my-auto">
          {" "}
          <UserCard
            user={{
              _id,
              firstName,
              lastName,
              age,
              gender,
              skills,
              photoUrl,
              about,
              gitHubUrl,
              linkedInUrl,
              isPremium: user.isPremium,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
