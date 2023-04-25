import { Action } from "./actions";

//Model
export interface TokenState {
    tokens: string
}

const initialState = {
    tokens: ""
}

export const tokenReducer = (state: TokenState = initialState, action: Action) => {
    switch(action.type) {
        case 'ADD_TOKEN': { //se type for do tipo ADD_TOKEN, retornará o payload(token)
            return {tokens: action.payload}
        }

        default:
            return state // caso contário, irá retornar o state em seu estado original, ou seja, vazio
    }
}