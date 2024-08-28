import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "../../../common/auth/hook/useAuth";
import { getMessages } from "../services/chat/getMessage";
import { createMessage } from "../services/chat/createMessage";
import { getUsers } from "../../../common/services/users";

const socketURL = import.meta.env.PROD ? import.meta.env.VITE_SOCKET_URL_PROD : import.meta.env.VITE_SOCKET_URL;

const socket = io(socketURL);

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [users, setUsers] = useState([]);
  const { decodedToken } = useAuth();
console.log(users);
  useEffect(() => {
    socket.emit("joinChat", decodedToken.user.id);

    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getMessages();
        if (Array.isArray(fetchedMessages)) {
          setMessages(fetchedMessages);
        } else {
          console.error("API response is not an array of messages:", fetchedMessages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        // Asumiendo que `response` tiene la forma { users: Array }
        if (response && Array.isArray(response.users)) {
          setUsers(response.users);
        } else {
          console.error("API response is not in the expected format:", response);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    

    fetchMessages();
    fetchUsers();

    socket.on("chatMessage", (message) => {
      setMessages((prevMessages) => {
        if (!prevMessages.some((msg) => msg._id === message._id)) {
          return [...prevMessages, message];
        }
        return prevMessages;
      });
    });

    return () => {
      socket.off("chatMessage");
    };
  }, [decodedToken.user.id]);

  const sendMessage = async () => {
    if (message.trim() === "" || sending) return;

    setSending(true);
    const messageData = {
      sender: decodedToken.user.id,
      message: message.trim(),
      timestamp: new Date(),
    };

    try {
      const savedMessage = await createMessage(messageData);
      setMessage("");
      socket.emit("chatMessage", savedMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const getSenderName = (senderId) => {
    const sender = users.find((user) => user._id === senderId);
    return sender ? sender.first_name : "Desconocido";
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/5 p-4">
        <h1 className="text-lg font-bold mb-4">Usuarios</h1>
        <ul>
          {users.map((userItem) => (
            <li key={userItem._id} style={{ cursor: "pointer" }}>
              <span
                className="inline-block w-2 h-2 rounded-full mr-2"
                style={{
                  backgroundColor: userItem.online ? "green" : "gray",
                }}
              ></span>
              {userItem.first_name}
            </li>
          ))}
        </ul>
      </div>
      <article className="w-3/4 p-4">
        <header>
          <h1 className="text-lg font-bold mb-4">Chat</h1>
        </header>
        <div className="chat-messages mb-2 h-4/6 overflow-auto">
          {messages.map((msg) => (
            <p
              key={msg._id}
              className={`mb-2 p-2 rounded-lg max-w-2/3 ${msg.sender === decodedToken.user.id ? 'bg-[#61005D]/40 self-end' : 'bg-white self-start'}`}
            >
              <strong>{getSenderName(msg.sender)}: </strong>
              {msg.message}
            </p>
          ))}
        </div>
        <div className="chat-input flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full rounded-xl p-2 border border-[#61005D]"
            disabled={sending}
            placeholder="Escribe un mensaje..."
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-[#61005D] text-white rounded-xl"
            disabled={sending}
          >
            Enviar
          </button>
        </div>
      </article>
    </div>
  );
};

export default Chat;
