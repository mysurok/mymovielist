import {SEARCH_COMPLETED} from "../actions/SearchBox"

const INITIAL_STATE = {
    searchResult: null,
    query: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SEARCH_COMPLETED:
            return {
                ...state,
                searchResult: action.payload.searchResult,
                query: action.payload.query
            }
        default:
            return state;
    }
}