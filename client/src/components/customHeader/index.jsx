import React from "react";
import { ChatBubbleLeftRightIcon, PhoneIcon } from "@heroicons/react/24/solid";

const CustomerHeader = ({ chat }) => {
  // console.log("🚀 CustomerHeader ~ chat:", chat)
  return (
    <div className="chat-header">
      <div className="flexbetween">
        <ChatBubbleLeftRightIcon className="icon-chat" />
        <h3 className="header-text">{chat.title}</h3>
      </div>
      <div className="flexbetween">
        <PhoneIcon className="icon-phone" />
        {chat.description !== "⬅️ ⬅️ ⬅️" ? (
          <p className="header-text">
            Active {""}
              {new Date().toLocaleString("en-US", {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true, 
                  timeZone: "America/New_York",            
                })}
          </p>
        ) : (
          <p className="header-text">no chat selected</p>
        )}
      </div>
    </div>
  );
};

export default CustomerHeader;
