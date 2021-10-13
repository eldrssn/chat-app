import React, { useEffect, useState } from 'react';
import { addMessage, setUsers } from '../action-creators';
import socket from '../socket';
import { getRandomId } from '../utils';
import Aside from './UI/Aside';
import Header from './UI/Header';
import MessagesWrapper from './UI/MessagesWrapper';

const Chat = ({dispatch, state}) => {
  const [message, setMessage] = useState('');
  const {users, chatname, messages } = state;

  // отправка нашего сообщения на сервер и добавление его в state для отрисовки
  const onSendMessage = () => {
    if (message) {
      socket.emit('SEND MESSAGE', {
        chatId: state.chatId,
        message
      })

      addMessage({
        text: message,
        username: state.username,
        date: new Date(),
        messageId: getRandomId()
      }, dispatch)

      setMessage('')
    }
  }

  // получение данный из сокета о других юзерах и сообщениях, и добавление их в state
  useEffect(() => {
    socket.on('USERS', (users) => setUsers(users, dispatch));
    socket.on('ADD MESSAGE', (newMessage) => addMessage(newMessage, dispatch));
  }, []);  

  return (
    <>
      <Header text={chatname}/>
      <div className="chat-wrapper">
        <Aside users={users} />
        <MessagesWrapper 
          isMineName={state.username}
          messages={messages}
          message={message} 
          setMessage={setMessage} 
          onSendMessage={onSendMessage} />
      </div>
    </>
  );
};

export default Chat;