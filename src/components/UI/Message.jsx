import React from 'react';
import { formatDate } from '../../utils';

const Message = ({text, username, date, isMineName}) => {
  
  return (
    // если сообщение принадлежит нам, то отмечаем его специальным стилем
    <div className={(username === isMineName) ? "message my-message" : "message"}>
      <p>{text}</p>
      <div className="message-info">
        <span className="message-name">{username}</span>
        <span className="message-date">{formatDate(date)}</span>
      </div>
    </div>
  );
};

export default Message; 