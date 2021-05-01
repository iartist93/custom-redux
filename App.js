//======================================== Reducers
const todos = (state = [], action) => {
  console.log("todo reducer called");
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.todo]);
    default:
      return state;
  }
};

const goals = (state = [], action) => {
  console.log("goal reducer called");
  switch (action.type) {
    case "ADD_GOAL":
      return state.concat([action.goal]);
    default:
      return state;
  }
};

//======================================== App

const store = createStore(
  combineReducers({
    todos,
    goals,
  })
);

let state = store.getState();

console.log(state);

// has to subscibe before dispatch
const unsubscribe = store.subscibe(() => {
  console.log(store.getState());
});

//-----------------------------------------------------------------

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

//-----------------------------------------------------------------
// Testing Compose

const add5 = (a) => {
  console.log("add 5 called");
};

const add15 = (a) => {
  console.log("add 15 called");
};
const mult10 = (a) => {
  console.log("Multiply 10 called");
};

const composed = compose(add5, mult10);
const composed2 = composed(5);
console.log(composed2);

//-----------------------------------------------------------------

// TODO
// remove
// toggle
// constances
// combineReducers function
