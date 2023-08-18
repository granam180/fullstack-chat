import { usePostAiCodeMutation } from "@/state/api";
import React, { useState } from "react";
import MessageFormUI from "./MessageFormUI";

const AiCode = ({ props, activeChat }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [triggerCode] = usePostAiCodeMutation();

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = async () => {
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
    triggerCode(form);
    setMessage("");
    setAttachment("");
  };

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default AiCode;
