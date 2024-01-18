import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./redux/counterSlice";

export default function App() {
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <>
      <h1>Redux Toolkit</h1>
      <h2>Counter: {count} </h2>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
    </>
  );
}
