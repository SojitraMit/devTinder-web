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

  if (!connections) return null;
  if (connections.length === 0) return <h1>No connections found</h1>;
  return (
    <div className="min-h-screen   p-6  mx-auto">
      <h1 className="text-2xl font-semibold text-white mb-6 flex justify-center">
        Your Connections
      </h1>

      <HorizontalCard connections={connections} />
    </div>
  );
};

export default Connections;
