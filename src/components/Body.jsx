/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const user = await axios.get(
        BASE_URL + "/profile/view",

        {
          withCredentials: true,
        },
      );

      dispatch(addUser(user.data));
      //navigate("/feed");
    } catch (err) {
      console.error(err);
      if (err.status === 401) {
        return navigate("/login");
      }
    }
  };

  useEffect(() => {
    //if (!userData) {
    fetchUser();

    //}
  }, []);
  return (
    <div>
      <NavBar />
      <div className="h-[71px]"></div>
      <Outlet />
    </div>
  );
};

export default Body;
