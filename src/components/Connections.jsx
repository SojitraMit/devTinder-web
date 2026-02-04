/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import HorizontalCard from "./HorizontalCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err.response.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections)
    return (
      <div className="flex h-screen justify-center my-auto">
        {" "}
        <span className="loading loading-dots loading-xl "></span>
      </div>
    );
  if (connections.length === 0) return <h1>No connections found</h1>;
  return (
    <div className="min-h-screen   p-6  mx-auto">
      <h1 className="text-3xl  font-bold  text-[#67E8F9]  mb-8     flex justify-center">
        Your Connections
      </h1>

      <HorizontalCard connections={connections} type="connection" />
    </div>
  );
};

export default Connections;
