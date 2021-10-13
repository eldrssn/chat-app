import { types } from "./types";

const reducer = (state, action) => {
  switch (action.type) {

    case types.SET_USERNAME:
      return {
        ...state,
        username: action.payload
      }

    case types.SET_USERS:
      return {
        ...state,
        users: action.payload
      }

    case types.SET_DATA:
      return {
        ...state,
        chatId: action.payload.chatId,
        chatname: action.payload.chatname,
        users: action.payload.users,
        messages: action.payload.messages
      }

    case types.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, {
          ...action.payload, 
          date: new Date()
        }]
      };

    default:
      return state;
  }
}

export default reducer;