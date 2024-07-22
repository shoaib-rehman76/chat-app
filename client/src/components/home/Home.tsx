import React from "react";
import Sidbar from "./Sidbar";
import MessageList from "./MessageList";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidbar />
      <MessageList />
    </div>
  );
};

export default Home;
