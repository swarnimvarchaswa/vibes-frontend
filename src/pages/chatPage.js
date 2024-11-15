// import React, { useRef, useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import SendIcon from "../Icons/SendIcon";
// import Verification from "../Icons/VerificationfillIcon";
// import moment from "moment"; // Import moment.js
// // import { toast } from "react-toastify";
// import { useSocket } from "../context/socketContext";

// function formatTimestamp(timestamp) {
//   if (!timestamp) {
//     return moment().format("h:mm a");
//   }
//   return moment(timestamp).format("h:mm a");
// }

// export default function ChatBox() {
//   const { chatId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [loggedInUserId, setLoggedInUserId] = useState(null);
//   const [otherUserName, setOtherUserName] = useState("");
//   const [otherUserProfilePic, setOtherUserProfilePic] = useState("");
//   const [otherUserId, setOtherUserId] = useState(null);
//   const [otherUserStatus, setOtherUserStatus] = useState("");
//   const [onlineStatus, setOnlineStatus] = useState({});
//   const [isOnline, setIsOnline] = useState(false);
//   const [chats, setChats] = useState([]);
//   const [verify, setVerify] = useState("")

//   const [newMessage, setNewMessage] = useState([]);
//   const chatContainerRef = useRef(null);
//   const { socket, setIsNewMessage, isNewMessage } = useSocket();

//   // const notifyB = (msg) => toast.success(msg);

// //   useEffect(() => {
// //     fetch(`http://localhost:5000/messageRead/${chatId}`, {
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: "Bearer " + localStorage.getItem("jwt"),
// //       },
// //     })
// //       .then((response) => {
// //         if (!response.ok) {
// //           throw new Error("Network response was not ok");
// //         }
// //         // You can perform any other handling here if needed
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching messages:", error);
// //       });
// //   }, [chatId]);

//   useEffect(() => {
//     // Join the chat room with the chatId
//     // socket.emit("join chat", chatId);

//     socket.emit("join chat", chatId);
//     // console.log(socket)
//     // console.log(socket.connected)

//     // Listen for incoming messages
//     socket.on("message received", (newMessageReceived) => {
//       // console.log(
//       //   "Received message:",
//       //   newMessageReceived.content,
//       // );
//       // console.log("chat iddd:", chatId);

//       if (newMessageReceived.chat._id !== chatId) {
//         setIsNewMessage(true);
//         // console.log("other user text me");
//         // console.log("try is here if falseeeee", socket.connected)
//         // alert(newMessageReceived.content)
//       }
//       setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
//       // console.log("try is here", socket.connected)
//     });

//     socket.on("getOnlineUser", (data) => {
//       // console.log("online data", data.user_id);
//       // console.log("other user id", otherUserId);

//       if (otherUserId === data.user_id) {
//         setTimeout(() => {
//           setIsOnline(true);
//         }, 2000);
//       }
//       //   console.log("other user id", otherUserId)
//       //   if (otherUserId === data.user_id) {
//       //     setOnlineStatus(true)
//       //     return {
//       //       isOnline: true,
//       //     }
//       //   }
//     });
//     socket.on("getOfflineUser", (data) => {
//       if (otherUserId === data.user_id) {
//         // Delay the execution by 1 second
//         setTimeout(() => {
//           setIsOnline(false);
//           setOtherUserStatus(false);
//         }, 1000);
//       }
//       //     return {
//       //       isOnline: false
//       //     }
//       //   }
//     });

//     return () => {
//       socket.off("getOnlineUser");
//       socket.off("getOfflineUser");
//       // Leave the current chat room when the component unmounts
//       socket.emit("leave chat", chatId);
//       // socket.off("message received", handleIncomingMessage);
//       socket.off("message received");
//     };
//   }, [chatId, otherUserId]);

