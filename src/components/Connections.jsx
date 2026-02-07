/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import HorizontalCard from "./HorizontalCard";
import InfoCard from "./InfoCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const infoData = useSelector((store) => store.info.data);
  const infoShow = useSelector((store) => store.info.show);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

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
  if (connections.length === 0)
    return (
      <h1 className="flex justify-center h-screen items-center">
        No connections found
      </h1>
    );
  return (
    <div className="min-h-screen   m-6  mx-auto">
      {infoShow && (
        <div
          className="fixed inset-0  backdrop-blur-xs 
           flex justify-center items-center z-50 transition-opacity">
          {!infoData ? (
            <span className="loading loading-bars loading-xl"></span>
          ) : (
            <InfoCard />
          )}
        </div>
      )}
      <h1
        className="text-3xl  font-bold mb-8 text-indigo-400
   flex justify-center">
        Your Connections
      </h1>

      <HorizontalCard connections={connections} type="connection" />
    </div>
  );
};

export default Connections;
