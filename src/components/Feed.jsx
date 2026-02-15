/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import InfoCard from "./InfoCard";
import Lottie from "lottie-react";
import noDataAnimation from "../assets/No-Data.json";
import loading from "../assets/loading.json";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const infoShow = useSelector((store) => store.info.show);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    // if (!feed) {
    getFeed();
    // }
  }, []);

  if (!feed) {
    return (
      <div className="flex h-screen justify-center my-auto">
        {" "}
        {/* <Lottie animationData={loading} /> */}
        <span className="loading loading-dots loading-xl "></span>
      </div>
    );
  }

  if (!Array.isArray(feed) || feed.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="w-64">
          <Lottie animationData={noDataAnimation} loop />
        </div>
        <p className=" text-gray-500">No new users found!!</p>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center mt-5">
      {infoShow && (
        <div
          className="fixed inset-0  backdrop-blur-xs 
           flex justify-center items-center z-50 transition-opacity">
          <InfoCard />
        </div>
      )}

      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
