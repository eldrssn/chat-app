import React from 'react';

const EnterForm = ({placeholder, value, setValue, onEnter}) => {
  return (
    <header className="enter-form">
      <form>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={evt => setValue(evt.target.value)}
        />
        
        <button type="button" onClick={onEnter}>Отправить</button>
        
      </form>
    </header>
  );
};

export default EnterForm;