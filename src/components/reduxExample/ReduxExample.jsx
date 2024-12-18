
import { decrement, increment, incrementByAmount } from "../../features/featureSlice.js";
import { useSelector, useDispatch } from "react-redux";
const ReduxExample = () => {
  const { value } = useSelector((state) => state.feature);
  const dispatch = useDispatch();
  return (
    <div>
    <h2>Redux-Tolkit deniyoruz</h2>
    <h1>Value:{value}</h1>
    <button onClick={() => dispatch(increment())}>Increment</button>
    <button onClick={() => dispatch(decrement())}>Decrement</button>
    <button onClick={()=>dispatch(incrementByAmount(10))}>Increment By 10</button>
  </div>
  )
}

export default ReduxExample