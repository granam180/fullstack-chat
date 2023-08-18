import React, { useState } from "react";
import axios from "axios"; // Import axios library
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import Header from "@/components/customHeader";
import StandardMessageForm from "@/components/customMessageForms/StandardMessageForm";
import Ai from "@/components/customMessageForms/Ai";
import AiCode from "@/components/customMessageForms/AiCode";
import AiAssist from "@/components/customMessageForms/AiAssist";

const Chat = ({ user, secret }) => {
  const [isTyping, setIsTyping] = useState(false); // State to track typing status

  const startTyping = async (chatId, person) => { // Accept the person parameter
    try {
      await axios.post(
        `https://api.chatengine.io/chats/${chatId}/typing/`,

        {
          headers: {
            "Project-ID": process.env.VITE_PROJECT_ID,
            "User-Name": person.username, // Use person's username
            "User-Secret": person.secret, // Use person's secret
          },
        }
      );
    } catch (error) {
      console.error("Error sending typing indicator:", error);
    }
  };

  const stopTyping = async (chatId, person) => { // Accept the person parameter
    try {
      await axios.delete(
        `https://api.chatengine.io/chats/${chatId}/typing/`,
        {
          headers: {
            "Project-ID": process.env.VITE_PROJECT_ID,
            "User-Name": person.username, // Use person's username
            "User-Secret": person.secret, // Use person's secret
          },
        }
      );
    } catch (error) {
      console.error("Error stopping typing indicator:", error);
    }
  };

  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,
    user,
    secret,
  );

  return (
    <div style={{ flexBasis: "100%" }}>
      <MultiChatSocket 
        {...chatProps}
        onIsTyping={(chatId, person) => {
          if (!isTyping) {
            setIsTyping(false);
            startTyping(chatId, person); // Pass the person object
          }
        }}
        onStopTyping={(chatId, person) => {
          if (isTyping) {
            setIsTyping(true);
            stopTyping(chatId, person); // Pass the person object
          }
        }}
      />
      {/* this is where we can customize the styling */}
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }} // take the entire height of the application
        renderChatHeader={(chat) => <Header chat={chat} />} // render the chat Header inside the MultiChatWindow
        renderMessageForm={(props) => {
          if (chatProps.chat?.title.startsWith("Ai_")) { // Chat title starts with
            return <Ai props={props} onIsTyping={chatProps.onIsTyping} activeChat={chatProps.chat} />;  // set activeChat prop
          }
          if (chatProps.chat?.title.startsWith("AiCode_")) {
            return <AiCode props={props} onIsTyping={chatProps.onIsTyping} activeChat={chatProps.chat} />;  // set activeChat prop
          }
          if (chatProps.chat?.title.startsWith("AiAssist_")) {
            return <AiAssist props={props} onIsTyping={chatProps.onIsTyping} activeChat={chatProps.chat} />;  // set activeChat prop
          }

          return (
            <StandardMessageForm props={props} onDeleteChatClick={chatProps.onDeleteChatClick} onIsTyping={chatProps.onIsTyping} activeChat={chatProps.chat} />  // set activeChat prop
          );
        }}
      />
    </div>
  );
};

export default Chat;
