const MessageForm = ({message, setMessage, onSendMessage}) => {

  return (
    <form className="message-form">
      <textarea
        value={message}
        placeholder="Напишите ваше сообщение здесь"
        rows="3"
        onChange={(evt) => setMessage(evt.target.value)}
      ></textarea>
      <button type="button" onClick={onSendMessage}>Отправить</button>
    </form>
  );
};

export default MessageForm;