import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import styles from '../styles/Chat.module.css'

function Chat({socket, user, setUser}: {
  socket: Socket;
  user: User;
  setUser: Dispatch<SetStateAction<any>>;
}) {
  const [messageList, setMessageList] = useState<User[]>([])
  const anchor = useRef<HTMLDivElement | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user.message) {
      const data = {...user, time: 
        new Date(Date.now()).getHours()
        + ":" +
        new Date(Date.now()).getMinutes()
      }
      await socket.emit('send_message', data)
      setMessageList((user) => [...user, data])
      setUser((user: User) => ({...user, message: "", time: ""}))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((user: User) => ({...user, message: e.target.value}))
  }

  useEffect(() => {
    socket.on('receive_message', (data: User) => {
      setMessageList((list) => {
        if (list[list.length - 1]?.message !== data.message || list.length === 0) {
          return [...list, data] 
        }
        return list
      })
    })
  },[socket])

  useEffect(() => {
    anchor.current && anchor.current.scrollIntoView({behavior: 'smooth'})
  }, [messageList.length])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.h2}>Chat room {user.room}</h2>
      </header>
      <section className={styles.chatBody}>
        <div className={styles.chatContainer}>
          {messageList.map((content, i) => (
            <div key={i} className={user.username === content.username ? styles.you : styles.other}>
              <p className={styles.message}>{content.message}</p>
              <p className={styles.nameTimeContainer}>
                <span className={styles.name}>{content.username === user.username ? 'you' : content.username}</span>
                <span className={styles.time}>{content.time}</span>
              </p>
            </div>
          ))}
          <div ref={anchor}></div>
        </div>
      </section>
      <section className={styles.inputContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input value={user.message} className={styles.input} type="text" onChange={handleChange} />
          <button className={styles.button} type="submit">send</button>
        </form>
      </section>
    </div>
  )
}

export default Chat