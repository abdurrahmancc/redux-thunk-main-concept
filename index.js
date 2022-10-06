const { createStore, applyMiddleware } = require("redux");
const { fetchTodos } = require("./functions");
const { delayActionMiddleware, fetchAsyncMiddleware } = require("./middlewares");

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "todos/todoAdded":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            title: action.payload,
          },
        ],
      };
    case "todos/todoLoaded":
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };

    default:
      return state;
  }
};

const store = createStore(
  todoReducer,
  applyMiddleware(fetchAsyncMiddleware, delayActionMiddleware)
);

store.subscribe(() => {
  console.log(store.getState());
});

// store.dispatch({
//   type: "todos/todoAdded",
//   payload: "learn redux",
// });

store.dispatch(fetchTodos);
