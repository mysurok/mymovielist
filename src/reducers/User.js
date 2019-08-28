import {RESTORE_SESSION, USER_LOGGED_IN, USER_LOGGED_OUT} from "../actions/User"

const INITIAL_STATE = {
    session_id: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case RESTORE_SESSION:
            return {
                ...state,
                ...action.payload.user
            }
        case USER_LOGGED_IN:
            return {
                ...state,
                ...action.payload.user
            }
        case USER_LOGGED_OUT:
            return {
                ...state,
                session_id: null,
                username: null
            }
        default:
            return state;
    }
}