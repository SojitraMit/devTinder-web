/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { addInfo, addShow } from "../utils/infoSlice";
import Lottie from "lottie-react";
import PremiumGold from "../assets/PremiumGold.json";
import TwinkleCrowen from "../assets/TWINKLECROWN!.json";

const UserCard = ({ user }) => {
  const {
    firstName,
    lastName,
    photoUrl,
    skills,
    about,
    age,
    gender,
    _id,
    gitHubUrl,
    linkedInUrl,
    isPremium,
  } = user;
  const [show, setShow] = useState(false);
  const [toastInterested, setToastInterested] = useState(false);
  const [toastIgnored, setToastIgnored] = useState(false);
  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeFeed(_id));
      if (status === "interested") {
        setToastInterested(true);
      } else {
        setToastIgnored(true);
      }
      setTimeout(() => {
        setToastInterested(false);
        setToastIgnored(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserInfo = async (userInfoId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/user/info/" + userInfoId,
        {},
        { withCredentials: true },
      );
      dispatch(addInfo(res.data.data));
      dispatch(addShow(true));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className={`card bg-base-300 w-96 h-[620px] border-4 border-black drop-shadow-sm mt-0 relative overflow-hidden`}>
        {/* Background Image */}
        <figure className="absolute inset-0 -z-10">
          <img
            className="h-full w-full object-cover"
            src={photoUrl}
            alt="profile"
          />

          {/* Gradient Overlay for Text Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent"></div>
        </figure>

        {/* Top Buttons */}
        <div className="absolute m-2 flex gap-2 z-10">
          <a
            href={gitHubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex justify-center items-center gap-1 font-bold hover:bg-black border-gray-900 border-2 cursor-pointer bg-gray-500/30 text-white rounded-2xl p-1 backdrop-blur-md">
            GitHub
          </a>

          <a
            href={linkedInUrl}
            target="_blank"
            rel="noreferrer"
            className="flex justify-center items-center gap-1 font-bold hover:bg-sky-500 border-sky-900 border-2 bg-sky-500/30 text-white rounded-2xl p-1 backdrop-blur-md">
            Linkedin
          </a>

          <button
            className="btn btn-outline ml-20 bg-white/30 backdrop-blur-md text-white hover:bg-white/50 font-bold rounded-2xl"
            onClick={() => fetchUserInfo(_id)}>
            Info
          </button>
        </div>

        <div className="h-[550px]"></div>

        {/* Bottom Content Section */}
        <div className="card-body pb-2 bg-black/40 backdrop-blur-md rounded-b-2xl">
          {/* Name */}
          <h2 className="card-title font-extrabold text-white text-2xl drop-shadow-lg">
            {firstName + " "}
            {lastName}
            {isPremium && (
              <div className="h-9 w-9 -ml-1">
                <Lottie animationData={TwinkleCrowen} />
              </div>
            )}
          </h2>

          {/* Age + Gender */}
          {age && gender && (
            <p className="flex gap-4 text-gray-100 font-bold drop-shadow-md">
              <span>
                <span className="font-extrabold text-cyan-300">Age:</span> {age}{" "}
                Yr.,
              </span>
              <span>
                <span className="font-extrabold text-cyan-300">Gender:</span>{" "}
                {gender}
              </span>
            </p>
          )}

          {/* Skills */}
          {skills && (
            <p>
              <span className="text-cyan-300 font-extrabold">Skills:</span>{" "}
              <span className="text-gray-100 font-bold">
                {skills.join(", ")}
              </span>
            </p>
          )}

          {/* About */}
          <div>
            <p
              className={
                !show ? "line-clamp-2 text-gray-100" : "text-gray-100"
              }>
              <span className="font-extrabold text-cyan-300">About:</span>{" "}
              {about}
            </p>

            {about.length > 93 && (
              <button
                onClick={() => setShow(!show)}
                className="text-green-300 font-bold cursor-pointer hover:text-green-200">
                {show ? "Show less" : "Show more..."}
              </button>
            )}
          </div>

          {/* Buttons */}
          <div className="card-actions justify-between mt-2">
            <button
              className="btn btn-outline btn-error backdrop-blur-md border-2 text-[15px] font-extrabold rounded-2xl w-36 hover:brightness-110 hover:scale-105 duration-300 hover:text-black transition-all"
              onClick={() => handleSendRequest("ignored", _id)}>
              Ignored
            </button>

            <button
              className="btn btn-outline btn-success backdrop-blur-md font-extrabold border-2 text-[15px] rounded-2xl w-36 hover:brightness-110 hover:scale-105 hover:text-black duration-300 transition-all"
              onClick={() => handleSendRequest("interested", _id)}>
              Interested
            </button>
          </div>
        </div>
      </div>
      {toastInterested && (
        <div className="toast">
          <div className="alert alert-success font-semibold">
            <span>
              Request send to
              <span className="font-extrabold "> {firstName}</span>{" "}
              successfully!
            </span>
          </div>
        </div>
      )}
      {toastIgnored && (
        <div className="toast">
          <div className="alert alert-error font-semibold">
            <span>
              You have ignored
              <span className="font-extrabold "> {firstName}</span>{" "}
              successfully!
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;
