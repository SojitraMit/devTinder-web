import React from "react";

const HorizontalCard = ({ connections, type }) => {
  return (
    <div className="    ">
      {connections.map((connection) => {
        const user = type === "connection" ? connection : connection.fromUserId;

        if (!user) return null;

        const { firstName, lastName, age, gender, skills, about, photoUrl } =
          user;

        return (
          <div
            key={connection._id}
            className="flex mx-auto my-6 h-[150px] w-[800px] border-2 shadow-2xl border-black rounded-2xl bg-[#15191E]">
            <div className="h-[150px]">
              <img
                className="py-1 mx-3 h-36 ml-2 w-36 rounded-full object-cover"
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
              />
            </div>

            <div className="ml-6 pt-1 space-y-1 w-[430px]">
              <h1 className="font-bold text-xl">
                {firstName} {lastName}
              </h1>

              <div className="flex gap-6">
                <p>
                  <span className="text-gray-400 font-semibold">Age:</span>{" "}
                  {age}
                </p>
                <p>
                  <span className="text-gray-400 font-semibold">Gender:</span>{" "}
                  {gender}
                </p>
              </div>

              <p className="line-clamp-1">
                <span className="text-gray-400 font-semibold">Skills:</span>{" "}
                {skills.join(", ")}
              </p>

              <p className="line-clamp-2">
                <span className="text-gray-400 font-semibold">About:</span>{" "}
                {about}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalCard;
