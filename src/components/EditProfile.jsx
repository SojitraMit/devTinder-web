/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  // const { firstName, lastName, photoUrl, skills, about, age, gender } = user;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [emailId, setEmailId] = useState(user.emailId);
  const [skills, setSkills] = useState(user.skills);
  const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          skills,
          photoUrl,
          about,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="flex justify-center gap-10">
      <div className=" w-[616px] flex justify-center items-start pt-3  text-blue-200">
        <div className="card w-full max-w-lg bg-base-300 shadow-lg rounded-xl">
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
            <div className="grid grid-cols-2 gap-2">
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
              </div>

              <input
                className="input input-sm input-bordered w-full"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
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
            <p
              className="text-red-500 text-xs text-center font-medium"
              value={errorMessage}>
              {/* errorMessage */}
            </p>

            {/* Actions */}
            <div className="flex gap-2 ">
              <button className="btn btn-outline btn-sm w-1/2 text-white">
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
          user={{ firstName, lastName, age, gender, skills, photoUrl, about }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
