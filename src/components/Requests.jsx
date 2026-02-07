import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import HorizontalCard from "./HorizontalCard";
import InfoCard from "./InfoCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const infoShow = useSelector((store) => store.info.show);
  const infoData = useSelector((store) => store.info.data);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err.responce.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests)
    return (
      <div className="flex h-screen justify-center my-auto">
        {" "}
        <span className="loading loading-dots loading-xl "></span>
      </div>
    );

  if (requests.length === 0)
    return (
      <div className="flex h-screen justify-center my-auto">
        {" "}
        <span className="my-auto">No Requests Found!!</span>
      </div>
    );

  return (
    <div className="min-h-screen   p-6  mx-auto">
      {infoShow && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm
               flex justify-center items-center z-40 ">
          {!infoData ? (
            <span className="loading loading-bars loading-xl text-white"></span>
          ) : (
            <InfoCard />
          )}
        </div>
      )}

      <h1 className="text-3xl  font-bold text-indigo-400 mb-8  flex justify-center">
        Requests
      </h1>
      <HorizontalCard connections={requests} type="request" />
    </div>
  );
};

export default Requests;
