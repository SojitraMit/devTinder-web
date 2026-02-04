import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import HorizontalCard from "./HorizontalCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
      console.log(res.data.data);
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
      <h1 className="text-3xl  font-bold text-[#67E8F9] mb-8  flex justify-center">
        Requests
      </h1>
      <HorizontalCard connections={requests} type="request" />
    </div>
  );
};

export default Requests;
