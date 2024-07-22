/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import PrivateRoutes from "./privateRoutes/PrivateRoutes";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setSocket } from "./store/socketReducer";
import { setOnlineUser } from "./store/reducers";

function App() {
  const { socket } = useSelector((state: any) => state.socket);
  const { authUser } = useSelector((state: any) => state.user);
  const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socketio = io(`http://localhost:5000`, {
        query: {
          userId: userInfo && userInfo.id,
        },
      });
      dispatch(setSocket(socketio));

      socketio?.on("getOnlineUsers", (onlineUsers) => {
        console.log(onlineUsers, "onlineuser ========> FE");

        dispatch(setOnlineUser(onlineUsers));
      });
      return () => {
        socketio.close();
      };
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoutes>
          <Home />
        </PrivateRoutes>
      ),
    },
    {
      path: "/sign-in",
      element: <Signin />,
    },
    {
      path: "/sign-up",
      element: <Signup />,
    },
  ]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} fallbackElement={<h1>Loading...</h1>} />
    </div>
  );
}

export default App;
