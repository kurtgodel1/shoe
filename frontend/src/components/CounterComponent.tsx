import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store'; // Update the path as needed
import { increment, decrement } from '../store/slices/counterSlice'; // Update the path as needed

const CounterComponent: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default CounterComponent;
