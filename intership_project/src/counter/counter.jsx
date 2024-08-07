import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCount, addAmount, addAsync, addOdd, plus, minus} from "./counterSlice";


export function Counter()  {

    const count = useSelector(selectCount);    const dispatch = useDispatch()
    const [addValue, setAddValue] = useState(11);
    const addition = () => dispatch(plus())
    const subtraction = () => dispatch(minus())
    const amount_addition = () => dispatch(addAmount(Number(addValue)))
    const asynchronous_addition = () => setTimeout(() => {dispatch(addAsync(Number(addValue)))}, 5000)
    const odd_number_addition = () => dispatch(addOdd(Number(addValue)))
    const read_yourself = (e) => e.target.value
    const read_amount = e => setAddValue(e.target.value)
    
    return (
        <div>
            <button onClick={ subtraction } style={{backgroundColor: "red", color: "White"}}>-</button>
            <input type='number' value={count} onChange={ read_yourself } />
            <button onClick={ addition } style={{backgroundColor: "Blue", color: "White"}}>+</button><br />
            <input type="number" value={addValue} onChange={ read_amount } />
            <button onClick={ amount_addition } style={{backgroundColor: "Purple", color: "White"}}>Add Amount</button>
            <button onClick={ asynchronous_addition } style={{backgroundColor: "Green", color: "White"}}>Add Async</button>
            <button onClick={ odd_number_addition } style={{backgroundColor: "Black", color: "White"}}>Add If Odd</button>
        </div>
    );
}

export default Counter