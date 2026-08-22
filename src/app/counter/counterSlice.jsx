import { createSlice } from '@reduxjs/toolkit'


const counterSlice = createSlice( {
    name: 'counter',
    initialState : {
        value: 0,
    },
    reducers: {
        plus: ( state ) => {
            state.value += 1
        },
        minus: ( state ) => {
            state.value -= 1
        },
        addAmount: ( state, action ) => {
            state.value += action.payload
        },
        addAsync: ( state, action ) => {
            state.value += action.payload
        },
        addOdd: ( state, action ) => {
            if( action.payload % 2 === 1 ){
                state.value += action.payload
            }
        },
    }
 

} )
export const { plus, minus, addAmount, addAsync, addOdd } = counterSlice.actions
export const selectCount = ( state ) => state.counter.value


export default counterSlice.reducer