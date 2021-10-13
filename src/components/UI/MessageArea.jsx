import React, { useEffect, useRef } from 'react';
import Message from './Message';

const MessageArea = ({messages, isMineName}) => {

  //механизм плавной прокрутки к последнему сообщению
  const ref = useRef(null); 
  useEffect(() => {
    ref.current.scrollBy({
      top: ref.current.scrollHeight,
      behavior: 'smooth'
  });
  }, [messages])

  return (
    <div ref={ref} className="messages-area">
      {messages.map(message => (
        <Message 
          key={message.messageId} 
          isMineName={isMineName} 
          text={message.text} 
          username={message.username} 
          date={message.date} 
        />
      ))}
      
    </div>
  );
};

export default MessageArea;