//   // Fetch logged-in user id
//   useEffect(() => {
//     fetch("https://vibes-incampus-server.vercel.app/loginuser", {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("jwt"),
//       },
//     })
//       .then((res) => res.text())
//       .then((userId) => {
//         setLoggedInUserId(userId);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   // Fetch other user's name and profile picture
//   useEffect(() => {
//     fetch(`https://vibes-incampus-server.vercel.app/chat/${chatId}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("jwt"),
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         // console.log(data)
//         setOtherUserName(data.name);
//         setOtherUserProfilePic(data.photo);
//         setOtherUserId(data._id);
//         setOtherUserStatus(data.isOnline);
//         setVerify(data.verify);
//       })
//       .catch((error) => {
//         console.error("Error fetching other user data:", error);
//       });
//   }, []);

//   // Fetch chat messages
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `https://vibes-incampus-server.vercel.app/message/${chatId}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + localStorage.getItem("jwt"),
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const data = await response.json();
//         setMessages(data.messages);
//         // console.log(data.messages)

//         socket.emit("join chat", chatId);

//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };

//     fetchData();
//   }, [chatId]);

//   // Scroll to the bottom when new messages arrive
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (newMessage.trim() === "") {
//       return;
//     }

//     const newMessageObj = {
//       _id: Math.random().toString(36).substring(7),
//       content: newMessage,
//       sender: { _id: loggedInUserId },
//     };

//     setMessages((prevMessages) => [...prevMessages, newMessageObj]);
//     setNewMessage("");

//     // console.log("Other User ID:", otherUserId);

//     socket.emit("new message", {
//       chat: { _id: chatId, users: [loggedInUserId, otherUserId] },
//       sender: { _id: loggedInUserId },
//       content: newMessage,
//     });

//     fetch(`https://vibes-incampus-server.vercel.app/message`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("jwt"),
//       },
//       body: JSON.stringify({
//         chatId: chatId,
//         content: newMessage,
//       }),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .catch((error) => {
//         console.error("Error sending message:", error);
//       });
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && newMessage.trim() !== "") {
//       handleSendMessage();
//     }
//   };

//   // Add a new function to calculate the class based on the number of lines
//   const calculateClassForTwoLines = (content) => {
//     const container = document.createElement("div");
//     container.innerHTML = content;
//     document.body.appendChild(container);

//     const numberOfLines = Math.floor(
//       container.clientHeight /
//         parseFloat(getComputedStyle(container).lineHeight)
//     );
//     // console.log("Number of Lines:", numberOfLines);

//     container.remove();

//     return numberOfLines;
//   };

//   return (
//     <div className=" w-full max-w-xl fixed mx-auto rounded">
//       <div className="fixed w-full z-10">
//         <div
//           to={`/user/${otherUserId}`}
//           className="flex items-center bg-white"
//         >
//           <div className=" flex relative ml-[3vw] mr-2">
//             <img
//               className="w-12 h-12 rounded-full"
//               src={otherUserProfilePic} // Use the profile pic of the first user
//               alt="" // Use the name of the first user
//             />
//             {/* {otherUserStatus && (
//             <div className="bg-green-500 w-4 h-4 absolute rounded-full bottom-[0px] right-[0px] border-solid border-2 border-white"></div>
//               )}  */}

//             {/* {otherUserStatus || onlineStatus[otherUserStatus] ? ( */}

//             {isOnline || otherUserStatus ? (
//               <div className="bg-green-500 z-10 w-4 h-4 absolute rounded-full bottom-[0px] right-[0px] border-solid border-2 border-white"></div>
//             ) : null}
//           </div>
//           <h3 className="text-left font-r font-normal tracking-wide text-2xl pl-3 py-4 bg-white text-purple-700">
//             <span className="line-clamp-1 overflow-hidden">
//               {otherUserName}
//               {verify && (
//             <span className="relative inline-flex items-center ml-1 top-1">
//               <Verification />
//             </span>
//           )}
//             </span>
//           </h3>
//         </div>
//       </div>
//       <div
//         className="overflow-y-auto pb-10 bg-slate-50 h-[94vh] lg:h-[86vh] custom-scrollbar mt-auto flex flex-col-reverse"
//         ref={chatContainerRef}
//       >
//         <style>
//           {`
//           .custom-scrollbar::-webkit-scrollbar {
//             width: 0px !important;
//           }

//           .custom-scrollbar::-webkit-scrollbar-track {
//             background: #f1f1f1; /* Track color (gray) */
//             border-radius: 3px;
//           }

//           .custom-scrollbar::-webkit-scrollbar-thumb {
//             background: #888; /* Thumb color (gray) */
//             border-radius: 3px;
//           }
//         `}
//         </style>

//         <div className="pl-[3vw] pr-[3vw]">
//           <br />
//           <br />
//           <br />
//           <br />
//           <p className="font-r text-center text-sm lg:text-base font-normal text-gray-300 mt-auto">
//             Messages will disappear on their own in 24 hr.
//           </p>
//           <br />

//           {messages.map((message, index) => {
//             const numberOfLines = calculateClassForTwoLines(message.content);
//             return (
//               <div
//                 key={`${message._id || message.chat._id}-${index}`}
//                 className={`font-r text-left text-lg my-2 rounded-2xl w-fit relative ${
//                   message.sender._id === loggedInUserId
//                     ? "ml-auto bg-purple-600 text-white"
//                     : "mr-auto bg-gray-200 text-gray-800"
//                 }`}
//               >
//                 <p
//                   className={`font-r text-left text-base lg:text-lg pt-2 pl-3 ${
//                     numberOfLines > 1
//                       ? "pb-6 pr-3"
//                       : "lg:pr-[73px] pb-3 pr-[63px]"
//                   } rounded-2xl text-ellipsis overflow-hidden lg:max-w-[60vw] max-w-[75vw]`}
//                 >
//                   {message.content}
//                 </p>
//                 <span
//                   className={`text-[10px] lg:text-xs font-r tracking-wide absolute z-0 lg:bottom-1 bottom-0 right-2 ${
//                     message.sender._id === loggedInUserId
//                       ? "text-gray-300"
//                       : "text-gray-400"
//                   }`}
//                 >
//                   {formatTimestamp(message.createdAt)} {/* Format timestamp */}
//                 </span>
//               </div>
//             );
//           })}
//           <br />
//           <br />
//         </div>
//         <div className="fixed bottom-0 bg-slate-50 pb-6 pt-2 pl-[3vw] pr-[3vw] flex items-center w-full max-w-xl">
//           <input
//             className="py-3 pl-3 pr-14 w-full rounded-lg bg-gray-200 outline-none"
//             type="text"
//             id="newMessage"
//             name="newMessage"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type your Message"
//             onKeyPress={handleKeyPress}
//             autoComplete="off"
//           />
//           <button
//             className="absolute pr-3 pl-3 right-[3vw] py-1 rounded-lg bg-gray-200 text-purple-600"
//             onClick={handleSendMessage}
//           >
//             <SendIcon />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useRef, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SendIcon from "../Icons/SendIcon";
import Verification from "../Icons/VerificationfillIcon";
import moment from "moment"; // Import moment.js

function formatTimestamp(timestamp) {
  if (!timestamp) {
    return moment().format("h:mm a");
  }
  return moment(timestamp).format("h:mm a");
}

export default function ChatBox() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [otherUserName, setOtherUserName] = useState("");
  const [otherUserProfilePic, setOtherUserProfilePic] = useState("");
  const [otherUserId, setOtherUserId] = useState(null);
  const [otherUserStatus, setOtherUserStatus] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [verify, setVerify] = useState("");
  const [newMessage, setNewMessage] = useState([]);
  const chatContainerRef = useRef(null);

  // Fetch logged-in user id
  useEffect(() => {
    fetch("https://vibes-incampus-server.vercel.app/loginuser", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.text())
      .then((userId) => {
        setLoggedInUserId(userId);
      })
      .catch((err) => console.log(err));
  }, []);

  // Fetch other user's name and profile picture
  useEffect(() => {
    fetch(`https://vibes-incampus-server.vercel.app/chat/${chatId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setOtherUserName(data.name);
        setOtherUserProfilePic(data.photo);
        setOtherUserId(data._id);
        setOtherUserStatus(data.isOnline);
        setVerify(data.verify);
      })
      .catch((error) => {
        console.error("Error fetching other user data:", error);
      });
  }, [chatId]);

  // Fetch chat messages
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://vibes-incampus-server.vercel.app/message/${chatId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData();
  }, [chatId]);

  // Scroll to the bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") {
      return;
    }

    const newMessageObj = {
      _id: Math.random().toString(36).substring(7),
      content: newMessage,
      sender: { _id: loggedInUserId },
    };

    setMessages((prevMessages) => [...prevMessages, newMessageObj]);
    setNewMessage("");

    fetch(`https://vibes-incampus-server.vercel.app/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        chatId: chatId,
        content: newMessage,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newMessage.trim() !== "") {
      handleSendMessage();
    }
  };

  const calculateClassForTwoLines = (content) => {
    const container = document.createElement("div");
    container.innerHTML = content;
    document.body.appendChild(container);

    const numberOfLines = Math.floor(
      container.clientHeight / parseFloat(getComputedStyle(container).lineHeight)
    );

    container.remove();

    return numberOfLines;
  };

  return (
    <div className=" w-full max-w-xl fixed mx-auto rounded">
      <div className="fixed w-full max-w-xl z-10">
        <div to={`/user/${otherUserId}`} className="flex items-center bg-white">
          <div className=" flex relative ml-[3vw] mr-2">
            <img
              className="w-12 h-12 rounded-full"
              src={otherUserProfilePic}
              alt=""
            />
            {isOnline || otherUserStatus ? (
              <div className="bg-green-500 z-10 w-4 h-4 absolute rounded-full bottom-[0px] right-[0px] border-solid border-2 border-white"></div>
            ) : null}
          </div>
          <h3 className="text-left font-r font-normal tracking-wide text-2xl pl-3 py-4 bg-white text-purple-700">
            <span className="line-clamp-1 overflow-hidden">
              {otherUserName}
              {verify && (
                <span className="relative inline-flex items-center ml-1 top-1">
                  <Verification />
                </span>
              )}
            </span>
          </h3>
        </div>
      </div>
      <div
        className="overflow-y-auto pb-10 bg-slate-50 h-[94vh] lg:h-[86vh] custom-scrollbar mt-auto flex flex-col-reverse"
        ref={chatContainerRef}
      >
        <style>
          {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 0px !important;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 3px;
          }
        `}
        </style>

        <div className="pl-[3vw] pr-[3vw]">
          <br />
          <br />
          <br />
          <br />
          <p className="font-r text-center text-sm lg:text-base font-normal text-gray-300 mt-auto">
            Messages will disappear on their own in 24 hr.
          </p>
          <br />

          {messages.map((message, index) => {
            const numberOfLines = calculateClassForTwoLines(message.content);
            return (
              <div
                key={`${message._id || message.chat._id}-${index}`}
                className={`font-r text-left text-lg my-2 rounded-2xl w-fit relative ${
                  message.sender._id === loggedInUserId
                    ? "ml-auto bg-purple-600 text-white"
                    : "mr-auto bg-gray-200 text-gray-800"
                }`}
              >
                <p
                  className={`font-r text-left text-base lg:text-lg pt-2 pl-3 ${
                    numberOfLines > 1 ? "pb-6 pr-3" : "lg:pr-[73px] pb-3 pr-[63px]"
                  } rounded-2xl text-ellipsis overflow-hidden lg:max-w-[60vw] max-w-[75vw]`}
                >
                  {message.content}
                </p>
                <span
                  className={`text-[10px] lg:text-xs font-r tracking-wide absolute z-0 lg:bottom-1 bottom-0 right-2 ${
                    message.sender._id === loggedInUserId
                      ? "text-gray-300"
                      : "text-gray-400"
                  }`}
                >
                  {formatTimestamp(message.createdAt)}
                </span>
              </div>
            );
          })}
          <br />
          <br />
        </div>
        <div className="fixed bottom-0 bg-slate-50 pb-6 pt-2 pl-[3vw] pr-[3vw] flex items-center w-full max-w-xl">
          <input
            className="py-3 pl-3 pr-14 w-full rounded-lg bg-gray-200 outline-none"
            type="text"
            id="newMessage"
            name="newMessage"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your Message"
            onKeyPress={handleKeyPress}
            autoComplete="off"
          />
          <button
            className="absolute pr-3 pl-3 right-[3vw] py-1 rounded-lg bg-gray-200 text-purple-600"
            onClick={handleSendMessage}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
