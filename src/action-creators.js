import { types } from "./types"

export const setUsername = (value, dispatch) => {
    dispatch({
    type: types.SET_USERNAME,
    payload: value
  })
}

export const setRoom = (value, dispatch) => {
  dispatch({
    type: types.SET_ROOM,
    payload: value
  })
}

export const setData = (data, dispatch) => {
  dispatch({
    type: types.SET_DATA,
    payload: data 
  })
}

export const setUsers = (value, dispatch) => {
  dispatch({
    type: types.SET_USERS,
    payload: value
  })
}

export const addMessage = (value, dispatch) => {
  dispatch({
    type: types.ADD_MESSAGE,
    payload: value
  })
}
