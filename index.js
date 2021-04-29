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

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    const newState = {};
    Object.entries(reducers).forEach(([slice, reducer]) =>
      Object.assign(newState, { [slice]: reducer(state[slice], action) })
    );
    return newState;
  };
};

//======================================== Action Creators
const addTodo = (todo) => ({
  type: "ADD_TODO",
  todo,
});

const addGoal = (goal) => ({
  type: "ADD_GOAL",
  goal,
});
