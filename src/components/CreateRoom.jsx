import axios from 'axios';
import React, { useState } from 'react';
import EnterForm from './UI/EnterForm';
import socket from '../socket';
import { setData, setRoom } from '../action-creators';
import { getRandomId } from '../utils';
import { createBrowserHistory } from "history";

const CreateRoom = ({setEnterRoom, dispatch, state, name}) => {
  // переходим к этому компоненту, если комнаты с таким id не найдено
  const [value, setValue] = useState('');

  const history = createBrowserHistory();

  // передаем данные о пользователе и комнате и подключаемся через сокет
  const onEnter = async (evt) => {
    if (value) {
      const room = {
        chatname: value, 
        chatId: getRandomId()
      }
      setRoom(room, dispatch);

      const newData = {
        ...room,
        username: state.username,
        userId: getRandomId()
      }
      await axios.post('/room', newData);
      socket.emit('LOGIN', newData);

      const {data} = await axios.get(`/room/${room.chatId}`)
        .catch((err) => {
          throw new Error (err)
        });
      setData(data, dispatch);

      setValue('');
      setEnterRoom(true);
      history.push(`/room/${room.chatId}`);
    }
  }

  
  return (
    <EnterForm placeholder="Введите название комнаты"  value={value} setValue={setValue} onEnter={onEnter} />
  );
};

export default CreateRoom;