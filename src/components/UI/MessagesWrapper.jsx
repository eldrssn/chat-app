import React from 'react';
import MessageArea from './MessageArea';
import MessageForm from './MessageForm';

const MessagesWrapper = ({message, setMessage, onSendMessage, messages, isMineName}) => {
  return (
    <section className="messages-wraper">
      <MessageArea messages={messages} isMineName={isMineName} />
      <MessageForm 
        message={message} 
        setMessage={setMessage} 
        onSendMessage={onSendMessage} 
      />
    </section>
  );
};

export default MessagesWrapper;