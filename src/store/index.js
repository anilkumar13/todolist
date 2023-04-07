import { createStore } from 'redux'

const initialState = {todolist:[{id:1,item:"first item"}]}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case "add":{
    const todolist = [...state.todolist, payload]
    return {...state, todolist};
  }
  case "edit":{
    state.todolist.find((item)=> item.id === payload.id ? item.item = payload.item:state);
    return {...state};
  }  
  case "delete":{
    const todolist = state.todolist.filter((item)=> item.id !== payload.id);
    return {...state, todolist};
  }  
  default:
    return state
  }
}
const store = createStore(reducer)
export default store;
