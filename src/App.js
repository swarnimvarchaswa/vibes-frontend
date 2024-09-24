import "./App.css";

import Background from "./components/bg";
import NumberPlate from "./components/numberPlate";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import HomePage from "./pages/homePage";
import MessagePage from "./pages/messagePage";
import MatchPage from "./pages/matchPage";
import NotificationPage from "./pages/notificationPage";
import ProfilePage from "./pages/profilePage";
import SettingPage from "./pages/settingPage";
import UploadPhoto from "./pages/uploadPhoto";
import WelcomePage from "./pages/welcomePage";
import QuePage from "./pages/quePage";
import FaqPage from "./pages/faqPage";
import VerifyPage from "./pages/verifyPage";
import ContactPage from "./pages/contactPage";
import EditPage from "./pages/editPage";
import ChatPage from "./pages/chatPage";

import { SocketProvider } from "./context/socketContext";


import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/test",
      element: (
        <div>
          <NumberPlate />
        </div>
      ),
    },
    {
      path: "/",
      element: (
        <div>
          <MainPage />
        </div>
      ),
    },
    {
      path: "/home",
      element: (
        <div>
          <HomePage />
        </div>
      ),
    },
    {
      path: "/message",
      element: (
        <div>
          <MessagePage />
        </div>
      ),
    },
    {
      path: "/message/:chatId",
      element: (
        <div>
          <ChatPage />
        </div>
      )
    },
    {
      path: "/match",
      element: (
        <div>
          <MatchPage />
        </div>
      ),
    },
    {
      path: "/notification",
      element: (
        <div>
          <NotificationPage />
        </div>
      ),
    },
    {
      path: "/profile",
      element: (
        <div>
          <ProfilePage />
        </div>
      ),
    },
    {
      path: "/menu",
      element: (
        <div>
          <SettingPage />
        </div>
      ),
    },
    {
      path: "/login",
      element: (
        <div>
          <LoginPage />
        </div>
      ),
    },
    {
      path: "/signup",
      element: (
        <div>
          <SignupPage />
        </div>
      ),
    },
    {
      path: "/uploadphoto",
      element: (
        <div>
          <UploadPhoto />
        </div>
      ),
    },
    {
      path: "/welcome",
      element: (
        <div>
          <WelcomePage />
        </div>
      ),
    },
    {
      path: "/que",
      element: (
        <div>
          <QuePage />
        </div>
      ),
    },
    {
      path: "/editprofile",
      element: (
        <div>
          <EditPage />
        </div>
      ),
    },
    {
      path: "/verification",
      element: (
        <div>
          <VerifyPage />
        </div>
      ),
    },
    {
      path: "/contact",
      element: (
        <div>
          <ContactPage />
        </div>
      ),
    },
    {
      path: "/faq",
      element: (
        <div>
          <FaqPage />
        </div>
      ),
    },
  ]);

  return (
    <div className="App bg-purple-50" >
      <style>
        {`
          /* Hide scrollbars for all elements */
          * {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none;  /* IE and Edge */
          }
          
          /* For Webkit browsers like Chrome, Safari */
          *::-webkit-scrollbar {
            display: none;
          }

          body, html {
            overflow: hidden;
          }
        `}
      </style>
      {/* <div className="hidden sm:block ">
        <h1>This App is only for mobile screen</h1>
      </div> */}
      {/* <div className="visible sm:invisible"> */}
      <div className="max-w-xl h-full mx-auto">
        <SocketProvider>
        <RouterProvider router={router} />
        </SocketProvider>
      </div>
    </div>
  );
}

export default App;
