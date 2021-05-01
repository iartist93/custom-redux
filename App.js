//--------------------------------------------------------------//
// reducers

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

//--------------------------------------------------------------//

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

//--------------------------------------------------------------//

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

//--------------------------------------------------------------//
