import { createAction } from "@reduxjs/toolkit";

const inputs_filter = createAction(
    'inputs_filter', (objeto)=> {
        return{
            payload: {
                title:objeto.title,
               
            }
        }
    }
)

const actions = { inputs_filter }
export default actions
