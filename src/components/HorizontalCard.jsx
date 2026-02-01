import React from "react";

const HorizontalCard = ({ connections }) => {
  return (
    <div className="    ">
      {connections.map((connection) => (
        <div
          key={connection._id}
          className="flex mx-auto my-4 h-[150px] w-[800px] border-2 shadow-2xl border-[#000000] rounded-2xl border- bg-[#15191E]">
          <div className=" h-[150px]">
            <img
              className="py-1 mx-3 h-36 ml-2 w-36 rounded-full object-cover "
              src={connection.photoUrl}
            />
          </div>
          <div className="ml-6 pt-1 space-y-1 w-[430px]">
            <h1 className="font-bold text-xl">
              {connection.firstName} {connection.lastName}
            </h1>
            <p className="flex gap-6">
              <p>
                <span className="text-gray-400 font-semibold">Age : </span>{" "}
                {connection?.age}
              </p>
              <p>
                <span className="text-gray-400 font-semibold">Gender : </span>{" "}
                {connection?.gender}
              </p>
            </p>
            {connection.skills && (
              <p>
                <p className=" line-clamp-1 ">
                  <span className="text-gray-400 font-semibold">Skills : </span>

                  <span className=" w-96">{connection.skills.join(", ")}</span>
                </p>{" "}
              </p>
            )}
            <p className="line-clamp-2">
              <span className="text-gray-400 font-semibold">About : </span>
              <span>{connection.about}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HorizontalCard;
