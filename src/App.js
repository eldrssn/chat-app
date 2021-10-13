import { useState, useReducer } from "react";
import Chat from "./components/Chat";
import CreateRoom from "./components/CreateRoom";
import CreateUser from "./components/CreateUser";
import reducer from './reducer';

function App() {
  //проверка, введено ли имя и комната
  const [isEnterName, setEnterName] = useState(false);
  const [isEnterRoom, setEnterRoom] = useState(false);

  const initialState = {
    chatname: '',
    username: '',
    chatId: '',
    users: [],
    messages: []
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="wrapper">
      {!isEnterName &&  <CreateUser setEnterName={setEnterName} setEnterRoom={setEnterRoom} dispatch={dispatch} />}
      {(isEnterName && !isEnterRoom) && <CreateRoom setEnterRoom={setEnterRoom} dispatch={dispatch} state={state} />}
      {(isEnterName && isEnterRoom) && <Chat dispatch={dispatch} state={state} />}
    </div>
  );
}

export default App;