import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCount, addAmount, addAsync, addOdd, plus, minus} from "./counterSlice";


export function Counter()  {

    const count = useSelector(selectCount);    const dispatch = useDispatch()
    const [addValue, setAddValue] = useState(11);
    
    return (
        <div>
            <button onClick={() => dispatch(minus())} style={{backgroundColor: "red", color: "White"}}>-</button>
            <input type='number' value={count} onChange={ (e) => e.target.value } />
            <button onClick={() => dispatch(plus())} style={{backgroundColor: "Blue", color: "White"}}>+</button><br />
            <input type="number" value={addValue} onChange={e => setAddValue(e.target.value)} />
            <button onClick={() => dispatch(addAmount(Number(addValue)))} style={{backgroundColor: "Purple", color: "White"}}>Add Amount</button>
            <button onClick={() => setTimeout(() => {dispatch(addAsync(Number(addValue)))}, 5000) } style={{backgroundColor: "Green", color: "White"}}>Add Async</button>
            <button onClick={() => dispatch(addOdd(Number(addValue)))} style={{backgroundColor: "Black", color: "White"}}>Add If Odd</button>
        </div>
    );
}

export default Counter