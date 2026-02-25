/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import Lottie from "lottie-react";
import errorJSON from "../assets/error.json";
import { time } from "framer-motion";
export default function Chat() {
  const [error, setError] = useState(null);
  const { targetUserId } = useParams();
  const [senderName, setSenderName] = useState("");
  const [senderPhotoUrl, setSenderPhotoUrl] = useState("");
  const chatContainerRef = useRef(null);
  const bottomRef = useRef(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;

  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName,
      userId,
      targetUserId,
      text: input,
    });
    setInput("");
  };

  const fetchChatMessages = async () => {
    try {
      const res = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      res.data.participates.forEach((participant) => {
        if (participant._id === targetUserId) {
          setSenderName(participant.firstName + " " + participant.lastName);
          setSenderPhotoUrl(participant.photoUrl);
        }
      });
      const chatMessages = res.data.message.map((msg) => {
        return {
          firstName: msg.senderId.firstName,
          text: msg.text,
          time: msg.createdAt,
        };
      });
      setMessages(chatMessages);
    } catch (error) {
      setError(error.response?.data.error || "Error fetching chat messages");
      console.error("Error fetching chat messages:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchChatMessages();
  }, []);

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on("messageRecived", ({ firstName, text }) => {
      setMessages((messages) => [
        ...messages,
        { firstName, text, time: new Date() },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (bottomRef.current) {
      try {
        bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      } catch (err) {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      }
    }
  }, [messages]);

  return error ? (
    <div className="min-h-[calc(100vh-74px)]  bg-black text-white flex  justify-center">
      <div className="bg-black h-[600px] w-[900px] mx-auto overflow-hidden">
        <Lottie animationData={errorJSON} />
        <p className="text-xl mx-auto">{error}</p>
      </div>
    </div>
  ) : (
    <div className="min-h-[calc(100vh-74px)] bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="fixed right-0 left-0 z-10 h-16 flex items-center px-6 border-b border-gray-700 bg-gray-800">
        <div className="w-10 h-10 rounded-full object-cover overflow-hidden bg-white flex items-center justify-center font-bold">
          {/* {senderName?.slice(0, 1).toUpperCase()} */}
          <img alt="profile" src={senderPhotoUrl} />
        </div>
        <h2 className="ml-4 text-lg font-semibold">{senderName}</h2>
      </div>

      {/* Messages Area */}
      <div
        className="flex-1 overflow-y-auto scroll-auto mt-16   p-6 space-y-4"
        ref={chatContainerRef}>
        {messages?.map((msg, index) => {
          return msg.firstName !== firstName ? (
            <div key={index} className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    className="bg-white"
                    alt="profile"
                    src={senderPhotoUrl}
                  />
                </div>
              </div>
              <div className="chat-header">
                {msg.firstName}
                <time className="text-xs opacity-50 ml-2">
                  {new Date(msg.time).toLocaleTimeString()}
                </time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          ) : (
            <div key={index} className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img className="bg-white" alt="profile" src={user.photoUrl} />
                </div>
              </div>
              <div className="chat-header">
                You
                <time className="text-xs opacity-50 ml-2">
                  {new Date(msg.time).toLocaleTimeString()}
                </time>
              </div>
              <div className="chat-bubble bg-indigo-500 text-white">
                {msg.text}
              </div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
        <div className="h-8"></div>
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 h-16 border-t border-gray-700 bg-gray-800 flex items-center px-4 gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-gray-700 px-4 py-2 rounded-lg focus:outline-none"
        />
        <button
          className="bg-indigo-500 px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-600"
          onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
