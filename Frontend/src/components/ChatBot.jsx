// import { useState } from "react";

// const ChatBot = () => {
//     const [open, setOpen] = useState(false);
    

//   return (
//     <>
//       {/* Chat Window */}
//       {open && (
//         <div className="fixed bottom-24 right-6 w-80 bg-white shadow-xl rounded-xl z-50">
//           <div className="bg-blue-600 text-white p-3 rounded-t-xl font-bold">
//             Atlas 🤖
//           </div>

//           <div className="p-3 h-48 overflow-y-auto text-sm text-gray-700">
//             <p className="bg-gray-100 p-2 rounded mb-2">
//               Hi 👋 I’m Atlas!  
//               Tell me where you want to travel 🌍
//             </p>
//           </div>

//           <div className="p-3 border-t flex gap-2">
//             <input
//               type="text"
//               placeholder="Type your message..."
//               className="flex-1 border rounded px-2 py-1 text-sm"
//             />
//             <button className="bg-blue-600 text-white px-3 rounded">
//               Send
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Floating Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white text-2xl z-50"
//       >
//         🤖
//       </button>
      
//     </>
//   );
// };

// export default ChatBot;
import { useState, useEffect } from "react";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  // Hide popup once chatbot is opened
  const handleToggle = () => {
    setOpen(!open);
    setShowPopup(false);
  };

  return (
    <>
      {/* Popup Message */}
      {showPopup && !open && (
        <div className="fixed bottom-24 right-6 z-50 animate-bounceFade">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium relative">
            Atlas here 🙌
            {/* Little arrow */}
            <div className="absolute -bottom-2 right-6 w-3 h-3 bg-blue-600 rotate-45"></div>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white shadow-xl rounded-xl z-50 animate-slideUp">
          <div className="bg-blue-600 text-white p-3 rounded-t-xl font-bold">
            🤖 Atlas
          </div>

          <div className="p-3 h-48 text-sm text-gray-700">
            Hi! Where do you want to travel today? 🌍
          </div>

          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Ask me anything..."
              className="flex-1 border rounded px-2 py-1 text-sm"
            />
            <button className="bg-blue-600 text-white px-3 rounded">
              Send
            </button>
          </div>
        </div>
      )}

      {/* Chatbot Floating Button */}
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
