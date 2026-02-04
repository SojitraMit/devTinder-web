import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestSlice";

const HorizontalCard = ({ connections, type }) => {
  const isConnection = type === "connection";
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="    ">
      {connections.map((connection) => {
        const _id = connection._id;
        const user = isConnection ? connection : connection.fromUserId;

        if (!user) return null;

        const { firstName, lastName, age, gender, skills, about, photoUrl } =
          user;

        return (
          <div
            key={connection._id}
            className="flex mx-auto my-6 h-[150px] w-[800px] hover:shadow-cyan-700/40 border-2 shadow-2xl border-black rounded-2xl bg-[#15191E]">
            <div className="h-[150px]">
              <img
                className="py-1 mx-3 h-36 ml-2 w-36  rounded-full object-cover"
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
            {isConnection ? (
              <div className="text-center flex-row space-y-4  my-auto  p-6">
                {" "}
                <button className="btn btn-outline hover:shadow-gray-500 hover:bg-gray-500">
                  More Info
                </button>
              </div>
            ) : (
              <div className="text-center flex-row space-y-4  my-auto  p-6">
                <button className="btn btn-outline hover:bg-gray-500">
                  More Info
                </button>
                <br></br>
                <div className="flex gap-2">
                  {" "}
                  <button
                    className="btn btn-outline btn-success"
                    onClick={() => reviewRequest("accepted", _id)}>
                    Accept
                  </button>
                  <button className="btn btn-outline  btn-error">Reject</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalCard;
