import { Todo } from "../models/Todo";

const setTodos = (todos: Todo[]) => {
  return {
    type: "SET_TODOS",
    payload: todos,
  };
}

const addTodo = (todo: Todo) => {
  return {
    type: "ADD_TODO",
    payload: todo,
  };
};

const deleteTodo = (_id: String) => {
  return {
    type: "DELETE_TODO",
    payload: _id,
  };
}

const updateTodo = (todo: Todo) => {
  return {
    type: "UPDATE_TODO",
    payload: todo,
  };
}

export { setTodos, addTodo, deleteTodo, updateTodo };
