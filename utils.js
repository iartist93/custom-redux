/**
 *
 * @param  {...function} funcs  the functions to compose
 * @returns composed functions like `f(g(x))`
 *
 * Example
 *
 * ```
  const add5 = (a) => a + 5;
  const mult10 = (a) => a * 10;

  const composed = compose(add5, mult10);
  console.log(composed(4)); // => 45
```
  *
 */

const compose = (...funcs) => {
  if (funcs.length === 0) return (args) => args;
  if (funcs.length === 1) return funcs[0];

  const last = funcs[funcs.length - 1];
  const rest = funcs.slice(0, -1);

  return (...args) => rest.reduceRight((acc, next) => next(acc), last(...args));
};

/**
 * Middleware signiture is like this `const middleware = (store) => (next) => (action) => dispatch(action)`
 *
 * @param  {...any} middlewares
 * @returns new modified `createStore()` function
 */

const applyMiddlewares = (...middlewares) => {
  // remember the middlewares
  return (createStore) => (reducer, enhancer) => {
    const store = createStore(reducer, enhancer);

    const newStore = {
      getState: store.getState,
      dispatch: (action) => store.dispatch(action),
    };

    // pass the first argument to the middlewares `store`
    const chain = middlewares.map((middleware) => middleware(newStore));

    // apply all the middlwares
    // `composte(...middlewares)` will return `(next) => (action) => dispatch(action)`
    // we need to return the last function only to the new dispatch `(action) => dispatch(action)`
    // so we pass the original `store.dispatch` as argument the composed functions

    // here the last middlware will take `store.dispatch` as `next`
    // and then the returned result will passed to the pre-last one
    // and so one

    // when we call new_dispatch(action)
    // those middlwares will be executed from left to right
    dispatch = compose(...chain)(store.dispatch);

    // return the new store with altered dispatch
    return {
      ...store,
      dispatch,
    };
  };
};
