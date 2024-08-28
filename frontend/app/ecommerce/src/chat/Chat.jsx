import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useAuth } from "../../../common/auth/hook/useAuth";
import { getMessages } from "../services/chat/getMessage";
import { createMessage } from "../services/chat/createMessage";
import { getUsers } from "../../../common/services/users";

// Configura el socket fuera del componente para evitar crear múltiples conexiones.
const socketURL = import.meta.env.PROD ? 'https://www.silouso.shop' : 'http://localhost:8080';
const socket = io(socketURL, { withCredentials: true });

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [users, setUsers] = useState([]);
  const { decodedToken } = useAuth();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Unirse al chat usando el ID del usuario
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

    // Escuchar el evento "chatMessage"
    socket.on("chatMessage", (message) => {
      setMessages((prevMessages) => {
        // Asegurarse de que el mensaje no se duplique
        if (!prevMessages.some((msg) => msg._id === message._id)) {
          return [...prevMessages, message];
        }
        return prevMessages;
      });
    });

    // Limpieza al desmontar el componente
    return () => {
      socket.off("chatMessage");
    };
  }, [decodedToken.user.id]);

  useEffect(() => {
    // Hacer scroll hacia el final del contenedor de mensajes
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
      // Emitir el evento con el mensaje guardado
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

  const isUserOnline = (lastConnection) => {
    const now = new Date();
    const lastConnectionDate = new Date(lastConnection);

    // Verifica si la última conexión fue hoy
    return now.toDateString() === lastConnectionDate.toDateString();
  };

  return (
    <div className="flex h-[500px] mt-5">
      <div className="w-1/5 p-4 bg-gray-100 border-r border-gray-300">
        <h1 className="text-lg font-bold mb-4">Usuarios</h1>
        <ul>
          {users.map((userItem) => (
            <li key={userItem._id} style={{ cursor: "pointer" }} className="flex items-center mb-2">
              <span
                className="inline-block w-2 h-2 rounded-full mr-2"
                style={{
                  backgroundColor: isUserOnline(userItem.last_connection) ? "green" : "gray",
                }}
                title={isUserOnline(userItem.last_connection) ? "En línea" : "Desconectado"}
              />
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
          {/* Referencia para el último mensaje */}
          <div ref={messagesEndRef} />
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
