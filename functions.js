const { default: fetch } = require("node-fetch");

const fetchTodos = async (dispatch, getState) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=6");

  const todos = await res.json();

  dispatch({
    type: "todos/todoLoaded",
    payload: todos,
  });

  console.log(`number of uploaded todos: ${getState().todos.length}`);
};

module.exports = {
  fetchTodos,
};
