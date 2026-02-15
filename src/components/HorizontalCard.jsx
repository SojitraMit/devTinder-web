import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestSlice";
import Lottie from "lottie-react";
import TwinkleCrown from "../assets/TWINKLECROWN!.json";
import { addInfo, addShow } from "../utils/infoSlice";
import chat from "../assets/Chat.json";
import { useNavigate } from "react-router-dom";

const HorizontalCard = ({ connections, type }) => {
  const isConnection = type === "connection";

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="    ">
      {connections.map((connection) => {
        console.log(connection);
        const connectionId = connection._id;
        const user = isConnection ? connection : connection.fromUserId;

        if (!user) return null;

        const {
          firstName,
          lastName,
          age,
          gender,
          skills,
          about,
          photoUrl,
          _id,
          isPremium,
        } = user;

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
              <h1 className="flex font-bold text-xl">
                {firstName} {lastName}
                {isPremium && (
                  <div className="w-8 h-8 ">
                    <Lottie
                      animationData={TwinkleCrown}
                      loop
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                )}
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
              <div className="text-center  flex-row space-y-4  my-auto  p-6">
                {" "}
                <button
                  className="btn btn-outline hover:shadow-gray-500 hover:bg-gray-500 rounded-xl"
                  onClick={() => fetchUserInfo(_id)}>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACQklEQVR4AbSVOy8EURiGz/odroXErSCCREVDokbp0rglJFRU1h8gIUg0aFET29hKgogt3BKF3VD4F+t5Z2dmZ3bmbGYj5H2d73y39+zsd3bqzD//JRYoFovdcAemYVvScyUSoOEiDZ/gOJyGb64PszpiBSgegTqpeEyLA3ieSqUaYItseEDOGVSO2I8vgogABTdkXcNNl32sOzSeZHXg2ntseqCXd+fW4iojJECCTjFEeJgmHrow1vCFgG8FtkIHBIfhED1GWH2EBPCOQUNFVmstDNQMBusqBYKxiM3ppuFUJFDFUSnQQe4jtGGdwAa04YVAE/ThC3CyNN4JeARt+CEgssQig3eGXhprTGMcARxqrGk45FlWE3CKbP+o1TCcE9cId7OWBDA0OXkSlrD/BHponL9pogvpC7BPhGayGmFiOI+IbI1lM49KN5atFbpc+9YoAXqcsdTDU1j6BHwsPbctHIskzLHGgrxtMTaIk9ptFn2fS+TlsEsCMnBoiiRkFaBBAeaVb6Fu8Qm9Dr2494i8/StGL7ThioB+p1hi0Ym3AH1UCviBOIOTLcD5uJjNVylwqUQew4zWWhiouQ3WhQQ43T1BTdQxBR6eMfTlESoD3y78gA6I6L2RpYduM9sSQgJykaCf3VFsTZX4gL1KF40fpjGuvcxGbznliANuLe4yIgIKkZiBaZez+HTDJ2j8BT/Ze6M46eYoV5+eUBixAuEUo/eDxk5vrwtjjC5QO43lY1sdiQTUgoY5uAp12nf5kvAXAAD//19XWDQAAAAGSURBVAMAY1PeMb9uS8EAAAAASUVORK5CYII="
                    alt="icon"
                  />
                  More Info
                </button>
                <div>
                  <button
                    className="px-3  rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 
                   text-white font-semibold shadow-lg 
                   hover:from-cyan-600 hover:to-blue-700 
                   hover:shadow-cyan-500/40 
                   hover:scale-105 cursor-pointer 
                   transition-all duration-300 ease-in-out flex justify-center mx-auto pr-5"
                    onClick={() => navigate(`/chat/${_id}`)}>
                    <div className="h-10 w-10 ">
                      <Lottie animationData={chat} autoPlay loop />
                    </div>
                    <div className="my-auto">Chat</div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center flex-row space-y-4  my-auto  p-6">
                <button
                  className="btn btn-outline hover:bg-gray-500 px-2"
                  onClick={() => fetchUserInfo(_id)}>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACQklEQVR4AbSVOy8EURiGz/odroXErSCCREVDokbp0rglJFRU1h8gIUg0aFET29hKgogt3BKF3VD4F+t5Z2dmZ3bmbGYj5H2d73y39+zsd3bqzD//JRYoFovdcAemYVvScyUSoOEiDZ/gOJyGb64PszpiBSgegTqpeEyLA3ieSqUaYItseEDOGVSO2I8vgogABTdkXcNNl32sOzSeZHXg2ntseqCXd+fW4iojJECCTjFEeJgmHrow1vCFgG8FtkIHBIfhED1GWH2EBPCOQUNFVmstDNQMBusqBYKxiM3ppuFUJFDFUSnQQe4jtGGdwAa04YVAE/ThC3CyNN4JeARt+CEgssQig3eGXhprTGMcARxqrGk45FlWE3CKbP+o1TCcE9cId7OWBDA0OXkSlrD/BHponL9pogvpC7BPhGayGmFiOI+IbI1lM49KN5atFbpc+9YoAXqcsdTDU1j6BHwsPbctHIskzLHGgrxtMTaIk9ptFn2fS+TlsEsCMnBoiiRkFaBBAeaVb6Fu8Qm9Dr2494i8/StGL7ThioB+p1hi0Ym3AH1UCviBOIOTLcD5uJjNVylwqUQew4zWWhiouQ3WhQQ43T1BTdQxBR6eMfTlESoD3y78gA6I6L2RpYduM9sSQgJykaCf3VFsTZX4gL1KF40fpjGuvcxGbznliANuLe4yIgIKkZiBaZez+HTDJ2j8BT/Ze6M46eYoV5+eUBixAuEUo/eDxk5vrwtjjC5QO43lY1sdiQTUgoY5uAp12nf5kvAXAAD//19XWDQAAAAGSURBVAMAY1PeMb9uS8EAAAAASUVORK5CYII="
                    alt="icon"
                  />
                  More Info
                </button>
                <br></br>
                <div className="flex gap-2">
                  {" "}
                  <button
                    className="btn btn-outline btn-success  "
                    onClick={() => reviewRequest("accepted", connectionId)}>
                    Accept
                  </button>
                  <button
                    className="btn btn-outline  btn-error"
                    onClick={() => reviewRequest("rejected", connectionId)}>
                    Reject
                  </button>
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
