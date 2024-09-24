import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/navbar";
import BottomNavbar from "../components/BottomNavbar";

function MessagePage() {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./login");
    }
  }, []);

  useEffect(() => {
    // Make a fetch request to retrieve chat data
    fetch("https://vibes-incampus-server.vercel.app/chat", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setChats(data); // Set the retrieved chat data to the state
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching chat data:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <BottomNavbar />

      <div className="max-w-md mx-auto px-4 pt-4">
        {isLoading ? (
          <img
            className="w-full"
            src="https://res.cloudinary.com/booktrade/image/upload/v1695586780/Circle_Loader_nkgtip.gif"
            alt="Loading"
          />
        ) : (
          <>
            {chats.length === 0 && (
              <div className="mt-6 text-r text-center tracking-wide text-gray-600 text-lg ">
                Add Friends for chat
              </div>
            )}
            {Array.isArray(chats) &&
              chats.map((chat) => (
                <div key={chat._id}>
                  <Link
                    to={`/message/${chat._id}`}
                    className="flex flex-row border-0 rounded-lg py-1 my-2 hover:bg-purple-100 focus:bg-purple-100"
                  >
                    <div className="basis-3/10 flex justify-center relative z-0 whitespace-nowrap flex-shrink-0">
                      <div className=" mx-2 my-1">
                        <img
                          className="h-[50px] w-[50px] rounded-full"
                          src={chat.users[0].photo} // Use the profile pic of the first user
                          alt={chat.users[0].name} // Use the name of the first user
                        />
                        {chat.users[0].isOnline && (
                          <div className="bg-green-500 w-4 h-4 absolute rounded-full bottom-[4px] right-[8px] border-solid border-2 border-white"></div>
                        )}
                      </div>
                    </div>
                    <div className="basis-5/10 content place-self-center pr-2">
                      <div className="grid grid-row text-left text-base mx-2">
                        <div>
                          <h2 className="pe-1 font-r tracking-wide line-clamp-1 text-xl text-purple-500">
                            {chat.users[0].name}{" "}
                            {/* Use the name of the first user */}
                          </h2>
                          {chat.latestMessage && (
                          <p
                            className={`font-r tracking-wide font-normal text-sm line-clamp-1 ${
                              chat.latestMessage.sender._id ===
                                chat.users[0]._id && !chat.latestMessage.isRead
                                ? "text-gray-800"
                                : "text-gray-400"
                            } `}
                          >
                            {chat.latestMessage.content}
                          </p>)}
                        </div>
                      </div>
                    </div>
                    <div className="basis-1/10 content place-self-center pr-2 mr-0 ml-auto mt-0">
                      <div className="grid grid-row">
                        {chat.latestMessage && chat.latestMessage.sender._id === chat.users[0]._id &&
                          !chat.latestMessage.isRead && (
                            <span class="relative flex h-3 w-3">
                              <span class="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                            </span>
                          )}
                      </div>
                    </div>
                  </Link>
                  <hr />
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
}

export default MessagePage;
