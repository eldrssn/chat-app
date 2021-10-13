import axios from 'axios';
import React, { useState } from 'react';
import { setData, setUsername } from '../action-creators';
import socket from '../socket';
import { getRandomId } from '../utils';
import EnterForm from './UI/EnterForm';

const CreateUser = ({ setEnterName, setEnterRoom, dispatch }) => {
  const [name, setName] = useState('');

  const onEnter = async () => {
    if (name) {
      //добавляем username в state
      setUsername(name, dispatch);

      //надодим id, узнаем, есть ли комната с таким id
      const url = window.location.href.split('/');
      const {data} = await axios.get(`/room/${url[4]}`)
        .catch((err) => {
          throw new Error (err)
        });
      
      // если такая комната есть, то отправляем данные о юзере и подключаемся к комнате
      if (data.users.length) { 
        setEnterRoom(true); 

        const newData = {
          username: name,
          userId: getRandomId(), 
          chatId: url[4]
        }

        await axios.post('/room', newData);
        socket.emit('LOGIN', newData);
        const {data: updatedData} = await axios.get(`/room/${url[4]}`)
          .catch((err) => {
            throw new Error (err)
          });
        setData(updatedData, dispatch)
      } 
      
      setName('');
      setEnterName(true);
    }
  }

  return (
    <EnterForm placeholder="Введите имя" value={name} setValue={setName} onEnter={onEnter} />
  );
};

export default CreateUser;