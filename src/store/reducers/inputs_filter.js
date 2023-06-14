import { createReducer } from "@reduxjs/toolkit";
import inputs_actions from '../actions/inputs_filters.js'
const { inputs_filter } = inputs_actions

let initial_state = {
    title: '',
   
}

const reducer = createReducer(
    initial_state,
    (builder) => builder
        .addCase(
            inputs_filter,
            (state,action) => {
                const new_state = {
                    ...state,
                    title: action.payload.title,
                    
                }
                return new_state
            }
        )
)

export default reducer
