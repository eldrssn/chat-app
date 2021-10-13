import React from 'react';

const Aside = ({users}) => {
  return (
    <aside className="chat-users">
      <p>Oнлайн <b>({users.length})</b>:</p>
      <ul>
        {users.map(user => <li key={user.userId} >{user.username}</li>)}
      </ul>
    </aside>
  );
};

export default Aside;