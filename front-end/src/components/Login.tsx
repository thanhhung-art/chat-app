import React, { Dispatch, SetStateAction } from "react";
import styles from "../styles/Login.module.css";
import { Socket } from "socket.io-client";

function Login({
  socket,
  setUser,
  user,
  setShowChat
}: {
  socket: Socket;
  setUser: Dispatch<SetStateAction<any>>;
  user: User;
  setShowChat: Dispatch<SetStateAction<any>>
}) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user.room && user.username) {
      await socket.emit('join_room', user.room)
      setShowChat(true);
    } else {
      alert("You have to type name and room to chat!")
    }
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="#username" className={styles.label}>username</label>
          <input
            id="username"
            type="text"
            placeholder="type username"
            className={styles.input}
            onChange={(e) =>
              setUser((user: User) => ({ ...user, username: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor="#room" className={styles.label}>room</label>
          <input
            id="room"
            type="text"
            placeholder="type room to chat"
            className={styles.input}
            onChange={(e) =>
              setUser((user: User) => ({ ...user, room: e.target.value }))
            }
          />
        </div>
        <button className={styles.button}>join</button>
      </form>
    </div>
  );
}

export default Login;
