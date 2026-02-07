/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import InfoCard from "./InfoCard";

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
        <span className="loading loading-dots loading-xl "></span>
      </div>
    );
  }

  if (!Array.isArray(feed) || feed.length === 0) {
    return (
      <p className=" flex justify-center h-screen items-center ">
        No New Users found!!
      </p>
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
