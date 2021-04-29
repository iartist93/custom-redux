//======================================== Redux

const createStore = (reducer) => {
  let state = undefined;
  let listeners = [];

  const getState = () => state;

  const subscibe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscibe,
    dispatch,
  };
};

//======================================== Reducers
const todosReducer = (state = [], action) => {
  console.log("todo reducer called");
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.todo]);
    default:
      return state;
  }
};

const goalsReducer = (state = [], action) => {
  console.log("goal reducer called");
  switch (action.type) {
    case "ADD_GOAL":
      return state.concat([action.goal]);
    default:
      return state;
  }
};

// both reducers will be called for each dispatch
const combinedReducers = (state = {}, action) => ({
  todos: todosReducer(state.todos, action),
  goals: goalsReducer(state.goals, action),
});

//======================================== Action Creators
const addTodo = (todo) => ({
  type: "ADD_TODO",
  todo,
});

const addGoal = (goal) => ({
  type: "ADD_GOAL",
  goal,
});

//======================================== App

const store = createStore(combinedReducers);

let state = store.getState();

console.log(state);

// has to subscibe before dispatch
const unsubscribe = store.subscibe(() => {
  console.log(store.getState());
});

store.dispatch(
  addTodo({
    id: 0,
    content: "Hello world, first todo item",
    completed: false,
  })
);

store.dispatch(
  addTodo({
    id: 1,
    content: "Hello world, second todo item",
    completed: false,
  })
);

store.dispatch(
  addGoal({
    id: 1,
    goal: "Finish this app",
  })
);

// TODO
// remove
// toggle
// constances
// combineReducers function
