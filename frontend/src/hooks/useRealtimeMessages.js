import { useEffect, useRef, useState } from "react";

const API_URL = "http://localhost:4000/api/messages";

export const useRealtimeMessages = (user, onNewMessage, onMessageUpdate) => {
  const [connected, setConnected] = useState(false);
  const eventSourceRef = useRef(null);

  useEffect(() => {
    if (!user?.token) return;

    // Create SSE connection with token as query param (EventSource doesn't support headers)
    const eventSource = new EventSource(`${API_URL}/sse?token=${user.token}`);

    eventSource.onopen = () => {
      console.log("SSE connection established");
      setConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case "connected":
            console.log("SSE connected for user:", data.userId);
            break;

          case "new_message":
            if (onNewMessage) {
              onNewMessage(data.message);
            }
            break;

          case "message_edited":
            if (onMessageUpdate) {
              onMessageUpdate("edited", data.message);
            }
            break;

          case "message_deleted":
            if (onMessageUpdate) {
              onMessageUpdate("deleted", data.messageId);
            }
            break;

          case "messages_read":
            if (onMessageUpdate) {
              onMessageUpdate("read", data.readBy);
            }
            break;

          default:
            console.log("Unknown SSE event type:", data.type);
        }
      } catch (error) {
        console.error("Error parsing SSE message:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      setConnected(false);
      eventSource.close();
    };

    eventSourceRef.current = eventSource;

    // Cleanup on unmount
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        setConnected(false);
      }
    };
  }, [user, onNewMessage, onMessageUpdate]);

  return { connected };
};