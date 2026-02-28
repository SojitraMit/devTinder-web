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
      <div className="card bg-base-300 w-96 h-[620px] border-4 border-black drop-shadow-sm mt-0 relative overflow-hidden">
        {/* Background Image */}
        <figure className="absolute inset-0 -z-10">
          <img
            className="h-[612px] w-96 object-cover"
            src={photoUrl}
            alt="profile"
          />

          {/* LIGHT overlay (not heavy gradient) */}
          <div className="absolute inset-0 bg-black/30"></div>
        </figure>

        {/* Top Buttons */}
        <div className="absolute m-2 flex gap-2 z-10">
          <a
            href={gitHubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex justify-center items-center gap-1 font-bold 
      bg-black/40 text-white border-gray-900 border-2 
      rounded-2xl p-1 backdrop-blur-sm hover:bg-black/60 transition">
            {/* KEEP YOUR SVG */}
            <svg
              stroke="currentColor"
              fill="currentColor"
              viewBox="0 0 496 512"
              height="1em"
              width="1em">
              <path d="M244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2..." />
            </svg>
            GitHub
          </a>

          <a
            href={linkedInUrl}
            target="_blank"
            rel="noreferrer"
            className="flex justify-center items-center gap-1 font-bold 
      bg-sky-500/40 text-white border-sky-900 border-2 
      rounded-2xl p-1 backdrop-blur-sm hover:bg-sky-500/60 transition">
            {/* KEEP YOUR SVG */}
            <svg
              stroke="currentColor"
              fill="currentColor"
              viewBox="0 0 448 512"
              height="1em"
              width="1em">
              <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4..." />
            </svg>
            Linkedin
          </a>

          <button
            className="btn btn-outline ml-20 bg-white/30 text-white 
      backdrop-blur-sm font-bold rounded-2xl hover:bg-white/50"
            onClick={() => fetchUserInfo(_id)}>
            Info
          </button>
        </div>

        <div className="h-[550px]"></div>

        {/* Bottom Content */}
        <div className="card-body pb-2 bg-black/35 backdrop-blur-sm rounded-b-2xl">
          {/* Name */}
          <h2 className="card-title font-extrabold text-white text-2xl drop-shadow-lg">
            {firstName} {lastName}
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
            <p className={`text-gray-100 ${!show ? "line-clamp-2" : ""}`}>
              <span className="font-extrabold text-cyan-300">About:</span>{" "}
              {about}
            </p>

            {about.length > 93 && (
              <button
                onClick={() => setShow(!show)}
                className="text-green-300 font-bold hover:text-green-200">
                {show ? "Show less" : "Show more..."}
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="card-actions justify-between mt-2">
            <button
              className="btn btn-outline btn-error backdrop-blur-sm border-2 
        text-[15px] font-extrabold rounded-2xl w-36 
        hover:brightness-110 hover:scale-105 duration-300"
              onClick={() => handleSendRequest("ignored", _id)}>
              Ignored
            </button>

            <button
              className="btn btn-outline btn-success backdrop-blur-sm border-2 
        text-[15px] font-extrabold rounded-2xl w-36 
        hover:brightness-110 hover:scale-105 duration-300"
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
