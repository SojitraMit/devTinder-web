import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";

export default function Chat() {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;

  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");

  useEffect(() => {
    console.log(user);
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on("messageRecived", ({ firstName, text }) => {
      console.log(firstName + ":" + text);
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

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

  return (
    <div className="min-h-[calc(100vh-74px)] bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="h-16 flex items-center px-6 border-b border-gray-700 bg-gray-800">
        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold">
          {targetUserId?.slice(0, 2).toUpperCase()}
        </div>
        <h2 className="ml-4 text-lg font-semibold">{targetUserId}</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages?.map((msg, index) => {
          return msg.firstName !== firstName ? (
            <div key={index} className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="profile"
                    src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                {msg.firstName}
                <time className="text-xs opacity-50 ml-2">12:45</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          ) : (
            <div key={index} className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="profile"
                    src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                You
                <time className="text-xs opacity-50 ml-2">12:46</time>
              </div>
              <div className="chat-bubble bg-indigo-500 text-white">
                {msg.text}
              </div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="h-16 border-t border-gray-700 bg-gray-800 flex items-center px-4 gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-gray-700 px-4 py-2 rounded-lg focus:outline-none"
        />
        <button
          className="bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600"
          onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
