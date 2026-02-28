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
              stroke-width="0"
              viewBox="0 0 496 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg">
              {" "}
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>{" "}
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
              className="bg-white text-sky-400 "
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg">
              {" "}
              <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>{" "}
            </svg>
            Linkedin
          </a>

          <button
            className="btn btn-outline ml-20 bg-white/30 text-white 
      backdrop-blur-sm font-bold rounded-2xl hover:bg-white/50"
            onClick={() => fetchUserInfo(_id)}>
            Info{" "}
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 16 16"
              class="text-lg md:text-xl"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg">
              {" "}
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>{" "}
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"></path>{" "}
            </svg>
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
