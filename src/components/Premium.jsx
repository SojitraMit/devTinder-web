/* eslint-disable no-unused-vars */
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import PremiumGoldAnimation from "../assets/PremiumGold.json";
import TwinkleCrowen from "../assets/TWINKLECROWN!.json";

const Premium = () => {
  const user = useSelector((store) => store.user);
  const premiumStatus = user?.membershipType || "None";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const verifyPremium = async (plan) => {
    try {
      const user = await axios.post(
        BASE_URL + "/premium/verify",
        { plan },
        { withCredentials: true },
      );
      dispatch(addUser(user.data.data));
    } catch (error) {
      console.error("Error verifying premium:", error);
    }
  };

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const handleBuyClick = async (plan) => {
    // const order = await axios.post(
    //   BASE_URL + "/payment/create",
    //   { plan },
    //   { withCredentials: true },
    // );

    const isLoaded = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );

    const options = {
      key: "rzp_test_VSdp7X3K39GwBK", // Replace with your Razorpay key_id
      amount: "50000", // Amount is in currency subunits.
      currency: "INR",
      name: "devTinder",
      description: "Test Transaction",
      // order_id: "order_IluGWxBm9U8zJ8", // This is the order_id created in the backend
      // Your success URL
      prefill: {
        name: "abc",
        email: "abc@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: function (response) {
        verifyPremium(plan);
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return premiumStatus === "Gold" ? (
    <div className="min-h-[calc(100vh-64px)] bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 rounded-3xl shadow-2xl p-6 max-w-lg w-full text-center border border-yellow-500/30">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-500/20   rounded-full">
            {/* <span className="text-5xl">👑</span> */}
            <div className="w-36 h-36">
              <Lottie animationData={TwinkleCrowen} loop />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-yellow-400 mb-3">
          Welcome to Gold Membership!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 mb-6">
          You are now a Premium Member. Enjoy exclusive features and unlock your
          full experience on devTinder.
        </p>

        {/* Benefits */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8 text-left">
          <h2 className="text-lg font-semibold mb-4 text-yellow-400">
            Your Premium Benefits:
          </h2>
          <ul className="space-y-3 text-gray-300">
            <li>✔ Unlimited profile views</li>
            <li>✔ Advanced search filters</li>
            <li>✔ Priority support</li>
            <li>✔ Profile boost visibility</li>
          </ul>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition duration-300">
          Explore Now 🚀
        </button>
      </div>
    </div>
  ) : (
    <div className="min-h-[calc(100vh-70px)] bg-gray-900 text-white flex flex-col items-center py-16 px-4">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-4">Upgrade Your Membership</h1>
      <p className="text-gray-400 mb-12 text-center max-w-xl">
        Choose the plan that fits you best and unlock premium features.
      </p>

      {/* Membership Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* Silver Plan */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-gray-500 hover:shadow-lg hover:shadow-gray-500/20 hover:scale-101 duration-300 transition-transform">
          <h2 className="text-2xl font-semibold mb-2">Silver</h2>
          <p className="text-gray-400 mb-6">For casual users</p>

          <p className="text-4xl font-bold mb-6">
            ₹199<span className="text-lg text-gray-400"> / month</span>
          </p>

          <ul className="space-y-3 text-gray-300 mb-8">
            <li className="flex items-center">
              ✔ Get Crown{" "}
              <div className="h-8 w-8">
                <Lottie animationData={TwinkleCrowen} />
              </div>
            </li>
            <li>✔ View more profiles</li>
            <li>✔ Limited premium filters</li>
          </ul>

          <button
            className="w-full py-3 rounded-xl bg-gray-600 hover:bg-gray-500 transition font-semibold"
            onClick={() => handleBuyClick("Silver")}>
            {premiumStatus === "Silver" ? "Already Silver" : "Choose Silver"}
          </button>
        </div>

        {/* Gold Plan */}
        <div className="bg-gradient-to-b from-yellow-500/20 to-gray-800 rounded-2xl p-8 border border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/20 transition relative hover:scale-101 duration-300">
          {/* Badge */}
          <span className="absolute top-4 right-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
            MOST POPULAR
          </span>

          <h2 className="text-2xl font-semibold mb-2 text-yellow-400">Gold</h2>
          <p className="text-gray-400 mb-6">For power users</p>

          <p className="text-4xl font-bold mb-6 text-yellow-400">
            ₹399<span className="text-lg text-gray-400"> / month</span>
          </p>

          <ul className="space-y-3 text-gray-300 mb-8">
            <li className="flex items-center">
              ✔ Get Crown{" "}
              <div className="h-8 w-8">
                <Lottie animationData={TwinkleCrowen} />
              </div>
            </li>
            <li>✔ Unlock Chat option </li>
            <li>✔ Unlimited profile views</li>
            <li>✔ Priority support</li>
          </ul>

          <button
            className="paypal-button-container w-full py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black transition font-semibold"
            onClick={() => handleBuyClick("Gold")}>
            {premiumStatus === "Silver" ? "Upgrade to Gold" : "Choose Gold"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
