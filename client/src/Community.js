import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import io from "socket.io-client"; // Import socket.io-client

// Example country list
const countries = ["Manipal", "Mangaluru", "Bangaluru", "Coorg", "Mumbai", "Goa"];

// Backend API base URL
const API_BASE_URL = "http://localhost:3002/api";

let socket;

function Community() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch messages from the backend
  const fetchMessages = async (country) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/messages?country=${country}`);
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError(err.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  // Post new message to the backend
  const postMessage = async (newMessage) => {
    try {
      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (err) {
      setError(err.message || "Failed to send message");
    }
  };

  // Handle message submit
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const newMessage = {
        text: message,
        user: "You", // Replace with actual authenticated user
        country: selectedCountry,
        timestamp: new Date().toISOString(),
      };

      await postMessage(newMessage);
      setMessage(""); // Clear input field
    }
  };

  // Fetch messages when the selected country changes
  useEffect(() => {
    fetchMessages(selectedCountry);
  }, [selectedCountry]);

  // Socket.io real-time updates
  useEffect(() => {
    // Connect to the socket server
    socket = io(API_BASE_URL.replace("/api", ""));

    // Listen for incoming messages
    socket.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex h-screen pt-4">
      {/* Dropdown for Country Selection */}
      <div className="w-1/4 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-semibold mb-4">Select Location</h2>
        <select
          className="w-full p-3 rounded-md bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-gray-900 text-white flex flex-col">
        <header className="bg-gray-700 p-4 text-center text-2xl font-semibold shadow-lg">
          Chatting with locals in {selectedCountry}
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {loading ? (
            <div>Loading messages...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : messages.length === 0 ? (
            <div className="text-red-500">No messages found</div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 ${msg.user === "You" ? "justify-end" : ""}`}
              >
                {msg.user !== "You" && (
                  <FaUserCircle className="text-3xl text-gray-400" />
                )}
                <div
                  className={`p-3 rounded-lg max-w-md ${
                    msg.user === "You" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-100"
                  }`}
                >
                  <div className="font-bold">{msg.user}</div>
                  <div>{msg.text}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(msg.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Input Box */}
        <form onSubmit={handleMessageSubmit} className="bg-gray-700 p-4">
          <textarea
            className="w-full p-3 bg-gray-600 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
          ></textarea>
          <button
            type="submit"
            className="w-full mt-3 bg-blue-500 p-3 text-white rounded-md hover:bg-blue-400 focus:outline-none"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Community;
