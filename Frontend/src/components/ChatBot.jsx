// import { useState, useEffect } from "react";

// const ChatBot = () => {
//   const [open, setOpen] = useState(false);
//   const [showPopup, setShowPopup] = useState(true);

//   // Hide popup once chatbot is opened
//   const handleToggle = () => {
//     setOpen(!open);
//     setShowPopup(false);
//   };

//   return (
//     <>
//       {/* Popup Message */}
//       {showPopup && !open && (
//         <div className="fixed bottom-24 right-6 z-50 animate-bounceFade">
//           <div className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium relative">
//             Atlas here 🙌
//             {/* Little arrow */}
//             <div className="absolute -bottom-2 right-6 w-3 h-3 bg-blue-600 rotate-45"></div>
//           </div>
//         </div>
//       )}

//       {/* Chat Window */}
//       {open && (
//         <div className="fixed bottom-24 right-6 w-80 bg-white shadow-xl rounded-xl z-50 animate-slideUp">
//           <div className="bg-blue-600 text-white p-3 rounded-t-xl font-bold">
//             🤖 Atlas
//           </div>

//           <div className="p-3 h-48 text-sm text-gray-700">
//             Hi! Where do you want to travel today? 🌍
//           </div>

//           <div className="p-3 border-t flex gap-2">
//             <input
//               type="text"
//               placeholder="Ask me anything..."
//               className="flex-1 border rounded px-2 py-1 text-sm"
//             />
//             <button className="bg-blue-600 text-white px-3 rounded">
//               Send
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Chatbot Floating Button */}
//       <button
//         onClick={handleToggle}
//         className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white text-2xl z-50 hover:scale-110 transition"
//       >
//         🤖
//       </button>

//       {/* Animations */}
//       <style>
//         {`
//           .animate-slideUp {
//             animation: slideUp 0.3s ease-out;
//           }

//           .animate-bounceFade {
//             animation: bounceFade 1.5s infinite;
//           }

//           @keyframes slideUp {
//             from { transform: translateY(20px); opacity: 0; }
//             to { transform: translateY(0); opacity: 1; }
//           }

//           @keyframes bounceFade {
//             0%, 100% { transform: translateY(0); opacity: 1; }
//             50% { transform: translateY(-6px); opacity: 0.9; }
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default ChatBot;

import { useState } from "react";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! Where do you want to travel today? 🌍" },
  ]);
  const [loading, setLoading] = useState(false);
  const [maximized, setMaximized] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
    setShowPopup(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 🔹 SEND MESSAGE TO BACKEND
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Atlas is offline. Try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Popup */}
      {showPopup && !open && (
        <div className="fixed bottom-24 right-6 z-50 animate-bounceFade">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium relative">
            Atlas here 🙌
            <div className="absolute -bottom-2 right-6 w-3 h-3 bg-blue-600 rotate-45" />
          </div>
        </div>
      )}

      {/* Chat Window */}
      {open && (
        <div
          className={`fixed z-50 bg-white shadow-2xl rounded-xl flex flex-col animate-slideUp
            ${
              maximized
                ? "inset-4"
                : "bottom-24 right-6 w-[420px] h-[520px]"
            }
          `}
          style={{ resize: maximized ? "none" : "both", overflow: "hidden" }}
        >
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 rounded-t-xl font-bold flex justify-between items-center cursor-move">
            <span>🤖 Atlas</span>

            <div className="flex gap-2">
              {/* Maximize */}
              <button
                onClick={() => setMaximized(!maximized)}
                className="hover:bg-blue-500 rounded px-2"
                title="Maximize"
              >
                {maximized ? "🗗" : "🗖"}
              </button>

              {/* Close */}
              <button
                onClick={handleClose}
                className="hover:bg-red-500 rounded px-2"
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto text-sm space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[85%] ${
                  msg.role === "user"
                    ? "bg-blue-100 ml-auto text-right"
                    : "bg-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bg-gray-100 p-2 rounded-lg w-fit">
                Atlas is typing...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 border rounded px-2 py-1 text-sm"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white text-2xl z-50 hover:scale-110 transition"
      >
        🤖
      </button>

      {/* Animations */}
      <style>
        {`
          .animate-slideUp {
            animation: slideUp 0.3s ease-out;
          }
          .animate-bounceFade {
            animation: bounceFade 1.5s infinite;
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes bounceFade {
            0%, 100% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(-6px); opacity: 0.9; }
          }
        `}
      </style>
    </>
  );
};

export default ChatBot;