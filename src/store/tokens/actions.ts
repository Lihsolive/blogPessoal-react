export type Action = { type: "ADD_TOKEN"; payload: string} //payload guarda o token

export const addToken = (token: string): Action => ({
    type: "ADD_TOKEN",
    payload: token
});