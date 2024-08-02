import { createStore, applyMiddleware } from 'redux'

export default createStore((preState: any, action: { type: any, payload: any }) => {
    if (action.type === 'ADD_ID') {
        return {
            ...preState,
            userId: action.payload
        }
    }
    return {
        userId: 123
    }
})