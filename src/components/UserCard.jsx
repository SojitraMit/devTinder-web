/* eslint-disable no-unused-vars */
import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, skills, about, age, gender } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm h-[620px] border-6 border-black  mt-5">
      <figure>
        <img
          className="h-[420px] object-cover "
          src={photoUrl}
          //https://cdn.iconscout.com/icon/premium/png-512-thumb/laptop-user-icon-svg-download-png-9140623.png?f=webp&w=512
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName + " "}
          {lastName}
        </h2>
        {age && gender && <p>{"age : " + age + " gender : " + gender}</p>}
        {skills && <p>{skills}</p>}
        <p>{about}</p>
        <div className="card-actions justify-between">
          <button className="btn btn-primary w-36 hover:scale-110 duration-300 hover:text-black hover:font-bold transition-all">
            Ignored
          </button>
          <button className="btn btn-secondary w-36 hover:scale-110 hover:font-bold hover:text-black duration-300 transition-all">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
