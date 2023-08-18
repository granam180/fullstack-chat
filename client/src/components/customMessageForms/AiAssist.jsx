import { usePostAiAssistMutation } from "@/state/api";
import React, { useEffect, useState } from "react";
import MessageFormUI from "./MessageFormUI";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // const formatCustomTimezone = (date) => {
  //   const month = date.getMonth() + 1;
  //   const day = date.getDate();
  //   const year = date.getFullYear();
  //   const hour = date.getHours();
  //   const minute = date.getMinutes();
  
  //   const meridian = hour >= 12 ? "PM" : "AM";
  //   const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  
  //   const formattedDate = `${month}/${day}/${year}`;
  //   const formattedTime = `${formattedHour}:${minute} ${meridian}`;
  
  //   return `${formattedDate} ${formattedTime}`;
  // };
  
  // Custom Date() testing
  // const date = new Date();
  // const formattedDateTime = formatCustomTimezone(date);
  // console.log("🚀 StandardMessageForm ~ formattedDateTime:", formattedDateTime)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // trigger useEffect anytime these values change

  return debouncedValue;
}

const AiAssist = ({ props, activeChat }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [triggerAssist, resultAssist] = usePostAiAssistMutation();
  const [appendText, setAppendText] = useState("");

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = async () => {
    // const date = new Date()
    //   .toISOString()
    //   .replace("T", " ")
    //   .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);   
        // Get the current date and time
    const currentDate = new Date();

    // Create a new date object with the desired timezone offset
    // Note: This example uses a timezone offset of -4 hours (America/New_York)
    const timezoneOffset = -4 * 60; // Offset in minutes
    const adjustedDate = new Date(currentDate.getTime() + timezoneOffset * 60 * 1000);

    // Convert the adjusted date to an ISO string
    const isoDate = adjustedDate.toISOString();
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    const form = {
      attachments: at,
      created: isoDate,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    props.onSubmit(form);
    setMessage("");
    setAttachment("");
  };

  const debouncedValue = useDebounce(message, 1000);

  useEffect(() => {
    if (debouncedValue) { // once there is a debouned value
      const form = { text: message };
      triggerAssist(form); // make an api call
    }
  }, [debouncedValue]); // eslint-disable-line

  // handler to fire the message enter & tabs onKeyDown event
  const handleKeyDown = (e) => {
    // handle enter and tab
    if (e.keyCode === 9 || e.keyCode === 13) {
      e.preventDefault();
      setMessage(`${message} ${appendText}`);
    }
    setAppendText(""); // clear out the text
  };

  // DEBOUNCING
  useEffect(() => {
    if (resultAssist.data?.text) {
      setAppendText(resultAssist.data?.text); // set text to append
      
    }
  }, [resultAssist]); // eslint-disable-line

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      appendText={appendText}
      handleKeyDown={handleKeyDown}
    />
  );
};

export default AiAssist;
