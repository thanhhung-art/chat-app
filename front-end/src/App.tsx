import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./components/Chat";
import Login from "./components/Login";
import styles from "./styles/App.module.css";

const socket = io("http://localhost:5000");

function App() {
  const [user, setUser] = useState<User>({
    username: "",
    id: "",
    room: "",
    time: "",
    message: "",
  });
  const [showChat, setShowChat] = useState(false);

  return (
    <div className={styles.app}>
      {showChat ? (
        <Chat socket={socket} user={user} setUser={setUser} />
      ) : (
        <Login
          socket={socket}
          setUser={setUser}
          user={user}
          setShowChat={setShowChat}
        />
      )}
    </div>
  );
}

export default App;
