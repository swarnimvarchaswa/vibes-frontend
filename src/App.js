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
      element: <div>To be updated soon</div>,
    },
    {
      path: "/verification",
      element: <div>To be updatd soon</div>,
    },
    {
      path: "/contact",
      element: <div>To be updated soon</div>,
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
    <div className="App bg-purple-50">
      <div className="hidden sm:block ">
        <h1>This App is only for mobile screeen</h1>
      </div>
      <div className="visible sm:invisible">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
