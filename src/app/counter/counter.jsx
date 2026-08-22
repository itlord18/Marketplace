"use client"

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCount, addAmount, addAsync, addOdd, plus, minus } from "./counterSlice";
import React from 'react';

export function Counter()  {

    const count = useSelector( selectCount );    
    const dispatch = useDispatch()
    const [ addValue, setAddValue ] = useState( 11 );
    const addition = () => dispatch( plus() )
    const subtraction = () => dispatch( minus() )
    const amountAddition = () => dispatch( addAmount( Number( addValue ) ) )
    const asynchronousAddition = () => setTimeout( () => {dispatch( addAsync( Number( addValue ) ) )}, 5000 )
    const oddNumberAddition = () => dispatch( addOdd( Number( addValue ) ) )
    const readYourself = ( e ) => e.target.value
    const readAmount = e => setAddValue( e.target.value )

    return (
        <div>
            <button onClick={ subtraction } style={{ backgroundColor: "red", color: "White" }}>-</button>
            <input type='number' value={count} onChange={ readYourself } />
            <button onClick={ addition } style={{ backgroundColor: "Blue", color: "White" }}>+</button><br />
            <input type="number" value={addValue} onChange={ readAmount } />
            <button onClick={ amountAddition } style={{ backgroundColor: "Purple", color: "White" }}>Add Amount</button>
            <button onClick={ asynchronousAddition } style={{ backgroundColor: "Green", color: "White" }}>Add Async</button>
            <button onClick={ oddNumberAddition } style={{ backgroundColor: "Black", color: "White" }}>Add If Odd</button>
        </div>
    );
}

export default Counter