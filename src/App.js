import "./App.css";

import Background from "./components/bg";
import NumberPlate from "./components/numberPlate";

import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import MainPage from "./pages/homePage";
import MessagePage from "./pages/messagePage";
import MatchPage from "./pages/matchPage";
import NotificationPage from "./pages/notificationPage";
import ProfilePage from "./pages/profilePage";
import SettingPage from "./pages/settingPage"
import UploadPhoto from "./pages/uploadPhoto";
import WelcomePage from "./pages/welcomePage";
import QuePage from "./pages/quePage";

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
      )
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
      path: "/message",
      element: (
        <div>
          <MessagePage />
        </div>
      ),
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
      )
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
      )
    }
  ]);

  return (
    <div className="App bg-purple-50 h-dvh w-dvw absolute top-0">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
 
