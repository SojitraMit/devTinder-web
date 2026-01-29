/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log(res);
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
  if (!Array.isArray(feed) || feed.length === 0) {
    return <p className="text-center mt-10">No users found</p>;
  }
  return (
    <div className="flex justify-center items-center mt-5">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
