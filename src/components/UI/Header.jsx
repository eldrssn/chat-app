import React from 'react';

const Header = ({text}) => {
  return (
    <header className="chat-header">
        <h1>Комната: {text}</h1>
      </header>
  );
};

export default Header;