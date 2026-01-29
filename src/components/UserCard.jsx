/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, skills, about, age, gender } = user;
  const [show, setShow] = useState(false);

  return (
    <div
      className="card bg-base-300 w-96 shadow-sm h-[620px] border-4 border-black drop-shadow-sm
  mt-0">
      <figure className="absolute -z-10">
        <img
          className="h-[620px]  w-96  object-cover  "
          src={photoUrl}
          //https://cdn.iconscout.com/icon/premium/png-512-thumb/laptop-user-icon-svg-download-png-9140623.png?f=webp&w=512
          alt="Shoes"
        />
      </figure>
      <div className="h-[550px]"></div>
      <div className="card-body pb-2  ">
        <h2 className="card-title font-extrabold text-white">
          {firstName + " "}
          {lastName}
        </h2>
        {age && gender && (
          <p className=" flex gap-4 text-white font-bold">
            {" "}
            <span>
              <span className="font-extrabold  text-black">Age:</span>{" "}
              {age}{" "}
            </span>
            <span>
              <span className="font-extrabold text-black">Gender:</span>{" "}
              {gender}
            </span>
          </p>
        )}
        {skills && (
          <p>
            <span className=" text-black font-extrabold">Skills:</span>{" "}
            <span className="text-white font-bold">{skills.join(", ")}</span>
          </p>
        )}
        <div className="">
          <p className={!show ? "line-clamp-2" : ""}>
            <span className="font-extrabold text-black ">About:</span>{" "}
            <span className="text-white font-bold">{about}</span>
          </p>
          {about.length > 93 && (
            <button
              onClick={() => setShow(!show)}
              className=" z-10  text-green-100 font-bold  cursor-pointer">
              {" "}
              {show ? "Show less" : "Show more...."}
            </button>
          )}
        </div>

        <div className="card-actions justify-between">
          <button
            className="btn btn-primary w-36 hover:brightness-110
 hover:scale-110 duration-300 hover:text-black hover:font-bold transition-all">
            Ignored
          </button>
          <button
            className="btn btn-secondary hover:brightness-110
 w-36 hover:scale-110 hover:font-bold hover:text-black duration-300 transition-all">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
